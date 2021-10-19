import React, { useContext, useState } from 'react'
import { Image } from 'react-bootstrap'
import ListingContext from '../../context/Listing-context'
import { useToggle } from '../../custom_hooks/useToggle'
import CustomButton from '../../layout/button/CustomButton'
import CustomModal from '../../layout/CustomModal'

const VariationOptionImages = ({ imageId, onImageSelect, onImageDelete }) => {
    const { state } = useContext(ListingContext);
    const [value, setValue] = useState("");
    const [open, toggle] = useToggle()

    const handleImageSelect = image => {
        onImageSelect(image._id);
        toggle()
    }

    if (!open && !imageId) return (
        <div className="optionImage__container">
            <CustomButton
                onClick={toggle}
                btn_class="
                btn-icon 
                fas fa-link
                position-center
                " />
        </div>
    )

    if (!open && imageId) return (
        <div className="optionImage__container">
            <CustomButton
                onClick={onImageDelete}
                btn_class="
                btn-icon 
                fas fa-trash
                red
                position-center
                " />
            <div>
                <Image src={
                    state.gallery
                        .find(image => image._id === imageId).url}
                    className="thumb"
                />
            </div>
        </div>
    )

    return (
        <>
            <CustomModal
                modal_size="sm"
                modal_title="gallery"
                displayWithoutBtn
            >
                <div className="optionImage__gallery">
                    {state.gallery.map(image => <Image
                        key={image._id}
                        onClick={() => handleImageSelect(image)}
                        src={image.url}
                        className="thumb" />)}
                </div>
            </CustomModal>
        </>
    )
}

export default VariationOptionImages
