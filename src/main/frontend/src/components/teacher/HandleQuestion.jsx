import blackPlusBtn from '../../assets/image/black_plus_btn.svg';
import {useEffect} from "react";

const HandleQuestion = (props) => {

    useEffect(() => {
        for (let qno = 1; qno <= props.number; qno++) {
            addElement(qno);
            for (let dno = 1; dno <= 4; dno++) {
                addDetail(qno,dno);
            }
        }
    }, []);

    const addElement = (qno) => {
        props.setQuestions((questions) => [...questions, {
            qno: qno,
            title: "",
            code: "N",
            score: 0
        }]);
    }

    const addDetail = (qno, dno) => {
        props.setDetails((details) => [...details, {
            qno: qno,
            dno: dno,
            content: "",
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
            if(question.qno === qno){
                return { ...question, [field]: e.target.value }
            }
            return { ...question}
        })
        props.setQuestions(updatedQuestions);
    }

    const editDetailContent = (e,qno,dno,field) => {
        const updatedDetails = props.details.map((detail) =>{
            if(detail.qno === qno && detail.dno === dno){
                return { ...detail, [field]: e.target.value }
            }
            return { ...detail}
        })
        props.setDetails(updatedDetails);
    }

    const editCorrect = (e, qno, dno) => {
        const updateDetail = props.details.map((detail) =>{
            if(detail.qno === qno && detail.dno === dno){
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
                <div className={"question-box"} key={`qno-${question.qno}`}>
                    <span>{question.qno}번 문제</span>
                    <div className={"question-head"}>
                        <input
                            type={"number"}
                            placeholder={"점수"}
                            step={"0.1"}
                            onChange={(e) => editQuestion(e, question.qno, 'score')}
                        />
                        <textarea
                            className={"question-title"}
                            placeholder={"문제 제목"}
                            onChange={(e) => editQuestion(e,question.qno, 'title')}
                        ></textarea>
                    </div>
                    {Array.from({ length: 4 }, (_, index) => {
                        const indexPlus1 = index + 1;
                        return (
                            <div style={{ display: "flex" }} key={`qno-${question.qno}-${indexPlus1}`}>
                                <span>{indexPlus1}번 예제</span>
                                <input
                                    placeholder={"예제 입력"}
                                    onChange={(e) => editDetailContent(e, question.qno, indexPlus1, 'content')}
                                />
                                <input
                                    type={"checkbox"}
                                    style={{ width: "auto" }}
                                    onChange={(e) => editCorrect(e, question.qno, indexPlus1)}
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