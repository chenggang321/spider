const express = require('express');
const superagent= require('superagent'); // 请求代理
const cheerio = require('cheerio'); // 解析页面
const html2md = require('html-to-md') // html解析为md
const fs = require('fs');

const app = express();

let articleList = [];                              // 文章列表
let article = [];                                  // 文章内容

const totalUrl = 'https://segmentfault.com/'

superagent.get(totalUrl).end((err, res) => {
    if (err) {
        console.log(`抓取失败 - ${err}`)
    } else {
        articleList = getArticleList(res);

        // 遍历文章列表获取文章内容
        articleList.forEach((item,i)=>{
            queryArticleDetail(item,i)
        })
    }
});

const queryArticleDetail = (articleContent,i) => {
    superagent.get(`${totalUrl}${articleContent.href}`).end(async (err, res) => {
        if (err) {
            console.log(`抓取失败 - ${err}`)
        } else {
            const articleJson = await getArticle(res);
            article.push(getArticle(res))
            const title = (articleJson.title||`文章${i}`).replace(/[\[\]\s\?\.!-;,:\'\"]+/g,'');
            fs.writeFile(`./data/${title}.md`, JSON.stringify(articleJson.content), { 'flag': 'a' }, function(err) {
                if(err) throw err;
                console.log(`${articleJson.title}写入成功`);
            });
        }
    })
}

// 获取文章内容
const getArticle = async res => {
    const $ = cheerio.load(res.text, {decodeEntities: false});
    const content = await html2md($('.article-content').html());
    return {
        content,
        title: $('#sf-article_title .text-body').text(),
        tag: Array.from($('#sf-article_tags .badge-tag')).reduce((total,ele) => {
            return `${total}${total?',':''}${$(ele).text()}`
        },'')
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

/**
 * [description] - 跟路由
 */
// 当一个get请求 http://localhost:3000时，就会后面的async函数
app.get('/', async (req, res, next) => {
    res.send(article);
});


let server = app.listen(3000, function () {
    let port = server.address().port;
    console.log(`Your App is running at http://localhost:${port}`);
});