import React from 'react';
import { formatDateTime } from "../../assets/js/common/convert";

const TeacherTable = ({ teachers, handleCheckboxChange, handleAllCheckboxChange, handleSpotChange, allChecked, spots }) => {
    console.log(teachers);
    return (
        <table className="teacher-spot-list__table">
            <thead>
            <tr>
                <th>
                    <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={handleAllCheckboxChange}
                    />
                </th>
                <th>ID</th>
                <th>이름</th>
                <th>생년월일</th>
                <th>지점</th>
                <th>등록일시</th>
                <th>활성 여부</th>
            </tr>
            </thead>
            <tbody>
            {teachers.map((teacher) => (
                <tr
                    key={teacher.userId}
                    className={`teacher-spot-list__row ${teacher.deleteYn === 'Y' ? 'teacher-spot-list__row--inactive' : ''}`}
                >
                    <td>
                        <input
                            type="checkbox"
                            checked={teacher.checked || false}
                            onChange={() => handleCheckboxChange(teacher.userId)}
                        />
                    </td>
                    <td>{teacher.userId}</td>
                    <td>{teacher.name}</td>
                    <td>{teacher.userBirth}</td>
                    <td>
                        <select
                            value={teacher.spotNo || ''}
                            onChange={(e) => handleSpotChange(teacher.userId, e.target.value, e.target.options[e.target.selectedIndex].text)}
                            className="teacher-spot-list__select"
                            disabled={teacher.deleteYn === 'Y'}
                        >
                            <option value="">지점 선택</option>
                            {spots?.map((spot) => (
                                <option key={spot.spotNo} value={spot.spotNo}>
                                    {spot.spotName}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td>{formatDateTime(teacher.createDt)}</td>
                    <td>{teacher.deleteYn === 'N' ? '활성화' : '비활성화'}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TeacherTable;
