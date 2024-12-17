import blackPlusBtn from '../../assets/image/black_plus_btn.svg';
import {useEffect} from "react";

const HandleQuestion = (props) => {

    useEffect(() => {
        console.log(props.test)
        for (let qno = 1; qno <= props.number; qno++) {
            addElement(qno);
            for (let dno = 1; dno <= 4; dno++) {
                addDetail(qno,dno);
            }
        }
    }, [props.number]);

    const addElement = (qno) => {
        props.setQuestions((questions) => [...questions, {
            testNo: props.test.testNo,
            questionNo: qno,
            questionTitle: "",
            questionCode: "N",
            questionScore: 0
        }]);
    }

    const addDetail = (qno, dno) => {
        props.setDetails((details) => [...details, {
            testNo: props.test.testNo,
            questionNo: qno,
            questionDetailNo: dno,
            questionContent: "",
            correctYn: "N"
        }]);
    }

    const addFullQuestion = (qno) => {
        addElement(qno);
        for(let i = 1; i <= 4; i++) {
            addDetail(qno, i);
        }
    }

    const editQuestion = (e, qno, field) => {
        const updatedQuestions = props.questions.map((question) => {
            if(question.questionNo === qno){
                return { ...question, [field]: e.target.value }
            }
            return { ...question}
        })
        props.setQuestions(updatedQuestions);
    }

    const editDetailContent = (e,qno,dno,field) => {
        const updatedDetails = props.details.map((detail) =>{
            if(detail.questionNo === qno && detail.questionDetailNo === dno){
                return { ...detail, [field]: e.target.value }
            }
            return { ...detail}
        })
        props.setDetails(updatedDetails);
    }

    const editCorrect = (e, qno, dno) => {
        const updateDetail = props.details.map((detail) =>{
            if(detail.questionNo === qno && detail.questionNo === dno){
                return { ...detail, correctYn: (e.target.checked) ? "Y" : "N" };
            }
            return { ...detail}
        })
        props.setDetails(updateDetail);
    }

    const viewConsole = () => {
        console.log('Questions:', props.questions);
        console.log('Details:', props.details);
    }

    return (
        <div className={"question-container"}>
            {props.questions.map((question) => (
                <div className={"question-box"} key={`qno-${question.questionNo}`}>
                    <span>{question.questionNo}번 문제</span>
                    <div className={"question-head"}>
                        <input
                            type={"number"}
                            placeholder={"점수"}
                            step={"0.1"}
                            onChange={(e) => editQuestion(e, question.questionNo, 'questionScore')}
                        />
                        <textarea
                            className={"question-title"}
                            placeholder={"문제 제목"}
                            onChange={(e) => editQuestion(e,question.questionNo, 'questionTitle')}
                        ></textarea>
                    </div>
                    {Array.from({ length: 4 }, (_, index) => {
                        const indexPlus1 = index + 1;
                        return (
                            <div style={{ display: "flex" }} key={`qno-${question.questionNo}-${indexPlus1}`}>
                                <span>{indexPlus1}번 예제</span>
                                <input
                                    placeholder={"예제 입력"}
                                    onChange={(e) => editDetailContent(e, question.questionNo, indexPlus1, 'questionContent')}
                                />
                                <input
                                    type={"checkbox"}
                                    style={{ width: "auto" }}
                                    onChange={(e) => editCorrect(e, question.questionNo, indexPlus1)}
                                />
                                <span>정답</span>
                            </div>
                        );
                    })}

                </div>
            ))}
            <div className="plus-btn" onClick={() => addFullQuestion(props.questions.length+1)}>
                <img src={blackPlusBtn} alt="plus_ing" style={{display: "inline-block"}}/>
                <span>문제 추가하기</span>
            </div>

            <button onClick={viewConsole}>로그보기</button>
        </div>
    )
}

export default HandleQuestion;