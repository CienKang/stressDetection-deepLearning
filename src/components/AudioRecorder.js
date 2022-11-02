import useRecorder from "../hooks/useRecorder";

const AudioRecorder = () => {

    let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

    async function getBlob(blob_url){
        let blob = await fetch(blob_url).then(r => r.blob());
        return blob;
    }

    async function sendAudio() {
        var data = new FormData()
        var audio_blob= await getBlob(audioURL);
        data.append('file',  audio_blob, 'file')
        fetch('http://localhost:5000/predict_voice', {
            method: 'POST',
            body: data
        }).then(response => response.json()
        ).then(json => {
            console.log(json)
        });
    }

    return (
        <div className="">
            <audio src={audioURL} controls />
            <button onClick={startRecording} disabled={isRecording} >
            Start
            </button>
            <button onClick={stopRecording} disabled={!isRecording} >
                stop
            </button>
            <button onClick={sendAudio}>Send</button>
        </div>
    );
}

export default AudioRecorder;