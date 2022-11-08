import { useState, useEffect } from "react";
import Evaluate from '../images/Evaluate.svg';
import Slider from "./graphComponents/Slider";
import StressPieChart from "./graphComponents/StressPieChart";
import LineChartSkeleton from "./SkeletonComponents/LineChartSkeleton";
import PieChartSkeleton from "./SkeletonComponents/PieChartSkeleton";
import StressLineChart from "./graphComponents/StressLineChart";
import { useNavigate } from "react-router-dom";
import AudioRecorder from "./AudioRecorder";
import {AiOutlineArrowDown} from 'react-icons/ai';

const EvaluatePage = (props) => {

    const { loginStatus } = props;
    // for loading and calling the model
    const [loading, setLoading] = useState(true);
    const [start, setStart] = useState(false);
    const navigate = useNavigate();

    //input data 
    const [handle, setHandle] = useState("");

    // output data
    const [posts, setPosts] = useState([]);
    const [verdict, setVerdict] = useState("");

    const [finalData, setFinalData] = useState([
        { name: 'Stress', value: 0.24 * 100 },
        { name: 'Unstress', value: 0.76 * 100 }
    ]);
    const [singleData, setSingleData] = useState([
        {
            "stress": 0.059458814561367035,
            "time": 1664775257
        },
        {
            "stress": 0.21673327684402466,
            "time": 1664774755
        },
        {
            "stress": 0.059458814561367035,
            "time": 1664774810
        },
        {
            "stress": 0.059458814561367035,
            "time": 1664774727
        }
    ]);

    const getStressPredictionJson = async () => {
        const resp = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': handle,
            })
        });
        const stress_level = await resp.json();
        console.log(stress_level);
        return stress_level;
    }

    // handling the data changes functions
    const handleInputChange = async (e) => {
        setHandle(e.target.value);
    }

    const handleStart = (e) => {
        e.preventDefault();
        if (start === true)
            setLoading(true);
        setStart(true);
        callModel(handle);
    }

    function roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
    }

    const callModel = async (handle) => {
        var resp_data = await getStressPredictionJson();
        var stress_level = resp_data['stress_level']
        var non_stress = roundToTwo((1 - stress_level) * 100);
        stress_level = roundToTwo(stress_level * 100);
        //console.log(stress_level.toFixed(2));  
        //console.log(non_stress.toFixed(2));
        setFinalData([
            { name: 'Stress', value: stress_level },
            { name: 'Unstress', value: non_stress }
        ]);
        resp_data.time_stress.sort(function (a, b) {
            return a.time - b.time;
        });
        await setSingleData(resp_data.time_stress);
        if (stress_level>30) {
            await setVerdict("Stressed");
        } else {
            await setVerdict("Normal");
        }
        setLoading(false);
        console.log(singleData);
    }

    useEffect(() => {
        if (loginStatus === false)
            navigate('/signin');
    }, [loginStatus])

    return (
        <div>
            <div className="evaluate-page-container d-flex flex-column align-items-center justify-content-center" style={{height: "100vh", width: "100%"}}>
                <div className="evaluate-page-header">
                    <h3 className="evaluate-page-header-text">Enter your handle to evaluate </h3>
                </div>
                <div className="evaluate-input-area">
                    <input
                        placeholder="Enter your reddit handle"
                        value={handle}
                        onChange={(event) => handleInputChange(event)}
                        onKeyDown={(event) => event.key === 'Enter' ? handleStart() : event}>
                    </input>
                    <button onClick={(event) => handleStart(event)}>
                        <img className='' src={Evaluate} alt="Next" />
                    </button>

                </div>
                {
                    start === true ? loading === true
                        ?
                        <div>
                            <h1 className="text-center mt-5">
                                Results for <span className="color-blue">{handle}</span>
                            </h1>
                            <div className="evaluate-result">
                                <div className="d-flex justify-content-center align-items-center mb-1"><PieChartSkeleton /></div>
                                <div className="d-flex justify-content-center align-items-center mb-1"><LineChartSkeleton /></div>
                            </div>
                        </div>
                        :
                        <div>
                            <h1 className="text-center mt-5">
                                Results for <span className="color-blue">{handle}</span>
                            </h1>
                            <h2 className="text-center mt-5 mb-5">Verdict: <span className="color-blue">{verdict}</span> </h2>
                            <div className="evaluate-result mb-5">
                                <StressPieChart data={finalData} />
                                <StressLineChart data={singleData} />
                            </div>
                        </div>
                        :
                        // when opening page first time
                        <div></div>
                }

                {/* Posts is set 0 so it will not display rightnow.
                    But will make a option checkbox if user want to see this or not. */}
                <Slider posts={posts} singleData={singleData} />
                <a href="#voice-stress" className="scroll-down" style={{position: 'absolute', bottom: 0, left: "50%"}}>
                    <AiOutlineArrowDown style={{ fontSize: '3rem' }} />
                </a>
            </div>
            <div id="voice-stress" className="evaluate-page-container d-flex flex-column align-items-center justify-content-center bg-primary px-4 py-5 px-md-5 " style={{height: "100vh", width: "100%"}}>
                <AudioRecorder />
            </div>
        </div>
    );
}

export default EvaluatePage;