import { useState } from "react";
import { useDropzone } from "react-dropzone";

const useUpload = (maxSize) => {
    const [file, setFile] = useState(null);
    const { getRootProps, getInputProps, isDragReject, rejectedFiles } = useDropzone({
        accept: 'image/*',
        maxSize,
        onDrop: acceptedFiles => setFile(acceptedFiles[0])
    });

    const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

    const handleClear = () => setFile(null)

    return {
        file,
        setFile,
        onUpload: (acceptedFile) => setFile(acceptedFile),
        getInputProps,
        getRootProps,
        isFileTooLarge,
        clearUpload: handleClear
    }
}

export default useUpload
