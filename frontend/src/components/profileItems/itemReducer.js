import React from 'react';

import GigDetails from '../gig/GigDetails';
import GigHighlights from '../gig/GigHighlights';
import PortfolioItemDetails from '../portfolio/PortfolioItemDetails';
import PortfolioHighlights from '../portfolio/PortfolioHighlights';
import FormInput from '../inputs/FormInput';
import FormMultipleInput from '../inputs/FormMultipleInput';
import FormTextarea from '../inputs/FormTextarea';


export const itemReducer = (state, action) => {
    console.log(state, action)
    switch (action.type) {
        case "PORTFOLIO": {
            return {
                "highlights": item => <PortfolioHighlights item={item} />,
                "ItemDetailsComp": (item) => <PortfolioItemDetails item={item} />,
                "ItemFormParts": ({ inputs, onChange, media }) => console.log(inputs) || [
                    <>
                        <span className="formLabel"> media upload: </span>
                        { media}
                    </>,
                    <>

                        <FormInput label="title" onChange={onChange} value={inputs.title} />
                        <FormTextarea label="description" onChange={onChange} value={inputs.description} />

                    </>
                ]
            }
        }
        case "GIGS": {
            return {
                "highlights": item => <GigHighlights item={item} />,
                "ItemDetailsComp": (item, index) => <GigDetails item={item} index={index} />,
                "ItemFormParts": ({ inputs, onChange, onMultiChange, media }) => [
                    <>
                        <span className="formLabel">media upload: </span>
                        { media}
                    </>,
                    <>
                        <FormInput label="title" value={inputs.title} onChange={onChange} />
                        <FormMultipleInput label="category" selected={inputs.category} onChange={(value) => onMultiChange("category", value)} />
                        <FormMultipleInput label="style" selected={inputs.style} multiple={true} onChange={(value) => onMultiChange("style", value)} />
                        <FormMultipleInput label="fabric" multiple={true} selected={inputs.fabric} onChange={(value) => onMultiChange("fabric", value)} />
                    </>,
                    <>
                        <FormInput label="price" value={inputs.price} onChange={onChange} />
                        <FormInput label="delivery" value={inputs.delivery} onChange={onChange} />
                        <FormTextarea label="description" onChange={onChange} value={inputs.description} />
                        <FormMultipleInput label="keywords" multiple={true} selected={inputs.keywords} allowNew={true} onChange={(value) => onMultiChange("keywords", value)} />

                        {/* <FormInput tooltip="please seperate keywords with commas" label="keywords" value={inputs.keywords} onChange={onChange} /> */}

                    </>

                ]
            }
        }


        default: return
    }
}