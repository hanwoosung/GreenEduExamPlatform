const LectureButton = ({lecture, onClick}) => (
    <button onClick={onClick} className="button">
        {`${lecture.className}\n( ${lecture.startDate} ~ ${lecture.endDate} )`}
    </button>
);
export default LectureButton;