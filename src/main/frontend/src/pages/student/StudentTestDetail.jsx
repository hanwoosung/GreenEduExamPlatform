import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import '../../assets/css/student/test/testDetail.css';
import useSessionStorage from "../../hooks/useSessionStorage";
import useApi from "../../hooks/useApi";

const StudentTestDetail = () => {
    const location = useLocation();
    const {testNo, scheduleName} = location.state || {};

    const {sessionValues} = useSessionStorage();

    const [userData, setUserData] = useState(sessionValues?.user?.userId || "");

    const [questionResult, setQuestionResult] = useState([]);

    const {
        data: detailList,
        loading: detailLoading,
        error: detailError
    } = useFetch(`/api/v1/question/detail/${testNo}`);
    const {
        data: questionList,
        loading: questionLoading,
        error: questionError
    } = useFetch(`/api/v1/question/${testNo}`);

    useEffect(() => {
        if (questionList && questionList.length > 0) {
            setQuestionResult(
                questionList.map((_, index) => ({
                    questionResultNo: 0,
                    testNo,
                    questionNo: index + 1,
                    userId: userData,
                    answer: "",
                    correctYn: ""
                }))
            );
        }
    }, [questionList, testNo, userData]);

    const {post: scorePost} = useApi("/api/v1/test-score", {
        headers: {"Content-Type": "application/json"}
    });

    const {post: resultPost} = useApi("/api/v1/test/result", {
        headers: {"Content-Type": "application/json"}
    });

    //todo 요청(스코어, 리설트) 추가하고 아래 점검용 useEffect 지웁시다.

    const answerEdit = (qno, answer, corr) => {
        setQuestionResult((prevResult) =>
            prevResult.map((questionResult) =>
                (questionResult.questionNo === qno)
                    ? {...questionResult, answer: answer, correctYn: corr}
                    : questionResult
            )
        )
    }

    //todo 전송시 answer와 정답값 비교
    const submitAnswer = async () => {
        let totalScore = 0;

        const updatedQuestionResult = questionResult.map((questionResult, index) => {
            if (questionResult.correctYn === "H") {
                return {...questionResult};
            }

            const corrElement = detailList.find(
                (detail) => detail.correctYn === "Y" && detail.questionNo === questionResult.questionNo);

            if (corrElement && corrElement.questionContent === questionResult.answer) {
                totalScore += questionList[index].questionScore;
                return {...questionResult, correctYn: "Y"};
            }

            return {...questionResult, correctYn: "N"};
        });

        setQuestionResult(updatedQuestionResult);

        try {
            const scoreRes = await scorePost(
                {
                    userId: userData,
                    testNo,
                    score: totalScore,
                    confirmYn: "N",
                    testCnt: 1
                },
                {},
                ""
            );

            const resultRes = await resultPost(updatedQuestionResult,{},"");

            if (scoreRes !== 0 && resultRes !== 0) {
                alert("제출 완료");
            }
        } catch (error) {
            console.error("제출 중 에러 발생:", error);
        }
    }


    if (detailLoading || questionLoading) return <div>로딩 중...</div>;
    if (detailError || questionError) return <div>에러 발생: {detailError?.message || questionError?.message}</div>;
    if (!detailList || !questionList) return <div>데이터가 없습니다.</div>;

    return (
        <div className="testing-detail-container">
            <div className="testing-detail">
                <header className="test-exam-header">
                    <h2 className="test-exam-title">{scheduleName}</h2>
                </header>
                <main className="test-exam-content">
                    {questionList.map((question, index) => (
                        <div key={index} className="testing-question">
                            <div className="testing-question-header">
                                <div className="testing-question-number">{index + 1}.</div>
                                <h3 className="testing-question-title">
                                    {question.questionTitle} ({question.questionScore}점)
                                </h3>
                            </div>
                            {question.questionCode === 'N' ? (
                                <ul className="test-options">
                                    {detailList
                                        .filter((detail) => detail.questionNo === question.questionNo)
                                        .map((detail, idx) => (

                                            <li key={idx}>
                                                <label>
                                                    <input
                                                        type={"radio"}
                                                        name={`question_${index}`}
                                                        value={detail.questionContent}
                                                        onChange={() => answerEdit(question.questionNo, detail.questionContent, "")}
                                                    />
                                                    {detail.questionContent}
                                                </label>
                                            </li>

                                        ))}
                                </ul>
                            ) : question.questionCode === 'S' ? (
                                <div>
                                    <input
                                        className={"question-short-input"}
                                        placeholder={"단답형 정답"}
                                        onChange={(e) => answerEdit(question.questionNo, e.target.value, "H")}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <textarea
                                        placeholder={"서술형 정답"}
                                        onChange={(e) => answerEdit(question.questionNo, e.target.value, "H")}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </main>
                <button onClick={submitAnswer}>
                    제출하기
                </button>
            </div>
        </div>
    );
};

export default StudentTestDetail;
