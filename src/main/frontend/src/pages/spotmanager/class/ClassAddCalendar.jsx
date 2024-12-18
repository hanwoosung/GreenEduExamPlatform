import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import React from "react";

const ClassAddCalendar = ({calendarEvents}) => {
    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={koLocale}
                events={calendarEvents}
                headerToolbar={{
                    left: "",
                    center: "title",
                    right: "prev,next today",
                }}
                height="auto"
            />
        </div>
    );
}

export default ClassAddCalendar;