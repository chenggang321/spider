

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021906792" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

## 1. 前言

2020 年 **JVM** 生态报告已经出炉。该报告由英国软件安全服务商 **Snyk** 联合 **Oracle 官方刊物 The Java Magazine** 联合推出。我们来看看 **JVM** 生态圈最新的情况以及发展的趋势，这对 **Java** 开发者至关重要。

## 2. OpenJDK 的崛起

随着 **Oracle** 修改其 **JDK** 上的许可协议，用户在选择 **JDK** 的问题上有了更多顾虑。尽管甲骨文 **JDK**仍然占主导地位，占 **34%**，而去年的报告这一比例为 **70%**。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021906791" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

越来越多的开发者转向了其他 **OpenJDK** 提供商。每四个开发人员就有一个选择采用 **OpenJDK**。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021906793" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

究其原因，只有 **9%** 的参与者愿意付费使用 **JDK** ，都是钱的锅啊！另外 **JDK** 发布节奏的加快（每年 3 月、9 月）也影响了用户的 **JDK**更新策略，也间接影响了这些用户的付费决定。

## 3. Java 8 依然是主流

**Java 8** 依然占据着 **64%** ，去年为 **79%**。 2018 年 9 月发布了**Java** 的第一个长期支持（**LTS**）版本 **Java 11**, **Java 8** 的份额正在慢慢降低。参与调查的开发人员中已经有四分之一在生产环境中运行过 **Java 11**。虽然 **JDK** 的发布节奏加快了，但是每六个月就需要迁移到新版本对于公司和开发者来说也是成本巨大的。**51%** 的受访者表示当前版本的工作正常，迁移并不是必须的。而且 **55%** 的坚持使用 **LTS** 版本以获取长期支持。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021906794" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

## 4. Kotlin 成为第二 JVM 语言

**Java** 语言依然统治着 **JVM** 平台。 **Kotlin** 从去年 **2.4%** 增长到 **5.5%** 成为第二 **JVM** 语言, **Kotlin** 语法简洁，没有 **NPE** 问题，和 **Java** 之间有良好的互操作性。连 **Spring 5** 都对它进行了良好的支持。虽然目前主要 **Kotlin** 的开发者在安卓移动端，已经有一部分开发者尝试在后端使用 **Kotlin** 。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021906795" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

## 5. Spring Framework 傲视群雄

**10** 个开发者中有 **6** 个使用 **Spring Framework** 开发他们的应用程序。经过不断的打磨，**Spring** 已经演变成 **Java** 生态系统中最主要的框架。而且 **2/3** 的 **Spring** 用户使用了他们最新的主版本 **Spring 5**。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021906798" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

服务端开发框架也是 **Spring** 主宰的世界，其中 **Spring Boot** 就占据了半壁江山。还有 **31%** 的份额也属于 **Spring** 自家的 **Web** 框架 **Spring MVC** 。新出的框架 **Micronaut** 和 **Quarkus** 有可能同 **Spring** 进行竞争，但是只能等到明年才能得出结论，今年它们并没有排的上号。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021906796" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

另外在 **Web** 客户端方面依然是三大框架的天下，而且 **Jquery** 宝刀未老。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021906797" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

## 6. IntelliJ IDEA 最受开发者青睐

**IDE** 之争由来已久。我们来看看今年的统计图表：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021906799" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

**62%** 的开发者选择了 **JetBrains** 出品的 **IntelliJ IDEA** 作为 **IDE** ，其中 **80%** 为付费用户。在有其它众多免费的选择之中获得了如此大的商业成功，也是值得去研究的。 第二名 **Eclipse** 份额由去年的 **38%** 下降至 **20%** ，第三名**Apache NetBeans** 原地踏步，维持着 10%的份额。

## 7. Maven 是最常用的构建工具

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021906801" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

**Maven** 占据了 **64%** 的份额，依然是老大。作为后起之秀的 **Gradle** 一直保持上升的势头，而且很多优秀框架比如 **Spring** 都选择了 **Gradle** 。而老牌的 **Ant** 五年来一直在下跌，未来很可能退出竞争。

## 8. Jenkins 占据持续集成的主导地位

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021906800" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

和我想的一样，**Jenkins** 以高达 **58%** 的份额占据持续集成（**CI**）的主导地位。而第二选项是“**None**”， 依然有这么多人不使用任何 **CI** 服务器 ，这是一个有趣的问题。和 **Jenkins** 最近的竞争对手是**GitLab (占 6%)** 和**TeamCity （占 5%）**。

## 9. Git 是最大赢家

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021906803" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

相比较前面几个统计有一骑绝尘的情况，代码托管还是杀的热火朝天。**Gitlab** 一直作为私有存储库是非常不错的，而且 **CI/CD** 也做的不错；**GitHub** 作为公有代码托管平台非常成功，目前已经被微软收购；BitBucket 我一直觉得他们的 **SourceTree** 是一个非常好用的客户端。他们各有所长，而且差距不大。 这三家依托的都是 **Git** 托管系统。所以 **Git**才是最大的赢家。统计中我们没有看到 **SVN** 的身影，或许它真的老了。

## 10. Java 开发者分布

最后我们来看看参与此次全球调查的 **Java** 开发者都来自哪些地区吧。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021906802" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

---

以上就是对 **2020 JVM 生态报告**的解读，原版的报告可通过 [2020 JVM 生态报告](https://snyk.io/wp-content/uploads/jvm_2020.pdf) 获取。希望你能看出当前 **Java** 的现状和一些未来的趋势。相信无论是对于你学习 **Java** 和职业规划都有所帮助，如果你有自己的观点可通过留言分享出来。
