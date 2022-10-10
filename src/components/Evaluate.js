import { useState } from "react";
import Evaluate from '../images/Evaluate.svg';
import Slider from "./graphComponents/Slider";
import StressLineChart from "./graphComponents/StressLineChart";
import StressPieChart from "./graphComponents/StressPieChart";
import LineChartSkeleton from "./SkeletonComponents/LineChartSkeleton";
import PieChartSkeleton from "./SkeletonComponents/PieChartSkeleton";
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
        { postNo: 1, stress: 0.07892925 },
        { postNo: 2, stress: 0.06309325 },
        { postNo: 3, stress: 0.06309325 },
        { postNo: 4, stress: 0.01263258 },
        { postNo: 5, stress: 0.86423004 },
        { postNo: 6, stress: 0.07787955 },
        { postNo: 7, stress: 0.9313904 },
        { postNo: 8, stress: 0.02374187 },
        { postNo: 9, stress: 0.10824141 }
    ])

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
        console.log(stress_level['stress_level']);
    }

    // handling the data changes functions
    const handleInputChange = async (e) => {
        setHandle(e.target.value);
    }

    const handleStart = (e) => {
        getStressPredictionJson();
        if (start === true)
            setLoading(true);
        setStart(true);
        callModel(category, handle);
    }

    const callModel = (category, handle) => {

        // function to call backend
        setTimeout(() => {
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
        }, 3000);

        setSingleData(singleData);
        setFinalData(finalData);
    }
<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
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