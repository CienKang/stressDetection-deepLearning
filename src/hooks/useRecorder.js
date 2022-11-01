import { useEffect, useState } from "react";

const useRecorder = () => {

    const [audioURL, setAudioURL] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);

    const startRecording = () => {
        setIsRecording(true);
    }

    const stopRecording = () => {
        setIsRecording(false);
    }

    useEffect(() => {

        if (recorder === null) {
            if (isRecording)
                requestRecorder().then(setRecorder, console.error);
            return ;
        }

        if (isRecording){
            recorder.start();
        }
        else {
            recorder.stop();
        }

        const handleData = (e) => {
            setAudioURL(URL.createObjectURL(e.data));
        }

        recorder.addEventListener("dataavailable", handleData);
        return () => recorder.removeEventListener("dataavailable", handleData);

    }, [recorder, isRecording]);


    return [audioURL, isRecording ,startRecording, stopRecording];
}

export default useRecorder;

async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
}
