import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import { ButtonHTMLAttributes } from "react"

interface IconButtonProps {
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>,
    iconProps: FontAwesomeIconProps
}

export default function IconButton({ buttonProps,  iconProps}: IconButtonProps) {
    return (
        <button className="w-6 h-6" {...buttonProps}>
            <FontAwesomeIcon className="w-full h-full text-gray-400 hover:text-gray-600" {...iconProps} />
        </button>
    )
}