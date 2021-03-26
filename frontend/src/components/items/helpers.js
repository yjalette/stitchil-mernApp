import options from '../../constants/options';
import { isObjEmpty } from '../../helpers/formHelper';

// const variants = {
//     "sewing": ["style", "category", "ocassion"],
//     "altering": ["style", "category", "ocassion"],
//     "knitting": ["style", "category", "ocassion"],
//     "crocheting": ["style", "category", "ocassion"],
// }

export const transformInputs = (inputs) => {
    if (inputs.keywords && inputs.keywords.length !== 0) inputs.keywords = inputs.keywords.map(elem => elem.keywords || elem)
    return {
        ...inputs,
        __typename: undefined,
        coverImage: undefined,
        gallery: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        likes: undefined
    }
}

export const validate = (inputs) => {
    return Object.keys(inputs).filter(k => {
        if (["description", "keywords", "group"].includes(k)) return null
        return isObjEmpty({ [k]: inputs[k] })
    });
}


export const input_props = (label, value, onChange) => ({
    name: label,
    value,
    onChange,
    required: label !== "description" && label !== "keywords"
})









