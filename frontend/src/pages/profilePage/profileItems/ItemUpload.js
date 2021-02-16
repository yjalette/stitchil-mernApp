import React from 'react';
import { Image } from "react-bootstrap";
import PictureZoom from '../../../components/pictures/PictureZoom';

const ItemUpload = ({ files, uploadError, prevFiles, clearUpload, getRootProps, getInputProps }) => {

    return (
        <div className="itemUpload my-auto">
            <span className="error">{uploadError}</span>
            <div className="itemUpload__list">
                {prevFiles}
                {files && files.map((file, index) =>
                    < div key={index} className="itemUpload__wrapper item-upload-wrapper">
                        <PictureZoom elem_class="itemUpload__img" imageUrl={URL.createObjectURL(file)} />
                        <i title="clear upload" className="fa fa-close itemUpload-footer" onClick={() => clearUpload(index)} />
                    </div>)}
                <div {...getRootProps()} className="itemUpload__box item-upload-wrapper">
                    <input {...getInputProps({ className: 'dropzone' })} multiple={true} />
                    <Image
                        title="click to upload"
                        src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/upload-icon_eqsr6c.svg"
                        className="upload__icon" alt="icon upload" />
                </div>

                {/* {isDragReject && <InlineAlert variant="warning" content="File type not accepted, sorry!" />}
            {isFileTooLarge && <InlineAlert variant="warning" content="File is too large" />} */}

            </div>

        </div>
    )
}

export default ItemUpload
