import Swal from "sweetalert2";

// 성적 확정 함수
export const confirmGrades = async (checkedStudents, selectedSubject, put, handleSubjectSelect, setCheckedStudents) => {
    try {
        const noTestStudents = [...checkedStudents].filter((student) => student.testCnt === 0);
        if (noTestStudents.length > 0) {
            const noTestNames = noTestStudents.map((s) => s.name).join(", ");
            await Swal.fire({
                title: "시험 미응시 학생이 포함되어 있습니다.",
                text: `시험 미응시자: ${noTestNames}\n확정할 수 없습니다.`,
                icon: "error",
                confirmButtonText: "확인",
            });
            return;
        }

        const failedStudents = [...checkedStudents].filter((student) => student.score < student.cutline);
        if (failedStudents.length > 0) {
            const failedNames = failedStudents.map((s) => s.name).join(", ");
            const result = await Swal.fire({
                title: "불합격자가 포함되어 있습니다.",
                text: `불합격자: ${failedNames}\n정말 확정하시겠습니까?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "확정",
                cancelButtonText: "취소",
            });
            if (!result.isConfirmed) return Swal.fire("취소됨", "확정이 취소되었습니다.", "info");
        } else {
            const result = await Swal.fire({
                title: "확정하시겠습니까?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "확정",
                cancelButtonText: "취소",
            });
            if (!result.isConfirmed) return Swal.fire("취소됨", "확정이 취소되었습니다.", "info");
        }

        const studentIds = [...checkedStudents].map((student) => student.userId);
        await put("/api/v1/grading/confirmed", {
            body: studentIds,
            headers: {"Content-Type": "application/json"},
        });

        Swal.fire("성공", "학생 성적이 확정되었습니다.", "success");
        await handleSubjectSelect(selectedSubject);
        setCheckedStudents(new Set());
    } catch (error) {
        console.error("에러:", error);
        Swal.fire("오류", "확정 처리 중 문제가 발생했습니다.", "error");
    }
};

// 재시험 설정 함수
export const scheduleRetest = async (checkedStudents, selectedSubject, put, handleSubjectSelect, setCheckedStudents) => {
    try {
        const failedStudents = [...checkedStudents].filter((student) => student.score < student.cutline && student.testCnt > 0);
        const passedStudents = [...checkedStudents].filter((student) => student.score >= student.cutline);
        const noTestStudents = [...checkedStudents].filter((student) => student.testCnt === 0);

        if (passedStudents.length > 0) {
            const passedNames = passedStudents.map((s) => s.name).join(", ");
            await Swal.fire({
                title: "합격자 포함",
                text: `다음 학생들은 합격자입니다: ${passedNames}\n합격자는 제외됩니다.`,
                icon: "info",
                confirmButtonText: "확인",
            });
        }

        if (noTestStudents.length > 0) {
            const noTestNames = noTestStudents.map((s) => s.name).join(", ");
            await Swal.fire({
                title: "시험 미응시자 포함",
                text: `다음 학생은 시험을 치르지 않았습니다: ${noTestNames}`,
                icon: "error",
                confirmButtonText: "확인",
            });
            return;
        }

        if (failedStudents.length === 0) {
            await Swal.fire({
                title: "불합격자가 없습니다.",
                text: "모든 학생이 합격하였습니다.",
                icon: "info",
                confirmButtonText: "확인",
            });
            return;
        }

        const testNo = failedStudents[0]?.testNo;
        if (!testNo) return Swal.fire("오류", "시험 번호가 없습니다. 다시 확인해주세요.", "error");

        const userIdList = failedStudents.map((student) => student.userId);
        await put("/api/v1/grading/test", {
            body: {userIdList, testNo},
            headers: {"Content-Type": "application/json"},
        });

        Swal.fire("성공", "재시험 대상이 설정되었습니다.", "success");
        await handleSubjectSelect(selectedSubject);
        setCheckedStudents(new Set());
    } catch (error) {
        console.error("에러:", error);
        Swal.fire("오류", "재시험 설정 중 문제가 발생했습니다.", "error");
    }
};

export const fetchSubjects = async (lecture, get, setSubjects, setStep, setSelectedLecture) => {
    setSelectedLecture(lecture);
    try {
        const response = await get(`/api/v1/grading/schedule/teacher1`, {
            params: {num: lecture.id},
        });
        setSubjects(response);
    } catch (err) {
        console.error("강의 데이터 로딩 실패:", err);
    }
    setStep(2);
};

export const fetchGrades = async (subject, get, setGrades, setStep, setSelectedSubject) => {
    setSelectedSubject(subject);
    try {
        const response = await get(`/api/v1/grading/teacher1`, {
            params: {scheduleNo: subject.id},
        });
        setGrades(response);
    } catch (err) {
        console.error("성적 데이터 로딩 실패:", err);
    }
    setStep(3);
};

export const goToPreviousStep = (setStep) => {
    setStep((prev) => Math.max(prev - 1, 1));
};

