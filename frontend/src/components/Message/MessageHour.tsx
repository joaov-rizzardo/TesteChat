interface MessageHourProps {
    hour: string
}

export default function MessageHour({hour}: MessageHourProps){
    return (
        <span className="self-end text-xs">{hour}</span>
    )
}