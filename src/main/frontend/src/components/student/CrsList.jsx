import React from "react";

const CrsList = ({cls, getStatusTitle, handleApplyClick}) => {

    const getFormattedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    function dateDiff(date1, date2) {
        return date1 > date2
    }

    console.log(cls.startDate, "강의 시작 날짜");
    console.log(getFormattedDate(), "오늘 날짜");
    console.log(dateDiff(getFormattedDate(), cls.startDate), "신청 불가 여부");

    return (
        <div key={cls.classNo} className="class-card">
            {/* 왼쪽 컨텐츠 영역 */}
            <div className="card-content">
                <span className={"status-label" + (dateDiff(getFormattedDate(), cls.startDate) ? " disabled" : "")}>
                    {cls.graduateCode === "" ? (dateDiff(getFormattedDate(), cls.startDate) ? "신청불가" : "신청가능") : getStatusTitle(cls.graduateCode)}
                </span>
                <h3>{cls.className}</h3>
                <p>수강기간: {cls.startDate} ~ {cls.endDate}</p>
                <p>선생님: {cls.name}</p>
                <p>강의실: {cls.roomName}</p>
                <p>정원: {cls.nowPeople + "/" + cls.maxPeople}</p>
            </div>

            {/* 오른쪽 버튼 영역 */}
            <div className="card-action">
                {cls.graduateCode === "" ?
                    dateDiff(getFormattedDate(), cls.startDate) ?
                        <button className="apply-btn disabled">
                            신청 불가
                        </button>
                        :
                        <button className="apply-btn" onClick={() => handleApplyClick(cls)}>
                            신청하기
                        </button>
                    : (
                        <button className="apply-btn disabled">
                            {getStatusTitle(cls.graduateCode)}
                        </button>
                    )}
            </div>
        </div>
    );
};

export default CrsList;
