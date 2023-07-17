interface MessageImageProps {
    filename: string
}

export default function MessageImage({filename}: MessageImageProps){
    return (
        <div className="max-w-full">
            <img src={`${import.meta.env.VITE_APP_BACKEND_API}/upload/${filename}`} alt="" />
        </div>
    )
}