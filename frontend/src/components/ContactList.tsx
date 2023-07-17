import { faSearch, faPlus, faUser, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Separator from "./Separator";
import CustomInput from "./CustomInput";
import IconButton from "./IconButton";
import { ContactType } from "./ContactsModal";
import { useContext, useState } from "react";
import { ContactContext } from "../contexts/ContactContext";


interface ContactListProps {
    openUpdateList: ({ id, name, phone }: ContactType) => void
}

export default function ContactList({ openUpdateList }: ContactListProps) {
    const { contacts, deleteContact } = useContext(ContactContext)
    const [searchedValue, setSearchedValue] = useState<string>('')
    return (
        <>
            <div className="px-7 py-5 h-20 bg-gray-800 flex gap-3 items-center">
                <CustomInput.Container>
                    <CustomInput.Input
                        inputProps={{ 
                            type: 'text', 
                            placeholder: 'Pesquisar contato' ,
                            value: searchedValue,
                            onChange: e => setSearchedValue(e.target.value)
                        }}
                    />
                    <CustomInput.Icon iconProps={{ icon: faSearch }} />
                </CustomInput.Container>
                <IconButton
                    iconProps={{ icon: faPlus }}
                    buttonProps={{
                        onClick: () => openUpdateList({
                            name: '',
                            phone: ''
                        })
                    }}
                />
            </div>
            <Separator type="x" />
            <div className="flex flex-col flex-1 bg-gray-800 overflow-y-scroll custom-scrollbar">
                {contacts.filter(contact => {
                    return contact.name.includes(searchedValue)
                }).map(contact => {
                    return (
                        <>
                            <div className="flex items-center text-gray-300 gap-5 px-4 py-3">
                                <div className="w-10 h-10 rounded-full bg-gray-600 flex justify-center items-center">
                                    <FontAwesomeIcon icon={faUser} className="text-gray-900" />
                                </div>
                                <span className="flex-1 text-center">{contact.name}</span>
                                <div className="flex gap-3 text-lg">
                                    <IconButton 
                                        iconProps={{ icon: faPenToSquare }} 
                                        buttonProps={{
                                            onClick: () => openUpdateList({
                                                id: contact._id,
                                                name: contact.name,
                                                phone: contact.phone
                                            })
                                        }}
                                    />
                                    <IconButton 
                                        iconProps={{ icon: faTrash }} 
                                        buttonProps={{
                                            onClick: () => deleteContact(contact._id)
                                        }}
                                    />
                                </div>
                            </div>
                            <Separator type="x" />
                        </>

                    )
                })}
            </div>
        </>
    )
}