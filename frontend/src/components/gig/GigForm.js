import React, { useEffect, useState } from 'react'
import useSlides from '../../custom_hooks/useSlides';
import IconButton from '../../layout/buttons/IconButton';

import FormInput from '../inputs/FormInput'
import FormMultipleInput from '../inputs/FormMultipleInput'
import FormTextarea from '../inputs/FormTextarea';

const GigForm = ({ inputs, media, onChange, onMultiChange }) => {
    const [items, setItems] = useState([])
    const { activeIndex, handleBackward, handleForward } = useSlides(0, items)

    useEffect(() => {
        setItems([
            <>
                <FormInput label="title" value={inputs.title} onChange={onChange} />
                <FormMultipleInput label="category" selected={inputs.category} onChange={(value) => onMultiChange("category", value)} />
                <FormMultipleInput label="style" selected={inputs.style} multiple={true} onChange={(value) => onMultiChange("style", value)} />
                <FormMultipleInput label="fabric" multiple={true} selected={inputs.fabric} onChange={(value) => onMultiChange("fabric", value)} />


            </>,
            <>
                <FormInput label="price" value={inputs.price} onChange={onChange} />
                <FormInput label="delivery" value={inputs.delivery} onChange={onChange} />
                <FormTextarea label="description" value={inputs.description} onChange={onChange} />
                <FormMultipleInput label="keywords" multiple={true} selected={inputs.keywords} allowNew={true} onChange={(value) => onMultiChange("keywords", value)} />
                {/* <FormInput tooltip="please seperate keywords with commas" label="keywords" value={inputs.keywords} onChange={onChange} /> */}

            </>,
            <>
                {media}

            </>

        ])

    }, [inputs])


    return (
        <>
            {items[activeIndex] || null}
            <div className="groupButton">
                <IconButton onClick={handleBackward} icon_class="fa fa-arrow-left" />
                <IconButton onClick={handleForward} icon_class="fa fa-arrow-right" />
            </div>
        </>
    )

}



export default GigForm