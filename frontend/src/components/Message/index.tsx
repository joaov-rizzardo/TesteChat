import MessageContent from "./Message"
import MessageAudio from "./MessageAudio"
import MessageContainer from "./MessageContainer"
import MessageHour from "./MessageHour"
import MessageImage from "./MessageImage"

const Message = {
    Container: MessageContainer,
    Message: MessageContent,
    Hour: MessageHour,
    Image: MessageImage,
    Audio: MessageAudio
}

export default Message