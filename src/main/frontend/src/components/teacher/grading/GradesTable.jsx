import GradeRow from "./GradeRow";

const GradesTable = ({grades, checkedStudents, onCheckAll, onCheckStudent}) => (
    <table className="table">
        <thead>
            <tr>
                <th className="th">
                    <input
                        type="checkbox"
                        onChange={onCheckAll}
                        checked={checkedStudents.size === grades.length}
                    />
                </th>
                <th className="th">학번</th>
                <th className="th">이름</th>
                <th className="th">성적</th>
            </tr>
        </thead>
        <tbody>
            {grades.map((student) => (
                <GradeRow
                    key={student.id}
                    student={student}
                    isChecked={checkedStudents.has(student.id)}
                    onCheck={onCheckStudent}
                />
            ))}
        </tbody>
    </table>
);
export default GradesTable;