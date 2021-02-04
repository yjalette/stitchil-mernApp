export const highlights = (item, section) => {
    if (section === "gigs") return [
        { field: "fabric choices: ", content: item.fabrics },
        { field: "price starts at: ", content: `$${item.price}` }
    ]
    if (section === "portfolio") return [
        { field: "title", content: item.title },
        { icon: "fa fa-thumbs-up", content: 5 }
    ]

}

export const initState = {
    portfolio: { title: "", description: "", keywords: [] },
    gigs: { title: "", description: "", keywords: [], category: [], styles: [], price: 0, fabrics: [], delivery: 0 }
}

export const transformInputs = inputs => {
    if (inputs.price) inputs.price = parseInt(inputs.price);
    if (inputs.delivery) inputs.delivery = parseInt(inputs.delivery);
    if (inputs.keywords && inputs.keywords.length !== 0) inputs.keywords = inputs.keywords.map(elem => elem.keywords || elem)
    return { ...inputs, __typename: undefined, coverImage: undefined, createdAt: undefined, updateAt: undefined, likes: undefined }
}

