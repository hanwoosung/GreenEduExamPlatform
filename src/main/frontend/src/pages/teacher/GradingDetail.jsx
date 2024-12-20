import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import {AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai';
import useFetch from '../../hooks/useFetch';
import useApi2 from '../../hooks/useApi2';
import '../../assets/css/teacher/grading/gradingDetail.css';

const GradingDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {step, selectedLecture, selectedSubject, grades, checkedStudents, userId, testNo} = location.state || {};
    const {data, loading, error} = useFetch(`/api/v1/grading/detail/${userId}`, {
        params: {testNo},
    });
    const {post} = useApi2();
    const questionRefs = useRef([]);

    const [sidebarOffset, setSidebarOffset] = useState(0);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        if (data) {
            const initialTotalScore = data.reduce((total, question) => {
                if (question.correctYn === 'Y') {
                    return total + (question.questionScore || 0);
                }
                return total;
            }, 0);
            setTotalScore(initialTotalScore);
        }
    }, [data]);

    const handleQuestionClick = async (question, index) => {
        if (question.questionCode !== 'L' && question.questionCode !== 'S') return;

        const {value: result} = await Swal.fire({
            title: `문제 ${index + 1}: 채점`,
            input: 'radio',
            inputOptions: {
                Y: '정답',
                N: '오답',
            },
            inputValidator: (value) => {
                if (!value) return '하나를 선택해야 합니다!';
            },
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        });

        if (result) {
            try {
                const previousState = question.correctYn;
                const questionScore = question.questionScore || 0;

                console.log(previousState + "상태");
                console.log(result + "값");

                // 상태에 따른 점수 조정 및 새로운 총점수 계산
                let newTotalScore = totalScore;
                if (previousState === 'H') {
                    newTotalScore += result === 'Y' ? questionScore : 0;
                } else if (previousState === 'Y') {
                    newTotalScore -= result === 'N' ? questionScore : 0;
                } else if (previousState === 'N') {
                    newTotalScore += result === 'Y' ? questionScore : 0;
                }

                await post('/api/v1/grading/score', {
                    body: {
                        resultNo: question.questionResultNo,
                        testNo: testNo,
                        score: newTotalScore,
                        userId: userId,
                        correct: result,
                    },
                });

                setTotalScore(newTotalScore);
                question.correctYn = result;

                Swal.fire('성공', '채점이 완료되었습니다.', 'success');
            } catch (err) {
                Swal.fire('실패', '채점 중 오류가 발생했습니다.', 'error');
            }
        }
    };


    // 특정 문제로 스크롤 이동
    const scrollToQuestion = (index) => {
        if (questionRefs.current[index]) {
            questionRefs.current[index].scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    };

    // 스크롤 이벤트로 사이드바 이동
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            const maxOffset = 50;
            const calculatedOffset = Math.min(scrollY / 10, maxOffset);
            setSidebarOffset(calculatedOffset);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 맨 위로 스크롤
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    // 이전 버튼 클릭
    const handleBackButtonClick = () => {
        navigate('/grading', {
            state: {
                step: 3,
                selectedLecture,
                selectedSubject,
                grades,
                checkedStudents,
            },
        });
    };

    if (loading) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error">에러 발생: {error.message}</div>;
    if (!data) return <div className="no-data">데이터가 없습니다.</div>;

    return (
        <div className="grading-detail-container">
            <div className="grading-detail">
                <div className="exam-header">
                    <button className="back-button" onClick={handleBackButtonClick}>이전</button>
                    <h1>{selectedSubject.scheduleName} 시험</h1>
                    <div className="exam-info">
                        <p><strong>이름:</strong> {data[0]?.name}</p>
                    </div>
                </div>
                <main className="exam-content">
                    {data.map((question, index) => {
                        const isNotGraded = question.correctYn === 'H';
                        const isCorrect = question.correctYn === 'Y';
                        const isIncorrect = question.correctYn === 'N';

                        return (
                            <div
                                key={index}
                                className="question"
                                ref={(el) => (questionRefs.current[index] = el)}
                                onClick={() => handleQuestionClick(question, index)}
                            >
                                <div className="question-header">
                                    <div className="marker-wrapper">
                                        {isNotGraded ? (
                                            <div className="question-number">{index + 1}</div>
                                        ) : (
                                            <div className={`marker ${isCorrect ? 'correct' : 'incorrect'}`}>
                                                <span className="marker-symbol">{isCorrect ? 'O' : 'X'}</span>
                                                <span className="question-number">{index + 1}</span>
                                            </div>
                                        )}
                                    </div>
                                    <h2 className="question-title">{question.questionTitle} ({question.questionScore}점)</h2>
                                </div>
                                {question.questionCode === 'N' ? (
                                    <ul className="options">
                                        {question.details.map((detail, idx) => (
                                            <li
                                                key={idx}
                                                className={`option ${
                                                    question.answer === String(detail.questionDetailNo) // 사용자가 선택한 답변인 경우
                                                        ? question.correctYn === 'Y'
                                                            ? 'selected-correct' // 정답일 경우
                                                            : 'selected-incorrect' // 오답일 경우
                                                        : '' // 선택되지 않은 경우 기본 스타일
                                                }`}
                                            >
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`question_${index}`}
                                                        value={detail.questionDetailNo}
                                                        checked={question.answer === String(detail.questionDetailNo)}
                                                        readOnly
                                                    />
                                                    {"   "+detail.questionContent}
                                                </label>
                                            </li>

                                        ))}
                                    </ul>
                                ) : (
                                    <div className="subjective">
                                        <p><strong>학생 답변:</strong> {question.answer || '답변 없음'}</p>
                                        {isNotGraded && <p className="not-graded-label">채점 대기 중</p>}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </main>
            </div>
            {/* 사이드바 */}
            <aside
                className="sidebar"
                style={{transform: `translateY(${sidebarOffset}px)`}}
            >
                <h2>문제 목록</h2>
                <div className={"exam-content-ul-div"}>
                    <ul>
                        {data.map((question, index) => (
                            <li
                                key={index}
                                className={`sidebar-item ${question.correctYn === 'Y' ? 'correct' : question.correctYn === 'N' ? 'incorrect' : 'not-graded'}`}
                                onClick={() => scrollToQuestion(index)}
                            >
                                <span className="sidebar-number">{index + 1}</span>
                                <span className="sidebar-score">
                                {question.correctYn === 'Y' ? (
                                    <AiOutlineCheckCircle className="icon" />
                                ) : question.correctYn === 'N' ? (
                                    <AiOutlineCloseCircle className="icon" />
                                ) : (
                                    '대기'
                                )}
                            </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="total-score">
                    <h3>총 점수: {totalScore}점</h3>
                    <button className="submit-button" onClick={handleBackButtonClick}>제출</button>
                </div>
            </aside>

            {/* 플로팅 맨 위로 버튼 */}
            <button className="scroll-to-top" onClick={scrollToTop}>
                ▲
            </button>
        </div>
    );
};

export default GradingDetail;
