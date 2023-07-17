import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../IconButton";

interface HeaderMessagesProps {
    openModal: () => void
}
export default function HeaderMessages({ openModal }: HeaderMessagesProps) {
    return (
        <div className="w-1/3 flex py-3 px-9 justify-between">
            <span className="text-gray-300 text-lg">Conversas</span>
            <div className="flex gap-9 items-center">
                <IconButton iconProps={{ icon: faAddressBook }} buttonProps={{ onClick: openModal }} />
            </div>
        </div>
    )

}