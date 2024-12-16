import React, {useState} from 'react';
import '../../assets/css/teacher/grading/grading.css';
import {FaCheckCircle, FaRedoAlt} from "react-icons/fa";
import SubjectButton from "../../components/teacher/grading/SubjectButton";
import ActionButton from "../../components/teacher/grading/ActionButton";
import GradesTable from "../../components/teacher/grading/GradesTable";
import LectureButton from "../../components/teacher/grading/LectureButton";
import GradingTitle from "../../components/teacher/grading/GradingTitle";
import useFetch from "../../hooks/useFetch";

const Grading = () => {
    const { data: lectures, loading } = useFetch("/api/v1/grading/class/teacher1");
    const [subjects, setSubjects] = useState([]);


    const grades = [ //과제에맞는 학생성적을 들고온다.c v에라잉!@#!@@#!@#@!#안들고올래
        {id: 1, name: '김철수', grade: 'A'},
        {id: 2, name: '이영희', grade: 'B+'},
        {id: 3, name: '박민수', grade: 'B'},
        {id: 4, name: '최은지', grade: 'A-'},
        {id: 5, name: '홍길동', grade: 'C+'}
    ];

    const [step, setStep] = useState(1);
    const [selectedLecture, setSelectedLecture] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [checkedStudents, setCheckedStudents] = useState(new Set());

    const handleLectureSelect = (lecture) => {
        setSelectedLecture(lecture);
        setStep(2);
    };

    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        setStep(3);
    };

    const goBack = () => setStep((prev) => Math.max(prev - 1, 1));


    const handleCheckAll = (e) => {
        setCheckedStudents(e.target.checked ? new Set(grades.map((s) => s.id)) : new Set());
    };


    const handleCheckStudent = (id) => {
        const updatedSet = new Set(checkedStudents);
        updatedSet.has(id) ? updatedSet.delete(id) : updatedSet.add(id);
        setCheckedStudents(updatedSet);
    };


    const confirmGrades = () => alert(`확정된 학생: ${[...checkedStudents].join(', ')}`);
    const scheduleRetest = () => alert(`재시험 대상: ${[...checkedStudents].join(', ')}`);

    return (
        <div className="container">
            <h1 className="title">성적 관리 시스템</h1>
            {loading && <div>로딩 중...</div>}

            {/*강의 선택*/}
            {!loading && step === 1 && (
                <div className="card">
                    <GradingTitle title="강의를 선택하세요" />
                    <div className="options">
                        {lectures?.map((lecture) => (
                            <LectureButton
                                key={lecture.id}
                                lecture={lecture.className}
                                onClick={() => handleLectureSelect(lecture.className)}
                            />
                        ))}

                    </div>
                </div>
            )}

            {/*과목 선택*/}
            {step === 2 && (
                <div className="card">
                    <GradingTitle title={`${selectedLecture} 과목을 선택하세요`} onBack={goBack} />
                    <div className="options">
                        {subjects[selectedLecture]?.map((subject) => (
                            <SubjectButton
                                key={subject}
                                subject={subject}
                                onClick={() => handleSubjectSelect(subject)}
                            />
                        ))}

                    </div>
                </div>
            )}

            {/*성적 관리*/}
            {step === 3 && (
                <div className="card">
                    <GradingTitle title={`${selectedSubject}의 성적 리스트`} onBack={goBack} />
                    <div className="action-buttons">
                        <ActionButton onClick={confirmGrades} className="confirm" icon={FaCheckCircle} label="확정 여부" />
                        <ActionButton onClick={scheduleRetest} className="retest" icon={FaRedoAlt} label="재시험" />
                    </div>
                    <GradesTable
                        grades={grades}
                        checkedStudents={checkedStudents}
                        onCheckAll={handleCheckAll}
                        onCheckStudent={handleCheckStudent}
                    />
                </div>
            )}

        </div>
    );
};

export default Grading;
