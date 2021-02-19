const superagent= require('superagent'); // 请求代理
const cheerio = require('cheerio'); // 解析页面
const html2md = require('html-to-md') // html解析为md
const exec = require('child_process').exec; // 执行命令行
const schedule = require('node-schedule'); // 执行定时任务
const fs = require('fs');

let articleList = [];                              // 文章列表
let article = [];                                  // 文章内容

const totalUrl = 'https://segmentfault.com';
const getCategory = totalUrl + '/api/user/channels';

// 定时任务
const  scheduleCronstyle = ()=>{
    // 每天的凌晨1点1分30秒触发:
    schedule.scheduleJob('30 1 1 * * *',()=>{
        console.log('定时任务执行:' + new Date());
        spider();
    });
}

scheduleCronstyle();


const spider = async () => {
    // 获取所有分类
    const titleCategory = await getAllChannel();

    for(let category of titleCategory){
        const res = await request(`${totalUrl}${category.url}`)
        articleList = getArticleList(res);

        // 遍历文章列表获取文章内容
        for(let article of articleList){
            await queryArticleDetail(article,category)
        }
    }
}


const queryArticleDetail = async (articleContent,category) => {
    const res = await request(`${totalUrl}${articleContent.href}`)
    const articleJson = await getArticle(res);
    article.push(getArticle(res))
    let title = (articleContent.title || articleJson.title);
    if(title){
        title = title.replace(/[\[\]\s\?\.!-;,:\'\"]+/g,'')
    }
    const dir = `data/${category.name}`;
    const path =`${dir}/${title}.md`;
    await mkdirByPath(dir)
    await fs.writeFile(path, articleJson.content, function(err) {
        if(err) return console.log(err);
        console.log(`${title}写入成功`);
        // commitCode(articleJson.title);
    });
}

// 提交git代码
const commitCode = (title) => {
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

const mkdirByPath = async path => {
    const [first] = path.split('/');
    await mkdir(first);
    await mkdir(path);
}

const mkdir = dirName => {
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
    }
}

// 获取文章内容
const getArticle = async res => {
    const $ = cheerio.load(res.text, {decodeEntities: false});
    let content = null;
    try {
        content = await html2md($('.article-content').html());
    }catch (err){
        return new Function()
    }

    return {
        content,
        title: $('#sf-article_title .text-body').text()
    }
}

// 获取文章列表
const getArticleList = res => {
    const $ = cheerio.load(res.text);
    let articleList = [];
    $('.news-list').children().each((index,ele) => {
        const item = {
            title: $(ele).find('.news__item-title').text(),
            href: $(ele).find('a').attr('href')
        }
        articleList.push(item)
    })
    return articleList
}

// 获取所有分类
async function getAllChannel(){
    const res = await request(`${getCategory}`);
    return JSON.parse(res.text).data.map(({name,url}) => ({name,url}))
}

function request(url){
    return new Promise((resolve,reject) => {
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


