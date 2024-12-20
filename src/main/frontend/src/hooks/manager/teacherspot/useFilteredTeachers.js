import { useMemo } from 'react';

const useFilteredTeachers = (teachers, filter, selectedFilter) => {
    const filteredTeachers = useMemo(() => {
        return teachers.filter((teacher) => {
            if (selectedFilter === 'all') return true;
            if (selectedFilter === 'active') return teacher.deleteYn === 'N';
            if (selectedFilter === 'inactive') return teacher.deleteYn === 'Y';
            if (selectedFilter === 'unassigned') return !teacher.spotNo;
            return true;
        });
    }, [teachers, selectedFilter]);

    const searchedTeachers = useMemo(() => {
        return filteredTeachers.filter((teacher) =>
            [teacher.name, teacher.userId, teacher.spotName]
                .join(' ')
                .toLowerCase()
                .includes(filter.toLowerCase())
        );
    }, [filteredTeachers, filter]);

    return { filteredTeachers, searchedTeachers };
};

export default useFilteredTeachers;
