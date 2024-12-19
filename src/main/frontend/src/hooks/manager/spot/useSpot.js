import {useEffect, useState} from "react";
import useApi2 from "../../../hooks/useApi2";
import Swal from "sweetalert2";
import {swalDelete} from "../../../modal/common/swals";

const useSpotData = () => {
    const {get, post, del} = useApi2();
    const [spots, setSpots] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const spotResult = await get("api/v1/manager/spot");

            console.log(spotResult);
            setSpots(spotResult || []);
        };

        fetchData();
    }, [refreshTrigger]);

    const refreshData = () => setRefreshTrigger((prev) => !prev);

    const insertUpdateSpot = async (spot) => {
        await post("api/v1/manager/spot",
            {
                body: {
                    spotNo: spot.spotNo,
                    spotName: spot.spotName
                }
            }).then(() => {
            Swal.fire({
                icon: "success",
                title: "지점이 " + (spot.spotNo ? "수정" : "등록") + "되었습니다",
                timer: 1500,
                showConfirmButton: false,
            });
            refreshData();
        });
    };

    const deleteSpot = async (spotNo, action) => {
        await swalDelete(() => {
            del("api/v1/manager/spot/" + spotNo)
                .then(() => {
                    refreshData();
                    action();
                });
        });
    };

    return {spots, insertUpdateSpot, deleteSpot, refreshData};
};

export default useSpotData;
