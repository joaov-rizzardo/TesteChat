import { useRef, useState } from "react";
import { nsolucoesApi } from "../services/api";

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).replace('.', '')
}

export default function useSession() {
    const [qrcode, setQrcode] = useState<string | undefined>(undefined)
    const sessionId= useRef<string>('')
    const [jid, setJid] = useState<string | undefined>(undefined)

    const searchQrCode = async () => {
        try {
            if(sessionId.current === ''){
                const uniqueId = generateUniqueId()
                sessionId.current = uniqueId
                const response = await nsolucoesApi.post<{ qr: string }>('/sessions/add', {
                    sessionId: sessionId.current
                })
                setQrcode(response.data.qr)
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    type CheckStatusResponseType = {
        status: 'AWAITING_SCAN' | 'AUTHENTICATED',
        me: {
            name: string | false,
            jid: string | false,
            picture: null
        }
    }

    const checkQrCode = async () => {
        try {
            const response = await nsolucoesApi.get<CheckStatusResponseType>(`/sessions/${sessionId.current}/status`)
            if (response.data.status === 'AUTHENTICATED') {
                if (response.data.me.jid) {
                    setJid(response.data.me.jid)
                    return response.data.me.jid
                }
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    return { qrcode, sessionId, checkQrCode, searchQrCode, jid }
}