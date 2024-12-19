import {useEffect, useState} from "react";
import {swalDelete} from "../../../modal/common/swals";
import useApi2 from "../../useApi2";
import {addDay} from "../../../assets/js/common/convert";

const colors = ["green", "purple", "orange", "blue", "yellow", "pink", "brown"];

const useSchedules = () => {
    const {get, put} = useApi2();
    const [classNo, setClassNo] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);

    const handleScheduleAdd = () => {
        const newSchedule = {scheduleName: "", startDate: "", endDate: ""};
        const newEvent = {
            id: calendarEvents.length,
            title: "",
            start: "",
            end: "",
            backgroundColor: colors[calendarEvents.length % colors.length],
        };

        setSchedules((prev) => [...prev, newSchedule]);
        setCalendarEvents((prev) => [...prev, newEvent]);
    };

    const handleScheduleDelete = (index, scheduleNo) => {
        swalDelete(() => {
            if (scheduleNo) {
                console.log(scheduleNo);
                put("api/v1/spot-manager/schedule/" + scheduleNo);
            }

            setSchedules((prev) => prev.filter((_, i) => i !== index));
            setCalendarEvents((prev) => prev.filter((_, i) => i !== index)
                .map((prev, i) => (
                    {
                        ...prev,
                        backgroundColor: colors[i % colors.length]
                    }
                )));
        });
    };

    const handleScheduleChange = (index, e) => {
        const {name, value} = e.target;

        setSchedules((prev) =>
            prev.map((sch, i) => (i === index ? {...sch, [name]: value} : sch))
        );

        setCalendarEvents((prevEvents) =>
            prevEvents.map((event, i) => {
                if (i === index) {
                    const updatedEvent = {
                        ...event,
                        title: name === "scheduleName" ? value : event.title,
                        start: name === "startDate" ? value : event.start,
                        end: name === "endDate" ? addDay(value) : event.end,
                    };
                    return updatedEvent;
                }
                return event;
            })
        );
    };
    const handleScheduleChangeDate = (value) => {
        if (!!value && value !== 0) {
            const addEndDate = Number(value) + 1;

            console.log(addEndDate);
            const updatedSchedules = schedules.map((sch) => ({
                ...sch,
                startDate: addDay(sch.startDate, value),
                endDate: addDay(sch.endDate, addEndDate),
            }));

            const updatedCalendarEvents = calendarEvents.map((even) => ({
                ...even,
                start: addDay(even.start, value),
                end: addDay(even.end, addEndDate),
            }));

            // console.log(updatedSchedules);
            setSchedules(updatedSchedules);
            setCalendarEvents(updatedCalendarEvents);
        }
    }

    useEffect(() => {
        if (!classNo) {
            setSchedules([]);
            setCalendarEvents([]);
            return;
        }

        const updateData = async () => {
            const scheduleResult = await get(`api/v1/spot-manager/schedule/${classNo}`);

            const events = (scheduleResult || []).map((schedule, index) => ({
                id: index,
                title: schedule.scheduleName,
                start: schedule.startDate,
                end: addDay(schedule.endDate),
                backgroundColor: colors[index % colors.length],
            }));

            // console.log(scheduleResult);
            setSchedules(scheduleResult || []);
            setCalendarEvents(events);
        };

        updateData();
    }, [classNo]);

    return {
        schedules,
        setSchedules,
        handleScheduleAdd,
        handleScheduleDelete,
        handleScheduleChange,
        handleScheduleChangeDate,
        classNo,
        setClassNo,
        calendarEvents,
        setCalendarEvents
    };
};

export default useSchedules;
