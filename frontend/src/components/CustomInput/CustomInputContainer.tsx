import { ReactNode } from "react";

interface CustomInputContainerProps {
    children: ReactNode
}

export default function CustomInputContainer({children}: CustomInputContainerProps){
    return (
        <div className="w-full h-full bg-gray-700 rounded-xl flex gap-3 items-center justify-between px-5 py-3">
            {children}
        </div>
    )
}