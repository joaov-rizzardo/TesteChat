import { nsolucoesApi } from "../services/api"

export default function useMessageApi(){

    type SendTextType = {
        message: string,
        jid: string,
        sessionId: string
    }

    type SendTextResponseType = {
        key: {
            remoteJid: string,
            fromMe: boolean,
            id: string
        },
        message: {
            extendedTextMessage: {
                text: string
            }
        },
        messageTimestamp: string,
        status: string
    }

    const sendText = async ({message, jid, sessionId}: SendTextType) => {
        try{
            const response = await nsolucoesApi.post<SendTextResponseType>(`/${sessionId}/messages/send`, {
                jid: jid,
                message: {
                    text: message
                }
            })
            return response.data
        }catch(error: any){
            return false
        }
    }

    type SendImageType = {
        jid: string,
        url: string,
        sessionId: string,
        caption: string
    }

    type SendImageResponseType = {
        key: {
            remoteJid: string,
            fromMe: boolean,
            id: string
        },
        message: {
            imageMessage: {
                url: string,
                mimetype: string,
                caption: string,
                fileSha256: string,
                fileLength: string,
                height: number,
                width: number,
                mediaKey: string,
                fileEncSha256: string,
                directPath: string,
                mediaKeyTimestamp: string,
                jpegThumbnail: string
            }
        },
        messageTimestamp: string,
        status: string
        
    }
    const sendImage = async ({jid, url, caption, sessionId}: SendImageType) => {
        try {
            const response = await nsolucoesApi.post<SendImageResponseType>(`/${sessionId}/messages/send`, {
                jid: jid,
                message: {
                    image: {
                        url: url
                    },
                    caption: caption
                }
            })
            return response.data
        }catch(error: any){
            console.log(error)
            return false
        }
    }

    type SendAudioType = {
        jid: string,
        url: string,
        sessionId: string
    }

    type SendAudioResponseType = {
        key: {
            remoteJid: string,
            fromMe: boolean,
            id: string
        },
        message: {
            audioMessage: {
                url: string,
                mimetype: string,
                fileSha256: string,
                fileLength: string,
                seconds: number,
                ptt: boolean,
                mediaKey: string,
                fileEncSha256: string,
                directPath: string,
                mediaKeyTimestamp: string
            }
        },
        messageTimestamp: string,
        status: string
    }

    const sendAudio = async ({jid, url, sessionId}: SendAudioType) => {
        try{
            const response = await nsolucoesApi.post<SendAudioResponseType>(`/${sessionId}/messages/send`, {
                jid: jid,
                message: {
                    audio: {
                        url: url
                    }
                }
            })
            return response.data
        }catch(error: any){
            console.log(error)
            return false
        }
    }
    return {sendText, sendImage, sendAudio}
}