import { useState } from "react";
import Evaluate from '../images/Evaluate.svg';
import StressLineChart from "./graphComponents/StressLineChart";
import StressPieChart from "./graphComponents/StressPieChart";
import LineChartSkeleton from "./SkeletonComponents/LineChartSkeleton";
import PieChartSkeleton from "./SkeletonComponents/PieChartSkeleton";
const EvaluatePage = () => {

    // for loading and calling the model
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(false);

    //input data 
    const [category, setCategory] = useState("Posts");
    const [handle, setHandle] = useState("");

    // output data
    const [finalData, setFinalData] = useState([
        { name: 'Stressed', value: 72 },
        { name: 'Not Stressed', value: 28 }
    ]);
    const [singleData, setSingleData] = useState([
        { postNo: 1, stress: Math.random() },
        { postNo: 2, stress: Math.random() },
        { postNo: 3, stress: Math.random() },
        { postNo: 4, stress: Math.random() },
        { postNo: 5, stress: Math.random() },
        { postNo: 6, stress: Math.random() },
        { postNo: 7, stress: Math.random() },
        { postNo: 8, stress: Math.random() },
        { postNo: 9, stress: Math.random() },
        { postNo: 10, stress: Math.random() },
        { postNo: 11, stress: Math.random() },
        { postNo: 12, stress: Math.random() },
    ])


    // handling the data changes functions
    const handleInputChange = (e) => {
        setHandle(e.target.value);
    }

    const handleStart = (e) => {
        if (start === true)
            setLoading(true);
        setStart(true);

        setSingleData(singleData);
        setFinalData(finalData);

    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
    }


    return (
        <div className="evaluate-page-container">
            <div className="evaluate-page-header">
                <h3 className="evaluate-page-header-text">Enter your handle to evaluate </h3>
            </div>
            <div className="evaluate-input-area">

                <label className="evaluate-category">
                    <select value={category} onChange={(event)=> handleCategory(event)} >
                        <option value="Posts">Posts Only</option>
                        <option value="Comments">Comments Only</option>
                        <option value="Posts + Comments">Posts + Comments</option>
                    </select>
                </label>
                {/* <section id="header-container">
                    <select>
                        <option disabled>What's your favorite movie ?</option>
                        <option value="choix-2">Inception</option>
                        <option value="choix-3">Godzilla</option>
                        <option value="choix-4">Back to the future</option>
                        <option value="choix-5">Shutter Island</option>
                    </select>
                </section> */}

                <input
                    placeholder="Enter your reddit handle"
                    value={handle}
                    onChange={(event) => handleInputChange(event)}
                    onKeyDown={(event) => event.key === 'Enter' ? handleStart() : event}>
                </input>
                <button onClick={() => handleStart()}>
                    <img className='' src={Evaluate} alt="Next" />
                </button>
            </div>
            {
                start === true ? loading === false
                    ?
                    <div className="evaluate-result">
                        <PieChartSkeleton />
                        <LineChartSkeleton />
                    </div>
                    :
                    <div className="evaluate-result">
                        <div className="evaluate-pie-chart"><StressPieChart data={finalData} /></div>
                        <div className="evalaute-line-chart"><StressLineChart data={singleData} /></div>
                    </div>
                    :
                    <div>Process not started</div>
            }

        </div>
    );
}

export default EvaluatePage;