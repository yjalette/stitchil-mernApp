export const patterns = {
    telephone: { reg: /^\d{10}$/, msg: "please enter valid telephone number" },
    username: { reg: /^[a-z\d]{5,12}$/i, msg: "please enter valid username" },
    password: { reg: /^(?=.*\d).{3,8}$/i, msg: "please enter valid password" },
    email: { reg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: "please enter valid email address" }
}


export function validate(name, value) {
    const rule = patterns[name]
    if (!rule) return null
    if (!rule.reg.test(value)) {
        return { [name]: rule.msg }
    }
}
