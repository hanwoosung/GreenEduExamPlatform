import {Link, Route, Routes} from 'react-router-dom';
import Layout from "./components/common/Layout";
import TestPage from "./pages/TestPage";
import TestPage2 from "./pages/TestPage2";
import Schedule from "./pages/teacher/Schedule";
import Regist from "./pages/common/Regist";
import './index.css';
import ClassAdd from "./pages/class/ClassAdd";
import React from "react";
import Login from "./pages/common/Login";

{/* Route 만 쳐 복사해서 엘리먼트안에 레이아웃안에 화면 넣으면 된다잉? */
}

function App() {
    return (
        <>
            {/*/!* 네비게이션 바 *!/*/}
            <ul className="flex space-x-4">
                <li>
                    <Link to={"/"} className="hover:underline">
                        홈
                    </Link>
                </li>
                <li>
                    <Link to={"/test2"} className="hover:underline">
                        테스트 페이지 2
                    </Link>
                </li>
                <li>
                    <Link to={"/schedule"} className="hover:underline">
                        스케줄
                    </Link>
                </li>
                <li>
                    <Link to={"/class-register"} className="hover:underline">
                        강의 등록
                    </Link>
                </li>
                <li>
                    <Link to={"/regist"} className="hover:underline">
                        회원가입
                    </Link>
                </li>
            </ul>

            {/* 라우터 설정 */
            }
            <main className="p-6">
                <Routes>
                    {/*<Route path="/" element={*/}
                    {/*    <Layout>*/}
                    {/*        <Home />*/}
                    {/*    </Layout>*/}
                    {/*} />*/}
                    <Route path="/test2" element={
                        <Layout>
                            <TestPage2/>
                        </Layout>
                    }/>
                    <Route path="/schedule" element={
                        <Layout>
                            <Schedule/>
                        </Layout>
                    }/>
                    <Route path="/class-register" element={
                        <Layout>
                            <ClassAdd/>
                        </Layout>
                    }/>
                    <Route path="/regist" element={
                        <Layout>
                            <Regist />
                        </Layout>
                    }/>
                    <Route path="/login" element={
                        <Layout>
                            <Login />
                        </Layout>
                    }/>
                </Routes>
            </main>
        </>
    );
}

export default App;
