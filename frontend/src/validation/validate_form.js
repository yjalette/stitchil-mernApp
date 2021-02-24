export const patterns = {
    telephone: { reg: /^\d{10}$/, msg: "please enter valid telephone number" },
    username: { reg: /^[a-z\d]{5,12}$/i, msg: "please enter valid username" },
    // password: { reg: /^(?=.*\d).{3,8}$/i, msg: "please enter valid password" },
    email: { reg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: "please enter valid email address" }
}


export function validate(obj) {
    if (!patterns[Object.keys(obj)]) return null
    if (Object.keys(obj).length === 1 && !patterns[Object.keys(obj)].reg.test(Object.values(obj))) return { [Object.keys(obj)]: patterns[Object.keys(obj)].msg }
    return null
}
