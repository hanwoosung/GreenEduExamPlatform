import useApi from "../../hooks/useApi";

export const useLoginEventService = () => {
    const {post, get} = useApi("", {
        withCredentials: true,
        headers: {
            // "Content-Type": "application/json",
        },
    });

    // 회원 등록
    const loginEvent = async (userData) => {
        return await post(userData, {}, "");
    };

    const spotEvent = async () => {
        return await get("all", {}, "/spot");
    };

    return {loginEvent, spotEvent};
};
