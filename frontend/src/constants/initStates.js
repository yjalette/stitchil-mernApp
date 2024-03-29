

import options from './options';

export const initState_join = { fullname: "", email: "", username: "", role: "", country: [], password: "", confirm_password: "", googleAuth: false }
export const initState_messenger = [{ _id: "", members: [], messages: [{ content: "", sender: "", createdAt: new Date() }], profileImage: "" }];
export const initState_designer = { skills: [], styles: [], experience: [], education: [] }
export const initState_gigs = { title: "", description: "", styles: [], category: "", price: 0, fabrices: [], delivery: 0 };
export const initState_search = {
    style: options.style,
    category: options.category,
    min: Array.from(Array(10).keys(), x => x * 50),
    max: Array.from(Array(10).keys(), x => x * 50 + 50),
    worldwide: true
}
export const initState_item = { title: "", service: [], category: [], productType: [], style: [], description: "" }
export const initState_gig = { price: 0, delivery: 0 };
export const initState_product = { title: "", description: "", implementation: "sewing", category: [], productType: "" }
// export const initState_item_description = { description: "", keywords: [] }
export const initState_item_options = { title: "", service: [], category: [], productType: [], style: [] }
export const initState_overview = {
    "gig": { title: "", description: "", implementation: "", category: [], productType: [] },
    "product": { title: "", description: "", category: [], productType: [] }
}

// export const initState_overview_new = {
//     "gigs": { title: "", service: [], category: [], productType: [], style: [], description: "" },
//     "portfolio": { title: "", category: [], productType: [], description: "" }
// }

export const initState_package = { type: "", fabrics: [], price: 0, delivery: 0, description: "" };
export const initState_fabric = { name: "", color: "", image: "", content: "" };
export const initState_swatch = { name: "", color: "", image: "", content: "" };
export const initState_shipping = { shippingCarrier: "", shippingPrice: 0, mailClass: "", freeShipping: false };
export const initState_variation = { variationName: "", options: [] }
export const initState_option = { imageId: "", name: "", note: "", priceIncrease: 0 }

export const initState_location = {
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: 0
}

export const initState_address = {
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zip: 0
}