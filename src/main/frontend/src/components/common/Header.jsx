import "../../assets/css/common/header.css";
import LogoutBtn from "./LogoutBtn";
import useSessionStorage from "../../hooks/useSessionStorage";
import {Link} from "react-router-dom";

const Header = () => {
    const {sessionValues, setSession, removeSession, getSession} = useSessionStorage();

    return (
        <header className="header">
            <h1 className="header-logo">My App</h1>
            <ul className="header-nav">
                <li className="header-nav-item">
                    <Link to="/" className="hover:underline">
                        홈
                    </Link>
                </li>
                <li className="header-nav-item">
                    <Link to="/test2" className="hover:underline">
                        테스트 페이지 2
                    </Link>
                </li>
                <li className="header-nav-item">
                    <Link to="/schedule" className="hover:underline">
                        스케줄
                    </Link>
                </li>
                <li className="header-nav-item">
                    <Link to="/class-register" className="hover:underline">
                        강의 등록
                    </Link>
                </li>
                <li className="header-nav-item">
                    <Link to="/regist" className="hover:underline">
                        회원가입
                    </Link>
                </li>
            </ul>
            <LogoutBtn
                sessionValues={sessionValues}
                removeSession={removeSession}
                setSession={setSession}
                getSession={getSession}
                className="logout-btn"
            />
        </header>
    );
};

export default Header;
