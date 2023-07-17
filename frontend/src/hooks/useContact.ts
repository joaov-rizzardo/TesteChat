import { useState } from "react";
import { backendApi } from "../services/api";

export type ContactType = {
    __v: number,
    _id: string,
    name: string,
    phone: string,
    messages: Array<ContactMessageType>
}

export type ContactMessageType = {
    type: 'file' | 'text',
    content: string,
    _id: string,
    createdAt: string,
    updatedAt: string,
    image?: string
}

export default function useContact() {
    const [contacts, setContacts] = useState<ContactType[]>([])

    const loadContacts = async () => {
        try {
            const response = await backendApi.get<ContactType[]>('/contacts/findAll')
            const contacts = response.data
            setContacts(contacts)
            return contacts
        } catch (error: any) {
            console.log(error)
            return false
        }
    }

    const createContact = async ({ name, phone }: { name: string, phone: string }) => {
        try {
            const response = await backendApi.post<ContactType>('/contacts/create', {
                name, phone
            })
            const contact = response.data
            setContacts(prevContacts => {
                return [...prevContacts, contact]
            })
            return contact
        } catch (error: any) {
            console.log(error)
            return false
        }
    }

    const updateContact = async ({ id, name, phone }: { id: string, name: string, phone: string }) => {
        try {
            const response = await backendApi.put<ContactType>(`/contacts/update/${id}`, {
                name, phone
            })
            const updatedContact = response.data
            setContacts(prevContacts => {
                return prevContacts.map(contact => {
                    if (contact._id === updatedContact._id) {
                        return updatedContact
                    }
                    return contact
                })
            })
            return updatedContact
        } catch (error: any) {
            console.log(error)
            return false
        }
    }

    const deleteContact = async (id: string) => {
        try {
            await backendApi.delete<{ message: string }>(`/contacts/delete/${id}`)
            setContacts(prevContacts => {
                return prevContacts.filter(contact => {
                    if (contact._id !== id) {
                        return contact
                    }
                })
            })
            return true
        } catch (error: any) {
            console.log(error)
            return false
        }
    }

    const sendMessage = async ({contactId, type, content, image }: {contactId: string, type: 'file' | 'text', content?: string, image?: string }) => {
        try {
            let payload: {type: 'file' | 'text', content?: string, image?: string} = {type, content}
            if(image !== undefined){
                payload.image = image
            }
            const response = await backendApi.post<ContactMessageType>(`/message/send/${contactId}`, payload)
            const sentMessage = response.data
            setContacts(prevContacts => {
                return prevContacts.map(contact => {
                    if(contact._id === contactId){
                        return {
                            ...contact,
                            messages: [...contact.messages, sentMessage]
                        }
                    }
                    return contact
                })
            })
            return sentMessage
        } catch (error: any) {
            console.log(error)
            return false
        }
    }
    return { contacts, loadContacts, createContact, updateContact, deleteContact, sendMessage}
}