import React, {useState} from 'react';
import useApi from "../../hooks/useApi";
import useFetch from "../../hooks/useFetch";
import HandleQuestion from "../../components/teacher/HandleQuestion"
import "../../assets/css/teacher/test/test.css"

const TestExam = () => {

    const [scheduleNo, setScheduleNo] = useState("");
    const [cutline, setCutline] = useState(0);
    const [time, setTime] = useState(0);
    const [testDt, setTestDt] = useState("");
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
            scheduleNo: scheduleNo,
            createUserId: "aaa",
            cutline: cutline,
            createDt: "",
            updateDt: "",
            time: time,
            testDt: testDt,
            deleteYn: "N"
        }, {}, "");

        console.log(respose);
    }

    return (
        <div className={"container"}>
            <div className={"grid-box"}>
                <span>과목</span>
                <select
                    id={"schedule"}
                    value={scheduleNo}
                    onChange={(e) => setScheduleNo(e.target.value)}
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
                    id={"cutline"}
                    placeholder={"커트라인"}
                    value={cutline}
                    onChange={(e) => setCutline(parseInt(e.target.value, 10) || 0)}
                ></input>
            </div>
            <div className={"grid-box"}>
                <span>제한시간</span>
                <input
                    type={"number"}
                    id={"time"}
                    placeholder={"제한시간"}
                    value={time}
                    onChange={(e) => setTime(parseInt(e.target.value, 10) || 0)}
                ></input>
            </div>
            <div className={"grid-box"}>
                <span>시험시작 일시</span>
                <input
                    type={"datetime-local"}
                    id={"testDt"}
                    placeholder={"시험시작일시"}
                    onChange={(e) => setTestDt(e.target.value)}
                ></input>
            </div>
            {/*todo 유효성 추가필요*/}
            <button onClick={testRegist}>{examBtnTitle}
            </button>
            { showSuccess && (
                <HandleQuestion/>
            )}
        </div>
    )
}

export default TestExam;