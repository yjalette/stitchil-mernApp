export const highlights = (item, section) => {
    if (section === "gigs") return [
        { field: "category", content: item.category },
        { field: "style", content: item.style }
    ]
    if (section === "portfolio") return [
        { field: "title", content: item.title },
        { icon: "fa fa-thumbs-up", content: 5 }
    ]

}





