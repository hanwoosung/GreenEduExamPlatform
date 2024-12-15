import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import {useScheduleHandlers} from "../../assets/js/teacher/schedule/scheduleLogic";
import "../../assets/css/teacher/schedule/schedule.css"
import Swal from "sweetalert2";

const Schedule = () => {
    const {
        events,
        loadingEvents,
        loadingReadOnly,
        calendarKey,
        handleAddEvent,
        handleEditEvent,
        handleDeleteEvent,
        handleEventDrop,
    } = useScheduleHandlers();

    return (
        <div>
            {loadingEvents || loadingReadOnly ? (
                <h1>loading..중..</h1>
            ) : (
                <FullCalendar
                    key={calendarKey}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    locale={koLocale}
                    selectable={true}

                    eventDrop={handleEventDrop}
                    editable={true}
                    headerToolbar={{
                        left: "",
                        center: "title",
                        right: "prev,next today",
                    }}
                    select={handleAddEvent}
                    eventClick={(info) => {
                        const clickedEvent = events.find((e) => e.id === info.event.id);
                        if (clickedEvent.readonly) {
                            Swal.fire({
                                title: `읽기 전용 이벤트\n <h4 style="color: black"> ${clickedEvent.title}</h4>`,
                                text: "이 스케줄을 수정하려면 학원에 문의하세요.",
                                icon: "info",
                                confirmButtonText: "확인",
                            });
                            return;
                        }

                        Swal.fire({
                            title: `선택한 일정: ${clickedEvent.title}`,
                            text: clickedEvent.description || "상세 내용 없음",
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: "수정",
                            denyButtonText: "삭제",
                            cancelButtonText: "닫기",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleEditEvent(clickedEvent);
                            } else if (result.isDenied) {
                                handleDeleteEvent(clickedEvent.id);
                            }
                        });
                    }}
                />
            )}
        </div>
    );
};

export default Schedule;
