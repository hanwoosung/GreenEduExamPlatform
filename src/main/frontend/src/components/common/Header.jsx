import "../../assets/css/common/header.css";
import LogoutBtn from "./LogoutBtn";
import useSessionStorage from "../../hooks/useSessionStorage";
import {Link} from "react-router-dom";

const Header = () => {
    const {sessionValues, setSession, removeSession, getSession} = useSessionStorage();

    // 사용자 역할 가져오기
    const userRole = sessionValues?.user?.userRoleCode;

    // 역할에 따른 메뉴 구성
    const renderMenu = () => {
        switch (userRole) {
            case "ROLE_TEACHER":
                return (
                    <>
                        <li className="header-nav-item">
                            <Link to="/user-info" className="hover:underline">
                                내 정보
                            </Link>
                        </li>
                        <li className="header-nav-item">
                            <Link to="/schedule" className="hover:underline">
                                스케줄
                            </Link>
                        </li>
                        <li className="header-nav-item">
                            <Link to="/teacher" className="hover:underline">
                                대시보드
                            </Link>
                        </li>
                        <li className="header-nav-item">
                            <Link to="/test-exam" className="hover:underline">
                                시험 등록
                            </Link>
                        </li>
                        <li className="header-nav-item">
                            <Link to="/grading" className="hover:underline">
                                채점
                            </Link>
                        </li>
                    </>
                );
            case "ROLE_STUDENT":
                return (
                    <>
                        <li className="header-nav-item">
                            <Link to="/user-info" className="hover:underline">
                                내 정보
                            </Link>
                        </li>
                        <li className="header-nav-item">
                            <Link to="/schedule" className="hover:underline">
                                일정
                            </Link>
                        </li>
                        <li className="header-nav-item">
                            <Link to="/crs-rgst" className="hover:underline">
                                강의신청
                            </Link>
                        </li>
                        <li className="header-nav-item">
                            <Link to="/student-test" className="hover:underline">
                                채점결과
                            </Link>
                        </li>
                        <li className="header-nav-item">
                            <Link to="/test-result" className="hover:underline">
                                채점결과
                            </Link>
                        </li>
                    </>
                );
            case "ROLE_SPOT_MANAGER":
                return (
                    <>
                        <li className="header-nav-item">
                            <Link to="/room-register" className="hover:underline">
                                강의실 등록
                            </Link>
                        </li>
                        <li className="header-nav-item">
                            <Link to="/class-register" className="hover:underline">
                                강의 등록
                            </Link>
                        </li>
                        <li className="header-nav-item">
                            <Link to="/class-list" className="hover:underline">
                                강의 관리
                            </Link>
                        </li>
                    </>
                );
            case "ROLE_MANAGER":
                return (
                    <>
                        <li className="header-nav-item">
                            <Link to="/spot-register" className="hover:underline">
                            지점 등록
                            </Link>
                        </li>
                        <li className="header-nav-item">
                            <Link to="/teacher-spot-list" className="hover:underline">
                                강사 관리
                            </Link>
                        </li>
                    </>
                );
            default:
                return (
                    <>
                        <li className="header-nav-item">
                            <Link to="/" className="hover:underline">
                            홈
                            </Link>
                        </li>
                    </>
                );
        }
    };

    return (
        <header className="header">
            <h1 className="header-logo">My App</h1>
            <ul className="header-nav">
                {renderMenu()} {/* 역할에 따라 동적으로 메뉴 렌더링 */}
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
