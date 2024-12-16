import {Link} from "react-router-dom";

const TestPage = () => {
    return (
        <div>
            <Link to={'/test2'}>test2로가기</Link><br />
            <Link to={'/schedule'}>스케쥴</Link><br />
            <Link to={'/regist'}>회원가입</Link><br />
        </div>
    );
};

export default TestPage;