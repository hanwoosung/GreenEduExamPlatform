import React from "react";

const TestView = ({selectedSchedule}) => {

    return (

        <div className="view">
            <h2>{selectedSchedule.scheduleName}의 시험 목록</h2>
            <div className="test-list">
                {selectedSchedule?.tests.map((test) => (
                    <div key={test.testNo} className="test-card">
                        <div className="test-info">

                            <p className="test-date">
                                <strong>시험 날짜:</strong> {test?.testDt.replace("T", " ")}
                            </p>
                            <p className="test-score">
                                <strong>점수:</strong> {test?.score}
                            </p>
                            <p className={`test-result ${test?.score >= test?.cutline ? "pass" : "fail"}`}>
                                {test?.score >= test?.cutline ? "✅ 합격" : "❌ 불합격"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    )

}

export default TestView;