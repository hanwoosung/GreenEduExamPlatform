import useApi2 from "../../hooks/useApi2";
import useSessionStorage from "../../hooks/useSessionStorage";

const useCrsRgstService = () => {

    const {get, post, put, del, loading, error} = useApi2();
    const {sessionValues} = useSessionStorage();
    // 강의 가져오기
    const getCrsEvent = async (option) => {
        return await get("/api/v1/crs-rgst/" + sessionValues?.user?.userId, option);
    };

    const postEvent = async (option = {}) => {
        let params = {
            userId: sessionValues?.user?.userId,
            classNo: option.classNo
        }
        return await post("/api/v1/crs-rgst", {params});
    };

    return {getCrsEvent, postEvent};
};

export default useCrsRgstService;