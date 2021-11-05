import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const useUpload = (maxSize, maxFiles) => {
    const [files, setFiles] = useState(null);
    const [uploadError, setUploadError] = useState("")
    const {
        getRootProps,
        getInputProps,
        isDragReject,
        rejectedFiles,
        isDragActive,
        isDragAccept } = useDropzone({
            accept: 'image/*',
            maxSize: maxSize || 5242880,
            onDragEnter: param => {
                return console.log(param)
            },
            onDragOver: param => {
                return console.log(param)
            },
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

    const dragCont = <div className="drag">
        <div
            {...getRootProps({
                className: `dropzone
    ${isDragAccept && 'dropzoneAccept'}
    ${isDragReject && 'dropzoneReject'}`,
            })}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
        <button>Import</button>
    </div>

    return {
        dragCont,
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
