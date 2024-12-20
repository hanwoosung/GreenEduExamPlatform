import React from 'react';

const Controls = ({ filter, setFilter, selectedFilter, setSelectedFilter, handleActivateDeactivate }) => {
    return (
        <div className="teacher-spot-list__controls">
            <input
                type="text"
                placeholder="검색 (이름, ID, 지점명)"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="teacher-spot-list__search"
            />
            <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="teacher-spot-list__filter"
            >
                <option value="all">전체</option>
                <option value="active">활성화</option>
                <option value="inactive">비활성화</option>
                <option value="unassigned">배정되지 않음</option>
            </select>
            <button onClick={() => handleActivateDeactivate('N')} className="teacher-spot-list__button teacher-spot-list__button--activate">활성화</button>
            <button onClick={() => handleActivateDeactivate('Y')} className="teacher-spot-list__button teacher-spot-list__button--deactivate">비활성화</button>
        </div>
    );
};

export default Controls;