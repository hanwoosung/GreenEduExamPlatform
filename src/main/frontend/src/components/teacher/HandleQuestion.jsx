import blackPlusBtn from '../../assets/image/black_plus_btn.svg';
import blackCloseBtn from '../../assets/image/black_close_btn.svg';
import {useEffect} from "react";

const HandleQuestion = (props) => {

    useEffect(() => {
        for (let qno = 1; qno <= props.number; qno++) {
            addTotalQuestion(qno)
        }
    }, [props.number]);

    const addTotalQuestion = (qno) => {
        addElement(qno);
        for (let dno = 1; dno <= 4; dno++) {
            addDetail(qno, dno);
        }
    }

    const addElement = (qno) => {
        props.setQuestions((questions) => [...questions, {
            testNo: props.test.testNo,
            questionNo: qno,
            questionTitle: "",
            questionCode: "N",
            questionScore: 0
        }]);
    };

    const addDetail = (qno, dno) => {
        props.setDetails((details) => [...details, {
            testNo: props.test.testNo,
            questionNo: qno,
            questionDetailNo: dno,
            questionContent: "",
            correctYn: "N"
        }]);
    };

    const deleteQuestion = (qno) => {
        props.setQuestions((prevQuestions) =>
            prevQuestions
                .filter((question) => question.questionNo !== qno)
                .map((question, index) => ({
                    ...question, questionNo: index + 1
                }))
        )

        props.setDetails((prevDetails) => {
                let prevDetailNo = 0;
                let index = 0;

                return prevDetails.filter((detail) =>
                    detail.questionNo !== qno
                )
                    .map((detail) => {
                        if (prevDetailNo !== detail.questionNo) {
                            prevDetailNo = detail.questionNo;
                            index++;
                        }
                        return {...detail, questionNo: index};
                    })
            }
        )
    };

    const deleteDetail = (qno, dno) => {
        let updatedDno = 0;
        props.setDetails((prevDetails) =>
            prevDetails
                .filter((detail) => !(detail.questionNo === qno && detail.questionDetailNo === dno))
                .map((detail) => {
                    if (detail.questionNo === qno) {
                        updatedDno++;
                        return {...detail, questionDetailNo: updatedDno};
                    }
                    return {...detail}
                }))
    };

    const editQuestion = (e, qno, field) => {
        props.setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.questionNo === qno
                    ? {...question, [field]: e.target.value}
                    : question
            )
        );
    };

    const editDetailContent = (e, qno, dno, field) => {
        props.setDetails((prevDetails) =>
            prevDetails.map((detail) =>
                detail.questionNo === qno && detail.questionDetailNo === dno
                    ? {...detail, [field]: e.target.value}
                    : detail
            )
        );
    };

    const editCorrect = (e, qno, dno) => {
        props.setDetails((prevDetails) =>
            prevDetails.map((detail) =>
                detail.questionNo === qno && detail.questionDetailNo === dno
                    ? {...detail, correctYn: e.target.checked ? "Y" : "N"}
                    : detail
            )
        );
    };

    const viewConsole = () => {
        console.log(props.details);
        console.log(props.questions);
    }

    return (
        <div className="question-container">
            {props.questions.map((question) => (
                <div className="question-box" key={`q-${question.questionNo}`}>
                    <div className="question-header">
                        <span>{question.questionNo}번 문제</span>
                        <img
                            src={blackCloseBtn}
                            alt="삭제"
                            className="icon"
                            onClick={() => deleteQuestion(question.questionNo)}
                        />
                    </div>
                    <input
                        type="number"
                        placeholder="점수"
                        className="input-score"
                        step="0.1"
                        value={question.questionScore}
                        onChange={(e) => editQuestion(e, question.questionNo, "questionScore")}
                    />
                    <textarea
                        className="input-title"
                        placeholder="문제 제목을 입력하세요"
                        value={question.questionTitle}
                        onChange={(e) => editQuestion(e, question.questionNo, "questionTitle")}
                    />
                    {props.details
                        .filter((detail) => detail.questionNo === question.questionNo)
                        .map((detail) => (
                            <div className="detail-box" key={`d-${detail.questionDetailNo}`}>
                                <input
                                    className="input-detail"
                                    placeholder="예제 입력"
                                    value={detail.questionContent}
                                    onChange={(e) =>
                                        editDetailContent(
                                            e,
                                            question.questionNo,
                                            detail.questionDetailNo,
                                            "questionContent"
                                        )
                                    }
                                />
                                <span style={{textWrap: "nowrap"}}>정답</span>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={detail.correctYn === "Y"}
                                    onChange={(e) =>
                                        editCorrect(e, question.questionNo, detail.questionDetailNo)
                                    }
                                    style={{width: "auto"}}
                                />
                                <img
                                    src={blackCloseBtn}
                                    alt="삭제"
                                    className="icon"
                                    onClick={() => deleteDetail(question.questionNo, detail.questionDetailNo)}
                                />
                            </div>
                        ))}
                    <img
                        src={blackPlusBtn}
                        alt="추가"
                        className="icon"
                        onClick={() => {
                            const detailsCount = props.details.filter(
                                (detail) => detail.questionNo === question.questionNo
                            ).length;
                            addDetail(question.questionNo, detailsCount + 1);
                        }}
                    />
                </div>
            ))}
            <button onClick={viewConsole}>
                로그보기
            </button>
            <button className="add-question-btn" onClick={() => addTotalQuestion(props.questions.length + 1)}>
                문제 추가하기
            </button>
        </div>
    );
};

export default HandleQuestion;