import React, {useEffect, useState} from 'react';
import '../../../assets/css/spotmanager/studentList.css';
import {useLocation} from "react-router-dom";
import useApi2 from "../../../hooks/useApi2";
import Swal from 'sweetalert2';
import useFetch from "../../../hooks/useFetch";
import useClassInfo from "../../../hooks/class/useClassInfo";
import {formatDate} from "@fullcalendar/core";

const StudentList = () => {
    const {get, put} = useApi2();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const {state} = location;
    const {data : statusOptions} = useFetch("/api/v1/gubn?groupCode=graduate_code");
    const {getClassInfo} = useClassInfo();
    const [classInfo, setClassInfo] = useState();
    console.log(statusOptions);

    useEffect(() => {
        const fetchData = async () => {
            const response = await get("/api/v1/spot-manager/crs-rgst/" + state?.classNo);
            console.log(response);
            setStudents(response);
            setLoading(false);

            setClassInfo(await getClassInfo(state?.classNo));
        }

        fetchData();
    }, [state?.classNo]);

    const handleStatusChange = async (e, userId) => {
        const {value} = e.target;

        await put(`/api/v1/spot-manager/crs-rgst`, {
            body: {
                classNo: state.classNo,
                graduateCode: value,
                userId: userId
            }
        }).then(async () => {
            await Swal.fire('성공', "변경되었습니다.", 'success');

            const response = await get("/api/v1/spot-manager/crs-rgst/" + state?.classNo);
            setStudents(response);

            setClassInfo(await getClassInfo(state?.classNo));
        })
            .catch(error => {
                Swal.fire('실패', error.response.data.body.message, 'error');
            });
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="student-list">
            <h1>{classInfo && classInfo.className}</h1>
            <h1>{classInfo && classInfo.startDate + ' ~ ' + classInfo.endDate}</h1>
            <hr/>
            <h1>수강 인원 관리{classInfo && '( ' + classInfo.nowPeople + ' / ' + classInfo.maxPeople + ' )'}</h1>
            <table className="student-table">
                <thead>
                <tr>
                    <th>이름</th>
                    <th>생년월일</th>
                    <th>수강신청 일시</th>
                    <th>상태 변경</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student) => (
                    <tr key={student.userId}>
                        <td>{student.name}</td>
                        <td>{student.userBirth}</td>
                        <td>{formatDate(student.createDt)}</td>
                        <td>
                            <select
                                className={'student-select'}
                                value={student.graduateCode}
                                onChange={(e) => handleStatusChange(e, student.userId)}
                            >
                                {statusOptions?.map((option) => (
                                    <option key={option.gubnCode} value={option.gubnCode}
                                            selected={option.gubnCode === student.graduateCode}>
                                        {option.gubnName}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
