import {Link} from "react-router-dom";

const TestPage = () => {
    return (
        <div>
            <Link to={'/grading'}>채점 바로가기</Link>
            <Link to={'/test2'}>test2로가기</Link><br />
            <Link to={'/schedule'}>스케쥴</Link><br />
            <Link to={'/regist'}>회원가입</Link><br />
        </div>
    );
};

export default TestPage;