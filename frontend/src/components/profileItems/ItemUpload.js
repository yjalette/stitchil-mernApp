import React from 'react';
import { Image } from "react-bootstrap";
import ImageZoom from '../../layout/media/ImageZoom';

// import InlineAlert from "../alerts/InlineAlert";

const ItemUpload = ({ file, prevFile, clearUpload, getRootProps, getInputProps }) => {

    if (file) {
        return (
            <div className="itemFile__wrapper flex-center flex-column">
                <ImageZoom img_class="itemUpload__img" img_src={URL.createObjectURL(file)} />
                <i className="fa fa-close itemFile__cancel" onClick={clearUpload} />
            </div>
        )
    }

    return (
        <div {...getRootProps()} className="upload__wrapper itemUpload__wrapper">
            {prevFile && <Image className="itemUpload__img itemUpload__prev" src={prevFile} alt="file" />}
            <div className="upload__box flex-center">
                <input {...getInputProps({ className: 'dropzone' })} multiple={false} />
                <Image src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/upload-icon_eqsr6c.svg" className="upload__icon" alt="icon upload" />
            </div>
            {/* {isDragReject && <InlineAlert variant="warning" content="File type not accepted, sorry!" />}
            {isFileTooLarge && <InlineAlert variant="warning" content="File is too large" />} */}
        </div>
    )
}

export default ItemUpload
