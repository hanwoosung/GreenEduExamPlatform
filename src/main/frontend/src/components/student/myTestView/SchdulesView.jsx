import React from "react";

const SchdulesView = ({selectedClass, handleScheduleClick}) => {

    return (
        <div className="view schedule-view">
            <h2 className="schedule-title">{selectedClass.className}의 과목 목록</h2>
            <div className="schedule-list">
                {selectedClass.schedules.map((schedule) => (
                    <div key={schedule.scheduleNo} className="schedule-card">
                        <div className="schedule-info">
                            <h3 className="schedule-name">{schedule.scheduleName}</h3>
                            <p className="schedule-date">
                                <strong>시작일:</strong> {schedule.startDate}
                            </p>
                            <p className="schedule-date">
                                <strong>종료일:</strong> {schedule.endDate}
                            </p>
                        </div>
                        <div className="schedule-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleScheduleClick(schedule)}
                            >
                                시험 내역
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default SchdulesView;