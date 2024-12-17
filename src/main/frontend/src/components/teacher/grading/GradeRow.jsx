const GradeRow = ({ student, isChecked, onCheck }) => (
    <div className="grade-card">
        <div className="grade-card-header">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onCheck(student.userId)}
            />
            <span className="student-name">{student.name}</span>
        </div>
        <div className="grade-card-body">
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

export default GradeRow;
