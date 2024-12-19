import useApi from "../../hooks/useApi";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const LogoutBtn = ({sessionValues, removeSession, setSession, getSession, className}) => {

    const navigate = useNavigate();

    useEffect(() => {
        const session = getSession("user");
        if (session != null) {
            session.lastMoveDate = new Date();
            setSession("user", session); // 세션 업데이트
        } else {
            setSession("user", { lastMoveDate: new Date() });
        }
        console.log(session);
    }, []);

    const {post} = useApi("/logout", {
        withCredentials: true,
        headers: {},
    });

    const handlerLogout = async () => {
        try {
            let res = await post({}, {}, "");
            removeSession("user");
            navigate("/login");

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            {sessionValues?.user?.userId ? (
                // 로그인된 경우 로그아웃 버튼 표시
                <>
                    <a>{sessionValues?.user.name}</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className={className} onClick={handlerLogout}>
                        로그아웃
                    </button>
                </>
            ) : (
                // 로그인이 안된 경우 로그인과 회원가입 버튼 표시
                <>
                    <button className={className} onClick={() => navigate("/login")}>
                        로그인
                    </button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className={className} onClick={() => navigate("/regist")}>
                        회원가입
                    </button>
                </>
            )}
        </div>
    );
};

export default LogoutBtn;
