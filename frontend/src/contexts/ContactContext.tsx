import { ReactNode, createContext } from "react";
import useContact, { ContactMessageType, ContactType } from "../hooks/useContact";

type ContactContextType = {
    contacts: ContactType[]
    loadContacts: () => Promise<false | ContactType[]>
    createContact: ({ name, phone }: {
        name: string;
        phone: string;
    }) => Promise<false | ContactType>
    updateContact: ({ id, name, phone }: {
        id: string;
        name: string;
        phone: string;
    }) => Promise<false | ContactType>
    deleteContact: (id: string) => Promise<boolean>,
    sendMessage: ({ contactId, type, content, image }: {
        contactId: string;
        type: 'file' | 'text';
        content: string;
        image?: string | undefined;
    }) => Promise<false | ContactMessageType>
}

const ContactContext = createContext<ContactContextType>({} as ContactContextType)

function ContactProvider({children}: {children: ReactNode}){
    const {contacts, loadContacts, createContact, updateContact, deleteContact, sendMessage} = useContact()
    return (
        <ContactContext.Provider value={{contacts, loadContacts, createContact, updateContact, deleteContact, sendMessage}}>
            {children}
        </ContactContext.Provider>   
    )
}

export {ContactContext, ContactProvider}