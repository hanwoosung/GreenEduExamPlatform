import {useState} from "react";
import {useUserinfoService} from "../../../services/common/useUserinfoService";
import {useNavigate} from 'react-router-dom';
import useSessionStorage from "../../../hooks/useSessionStorage";

export const useUserInfoHandler = () => {

    const navigate = useNavigate();
    const {updateEvent, spotEvent} = useUserinfoService();

    const {sessionValues, getSession} = useSessionStorage();

    console.log(sessionValues);

    const [userData, setUserData] = useState({
        userId: sessionValues?.user.userId,
        name: sessionValues?.user.name,
        userPassword: "",
        confirmPassword: "",
        userRoleCode: sessionValues?.user.userRoleCode,
        userBirth: sessionValues?.user.userBirth,
        spot: {spotName: sessionValues?.user.spotNm, spotNo: sessionValues?.user.spotCd}
    });
    const [errors, setErrors] = useState({});

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        (async () => {
            setLoading(true);

            const res = await spotEvent();
            if (res.status === "SUCCESS") {
                setLoading(false);
                setOptions(res.body.map((data) => {
                    console.log(data);
                    return {spotNo: data.spotNo, spotName: data.spotName}
                }));
            }
        })();
    };

    const handleClose = () => {
        setOpen(false);
        setOptions([]);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
            idChk: name === "userId" ? false : prevData.idChk,
        }));
    };

    const handleAutocomplete = (name, value) => {
        console.log(name + "이름");
        console.log(value);
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };

    const validate = () => {
        return {
            userId: userData.userId ? (userData.idChk ? "" : "중복체크를 진행해 주세요.") : "아이디를 입력해주세요.",
            name: userData.name ? "" : "이름을 입력해주세요.",
            userBirth: userData.userBirth ? "" : "생년월일을 입력해주세요.",
            idChk: userData.idChk ? "" : "중복체크를 진행해 주세요.",
            userPassword: userData.userPassword.length >= 8
                ? ""
                : "비밀번호는 최소 8자 이상이어야 합니다.",
            confirmPassword:
                userData.userPassword === userData.confirmPassword
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

                const res = await updateEvent(userData);

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

    const topFilms = [

        {spotName: '서면점', spotNo: 1},
        {spotName: '경성대점', spotNo: 2},
    ];

    return {
        userData,
        errors,
        open,
        options,
        loading,
        handleOpen,
        handleClose,
        handleChange,
        handleAutocomplete,
        handleSubmit,
    };
};
