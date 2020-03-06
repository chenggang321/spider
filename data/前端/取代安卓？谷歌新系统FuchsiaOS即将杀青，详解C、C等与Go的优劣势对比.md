

<img referrerpolicy="no-referrer" data-src="/img/bVbD0o9" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

Fuchsia OS 作为 Google 正在开发的实验性操作系统，引发了大众很多猜测，比如其将取代 Android 系统。

实际上，这是谷歌开发的继 Android 和 Chrome OS 之后的第三个操作系统，并且是一个「非 Linux 系」的系统，采用了谷歌全新微内核 Zircon，并使用 Dart 和 Flutter 打造全新的 UI。

据外媒最新报道称，目前 Fuchsia OS 的工作已经基本完成，经过谷歌内部的「狗粮」测试流程后，就将正式面向市场。

## Fuchsia OS 是什么？

<img referrerpolicy="no-referrer" data-src="/img/bVbD0pa" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

虽然谷歌并未正式公布过 Fuchsia 在谷歌的战略地位，但据彭博社的报告推测，Fuchsia 是谷歌试图使用单一操作系统去统一整个生态圈的一种尝试。

Fuchsia 的目标是能够基于谷歌的生态，运行在智能手机、智能音响、笔记本电脑等任何合适的设备之上。据内部消息人士透露，谷歌计划在未来三年内，先让 Fuchsia 在智能音响和其他智能家具设备上运行起来，然后再转移到其他的终端设备上，并最终取代 Android 成为世界上最大的移动操作系统。

取代 Andriod 在很多人看来是无稽之谈，但了解 Andriod 背景情况的人就不难理解，因为 Andriod 存在着很多无法解决的弊端。

事实上，Android 早在 iPhone 发布之前就已经构建好了，最初是被用作数码相机的操作系统。iPhone 发布后，Android 才被临时移植到手机，并一直沿用至今。

但随着互联网的发展，尤其是物联网和 5G 的逐渐开始落地，谷歌在 Android 上面临许多挑战。例如，Android 大部分内容并不符合谷歌对智能设备的未来期望，比如语音交互方面、为整个安卓生态系统内的设备推送更新等，而 Fuchsia 的出现就是为了解决这些问题。

但替代 Andriod 一定是一个缓慢且漫长的过程。目前市面上很多的手机和智能硬件厂商都还非常依赖于 Android，这是谷歌不得不考虑的问题。

如果谷歌真的开始大力推进 Fuchsia 的市场化，这对于整个智能终端市场来说都是一个艰难的转折变化。谷歌也将面临着市场流失的风险。

## Fuchsia 编辑语言策略

<img referrerpolicy="no-referrer" data-src="/img/bVbD0pc" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

Fuchsia 的开发者网站上公布了一份 Fuchsia 编辑语言策略，该文档对 Fuchsia 涉及到的编程语言分别进行了优缺点分析以及对各语言的使用策略。

从该文档中我们能够了解到该系统的设计目的、思路和未来的发展方向。比如其对 C 语言的解读是这样的：

优点：

*  C 是一种广泛使用的语言。该语言具有易于理解的特性，已在很长一段时间内保持稳定，并且过去已用于构建类似的系统。该语言具有成熟的工具链和相关的开发人员工具；
*  C 具有稳定的 ABI，这使得 Fuchsia SDK 包含预编译的二进制文件，供最终开发人员重复使用；
*  许多语言可以使用外部函数接口与 C 互操作。支持 C 可使最终开发人员更轻松地将这些语言与 Fuchsia 集成在一起；
*  我们目前的最终开发人员已经在使用该语言。

缺点：

*  对异步编程的支持很弱。；
*  用该语言编写的程序通常会由于该语言缺乏内存安全性而导致安全漏洞。
*  用该语言编写的程序经常包含资源泄漏，因为该语言没有提供自动释放资源的功能；
*  与 C ++ 相比，类型安全性较弱。简单地将某些 C 代码重新编译为 C++ 通常会导致编译器错误，这些错误会掩盖代码中的潜在错误。

使用策略：

