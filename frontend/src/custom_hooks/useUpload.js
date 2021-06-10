import { useState } from "react";
import { useDropzone } from "react-dropzone";

const useUpload = (maxSize, maxFiles) => {
    const [files, setFiles] = useState(null);
    const [uploadError, setUploadError] = useState("")
    const { getRootProps, getInputProps, isDragReject, rejectedFiles } = useDropzone({
        accept: 'image/*',
        maxSize: maxSize || 5242880,
        onDrop: acceptedFiles => {
            if (maxFiles && acceptedFiles.length > maxFiles) return setUploadError(`maximum ${maxFiles} uploads`)
            if (rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize) return setUploadError(`max upload size is ${maxSize} bytes: ${rejectedFiles.map(file => file.name).join(", ")}`)
            if (rejectedFiles.length === 0) {
                setFiles(!maxFiles || !files ? acceptedFiles : [
                    ...files,
                    ...acceptedFiles
                ])
                setUploadError("")
            }
        }
    });

    return {
        files,
        setFiles,
        onUpload: (acceptedFile) => setFiles(acceptedFile),
        getInputProps,
        getRootProps,
        uploadError,
        isFileTooLarge: maxSize && rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize,
        clearUpload: (index) => {
            if (index === undefined) setFiles(null)
            else setFiles(files.filter((file, i) => index !== i))
        }
    }
}

export default useUpload
