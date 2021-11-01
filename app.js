const cheerio = require('cheerio'); // 解析页面
const {
    request,
    writeFile,
    downloadImage
} = require('./utils'); // 请求代理

spiderData()

const genUrl = (url, id = '') => {
    if (!url) return ''
    const str = '@/views/about/activity/images/' + id + url.split('/').pop() + '@'
    return `@require('${str}')`
}

async function spiderData() {
    let currentMeeting = '10'
    // currentMeeting = ''
    let listRes = await request(`http://www.csindex.cn/zh-CN/about/indexing-investment-forum`)
    // listRes = await request(`http://www.csindex.cn/en/about/indexing-investment-forum`)
    const $ = cheerio.load(listRes.text);
    const meetingList = []
    $('.form_list').children().each((index, ele) => {
        const href = $(ele).find('a').attr('href')
        const id = href.split('/').pop()
        const item = {
            title: $(ele).find('a').text(),
            href,
            id
        }
        if (currentMeeting == id) {
            meetingList.push(item)
        } else if (!currentMeeting) {
            meetingList.push(item)
        }
    })

    for (let meeting of meetingList) {
        const detailRes = await request(meeting.href)
        const $ = cheerio.load(detailRes.text);
        const banner = $('.lt_banner').find('img').attr('src')
        meeting.banner = genUrl(banner, meeting.id)
        if (banner) {
            const filename = meeting.id + banner.split('/').pop()
            downloadImage($('.lt_banner').find('img').attr('src'), 'data/images', filename)
        }
        meeting.intro = $('.lt_abstract').text()
        // 时间轴
        const timeLine = []
        $('.arr_list').children().each((index, ele) => {
            const type = 1;
            const desc = [];
            const desc1 = [];
            const zeroTypeList = [
                '欢迎辞',
                '会间休息',
                '午间休息',
                '结束',
                'Welcome',
                'Tea Break',
                'Lunch',
                'End'
            ];
            const endList = [
                '结束',
                'End'
            ]
            const zcrList = [
                '主持人：',
                'Moderator:',
            ]
            const tljbList = [
                '讨论嘉宾（排名不分先后）：',
                'Panelists (In no Particular Order):',
                '讨论嘉宾：（排名不分先后）',
                'Panelists:'
            ]
            let isZcr = true;
            $(ele).find('.ap_con').children().each((index, ele) => {
                if ($(ele).is('dd')) {
                    if (zcrList.includes($(ele).text())) {
                        isZcr = true
                    }
                    if (tljbList.includes($(ele).text())) {
                        isZcr = false
                    }
                    const link = $(ele).find('a').attr('href')
                    if(link){
                        downloadImage(link)
                    }
                    if (isZcr) {
                        desc.push({
                            text: $(ele).text(),
                            link
                        })
                    } else {
                        desc1.push({
                            text: $(ele).text(),
                            link
                        })
                    }

                }
            })
            const titleLink = $(ele).find('.ap_con > dt > a').attr('href')
            if(titleLink){
                downloadImage(titleLink)
            }
            const item = {
                type: zeroTypeList.includes($(ele).find('.ap_con > dt').text()) ? 0 : type,
                date: $(ele).find('.date').text(),
                title: {
                    text: $(ele).find('.ap_con > dt').text(),
                    link: titleLink
                }
            }
            if (desc.length) {
                item.desc = desc
            }
            if (desc1.length) {
                item.desc1 = desc1
            }
            if (endList.includes($(ele).find('.ap_con > dt').text())) {
                item.time = 'end'
            }
            timeLine.push(item)
        })
        meeting.timeLine = timeLine

        // 致辞
        const coverflowSwiper = []
        $('.ycap > .yjjb > ul').children().each((index, ele) => {
            const url = $(ele).find('img').attr('src')
            let text = $(ele).find('.ms.fz').text()
            if (currentMeeting == '12') {
                text = $(ele).find('.name').text() + '：' + $(ele).find('.ms').text()
            }
            coverflowSwiper.push({
                text,
                url: genUrl(url),
            })
            if (url) {
                downloadImage($(ele).find('img').attr('src'))
            }
        })
        meeting.coverflowSwiper = coverflowSwiper

        // 主题演讲
        const list = []
        $('.con_l > .yjjb').children().each((index, ele) => {
            const url = $(ele).find('img').attr('src')
            list.push({
                desc1: $(ele).find('.ms.fz').text(),
                img: genUrl(url),
            })
            if (url) {
                downloadImage($(ele).find('img').attr('src'))
            }
        })
        meeting.list = list
    }

    console.log(meetingList)
    await writeFile({path: `data/${currentMeeting}data.json`, fileContent: JSON.stringify(meetingList)})
}
let lang = 'zh-CN'
// lang = 'en'
const detailList = [
    {
        type: 14,
        pre: 'http://www.csindex.cn/',
        end: '/about/indexing-investment-forum-details/14_detail?id=1'
    },
    {
        type: 13,
        pre: 'http://www.csindex.cn/',
        end: '/about/indexing-investment-forum-details/13_detail?id=1'
    },
]

// genArticle('http://www.csindex.cn/zh-CN/about/indexing-investment-forum-details/13_detail?id=1', 13)

async function genArticle(url, type = '') {
    const res = await request(url)
    const $ = cheerio.load(res.text, {decodeEntities: false})
    const detailList = {}
    $('.tab-content').children().each((index, ele) => {
        const title = $(ele).find('.head > p').text()
        const img = $(ele).find('.cen .img').find('img').attr('src')
        if (img) {
            downloadImage(img, 'detailImg')
        }
        const desc = $(ele).find('.cen .title > p').text()
        const content = $(ele).find('.content .text').html()
        const detail = {
            id: index + 1,
            title,
            img,
            desc,
            content
        }
        detailList[index + 1] = detail
    })
    console.log(detailList)
    await writeFile({path: `data/${type}detail.json`, fileContent: JSON.stringify(detailList)})
}
