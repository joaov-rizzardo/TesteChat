import { ReactNode } from "react"

interface HeaderContainerProps  {
    children: ReactNode
}

export default function HeaderContainer({children}: HeaderContainerProps){
    return (
        <header className="w-screen h-16 bg-gray-700 flex items-center">
            {children}
        </header>
    )
}