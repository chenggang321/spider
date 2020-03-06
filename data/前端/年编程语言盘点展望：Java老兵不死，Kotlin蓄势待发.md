

在进入新的十年之际，各行各业都在进行盘点与展望。SegmentFault 作为开发者社区与科技行业的垂直媒体，一直关注行业的发展与相关动态，近期已陆续为大家整理了各大平台、社区针对技术领域作出的预测与盘点。

今天，继续为大家粗译（文末有原文地址，粗译仅供大家前期了解，建议阅读英文原文）O'Reilly 发布的编程语言发展展望 —— 《Where programming languages are headed in 2020》。

该盘点及分析由数位编程专家整理得出，包含了大量他们对于某些经典编程语言以及新兴编程语言的思考以及基于行业的分析。

## Python

<img referrerpolicy="no-referrer" data-src="/img/bVbDwXH" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="图片描述" title="图片描述">

今年 Python 的最大新闻是，Python 之父吉多·范·罗苏姆（Guido van Rossum）正式退休，并将 Python 交给了 Python 指导委员会。到目前为止，这次权力转移并没有出现“阵痛”，正如《Python Crash Course》的作者 Eric Matthes 所认为的那样，这是很正常的，因为“ Guido 在很长一段时间里仍将保持自己在社区中的角色。” 此外，2020 年还将终止对 Python 2.7 的支持，这很可能导致坚持使用 Python 2.7 的人变得很难受。

但不管怎样，Python 仍然是数据科学的首选语言。

对于 Matthes 而言，Python 令人兴奋的一个方面是“来自一个社区的各种有趣且关键的项目已经诞生了，而社区已经如此有意识地建立了这么长时间。” Python 指导委员会成员和 CPython 的核心开发人员 Carol Willing 也庆祝了这些项目，例如 Binder 服务，该服务通过在 Jupyter Notebook 中创建可执行环境来促进可重复的研究，尤其是当它们超出其最初的目标时。

她指出，“活页夹去年在许多 Python 会议上被广泛用于教学讲习班和教程。” Willing 还向 CircuitPython 和 Mu 项目大声疾呼，问道：“谁会不喜欢硬件呢，闪烁的 LED、传感器，以及使用 Mu 的用户友好的编辑器，这对成年人和孩子来说不都是很棒的选择？”

## Java

<img referrerpolicy="no-referrer" data-src="/img/bVbDwXI" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="图片描述" title="图片描述">

今年对 Java 来说，主要都是好消息。本·埃文斯（Ben Evans）解释说：“再一次，关于 Java 灭亡的传言再一次成为了平台批评者的一厢情愿。”

但这并不是一帆风顺的。正如我们去年指出的那样，Java 11 于 2018 年 9 月发布并带来了许多新功能，包括许多在使用容器方面具有明显优势的重要功能。但是，根据 JetBrains 的调查，这次新版本的推出并没有带来广泛的采用，超过 80％ 的开发人员仍在使用 Java 8。

Evans想知道：“这是否意味着人们没有像我们所知道的那样在容器中运行Java？还是人们只是不知道在容器中使用 Java 11 的好处？”

尽管采用速度缓慢，但 Java 的六个月发布节奏一直在不断发展-Java 12于2019年3月下降，Java 13于9月问世。根据 Trisha Gee 的说法，它确实开始显示其价值：

每个版本很小，但是可以预见。尽管它们并不都具有令人兴奋的新语言更改，但是您可以看到该语言正在稳步向前发展。

此外，它支持预览功能的这种想法，我认为我们切换表达式的工作效果非常好 —— 开发人员必须尝试使用该功能并根据使用感觉来提供真实的反馈，而不是抽象的，概念性的反馈想法。在 Java 13 中，开关表达式的语法进行了少量更改，这是有可能的，因为它是预览功能，并且没有固定设置。

当 Oracle 将 Java SE 迁移到基于订阅的模型时，2019 年收获了另一个惊喜。但是，正如《Learning Java》的合著者 Marc Loy 指出的那样，“随着 OpenJDK 的热情增加，整个 Java 社区正在面临一种‘不幸’的变化。”

