import React, {useState} from 'react';
import useApi from "../../hooks/useApi";
import useFetch from "../../hooks/useFetch";
import HandleQuestion from "../../components/teacher/HandleQuestion"
import "../../assets/css/teacher/test/test.css"

const TestExam = () => {

    const [test, setTest] = useState({
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

    const {post} = useApi("/api/v1/test", {
        headers: {
            "Content-Type": "application/json"
        }
    });

    const testRegist = async () => {
        const respose = await post({
            scheduleNo: test.scheduleNo,
            createUserId: "aaa",
            cutline: test.cutline,
            createDt: "",
            updateDt: "",
            time: test.time,
            testDt: test.testDt,
            deleteYn: "N"
        }, {}, "");




        if (respose !== 0) {
            // todo 그리고 해당 아이디로 생성한 시험 엔티티 pk값을 가져온다. 서비스에서 처리할것
            setShowSuccess(true);
        }
    }

    const questionRegist = async () => {

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
                />
            )}
            {/*    todo state 의 number가 0이상이면 반환하는 코드로 작성*/}

            <button onClick={}>문제 저장하기</button>
        </div>
    )
}

const testInput = () => {
    return (
        <div>

        </div>
    )
}

export default TestExam;