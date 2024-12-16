import React, { useState } from "react";

const ClassAdd = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
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

        if (formData.description.length < 10) {
            newErrors.description = "10자 이상 입력해주세요.";
        }

        if (!formData.startDate) {
            newErrors.startDate = "강의 시작일을 선택해주세요.";
        }

        if (!formData.endDate) {
            newErrors.endDate = "강의 종료일을 선택해주세요.";
        } else if (formData.startDate && formData.endDate < formData.startDate) {
            newErrors.endDate = "종료일은 시작일 이후여야 합니다.";
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
                description: "",
                startDate: "",
                endDate: "",
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
        >
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
                />
                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                    강의 설명
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                        errors.description ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                ></textarea>
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
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
                className="w-full bg-blue-600 dark:bg-blue-700 text-white p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600"
            >
                강의 등록
            </button>
        </form>
    );
};

export default ClassAdd;
