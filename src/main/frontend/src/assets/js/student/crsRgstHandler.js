import {useState, useEffect} from "react";
import useCrsRgstService from "../../../services/student/useCrsRgstService";

const useCrsRgstHandler = () => {
    const {getCrsEvent, postEvent} = useCrsRgstService();

    const filterButtons = [
        {title: "전체", value: ""},
        {title: "신청", value: "APPLY"},
        {title: "진행중", value: "NO"},
        {title: "중도탈락", value: "DEL"},
        {title: "수료완료", value: "CLEAR"}
    ];

    const [crsList, setCrsList] = useState([]); // 초기 상태
    const [filter, setFilter] = useState(""); // 기본 필터 상태
    const [filters, setFilters] = useState(filterButtons);

    const getData = async () => {

        try {
            let res = await getCrsEvent(); // 데이터를 가져옵니다.
            setCrsList(res); // 상태 업데이트
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    };

    useEffect(() => {
        getData(); // 컴포넌트 마운트 시 데이터 로드
    }, []);

    const filteredClasses = crsList.filter((cls) => {
        if (!filter || filter === "") return true; // 기본값 확인
        return filter === cls.graduateCode; // 조건 필터링
    });

    const getStatusTitle = (statusValue) => {
        const status = filters.find((item) => item.value === statusValue);
        return status ? status.title : "신청하기";
    };

    // 신청 버튼 클릭 이벤트 핸들러
    const handleApplyClick = async (cls) => {
        try {
            let res = await postEvent(cls);
            if (res.status === "ERROR") {
                console.log(res.body);
            } else {
                setCrsList((prevData) =>
                    prevData.map((item) =>
                        item.classNo === cls.classNo
                            ? { ...item, graduateCode: "APPLY" }
                            : item
                    )
                );
            }
        } catch (e) {
            console.log(e);
        }
    };

    return {
        filter,
        setFilter,
        getStatusTitle,
        filters,
        filteredClasses,
        handleApplyClick
    };
};

export default useCrsRgstHandler