至于刚刚到来的 2020 年，埃文斯（Evans）建议 2020 年可以持续关注 2019 年的发展趋势：

我们将如何接近 Valhalla 项目的生产版本？提供模式匹配和代数数据类型（Project Amber）的增量策略是否会奏效？Quarkus 会履行其承诺和早期粉丝的信念吗？2020 年将成为 Kotlin 会在 Android 领域迈出跨跃性的重要一步吗？

这是激动人心的时刻，我们正在过渡到新的事物，并且正在发生很多事情。

## Kotlin

<img referrerpolicy="no-referrer" data-src="/img/bVbDwXC" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="图片描述" title="图片描述">

谷歌在 2019 年 5 月宣布 Kotlin 现在是 Android 应用开发人员的首选语言，这表明了该语言已经被广泛采用。

尽管许多 Android 开发人员尚未完全迁移到 Kotlin，但已经迁移的人都知道它提供的好处。《Head First Kotlin》的作者 Dawn 和 David Griffiths 分享了 Kotlin崛起背后的一些原因：

对于由 IDE 公司创建的语言，Kotlin 拥有良好的工具支持水平也就不足为奇了。用于代码合同的实验性 DSL 使开发人员能够提供有关代码行为方式的保证。您的功能有副作用吗？是否可以保证返回非空值？代码合同允许您做出这些承诺，并且编译器可以使用它们来放松编译时检查。

现在，不同的 Kotlin 平台之间的障碍也正在被打破。“expect”/”actual”限定符使开发人员可以更轻松地编写跨 Java / Native / JS 环境兼容的代码。序列化支持意味着将 JSON 数据转换为 Kotlin 对象更加容易，反之亦然。

希望看到 Kotlin 继续保持惊人的增长 —— 并且不仅仅是在 Android 中。JetBrains 开发人员倡导团队负责人 Hadi Hariri 指出 Kotlin / Everywhere 的成功，使得人们可以在 Android，Google Cloud Platform 和多平台开发中学习 Kotlin 的基本知识和最佳实践，并用数据举例证明：

“从 5 月到 11 月，我们已经成功地覆盖了 86 个国家/地区的 30,000人。KotlinConf 在 2019 年连续三年销售一空，有 1,700 多名与会者。这尤其表明，开发者对该语言的兴趣和采用正在增长。”

## Go

<img referrerpolicy="no-referrer" data-src="/img/bVbDwXD" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="图片描述" title="图片描述">

当 Gophers 回顾 2019 年时，他们可能会记得尝试提案的传奇故事。Go 开发人员兼作家 Jon Bodner 解释说：

关于 Go 的最常见的抱怨之一是错误处理太冗长。因此，在 6 月初，Go 核心开发人员建议添加一个名为 try 的新内置函数。GitHub 的 issue 现在已打开，以讨论此新功能。一个月之内，有将近 800 条评论，其中大多数是负面的。反对这项新功能的人们感到，这种改变使代码过于“不可思议”，并掩盖了逻辑流程。审查反馈后，Go 小组将提案标记为已完成，并于 7 月 16 日关闭。

这个过程值得注意的不是功能的失败，而是，正如 Bodner 所描述的那样，“过程发生的方式：提出了一个功能，讨论受到尊重，但许多人认为更改与 Go 的风格不一致。最后，管理语言的人决定尊重多数意见。这就是开发人员谈论社区时的意思。”

2020 年应该使 Go 的 Contracts 规范更加清晰，这就是众所周知的 Generics 提案。

根据 Bodner 的说法，“ Go 似乎将使用一种与其他语言略有不同的方法来实现泛型，但它很适合 Go 的习惯用法。” 希望它将使 Go 保持其惯用的风格，同时添加开发人员发现在其他语言中有用的功能。

## Rust

<img referrerpolicy="no-referrer" data-src="/img/bVbDwXE" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="图片描述" title="图片描述">

我们与《Programming Rust》的合著者 Jim Blandy 进行了沟通，以了解他对 Rust 在 2019 年的进步的看法如何变化。

