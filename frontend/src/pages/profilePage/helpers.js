export const highlights = (item, section) => {
    if (section === "gigs") return [
        { field: "delivery", content: `${item.delivery} days` },
        { field: "price starts at", content: `$${item.price}` }
    ]
    if (section === "portfolio") return [
        { field: "title", content: item.title },
        { icon: "fa fa-thumbs-up", content: 5 }
    ]

}





