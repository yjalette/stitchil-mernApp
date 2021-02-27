import { getNames } from "country-list";
import languages from './languages'

export default {
    skills: ["sketching", "sewing", "altering", "knitting", "crocheting"],
    specialties: ["eveningwear", "casual", "streetwear", "professional", "childrenswear", "costume", "bridal", "uniform"],
    experience: ["newbie", "beginner", "novice", "intermediate", "advanced", "expert"],
    fabrics: ["wool", "cotton", "denim", "silk", "linen", "leather", "polyester", "viscose", "crepe", "jersey", "chiffon"],
    styles: ["eveningwear", "casual", "streetwear", "professional", "childrenswear", "costume", "bridal", "uniform", "petwear"],
    category: ["dresses", "suits", "shirts", "pants", "tops", "sweaters", "jackets", "skirts"],
    price: { min: Array.from(Array(10).keys(), x => x * 50), max: Array.from(Array(10).keys(), x => x * 50 + 50) },
    country: getNames(),
    languages
}