import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-heading">
                With <span className="color-blue">Reddit Handle</span> Evaluate Your <span className="color-blue">Stress Level</span>
            </div>
            <div className="home-image-container"></div>
            <div className="home-description">
                We use your latest  posts to give you an evaluation of your stress so that you can get treatment before hand.
            </div>

            <div className="home-helpful-buttons">
                <Link to="/signup" className="link-tag-links">
                <button className="home-helpful-buttons-items blue-white-button">Sign Up</button>
                </Link>
                <Link to="/evaluate" className="link-tag-links">
                    <button className="home-helpful-buttons-items white-blue-button">Evaluate</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;