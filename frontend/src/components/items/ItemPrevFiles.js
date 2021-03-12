import React from 'react'
import { Image } from 'react-bootstrap';
import CustomButton from '../../layout/button/CustomButton';

const ItemPrevFiles = ({ inputs, onCoverChange, onGalleryChange }) => {
    return (
        <>
            {inputs.gallery && inputs.gallery.map((item, index) => {
                return (
                    <div key={index} className={`${item === inputs.coverImage && "item-cover"} item-upload-wrapper`}>
                        <Image className="itemUpload__img itemUpdate-prevImg" src={item} alt="file" />
                        <CustomButton
                            btn_class="btn-text itemUpdate__overlay-btn"
                            btn_otherProps={{
                                title: item !== inputs.coverImage ? "set as a cover" : "",
                                name: "coverImage",
                                value: item,
                                disabled: item === inputs.coverImage
                            }}
                            onClick={onCoverChange}>cover</CustomButton>
                        {item !== inputs.coverImage && <CustomButton
                            btn_class="fas fa-times btn-icon-text btn-red pt-1"
                            onClick={() => onGalleryChange(index)} />}
                    </div>
                )
            })}
        </>
    )
}

export default ItemPrevFiles
