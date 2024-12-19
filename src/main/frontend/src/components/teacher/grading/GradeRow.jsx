import Swal from "sweetalert2";

const GradeRow = ({ student, isChecked, onCheck, onStudentClick }) => {

    const handleCheckboxChange = (e) => {
        onCheck(student.userId, e.target.checked);
    };

    const handleStudentClick = (userId, testNo) => {
        console.log(student.score + " 학생")
        if (student.isPossibleDetail === 0) {
            Swal.fire({
                icon: 'warning',
                title: '시험을 제출하지 않았습니다!',
                text: '제출한 시험만 상세페이지로 이동 가능합니다.',
                confirmButtonText: '확인'
            });
            return;
        }
        onStudentClick(userId, testNo);
    };

    return (
        <div className="grade-card">
            <div className="grade-card-header">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span className="student-name">{student.name}</span>
            </div>

            <div className="grade-card-body" onClick={() => handleStudentClick(student.userId, student.testNo)}>
                <div className="grade-info">
                    <div className="grade-item">
                        <label>단답형:</label>
                        <span>{student.shortAsCount} / {student.shortAs}</span>
                    </div>
                    <div className="grade-item">
                        <label>서술형:</label>
                        <span>{student.longAsCount} / {student.longAs}</span>
                    </div>
                    <div className="grade-item">
                        <label>객관식:</label>
                        <span>{student.multipleAsCount} / {student.multipleAs}</span>
                    </div>
                    <div className="grade-item">
                        <label>총 점수:</label>
                        <span>{student.score}</span>
                    </div>
                </div>
                <div className="grade-status">
                    <div className="status-item">
                        <label>결과:</label>
                        <span className={student.score >= student.cutline ? "pass" : "fail"}>
                            {student.score >= student.cutline ? "합격" : "불합격"}
                        </span>
                    </div>
                    <div className="status-item">
                        <label>확정 여부:</label>
                        <span>{student.confirmYn === 'Y' ? "확정" : "미확정"}</span>
                    </div>
                    <div className="status-item">
                        <label>시험 횟수:</label>
                        <span>{student.testCnt}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradeRow;
