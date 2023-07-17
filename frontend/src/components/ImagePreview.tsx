import { faClose } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";

interface ImagePreviewProps {
    clearFileSelection: () => void,
    imagePreview: string
}
export default function ImagePreview({clearFileSelection, imagePreview}: ImagePreviewProps) {
    return (
        <div className="h-80 bg-gray-700 p-4 flex flex-col gap-2">
            <div className="flex h-5">
                <IconButton
                    iconProps={{ icon: faClose }}
                    buttonProps={{
                        onClick: clearFileSelection
                    }}
                />
            </div>
            <div className="h-full w-full bg-gray-800 rounded-xl flex justify-center items-center px-2 py-5">
                <img className="max-w-full max-h-full" src={imagePreview} alt="" />
            </div>
        </div>
    )
}