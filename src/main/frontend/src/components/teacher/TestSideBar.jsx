import React, {useRef} from 'react';
import "../../assets/css/teacher/test/TestSidebar.css";

const TestSidebar = (props) => {
    const {questions, scrollToQuestionBox} = props;

    return (
        <div className={"test-page"}>
            <div className="sidebar">
                <h3>스무스하지못한 바로가기 사이드바</h3>
                <ul>
                    {questions.map((question) => (
                        <li
                            key={question.questionNo}
                            onClick={() => scrollToQuestionBox(question.questionNo)}
                        >
                            {question.questionNo} 번 문제
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TestSidebar;
