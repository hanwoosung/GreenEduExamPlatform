import {useState, useEffect} from "react";
import useCrsRgstService from "../../../services/student/useCrsRgstService";
import Swal from "sweetalert2";
import useFetch from "../../../hooks/useFetch";
import useSessionStorage from "../../../hooks/useSessionStorage";

const useMyTestResult = () => {

    const {sessionValues} = useSessionStorage();
    let userId = sessionValues?.user?.userId;

    const {data: fetchedEvents, loading} = useFetch(`/api/v1/test-result/${userId}`);

    useEffect(() => {
        // fetchedEvents 로드 후 기본 화면 설정
        if (fetchedEvents) {
            setClasses(fetchedEvents);
        }
    }, [fetchedEvents]);

    const [classes, setClasses] = useState([]); // 현재 화면 상태
    const [currentView, setCurrentView] = useState("classes"); // 현재 화면 상태
    const [selectedClass, setSelectedClass] = useState(null); // 선택된 강의
    const [selectedSchedule, setSelectedSchedule] = useState(null); // 선택된 과목(일정)

    const handleClassClick = (cls) => {
        setSelectedClass(cls);
        setCurrentView("schedules");
    };

    const handleScheduleClick = (schedule) => {
        setSelectedSchedule(schedule);
        setCurrentView("tests");
    };

    const handleBack = () => {
        if (currentView === "tests") setCurrentView("schedules");
        else if (currentView === "schedules") setCurrentView("classes");
    };


    return {
        classes,
        currentView,
        selectedClass,
        selectedSchedule,
        handleBack,
        handleClassClick,
        handleScheduleClick
    };
};

export default useMyTestResult
