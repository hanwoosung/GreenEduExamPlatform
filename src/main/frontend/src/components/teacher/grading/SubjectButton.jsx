const SubjectButton = ({ subject, onClick }) => (
<button onClick={onClick} className="button">
    {`${subject.scheduleName}\n( ${subject.startDate} ~ ${subject.endDate} )`}
</button>
)
;
export default SubjectButton;