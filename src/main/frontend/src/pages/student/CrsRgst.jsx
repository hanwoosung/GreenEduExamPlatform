import React, {useState} from 'react';
import '../../assets/css/student/crsRgst.css';
import CrsList from "../../components/student/CrsList";
import CrsFilter from "../../components/student/CrsFilter";
import useCrsRgstHandler from "../../assets/js/student/crsRgstHandler";


const ClassList = () => {

    const {
        filter,
        setFilter,
        getStatusTitle,
        filters,
        filteredClasses,
        handleApplyClick
    } = useCrsRgstHandler();

    return (
        <div className="class-list-container">

            {/* 필터 버튼 */}
            <div className="filter-buttons">
                {filters.map((item) => (
                    <CrsFilter filter={filter} item={item} setFilter={setFilter} />
                ))}
            </div>

            {/* 강의 카드 목록 */}
            <div className="class-cards">
                {filteredClasses.map((cls) => (
                    <CrsList cls={cls} getStatusTitle={getStatusTitle} handleApplyClick={handleApplyClick} />
                ))}
            </div>

        </div>
    );

};

export default ClassList;
