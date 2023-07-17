import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContactType } from "../hooks/useContact";
import { convertDatetimeStringToTimeString } from "../utils/DateFormats";

interface UserMessageProps {
    contact: ContactType,
    setSelectedContactId: React.Dispatch<React.SetStateAction<string>>
}
export default function UserMessage({contact, setSelectedContactId}: UserMessageProps) {
    const textMessages = contact.messages.filter(message => message.type === 'text')
    const lastMessage = textMessages[textMessages.length - 1]
    const timeString = lastMessage?.createdAt !== undefined ? convertDatetimeStringToTimeString(lastMessage.createdAt) : ''
    return (
        <div 
            onClick={() => setSelectedContactId(contact._id)}
            className="h-20 p-3 flex gap-5 hover:cursor-pointer hover:bg-gray-900"
        >
            <div className="w-12 h-12 rounded-full bg-gray-600 flex justify-center items-center">
                <FontAwesomeIcon icon={faUser} className="text-gray-900 text-lg" />
            </div>
            <div className="flex-1">
                <h1 className="text-lg font-bold">{contact.name}</h1>
                <p className="text-sm truncate w-80">{lastMessage?.content ?? ''}</p>
            </div>
            <div className="h-full flex items-start">
                <span>{timeString}</span>
            </div>
        </div>
    )
}