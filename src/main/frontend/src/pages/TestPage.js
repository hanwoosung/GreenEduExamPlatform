import {Link} from "react-router-dom";

const TestPage = () => {
    return (
        <div>
            <Link to={'/test2'}>test2로가기</Link>
            <Link to={'/schedule'}>티처`s 스케줄 바로가기</Link>
            <Link to={'/grading'}>채점 바로가기</Link>
        </div>
    );
};

export default TestPage;