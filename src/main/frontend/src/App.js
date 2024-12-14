import {Route, Routes} from 'react-router-dom';
import Layout from "./components/common/Layout";
import TestPage from "./pages/TestPage";
import TestPage2 from "./pages/TestPage2";

function App() {
    {/* Route 만 쳐 복사해서 엘리먼트안에 레이아웃안에 화면 넣으면 된다잉? */}

    return (
        <Routes>
            <Route path="/" element={
                <Layout>
                    <TestPage/>
                </Layout>
            }/>

            <Route path="/test2" element={
                <Layout>
                    <TestPage2/>
                </Layout>
            }/>
        </Routes>
    );
}

export default App;
