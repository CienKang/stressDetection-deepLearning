import { useState } from 'react';
import Logo from '../images/Logo.svg';
import Evaluate from '../images/Evaluate.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {

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


    return (
        <div className="navbar-container">
            <img className="navbar-image" src={Logo} alt="LOGO " />

            <div className='navbar-menu'>
                <Link to="/" className='navbar-menu-item link-tag-links' id={id1} onClick={() => changeId1()}>Home</Link>
                <Link to="/model" className='navbar-menu-item link-tag-links' id={id2} onClick={() => changeId2()}>Model</Link>
                <Link to="/about" className='navbar-menu-item link-tag-links' id={id3} onClick={() => changeId3()}>About Us</Link>
            </div>

            <div className="navbar-avatar">
            <span>User Name</span>
            </div>
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
