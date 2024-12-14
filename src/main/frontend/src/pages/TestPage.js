import {Link} from "react-router-dom";

const TestPage = () => {
    return (
        <div>
            <Link to={'/test2'}>test2로가기</Link>
        </div>
    );
};

export default TestPage;