import { useState } from "react"
import { ContactType } from "../hooks/useContact"
import CustomInput from "./CustomInput"
import Separator from "./Separator"
import UserMessage from "./UserMessage"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

interface AsideMessagesProps {
    contacts: ContactType[],
    setSelectedContactId: React.Dispatch<React.SetStateAction<string>>
}

export default function AsideMessages({contacts, setSelectedContactId}: AsideMessagesProps) {
    const [searchedValue, setSearchedValue] = useState<string>('')
    
    function sortContacts(a: ContactType, b: ContactType) {
        const lastMessageA = a.messages[a.messages.length - 1]
        const lastMessageB = b.messages[b.messages.length - 1]
        if (lastMessageA === undefined && lastMessageB === undefined) {
            return 0
        }
        if (lastMessageA === undefined) {
            return 1
        }
        if (lastMessageB === undefined) {
            return -1
        }
        const lastMessageDateA = new Date(lastMessageA.createdAt)
        const lastMessageDateB = new Date(lastMessageB.createdAt)
        if (lastMessageDateA === lastMessageDateB) {
            return 0
        }
        return lastMessageDateA < lastMessageDateB ? -1 : 1
    }

    return (
        <aside className="w-1/3 bg-gray-800 flex flex-col">
            <div className="px-7 py-5 h-20">
                <CustomInput.Container>
                    <CustomInput.Input
                        inputProps={{
                            type: 'text',
                            placeholder: 'Pesquisar contato',
                            value: searchedValue,
                            onChange: e => setSearchedValue(e.target.value)
                        }}
                    />
                    <CustomInput.Icon iconProps={{ icon: faSearch }} />
                </CustomInput.Container>
            </div>
            <Separator type="x" />
            <div className="flex-1 text-gray-300  overflow-y-scroll custom-scrollbar max-h-full">
                {
                    contacts.filter(contact => contact.name.includes(searchedValue)).sort(sortContacts).map(contact => {
                        return (
                            <>
                                <UserMessage contact={contact} setSelectedContactId={setSelectedContactId} />
                                <Separator type="x" />
                            </>
                        )
                    })
                }

            </div>
        </aside>
    )
}