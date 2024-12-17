import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GradingDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { step, selectedLecture, selectedSubject, grades, checkedStudents, userId, testNo } = location.state || {};

    const handleBackButtonClick = () => {
        navigate('/grading', {
            state: {
                step: 3,
                selectedLecture,
                selectedSubject,
                grades,
                checkedStudents
            }
        });
    };

    return (
        <div>
            <h2>상세 페이지</h2>
            <p>학생 ID: {userId}</p>
            <p>시험 번호: {testNo}</p>
            <button onClick={handleBackButtonClick}>뒤로가기</button>
        </div>
    );
};

export default GradingDetail;
