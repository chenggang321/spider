

作者：张泽栓首发于[知晓云](https://cloud.minapp.com/?utm_sourcesegmentfault&utm_mediumarticle_footer&utm_term)公众号，阅读原文

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021867270" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

近日，微信官方开始推广一个新的多端统一开发工具——Kbone。

据官方介绍，Kbone 是一个致力于微信小程序和 Web 端同构的解决方案。具体来说，因为微信小程序的底层模型和 Web 端不同，所以如果我们想直接把 Web 端的代码挪到小程序环境内执行是不可能的。Kbone 的诞生就是为了解决这个问题，它实现了一个适配器，在适配层里模拟出了浏览器环境，让 Web 端的代码可以不做什么改动便可运行在小程序里。

因为 kbone 是通过提供适配器的方式来实现同构，所以微信表示其优势有以下几点：

*  大部分流行的前端框架都能够在 Kbone 上运行，比如 Vue、React、Preact 等。
*  支持更为完整的前端框架特性，因为 Kbone 不会对框架底层进行删改（比如 Vue 中的 v-html 指令、Vue-router 插件）。
*  提供了常用的 dom/bom 接口，让用户代码无需做太大改动便可从 Web 端迁移到小程序端。
*  在小程序端运行时，仍然可以使用小程序本身的特性（比如像 live-player 内置组件、分包功能）。
*  提供了一些 Dom 扩展接口，让一些无法完美兼容到小程序端的接口也有替代使用方案（比如 getComputedStyle 接口）。

对于这个前端同构框架，知晓云之前也略有耳闻。我们比较关注的是官方宣传的优点——提供了常用的 DOM/BOM 接口，让用户代码无需做太大改动便可从 Web 端迁移到小程序端。

抱着拉出来溜溜的心态，我们找了几个 web 项目，使用 Kbone 框架迁移到小程序端。结果让我大失所望。

我总共试了三个项目，其中两个跑了起来，一个直接放弃。项目一卡在了属性选择器和轮播图上；项目二卡在 css-in-js 上；项目三是后端渲染的模版，这个直接无法使用。过程中主要遇到的问题就是样式。过程细节就省略了，都是泪。下面是我这几次尝试总结下来的几个要点与问题。

### 一、配置

这个按照官方文档配置，问题不大。需要注意以下几个问题：

*  如果在小程序中不想把全部内容都在一个页面的渲染的话，webpack 需要配置多入口；
*  eval 相关的 devtool 不能用，例如 cheap-module-eval-source-map；
*  css 样式必须抽离出 css 文件。

### 二、axios 在微信小程序中使用

使用对应的 adapt，问题不大。使用以下代码解决：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021867269" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

### 三、DOM/BOM 接口的兼容性问题

官方提供了 DOM/BOM 的拓展接口，问题不大。此次遇到了以下两个问题：

1、兼容性。例如 Event 对象以浏览器提供接口并不完全一致，使用以下代码兼容（只是举例说明，并未做完全的兼容测试）：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021867271" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

2、某些接口需要自己实现，例如：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021867277" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

### 四、样式

迁移应用到小程序，最大的问题应该就是样式。这个也是由于微信小程序自身的限制。除非小程序本身支持，否则框架也是无能为力的。主要有以下几个问题：

*  不支持「属性选择器」以及其他微信小程序不支持的选择器；
*  小程序端某些组件的样式问题，例如，input 组件在渲染成 view + 自定义组件，样式需做特殊处理；
*  部分 css-in-js 框架不支持抽离 css 文件，无法在小程序上使用。

### 五、页面鉴权

由于小程序端的页面模版是前端渲染的，无法通过后端对页面鉴权，也无法 redirect。

### 六、后端渲染

后端渲染无法使用。我迁移的第三个应用，由于 SEO 的需要，采用「后端渲染 + vue（非同构）」的技术栈。同样，由于小程序端的模版是前端渲染出来的，无法迁移该项目。

### 七、调试

这个问题有点大。前面的问题，可以通过改代码或新项目通过技术选型避开。但是在开发的过程中，没有调试工具，这是个灾难。目前唯一能用的只有 wxml 节点树页面。但是这个的问题也很大。绝大部分的元素都渲染成了 view，并且每个节点都差不多。例如下图，这一堆东西，看到就头疼。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021867272" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

虽然旧项目迁移很不顺利，但是使用 Kbone 开发新项目，相对来说，体验好很多，也顺利很多。我们直接使用了官方的 cli 工具初始化项目，并开发了「知晓云 SDK demo」应用（源码）。界面如下图：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021867273" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

开发过程中遇到的阻碍，也是「样式」和「调试工具」的问题。这里跟大家介绍一下，Kbone 框架接入知晓云后端云服务 SDK 的步骤：1、安装 SDK npm 包。

npm install minapp-sdk 或 yarn add minapp-sdk2、package.josn 里添加 alias。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021867274" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

3、scripts/webpack.mp.config.js 里添加 alias。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021867275" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

4、在需要用的 sdk 的文件中引入 「baas」模块。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021867276" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

完成了以上几步，即可在不同平台中引入对应的 sdk。

### 结论：

从我们目前的体验来看，Kbone 可以帮助开发者将 Web 端的代码编译到微信小程序端，这为开发者节省了时间；但另一方面，新的框架不但有学习成本，而且同构框架难免会遇到兼容性问题。

打个比方，项目维护的工作量并非是简单的 2 - 1 = 1，结果可能是 1.1、1.2 或 1.3。在我们看来，如果超过了 1.5 那几乎没有使用的必要了。由于没做完整的体验，并且框架也在迭代开发中，这里并不能下结论。

另外，由于微信小程序自身的原因，框架对样式的支持也是有限制的，这还得靠开发者自己避开。

因此，我们建议，Kbone 还是适合从头开始做的新项目，如果是迁移旧项目，一定要调研清楚之前的技术栈是否支持 Kbone。毕竟 Kbnoe 只是提供了一个「类 web 的 JS 执行环境」，而一个项目能否跑正常起来还有其他的很多因素，前端的技术栈也是五花八门。

另外还有一个问题可能，如果使用了 Kbone，之前 Web 端使用的第三方组件很有可能不能正常工作了。可能是 JS 问题，也可能是样式问题。

---

关于 Kbone 框架就介绍到这里啦，如果你需要获取文中所提及的源码，请在知晓云公众号后台回复「Kbone」。

<img referrerpolicy="no-referrer" data-src="/img/bVbBf8L" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="mincloud2019.png" title="mincloud2019.png">
