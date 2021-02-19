const superagent= require('superagent'); // 请求代理
const cheerio = require('cheerio'); // 解析页面
const html2md = require('html-to-md') // html解析为md
const exec = require('child_process').exec; // 执行命令行
const schedule = require('node-schedule'); // 执行定时任务
const fs = require('fs');

let articleList = [];                              // 文章列表
let article = [];                                  // 文章内容

const totalUrl = 'https://segmentfault.com';
const titleCategory = [{
    text: '前端',
    field: 'frontend'
},{
    text: '后端',
    field: 'backend'
},{
    text: '小程序',
    field: 'miniprogram'
}]

// 定时任务
const  scheduleCronstyle = ()=>{
    // 每天的凌晨1点1分30秒触发:
    schedule.scheduleJob('30 1 1 * * *',()=>{
        console.log('定时任务执行:' + new Date());
        spider();
    });
}

scheduleCronstyle();


const spider = () => {
    titleCategory.forEach(category => {
        superagent.get(`${totalUrl}/channel/${category.field}/`).end((err, res) => {
            if (err) {
                console.log(`抓取失败 - ${err}`)
            } else {
                articleList = getArticleList(res);

                // 遍历文章列表获取文章内容
                articleList.forEach((item,i)=>{
                    queryArticleDetail(item,i,category)
                })
            }
        });
    })
}


const queryArticleDetail = (articleContent,i,category) => {
    console.log(`${totalUrl}${articleContent.href}`)
    superagent.get(`${totalUrl}${articleContent.href}`).end(async (err, res) => {
        if (err) {
            console.log(`抓取失败 - ${err}`)
        } else {
            const articleJson = await getArticle(res);
            article.push(getArticle(res))
            let title = (articleContent.title || articleJson.title||`文章${i}`);
            if(title){
                title = title.replace(/[\[\]\s\?\.!-;,:\'\"]+/g,'')
            }
            const dir = `data/${category.text}`;
            const path =`${dir}/${title}.md`;
            await mkdirByPath(dir)
            await fs.writeFile(path, articleJson.content, function(err) {
                if(err) return console.log(err);
                console.log(`${title}写入成功`);
                // commitCode(articleJson.title);
            });
        }
    })
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
    const content = await html2md($('.article-content').html());
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
            href: $(ele).find('.news-img').attr('href')
        }
        articleList.push(item)
    })
    return articleList
}

spider()
