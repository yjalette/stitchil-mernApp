import { getNames } from "country-list";
import languages from './languages'

export default {
    skills: ["sketching", "sewing", "altering", "knitting", "crocheting"],
    specialties: ["eveningwear", "casual", "streetwear", "professional", "childrenswear", "costume", "bridal", "uniform"],
    experience: ["newbie", "beginner", "novice", "intermediate", "advanced", "expert"],
    fabrics: ["wool", "cotton", "denim", "silk", "linen", "leather", "polyester", "viscose", "crepe", "jersey", "chiffon"],
    style: ["classic", "casual", "artsy", "professional", "sporty", "grunge", "bohemian"],
    // category: ["dresses", "suits", "shirts", "pants", "tops", "sweaters", "jackets", "skirts"],
    category: ["eveningwear", "childrenswear", "streetwear", "costume", "bridal", "petwear"],
    garment: ["dress", "suit", "shirt", "pants", "top", "sweater", "jacket", "skirt"],
    service: ["sewing", "altering", "knitting", "crocheting"],
    occasion: ["evening", "outdoor", "vacation", "work", "wedding", "everyday"],
    price: { min: Array.from(Array(10).keys(), x => x * 50), max: Array.from(Array(10).keys(), x => x * 50 + 50) },

    country: getNames(),
    languages
}


