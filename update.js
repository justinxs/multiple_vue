const fs = require('fs')
const { exec } = require('child_process')
const NEW_COMMIT = 'e892334'
const OLD_COMMIT = 'fc43d50'

exec(`git diff --name-status ${OLD_COMMIT} ${NEW_COMMIT} dist`, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.error(`stderr: ${stderr}`);
    let jsonArr = stdout.split(/\n/)
        .map(t => {
            let sides = t.split(/\t/)
            let paths = (sides[1] || '').split('/')
            return {
                status: sides[0],
                name: paths[paths.length - 1],
                fullPath: sides[1],
                path: paths.slice(0, -1).join('/')
            }
        })
        .filter(item => item.status && item.name)

    // 导出 diff json
    fs.writeFile('update.json', JSON.stringify(jsonArr), (error) => {
        if (error) {
            console.error('导出JSON失败', error)
        } else {
            console.log('导出 update.json')
        }
    })

    // 导出update文件夹
    fs.mkdir('update', { recursive: true }, (err) => {
        if (err) return console.error('mkdir update error: ' + err);
        jsonArr
            .filter(item => item.status !== 'D')
            .forEach(item => {
                fs.readFile(item.fullPath, (err, data) => {
                    if (err) return console.error(`readFile ${item.fullPath} error: `, err)
                    const writeFile = () => {
                        fs.writeFile('update/' + item.fullPath, data, (error) => {
                            if (error) {
                                console.error(`writeFile ${item.fullPath} error: `, error)
                            }
                        })
                    }
                    if (!item.path || item.path === '/') {
                        writeFile()
                    } else {
                        fs.mkdir('update/' + item.path, { recursive: true }, (err) => {
                            if (err) return console.error(`mkdir update/${item.path} error: `, err)
                            writeFile()
                        })
                    }
                });
            })
    });
})
