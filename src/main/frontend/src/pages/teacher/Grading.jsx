import React, { useState } from 'react';
import '../../assets/css/teacher/grading/grading.css';
import { FaCheckCircle, FaRedoAlt } from "react-icons/fa";
import SubjectButton from "../../components/teacher/grading/SubjectButton";
import ActionButton from "../../components/teacher/grading/ActionButton";
import GradesTable from "../../components/teacher/grading/GradesTable";
import LectureButton from "../../components/teacher/grading/LectureButton";
import GradingTitle from "../../components/teacher/grading/GradingTitle";
import useFetch from "../../hooks/useFetch";
import useApi2 from "../../hooks/useApi2";
import { fetchSubjects, fetchGrades, confirmGrades, scheduleRetest, goToPreviousStep } from "../../assets/js/teacher/gradingLogic";

const Grading = () => {

    const { data: lectures, loading } = useFetch("/api/v1/grading/class/teacher1");
    const { get, put } = useApi2();

    const [subjects, setSubjects] = useState([]);
    const [grades, setGrades] = useState(new Set());
    const [checkedStudents, setCheckedStudents] = useState(new Set());
    const [step, setStep] = useState(1);
    const [selectedLecture, setSelectedLecture] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    const handleCheckAll = (e) => {
        setCheckedStudents(e.target.checked ? new Set(grades) : new Set());
    };

    const handleCheckStudent = (student) => {
        const updatedSet = new Set(checkedStudents);
        updatedSet.has(student) ? updatedSet.delete(student) : updatedSet.add(student);
        setCheckedStudents(updatedSet);
    };

    return (
        <div className="container">
            <h1 className="title">성적 관리 시스템</h1>
            {loading && <div>로딩 중...</div>}

            {/* 강의 선택 */}
            {!loading && step === 1 && (
                <div className="card">
                    <GradingTitle title="강의를 선택하세요" />
                    <div className="options">
                        {lectures?.map((lecture) => (
                            <LectureButton
                                key={lecture.id}
                                lecture={lecture}
                                onClick={() =>
                                    fetchSubjects(lecture, get, setSubjects, setStep, setSelectedLecture)
                                }
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* 과목 선택 */}
            {step === 2 && (
                <div className="card">
                    <GradingTitle
                        title={`${selectedLecture} 과목을 선택하세요`}
                        onBack={() => goToPreviousStep(setStep)}
                    />
                    <div className="options">
                        {subjects?.map((subject) => (
                            <SubjectButton
                                key={subject.id}
                                subject={subject}
                                onClick={() =>
                                    fetchGrades(subject, get, setGrades, setStep, setSelectedSubject)
                                }
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* 성적 관리 */}
            {step === 3 && (
                <div className="card">
                    <GradingTitle
                        title={`${selectedSubject.scheduleName}의 성적 리스트`}
                        onBack={() => goToPreviousStep(setStep)}
                    />
                    <div className="action-buttons">
                        <ActionButton
                            onClick={() =>
                                confirmGrades(
                                    checkedStudents,
                                    selectedSubject,
                                    put,
                                    (subject) => fetchGrades(subject, get, setGrades, setStep, setSelectedSubject),
                                    setCheckedStudents
                                )
                            }
                            className="confirm"
                            icon={FaCheckCircle}
                            label="확정 여부"
                        />
                        <ActionButton
                            onClick={() =>
                                scheduleRetest(
                                    checkedStudents,
                                    selectedSubject,
                                    put,
                                    (subject) => fetchGrades(subject, get, setGrades, setStep, setSelectedSubject),
                                    setCheckedStudents
                                )
                            }
                            className="retest"
                            icon={FaRedoAlt}
                            label="재시험"
                        />
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
