import {useEffect, useState} from 'react';
import useApi2 from "../useApi2";

const useFetchSpot = () => {
    const [spots, setSpots] = useState([]);
    const {get, put} = useApi2();

    useEffect(() => {
        const fetchData = async () => {
            const response = await get("/spot/all");
            setSpots(response);
            console.log(response);
        };
        fetchData();
    }, []);

    return { spots, setSpots };
};

export default useFetchSpot;
