import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import useFetch from "../../hooks/useFetch";
import "../../assets/css/spotmanager/classAdd.css";

const ClassAdd = () => {
    const { data, isLoading, error } = useFetch('/api/v1/spot-manager/class/1');
    const [classData, setClassData] = useState(null);

    useEffect(() => {
        if (data) {
            setClassData(data);
            console.log(data);
        }
    }, [data]);

    const [formData, setFormData] = useState({
        title: "",
        startDate: "",
        endDate: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form Data: ", formData);
            alert("강의가 성공적으로 등록되었습니다!");
            setFormData({
                title: "",
                startDate: "",
                endDate: "",
            });
        }
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

                    <button type="submit">강의 등록</button>
                </form>

                <div className="course-list">
                    <h2>등록된 강의 목록</h2>
                    {classData && classData.length > 0 ? (
                        classData.map((clazz) => (
                            <button key={clazz.id}>{clazz.className}</button>
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
                    events={[]}
                    headerToolbar={{
                        left: "",
                        center: "title",
                        right: "prev,next today",
                    }}
                    dateClick={(info) => {
                        // 날짜 클릭 시 처리 로직
                    }}
                />
            </div>
        </div>
    );
};

export default ClassAdd;
