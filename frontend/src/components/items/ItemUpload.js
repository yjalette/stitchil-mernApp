import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Image } from "react-bootstrap";
import { useParams } from 'react-router';

import mutations from './graphql/mutations';
import PictureZoom from '../pictures/PictureZoom';
import CustomButton from '../../layout/button/CustomButton';
import useUpload from '../../custom_hooks/useUpload';

const ItemUpload = ({ action, otherVars, children, updateQuery }) => {
    const { itemId } = useParams();
    const { files, clearUpload, getRootProps, getInputProps, uploadError } = useUpload(3000000, 5);
    const [post] = useMutation(mutations[`${action}_gallery`.toUpperCase()], {
        onCompleted: async (data) => {
            await updateQuery(prev => {
                return {
                    gig: {
                        ...prev.gig,
                        item: {
                            ...prev.gig.item,
                            "gallery": data.update_item_gallery
                        }
                    }
                }
            })
        }

    })


    const handleSave = () => {
        post({
            variables: {
                itemId,
                files,
                ...otherVars
            }
        })
    }

    return (
        <div className="itemUpload">
            {/* <span className="formLabel">upload
                <span className="text-muted ml-2">(max 5 uploads)</span>
            </span> */}
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
                <div {...getRootProps()} className="item-upload-wrapper">
                    <input {...getInputProps({ className: 'dropzone' })} multiple={true} />
                    <Image
                        title="click to upload"
                        src="https://res.cloudinary.com/dgxa9gpta/image/upload/v1602093311/Icons/upload-icon_eqsr6c.svg"
                        className="itemUpload__icon" alt="icon upload" />
                    <span className="text-muted ml-2">(max 5 uploads)</span>
                </div>

            </div>
            <CustomButton
                btn_class="btn-form float-right"
                onClick={handleSave}
            >save </CustomButton>
        </div>
    )
}

export default ItemUpload
