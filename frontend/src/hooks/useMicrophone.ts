import { useRef, useState } from "react";

export default function useMicrophone() {
    const [recording, setRecording] = useState<boolean>(false);
    const recorder = useRef<MediaRecorder | null>(null)
    const audioChunks = useRef<Blob[]>([])
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null)

    const initRecorder = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            setAudioStream(stream)
        } catch (error: any) {
            console.log(error)
        }
    }

    const startRecording = async () => {
        if (audioStream === null) {
            return false
        }
        const mediaRecorder = new MediaRecorder(audioStream);
        recorder.current = mediaRecorder
        setRecording(true)
        recorder.current.start()
        const chunks: Blob[] = []
        recorder.current.ondataavailable = event => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        }
        audioChunks.current = chunks
    }

    const stopRecording = async () => {
        if (recorder.current !== null) {
            await new Promise(resolve => {
                recorder.current!.onstop = () => {
                    setRecording(false)
                    resolve('aqui')
                }
                recorder.current!.stop();
            })
        } else {
            return false
        }
    }

    return { initRecorder, recording, startRecording, stopRecording, audioChunks }
}