
export const initState = {
    "portfolio": { title: "", description: "" },
    "gigs": { title: "", description: "", category: [], style: [], price: 0, fabric: [], delivery: 0, keywords: [] }
}

export const transformInputs = inputs => {
    if (inputs.price) inputs.price = parseInt(inputs.price);
    if (inputs.delivery) inputs.delivery = parseInt(inputs.delivery);
    // if (inputs.keywords) inputs.keywords = inputs.keywords.keywords;
    if (inputs.keywords) inputs.keywords = inputs.keywords.map(elem => elem.keywords || elem)

    return { ...inputs, __typename: undefined, createdAt: undefined, updateAt: undefined }
}




