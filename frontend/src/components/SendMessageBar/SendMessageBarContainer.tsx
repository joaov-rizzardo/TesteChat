import { ReactNode } from "react"

interface SendMessageBarContainerProps {
    children: ReactNode
}

export default function SendMessageBarContainer({ children }: SendMessageBarContainerProps) {
    return (
        <div className="h-24 bg-gray-700 p-5 flex items-center gap-4">
            {children}
        </div>
    )
}