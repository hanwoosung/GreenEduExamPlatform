import {useEffect, useState} from "react";
import useFetch from "../../../hooks/useFetch";
import useSessionStorage from "../../useSessionStorage";

export const useScheduleData = () => {

    const {sessionValues} = useSessionStorage();

    const userId = sessionValues?.user?.userId;
    const userRoleCode = sessionValues?.user?.userRoleCode;

    const {data: fetchedEvents, loading: loadingEvents} = useFetch("/api/v1/calendar/" + userId);
    const {data: fetchedReadOnlyEvents, loading: loadingReadOnly} = useFetch("/api/v1/calendar/schedule/" + userId + "/" + userRoleCode);

    const [events, setEvents] = useState([]);
    const [localEvents, setLocalEvents] = useState([]);
    const [calendarKey, setCalendarKey] = useState(0);

    useEffect(() => {
        const colors = ["green", "purple", "orange", "red", "yellow", "pink", "brown"];

        const readonlyEvents = fetchedReadOnlyEvents?.map((event, index) => ({
            id: `readonly-${event.id || index}`,
            title: event.title,
            start: event.start,
            end: event.end,
            readonly: true,
            backgroundColor: colors[index % colors.length],
        })) || [];

        const normalEvents = fetchedEvents?.map((event) => ({
            ...event,
            id: event.id.toString(),
            title: event.importantYn === "Y" ? `[중요] ${event.title}` : event.title,
            start: event.start,
            userId: event.userId,
            description: event.description || "",
            readonly: false,
            backgroundColor: event.importantYn === "Y" ? "red" : "#3788d8",
            textColor: "white",
        })) || [];

        setEvents([...readonlyEvents, ...normalEvents, ...localEvents]);
        setCalendarKey((prevKey) => prevKey + 1);
    }, [fetchedEvents, fetchedReadOnlyEvents, localEvents]);

    return {events, setEvents, localEvents, setLocalEvents, calendarKey, loadingEvents, loadingReadOnly};
};
