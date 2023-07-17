import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../IconButton";
import { useRef, useState } from "react";

interface MessageAudioProps {
    audioFilename: string
}
export default function MessageAudio({ audioFilename }: MessageAudioProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const handlePlay = () => {
        if (audioRef.current !== null) {
            audioRef.current.currentTime = currentTime
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        if (audioRef.current !== null) {
            audioRef.current.pause();
            setIsPlaying(false);
        }

    };

    const handleTimeUpdate = () => {
        if (audioRef.current !== null) {
            {
                setCurrentTime(audioRef.current.currentTime);
            }
        };
    }

    const handleEnded = () => {
        if(audioRef.current !== null){
            setIsPlaying(false)
            audioRef.current.currentTime = 0
        }
    }
    return (
        <div className="flex w-40 items-center gap-5">
            <audio
                ref={audioRef}
                src={`${import.meta.env.VITE_APP_BACKEND_API}/upload/${audioFilename}`}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />
            {
                isPlaying === false ?
                    <IconButton
                        iconProps={{ icon: faPlay }}
                        buttonProps={{
                            onClick: handlePlay
                        }}
                    />
                    :
                    <IconButton
                        iconProps={{ icon: faPause }}
                        buttonProps={{
                            onClick: handlePause
                        }}
                    />
            }

            <div className="border-gray-600 border w-full flex-1"></div>
        </div>
    )
}