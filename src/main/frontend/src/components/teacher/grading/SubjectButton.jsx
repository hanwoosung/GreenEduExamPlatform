const SubjectButton = ({ subject, onClick }) => (
    <button onClick={onClick} className="button">
        {subject}
    </button>
);
export default SubjectButton;