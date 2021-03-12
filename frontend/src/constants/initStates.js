

import options from './options';

export const initState_join = { fullname: "", email: "", username: "", role: "", country: [], password: "", confirm_password: "", googleAuth: false }
export const initState_messenger = [{ _id: "", members: [], messages: [{ content: "", sender: "", createdAt: new Date() }], profileImage: "" }];
export const initState_designer = { skills: [], styles: [], experience: [], education: [] }
export const initState_gigs = { title: "", description: "", styles: [], category: "", price: 0, fabrics: [], delivery: 0 };
export const initState_search = { style: options.style, category: options.category, garment: options.garment, min: 0, max: 1000, worldwide: true }

export const initState_item = { title: "", description: "", service: [], category: [], garment: [], style: [], occasion: [], keywords: [] }


