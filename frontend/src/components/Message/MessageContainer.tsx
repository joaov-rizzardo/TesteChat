import { ReactNode } from "react"

interface MessageContainerProps {
    children: ReactNode
    type: 'sent' | 'received'
}

export default function MessageContainer({children,  type}: MessageContainerProps){
    const color = type === 'sent' ?  'bg-emerald-700' : 'bg-gray-700'
    const align = type === 'sent' ?  'self-end' : 'self-start'
    const classes = `flex gap-2 ${align} ${color} rounded-xl text-gray-300 px-3 py-2 max-w-lg flex-col`
    return (
        <div className={classes}>
            {children}
        </div>
    )
}