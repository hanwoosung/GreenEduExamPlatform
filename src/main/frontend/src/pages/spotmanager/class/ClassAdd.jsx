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
import ClassAddCalendar from "../../../components/spotmanager/ClassAddCalendar";
import useApi2 from "../../../hooks/useApi2";
import {useLocation} from "react-router-dom";

const ClassAdd = () => {
    const {post} = useApi2();
    const {sessionValues} = useSessionStorage();
    const {user} = sessionValues;
    const {setSpotNo, classData, teachers, rooms, refreshData} = useClassData();
    const {formData, setFormData, errors, validate, handleChange, initialFormData} =
        useFormHandler();
    const [dateModifyNum, setDateModifyNum] = useState(null);
    const location = useLocation();
    const {state} = location;

    useEffect(() => {
        setSpotNo(user?.spotNo);
    }, []);

    useEffect(() => {
        if (state?.classNo) {
            console.log(state.classNo);

            setClassNo(state.classNo);
            console.log(classData);
            const selectedClassData = classData
                .filter((clazz) => clazz.classNo === state.classNo)
                .map((clazz) => {
                    return { ...clazz };
                });
            const objClassData = {...selectedClassData[0]};
            console.log(objClassData);
            setFormData(objClassData);
            setIsReg(false);
            setSelectedTeachers(objClassData.userId);
            setSelectedRoom(objClassData.roomNo);
        }
    }, [classData])

    const {
        schedules,
        setSchedules,
        handleScheduleAdd,
        handleScheduleDelete,
        handleScheduleChange,
        handleScheduleChangeDate,
        classNo,
        setClassNo,
        calendarEvents,
        setCalendarEvents,
    } =
        useSchedules();
    const [isReg, setIsReg] = useState(true);
    const isRegStr = () => {
        return isReg ? '강의 등록' : '강의 수정'
    };


    const [selectedTeachers, setSelectedTeachers] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate(selectedTeachers, selectedRoom, schedules);

        if (isValid) {
            // console.log(formData);
            // console.log(selectedTeachers);
            // console.log(selectedRoom);
            // console.log(schedules)

            const submitData = async () => {
                await post("api/v1/spot-manager/class", {
                    body: {
                        classEntity: {
                            ...formData,
                            userId: selectedTeachers,
                            roomNo: selectedRoom,
                            spotNo: user.spotNo
                        },
                        scheduleList: [...schedules]
                    }
                }).then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "강의가 " + (isReg ? "등록" : "수정") + "되었습니다",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    setClassNo(null);

                    setFormData(initialFormData);
                    setIsReg(true);
                    setSelectedTeachers('');
                    setSelectedRoom('');
                    setSchedules([]);
                    setCalendarEvents([]);

                    refreshData();
                })
            }
            submitData();
        }
    }

    const handleClassSelect = (e) => {
        const jsonValue = JSON.parse(e.target.value);
        setClassNo(jsonValue.classNo === classNo ? null : jsonValue.classNo);

        if (jsonValue.classNo === classNo) {
            setFormData(initialFormData);
            setIsReg(true);
            setSelectedTeachers('');
            setSelectedRoom('');
        } else {
            setFormData(jsonValue);
            setIsReg(false);
            setSelectedTeachers(jsonValue.userId);
            setSelectedRoom(jsonValue.roomNo);
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
                        <button
                            type="button"
                            className="add-schedule-button"
                            onClick={handleScheduleAdd}
                            aria-label="스케줄 추가"
                        >
                            스케줄 추가
                        </button>
                        <div className="date-modify-form">
                            <input
                                style={{width: "60%"}}
                                type="number"
                                placeholder="조정할 날짜 입력"
                                id="dateModify"
                                value={dateModifyNum}
                                onChange={(e) => setDateModifyNum(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => handleScheduleChangeDate(dateModifyNum)}
                            >
                                스케줄 일괄 조정
                            </button>
                        </div>
                        <hr style={{"marginBottom": "10px"}}/>
                        {schedules.map((sch, index) => (
                            <div key={index} className="schedule-input">
                                <input
                                    type="text"
                                    name="scheduleName"
                                    placeholder="스케줄명"
                                    value={sch.scheduleName}
                                    onChange={(e) => handleScheduleChange(index, e)}
                                    className="schedule-name-input"
                                />
                                {errors[`scheduleName-${index}`] && (
                                    <p className="error-message">{errors[`scheduleName-${index}`]}</p>
                                )}

                                <div className="schedule-bottom">
                                    <div className="date-form">
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={sch.startDate}
                                            onChange={(e) => handleScheduleChange(index, e)}
                                            className="schedule-date-input"
                                        />
                                        {errors[`startDate-${index}`] && (
                                            <p className="error-message">{errors[`startDate-${index}`]}</p>
                                        )}
                                    </div>
                                    <div className="date-form">
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={sch.endDate}
                                            onChange={(e) => handleScheduleChange(index, e)}
                                            className="schedule-date-input"
                                        />
                                        {errors[`endDate-${index}`] && (
                                            <p className="error-message">{errors[`endDate-${index}`]}</p>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={() => handleScheduleDelete(index, sch.scheduleNo)}
                                        aria-label={`스케줄 삭제 ${sch.name || `#${index + 1}`}`}
                                    >
                                        ✖
                                    </button>
                                </div>
                                <hr className="schedule-divider"/>
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
            <ClassAddCalendar calendarEvents={calendarEvents}/>
        </div>
    );
};

export default ClassAdd;