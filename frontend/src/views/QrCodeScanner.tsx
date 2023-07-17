import { useContext, useEffect } from "react"
import { Context } from "../contexts/SessionContext"

export default function QrCodeScanner() {
    const { qrcode, searchQrCode, checkQrCode, sessionId} = useContext(Context)
    
    useEffect(() => {
        searchQrCode()
    }, [])

    useEffect(() => {
        if(sessionId.current !== ''){
            watchSessionStatus()
        }
    }, [sessionId.current])

    async function watchSessionStatus(){
        const jid = await checkQrCode()
        if(jid === undefined){
            await watchSessionStatus()
        }
    }
    
    return (
        <div className="w-screen h-screen bg-gray-600 flex items-center justify-center">
            <div className="w-1/2 h-3/4 bg-gray-800 rounded-xl px-3 py-4 flex flex-col items-center justify-center">
                <div className="text-gray-300 w-full h-30 text-center">
                    <h1 className="text-xl">Leia o QR Code abaixo para iniciar a sessão</h1>
                    <p className="text-sm text-gray-400">Escaneie o código a partir do whatsapp do seu celular</p>
                </div>
                <div className="flex flex-1 justify-center items-center w-full">
                    {qrcode !== undefined ?
                        <img className="w-1/2 aspect-square" src={qrcode ?? ''} alt="QR Code" />
                        :
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-40 w-40 border-t-2 border-b-2 border-gray-600"></div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}