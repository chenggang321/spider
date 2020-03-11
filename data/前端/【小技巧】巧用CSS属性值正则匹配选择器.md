

<img referrerpolicy="no-referrer" data-src="/img/bVbEn3K" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="稿定设计导出-20200310-130859.png" title="稿定设计导出-20200310-130859.png">

属性值正则匹配选择器包括下面3种：

*  [attr^="val"]
*  [attr$="val"]
*  [attr*="val"]

这3种属性选择器是字符匹配，而非单词匹配。其中，尖角符号`^`、美元符号`$`以及星号`*`都是正则表达式中的特殊标识符，分别表示前匹配、后匹配和任意匹配。

利用这些选择器，纯CSS就可以做出很炫酷的功能。

## 显示超链接的小图标和文件类型图表

利用`[attr^="val"]`前匹配选择器可以判断`<a>`元素的链接地址类型，以用来显示对应的小图标。显示超链接的小图标的样式如下：

```
[href] {padding-left: 18px;}
/* 链接地址 */
[href^="https"],
[href^="//"] {
    background: url("./images/link.png") no-repeat left;
}
/* 网页内锚链 */
[href^="#"] {
    background: url("./images/anchor.png") no-repeat left;
}
/* 手机和邮箱 */
[href^="tel:"] {
    background: url("./images/tel.png") no-repeat left;
}
[href^="mailto:"] {
    background: url("./images/e-mail.png") no-repeat left;
}
```

效果 

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021979599" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

而利用`[attr$="val"]`后匹配选择器则可以实现显示文件类型小图标。CSS如下：

```
/* 指向PDF文件 */
[href$=".pdf"] {
    background: url("./images/pdf.png") no-repeat left;
}
/* 下载zip压缩文件 */
[href$=".zip"] {
    background: url("./images/zip.png") no-repeat left;
}
/* 图片链接 */
[href$=".png"],
[href$=".gif"],
[href$=".jpg"],
[href$=".jpeg"],
[href$=".webp"] {
    background: url("./images/image.png") no-repeat left;
}
```

效果如下 

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021979598" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

## CSS属性选择器搜索过滤技术

我们可以借助属性选择器来辅助我们实现搜索过滤效果，如通讯录、城市列表，这样做性能高，代码少。

HTML结构如下：

```
<input type="search" id="input" placeholder="输入城市名称或拼音" />
<ul>
    <li data-search="重庆市 chongqing">重庆市</li>
    <li data-search="哈尔滨市 haerbin">哈尔滨市</li>
    <li data-search="长春市 changchun">长春市</li>
    <li data-search="长沙市 changsha">长沙市</li>
    <li data-search="上海市 shanghai">上海市</li>
    <li data-search="杭州市 hangzhou">杭州市</li>
</ul>
```

此时，当我们在输入框种输入内容的时候，只要根据输入内容动态创建一段CSS代码就可以实现搜索匹配效果了，无需自己写代码进行匹配验证。

```
var eleStyle = document.createElement('style');
document.head.appendChild(eleStyle);
// 文本输入框
input.addEventListener('input', function() {
    var value = this.value.trim();
    eleStyle.innerHTML = value ? '[data-search]:not([data-search*="' + value +'"]) { display: none; } ' : '';
});
```

最终效果如下 

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021979600" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="效果图" title="效果图">

**更多小技巧**

*  [【小技巧】package.json中homepage属性的作用](https://segmentfault.com/a/1190000021875558)
*  [【小技巧】使用Vue.js的Mixins复用你的代码](https://segmentfault.com/a/1190000017716554)
*  [【小技巧】移动端网页调试神器Eruda的使用技巧](https://segmentfault.com/a/1190000011759300)
*  [【小技巧】H5页面上如何禁止手机虚拟键盘弹出？](https://segmentfault.com/a/1190000011371022)
*  [【小技巧】CSS如何实现文字两端对齐效果？](https://segmentfault.com/a/1190000011336392)

---

关注公众号，第一时间接收最新文章。如果对你有一点点帮助，可以点喜欢点赞点收藏，还可以小额打赏作者，以鼓励作者写出更多更好的文章。<img referrerpolicy="no-referrer" data-src="/img/bVbALAm" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="微信公众号名片.jpg" title="微信公众号名片.jpg">
