
export const getLocalLang = cacheKey => {
    let langJson = localStorage.getItem(cacheKey);
    return langJson && JSON.parse(langJson)
}

export const setLocalLang = (cacheKey, data) => {
    if (data) {
        localStorage.setItem(cacheKey, JSON.stringify(data));
    }
}