import { faArrowLeft, faClose } from "@fortawesome/free-solid-svg-icons";
import ContactUpdate from "./ContactUpdate";
import ContactList from "./ContactList";
import IconButton from "./IconButton";
import { useState } from "react";

interface ContactsModalProps {
    closeFunction: () => void
}

export type ContactType = {
    id?: string,
    name: string,
    phone: string
}

export default function ContactsModal({closeFunction}: ContactsModalProps) {

    const [currentScreen, setCurrentScreen] = useState<'list'|'update'>('list')
    const [contact, setContact] = useState<ContactType>({
        id: undefined, 
        name: '', 
        phone: ''
    })

    function openUpdateScreen({id, name, phone}: ContactType){
        setContact({id, name, phone})
        setCurrentScreen('update')
    }
    return (
        <div className="w-screen h-screen fixed top-0 left-0 z-10 flex items-center justify-center">
            <div className="w-1/2 h-3/4 bg-gray-700 flex flex-col overflow-y-hidden border-gray-600 border rounded-lg">
                <div className="w-full h-10 flex justify-center items-center gap-3 px-3 py-4 text-gray-300 text-lg">
                    {currentScreen === 'update' && 
                        <IconButton 
                            iconProps={{icon: faArrowLeft}} 
                            buttonProps={{
                                onClick: () => setCurrentScreen('list')
                            }}
                        />
                    }
                    <span className="flex-1 text-center text-lg">Agenda</span>
                    <IconButton iconProps={{icon: faClose}} buttonProps={{onClick: closeFunction}}/>
                </div>
                {currentScreen === 'list' ? <ContactList openUpdateList={openUpdateScreen}/> : <ContactUpdate contact={contact} setContact={setContact}/>}
            </div>
        </div>
    )
}