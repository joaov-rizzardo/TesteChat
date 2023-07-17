import { InputHTMLAttributes } from "react"

interface CustomInputProps {
    inputProps: InputHTMLAttributes<HTMLInputElement>
}

export default function CustomInput({inputProps}: CustomInputProps){
    return (
        <input className="border-none bg-gray-700 outline-none w-full text-gray-300" {...inputProps}/>
    )
}