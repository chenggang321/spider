const superagent = require('superagent'); // 请求代理
const exec = require('child_process').exec; // 执行命令行
const fs = require('fs');
const path = require('path');
const fetch = require('request')

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
    await mkdirsSync(pathSplit.join('/'))
    new Promise(async (resolve, reject) => {
        await fs.writeFile(path, fileContent, function (err) {
            if (err) {
                reject(err)
            } else {
                console.log(`${fileName}写入成功`);
                resolve()
                // commitCode(fileName);
            }
        });
    })
}

// 提交git代码
function commitCode(title) {
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

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
}

function downloadImage(url, dir = 'data/images',filename = url.split('/').pop()){
    if(url.split('.').pop().toLowerCase() === 'pdf') {
        dir = 'data/pdf'
    }
    fetch(encodeURI(url)).pipe(fs.createWriteStream(dir + "/" + filename))
}


module.exports = {
    request,
    writeFile,
    dateFormat,
    downloadImage
}
