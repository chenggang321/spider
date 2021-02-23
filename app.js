const cheerio = require('cheerio'); // 解析页面
const html2md = require('html-to-md') // html解析为md
const schedule = require('node-schedule'); // 执行定时任务
const {
    request,
    writeFile
} = require('./utils'); // 请求代理
const {queryCategory, addCategory, addContent} = require('./mysql')

let articleList = [];                              // 文章列表
let article = [];                                  // 文章内容

const totalUrl = 'https://segmentfault.com';
const getCategory = totalUrl + '/api/user/channels';

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

const spider = async () => {
    // 获取所有分类
    const titleCategory = await getAllChannel();
    // 将分类数据存入数据库
    for(let category of titleCategory){
        // 获取数据库中的分类数据
        const categoryList = await queryCategory();
        const isHasCategory = categoryList.map(item => item.name).includes(category.name);
        if(!isHasCategory){
            await addCategory(category.name)
        }
        const res = await request(`${totalUrl}${category.url}`)
        articleList = getArticleList(res);

        // 遍历文章列表获取文章内容
        for(let article of articleList){
            await queryArticleDetail(article,category)
        }
    }
}

spider();

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
    await writeFile({path,fileContent:articleJson.content})
}

// 获取文章内容
const getArticle = async res => {
    const $ = cheerio.load(res.text, {decodeEntities: false});
    let content = null;
    try {
        content = await html2md($('article.article-content').html());
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
