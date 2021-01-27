export const highlights = (item, section) => {
    if (section === "gigs") return [
        { field: "fabric", content: item.fabric },
        { field: "price starts at: ", content: `$${item.price}` }
    ]
    if (section === "portfolio") return [
        { field: "title", content: item.title },
        { icon: "fa fa-thumbs-up", content: 5 }
    ]

}

export const initState = {
    portfolio: { title: "", description: "" },
    gigs: { title: "", description: "", category: [], styles: [], price: 0, fabric: [], delivery: 0, keywords: [] }
}

export const transformInputs = inputs => {
    if (inputs.price) inputs.price = parseInt(inputs.price);
    if (inputs.delivery) inputs.delivery = parseInt(inputs.delivery);
    if (inputs.keywords) inputs.keywords = inputs.keywords.map(elem => elem.keywords || elem)
    return { ...inputs, __typename: undefined, createdAt: undefined, updateAt: undefined }
}

