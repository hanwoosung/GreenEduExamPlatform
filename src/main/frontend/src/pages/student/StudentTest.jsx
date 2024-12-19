import useFetch from "../../hooks/useFetch";

const StudentTest = () => {
    const {data: testList} = useFetch("/api/v1/test");


    return (
        <>
            <div>시험 선택 목록</div>
            {testList?.map((testItem) => (
                <div>
                    <div>

                    </div>
                    <hr/>
                </div>
            ))}
        </>
    );
}

export default StudentTest;