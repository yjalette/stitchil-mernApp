export const validateStep = (step, values) => {
    console.log(step, values)
    if (!values.gallery || values.gallery.length < 1) {

        return false
    }
    if (step === "shipping" &&
        (!values.shipping_options || values.shipping_options.length < 10)) {
        return false
    }
    return true
}