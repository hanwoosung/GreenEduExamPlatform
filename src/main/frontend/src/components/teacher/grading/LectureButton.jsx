const LectureButton = ({lecture, onClick}) => (
    <button onClick={onClick} className="button">
        {lecture}
    </button>
);
export default LectureButton;