import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

interface CustomInputIconProps {
    iconProps: FontAwesomeIconProps
}

export default function CustomInputIcon({iconProps}: CustomInputIconProps){
    return (
        <FontAwesomeIcon {...iconProps} className="text-gray-300"/>
    )
}