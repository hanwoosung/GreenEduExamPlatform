import React, {useState} from 'react';
import '../../assets/css/manager/teacherSpotList.css';
import useFetchTeachers from "../../hooks/manager/teacherspot/useFetchTeachers";
import useFilteredTeachers from "../../hooks/manager/teacherspot/useFilteredTeachers";
import useCheckbox from "../../hooks/manager/teacherspot/useCheckbox";
import Controls from "../../components/manager/Controls";
import TeacherTable from "../../components/manager/TeacherTable";
import useSpot from "../../hooks/spot/useSpot";
import useFetchSpot from "../../hooks/spot/useSpot";
import useApi2 from "../../hooks/useApi2";
import swal from "sweetalert2";

const TeacherSpotList = () => {
    const {put} = useApi2();

    const {teachers, setTeachers, updateDeleteYn, updateTeacherSpotNo} = useFetchTeachers();
    const [filter, setFilter] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [allChecked, setAllChecked] = useState(false);
    const {spots, setSpots} = useFetchSpot();

    const {filteredTeachers, searchedTeachers} = useFilteredTeachers(teachers, filter, selectedFilter);
    const {handleCheckboxChange, handleAllCheckboxChange} = useCheckbox(teachers, setTeachers, setAllChecked);

    const handleActivateDeactivate = async (yn) => {
        await updateDeleteYn(yn);
    }
    const handleSpotChange = async (userId, spotNo, spotName) => {
        await updateTeacherSpotNo(userId, spotNo,spotName);
    }

    return (
        <div className="teacher-spot-list">
            <h1>강사 지점 관리</h1>
            <Controls
                filter={filter}
                setFilter={setFilter}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                handleActivateDeactivate={handleActivateDeactivate}
            />
            <TeacherTable
                teachers={searchedTeachers}
                handleCheckboxChange={handleCheckboxChange}
                handleAllCheckboxChange={() => handleAllCheckboxChange(allChecked)} // Pass current state
                handleSpotChange={handleSpotChange}
                allChecked={allChecked}
                spots={spots}
            />
        </div>
    );
};

export default TeacherSpotList;
