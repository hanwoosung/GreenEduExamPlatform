import useApi from "../../hooks/useApi";

export const useRegistEventService = () => {
    const {get, post} = useApi("/api/v1/regist", {
        headers: {
            "Content-Type": "application/json"
        },
    });

    // 아이디 중복 체크
    const getEvent = async (userId) => {
        return await get(`cnt/${userId}`);
    };

    // 회원 등록
    const insertEvent = async (userData) => {
        return await post(userData, {}, "");
    };

    return {insertEvent, getEvent};
};
