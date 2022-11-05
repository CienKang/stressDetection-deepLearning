import { useState } from 'react';
import Logo from '../images/Logo.svg';
import Evaluate from '../images/Evaluate.svg';
import { Link } from 'react-router-dom';

const Navbar = (props) => {

    const { userName, loginStatus, setUserName, setLoginStatus } = props;
    const [id1, setid1] = useState("selected");
    const [id2, setid2] = useState("");
    const [id3, setid3] = useState("");

    const changeId1 = (e) => {
        setid1("selected");
        setid2("");
        setid3("");
    }

    const changeId2 = (e) => {
        setid1("");
        setid2("selected");
        setid3("");
    }

    const changeId3 = (e) => {
        setid1("");
        setid2("");
        setid3("selected");
    }

    const getLogout = async () => {
        const resp = await fetch("http://localhost:5000/logout");
        const json_resp = await resp.json();
        console.log(json_resp);
        return json_resp;
    }

    const handleLogOut = async (e) => {
        var status=await getLogout();
        if (status["status"]==="success") {
            setLoginStatus(false);
            setUserName("Login Required");
        } else {
            alert("An Error Occured")
        }
    }

    return (
        <div className="navbar-container">
            <img className="navbar-image" src={Logo} alt="LOGO " />

            <div className='navbar-menu'>
                <Link to="/" className='navbar-menu-item link-tag-links' id={id1} onClick={() => changeId1()}>Home</Link>
                <Link to="/model" className='navbar-menu-item link-tag-links' id={id2} onClick={() => changeId2()}>Model</Link>
                <Link to="/about" className='navbar-menu-item link-tag-links' id={id3} onClick={() => changeId3()}>About Us</Link>
            </div>

            <div className="navbar-avatar">
                <span>{userName}</span>
            </div>
            {
                loginStatus === false ?
                    <Link to="/signin">
                        <button className='btn btn-primary'>Log In</button>
                    </Link> :

                    <button className='btn btn-primary' onClick={(event) => handleLogOut(event)}>Log Out</button>

            }

            <Link to="/evaluate" className='link-tag-links'>
                <button className='evaluate'>
                    <img className='icon' src={Evaluate} alt="Evaluate Logo" />
                    Evaluate
                </button>
            </Link>
        </div>
    );
}

export default Navbar;
