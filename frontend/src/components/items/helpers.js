import { isObjEmpty } from '../../helpers/formHelper';

export const initState = {
    portfolio: { title: "", description: "", keywords: [] },
    gigs: { title: "", description: "", keywords: [], category: [], styles: [], price: 0, fabrics: [], delivery: 0 }
}

export const transformInputs = {
    gigs: (inputs) => {
        if (inputs.price) inputs.price = parseInt(inputs.price);
        if (inputs.delivery) inputs.delivery = parseInt(inputs.delivery);
        if (inputs.keywords && inputs.keywords.length !== 0) inputs.keywords = inputs.keywords.map(elem => elem.keywords || elem)
        return { ...inputs, __typename: undefined, createdAt: undefined, updateAt: undefined }
    },
    portfolio: (inputs) => {
        if (inputs.keywords && inputs.keywords.length !== 0) inputs.keywords = inputs.keywords.map(elem => elem.keywords || elem)
        return { ...inputs, __typename: undefined, createdAt: undefined, updateAt: undefined, likes: undefined }
    }
}

export const validate = (inputs) => {
    return Object.keys(inputs).filter(k => {
        if (k === "description" || k === "keywords") return null
        return isObjEmpty({ [k]: inputs[k] })
    });
}


export const multiInput_props = (label, inputs, onChange) => ({
    label,
    selected: inputs[label],
    onChange,
    allowNew: label === "keywords",
    multiple: label !== "category",
    required: label !== "keywords"
})

export const singleInput_props = (label, inputs, onChange) => ({
    label,
    value: inputs[label],
    type: Number.isInteger(inputs[label]) && "number",
    onChange,
    required: true
})

export const descriptionInput_props = (label, inputs, onChange) => ({
    label,
    value: inputs[label],
    onChange,
    maxLength: 100,
    rows: 3
})






