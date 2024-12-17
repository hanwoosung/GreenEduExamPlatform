const GradeRow = ({ student, isChecked, onCheck }) => (
    <tr className="tableRow">
        <td className="td">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onCheck(student.id)}
            />
        </td>
        <td className="td">{student.id}</td>
        <td className="td">{student.name}</td>
        <td className="td">{student.grade}</td>
    </tr>
);

export default GradeRow;