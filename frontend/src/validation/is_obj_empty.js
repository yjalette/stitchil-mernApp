export function isNotEmpty(obj) {
    const result = Object.values(obj);
    return result.find(value => value !== undefined) ? true : false
}