import "../../assets/css/common/header.css"
import LogoutBtn from "./LogoutBtn";
import useSessionStorage from "../../hooks/useSessionStorage";
import {useLocation} from "react-router-dom";


const Header = () => {

    const {sessionValues, setSession, removeSession, getSession} = useSessionStorage();

    return (
        <header>
            <h1>Logo</h1>
            <LogoutBtn sessionValues={sessionValues} removeSession={removeSession} setSession={setSession} getSession={getSession}/>
        </header>
    );
}

export default Header;