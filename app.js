const cheerio = require('cheerio'); // 解析页面
const html2md = require('html-to-md') // html解析为md
const schedule = require('node-schedule'); // 执行定时任务
const {
    request,
    writeFile,
    dateFormat,
} = require('./utils'); // 请求代理

const {
    queryCategory,
    addCategory,
    queryContentByTitle,
    addContent,
    endConnection
} = require('./mysql')

// md html
const isMd = false
const totalUrl = 'https://segmentfault.com';
const getCategory = totalUrl + '/api/user/channels';
const baseDir = 'data/'

// 定时任务
// const  scheduleCronstyle = ()=>{
//     // 每天的凌晨1点1分30秒触发:
//     schedule.scheduleJob('30 1 1 * * *',()=>{
//         console.log('定时任务执行:' + new Date());
//         spider();
//     });
// }
//
// scheduleCronstyle();

async function spider() {
    // 获取所有分类
    const titleCategory = await getAllChannel();
    // 将分类数据存入数据库
    for (let category of titleCategory) {
        // 获取数据库中的分类数据
        const categoryList = await queryCategory();
        const isHasCategory = categoryList.map(item => item.name).includes(category.name);
        if (!isHasCategory) {
            await addCategory(category.name)
        }
        const res = await request(`${totalUrl}${category.url}`)
        const articleList = getArticleList(res);

        // 遍历文章列表获取文章内容
        for (let article of articleList) {
            await queryArticleDetail(article, category)
        }
    }

    endConnection()
}

spider();

async function queryArticleDetail(article, category) {
    const res = await request(`${totalUrl}${article.href}`)
    const articleContent = getArticle(res);
    const title = article.title.replace(/[\[\]\s\?\.!-;,:\'\"]+/g, '')
    const dir = `${baseDir}${category.name}`;
    const path = `${dir}/${title}${isMd ? '.md' : '.html'}`;
    // 存入数据库
    // 获取数据中的文章
    const DArticle = await queryContentByTitle(title) || [];

    if(!DArticle.length){
        // 获取数据库中的分类数据
        const categoryList = await queryCategory();

        // 获取对应分类id
        const categoryId = categoryList.filter(item => item.name === category.name).pop().id

        const articleDetail = {
            title,
            add_time: dateFormat('YYYY-mm-dd',new Date()),
            views: 0,
            description: article.description.trim(),
            content: articleContent,
            category_id: categoryId,
            user_id: 1
        }

        await addContent(articleDetail).then(() =>{
            console.log(title + '存入成功')
        })
    }

    // 写入文件夹
    await writeFile({path, fileContent: articleContent})
}

// 获取文章内容
async function getArticle(res) {
    const $ = cheerio.load(res.text, {decodeEntities: false});
    let content = null;
    try {
        if (isMd) {
            content = await html2md($('article.article-content').html());
        } else {
            content = $('article.article-content').html();
        }
    } catch (err) {
        return new Function()
    }
    return content
}

// 获取文章列表
function getArticleList(res) {
    const $ = cheerio.load(res.text);
    let articleList = [];
    $('.news-list').children().each((index, ele) => {
        const item = {
            title: $(ele).find('.news__item-title').text(),
            href: $(ele).find('a').attr('href'),
            description: $(ele).find('.article-excerpt').text()
        }
        articleList.push(item)
    })
    return articleList
}

// 获取所有分类
async function getAllChannel() {
    const res = await request(`${getCategory}`);
    return JSON.parse(res.text).data.map(({name, url}) => ({name, url}))
}
