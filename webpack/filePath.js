const path = require('path');
const fs = require('fs');

/**
 * 获取themes文件夹的所有主题（不包含以 _ 开头的scss文件）
 * 注：开发环境中，由于当前webpack配置只会在第一次编译的时候读取一次，所以新增主题scss文件需要重新编译 npm run start
 */
function getThemesEntry() {
    const currentTheme = process.env.THEME || 'mallwin'
    let entrys = {};
    let pages = getPages()
    pages.forEach(name => {
        const dir = fs.readdirSync(path.resolve(__dirname, `../src/pages/${name}/styles/themes`), {withFileTypes: true})
        let entry = {}
        for (const dirent of dir) {
            let dname = dirent.name;
            if (dirent.isFile() && !/^_/.test(dname) && currentTheme !== dname.replace(/\.[^\.]+/, '')) {
                entry[dname.split('.').slice(0, -1).join('.').toLowerCase()] = path.resolve(__dirname, `../src/pages/${name}/styles/themes/${dname}`)
            }
        }
        entrys[name] = entry
    })
    
    return entrys
}


/**
 * 获取pages文件夹的所有文件夹（index.js为模块入口）
 * 注：开发环境中，由于当前webpack配置只会在第一次编译的时候读取一次，所以新增文件夹需要重新编译 npm run start
 */
function getPagesEntry() {
    let entry = {};
    const dir = fs.readdirSync(path.resolve(__dirname, '../src/pages'), {withFileTypes: true})
    for (const dirent of dir) {
        let name = dirent.name;
        if (dirent.isDirectory()) {
            entry[name] = path.resolve(__dirname, `../src/pages/${name}/index.js`)
        }
    }
    return entry
}

function getPages() {
    let pages = [];
    const dir = fs.readdirSync(path.resolve(__dirname, '../src/pages'), {withFileTypes: true})
    for (const dirent of dir) {
        if (dirent.isDirectory()) {
            pages.push(dirent.name)
        }
    }
    return pages
}

module.exports = {
    getThemesEntry,
    getPagesEntry,
    getPages
}