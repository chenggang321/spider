

<img referrerpolicy="no-referrer" data-src="/img/bVbDRah" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

古人云：好代码万里挑一，烂代码千篇一律。

作为一名开发者，除了我自己写的，别人的代码在我眼里大部分都是「烂代码」。但苦于资历尚欠，所以烂代码见得并不是很多，也没总结出来什么规律。但 GitHub 上的这个项目，实现了我多年来的梦想。

## 垃圾代码书写准则

<img referrerpolicy="no-referrer" data-src="/img/bVbDRat" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

这个项目其实是一个垃圾代码书写准则的列表，一共有 19 项规范。这个项目目前在 GitHub 上已经获得了 600+ Star，我觉得他的潜力绝对不止于此

友情提示：下方截图中的「Good」代表符合「烂代码原则」，「Bad」则代表不符合「烂代码原则」，不要搞错哦~

**1. 以一种容易被混淆的方式命名变量**

<img referrerpolicy="no-referrer" data-src="/img/bVbDRau" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

如果我们键入的东西越少，那么就有越多的时间去思考代码逻辑等问题。如下图所以，将变量命名为「a」，谁也不知道代表什么意思，相反，命名为「age」，就是普普通通的一般货色了。

**2. 变量/函数混合命名风格**

<img referrerpolicy="no-referrer" data-src="/img/bVbDRaw" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

为不同庆祝一下。一般人会把变量名称和函数名称设定为同一格式，但使用不同风格才能既体现我们的编码能力，还能体现出我们的起名能力，一举两得。

**3. 不要写注释**

<img referrerpolicy="no-referrer" data-src="/img/bVbDRaB" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

这一点作者给了一个官方吐槽：反正没人会读你的代码，为什么要写注释？这一点我深以为然，写注释的人是对自己代码没有信心的体现，难道不是么？（手动狗头

**4. 使用母语写注释**

<img referrerpolicy="no-referrer" data-src="/img/bVbDRaP" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

如果您违反了“无注释”原则，那么至少尝试用一种不同于您用来编写代码的语言来编写注释。

比如母语是英语的开发者，可以用日文、韩文或俄文来做注释，实现一边写代码，一边进行外语学习。我们国内的开发者也可以尝试用一些小语种来写注释，毕竟我们是神秘的一群人。

**5. 尽可能混合不同的格式**

<img referrerpolicy="no-referrer" data-src="/img/bVbDRaQ" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

为不同庆祝一下。在符合代码规范的情况下，尽可能的混合不同的格式，比如示例中的单引号和双引号。

**6. 尽可能把代码写成一行**

<img referrerpolicy="no-referrer" data-src="/img/bVbDRaR" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

相信大家都看过那些“一行代码xxx”的铁子，为什么他们一行代码实现大家就觉得很酷，我们写成一行就不行呢？

**7. 不要处理错误**

<img referrerpolicy="no-referrer" data-src="/img/bVbDRaS" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

无论何时发现错误，都没有必要让任何人知道它。没有日志，没有错误弹框。

**8. 广泛使用全局变量**

<img referrerpolicy="no-referrer" data-src="/img/bVbDRaT" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

作者说这是为了符合全球化的原则，有道理，有格局。

**9. 构建你用不上的变量**

<img referrerpolicy="no-referrer" data-src="/img/bVbDRaX" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

以防万一。虽然现在用不上，万一之后有用呢？abc 是铁三角，永远不能分割。

**10. 如果语言允许，不要指定类型和/或不执行类型检查。**

<img referrerpolicy="no-referrer" data-src="/img/bVbDRaZ" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

没有类型才是最好的类型。

**11. 你应该要有运行不到的代码**

<img referrerpolicy="no-referrer" data-src="/img/bVbDRa9" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

作为「Plan B」，你需要有一些运行不到的代码，这表示你做了额外的思考。

**12. 三角法则**

<img referrerpolicy="no-referrer" data-src="/img/bVbDRbj" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

如果写代码是一项艺术，那么三角法则显然是最有艺术设计感的了。

**13. 混合缩进**

<img referrerpolicy="no-referrer" data-src="/img/bVbDRbs" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

避免缩进，因为它们会使复杂的代码在编辑器中占用更多的空间。如果你不喜欢回避他们，那就捣个乱，使用混合缩进策略。（这条实在洗不动了）

**14. 不要锁住你的依赖项**

<img referrerpolicy="no-referrer" data-src="/img/bVbDRbt" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

以非受控方式更新每个新安装的依赖项。为什么坚持使用过去的版本，让我们使用最先进的库版本。

**15. 长函数比短函数好**

不要把程序逻辑分成一个个代码块。如果 IDE 的搜索停止，而您无法找到所需的文件或函数，该怎么办?

*  一个文件中 10000 行代码是 OK 的；
*  一个函数体 1000 行代码是 OK 的；
*  处理许多服务(第三方和内部，也有一些工具、数据库手写 ORM 和 jQuery 滑块)在一个' service.js ' ?也是 OK 的。

**16. 不要测试你的代码**

这是重复的并且不需要的工作。

**17. 避免代码风格统一**

编写您想要的代码，特别是在一个团队中有多个开发人员的情况下。这是一个“自由”的原则。不特殊一些，怎么体现自己的特立独行！

**18. 构建新项目不需要 README 文档**

从一开始我们就应该保持不写 README 的好习惯（这个 GItHub 项目就没有 README，作者也是知行合一了）。

**19. 保存不必要的代码**

不要删除不用的代码，最多是注释掉。毕竟写过的每一行代码都是我们曾经流过的汗水，删掉了别人怎么知道我们写过呢~

## 玩归玩，闹归闹，别拿工作开玩笑

<img referrerpolicy="no-referrer" data-src="/img/bVbDRbO" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

有一句话流传的挺广：“代码是给人读的，顺便让机器执行。”

我觉得很有道理，虽然代码是机器语言，但使用和调试还是由人来进行的，所以仍然需要最大程度的满足人性化的需求和设计思路。

看完那么多烂代码的设计规范，其实就是图一乐，我们也能从这些烂代码规范中了解到想写出优秀的的代码应该避免踩到哪些坑。下面是收集的一些资料，大家可以先收藏，没事儿的时候看一看，争取人人都能写得一手好代码~

## 相关资料

烂代码指南：[https://github.com/trekhleb/s...](https://github.com/trekhleb/state-of-the-art-shitcode)

JavaScript 代码规范（中文版）：[https://github.com/BingKui/ja...](https://github.com/BingKui/javascript-zh)

谷歌开源代码评审规范：[https://github.com/google/eng...](https://github.com/google/eng-practices)

谷歌风格指南：[http://google.github.io/style...](http://google.github.io/styleguide/)

开发人员需要了解的定律法则：[https://github.com/dwmkerr/ha...](https://github.com/dwmkerr/hacker-laws)

<img referrerpolicy="no-referrer" data-src="/img/bVbDJvL" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">
