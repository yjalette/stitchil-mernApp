import React from 'react';
import { Image } from "react-bootstrap";
import PictureZoom from '../../components/pictures/PictureZoom';
import CustomButton from '../../layout/button/CustomButton';

const ItemUpload = ({ files, uploadError, prevFiles, clearUpload, getRootProps, getInputProps }) => {

    return (
        <div className="itemUpload field-wrapper my-auto">
            <span className="formLabel">upload*
                <span className="text-muted ml-2">(max 5 uploads)</span>
            </span>
            <div className="error">{uploadError}</div>
            <div className="itemUpload__list">
                {prevFiles}
                {files && files.map((file, index) =>
                    < div key={index} className="itemUpload__wrapper item-upload-wrapper">
                        <PictureZoom elem_class="itemUpload__img" imageUrl={URL.createObjectURL(file)} />
                        <CustomButton
                            btn_class="fas fa-times btn-icon-text btn-red pt-1"
                            onClick={() => clearUpload(index)} />

                    </div>)}
                <div {...getRootProps()} className="itemUpload__box item-upload-wrapper">
                    <input {...getInputProps({ className: 'dropzone' })} multiple={true} />
                    <Image
                        title="click to upload"
                        src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/upload-icon_eqsr6c.svg"
                        className="upload__icon" alt="icon upload" />
                </div>

            </div>

        </div>
    )
}

export default ItemUpload
