import { useState } from "react";
import Evaluate from '../images/Evaluate.svg';
import Slider from "./graphComponents/Slider";
//import StressLineChart from "./graphComponents/StressLineChart";
import StressPieChart from "./graphComponents/StressPieChart";
import LineChartSkeleton from "./SkeletonComponents/LineChartSkeleton";
import PieChartSkeleton from "./SkeletonComponents/PieChartSkeleton";
import StressLineChart from "./graphComponents/StressLineChart";
const EvaluatePage = () => {

    // for loading and calling the model
    const [loading, setLoading] = useState(true);
    const [start, setStart] = useState(false);

    //input data 
    const [category, setCategory] = useState("Posts");
    const [handle, setHandle] = useState("");

    // output data
    const [posts, setPosts] = useState([]);

    const [finalData, setFinalData] = useState([
        { name: 'Stressed', value: 0.24 * 100 },
        { name: 'Not Stressed', value: 0.76 * 100 }
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

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    const getStressPredictionJson = async () => {
        const resp=await fetch("/predict", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': handle,
            })
        });
        const stress_level=await resp.json();
        console.log(stress_level);
        return stress_level;
    }

    // handling the data changes functions
    const handleInputChange = async (e) => {
        setHandle(e.target.value);
    }

    const handleStart = (e) => {
        if (start === true)
            setLoading(true);
        setStart(true);
        callModel(category, handle);
    }

    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }

    const callModel = async (category, handle) => {
        var resp_data=await getStressPredictionJson();
        var stress_level=resp_data['stress_level']
        var non_stress=roundToTwo((1-stress_level)*100);
        stress_level=roundToTwo(stress_level*100);
        //console.log(stress_level.toFixed(2));  
        //console.log(non_stress.toFixed(2));
        setFinalData([
            { name: 'Stressed', value: stress_level },
            { name: 'Not Stressed', value: non_stress }
        ]);
        resp_data.time_stress.sort(function (a, b) {
            return a.time-b.time;
        });
        await setSingleData(resp_data.time_stress);
        setLoading(false);
        console.log(singleData);
        // function to call backend
        /*setTimeout(() => {
            // ending the skeleton 
            setLoading(false);
            console.log(`We are checking ${category} for reddit user ${handle}`);

            // setting the posts.
            setPosts([
                `god im so sorry man. losing pets is the absolute worst, it’s not 
            a “pathetic excuse” at all. your dog was a part of your life, it’s 
            understandable to feel that grief`,
                `I just want to be fucking alone. people are the worst man. I hate
            socializing. just leave me the fuck alone.`,
                `I always feel like I have no redeeming qualities and feel 
                inferior in every single way to everyone else. I look up to basically 
                everyone with envy and respect, knowing they have earned whatever 
                talent or trait they obtained. Nobody else has any reason to look at 
                me like that, and thinking about that makes me want to die.`,
                 `Three month after procrastination because of depression, i 
                finally made the painting for this drawing`,
                `After 10 brain surgeries, and much questioning why I am alive, I 
                developed a sort of shattered state of mind after the horrible affects
                of the medical condition I have, and this led to a moderately bad 
                depressive cycle. But… Through much philosophy, books, nature, doggos,
                and other stuff, I believe I have broken my depressive cycle. I 
                haven’t had any majorly depressing thoughts in months now, and I 
                believe I have done it!!`,
                `Decided to go considering I (25m) broke down crying in front of 
                my boss. It was an awesome experience and it felt so good to get so 
                much off my chest!`,
                `I hate that people don’t understand that i don’t want to kill 
                myself, I just don’t want to be alive anymore`,
                 `200 days drugs free today, on my way to my first day of 
                college.`,
                `A year ago my wife left me and my girls. I finally got the 
                finalized divorce papers in the mail today! That means I officially 
                have custody of my two tiny monsters! I’ve also lost over 70lbs in the
                last year, working to get healthy and watch these two grow up. Haven’t
                been this happy in forever.`]);
        }, 3000);*/
        //setFinalData(finalData);
    }

    const handleCategory = (e) => {
        console.log("sending request")
        setCategory(e.target.value);
    }
    
    return (
        <div className="evaluate-page-container">
            <div className="evaluate-page-header">
                <h3 className="evaluate-page-header-text">Enter your handle to evaluate </h3>
            </div>
            <div className="evaluate-input-area">

                <label className="evaluate-category">
                    <select value={category} onChange={(event) => handleCategory(event)} >
                        <option value="Posts">Posts Only</option>
                        <option value="Comments">Comments Only</option>
                        <option value="Posts + Comments">Posts + Comments</option>
                    </select>
                </label>

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
                start === true ? loading === true
                    ?
                    // when loading skeleton is to be shown.
                    <div className="evaluate-result">
                        <PieChartSkeleton />
                        <LineChartSkeleton />
                    </div>
                    :
                    // when final result is to be shown
                    <div className="evaluate-result">
                        <div className="evaluate-pie-chart"><StressPieChart data={finalData} /></div>
                        <div className="evalaute-line-chart"><StressLineChart data={singleData} /></div>
                    </div>
                    :
                    // when opening page first time
                    <div>Process not started</div>
            }
            
            {/* Posts is set 0 so it will not display rightnow.
                But will make a option checkbox if user want to see this or not. */}
            <Slider posts={posts} singleData={singleData} />

        </div>
    );
}

export default EvaluatePage;