import React, {useEffect, useState} from "react";
import "../../../assets/css/manager/spotAdd.css";
import useSessionStorage from "../../../hooks/useSessionStorage";
import useSpotData from "../../../hooks/manager/spot/useSpot";

function SpotAdd() {
    const {sessionValues} = useSessionStorage();
    const {user} = sessionValues;
    const [spotName, setSpotName] = useState("");
    const [selectedSpotNo, setSelectedSpotNo] = useState(null);

    const {spots,deleteSpot, insertUpdateSpot, refreshData} = useSpotData();

    useEffect(() => {
        refreshData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        await insertUpdateSpot({spotNo: selectedSpotNo, spotName: spotName})
            .then(() => {
                setSpotName("");
                setSelectedSpotNo(null);
            });
    };

    const handleDelete = async (spotNo) => {
        await deleteSpot(spotNo, () => {
            setSpotName("");
            setSelectedSpotNo(null);
        });
    };

    const handleSelectSpot = (spot) => {
        if (selectedSpotNo === spot.spotNo) {
            setSelectedSpotNo(null);
            setSpotName("");
        } else {
            setSelectedSpotNo(spot.spotNo);
            setSpotName(spot.spotName);
        }
    };

    return (
        <div className="spot-add-container-wrapper">
            <div className="spot-add-container">
                <h1>{selectedSpotNo ? "지점 수정" : "지점 등록"}</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="지점 이름 입력"
                        value={spotName}
                        onChange={(e) => setSpotName(e.target.value)}
                        required
                    />
                    <button type="submit">{selectedSpotNo ? "수정" : "등록"}</button>
                </form>

                <div className="spot-list">
                    {spots.map((spot) => (
                        <div
                            key={spot.spotNo}
                            className={`spot-item ${selectedSpotNo === spot.spotNo ? "selected" : ""}`}
                            onClick={() => handleSelectSpot(spot)}
                        >
                            <span>{spot.spotName}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(spot.spotNo);
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

export default SpotAdd;