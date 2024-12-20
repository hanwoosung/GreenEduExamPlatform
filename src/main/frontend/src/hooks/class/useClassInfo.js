import useApi2 from "../useApi2";

const useClassInfo = () => {
    const {get} = useApi2();

    const getClassInfo = (classNo) => {
        return get("api/v1/spot-manager/crs-rgst?classNo=" + classNo);
    }
    return {getClassInfo}
}
export default useClassInfo;