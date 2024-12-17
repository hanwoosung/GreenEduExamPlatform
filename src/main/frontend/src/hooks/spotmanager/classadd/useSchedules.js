import {useEffect, useState} from "react";
import {handleDelete} from "../../../modal/common/swals";
import useApi2 from "../../useApi2";

const colors = ["green", "purple", "orange", "blue", "yellow", "pink", "brown"];
const useSchedules = () => {
    const {get} = useApi2();
    const [classNo, setClassNo] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);

    const handleScheduleAdd = () => {
        setSchedules((prev) => [...prev, {name: "", startDate: "", endDate: ""}]);

        /* TODO : 해야됨 */
        setCalendarEvents([
            ...calendarEvents, // 기존 이벤트 유지
            {
                id: calendarEvents.length,
                title: "몰라",
                start: "2024-12-18",
                end: "2024-12-22",
                readonly: true,
                backgroundColor: colors[calendarEvents.length % colors.length],
            },
        ]);

    };

    const handleScheduleDelete = (index) => {
        handleDelete(() => {
                setSchedules((prev) => prev.filter((_, i) => i !== index));
                setCalendarEvents((prev) => prev.filter((_, i) => i !== index));
            }
        );
    };

    const handleScheduleChange = (index, e) => {
        const {name, value} = e.target;
        setSchedules((prev) =>
            prev.map((sch, i) => (i === index ? {...sch, [name]: value} : sch))
        );

        /* TODO : 해야됨 */
        setCalendarEvents((prevEvents) =>
            prevEvents.map((prev, i) => {
                if (index === i) return prev;
                return prev;
            })
        );
    };

    useEffect(() => {
        if (!classNo) {
            setSchedules([]);
            return;
        }


        const updateData = async () => {
            const scheduleResult = await get("api/v1/spot-manager/schedule/" + classNo);

            const events = scheduleResult?.map((schedule, index) => ({
                id: `readonly-${schedule.scheduleNo || index}`,
                title: schedule.scheduleName,
                start: schedule.startDate,
                end: schedule.endDate,
                readonly: true,
                backgroundColor: colors[index % colors.length],
            })) || [];

            setCalendarEvents([...events]);
            setSchedules(scheduleResult || []);
        }
        updateData();


    }, [classNo]);
    
    return {
        schedules,
        setSchedules,
        handleScheduleAdd,
        handleScheduleDelete,
        handleScheduleChange,
        classNo,
        setClassNo
    };
};

export default useSchedules;
