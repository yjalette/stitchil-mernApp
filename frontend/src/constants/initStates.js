

import options from './options';

export const initState_join = { fullname: "", email: "", username: "", role: "", country: [], password: "", confirm_password: "", googleAuth: false }
export const initState_messenger = [{ _id: "", members: [], messages: [{ content: "", sender: "", createdAt: new Date() }], profileImage: "" }];
export const initState_designer = { skills: [], styles: [], experience: [], education: [] }
export const initState_gigs = { title: "", description: "", styles: [], category: "", price: 0, fabrics: [], delivery: 0 };
export const initState_search = {
    style: options.style,
    category: options.category,
    garment: options.garment,
    min: Array.from(Array(10).keys(), x => x * 50),
    max: Array.from(Array(10).keys(), x => x * 50 + 50),
    worldwide: true
}

export const initState_item = { title: "", service: [], category: [], garment: [], style: [], description: "", keywords: [] }


export const initState_gig = { price: 0, delivery: 0, variants: true };


export const initState_product = { for_sale: false, price: 0, accepting_offers: false };

export const initState_item_description = { description: "", keywords: [] }
export const initState_item_options = { title: "", service: [], category: [], garment: [], style: [] }

export const initState_overview = {
    "gig": { title: "", service: [], category: [], garment: [], style: [], description: "", keywords: [] },
    "product": { title: "", category: [], garment: [], description: "", keywords: [] }
}

