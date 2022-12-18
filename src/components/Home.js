import { Link } from "react-router-dom";
import Slide1 from "../images/matthew-henry-2Ts5HnA67k8-unsplash.jpg";
import Slide2 from "../images/sydney-sims-fZ2hMpHIrbI-unsplash.jpg";
import Slide3 from "../images/whoislimos-kFVmYjK6hZ8-unsplash.jpg";
import Slide4 from "../images/elisa-ventur-bmJAXAz6ads-unsplash.jpg";
import Slide5 from "../images/yosi-prihantoro-gXUEQEtpjMs-unsplash.jpg";
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
    return (
        <div className="home-container" style={{padding: "100px"}}>
            <div className="d-flex flex-row justify-content-around align-items-center">
                <div>
                    <div className="home-heading">
                        With <span className="color-blue">Reddit Handle</span> Evaluate Your <span className="color-blue">Stress Level</span>
                    </div>
                    <div className="home-description" style={{marginTop: "30px"}}>
                        We use your latest  posts to give you an evaluation of your stress so that you can get treatment before hand.
                    </div>

                    <div className="home-helpful-buttons" style={{marginTop: "50px"}}>
                        <Link to="/signup" className="link-tag-links">
                            <button className="home-helpful-buttons-items blue-white-button">Sign Up</button>
                        </Link>
                        <Link to="/evaluate" className="link-tag-links">
                            <button className="home-helpful-buttons-items white-blue-button">Evaluate</button>
                        </Link>
                    </div>    
                </div>
                <Carousel slide={false}>
                    <Carousel.Item height="700px" width="900px" interval={5000}>
                        <img
                        height="700px" width="900px"
                        className="d-block"
                        src={Slide1}
                        alt="Second slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item height="700px" width="900px" interval={5000}>
                        <img
                        height="700px" width="900px"
                        className="d-block fade-in"
                        src={Slide2}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item height="700px" width="900px" interval={5000}>
                        <img
                        height="700px" width="900px"
                        className="d-block fade-in"
                        src={Slide3}
                        alt="Third slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item height="700px" width="900px" interval={5000}>
                        <img
                        height="700px" width="900px"
                        className="d-block fade-in"
                        src={Slide4}
                        alt="Third slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item height="700px" width="900px" interval={5000}>
                        <img
                        height="700px" width="900px"
                        className="d-block fade-in"
                        src={Slide5}
                        alt="Third slide"
                        />

                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
}

export default Home;