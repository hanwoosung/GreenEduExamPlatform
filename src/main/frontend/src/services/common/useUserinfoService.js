import useApi from "../../hooks/useApi";

export const useUserinfoService = () => {
    const {put, get} = useApi("", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    // 회원 등록
    const updateEvent = async (userData) => {
        return await put(userData, {}, "api/v1/user");
    };

    const spotEvent = async () => {
        return await get("all", {}, "/spot");
    };

    return {updateEvent, spotEvent};
};
