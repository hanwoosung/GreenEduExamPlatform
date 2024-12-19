import React, {useState} from 'react';
import '../../assets/css/student/myTestResult.css';
import ClassesView from "../../components/student/myTestView/ClassesView";
import SchdulesView from "../../components/student/myTestView/SchdulesView";
import TestView from "../../components/student/myTestView/TestView";
import myTestResultHandler from "../../assets/js/student/myTestResultHandler";


const MyTestResult = () => {

    const {
        classes,
        currentView,
        selectedClass,
        selectedSchedule,
        handleBack,
        handleClassClick,
        handleScheduleClick
    } = myTestResultHandler();

    return (
        <div className="app-container">
            <div className={`slider ${currentView}`}>
                {/* 강의 화면 */}
                {currentView === "classes" && (
                    <ClassesView classes={classes} handleClassClick={handleClassClick} />
                )}

                {/* 과목 화면 */}
                {currentView === "schedules" && selectedClass && (
                    <SchdulesView selectedClass={selectedClass} handleScheduleClick={handleScheduleClick} />
                )}

                {/* 시험 화면 */}
                {currentView === "tests" && selectedSchedule && (
                    <TestView selectedSchedule={selectedSchedule} />
                )}
            </div>
            {/* 뒤로가기 버튼 */}
            {currentView !== "classes" && (
                <button className="back-button" onClick={handleBack}>
                    이전
                </button>
            )}
        </div>
    );
};

export default MyTestResult;
