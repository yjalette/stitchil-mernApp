export function isObjEmpty(obj) {
    const result = Object.values(obj);
    return result.find(value => !Array.isArray(value) ? value !== undefined : value.length > 0) ? false : true
}