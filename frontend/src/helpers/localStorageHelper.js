export const updateLocalStorage = (objName, update) => {
    const obj = JSON.parse(localStorage.getItem(objName));
    localStorage.setItem(objName, JSON.stringify({ ...obj, ...update }));
}