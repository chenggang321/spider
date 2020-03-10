

>**点赞再看，养成习惯**
>
>**本文 `GitHub` [https://github.com/qq44924588...](https://github.com/qq449245884/xiaozhi) 上已经收录，更多往期高赞文章的分类，也整理了很多我的文档，和教程资料。欢迎Star和完善，大家面试可以参照考点复习，希望我们一起有点东西。**

前端框架的受欢迎程度每年都在增长， 如今，在较大型或者中型的项目，基本都需要使用框架来进行开发。 前几年，由谷歌发布的`Angular`和Facebook的`React`就开启前端框架地位竞争。 但是，在2018年，前端世界发生了重大变化，因为还有一个更强大的`选手`Vue参加了比赛。

接下我们来看看 Vue 和 React 目前的趋势，看看 Vue 今天是否能保持领先的地位。

## 背景

在开始深入研究之前，我们先来概述一些有关这两个框架的一些背景信息。

`React`由技术巨头`Facebook`开发和维护以满足其需求，长期以来一直是前端领域的主要参与者，以确保稳定性和长期支持。

`Vue.js`是由前谷歌员工**Evan You**创建的，他的目标是开发一个框架，集成现有框架的最佳特性。

## 核心差异

为了保持客观公正，我们可以从研究`Vue.js`文档中的React和Vue.js之间的差异，它是由**Evan You**与来自React团队的**Dan Abramov**合作编写的。

Vue 和 React 都使用虚拟DOM，不过它们实现方式不一样。

**Vue 和 React 之间的主要区别是 Vue 使用声明式渲染的模板，而 React 使用JSX，这是一个允许在其中使用 HTML 的JS扩展。** 这意味着 React 需要更复杂的实现，即使是简单的任务(与Vue 甚至 Angula r相比)，最终也需要更多的时间来开发复杂的组件。

下面是 Vue 的一个简单的登录实现示例：

<img referrerpolicy="no-referrer" data-src="/img/bVbEeop" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

在 React 中是这样的：

<img referrerpolicy="no-referrer" data-src="/img/bVbEeov" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

对比可知，Vue 更高级，入口点更低，因为 Vue 不需要深入了解JS 核心即可执上手。

React 和 Vue 都适用于中小型项目。

## 人气

在 JS 框架中，React 一直是前端框架流行的领先者。 它以`48,718`个依赖项的数量排名第一，而`Vue`是第二受欢迎的 JS 框架，有`21,575`个依赖者，只有前者的一半。 不过，如果我们看看 2018 年底的统计数据，就会发现 Vue 的依赖者增加了两倍，而 React 则增加了一倍。

[下载量也显示出`React`越来越受欢迎，而 Vue 下载几乎保持不变。](https://www.npmtrends.com/react-vs-vue)

<img referrerpolicy="no-referrer" data-src="/img/bVbEepY" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

Stack Overflow 根据当前在特定平台上工作的开发人员提出的问题数量，提供以下数据：

<img referrerpolicy="no-referrer" data-src="/img/bVbEep0" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

虽然我们可以看到关于 Vue 的问题越来越多，但是 React 毫无疑问仍然高居榜首。

根据第四版**JavaScript Rising Stars**的估算（评估每年Github上增加的星星数量），Vue 在 2019 年排名第一。

这个统计数字很令人困惑，因为它与前面提到的任何数字都不相符，也许Vue社区更看重的`GitHub`的星星数。

当然还有一个原因就是 Vue 我们国内的人过得多，我们的人数也远远大于国外。

## 社区支持

根据Github的统计数据，即使没有顶级公司的支持，我们也可以得出 Vue 在其开源社区中有多受欢迎的结论。

Facebook 工程师一直在致力于`React`维护和编码，对其进行改进和投资，这使得 React 成为开发人员世界中增长最快的工具。

## 灵活性和学习曲线

React 的最大优点之一就是灵活性。 由于 React 不是一个成熟的框架，而是一个库，因此它也很容易学习。 开发人员可以按照自己的喜好添加任何库，而不必以固定的模式工作。 开发人员在与 React 合作以支持状态管理任务时，也广泛使用 MobX 和 Redux。

Vue 也很灵活，并且对构建应用程序没有任何限制。 它还为各种构建系统提供了官方支持，而且学习过程不会花费很多时间：熟悉 HTML 和 ES5(6) 这样的基础知识是我们入门所需的唯一基础知识。

## 框架大小

框架的大小是直接影响项目生产力的关键标准，框架越小，对项目的影响就越好。 React 约为`100 Kb`，而 Vue 约为`80 Kb`。 它们都具有相对较小的尺寸，这使得它们便于开发小型应用程序。

## 案例

在为项目选择一项技术时，了解这项技术已经在何处使用也很重要。

#### React 应用开发：

*  Facebook
*  Twitter
*  Instagram
*  Whatsapp

#### Vue 应用开发：

*  Gitlab
*  9Gag
*  Nintendo
*  Grammarly

综上所述，React 当前比 Vue 更为流行，因为它具有更强大的团队来改善和维护它，而 Vue 则没有。 Vue 和 React 提供了高度的灵活性，易于学习的曲线，并且都较小。

那么，Vue 在2020年受欢迎程序是否会超过 React？可能性比较小。

---

**代码部署后可能存在的BUG没法实时知道，事后为了解决这些BUG，花了大量的时间进行log 调试，这边顺便给大家推荐一个好用的BUG监控工具 [Fundebug](https://www.fundebug.com/?utm_sourcexiaozhi)。**

原文：[https://www.codeingdinwp.com/...](https://www.codeingdinwp.com/blog/angular-vs-vue-vs-react/)

作者：inVerita 译者：前端小智 来源：medium

---

## 交流

文章每周持续更新，可以微信搜索「 大迁世界 」第一时间阅读和催更（比博客早一到两篇哟），本文 GitHub [https://github.com/qq449245884/xiaozhi](https://github.com/qq449245884/xiaozhi)  已经收录，整理了很多我的文档，欢迎Star和完善，大家面试可以参照考点复习，另外关注公众号，后台回复**福利**，即可看到福利，你懂的。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000020353567?w=800&h=400" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>
