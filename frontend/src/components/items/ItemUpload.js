import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Image, Container } from "react-bootstrap";
import { useParams } from 'react-router';
import { useToggle } from '../../custom_hooks/useToggle';
import mutations from './graphql/mutations';
import PictureZoom from '../pictures/PictureZoom';
import CustomButton from '../../layout/button/CustomButton';
import useUpload from '../../custom_hooks/useUpload';
import ItemFormNextStep from './ItemFormNextStep';
import ActionStatus from '../notification/ActionStatus';

const ItemUpload = ({ action, gallery, children, group }) => {
    const { itemId } = useParams();
    const [saved, setSaved] = useToggle(false);
    const { files, clearUpload, getRootProps, getInputProps, uploadError } = useUpload(3000000, 5);
    const newFiles_qty = files ? files.length : 0;
    const existingFiles_qty = gallery ? gallery.length : 0;
    const overLimit = newFiles_qty + existingFiles_qty > 5;
    const [post, { error }] = useMutation(mutations[`${action}_gallery`.toUpperCase()], {
        onCompleted: async (data) => {
            if (data) setSaved(true)
        }
    })
    const handleSave = () => {
        post({
            variables: {
                itemId,
                files,
                gallery
            }
        })
    }
    return (
        <>
            <Container>
                {saved && <ActionStatus status="success" />}
                {error && <ActionStatus status="error" />}
            </Container>
            <Container>
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
                        {<div {...getRootProps()} className="item-upload-wrapper">
                            <input {...getInputProps({ className: 'dropzone' })} multiple={true} />
                            <Image
                                title="click to upload"
                                src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/upload-icon_eqsr6c.svg"
                                className="itemUpload__icon" alt="icon upload" />
                            <span className={`${overLimit ? "error" : "text-muted"} ml-2`}>max 5 uploads</span>
                        </div>}
                    </div>
                    <CustomButton
                        btn_class="btn-form float-right"
                        onClick={handleSave}
                    >save </CustomButton>
                </div>
                {saved && <ItemFormNextStep group={group} />}
            </Container>
        </>
    )
}

export default ItemUpload
