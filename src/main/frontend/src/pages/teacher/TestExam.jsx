import React, {useEffect, useRef, useState} from 'react';
import useApi from "../../hooks/useApi";
import useFetch from "../../hooks/useFetch";
import HandleQuestion from "../../components/teacher/HandleQuestion"
import "../../assets/css/teacher/test/test.css"
import useSessionStorage from "../../hooks/useSessionStorage";
import TestSideBar from "../../components/teacher/TestSideBar";
import swal from "sweetalert2";

const TestExam = () => {

    const {sessionValues} = useSessionStorage();

    const [userData, setUserData] = useState({
        userId: sessionValues?.user.userId,
        name: sessionValues?.user.name,
        userPassword: "",
        confirmPassword: "",
        userRoleCode: sessionValues?.user.userRoleCode,
        userBirth: sessionValues?.user.userBirth,
        deleteYn: sessionValues?.user.deleteYn,
        spotNo: sessionValues?.user.spotNo,
        spotName: sessionValues?.user.spotName,
    });

    const [test, setTest] = useState({
        testNo: 0,
        scheduleNo: "",
        cutline: 0,
        time: 0,
        testDt: "",
        testExam: "N"
    });

    const [questionGubn, setQuestionsGubn] = useState({
        number: 0,
        short: 0,
        long: 0
    })

    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(
            questionGubn.number +
            questionGubn.short +
            questionGubn.long
        );
    }, [questionGubn]);

    const [questions, setQuestions] = useState([]);
    const [details, setDetails] = useState([]);

    const [examBtnTitle, setExamBtnTitle] = useState("시험 생성");
    const [showSuccess, setShowSuccess] = useState(false);
    const questionRefs = useRef({});

    const scrollToQuestionBox = (questionNo) => {
        if (questionRefs.current[questionNo]) {
            questionRefs.current[questionNo].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    const {data: fetchedEvents} = useFetch("/api/v1/calendar/schedule/" + userData.userId + "/" + userData.userRoleCode);
    const {post: testPost} = useApi("/api/v1/test", {
        headers: {"Content-Type": "application/json"}
    });
    const {post: questionPost} = useApi("/api/v1/question", {
        headers: {"Content-Type": "application/json"}
    });
    const {post: detailPost} = useApi("/api/v1/question/detail", {
        headers: {"Content-Type": "application/json"}
    });

    const testRegist = async () => {
        //todo 빈값으로 이동하는 코드
        if (test?.examYn == 'Y') {
            swal.fire("실패", "이미 등록된 시험이 있습니다.", "error");
            return;
        }

        const response = await testPost({
            scheduleNo: test.scheduleNo,
            createUserId: userData.userId,
            cutline: test.cutline,
            createDt: "",
            updateDt: "",
            time: test.time,
            testDt: test.testDt,
            deleteYn: "N"
        }, {}, "");

        if (response !== 0) {
            setTest({...test, testNo: Number(response.body) || 0});
            setShowSuccess(true);
        }
    }

    const questionRegist = async (questions, details) => {
        // todo 유효성 검사 코드

        const total = questions.reduce((sum, question) => sum + parseFloat(question.questionScore), 0);
        console.log(total)

        if (total === 100) {
            if (questions != null && details != null) {
                const questionRes = await questionPost(questions, {}, "");
                const detailRes = await detailPost(details, {}, "");
                if (questionRes.status === "SUCCESS" && detailRes.status === "SUCCESS") {
                    alert("문제 추가 완료");
                }
            }
        } else {
            alert("총 점수의 합은 100점이어야 합니다.");
        }
    }

    return (
        <div className={"container"}>
            <div className={"grid-box"}>
                <span>과목</span>
                <select
                    id={"schedule"}
                    value={test.scheduleNo}
                    onChange={(e) => {
                        console.log(fetchedEvents);
                        console.log(e.target.value);

                        const selectedOption = fetchedEvents?.find(event => event.no == e.target.value);
                        console.log(selectedOption);

                        setTest({
                            ...test,
                            scheduleNo: e.target.value,
                            examYn: selectedOption?.examYn || "" // 선택된 값의 examYn 설정
                        });
                    }}
                >
                    <option value={""}>선택</option>
                    {fetchedEvents?.map((element, index) => (
                        <option key={index} value={element.no}>
                            {element.title}
                        </option>
                    ))}
                </select>

            </div>
            <div className={"grid-box"}>
                <span>커트라인</span>
                <input
                    className={"test-input"}
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
                    className={"test-input"}
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
                    className={"test-input"}
                    type={"datetime-local"}
                    placeholder={"시험시작일시"}
                    onChange={(e) => setTest({...test, testDt: e.target.value})}
                />
            </div>

            <div className={"grid-box"}>
                <span>객관식 갯수</span>
                <input
                    className={"test-input"}
                    type={"number"}
                    min={0}
                    value={questionGubn.number}
                    placeholder={"객관식 갯수"}
                    onChange={(e) => setQuestionsGubn({...questionGubn, number: parseInt(e.target.value) || 0})}
                />
            </div>
            <div className={"grid-box"}>
                <span>단답형 갯수</span>
                <input
                    className={"test-input"}
                    type={"number"}
                    min={0}
                    value={questionGubn.short}
                    placeholder={"단답형 갯수"}
                    onChange={(e) => setQuestionsGubn({...questionGubn, short: parseInt(e.target.value) || 0})}
                />
            </div>
            <div className={"grid-box"}>
                <span>서술형 갯수</span>
                <input
                    className={"test-input"}
                    type={"number"}
                    min={0}
                    value={questionGubn.long}
                    placeholder={"서술형 갯수"}
                    onChange={(e) => setQuestionsGubn({...questionGubn, long: parseInt(e.target.value) || 0})}
                />
            </div>
            <button className={"test-page-btn"} onClick={testRegist}>{examBtnTitle}</button>
            {(showSuccess && questionGubn.number > 0) && (
                <HandleQuestion
                    score={100 / total}
                    gubn={"N"}
                    startNum={1}
                    number={questionGubn.number}
                    questions={questions}
                    setQuestions={setQuestions}
                    details={details}
                    setDetails={setDetails}
                    test={test}
                    questionRefs={questionRefs}
                />
            )}

            {(showSuccess && questionGubn.short > 0) && (
                <HandleQuestion
                    score={100 / total}
                    gubn={"S"}
                    startNum={1 + questionGubn.number}
                    number={questionGubn.short}
                    questions={questions}
                    setQuestions={setQuestions}
                    details={details}
                    setDetails={setDetails}
                    test={test}
                    questionRefs={questionRefs}
                />
            )}

            {(showSuccess && questionGubn.long > 0) && (
                <HandleQuestion
                    score={100 / total}
                    gubn={"L"}
                    startNum={1 + questionGubn.number + questionGubn.short}
                    number={questionGubn.long}
                    questions={questions}
                    setQuestions={setQuestions}
                    details={details}
                    setDetails={setDetails}
                    test={test}
                    questionRefs={questionRefs}
                />
            )}

            {showSuccess && (
                <>
                    <TestSideBar
                        questions={questions}
                        scrollToQuestionBox={scrollToQuestionBox}
                    />
                    <button className={"test-page-btn"} onClick={() => questionRegist(questions, details)}>문제 저장하기
                    </button>

                </>
            )}

        </div>
    )
}

export default TestExam;