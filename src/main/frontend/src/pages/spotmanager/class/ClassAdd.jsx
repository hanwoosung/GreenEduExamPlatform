import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import "../../../assets/css/spotmanager/classAdd.css";
import Swal from 'sweetalert2';
import useFormHandler from "../../../hooks/spotmanager/classadd/useFormHandler";
import useSchedules from "../../../hooks/spotmanager/classadd/useSchedules";
import useClassData from "../../../hooks/spotmanager/classadd/useClassData";
import useSessionStorage from "../../../hooks/useSessionStorage";

const ClassAdd = () => {
    const {sessionValues} = useSessionStorage();
    const {user} = sessionValues;
    const {classData, teachers, rooms} = useClassData(user?.spotNo);
    const {formData, setFormData, errors, validate, handleChange, initialFormData} =
        useFormHandler();
    const {
        schedules,
        setSchedules,
        handleScheduleAdd,
        handleScheduleDelete,
        handleScheduleChange,
        classNo,
        setClassNo,
        calendarEvents,
        setCalendarEvents
    } =
        useSchedules();
    const [isReg, setIsReg] = useState(true);
    // const [selectedClass, setSelectedClass] = useState(null);
    const isRegStr = () => {return isReg ? '강의 등록' : '강의 수정'};


    const [selectedTeachers, setSelectedTeachers] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate(selectedTeachers, selectedRoom)) {
            Swal.fire({
                icon: "success",
                className: "강의가 성공적으로 등록되었습니다!",
                timer: 1500,
                showConfirmButton: false,
            });

            // setCalendarEvents([
            //     ...calendarEvents,
            //     ...schedules.map((sch) => ({
            //         className: sch.name,
            //         start: sch.startDate,
            //         end: sch.endDate,
            //     })),
            // ]);


            setFormData(initialFormData);
            setSelectedTeachers("");
            setSelectedRoom("");
            setSchedules([]);
            setCalendarEvents([]);
        }
    };

    const handleClassSelect = (e) => {
        const jsonValue = JSON.parse(e.target.value);
        setClassNo(jsonValue.classNo === classNo ? null : jsonValue.classNo);

        if (jsonValue.classNo === classNo) {
            setFormData(initialFormData);
            setIsReg(true);
        } else {
            setFormData(jsonValue);
            setIsReg(false);
        }
    };


    return (
        <div className="flex">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1>{isRegStr()}</h1>

                    <div>
                        <label htmlFor="className">강의 제목</label>
                        <input
                            id="className"
                            name="className"
                            value={formData.className}
                            onChange={handleChange}
                            className={errors.className ? "error-input" : ""}
                            maxLength={50}
                            placeholder="강의 제목을 입력하세요"
                        />
                        {errors.className && (
                            <p className="error-message">{errors.className}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="startDate">시작 날짜</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className={errors.startDate ? "error-input" : ""}
                        />
                        {errors.startDate && (
                            <p className="error-message">{errors.startDate}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="endDate">종료 날짜</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className={errors.endDate ? "error-input" : ""}
                        />
                        {errors.endDate && (
                            <p className="error-message">{errors.endDate}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="maxPeople">수강 정원</label>
                        <input
                            type="number"
                            id="maxPeople"
                            name="maxPeople"
                            value={formData.maxPeople}
                            onChange={handleChange}
                            className={errors.maxPeople ? "error-input" : ""}
                            min="1" // 최소값 설정
                            placeholder="수강 정원을 입력하세요"
                        />
                        {errors.maxPeople && (
                            <p className="error-message">{errors.maxPeople}</p>
                        )}
                    </div>

                    <div className="instructor-select">
                        <label htmlFor="teachers">강사 선택</label>
                        <select
                            id="teachers"
                            value={selectedTeachers}
                            onChange={(e) => setSelectedTeachers(e.target.value)}
                            className={errors.teachers ? "error-input" : ""}
                        >
                            <option value="">강사를 선택하세요</option>
                            {teachers && teachers.map((teacher) => (
                                <option key={teacher.userId} value={teacher.userId}>
                                    {teacher.name + '\t' + teacher.userBirth}
                                </option>
                            ))}
                        </select>
                        {errors.teachers && (
                            <p className="error-message">{errors.teachers}</p>
                        )}
                    </div>

                    <div className="room-select">
                        <label htmlFor="room">강의실 선택</label>
                        <select
                            id="room"
                            value={selectedRoom}
                            onChange={(e) => setSelectedRoom(e.target.value)}
                            className={errors.room ? "error-input" : ""}
                        >
                            <option value="">강의실을 선택하세요</option>
                            {rooms.map((room) => (
                                <option key={room.id} value={room.roomNo}>
                                    {room.roomName}
                                </option>
                            ))}
                        </select>
                        {errors.room && (
                            <p className="error-message">{errors.room}</p>
                        )}
                    </div>

                    <div className="schedules">
                        <h3>스케줄</h3>
                        <button type="button" className="add-schedule-button" onClick={handleScheduleAdd}>
                            스케줄 추가
                        </button>
                        {schedules.map((sch, index) => (
                            <div key={index} className="schedule-input">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="스케줄명"
                                    value={sch.scheduleName}
                                    onChange={(e) => handleScheduleChange(index, e)}
                                />
                                <div className="schedule-bottom">
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={sch.startDate}
                                        onChange={(e) => handleScheduleChange(index, e)}
                                    />
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={sch.endDate}
                                        onChange={(e) => handleScheduleChange(index, e)}
                                    />
                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={() => handleScheduleDelete(index)}
                                    >
                                        X
                                    </button>
                                </div>
                                <hr/>
                            </div>
                        ))}
                    </div>

                    <div style={{marginTop: "20px"}}>
                        <button type="submit">{isRegStr()}</button>
                    </div>
                </form>

                <div className="course-list">
                    <h2>등록된 강의 목록</h2>
                    {classData && classData.length > 0 ? (
                        classData.map((clazz) => (
                            <button
                                key={clazz.classNo}
                                value={JSON.stringify(clazz)}
                                onClick={(e) => handleClassSelect(e)}
                                className={clazz.classNo === classNo ? "selected" : ""}
                            >
                                {clazz.className} <br/>
                                {clazz.startDate} ~ {clazz.endDate}
                            </button>
                        ))
                    ) : (
                        <p className="no-courses">등록된 강의가 없습니다.</p>
                    )}
                </div>
            </div>
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
                    dateClick={(info) => {
                        console.log("날짜 클릭: ", info.dateStr);
                    }}
                />
            </div>
        </div>
    );
};

export default ClassAdd;