import {useLocation} from 'react-router-dom';

const StudentTestDetail = () => {
    const location = useLocation();
    const { testNo } = location.state || {};

    return(
        <div>

        </div>
    );

}

export default StudentTestDetail;