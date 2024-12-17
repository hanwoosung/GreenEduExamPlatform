import useApi from "../../hooks/useApi";

export const useLoginEventService = () => {
    const {post} = useApi("/loginProc", {
        withCredentials: true,
        headers: {
            // "Content-Type": "application/json",
        },
    });

    // 회원 등록
    const loginEvent = async (userData) => {
        return await post(userData, {}, "");
    };

    return {loginEvent};
};
