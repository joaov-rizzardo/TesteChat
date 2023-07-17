import Separator from "../components/Separator"
import ContactsModal from "../components/ContactsModal"
import { useState, useContext, useEffect, useRef } from "react"
import { ContactContext } from "../contexts/ContactContext"
import Header from "../components/Header"
import AsideMessages from "../components/AsideMessages"
import ContactMessages from "../components/ContactMessages"
import ImagePreview from "../components/ImagePreview"
import SendMessageBar from "../components/SendMessageBar"

export default function MainPage() {
  const [openedModal, setOpenedModal] = useState<boolean>(false)
  const { loadContacts, contacts } = useContext(ContactContext)
  const [selectedContactId, setSelectedContactId] = useState<string>('')
  const imageInputRef = useRef<HTMLInputElement | null>(null)

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const selectedContact = contacts.find(contact => contact._id === selectedContactId)

  useEffect(() => {
    loadContacts()
  }, [])

  function openModal() {
    setOpenedModal(true)
  }

  function closeModal() {
    setOpenedModal(false)
  }

  function openImageSelector() {
    imageInputRef.current?.click()
  }

  function clearFileSelection() {
    setSelectedImage(null)
    setImagePreview(null)
    if (imageInputRef.current !== null) {
      imageInputRef.current.value = ""
      imageInputRef.current.files = null
      const changeEvent = new Event('change')
      imageInputRef.current.dispatchEvent(changeEvent)
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      {openedModal && <ContactsModal closeFunction={closeModal} />}

      <Header.Container>
        <Header.Messages openModal={openModal} />
        <Separator type="y" />
        <Header.Contact selectedContact={selectedContact} />
      </Header.Container>

      <div className="flex-1 flex overflow-y-hidden">
        <AsideMessages contacts={contacts} setSelectedContactId={setSelectedContactId} />
        <Separator type="y" />
        <main className="flex flex-col flex-1 bg-gray-800 overflow-y-hidden">
          <ContactMessages selectedContact={selectedContact} />
          {imagePreview !== null && <ImagePreview imagePreview={imagePreview} clearFileSelection={clearFileSelection} />}
          {selectedContact !== undefined && (
            <SendMessageBar.Container>
              <SendMessageBar.FileInput
                imageInputRef={imageInputRef}
                setImagePreview={setImagePreview}
                setSelectedImage={setSelectedImage}
              />
              <SendMessageBar.MessageBar
                clearFileSelection={clearFileSelection}
                openImageSelector={openImageSelector}
                selectedContact={selectedContact}
                selectedImage={selectedImage}
              />
            </SendMessageBar.Container>
          )}

        </main>
      </div>
    </div>
  )
}