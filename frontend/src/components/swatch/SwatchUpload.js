import React, { useEffect } from 'react';
import { Image, Container, Form } from "react-bootstrap";
import { useToggle } from '../../custom_hooks/useToggle';
import CustomButton from '../../layout/button/CustomButton';
import useUpload from '../../custom_hooks/useUpload';
import BoxWrapper from '../../layout/BoxWrapper';
import FormGroup from '../inputs/FormGroup';

const SwatchUpload = ({ existing_img, handleUpload, handleDeleteImg }) => {
    console.log(existing_img)
    const [saved, setSaved] = useToggle(false);
    const { files, clearUpload, getRootProps, getInputProps, uploadError } = useUpload(3000000, 5);

    useEffect(() => {
        if (files) handleUpload(files[0])
    }, [files])

    return (
        <FormGroup label={`${existing_img ? "image" : "upload"}`} input_component={
            <>
                <div className="error">{uploadError}</div>
                {existing_img ?
                    <div className="item-upload-wrapper">
                        <Image src={existing_img} className="swatchUpload__img" />
                        <CustomButton onClick={handleDeleteImg} btn_class="btn-icon-text red fas fa-times" />
                    </div>
                    :
                    <>

                        <div {...getRootProps()} className="item-upload-wrapper">
                            <input {...getInputProps({ className: 'dropzone' })} multiple={false} />
                            {files && files[0] ?
                                < div className="item-upload-wrapper">
                                    <Image src={URL.createObjectURL(files[0])} className="swatchUpload__img" />
                                    <CustomButton
                                        btn_class="fas fa-times btn-icon-text red"
                                        onClick={() => clearUpload(0)} />
                                </div>
                                :
                                <Image
                                    title="click to upload"
                                    src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/upload-icon_eqsr6c.svg"
                                    className="itemUpload__icon" alt="icon upload" />
                            }

                        </div>
                    </>
                }
            </>
        } />
    )
}

export default SwatchUpload
