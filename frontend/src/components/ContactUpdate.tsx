import { faAddressCard, faPhone } from "@fortawesome/free-solid-svg-icons";
import CustomInput from "./CustomInput";
import { useContext } from "react";
import { ContactType } from "./ContactsModal";
import { ContactContext } from "../contexts/ContactContext";
import { phoneMask } from "../utils/Masks";

interface ContactUpdateProps {
    contact: ContactType,
    setContact: React.Dispatch<React.SetStateAction<ContactType>>,
}


export default function ContactUpdate({contact, setContact}: ContactUpdateProps) {
    const {createContact, updateContact} = useContext(ContactContext)

    async function handleCreateContact(){
        if(checkValidations() === false){
            return false
        }
        const response = await createContact(contact)
        if(response !== false){
            alert('Contato cadastrado com sucesso')
            setContact({
                id: response._id,
                name: response.name,
                phone: response.phone
            })
        }else{
            alert('Ocorreu um erro ao cadastrar o contato')
        }
    }

    async function handleUpdateContact(){
        if(checkValidations() === false){
            return false
        }
        const response = await updateContact({
            id: contact.id!,
            name: contact.name,
            phone: contact.phone
        })
        if(response !== false){
            alert('Contato atualizado com sucesso')
        }else{
            alert('Não foi possível atualizar o contato')
        }
    }

    function checkValidations(){
        if(contact.name.length === 0){
            alert('Por favor, informe o nome do contato')
            return false
        }
        if(contact.phone.length === 0 || !contact.phone.match(/^\(\d{2}\) \d{4,5}-\d{4}$/)){
            alert('Por favor, informe o número do telefone')
            return false
        }
        return true
    }
    return (
        <div className="px-7 py-5 flex-1 bg-gray-800 flex flex-col gap-5">
            <div>
                <CustomInput.Container>
                    <CustomInput.Icon iconProps={{ icon: faAddressCard }} />
                    <CustomInput.Input
                        inputProps={{
                            type: 'text', 
                            placeholder: 'Nome do contato', 
                            value: contact.name,
                            onChange: e => setContact(prevState => {
                                return {
                                    ...prevState,
                                    name: e.target.value
                                }
                            })
                        }}
                    />
                </CustomInput.Container>
            </div>

            <div>
                <CustomInput.Container>
                    <CustomInput.Icon iconProps={{ icon: faPhone }} />
                    <CustomInput.Input
                        inputProps={{
                            type: 'text', 
                            placeholder: 'Telefone', 
                            value: contact.phone,
                            onChange: e => setContact(prevState => {
                                return {
                                    ...prevState,
                                    phone: phoneMask(e.target.value)
                                }
                            })
                        }}
                    />
                </CustomInput.Container>
            </div>
            {contact.id === undefined ?
                <button 
                    className="bg-gray-600 px-2 py-3 text-gray-300 rounded-xl hover:bg-gray-700"
                    onClick={handleCreateContact}
                >Criar contato</button>
            :
                <button 
                    className="bg-gray-600 px-2 py-3 text-gray-300 rounded-xl hover:bg-gray-700"
                    onClick={handleUpdateContact}
                >Alterar contato</button>
            }
            
        </div>
    )
}