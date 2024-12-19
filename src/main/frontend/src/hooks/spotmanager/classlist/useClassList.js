import {useEffect, useState} from "react";
import useApi2 from "../../../hooks/useApi2";
import {swalDelete} from "../../../modal/common/swals";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const useClassList = () => {
    const {get, del} = useApi2();
    const [spotNo, setSpotNo] = useState();
    const [classData, setClassData] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!spotNo) return;
        const fetchData = async () => {
            const classResult = await get("api/v1/spot-manager/class/" + spotNo);

            setClassData(classResult || []);
        };

        fetchData();
    }, [spotNo, refreshTrigger]);

    const refreshData = () => setRefreshTrigger((prev) => !prev);

    const handleDelete = async (classNo) => {
        await swalDelete(() => {
            del(`api/v1/spot-manager/class/${classNo}`)
                .then(() => {
                    refreshData();
                });
        })

    }

    const handleViewApplications = (classNo) => {
        navigate("/class-apply-student-list",
            {
                state: {
                    classNo: classNo
                }
            });

    };

    const handleViewClassDetail = (classNo) => {
        navigate("/class-register",
            {
                state: {
                    classNo: classNo
                }
            });
    }

    return {setSpotNo, classData, refreshData, handleDelete, handleViewApplications, handleViewClassDetail};
};

export default useClassList;