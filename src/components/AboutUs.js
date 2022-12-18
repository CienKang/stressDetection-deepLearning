import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


const AboutUs = () => {
    return (
        <div class="mt-4 md-4 bg-primary text-center text-white" >

            <div className="text-center">
                <h1 className="display-1 fw-bold"> About Us</h1>
                <br></br>
                <p className="lead"> This website was made as the project deliverble for our capstone project "<b className='fw-bold'>A Framework To Detect Stress Using Deep Learning Techniques</b>" during year 2022. </p>
                <p className="lead">This project was done under the guidance of <b>Dr. Rajendra Kumar Roul</b>.</p>
                <br></br>
                <p className="lead"> You can find more details about the project on our github <a href="https://github.com/CienKang/stressDetection-deepLearning" className='fw-bold text-dark'>repo</a></p>
            </div>
            <br></br>

            <hr class="featurette-divider" />

            <br></br>

            <div className="text-center">
                <h1 className="display-1 fw-bold"> Team Members</h1>
                <br></br>
                <p className="lead">Following are the team members name and the individual role done. To know more about them, kindly check their github IDs .</p>
            </div>

            <div class="container marketing">
                <div class="row">
                    <div class="col-lg-3">
                        <h2 className="fw-bold text-dark">Manish Sharma</h2>
                        <h4>101903228</h4>
                        <p className="lead">Worked on creating frontend components of the website. Conducted the research done in literature survey and wrote the methodology. </p>
                        <p className="lead">Lead graphic designer behind the poster presented. Played valuable role in testing of the model. </p>
                        <p><a class="btn btn-secondary" href="#" role="button">Github &raquo;</a></p>
                    </div>
                    <div class="col-lg-3">
                        <h2 className="fw-bold text-dark">Mehak Noor Singh</h2>
                        <h4>101903233</h4>
                        <p className="lead">Worked on backend of the website and linking frontend. Conducted the research done in literature survey and wrote the methodology. </p>
                        <p className="lead">Data collection was done from different websites and platforms. Contributed in mathematical modelling for the prediction system. </p>
                        <p><a class="btn btn-secondary" href="#" role="button">Github &raquo;</a></p>
                    </div>
                    <div class="col-lg-3">
                        <h2 className="fw-bold text-dark">Saad Irfan Baig</h2>
                        <h4>101903243</h4>
                        <p className="lead">Worked on creating frontend components of the website. Conducted the research done in literature survey and wrote the methodology. </p>
                        <p className="lead">Created the PPT presented at the panel evaluation. Created the mathematical model for the prediction system.</p>
                        <p><a class="btn btn-secondary" href="#" role="button">Github &raquo;</a></p>
                    </div>
                    <div class="col-lg-3">
                        <h2 className="fw-bold text-dark">Shivanshu Mishra</h2>
                        <h4>102083063</h4>
                        <p className="lead">Worked on creating the backend component of the website. Conducted the research done in literature survey and wrote the methodology.</p>
                        <p className="lead">Created the backend model using LSTM , conducted experimental analysis and optimized it using hypertuning.</p>
                        <p><a class="btn btn-secondary" href="#" role="button">Github &raquo;</a></p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AboutUs;