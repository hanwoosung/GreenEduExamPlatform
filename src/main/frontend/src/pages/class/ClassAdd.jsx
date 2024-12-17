import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import useFetch from "../../hooks/useFetch";
import "../../assets/css/spotmanager/classAdd.css";
import useApi2 from "../../hooks/useApi2";
import {handleDelete} from "../../modal/common/swals";
import Swal from 'sweetalert2';

const ClassAdd = () => {
    const {get} = useApi2();
    const [classData, setClassData] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [teachers, setTeachers] = useState([]); // 강사 목록
    const [selectedInstructor, setSelectedInstructor] = useState("");
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [schedules, setSchedules] = useState([]); // 스케줄 목록
    const [rooms, setRooms] = useState([]); // 강의실 목록
    const [selectedRoom, setSelectedRoom] = useState("");

    // 강사 목록 가져오기 (예시)
    useEffect(() => {
        const getClass = async () => {
            const result = await get("api/v1/spot-manager/class/1");
            console.log(result);
            setClassData(result);
        }

        const getTeachers = async () => {
            const result = await get("api/v1/spot-manager/teacher/1");
            console.log(result);
            setTeachers(result);
        }

        const getClassRoom = async () => {
            const result = await get("api/v1/spot-manager/class-room/1");
            console.log(result);
            setRooms(result);
        }
        getClass();
        getTeachers();
        getClassRoom();
    }, []);

    const [formData, setFormData] = useState({
        title: "",
        startDate: "",
        endDate: "",
        maxPeople: "",
    });


    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleScheduleAdd = () => {
        setSchedules((prevSchedules) => [
            ...prevSchedules,
            {name: "", startDate: "", endDate: ""},
        ]);
    };

    const handleScheduleDelete = (index) => {
        handleDelete(() => setSchedules((prevSchedules) => prevSchedules.filter((_, i) => i !== index)));
    };

    const handleScheduleChange = (index, e) => {
        const {name, value} = e.target;
        const updatedSchedules = schedules.map((schedule, i) =>
            i === index ? {...schedule, [name]: value} : schedule
        );
        setSchedules(updatedSchedules);
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.title) {
            newErrors.title = "강의 제목을 입력해주세요.";
        }

        if (!formData.startDate) {
            newErrors.startDate = "강의 시작일을 선택해주세요.";
        }

        if (!formData.endDate) {
            newErrors.endDate = "강의 수료일을 선택해주세요.";
        } else if (formData.startDate && formData.endDate < formData.startDate) {
            newErrors.endDate = "수료일은 시작일 이후여야 합니다.";
        }

        if (!selectedInstructor) {
            newErrors.instructor = "강사를 선택해주세요.";
        }

        if (!selectedRoom) {
            newErrors.room = "강의실을 선택해주세요.";
        }

        if (!formData.capacity || formData.capacity <= 0) {
            newErrors.capacity = "수강 정원은 1명 이상이어야 합니다.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };




    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form Data: ", formData, "Instructor: ", selectedInstructor, "Room: ", selectedRoom);
            console.log("Schedules: ", schedules);
            Swal.fire({
                icon: 'success',
                title: '강의가 성공적으로 등록되었습니다!',
                showConfirmButton: false,
                timer: 1500
            });
            setCalendarEvents((prevEvents) => [
                ...prevEvents,
                ...schedules.map((sch) => ({
                    title: sch.name,
                    start: sch.startDate,
                    end: sch.endDate,
                })),
            ]);
            setFormData({
                title: "",
                startDate: "",
                endDate: "",
                maxPeople: "",
            });
            setSelectedInstructor("");
            setSelectedRoom("");
            setSchedules([]);
        }
    };


    const handleClassSelect = (classNo) => {
        setSelectedClass(!!classNo && classNo === selectedClass ? null : classNo);
    };

    return (
        <div className="flex">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1>강의 등록</h1>

                    <div>
                        <label htmlFor="title">강의 제목</label>
                        <input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={errors.title ? "error-input" : ""}
                            maxLength={50}
                            placeholder="강의 제목을 입력하세요"
                        />
                        {errors.title && (
                            <p className="error-message">{errors.title}</p>
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
                        <label htmlFor="capacity">수강 정원</label>
                        <input
                            type="number"
                            id="capacity"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            className={errors.capacity ? "error-input" : ""}
                            min="1" // 최소값 설정
                            placeholder="수강 정원을 입력하세요"
                        />
                        {errors.capacity && (
                            <p className="error-message">{errors.capacity}</p>
                        )}
                    </div>

                    <div className="instructor-select">
                        <label htmlFor="instructor">강사 선택</label>
                        <select
                            id="instructor"
                            value={selectedInstructor}
                            onChange={(e) => setSelectedInstructor(e.target.value)}
                            className={errors.instructor ? "error-input" : ""}
                        >
                            <option value="">강사를 선택하세요</option>
                            {teachers && teachers.map((teacher) => (
                                <option key={teacher.userId} value={teacher.userId}>
                                    {teacher.name + '\t' + teacher.userBirth}
                                </option>
                            ))}
                        </select>
                        {errors.instructor && (
                            <p className="error-message">{errors.instructor}</p>
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
                                    value={sch.name}
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
                        <button type="submit">강의 등록</button>
                    </div>
                </form>

                <div className="course-list">
                    <h2>등록된 강의 목록</h2>
                    {classData && classData.length > 0 ? (
                        classData.map((clazz) => (
                            <button
                                key={clazz.classNo}
                                value={clazz.classNo}
                                onClick={() => handleClassSelect(clazz.classNo)}
                                className={clazz.classNo === selectedClass ? "selected" : ""}
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
