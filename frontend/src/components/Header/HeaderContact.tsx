import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ContactType } from "../../hooks/useContact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HeaderContactProps {
    selectedContact: ContactType | undefined
}
export default function HeaderContact({selectedContact}: HeaderContactProps) {
    return (
        <div className="px-7 py-3 flex justify-between">
            {
                selectedContact !== undefined && (
                    <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex justify-center items-center">
                            <FontAwesomeIcon icon={faUser} className="text-gray-900" />
                        </div>
                        <span className="text-gray-300">{selectedContact.name}</span>
                    </div>
                )
            }
        </div>
    )
}