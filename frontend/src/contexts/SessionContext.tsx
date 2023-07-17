import { ReactNode, createContext } from "react";
import useSession from "../hooks/useSession";

type SessionContextType = {
    jid?: string
    qrcode?: string
    sessionId: string
    checkQrCode: () => Promise<string | undefined>,
    searchQrCode: () => Promise<void>
}

const Context = createContext<SessionContextType>({} as SessionContextType)

function SessionProvider({children}: {children: ReactNode}){
    const {jid, qrcode, sessionId, checkQrCode, searchQrCode} = useSession()
    return (
        <Context.Provider value={{jid, qrcode, sessionId, checkQrCode, searchQrCode}}>
            {children}
        </Context.Provider>   
    )
}

export {Context, SessionProvider}