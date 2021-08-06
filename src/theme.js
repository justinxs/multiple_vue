const themeID = 'theme-style'
const themesMap = {
    mallwin: '3000',
    maxlive: '4000'
}
const STATIC_THEME = process.env.THEME || 'mallwin'
const STATIC_SERVICE_ID = themesMap[STATIC_THEME] || '3000'
const fromId = serviceId => {
    return Object.keys(themesMap).filter(t => themesMap[t] == serviceId)[0]
}
const fromTheme = theme => {
    return themesMap[theme]
}


const once = (target, event, cb) => {
    const callback = e => {
        target.removeEventListener(event, callback);
        cb && cb(e)
    }
    if (target && event) {
        target.addEventListener(event, callback)
    }
}

const changeTheme = ({moduleName, theme, serviceId, resolve, reject}) => {
    let link = document.getElementById(themeID);
    let resourceMeta = document.head.querySelector('meta[name="resource-version"]');
    let version = resourceMeta.getAttribute('content');
    let startTime = Date.now()

    theme = serviceId ? fromId(serviceId) : theme
    if (theme && window.THEME !== theme) {
        if(STATIC_THEME === theme) {
            link && link.parentNode.removeChild(link)
            resolve && resolve({theme, interval: Date.now() - startTime})
        } else {
            let newLink  = document.createElement('link');
            let loadEvent = e => resolve && resolve({theme, interval: Date.now() - startTime});
            let errorEvent = e => reject && reject(e);
            newLink.rel = "stylesheet";
            newLink.id = themeID;
            once(newLink, 'load', loadEvent)
            once(newLink, 'error', errorEvent)
            newLink.href = `pages/${moduleName}/themes/${theme}.css?v=${version}`
            link ? document.head.replaceChild(newLink, link) : document.head.appendChild(newLink);
        }

        document.head.querySelector('title').innerText = theme.toUpperCase();

        window.THEME = theme
        if (serviceId) {
            window.SERVICE_ID = serviceId
        }
    }
}


export {
    STATIC_SERVICE_ID,
    STATIC_THEME,
    themesMap,
    fromId,
    fromTheme,
    changeTheme
}