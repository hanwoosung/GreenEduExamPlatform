import {useEffect, useState} from "react";
import useFetch from "../../../../hooks/useFetch";
import {useScheduleEventService} from "../../../../services/teacher/useScheduleEventService";
import {showAddEventPopup, showDeleteConfirmation, showEditEventPopup} from "../../../../modal/teacher/ScheduleModal";
import Swal from "sweetalert2";
import useSessionStorage from "../../../../hooks/useSessionStorage";

export const useScheduleHandlers = () => {

    const {sessionValues} = useSessionStorage();

    const userId = sessionValues?.user?.userId;
    const userRoleCode = sessionValues?.user?.userRoleCode;

    console.log(userId);
    console.log(userRoleCode);

    const {data: fetchedEvents, loading: loadingEvents} = useFetch("/api/v1/calendar/" + userId);
    const {data: fetchedReadOnlyEvents, loading: loadingReadOnly} = useFetch("/api/v1/calendar/schedule/" + userId + "/" + userRoleCode);
    const {createEvent, updateEvent, deleteEvent} = useScheduleEventService();

    const [events, setEvents] = useState([]);
    const [localEvents, setLocalEvents] = useState([]);
    const [calendarKey, setCalendarKey] = useState(0);
    const removeImportantTag = (title) => title.replace(/^\[중요\] /, "");


    useEffect(() => {
        const colors = ["green", "purple", "orange", "blue", "yellow", "pink", "brown"];
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

    const handleAddEvent = async (selectInfo) => {
        const {value: formValues} = await showAddEventPopup();

        if (formValues) {
            const newEvent = {
                title: formValues.title,
                userId: userId,
                description: formValues.description || "",
                start: selectInfo.startStr,
                importantYn: formValues.isImportant ? "Y" : "N",
                readonly: false,
            };

            try {
                const response = await createEvent(newEvent);
                const addedEvent = {
                    ...newEvent,
                    id: response.body.toString(),
                    userId: userId,
                    title: formValues.isImportant ? `[중요] ${formValues.title}` : formValues.title,
                    backgroundColor: formValues.isImportant ? "red" : "#3788d8",
                    textColor: "white",
                };

                setLocalEvents((prevLocalEvents) => [...prevLocalEvents, addedEvent]);
                setEvents((prevEvents) => [...prevEvents, addedEvent]);
                setCalendarKey((prevKey) => prevKey + 1);

                Swal.fire("등록 완료", "일정이 성공적으로 추가되었습니다.", "success");
            } catch (error) {
                Swal.fire("등록 실패", "일정을 등록하지 못했습니다.", "error");
            }
        }
    };


    const handleEditEvent = async (event) => {
        const {value: formValues} = await showEditEventPopup(event);

        if (formValues) {
            const updatedEvent = {
                ...event,
                title: removeImportantTag(formValues.title),
                description: formValues.description,
                userId: event.userId,
                importantYn: formValues.isImportant ? "Y" : "N",
                backgroundColor: formValues.isImportant ? "red" : "#3788d8",
                textColor: "white",
            };

            try {
                await updateEvent(updatedEvent);

                setEvents((prevEvents) =>
                    prevEvents.map((e) =>
                        e.id === event.id
                            ? {
                                ...updatedEvent,
                                title:
                                    formValues.isImportant
                                        ? `[중요] ${removeImportantTag(formValues.title)}`
                                        : removeImportantTag(formValues.title),
                            }
                            : e
                    )
                );

                Swal.fire("수정 완료", "일정이 성공적으로 수정되었습니다.", "success");
            } catch (error) {
                Swal.fire("수정 실패", "일정을 수정하지 못했습니다.", "error");
            }
        }
    };


    const handleDeleteEvent = async (eventId) => {
        const result = await showDeleteConfirmation();
        if (result.isConfirmed) {
            try {
                await deleteEvent(eventId);
                setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
                Swal.fire("삭제 완료", "일정이 성공적으로 삭제되었습니다.", "success");
            } catch (error) {
                Swal.fire("삭제 실패", "일정을 삭제하지 못했습니다.", "error");
            }
        }
    };

    const handleEventDrop = async (info) => {
        const {id, start} = info.event;
        const existingEvent = events.find((event) => event.id === id);

        if (!existingEvent) return;

        const options = {timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit"};
        const formattedStart = new Intl.DateTimeFormat("ko-KR", options)
            .format(start)
            .replace(/\. /g, "-")
            .replace(".", "")
            .trim();

        const updatedEvent = {
            ...existingEvent,
            start: formattedStart,
            title: removeImportantTag(existingEvent.title),
        };

        try {
            await updateEvent(updatedEvent);

            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === id
                        ? {
                            ...updatedEvent,
                            title:
                                existingEvent.importantYn === "Y"
                                    ? `[중요] ${removeImportantTag(existingEvent.title)}`
                                    : removeImportantTag(existingEvent.title),
                        }
                        : event
                )
            );

            Swal.fire("수정 완료", "일정이 성공적으로 이동되었습니다.", "success");
        } catch (error) {
            Swal.fire("수정 실패", "일정을 이동하지 못했습니다.", "error");
        }
    };


    return {
        events,
        loadingEvents,
        loadingReadOnly,
        calendarKey,
        handleAddEvent,
        handleEditEvent,
        handleDeleteEvent,
        handleEventDrop,
    };
};
