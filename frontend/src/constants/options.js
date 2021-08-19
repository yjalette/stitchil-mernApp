import { getNames } from "country-list";
import languages from './languages'
import state_list from "./states.json"


export default {
    skills: ["sketching", "sewing", "knitting", "crocheting"],
    specialties: ["eveningwear", "casual", "streetwear", "professional", "childrenswear", "costume", "bridal", "uniform"],
    experience: ["newbie", "beginner", "novice", "intermediate", "advanced", "expert"],
    style: ["classic", "casual", "artsy", "professional", "sporty", "grunge", "bohemian"],
    // category: ["dresses", "suits", "shirts", "pants", "tops", "sweaters", "jackets", "skirts"],
    category: ["eveningwear", "childrenswear", "streetwear", "costume", "bridal", "petwear"],
    garment: ["dress", "suit", "shirt", "pants", "top", "sweater", "jacket", "skirt", "accessories"],
    service: ["sewing", "knitting", "crocheting"],
    occasion: ["evening", "outdoor", "vacation", "work", "wedding", "everyday"],
    price: { min: Array.from(Array(10).keys(), x => x * 50), max: Array.from(Array(10).keys(), x => x * 50 + 50) },
    color: ["white", "gray", "blue", "green", "red", "orange", "violet", "indigo", "yellow ", "black", "blend"],
    pattern: [
        "brocade",
        "checkered",
        "chevron",
        "chinoiserie",
        "chintz",
        "damask",
        "ditsy",
        "polka dot"
    ],
    fabric: ["wool", "cotton", "denim", "silk", "linen", "leather", "polyester", "viscose", "crepe", "jersey", "chiffon", "blend"],
    country: getNames(),
    state: state_list,
    languages
}


