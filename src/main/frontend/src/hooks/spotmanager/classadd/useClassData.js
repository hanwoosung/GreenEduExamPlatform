import { useEffect, useState } from "react";
import useApi2 from "../../../hooks/useApi2";

const useClassData = (spotNo) => {
  const { get } = useApi2();
  const [classData, setClassData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const classResult = await get("api/v1/spot-manager/class/" + spotNo);
      const teacherResult = await get("api/v1/spot-manager/teacher/" + spotNo);
      const roomResult = await get("api/v1/spot-manager/class-room/" + spotNo);

      setClassData(classResult || []);
      setTeachers(teacherResult || []);
      setRooms(roomResult || []);
    };

    fetchData();
  }, []);

  return { classData, teachers, rooms };
};

export default useClassData;