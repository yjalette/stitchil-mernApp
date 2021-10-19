import React from 'react';
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image, Container } from "react-bootstrap";
import { useParams } from 'react-router';
import { useToggle } from '../../custom_hooks/useToggle';
import mutations from './graphql/mutations';
import PictureZoom from '../pictures/PictureZoom';
import CustomButton from '../../layout/button/CustomButton';
import ActionStatus from '../notification/ActionStatus';

const FileUpload = ({ children, overLimit, onUpload }) => {
    const [files, setFiles] = useState(null);
    const [uploadError, setUploadError] = useState("")
    const { getRootProps, getInputProps, isDragReject, rejectedFiles } = useDropzone({
        accept: 'image/*',
        maxSize: maxSize || 5242880,
        onDrop: acceptedFiles => {
            if (maxFiles && acceptedFiles.length > maxFiles) {
                return setUploadError(`maximum ${maxFiles} uploads`)
            }
            if (rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize) {
                return setUploadError(`max upload size is ${maxSize} bytes: ${rejectedFiles.map(file => file.name).join(", ")}`)
            }
            if (rejectedFiles.length === 0) {
                setFiles(!maxFiles || !files ? acceptedFiles : [
                    ...files,
                    ...acceptedFiles
                ])
                setUploadError("")
            }
        }
    });

    useEffect(() => {
        if (files) onUpload(files)
    }, [files]);

    const [saved, setSaved] = useToggle(false);

    return (
        <>
            <Container>
                {saved && <ActionStatus status="success" />}
                {error && <ActionStatus status="error" />}
            </Container>
            <div className="itemUpload">
                <div className="error">{uploadError}</div>
                <div className="itemUpload__list">
                    {children}
                    {files && files.map((file, index) =>
                        < div key={index} className="item-upload-wrapper">
                            <PictureZoom elem_class="itemUpload__img" url={URL.createObjectURL(file)} />
                            <CustomButton
                                btn_class="fas fa-times btn-icon-text btn-red pt-1"
                                onClick={() => clearUpload(index)} />
                        </div>)}
                    {!overLimit && <div {...getRootProps()} className="item-upload-wrapper">
                        <input {...getInputProps({ className: 'dropzone' })} multiple={true} />
                        <Image
                            title="upload (max 5 images)"
                            src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/upload-icon_eqsr6c.svg"
                            className="itemUpload__icon " alt="icon upload" />
                    </div>}
                </div>
            </div>
        </>
    )
}

export default FileUpload
