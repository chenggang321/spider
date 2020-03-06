

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021929493" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

## 1. 前言

[2020 年 JVM 生态报告](https://mp.weixin.qq.com/s/31PSjrwuGwxFaZPOcLFlzg) 可以看出**Intellij IDEA** 目前已经稳坐 **Java IDE** 头把交椅。而且统计得出付费用户已经超过了八成（国外统计）。**IDEA** 的优良设计保证了我的生产力，也是我情愿为之付费的软件之一。今天把我自己经常用的一些插件拿出来分享一波。

## 2. IDEA 插件

分享之前我们来看看其插件体系。**Intellij IDEA** 大部分功能是通过插件集成进来的。默认情况下已经集成了很多插件。你可以通过 **Preferences** 查看：

![image-20200305155759834](https://asset.felord.cn/blog/20200305155808.png)

**Intellij IDEA** 为人诟病的是性能问题，我们可以禁用一些我们不用的自带插件减轻负担。接下来我把我必备插件分享出来。

## 3. 常用插件

你可以在上图 **Plugins 选项卡** 的搜索中输入插件的关键字来搜索到它们。

### 3.1 Key promoter X

很多人不愿意切换 **IDE** 就是因为快捷键的习惯问题。刚好这个插件可以提醒快捷键，有代入感，提醒的多了你就会了。对于新手建议安装熟悉一下快捷键。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021931716" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="image" title="image">

### 3.2 Maven Helper

旗舰版也就是收费版自带有 **Maven** 模块，但是如果你是免费的社区版这个是唯一的替代选择，让你拥有依赖分析和依赖冲突快速解决的能力。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021929494" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

### 3.3 IDEA Mind Map

思维导图对于我们需求分析和知识库关系梳理十分重要。有了这个插件以后 **IDEA** 也可以画思维导图了。而且功能还十分强大，贴图啥的应有尽有。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021931715" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="image" title="image">

### 3.4 CodeGlance

代码编辑区迷你缩放插件，可以进行代码的全局预览。来看看效果吧。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021929498" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

### 3.5 CamelCase

命名风格转换插件，可以在 kebab-case，SNAKE_CASE，PascalCase，camelCase，snake_case 和 空格风格之间切换。快捷键苹果为 **⇧+⌥+ U** ，windows 下为 **Shift + Alt +U**。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021929497" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

### 3.6 MybatisX

**Mybatis-plus** 团队为 **Mybatis** 开发的插件，提供了 **Mapper** 接口和 **XML**之间的跳转和自动生成模版的功能。另外这个名字是我起的，嘿嘿！

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021929496" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

### 3.7 MyBatis Log Plugin

另一款国人关于 **Mybatis** 的作品，评分也很高，作用是将 **Mybatis** 生成的 **sql** 还原为原始整个 **sql**。方便在开发中从日志中跟踪调试 **sql**语句。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021929495" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

### 3.8 JavaDoc

快速生成 java 注释的插件有很多，评分比较高的就是 **JavaDoc** ，注意作者为 **Sergey Timofiychuk** 。通过快捷 就可以生成注释。 **mac** 的快捷键需要自己去设置， **windows** 快捷键如下：

*  要为活动元素生成 **javadocs**，请按 **shift + alt + G**。
*  要为当前 java 文件中的所有元素生成 **javadocs**，请按 **shift + ctrl + alt + G**。
*  删除当前/选定元素上的 **javadocs** 请按 **shift + alt + Z**。
*  删除当前类所有元素上的 **javadocs**：请按 **shift + ctrl + alt + Z**。

然后自己根据实际简单改动即可，配置你可以在下面的设置面板中找到：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021929500" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

### 3.9 Git Commit Template

老是有人吐槽你提交的 **Git** 不规范？你可以试试这个插件。它提供了很好的 **Git** 格式化模版，你可以按照实际情况格式化你的提交信息。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021929499" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

### 3.10 Extra Icons

最后是一个美化插件，为一些文件类型提供官方没有的图标。来看看效果吧。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021929501" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

## 4. 总结

其它也有很好用的插件其他人已经发文安利了，我这里就不介绍了。实在不行自己写插件，官方提供了 **Intellij Platform Plugin SDK** 感兴趣的可以研究一下搞个有用的插件玩玩，说不定一举成名也未可知啊。如果你发现有好用的、好玩的插件可以通过留言分享出来。
