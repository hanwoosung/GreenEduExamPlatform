import GradeRow from "./GradeRow";

const GradesTable = ({ grades, checkedStudents, onCheckAll, onCheckStudent }) => (
    <div className="grades-container">
        <div className="list-header">
            <input
                type="checkbox"
                onChange={onCheckAll}
                checked={checkedStudents.size === grades.length}
            />
            <label>전체 선택</label>
        </div>
        <div className="grades-list">
            {grades.map((student) => (
                <GradeRow
                    key={student.userId}
                    student={student}
                    isChecked={[...checkedStudents].some((s) => s.userId === student.userId)}
                    onCheck={() => onCheckStudent(student)} // 학생 객체 전달
                />

            ))}
        </div>
    </div>
);

export default GradesTable;
