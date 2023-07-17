import { useEffect, useRef } from "react"
import { convertDatetimeStringToTimeString } from "../utils/DateFormats"
import Message from "./Message"
import { ContactType } from "../hooks/useContact"

interface ContactMessagesProps {
    selectedContact: ContactType | undefined
}
export default function ContactMessages({selectedContact}: ContactMessagesProps) {
    const divMessagesRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (divMessagesRef.current !== null) {
          divMessagesRef.current.scrollTop = divMessagesRef.current.scrollHeight;
        }
      }, [selectedContact])
    return (
        <div ref={divMessagesRef} className="flex-1 flex gap-3 flex-col overflow-y-scroll custom-scrollbar px-10 py-4">
            {
                selectedContact !== undefined && (
                    selectedContact.messages.map(message => {
                        if (message.type === 'text') {
                            return (
                                <Message.Container type="sent">
                                    {message.image !== undefined && (
                                        <Message.Image filename={message.image} />
                                    )}
                                    <Message.Message message={message.content} />
                                    <Message.Hour hour={convertDatetimeStringToTimeString(message.createdAt)} />
                                </Message.Container>
                            )
                        } else {
                            return (
                                <Message.Container type="sent">
                                    <Message.Audio audioFilename={message.content} />
                                    <Message.Hour hour={convertDatetimeStringToTimeString(message.createdAt)} />
                                </Message.Container>
                            )
                        }
                    })
                )
            }
        </div>
    )
}