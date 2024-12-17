import { useState } from "react";

const useFormHandler = () => {
  const initialFormData = {
    className: "",
    startDate: "",
    endDate: "",
    maxPeople: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const validate = (selectedTeachers, selectedRoom) => {
    const newErrors = {};

    if (!formData.className) newErrors.className = "강의 제목을 입력해주세요.";
    if (!formData.startDate) newErrors.startDate = "시작 날짜를 입력해주세요.";
    if (!formData.endDate) {
      newErrors.endDate = "종료 날짜를 입력해주세요.";
    } else if (formData.startDate > formData.endDate) {
      newErrors.endDate = "종료일은 시작일 이후여야 합니다.";
    }
    if (!selectedTeachers) newErrors.teachers = "강사를 선택해주세요.";
    if (!selectedRoom) newErrors.room = "강의실을 선택해주세요.";
    if (!formData.maxPeople || formData.maxPeople <= 0)
      newErrors.maxPeople = "수강 정원은 1명 이상이어야 합니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return { formData, setFormData, initialFormData, errors, validate, handleChange };
};

export default useFormHandler;
