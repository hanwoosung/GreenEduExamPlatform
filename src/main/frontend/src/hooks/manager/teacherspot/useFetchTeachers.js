import {useState, useEffect} from 'react';
import useApi2 from "../../useApi2";
import swal from "sweetalert2";

const useFetchTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const {get, put} = useApi2();

    useEffect(() => {
        const fetchData = async () => {
            const response = await get("api/v1/manager/teacher-spot");
            setTeachers(response);
        };
        fetchData();
    }, []);

    const getTeachers = async () => {
        return await get("api/v1/manager/teacher-spot");
    }

    const updateDeleteYn = async (yn) => {
        const updatedTeachersId = teachers.map((teacher) => {
            if (teacher.checked) {
                return teacher.userId
            }
        }).filter(Boolean);

        // console.log(updatedTeachersId);
        if (updatedTeachersId.length === 0) {
            await swal.fire("실패", "하나 이상을 선택해주세요.", "error");
            return;
        }

        await put("/api/v1/manager/teacher-spot/" + yn, {
            body: updatedTeachersId
        }).then(async () => {
            await swal.fire("성공", "반영되었습니다.", "success");
            const teachersResult = await getTeachers();
            setTeachers(
                teachersResult.map((teacher) => ({
                    ...teacher,
                    checked: updatedTeachersId.includes(teacher.userId),
                }))
            );
        }).catch(error => {

        })
    }

    const updateTeacherSpotNo = async (userId, spotNo, spotName) => {
        if (!spotNo) {
            await swal.fire("실패", "지점을 선택해주세요.", "error");
            return;
        }
        const result = await swal.fire({
            title: "지점을 수정하시겠습니까?",
            text: "선택한 지점으로 반영됩니다.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "네, 수정합니다",
            cancelButtonText: "아니요",
        });
        if (result.isConfirmed) {
            await put(`/api/v1/manager/teacher-spot/spot/${userId}?spotNo=${spotNo}`
            ).then(async () => {
                await swal.fire("성공", "반영되었습니다.", "success");
                setTeachers((prevTeachers) =>
                    prevTeachers.map((teacher) =>
                        teacher.userId === userId
                            ? {...teacher, spotNo: spotNo, spotName: spotName}
                            : teacher
                    )
                )
            });
        }
    }

    return {teachers, setTeachers, getTeachers, updateDeleteYn, updateTeacherSpotNo};
};

export default useFetchTeachers;
