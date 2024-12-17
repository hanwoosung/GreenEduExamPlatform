import useApi from "../../hooks/useApi";

export const useUserinfoService = () => {
    const {put} = useApi("/api/v1/userinfo", {
        headers: {
            "Content-Type": "application/json"
        },
    });

    // 회원 등록
    const insertEvent = async (userData) => {
        return await put(userData, {}, "");
    };

    return {insertEvent};
};