去年，他指出，“ Rust 长期以来一直以一种形式或另一种形式支持异步编程，但是异步函数为这种代码提供了语法与 Rust 以前的产品相比，这是一个重大改进。” 

他对 Rust 语法进行改进的希望是否实现了？是的，最终：布兰迪解释说，异步/等待语法直到 2019 年 11 月 7 日发布的 1.39 版才变得稳定。

“最初，我们希望异步/等待语法可以成为 Rust 2018 版的一部分，但它花了更长的时间才把事情做好。” 不过，他对 2020 年 Rust 对 Rust 的意义寄予了很高的期望：“将异步集成到语言中可以使借阅检查器了解您的操作，因此异步代码看起来像惯用的 Rust。

Rust 社区也对 WebAssembly 感到兴奋，今年 WebAssembly 成为了 C / FFI 的理论替代品，用于需要便携式，高性能模块的生态系统。正如 Rust 专家 Nathan Stocks 指出的那样：“您也可以使用轻型沙箱！” 令 Stocks 印象最深的是“有多少理论已经成功原型化并得到了证明。”

以前，我曾把WebAssembly纯粹视为一个编译目标，以便在浏览器中运行非JS语言的代码。能够从浏览器之外的任何语言使用Web程序集的功能令人不寒而栗。

## Swift

<img referrerpolicy="no-referrer" data-src="/img/bVbDwXF" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="图片描述" title="图片描述">

去年 Swift 发生的最大的故事是苹果公司用于在所有苹果设备上设计用户界面的最新框架 SwiftUI 的发布，以及 TensorFlow 的 Swift 版本。

正如 Timirah James 解释的那样，SwiftUI 的声明性已经赢得了开发人员的广泛关注，并且已经被视为 UIKit 的未来继任者。

至于 TensorFlow 的 Swift，Buttfield-Addison 称之为“ Swift 的根本新用途”。他解释说：“ Swift 一直是一种出色的应用程序开发和系统编程语言，并且是一种新兴的 Web 和后端开发语言，但是现在，借助 Swift for TensorFlow，它也是一个强大的 ML 框架。” 原因如下：

Swift for TensorFlow 由一个团队开发，该团队包括 Swift 的原始创建者 Chris Lattner，并提供（或将在完成后提供）机器学习和数值计算所需的一切。最令人惊讶的是，Swift 的基础编译器框架和设计使对具有可自动区分功能的可区分编程的完全一流支持成为可能。

完整的语言可区分编程将使以前不可能的事情成为可能：最好的例子是在构建神经网络时能够使用标准编程调试器逐步进行反向传播并调试派生类。

Swift for TensorFlow 还为 Swift 提供了完整的 Python 支持，使数据科学家可以使用清晰的 Swift 代码将所需的有用和熟悉的 Python 框架进行混合和匹配。

展望未来，James 和 Buttfield-Addison 都很高兴看到 Swift 所采取的新方向，James 指出“ Swift 在移动社区以外的不同社区和堆栈中迅速采用，特别是在无服务器领域，” Buttfield-Addison 呼吁“令人惊叹的网络开发框架（如 Kitura）以及各种针对特殊领域的令人惊叹的框架……例如 SwiftPlot，它是 Python 中无处不在的 Matplotlib 的 Swift 本机版本。”

## 未来是什么样的？

变化是不可避免的，并且随着编程语言继续倾向于针对云，微服务，大数据和机器学习中的新趋势进行优化，每种语言及其生态系统将继续以自己独特的方式进行适应。

某些语言可能会在 2020 年发布大版本，比如 C ++ 20 将于今年夏天发布，Scala 3.0 有望在 2020 年末发布。但很明显，即使是最小的更改也可能在程序员的日常生活中引起巨大的波澜。


>
>
>[https://www.oreilly.com/radar...](https://www.oreilly.com/radar/where-programming-languages-are-headed-in-2020/)
>

<img referrerpolicy="no-referrer" data-src="/img/bVbDfMG" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">
