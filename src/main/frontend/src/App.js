import {Link, Route, Routes} from 'react-router-dom';
import Layout from "./components/common/Layout";
import TestPage2 from "./pages/TestPage2";
import Schedule from "./pages/teacher/Schedule";
import CrsRgst from "./pages/student/CrsRgst";
import Grading from "./pages/teacher/Grading";
import GradingDetail from "./pages/teacher/GradingDetail";
import Userinfo from "./pages/common/Userinfo";
import ManagerMain from "./pages/manager/ManagerMain";
import SpotManagerMain from "./pages/spot_manager/SpotManagerMain";
import TeacherMain from "./pages/teacher/TeacherMain";
import StudentMain from "./pages/student/StudentMain";
import Login from "./pages/common/Login";
import TestExam from "./pages/teacher/TestExam";
import Regist from "./pages/common/Regist";
import ClassAdd from "./pages/spotmanager/class/ClassAdd";

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
                            <TestPage2 />
                        </Layout>
                    } />
                    <Route path="/schedule" element={
                        <Layout>
                            <Schedule />
                        </Layout>
                    } />
                    <Route path="/class-register" element={
                        <Layout>
                            <ClassAdd />
                        </Layout>
                    } />
                    <Route path="/regist" element={
                        <Layout>
                            <Regist />
                        </Layout>
                    } />
                    <Route path="/test-exam" element={
                        <Layout>
                            <TestExam />
                        </Layout>
                    } />
                    <Route path="/login" element={
                        <Layout>
                            <Login />
                        </Layout>
                    } />
                    <Route path="/student" element={
                        <Layout>
                            <StudentMain />
                        </Layout>
                    } />
                    <Route path="/teacher" element={
                        <Layout>
                            <TeacherMain />
                        </Layout>
                    } />
                    <Route path="/spot-manager" element={
                        <Layout>
                            <SpotManagerMain />
                        </Layout>
                    } />
                    <Route path="/manager" element={
                        <Layout>
                            <ManagerMain />
                        </Layout>
                    } />
                    <Route path="/userInfo" element={
                        <Layout>
                            <Userinfo />
                        </Layout>
                    } />

                    <Route path="/grading-detail" element={
                        <Layout>
                            <GradingDetail />
                        </Layout>
                    } />


                    <Route path="/grading" element={
                        <Layout>
                            <Grading />
                        </Layout>
                    } />
                    <Route path="/crs-rgst" element={
                        <Layout>
                            <CrsRgst />
                        </Layout>
                    } />

                </Routes>
            </main>
        </>
    );
}

export default App;
