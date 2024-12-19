import React, {useEffect} from "react";
import Swal from "sweetalert2";
import useApi2 from "../../../hooks/useApi2";
import "../../../assets/css/spotmanager/classList.css";
import useClassList from "../../../hooks/spotmanager/classlist/useClassList";
import useSessionStorage from "../../../hooks/useSessionStorage";

const ClassList = () => {
    const {sessionValues} = useSessionStorage();
    const {user} = sessionValues;

    const {classData, handleDelete, setSpotNo, handleViewApplications, handleViewClassDetail} = useClassList();

    useEffect(() => {
        setSpotNo(user?.spotNo);
    }, []);



    return (
        <div className="class-list-container">
            <h1>강의 목록</h1>
            {classData && classData.length > 0 ? (
                classData.map((clazz) => (
                    <div key={clazz.classNo} className="class-item">
                        <div className="class-info" onClick={() => handleViewClassDetail(clazz.classNo)}>
                            <h2>{clazz.className}</h2>
                            <p>시작일: {clazz.startDate}</p>
                            <p>수료일: {clazz.endDate}</p>
                        </div>
                        <div className="class-actions">
                            <button
                                className="view-applications-button"
                                onClick={() => handleViewApplications(clazz.classNo)}
                            >
                                수강 신청 이력
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(clazz.classNo)}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-classes">등록된 강의가 없습니다.</p>
            )}
        </div>
    );
};

export default ClassList;