

作者：[知晓云](https://cloud.minapp.com/?utm_sourcesegmentfault&utm_mediumarticle_footer&utm_term) - 小程序开发快人一步

<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_jpg/m4VKzIyJic0dhakb8zST4TSzZcicbWOHctqFGAYOx4sH7Zvo41USUGpj9zoxJTic2OBibhWI4qVBXJ5XflJK6MXyqQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

wxParser 小程序插件时隔一年终于更新了。这次更新主要针对在 gitthub 上同学们提出的 issue 进行一些特性的更新，更新后的 wxParser 将支持更多可配置项，让富文本更完美地在小程序端显示。

## 新特性：

*  image-lazy-load 属性，支持给所有图片设置懒加载；
*  image-preview 属性设置图片是否支持点击放大，默认 true，点击放大；
*  bindImgLoad 事件，监听小程序 image 标签的 bindload ，即图片加载完成的事件；
*  组件生命周期的 ready, attached, detached 的监听事件，通 bind:ready,bind:attached, bind:detached 进行监听；
*  支持外挂 class，可以在 wxss 文件给富文本内容添加自定义样式。

## 插件能做什么？

「wxParser」小程序插件由知晓云团队发布，经过对微信小程序富文本渲染引擎 wxParser 进行一层封装，解决了使用起来太过麻烦的问题。

使用「wxParser」插件并配合富文本编辑器，可以很方便地开发内容展示类小程序，使用知晓云富文本编辑器效果更佳。例如「知晓课堂」小程序中的微信小程序开发课程便是使用「wxParser」插件配合知晓云内容库完成的。<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/m4VKzIyJic0dhakb8zST4TSzZcicbWOHcttCPy2xeLnoHSOFmtk4b3AL7T996V6TIo3rXswia3H7w931zGSA8hVFg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>以对在知晓云编写的富文本内容进行解析为例，进入到知晓云控制台后，点击左侧「内容」菜单项，进入内容库管理面板，添加内容，即可看见富文本编辑器。编辑的内容（左）即经过「wxParser」解析后的样式（右）如下：<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/m4VKzIyJic0dhakb8zST4TSzZcicbWOHctgAZkaX6AG7tbHbQ17ZvdIN4QM7n8SH7DDMUPYvBjXVqrvfyhcLxqibg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title><img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/m4VKzIyJic0dhakb8zST4TSzZcicbWOHctIejDWjghl5Zg1ibR0FmmMqic7Kpsm6ibiariakGicldzYRibvIibb9fC2XIQicA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title><img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/m4VKzIyJic0dhakb8zST4TSzZcicbWOHcthd5J9djyz0hLFUfYZib3Cib0icxYFxfic2UoETzMLaW7YtibbJQc4xSDZ8w/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>当然，并非一定要使用知晓云的内容库才能使用「wxParser」，例如你可以使用百度的 UEditor 富文本编辑器编写你的内容，然后将生成的 HTML 配置到「wxParser」即可。

## 如何接入「wxParser」插件？

在小程序中使用「wxParser」，你需要在项目中引入「wxParser」的 JS 库，同时，需要在相应的 WXML、WXSS 和 JS 文件中引入「wxParser」的模板、样式文件和编写初始化代码，少了任何一步，程序都不能正常工作。

而在使用「wxParser」小程序插件后，不再需要引入「wxParser」JS 库了，你可以像使用普通组件一样使用「wxParser」，只需要对组件的属性进行配置即可，省去了引入多个库文件的操作。

#### 1. 申请使用插件

在「小程序管理后台 - 设置 - 第三方设置 - 插件管理」中查找插件名称「wxParser」（appid: wx9d4d4ffa781ff3ac），并申请使用。<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/m4VKzIyJic0dhakb8zST4TSzZcicbWOHctAwicic8Sqrk6xz4P7IjxZ7vmuvAFutA7icKCQV07NjMWvv4AePmYwVEOg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

#### 2. 引入插件代码

version 表示目前插件版本为 0.3.0，provider 为该插件的 AppID，而 wxparserPlugin 为自定义的插件名称。

```
"plugins": {
  "wxparserPlugin": {
    "version": "0.3.0",
    "provider": "wx9d4d4ffa781ff3ac"
  }
}
```

#### 3. 在需要使用到该插件的小程序页面的 JSON 配置文件中，做如下配置：

```
{
  "usingComponents": {
    "wxparser": "plugin://wxparserPlugin/wxparser"
  }
}
```

#### 4. 设置你的富文本内容，定义为 richText：

```
Page({
  data: {
    richText: '<h1>Hello world!</h1>'
  }
})
```

最后在需要展示富文本内容的地方，使用「wxParser」组件，为 rich-text 属性赋值上你的富文本内容即可。

```
<wxparser rich-text="{{richText}}" />
```

你是否正好有内容展示类的小程序，亦或准备开发一个？[查看开发文档](https://github.com/ifanrx/wxParser-plugin)，立即体验「wxParser」小程序插件。

扫描下方二维码，体验文章所提及的「知晓课堂」小程序。并带你遨游在小程序开发的知识海洋中。  <img referrerpolicy="no-referrer" data-src="https://img-blog.csdnimg.cn/20200306174812251.jpg" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="在这里插入图片描述" title="在这里插入图片描述">
