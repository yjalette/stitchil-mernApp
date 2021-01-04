import React from 'react';
import { Image } from "react-bootstrap";

import InlineAlert from "../alerts/InlineAlert";

const FileUpload = ({ file, prevFile, upload_class, getRootProps, getInputProps, buttons, multiple }) => {
    return (
        <div className={`upload__wrapper ${upload_class}__wrapper`}>
            <Image className={upload_class} src={file ? URL.createObjectURL(file) : prevFile} alt="file" />
            {!buttons ? <div {...getRootProps()} className={`upload__wrapper ${upload_class}__box`}>
                <input {...getInputProps({ className: 'dropzone' })} multiple={multiple ? true : false} />
                <Image src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/upload-icon_eqsr6c.svg" className="upload__icon" alt="icon upload" />
            </div> : buttons}
            {/* {isDragReject && <InlineAlert variant="warning" content="File type not accepted, sorry!" />}
            {isFileTooLarge && <InlineAlert variant="warning" content="File is too large" />} */}
        </div>
    )
}

export default FileUpload
