import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import useFetch from '../../hooks/useFetch';
import useSessionStorage from '../../hooks/useSessionStorage';
import '../../assets/css/teacher/grading/teacherMain.css';

const TeacherMain = () => {
    const chartRef = useRef(null);
    const { sessionValues } = useSessionStorage();
    const userId = sessionValues?.user?.userId;
    const { data, loading, error } = useFetch(`/api/v1/grading/test-avg/${userId}`);

    useEffect(() => {
        if (loading || error || !data) return;

        const ctx = chartRef.current.getContext('2d');
        const labels = data.map((item) => item.scheduleName);
        const avgScores = data.map((item) => item.avgScore);

        const chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: '평균 점수 (100점 만점)',
                        data: avgScores,
                        backgroundColor: 'rgba(75, 192, 192, 0.8)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        borderRadius: 10,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 16,
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: '과목별 평균 점수 (100점 만점)',
                        font: {
                            size: 20,
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 14,
                            },
                        },
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            font: {
                                size: 14,
                            },
                        },
                    },
                },
            },
        });

        return () => {
            chartInstance.destroy();
        };
    }, [data, loading, error]);

    if (loading) return <div className="teacher-main-loading">데이터 로딩 중...</div>;
    if (error) return <div className="teacher-main-error">데이터를 불러오는 중 오류가 발생했습니다.</div>;

    return (
        <div className="teacher-main-container">
            <h1 className="teacher-main-title">{data && data[0].name}의 대쉬보드</h1>
            <div className="teacher-main-chart-container">
                <canvas ref={chartRef} />
            </div>
            <div className="teacher-main-table-container">
                <h2>과목 상세 정보</h2>
                <div className="teacher-main-grid-table">
                    {data?.map((item, index) => (
                        <div className="teacher-main-card" key={index}>
                            <h3>{item.scheduleName}</h3>
                            <p><strong>시작 날짜:</strong> {item.startDate}</p>
                            <p><strong>종료 날짜:</strong> {item.endDate}</p>
                            <p><strong>평균 점수:</strong> {item.avgScore} / 100</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default TeacherMain;