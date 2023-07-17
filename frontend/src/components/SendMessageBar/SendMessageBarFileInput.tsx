interface SendMessageBarFileInputProps {
    imageInputRef: React.MutableRefObject<HTMLInputElement | null>
    setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>
}

export default function SendMessageBarFileInput({imageInputRef, setSelectedImage, setImagePreview}: SendMessageBarFileInputProps) {
    return (
        <input
            type="file"
            className="hidden"
            accept="image/jpeg, image/png"
            ref={imageInputRef}
            onChange={e => {
                if (e.target.files !== null) {
                    const file = e.target.files[0]
                    if (file !== undefined) {
                        setSelectedImage(e.target.files[0])
                        const reader = new FileReader();
                        reader.onload = () => {
                            if (typeof reader.result === 'string') {
                                setImagePreview(reader.result)
                            }

                        }
                        reader.readAsDataURL(file)
                    }
                }
            }}
        />
    )
}