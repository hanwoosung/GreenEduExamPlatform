import React from "react";

const CrsList = ({ cls, getStatusTitle, handleApplyClick }) => {


    return (
        <div key={cls.classNo} className="class-card">
            {/* 왼쪽 컨텐츠 영역 */}
            <div className="card-content">
                <span className="status-label">
                    {cls.graduateCode === "" ? "신청 가능" : getStatusTitle(cls.graduateCode)}
                </span>
                <h3>{cls.className}</h3>
                <p>수강기간: {cls.startDate} ~ {cls.endDate}</p>
                <p>선생님: {cls.name}</p>
                <p>강의실: {cls.roomName}</p>
            </div>

            {/* 오른쪽 버튼 영역 */}
            <div className="card-action">
                {cls.graduateCode === "" ? (
                    <button className="apply-btn" onClick={() => handleApplyClick(cls)}>
                        신청하기
                    </button>
                ) : (
                    <button className="apply-btn disabled">
                        {getStatusTitle(cls.graduateCode)}
                    </button>
                )}
            </div>
        </div>
    );
};

export default CrsList;
