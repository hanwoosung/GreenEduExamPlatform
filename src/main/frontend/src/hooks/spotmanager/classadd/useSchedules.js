import { useState } from "react";
import { handleDelete } from "../../../modal/common/swals";

const useSchedules = () => {
  const [schedules, setSchedules] = useState([]);

  const handleScheduleAdd = () => {
    setSchedules((prev) => [...prev, { name: "", startDate: "", endDate: "" }]);
  };

  const handleScheduleDelete  = (index) => {
    handleDelete(() =>
      setSchedules((prev) => prev.filter((_, i) => i !== index))
    );
  };

  const handleScheduleChange  = (index, e) => {
    const { name, value } = e.target;
    setSchedules((prev) =>
      prev.map((sch, i) => (i === index ? { ...sch, [name]: value } : sch))
    );
  };

  return { schedules, handleScheduleAdd, handleScheduleDelete , handleScheduleChange };
};

export default useSchedules;
