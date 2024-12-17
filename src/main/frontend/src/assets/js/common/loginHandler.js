import {useState} from "react";
import {useLoginEventService} from "../../../services/common/useLoginEventService";
import {useNavigate} from "react-router-dom";

export const useLoginHandler = () => {

    const {loginEvent} = useLoginEventService();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        userId: "",
        userPassword: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
            idChk: name === "userId" ? false : prevData.idChk,
        }));
    };

    const validate = () => {
        return {
            userId: loginData.userId ? "" : "아이디를 입력해주세요.",
            userPassword: loginData.userPassword ? "" : "비밀번호를 입력해 주세요",
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        setErrors(validationErrors);

        if (Object.values(validationErrors).every((x) => x === "")) {

            let formData = new FormData();

            for (let key in loginData) {
                formData.append(key, loginData[key]);
            }

            try {
                const res = await loginEvent(formData);

                setErrors((prevData) => ({
                    ...prevData,
                    userId: res.body.userId === "" ? "아이디 및 비밀번호 오류입니다." : "",
                }));

                console.log(res);
                if (res.body.userId !== "") {

                    if (res.body.userRoleCode === "ROLE_STUDENT") {
                        navigate("/student");
                    }
                }

            } catch (e) {
                console.log(e);
            }

        } else {
            console.log("로그인 실패");
        }
    };

    return {
        loginData,
        errors,
        handleChange,
        handleSubmit,
    };
};
