const Navbar = () => {
    return ( 
        <>
        <header className="navbar-header">
            <div className="middle-navbar">
                <img src="https://w3-assets.crazyeggcdn.com/images/svg/logo-ce-main-cda94b31713ece13f9ecfce734de2520.svg?vsn=d" alt="project Logo" />
                <ul>
                    <li className="li-middle">
                        <button><a href="/home">Home</a></button>
                    </li>
                    <li className="li-middle">
                        <button> <a href='/about'>About</a></button>
                    </li>
                    <li className="li-middle">
                        <button> <a href="/working">Working </a></button>
                    </li>
                    <li >
                    <a href="/model"><button className="li-model" style={{'background-color':'#034571'}}>Detect Your Stress Level</button></a>
                    </li>
                    <li>
                        <a className="li-login" href='/login' style={{'color':'#034571'}}>Login</a>
                    </li>
                </ul>
            </div>
        </header>
        </>
     );
}
 
export default Navbar;