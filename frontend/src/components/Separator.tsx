interface SeparatorProps {
    type: 'x' | 'y'
}

export default function Separator({type}: SeparatorProps){
    return type === 'x' ? 
        <div className="border-gray-600 border w-full"></div>
    :
        <div className="border-gray-600 border h-full"></div>

}