*  终端开发者支持使用 C；
*  在 Fuchsia Platform Source Tree 中，不鼓励使用 C 的新用法；
*  C 被批准用于 Fuchsia Platform Source Tree 中：用于低级系统编程，包括内核中的编程；以及用于定义到共享库和其他系统组件的 ABI 稳定接口；

因为文档内容较多，就不一一列举了，文末有文档的链接地址。总结一下大概就是：

*  C：被支持用于终端开发者
*  C++：被支持用于终端开发者
*  Dart：被支持用于面向非驱动程序的终端开发者
*  Rust：终端开发者不支持使用 Rust
*  Go：仅被批准在网络技术栈中使用
*  Python：终端开发者不支持使用 Python

## Fuchsia 即将进入「狗粮」测试

<img referrerpolicy="no-referrer" data-src="/img/bVbD0ph" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">

除了正常的公开测试阶段（如 Alpha 和 Beta）外，Google 还有很多内部测试阶段，比如「dogfood(狗粮)」。

「狗粮」测试期，意思是让开发者亲自安装使用操作系统，通过测试找到缺点和不足，这个阶段设置在普通用户测试之前。

说个题外话，谷歌的测试流程真的很有意思。

除了「狗粮」外，谷歌还有相当多的内部测试阶段，例如当 Google + 还处于早期开发阶段时，在进行全公司范围的「狗粮测试」之前，他们做了一个小范围的「fishfood（鱼食）」测试...

此外，谷歌有时在「鱼食」和「狗粮」之间还有一个范围稍微大一点的「teamfood（团队食品）」测试阶段，「狗粮」通常是在生产或公开测试之前的最后一个，几乎是全公司的内部测试。

在过去的一年里，有迹象表明至少部分 Fuchsia OS 系统已经通过了「鱼食」和「团队食品」的测试，马上就要进行「狗粮」阶段的测试。

虽然还未正式开放，但目前已有很多企业加入了 Google Fuchsia 生态。据 Fuchsia 中文社区官方发布，目前可以公布的 14 家公司的名单是：索尼、三星、华为、OPPO、Vivo、夏普、ARM、高通、联发科、Imagination Technologies、意法半导体、小米、清华紫光展讯、GlobalEdge Software。

从上面可以看到中国公司是最多的，光大陆就已经有了 5 家公司，如果算上联发科，中国公司将有 6 家，绝对是目前 Fuchsia 生态参与最多的国家。而 Google 的母国美国反而只有高通一家公司。

## 国产操作系统进展如何？

上文我们写到，有很多国内企业参与了谷歌 Fuchsia 生态，这是放弃了自研操作系统么？并不是，可能只是无奈之举和一种更为泛化的尝试策略。

在很长时间里，国产操作系统一直都处于一个尴尬的境地，尤其是 2006 年的那一起「国产系统造假事件」，让市场和大众舆论对国产操作系统的风评降入谷底。当时也有业内人士表示，很多国产操作系统厂商的出发点只在于获取国家的补贴，对于实际的研发和能否商业化只是“走个过场”。

然而，随着全球局势的变化，对于成熟且自主可控的国产操作系统还有自主研发芯片的需求已经迫在眉睫。近两年我们也能看到，市场关于国产操作系统的声音已经越来越大，因为越来越多的关注和国内厂商的投入，也正在逐渐有所突破。

2020 年，国产操作系统能真正取得突破性的进展、开始占据一席之地么？我们拭目以待。


>
>Fuchsia OS 中文社区：[https://fuchsia-china.com/](https://fuchsia-china.com/)
>
>Fuchsia 官方代码：[https://GoogleSource.com](https://GoogleSource.com)
>
>Fuchsia OS 源码的国内镜像：[https://fuchsia-china.com/fuc...](https://fuchsia-china.com/fuchsia-source-code-china-mirror/)
>
>Fuchsia Programming Language Policy：[https://fuchsia.googlesource....](https://fuchsia.googlesource.com/fuchsia/+/refs/heads/master/docs/project/policy/programming_languages.md)

-END-

<img referrerpolicy="no-referrer" data-src="/img/bVbDJvL" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="clipboard.png" title="clipboard.png">
