import useFetch from "../../hooks/useFetch";
import "../../assets/css/student/test/testList.css"
import {useNavigate} from 'react-router-dom';


const StudentTest = () => {
    const {data: testList} = useFetch("/api/v1/test/test-by-schedule");
    const navigate = useNavigate();

    const handleTestClick = (testNo, scheduleName) => {
        navigate('/student-test-detail', {
            state: {
                testNo,
                scheduleName
            }
        });
    };

    return (
        <>
            <div className="test-list-header">시험 선택 목록</div>
            {testList?.map((testItem) => (
                <div key={testItem.testNo} className="test-item" onClick={() => handleTestClick(testItem.testNo, testItem.scheduleName)}>
                    <div className="test-item-content">
                        <div><span className="label">시험명:</span> <span className="value">{testItem.scheduleName}</span>
                        </div>
                        <div><span className="label">커트라인:</span> <span className="value">{testItem.cutline}점</span>
                        </div>
                        <div><span className="label">시간:</span> <span className="value">{testItem.time}분</span></div>
                        <div><span className="label">시험 시작시간:</span> <span
                            className="value">{testItem.testDt.replace('T', ' ')}</span></div>
                    </div>
                    <hr className="separator"/>
                </div>
            ))}
        </>
    );


}

export default StudentTest;