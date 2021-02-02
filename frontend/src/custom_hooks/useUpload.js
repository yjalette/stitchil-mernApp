import { useState } from "react";
import { useDropzone } from "react-dropzone";

const useUpload = (maxSize, maxFiles) => {
    const [files, setFiles] = useState(null);
    const { getRootProps, getInputProps, isDragReject, rejectedFiles } = useDropzone({
        accept: 'image/*',
        maxSize,
        onDrop: acceptedFiles => {
            if (maxFiles && acceptedFiles.length > maxFiles) return console.log("too many")

            else console.log(files) || setFiles(!maxFiles || !files ? acceptedFiles : [
                ...files,
                ...acceptedFiles
            ])
        }
    });

    return {
        files,
        setFiles,
        onUpload: (acceptedFile) => setFiles(acceptedFile),
        getInputProps,
        getRootProps,
        isFileTooLarge: maxSize && rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize,
        clearUpload: (index) => {
            if (!index) setFiles(null)
            else setFiles(files.filter((file, i) => index !== i))
        }
    }
}

export default useUpload
