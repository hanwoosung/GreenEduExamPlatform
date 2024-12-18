import { useEffect, useState } from "react";
import useApi2 from "../../../hooks/useApi2";

const useClassData = () => {
  const { get } = useApi2();
  const [spotNo, setSpotNo] = useState();
  const [classData, setClassData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    console.log("하잉");
    if(!spotNo) return;
    const fetchData = async () => {
      const classResult = await get("api/v1/spot-manager/class/" + spotNo);
      const teacherResult = await get("api/v1/spot-manager/teacher/" + spotNo);
      const roomResult = await get("api/v1/spot-manager/class-room/" + spotNo);

      setClassData(classResult || []);
      setTeachers(teacherResult || []);
      setRooms(roomResult || []);
    };

    fetchData();
  }, [spotNo, refreshTrigger]);

  const refreshData = () => setRefreshTrigger((prev) => !prev);

  return {setSpotNo,classData, teachers, rooms, refreshData};
};

export default useClassData;