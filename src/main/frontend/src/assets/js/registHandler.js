import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import useApi from "../../hooks/useApi";

export const useRegistHandler = () => {

    const {post, get} = useApi("/api/v1/regist", {
        headers: {
            "Content-Type": "application/json"
        },
    });


    const [reigstData, setReigstData] = useState({
        userId: "",
        idChk: false,
        userName: "",
        userPassword: "",
        userBirth: new Date().toISOString().split("T")[0],
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});


    const handleDuplicate = async () => {
        let result = await get({reigstData}, {}, `/api/v1/regist/cnt`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReigstData((prevData) => ({
            ...prevData,
            [name]: value,
            idChk: name === "userId" ? false : prevData.idChk,
        }));
    };

    const validate = () => {
        return {
            userId: reigstData.userId ? "" : "아이디를 입력해주세요.",
            userName: reigstData.userName ? "" : "이름을 입력해주세요.",
            userBirth: reigstData.userBirth ? "" : "생년월일을 입력해주세요.",
            idChk: reigstData.idChk ? "" : "중복체크를 진행해 주세요.",
            userPassword: reigstData.userPassword.length >= 8
                ? ""
                : "비밀번호는 최소 8자 이상이어야 합니다.",
            confirmPassword:
                reigstData.userPassword === reigstData.confirmPassword
                    ? ""
                    : "비밀번호가 일치하지 않습니다.",
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.values(validationErrors).every((x) => x === "")) {
            console.log("회원가입 성공");
        } else {
            console.log("회원가입 실패");
        }
    };

    return {
        reigstData,
        errors,
        handleChange,
        handleDuplicate,
        handleSubmit,
    };
};
