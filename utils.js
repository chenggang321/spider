const superagent = require('superagent'); // 请求代理
const exec = require('child_process').exec; // 执行命令行
const fs = require('fs');
const path = require('path');

function request(url) {
    return new Promise((resolve, reject) => {
        superagent.get(url).end((err, res) => {
            if (err) {
                console.log(`请求失败 - ${err}`)
                reject(err)
            } else {
                resolve(res)
            }
        });
    })
}

async function writeFile({path, fileContent}) {
    const pathSplit = path.split('/');
    const fileName = pathSplit.pop()
    mkdirsSync(pathSplit.join('/'))
    await fs.writeFile(path, fileContent, function(err) {
        if(err) return console.log(err);
        console.log(`${fileName}写入成功`);
        // commitCode(articleJson.title);
    });
}

// 提交git代码
function commitCode (title){
    console.log('提交git代码');
    const code = [
        'git add *',
        `git commit -m "自动提交-${title}"`,
        'git push'
    ];
    code.forEach(function (cmd, i) {
        setTimeout(function () {
            console.log(cmd);
            exec(cmd, function (err, stdout, stderr) {
                if (err) {
                    console.log(err);
                }
            });
        }, i * 1000);
    })
}

function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}


module.exports = {
    request,
    writeFile,
}
