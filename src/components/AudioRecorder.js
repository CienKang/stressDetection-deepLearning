import useRecorder from "../hooks/useRecorder";

const AudioRecorder = () => {

    let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

    return (
        <div className="">
            <audio src={audioURL} controls />
            <button onClick={startRecording} disabled={isRecording} >
            Start
            </button>
            <button onClick={stopRecording} disabled={!isRecording} >
                stop
            </button>
            <button onClick={console.log(audioURL)}>CLick Me</button>
        </div>
    );
}

export default AudioRecorder;