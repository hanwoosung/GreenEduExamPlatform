import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import useFetch from "../../hooks/useFetch";

const ClassAdd = () => {

    const { data, isLoading, error } = useFetch('/api/v1/spot-manager/class/1');
    const [classData, setClassData] = useState(null);

    // useEffect로 상태 업데이트 제어
    useEffect(() => {
        if (data) {
            setClassData(data);
            console.log(data);
        }
    }, [data]); // data가 변경될 때만 실행

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
            // 폼 제출 후 초기화
            setFormData({
                title: "",
                startDate: "",
                endDate: "",
            });
        }
    };

    return (
        <div className="flex">
            <div className="flex-col">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium mb-1">
                            강의 제목
                        </label>
                        <input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full p-2 border ${
                                errors.title ? "border-red-500" : "border-gray-300"
                            } rounded-md`}
                            maxLength={50}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                            시작 날짜
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className={`w-full p-2 border ${
                                errors.startDate ? "border-red-500" : "border-gray-300"
                            } rounded-md`}
                        />
                        {errors.startDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                            종료 날짜
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className={`w-full p-2 border ${
                                errors.endDate ? "border-red-500" : "border-gray-300"
                            } rounded-md`}
                        />
                        {errors.endDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 dark:bg-blue-700 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600">
                        강의 등록
                    </button>
                </form>
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">등록된 강의 목록</h2>
                    {classData && classData.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {classData.map((clazz) => (
                                <button
                                    key={clazz.id}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200"
                                >
                                    {clazz.className}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">등록된 강의가 없습니다.</p>
                    )}
                </div>
            </div>
            <div className="ml-6 w-full">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale={koLocale} // 한국어 설정
                    events={[]} // 이벤트 데이터
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
