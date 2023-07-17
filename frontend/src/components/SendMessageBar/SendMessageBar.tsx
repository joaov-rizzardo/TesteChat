import { faImages, faMicrophone, faPaperPlane, faStop } from "@fortawesome/free-solid-svg-icons"
import IconButton from "../IconButton"
import { useContext, useEffect, useState } from "react"
import useMicrophone from "../../hooks/useMicrophone"
import { Context } from "../../contexts/SessionContext"
import { backendApi } from "../../services/api"
import { ContactType } from "../../hooks/useContact"
import { ContactContext } from "../../contexts/ContactContext"
import useMessageApi from "../../hooks/useMessageApi"

interface SendMessageBarProps {
    selectedContact: ContactType | undefined,
    selectedImage: File | null
    clearFileSelection: () => void
    openImageSelector: () => void
}
export default function SendMessageBar({ selectedContact, selectedImage, clearFileSelection, openImageSelector }: SendMessageBarProps) {
    const [messageText, setMessageText] = useState<string>('')
    const [loadingMessage, setLoadingMessage] = useState<boolean>(false)
    const { jid, sessionId } = useContext(Context)
    const { sendImage, sendText, sendAudio } = useMessageApi()
    const { sendMessage } = useContext(ContactContext)
    const { initRecorder, startRecording, stopRecording, audioChunks, recording } = useMicrophone()

    useEffect(() => {
        initRecorder()
    }, [])

    async function startRecordingAudio() {
        await startRecording()
    }

    async function stopRecordingAudio() {
        try {
            setLoadingMessage(true)
            if (jid === undefined || sessionId === undefined) {
                throw new Error('An session error ocurred')
            }
            await stopRecording()
            const chunks = audioChunks.current
            const audioBlob = new Blob(chunks, { type: 'audio/webm' })
            const sentAudio = await uploadAudio(audioBlob)
            if (sentAudio === false) {
                throw new Error('An error ocurred when upload audio')
            }
            const apiAudio = await sendAudio({
              jid: jid,
              sessionId: sessionId.current,
              // ARQUIVO ESTÁTICO UTILIZADO NOS TESTES POR ESTAR EM AMBIENTE LOCAL
              url: 'https://cdn.freesound.org/previews/696/696291_4501195-lq.mp3' //`${import.meta.env.VITE_APP_BACKEND_API}/upload/${sentAudio.filename}`
            })
            if(apiAudio === false){
              throw new Error('An error ocurred when sent audio to api')
            }
             await sendMessage({
                contactId: selectedContact!._id,
                type: 'file',
                content: sentAudio.filename
            })
        } catch (error: any) {
            alert('Ocorreu um erro ao enviar o audio')
            console.log(error)
        }finally {
            setLoadingMessage(false)
        }
    }

    async function handleSendMessage() {
        if (selectedContact === undefined) {
            return false
        }
        if (jid === undefined || sessionId === undefined) {
            return false
        }
        try {
            setLoadingMessage(true)
            if (selectedImage !== null) {
                const sentImage = await uploadImage(selectedImage)
                if (sentImage === false) {
                    throw new Error('An error ocurred when upload file')
                }
                const apiMessage = await sendImage({
                  jid: jid,
                  sessionId: sessionId.current,
                  // ARQUIVO ESTÁTICO UTILIZADO POR ESTAR EM AMBIENTE LOCAL
                  url: 'https://img.freepik.com/psd-gratuitas/icone-do-whatsapp-isolado-ilustracao-de-renderizacao-3d_47987-9785.jpg',//`${import.meta.env.VITE_APP_BACKEND_API}/upload/${sentImage.filename}`,
                  caption: messageText
                })
                if(apiMessage === false){
                  throw new Error('An error ocurred when send image to API')
                }
                const sentMessage = await sendMessage({
                    contactId: selectedContact._id,
                    type: 'text',
                    content: messageText,
                    image: sentImage.filename
                })
                if (sentMessage === false) {
                    throw new Error('An error ocurred whe send image to server')
                }
            } else {
                const apiMessage = await sendText({
                    jid: jid,
                    sessionId: sessionId.current,
                    message: messageText
                })
                if (apiMessage === false) {
                    throw new Error('An error ocurred when send image to API')
                }
                const sentMessage = await sendMessage({
                    contactId: selectedContact._id,
                    type: 'text',
                    content: messageText
                })
                if (sentMessage === false) {
                    throw new Error('An error ocurred when send image to server')
                }
            }
            setMessageText('')
            clearFileSelection()
        } catch (error: any) {
            console.log(error)
            alert('Ocorreu um erro ao realizar o envio da mensagem')
        } finally {
            setLoadingMessage(false)
        }
    }

    type UploadFileResponseType = {
        fieldname: string,
        originalname: string,
        encoding: string,
        mimetype: string,
        destination: string,
        filename: string,
        path: string,
        size: number
    }

    async function uploadImage(image: File) {
        try {
            const formData = new FormData()
            formData.append('file', image)
            const response = await backendApi.post<UploadFileResponseType>('/upload', formData)
            return response.data
        } catch (error: any) {
            console.log(error)
            return false
        }
    }

    async function uploadAudio(audio: Blob) {
        try {
            const formData = new FormData()
            formData.append('file', audio, 'recording.webm');
            const response = await backendApi.post<UploadFileResponseType>('/upload', formData)
            return response.data
        } catch (error: any) {
            console.log(error)
            return false
        }
    }
    return (
        <>
            <IconButton
                iconProps={{ icon: faImages }}
                buttonProps={{
                    onClick: openImageSelector
                }}
            />
            <input
                type="text"
                className="px-3 flex-1 border-none bg-gray-600 outline-none w-full h-full rounded-xl text-gray-300"
                placeholder="Mensagem"
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleSendMessage()
                    }
                }}
            />
            {
                loadingMessage ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-600"></div>
                    </div>
                ) :
                    messageText === '' && selectedImage === null ?
                        <IconButton
                            iconProps={{ icon: recording ? faStop : faMicrophone }}
                            buttonProps={{
                                onMouseDown: startRecordingAudio,
                                onMouseUp: stopRecordingAudio
                            }}
                        />
                        : <IconButton
                            iconProps={{ icon: faPaperPlane }}
                            buttonProps={{
                                onClick: handleSendMessage
                            }}
                        />
            }
        </>
    )
}