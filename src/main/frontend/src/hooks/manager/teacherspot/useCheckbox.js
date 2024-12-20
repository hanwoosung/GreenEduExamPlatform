const useCheckbox = (teachers, setTeachers, setAllChecked) => {
    const handleCheckboxChange = (id) => {
        setTeachers((prevTeachers) =>
            prevTeachers.map((teacher) =>
                teacher.userId === id ? { ...teacher, checked: !teacher.checked } : teacher
            )
        );
    };

    const handleAllCheckboxChange = (currentAllChecked) => {
        const newCheckedState = !currentAllChecked; // Toggle allChecked state
        setAllChecked(newCheckedState);

        setTeachers((prevTeachers) =>
            prevTeachers.map((teacher) => ({ ...teacher, checked: newCheckedState }))
        );
    };

    return { handleCheckboxChange, handleAllCheckboxChange };
};

export default useCheckbox;
