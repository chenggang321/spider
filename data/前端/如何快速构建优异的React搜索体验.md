

如何快速构建优异的 React 搜索体验作者[Jason Stoltzfus](https://www.elastic.co/cn/blog/author/jason-stoltzfus)

构建搜索体验是一项艰巨的任务。它初看起来很简单：构建搜索栏，将数据放入数据库，然后让用户输入内容对数据库进行查询。但是，在数据建模、基础逻辑，当然还有总体设计和用户体验方面，还有许多事情需要考虑。

我们接下来介绍如何使用 Elastic 的开源 Search UI库构建出色的基于 React 的搜索体验。整个过程大约需要 30 分钟，完成后，您即可将搜索体验引入任何需要它的应用程序当中。

但是首先要考虑一下，是什么让构建搜索变得如此具有挑战性的？

## 搜索是艰巨的

几周前，曾热传过一篇很棒的名为 [Falsehoods Programmers Believe About Search](https://opensourceconnections.com/blog/2019/05/29/falsehoods-programmers-believe-about-search/)（关于搜索编程人员相信的谎言）的文章。文章中列出了开发人员在开发搜索时所考虑的一系列错误假设。

下列是几种很多人相信的谎言：

*  *“知道搜索内容的客户会按照您期望的方式去搜索。”*
*  *“您可以编写一个始终能够成功解析查询的查询解析器。”*
*  *“设置好之后，搜索便可以在下周按照相同的方式去搜索。”*
*  *“同义词简单易用。”*
*  ……还有许多其他值得了解的亮点，您应当找来一读！

需要注意的是，搜索有许多的挑战，而且这些挑战不仅仅在幕后。您需要思考如何管理状态，构建用于筛选、分面、排序、分页、同义词、语言处理的组件，以及更多其他方面的事情。但是，总而言之：

关于搜索引擎，我们将基于 Elastic 应用搜索进行介绍。

关于搜索体验，我们将介绍 OS 搜索库：Search UI。

当我们完成时，将生成类似以下所示的页面

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021777460" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="image2.png" title="image2.png">

## 搜索引擎：Elastic 应用搜索

Elastic 应用搜索可作为一项付费的托管服务或免费的自管型分发提供。在本教程中，我们将使用托管服务，但请记住，如果您自己托管的话，**您的团队可以通过基本许可_免费_使用 Search UI 和应用搜索。**

计划：将代表有史以来最好的电子游戏的文档索引到搜索引擎中，然后设计并优化搜索体验，以搜索它们。

首先，[注册以获得 14 天的试用期](https://www.elastic.co/cn/products/app-search/service?ultronsearchui-howto-react&bladecodeburst&hulkcontent) — 不需要信用卡。

创建一个引擎。有 13 种不同的语言可供选择。

我们将它命名为 `video-games`，并将语言设为 English（英语）。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021777465" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="image4.png" title="image4.png">

下载 best video games data set（最佳电子游戏数据集），然后使用导入程序将其上传到应用搜索。

接下来，单击“Engine”（引擎），然后选择 Credentials（凭据）选项卡。

创建一个新的具有有限引擎访问权限的公共搜索密钥，以只能访问 video-games 引擎。

检索这个新的公共搜索密钥和您的主机标识符。

虽然看起来不怎么样，但我们现在有了一个功能齐全的搜索引擎，可以使用优化的搜索 API 来搜索我们的电子游戏数据了。 

下列是截止现在我们已完成的操作：

*  创建了搜索引擎
*  采集了文档
*  创建了默认架构
*  检索了可公开给浏览器的、限定范围的一次性凭据

这些是截至现在针对应用搜索所做的操作。

下面我们使用 Search UI 开始构建搜索体验。

## 搜索库：Search UI

我们将使用 [create-react-app](https://github.com/facebook/create-react-app) 支架实用工具来创建 React 应用：<img referrerpolicy="no-referrer" data-src="/img/bVbDxlO" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 15.29.06.png" title="屏幕快照 2020-02-18 15.29.06.png">

在此基础上，我们将安装 Search UI 和应用搜索连接器：<img referrerpolicy="no-referrer" data-src="/img/bVbDxlZ" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 15.29.14.png" title="屏幕快照 2020-02-18 15.29.14.png">

在开发模式下启动应用：<img referrerpolicy="no-referrer" data-src="/img/bVbDxmc" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 15.29.23.png" title="屏幕快照 2020-02-18 15.29.23.png">

使用您喜爱的文本编辑器打开 `src/App.js`。

我们将从一些样本代码开始入手，将其解包。

*注意备注！*

<img referrerpolicy="no-referrer" data-src="/img/bVbDxmg" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 15.30.56.png" title="屏幕快照 2020-02-18 15.30.56.png">

### 第 1 步：导入语句

我们需要导入 Search UI 依赖项和 React。

核心组件、连接器和视图组件包含在三个不同的包中：

*  `@elastic/search-ui-app-search-connector`
*  `@elastic/react-search-ui`
*  `@elastic/react-search-ui-views`

随着课程的进行，我们将了解每个包的更多信息。

<img referrerpolicy="no-referrer" data-src="/img/bVbDxmw" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 15.31.39.png" title="屏幕快照 2020-02-18 15.31.39.png">

此外，我们还将为这个项目导入默认样式表，这样我们无需编写自己的 CSS 行便可获得良好的外观和感觉：<img referrerpolicy="no-referrer" data-src="/img/bVbDxmI" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 15.34.38.png" title="屏幕快照 2020-02-18 15.34.38.png">

### 第 2 步：连接器

我们从应用搜索获取了公共搜索密钥和主机标识符。

现在是使用它们的时候了！

Search UI 中的连接器对象使用凭据与应用搜索挂钩并支持搜索：<img referrerpolicy="no-referrer" data-src="/img/bVbDxmL" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 15.35.14.png" title="屏幕快照 2020-02-18 15.35.14.png">Search UI 可与任何搜索 API 协同工作。但是有了连接器，搜索 API 不需要任何更深层配置，便可以正常工作。

### 第 3 步：configurationOptions

在深入探讨 `configurationOptions` 之前，我们花点时间认真思考一下。

我们将一组数据导入了搜索引擎。但是，这是什么样的数据呢？

我们对数据了解越多，就越能知道如何将数据提供给搜索人员，并能知晓如何配置搜索体验。

让我们看一个对象，它是这个数据集中最好的对象：<img referrerpolicy="no-referrer" data-src="/img/bVbDxnb" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 15.35.54.png" title="屏幕快照 2020-02-18 15.35.54.png">

We see that it has several text fields like `name`, `year`, `platform`, and so on and some number fields like `critic_score`, `global_sales`, and `user_score`.

If we ask three key questions, we’ll know enough to build a solid search experience:

*  **How will most people search?**By the name of the video game.
*  **What will most people want to see in a result?**The name of the video game, its genre, publisher, scores, and its platform.
*  **How will most people filter, sort, and facet?**By score, genre, publisher, and platform.

We then can translate those answers into our `configurationOptions`:<img referrerpolicy="no-referrer" data-src="/img/bVbDxn5" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 15.36.34.png" title="屏幕快照 2020-02-18 15.36.34.png">我们已将 Search UI 连接到搜索引擎，接下来选择管理搜索数据、显示结果和浏览结果的方式。但是，我们需要一些东西将所有内容与 Search UI 的动态前端组件联系起来。

### 第 4 步：SearchProvider

这是控制所有内容的对象。`SearchProvider` 是嵌套所有其他组件的位置。

Search UI 提供了 `Layout` 组件，用于绘制典型的搜索布局。另有一些深入定制选项，但我们在此教程中不做深入介绍。

我们将做两件事情：

1. 将 `configurationOptions` 传入 `SearchProvider`。
2. 将一些结构构建块放入 `Layout`，并添加两个基本组件：`SearchBox` 和 `Results`。

<img referrerpolicy="no-referrer" data-src="/img/bVbDxoa" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 15.37.14.png" title="屏幕快照 2020-02-18 15.37.14.png">目前，我们已在前端完成基本设置工作。后端还有一些额外细节需要处理，然后我们才能运行。我们还应该研究相关度模型，以便根据这个项目的独特需求对搜索进行微调。  

退出到应用搜索……

## 回到实验室

应用搜索具有强大而优化的搜索引擎功能，能够使一度复杂的调整变得更加有趣。通过几次单击，便可以执行精细的相关度调整和无缝架构更改。 

我们将首先调整架构来查看它的实际情况。  

登录应用搜索引擎，然后单击 **Manage**（管理）部分下的 **Schema**（架构）。

此时将显示架构。11 个字段中的每个字段都默认为 **text**（文本）。

在 `configurationOptions` 对象中，我们定义了两个范围分面来帮助按数字搜索：`user_score` 和 `critic_score`。为了使范围分面按预期工作，字段类型需要设为**数字**。

单击每个字段旁的下拉菜单，将其改为 **number**（数字），然后单击 **Update Types**（更新类型）：<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021777461" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="image1.png" title="image1.png">

引擎即刻重新索引。稍后，当我们将分面组件添加到布局中时，范围筛选器将按我们预期的方式工作。现在，看看真正实用的功能。

### 本部分非常重要

有三个关键的相关度功能：同义词、管理和相关度调整。

选择侧栏中 **Search Settings**（搜索设置）部分下的每项功能：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021777464" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="image8.png" title="image8.png">

#### 同义词

有些人开轿车，有些人开汽车，有些人可能开老爷车。互联网是全球性的，世界各地的人们用不同的词语来描述事物。同义词可帮助您创建一组被认为是相同的术语。

在电子游戏搜索引擎案例中，我们知道人们想要查找 **Final Fantasy**。但他们可能只键入 **FF**。

单击 **Synonyms**（同义词），选择 **Create a Synonym Set**（创建同义词集），然后输入这些术语：<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021777463" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="image6.png" title="image6.png">

单击 **Save**（保存）。您可以根据需要添加任意数量的同义词集。

现在，搜索 **FF** 将与搜索 **Final Fantasy** 具有相同的权重。

#### 管理

管理是最受欢迎的功能。如果某人搜索 **Final Fantasy** 或 **FF**，结果会怎样呢？这个系列中有很多游戏，他们会获得哪个结果呢？

默认情况下，排列前五的结果将如下显示：

1.Final Fantasy VIII

2.Final Fantasy X

3.Final Fantasy Tactics

4.Final Fantasy IX

5.Final Fantasy XIII

这好像不对，Final Fantasy VII 才是 Final Fantasy 中最佳的一款游戏，而且 Final Fantasy XIII 不是很好的游戏！ 😜

我们是否可以让搜索 Final Fantasy 的人们看到 Final Fantasy VII 列在第一位？是否可以从结果中删除 Final Fantasy XIII？

我们能做到！

单击 **Curations**（管理），输入查询：**Final Fantasy**。

接下来，通过按住表最左侧的把手，将 Final Fantasy VII 文档向上拖动到 **Promoted Documents**（提升的文档）部分。然后，单击 Final Fantasy XIII 文档上的 **Hide Result**（隐藏结果）按钮 — 带贯穿线的眼睛图标：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021777462" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="image7.png" title="image7.png">

现在，搜索 Final Fantasy 或 FF 将会看到 Final Fantasy VII 排在首位，

并且根本看不到 Final Fantasy XIII 了。哈哈！

我们可以提升和隐藏多个文档。我们甚至可以对提升的文档进行排序，以便完全控制每个查询顶部显示的内容。

#### 相关度调整

单击侧栏中的 **Relevance Tuning**（相关度调整）。

我们搜索一个文本字段：`name` 字段。但是，如果我们拥有多个要搜索的文本字段（例如 `name` 字段**和** `description` 字段），该怎么办？我们使用的电子游戏数据集不包含 description 字段，因此，我们将伪造一些文档来仔细考虑这个字段。

假设文档类似如下：<img referrerpolicy="no-referrer" data-src="/img/bVbDxox" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 15.40.21.png" title="屏幕快照 2020-02-18 15.40.21.png">

如果某人想要查找游戏 Magical Quest，则会输入它作为查询。但是，第一个结果将是 Dangerous Quest：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021777467" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="image3.png" title="image3.png">

为什么会这样？这是因为“magical”一词在 Dangerous Quest 的描述中出现了三次，搜索引擎不知道这个字段比另一个字段更重要。于是，它将 Dangerous Quest 排得更靠前。这就是要进行相关度调整的原因。

我们可以在其他内容中选择一个字段，然后提高其相关度权重：<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021777466" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="image5.gif" title="image5.gif">

我们可以看到，在提高权重后，正确的项 Magical Quest 上升到顶部，因为 `name` 字段变得更重要。我们要做的就是将滑块拖动到更高值，然后单击 **Save**（保存）。

现在，我们使用应用搜索执行下列操作：

*  调整架构，将 `user_score` 和 `critic_score` 更改为 **number** 字段。
*  精细调整相关度模型。

至此，我们就介绍完了这些巧妙而先进的“仪表板”功能 — 每项功能都有匹配的 API 端点，如果您不喜欢 GUI，则可以使用 API 端点以编程方式运行各功能。

现在，让我们完成 Search UI 的介绍。

## 收尾工作

现在，您的 UI 应该可以正常运行了。尝试进行一些查询，看看结果如何。首先，我们缺少一些工具来探索我们的结果，例如，筛选、分面、排序等等，但是可以搜索了。我们需要充实 UI。  

在初始 `src/App.js` 文件中，我们导入了三个基本组件：<img referrerpolicy="no-referrer" data-src="/img/bVbDxsm" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 16.03.42.png" title="屏幕快照 2020-02-18 16.03.42.png">

根据我们对配置选项定义的内容，让我们再添加一些组件。

导入以下组件将会启用 UI 中缺失的功能：

*  `PagingInfo`：在当前页面上显示信息。
*  `ResultsPerPage`：配置在每一个页面上显示的结果数。
*  `Paging`：导航不同的页面。
*  `Facet`：以数据类型特有的方式筛选和浏览数据。
*  `Sorting`：重新排定给定字段的结果。

<img referrerpolicy="no-referrer" data-src="/img/bVbDxsq" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 16.04.06.png" title="屏幕快照 2020-02-18 16.04.06.png">

导入后，组件可以放入到 Layout 中。

`Layout` 组件将页面分为多个部分，各组件可以通过属性放入这些部分中。

它包含以下部分：

*  `Header`：搜索框/搜索栏
*  `bodyContent`：结果容器
*  `sideContent`：侧栏，其中包含分面和排序选项
*  `bodyHeader`：围绕结果包含了上下文丰富的信息，例如当前页面和每一页面上的结果数量
*  `bodyFooter`：用于在页面之间快速导航的分页选项

组件呈现数据。数据是根据我们在 configurationOptions 中提供的搜索设置进行获取的。现在，我们将每个组件放入相应的 Layout 部分。

例如，我们在 `configurationOptions` 中描述了五个分面维度，因此，我们将创建五个 `Facet` 组件。每个 `Facet` 组件都将使用一个“field”属性作为返回数据的键。

我们将它们以及 `Sorting` 组件放入 `sideContent` 部分中，然后将 `Paging`、`PagingInfo` 和 `ResultsPerPage` 组件放入最适合它们的部分中：

<img referrerpolicy="no-referrer" data-src="/img/bVbDxsB" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 16.04.42.png" title="屏幕快照 2020-02-18 16.04.42.png">

现在，让我们看一下本地开发环境中的搜索体验。

好多了！我们有了很多选项来浏览搜索结果。

我们添加了一些额外功能，例如，多个排序选项，并且通过添加单一标志使得发布者分面可筛选。尝试使用一个空查询进行搜索，从而浏览所有选项。

最后，我们看一下搜索体验的最后一个功能。它就是受欢迎的

“自动完成”功能。

## 自动完成

搜索人员喜欢自动完成，因为它可以提供即时反馈。它的建议有两种方式：**结果**和**查询**。根据方式的不同，搜索人员将收到相关结果或生成结果的潜在查询。

我们将重点介绍自动完成的查询建议形式。

这需要做两项快速更改。

首先，需要将自动完成添加到 `configurationOptions` 对象：

<img referrerpolicy="no-referrer" data-src="/img/bVbDxsP" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 16.05.42.png" title="屏幕快照 2020-02-18 16.05.42.png">

其次，需要将自动完成作为 `SearchBox` 的一个函数启用：<img referrerpolicy="no-referrer" data-src="/img/bVbDxsR" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="屏幕快照 2020-02-18 16.06.08.png" title="屏幕快照 2020-02-18 16.06.08.png">

好了，就这么简单。

尝试搜索一下。当您键入时，将显示自动完成查询建议。

## 总结

现在，我们拥有了外观好看、功能完善的搜索体验，而且还避免了一大堆人们在尝试实施搜索时会掉入的陷阱。30 分钟的讲解还不错，是不是？<img referrerpolicy="no-referrer" data-src="/img/remote/1460000012297876" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

Search UI是灵活的现代 React 框架，可用于快速开发搜索体验。Elastic 应用搜索是 Elasticsearch 中内置的强大搜索引擎。这是一项付费的托管服务，或者通过一个足够用的[基本许可](https://www.elastic.co/cn/subscriptions)，您也可以免费运行它。

---

想要更多了解Elastic技术，欢迎关注和报名参加webinar，近期安排如下：

2020年2月19日（星期三）15:00-16:00[使用Elastic Stack构建全方位可观察性实例](http://live.vhall.com/694325324?refersf)

2020年2月26日（星期三）15:00-16:00 [Kibana Lens 网络研讨会](http://live.vhall.com/641219925?refersf)

2020年3月4日（星期三）15:00-16:00 [Elastic Endpoint Security 概述网络](http://live.vhall.com/186623283?refersf)

2020年3月11日（星期三）15:00-16:00 [使用Elastic Stack监控网站资源](http://live.vhall.com/330304862?refersf)
