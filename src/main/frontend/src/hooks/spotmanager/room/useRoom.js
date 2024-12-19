import {useEffect, useState} from "react";
import useApi2 from "../../../hooks/useApi2";
import Swal from "sweetalert2";
import {swalDelete} from "../../../modal/common/swals";

const useRoomData = () => {
    const {get, post, del} = useApi2();
    const [spotNo, setSpotNo] = useState();
    const [rooms, setRooms] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    useEffect(() => {
        if (!spotNo) return;
        const fetchData = async () => {
            const roomResult = await get("api/v1/spot-manager/class-room/" + spotNo);

            setRooms(roomResult || []);
        };

        fetchData();
    }, [spotNo, refreshTrigger]);

    const refreshData = () => setRefreshTrigger((prev) => !prev);

    const insertUpdateRoom = async (room) => {
        console.log(room);
        await post("api/v1/spot-manager/class-room",
            {
                body: {
                    roomNo: room.roomNo,
                    spotNo: spotNo,
                    roomName: room.roomName
                }
            }).then(() => {
            Swal.fire({
                icon: "success",
                title: "강의실이 " + (room.roomNo ? "수정" : "등록") + "되었습니다",
                timer: 1500,
                showConfirmButton: false,
            });
            refreshData();
        })
    }
    const deleteRoom = async (roomNo, action) => {
        await swalDelete(() => {
            del("api/v1/spot-manager/class-room/" + roomNo)
                .then(() => {
                    refreshData();
                    action();
                });
        });
    }

    return {setSpotNo, rooms, insertUpdateRoom, deleteRoom, refreshData};
};

export default useRoomData;