import {useState} from "react";
import useFetch from "../../../hooks/useFetch";
import useApi from "../../../hooks/useApi";
import {useRegistEventService} from "../../../services/common/useRegistEventService";
import { useNavigate } from 'react-router-dom';

export const useRegistHandler = () => {

    const navigate = useNavigate();
    const {insertEvent, getEvent} = useRegistEventService();

    const [reigstData, setReigstData] = useState({
        userId: "",
        idChk: false,
        userName: "",
        userPassword: "",
        userRoleCode: "ROLE_STUDENT",
        userBirth: new Date().toISOString().split("T")[0],
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});

    const [alignment, setAlignment] = useState('ROLE_STUDENT');

    const handleToggle = (event, newAlignment) => {
        setReigstData((prevData) => ({
            ...prevData,
            userRoleCode: newAlignment,
        }));
        setAlignment(newAlignment);
    };

    const handleDuplicate = async () => {
        if (reigstData.userId) {

            try {

                let res = await getEvent(reigstData.userId);

                setReigstData((prevData) => ({
                    ...prevData,
                    idChk: res.body <= 0
                }));

                setErrors((prevData) => ({
                    ...prevData,
                    userId: res.body <= 0 ? '' : '이미 사용중인 ID 입니다.'
                }));

            } catch (e) {
                console.log(e)
            }

        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setReigstData((prevData) => ({
            ...prevData,
            [name]: value,
            idChk: name === "userId" ? false : prevData.idChk,
        }));
    };

    const validate = () => {
        return {
            userId: reigstData.userId ? (reigstData.idChk ? "" : "중복체크를 진행해 주세요.") : "아이디를 입력해주세요.",
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.values(validationErrors).every((x) => x === "")) {

            try {

                const res = await insertEvent(reigstData);

                if (res.status == "SUCCESS") {
                    navigate("/login");
                }

            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("회원가입 실패");
        }
    };

    return {
        reigstData,
        errors,
        alignment,
        handleToggle,
        handleChange,
        handleDuplicate,
        handleSubmit,
    };
};
