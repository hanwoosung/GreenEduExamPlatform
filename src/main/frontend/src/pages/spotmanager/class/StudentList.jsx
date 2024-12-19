import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../../assets/css/spotmanager/studentList.css';
import {useLocation} from "react-router-dom";
import useApi2 from "../../../hooks/useApi2";
import Swal from 'sweetalert2';

const StudentList = () => {
    const {get, put} = useApi2();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const {state} = location;

    const statusOptions = [
        {value: 'APPLY', label: '신청'},
        {value: 'CLEAR', label: '수료완료'},
        {value: 'DEL', label: '중도탈락'},
        {value: 'H', label: '반려'},
        {value: 'NO', label: '승인'},
    ];

    useEffect(() => {
        const fetchData = async () => {
            const response = await get("/api/v1/spot-manager/crs-rgst/" + state?.classNo);
            console.log(response);
            setStudents(response);
            setLoading(false);
        }

        fetchData();
    }, [state?.classNo]);

    const handleStatusChange = async (e, userId) => {
        e.preventDefault();
        const {value} = e.target;

        await put(`/api/v1/spot-manager/crs-rgst`, {
            body: {
                classNo: state.classNo,
                graduateCode: value,
                userId: userId
            }
        }).then(() => {
            Swal.fire('성공', "변경되었습니다.", 'success');

            setStudents((prev) =>
                prev.map((student) =>
                    student.userId === userId ? {...student, graduateCode: value} : student
                )
            );
        })
            .catch(error => {
                Swal.fire('실패', error.response.data.body.message, 'error');
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="student-list">
            <h1>{students ? '수강신청 목록(' + students[0].nowPeople + ' / ' + students[0].maxPeople + ')' : '수강신청 목록'}</h1>
            <table className="student-table">
                <thead>
                <tr>
                    <th>이름</th>
                    <th>생년월일</th>
                    <th>가입일시</th>
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
                                {statusOptions.map((option) => (
                                    <option key={option.value} value={option.value}
                                            selected={option.value === student.graduateCode}>
                                        {option.label}
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
