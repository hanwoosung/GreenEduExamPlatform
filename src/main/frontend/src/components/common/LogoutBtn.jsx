import useApi from "../../hooks/useApi";
import {useNavigate} from "react-router-dom";

const LogoutBtn = () => {

    const navigate = useNavigate();

    const {post} = useApi("/logout", {
        withCredentials: true,
        headers: {},
    });

    const handlerLogout = async () => {
        try {
            let res = await post({}, {}, "");

            navigate("/login");

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <button onClick={handlerLogout}>
            Logout
        </button>
    );
};

export default LogoutBtn; // 수정: 이름만 내보냄
