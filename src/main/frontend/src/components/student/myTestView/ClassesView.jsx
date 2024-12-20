import React from "react";


const ClassesView = ({classes, handleClassClick}) => {

    return (
        <div className="view class-view">
            <h2 className="class-title">💼 강의 목록</h2>
            <div className="class-list">
                {classes?.map((cls) => (
                    <div key={cls?.classNo} className="class-card">
                        <div className="class-info">
                            <h3 className="class-name">{cls?.className}</h3>
                            <p className="class-date">
                                <strong>📅 시작일:</strong> {cls?.startDate}
                            </p>
                            <p className="class-date">
                                <strong>⏰ 종료일:</strong> {cls?.endDate}
                            </p>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleClassClick(cls)}
                        >
                            일정 상세
                        </button>
                    </div>
                ))}
            </div>
        </div>

    )

}

export default ClassesView;