import useApi from "../../hooks/useApi";

export const useScheduleEventService = () => {
    const {post, put, del} = useApi("/api/v1/calendar", {
        headers: {
            "Content-Type": "application/json"
        },
    });

    // 일정 등록
    const createEvent = async (eventData) => {
        return await post(eventData, {}, "");
    };

    // 일정 수정
    const updateEvent = async (eventData) => {
        const {id, ...data} = eventData;
        return await put(data, {}, `/api/v1/calendar/${id}`);
    };

    // 일정 삭제
    const deleteEvent = async (eventId) => {
        return await del(`${eventId}`);
    };

    return {createEvent, updateEvent, deleteEvent};
};
