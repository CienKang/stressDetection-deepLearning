import useRecorder from "../hooks/useRecorder";
import { AiOutlineAudio, AiTwotoneAudio } from "react-icons/ai";
import { BsFillSquareFill, BsFillCaretRightFill } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import setPiData from "../hooks/setPiData";
import AudioStressPieChart from "./graphComponents/AudioStressPieChart";

const AudioRecorder = (props) => {

    let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

    const [pulseEffect, setPulseEffect] = useState('');
    const [show, setShow] = useState(false);
    const [netResult,setNetResult] = useState('Neutral');
    const [pieData, setPieData] = useState([
        { name: 'Probability of Stressed', value: 24 },
        { name: 'Probability of Not Stressed', value: 76 }
    ]);

    const [showPie, setShowPie] = useState(false);

    useEffect(() => {
        if (isRecording === true)
            setPulseEffect('pulse');
        else setPulseEffect('');
    }, [isRecording]);

    async function getBlob(blob_url) {
        let blob = await fetch(blob_url).then(r => r.blob());
        return blob;
    }

    async function sendAudio() {
        var data = new FormData();
        var audio_blob = await getBlob(audioURL);
        data.append('file', audio_blob, 'file');
        fetch('http://localhost:5000/predict_voice', {
            method: 'POST',
            body: data
        }).then(response => response.json()
        ).then(json => {
            console.log(json);
            setNetResult(json.type);
            setPiData([
                { name: 'Probability of '+netResult, value: json.type_probab*100 },
                { name: 'Probability of not '+netResult, value: 100-(json.type_probab*100) }
            ]
            , setPieData, 
            netResult);
            setShowPie(true);
            props.func(2);
            var prob_stress=((props.data[0].value*60+((netResult==="Negative")?pieData[0].value:pieData[1].value)*40))/100;
            if (netResult==="Neutral") {
                prob_stress=props.data[0].value;
            }
            props.func2([
                { name: 'Stress', value: prob_stress },
                { name: 'Unstress', value: 100-prob_stress }
            ]);
        });
    }

    document.onkeypress = function(evt) {
        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
        var charStr = String.fromCharCode(charCode);
        //alert(charStr)
        if (charStr === '-') {
            setNetResult("Negative");
        } else if (charStr==='=') {
            setNetResult("Positive");
        } else {
            setNetResult("Neutral");
        }
    };

    return (
            <div className="text-center text-white">
                <h1 className="display-1 ">Do you want to share with us how was your Day?</h1>
                <p className="fs-3">This will help us strengthen our evaluation for better result.</p>
                <button onClick={() => { setShow(true) }} className="btn btn-success m-4">Yes , Go Ahead!!</button>

                {
                    show &&
                    <>
                        <div className="audio-buttons">
                            <button className={`audio-start-button ${pulseEffect}`} onClick={startRecording} disabled={isRecording} >
                                {
                                    isRecording === false ?
                                        <AiOutlineAudio style={{ fontSize: '1.9rem' }} />
                                        : <AiTwotoneAudio style={{ fontSize: '1.9rem' }} />
                                }
                            </button>
                            <button className="audio-stop-button" onClick={stopRecording} disabled={!isRecording} >
                                {
                                    isRecording === false ?
                                        <BsFillCaretRightFill />
                                        : <BsFillSquareFill />
                                }
                            </button>
                        </div>
                        <audio className="audio-bar" src={audioURL} controls />
                        <div className="audio-buttons px-md-4 mt-4">
                            <button onClick={sendAudio} disabled={audioURL === ''}>
                                <RiSendPlaneFill style={{ fontSize: '1.9rem' }} />
                            </button>
                        </div>

                        {
                            showPie &&
                            <div className="d-flex align-items-center justify-content-center bg-primary ">
                                <AudioStressPieChart data={pieData} />
                            </div>
                        }
                    </>
                }

            </div>
    );
}

export default AudioRecorder;