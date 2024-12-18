import React, {useState} from 'react';
import useApi from "../../hooks/useApi";
import useFetch from "../../hooks/useFetch";
import HandleQuestion from "../../components/teacher/HandleQuestion"
import "../../assets/css/teacher/test/test.css"

const TestExam = () => {

    const [test, setTest] = useState({
        testNo: 0,
        scheduleNo: "",
        cutline: 0,
        time: 0,
        testDt: ""
    });

    const [questionGubn, setQuestionsGubn] = useState({
        number: 0,
        short: 0,
        long: 0
    })

    const [questions, setQuestions] = useState([]);
    const [details, setDetails] = useState([]);

    const [examBtnTitle, setExamBtnTitle] = useState("시험 생성");
    const [showSuccess, setShowSuccess] = useState(false);

    const {data: fetchedEvents} = useFetch("/api/v1/calendar/schedule");

    const {post: testPost} = useApi("/api/v1/test", {
        headers: {
            "Content-Type": "application/json"
        }
    });

    const{post: questionPost} = useApi("/api/v1/question",{
        headers: {
            "Content-Type": "application/json"
        }
    });

    const{post: detailPost} = useApi("/api/v1/question/detail",{
        headers: {
            "Content-Type": "application/json"
        }
    });

    const testRegist = async () => {
        // const response = await testPost({
        //     scheduleNo: test.scheduleNo,
        //     createUserId: "aaa",
        //     cutline: test.cutline,
        //     createDt: "",
        //     updateDt: "",
        //     time: test.time,
        //     testDt: test.testDt,
        //     deleteYn: "N"
        // }, {}, "");

        setTest({...test,testNo: /*Number(response.body) ||*/ 0})
        setShowSuccess(true);

        // if (response !== 0) {
        //
        // }
    }

    const questionRegist = async (questions, details) => {
        if(questions != null && details != null) {
            console.log(questions);
            console.log(details);
            const questionRes= await questionPost(questions,{},"");
            const detailRes = await detailPost(details,{},"");
            if(questionRes.status === "SUCCESS" && detailRes.status === "SUCCESS") {
                alert("문제 추가 완료");
            }
        }
    }

    return (
        <div className={"container"}>
            <div className={"grid-box"}>
                <span>과목</span>
                <select
                    id={"schedule"}
                    value={test.scheduleNo}
                    onChange={(e) => setTest({...test, scheduleNo: e.target.value})}
                >
                    <option value={""}>선택</option>

                    {fetchedEvents?.map((element, index) => (
                        <option key={index} value={element.no}>{element.title}</option>
                    ))}
                </select>
            </div>
            <div className={"grid-box"}>
                <span>커트라인</span>
                <input
                    type={"number"}
                    min={0}
                    placeholder={"커트라인"}
                    value={test.cutline}
                    onChange={(e) => setTest({...test, cutline: parseInt(e.target.value) || 0})}
                />
            </div>
            <div className={"grid-box"}>
                <span>제한시간</span>
                <input
                    type={"number"}
                    min={0}
                    placeholder={"제한시간"}
                    value={test.time}
                    onChange={(e) => setTest({...test, time: parseInt(e.target.value) || 0})}
                />
            </div>
            <div className={"grid-box"}>
                <span>시험시작 일시</span>
                <input
                    type={"datetime-local"}
                    placeholder={"시험시작일시"}
                    onChange={(e) => setTest({...test, testDt: e.target.value})}
                />
            </div>
            <div className={"grid-box"}>
                <span>객관식 갯수</span>
                <input
                    type={"number"}
                    min={0}
                    value={questionGubn.number}
                    placeholder={"객관식 갯수"}
                    onChange={(e) => setQuestionsGubn({...questionGubn, number: parseInt(e.target.value) || 0})}
                />
            </div>
            {/*todo 유효성 추가필요*/}
            <button onClick={testRegist}>{examBtnTitle}</button>
            {showSuccess && (
                <HandleQuestion
                    number={questionGubn.number}
                    questions={questions}
                    setQuestions={setQuestions}
                    details={details}
                    setDetails={setDetails}
                    test={test}
                />
            )}
            {/*    todo state 의 number가 0이상이면 반환하는 코드로 작성*/}

            <button onClick={() => questionRegist(questions,details)}>문제 저장하기</button>
        </div>
    )
}

export default TestExam;