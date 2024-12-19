import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import "../../../assets/css/spotmanager/roomAdd.css";
import useSessionStorage from "../../../hooks/useSessionStorage";
import useRoomData from "../../../hooks/spotmanager/room/useRoom";
import {swalDelete} from "../../../modal/common/swals";

function RoomAdd() {
    const {sessionValues} = useSessionStorage();
    const {user} = sessionValues;
    const [roomName, setRoomName] = useState("");
    const [selectedRoomNo, setSelectedRoomNo] = useState(null);

    const {setSpotNo, rooms, deleteRoom, insertUpdateRoom, refreshData} = useRoomData();

    useEffect(() => {
        setSpotNo(user.spotNo);
    }, [setSpotNo, user.spotNo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await insertUpdateRoom({roomNo: selectedRoomNo, roomName: roomName})
            .then(() => {
                setRoomName("");
                setSelectedRoomNo(null);
            });
    };

    const handleDelete = async (roomNo) => {
        await deleteRoom(roomNo, () => {
            setRoomName("");
            setSelectedRoomNo(null);
        });
    };

    const handleSelectRoom = (room) => {
        if (selectedRoomNo === room.roomNo) {
            setSelectedRoomNo(null);
            setRoomName("");
        } else {
            setSelectedRoomNo(room.roomNo);
            setRoomName(room.roomName);
        }
    };

    return (
        <div className="room-add-container-wrapper">
            <div className="room-add-container">
                <h1>{selectedRoomNo ? "강의실 수정" : "강의실 등록"}</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="강의실 이름 입력"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        required
                    />
                    <button type="submit">{selectedRoomNo ? "수정" : "등록"}</button>
                </form>

                <div className="room-list">
                    {rooms.map((room) => (
                        <div
                            key={room.roomNo}
                            className={`room-item ${selectedRoomNo === room.roomNo ? "selected" : ""}`}
                            onClick={() => handleSelectRoom(room)}
                        >
                            <span>{room.roomName}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(room.roomNo);
                                }}
                            >
                                삭제
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RoomAdd;
