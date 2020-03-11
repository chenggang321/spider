

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021973908" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

## 1. 前言

过滤器作为 **Spring Security** 的重中之重，我们需要了解其中的机制。这样我们才能根据业务需求的变化进行定制。今天来探讨一下 **Spring Security** 中的过滤器链机制

## 2. Spring Security 过滤器链

客户端（APP 和后台管理客户端）向应用程序发送请求，然后应用根据请求的 **URI** 的路径来确定该请求的过滤器链（**Filter**）以及最终的具体 **Servlet** 控制器（**Controller**）。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021973907" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

从上图我们可以看出 **Spring Security** 以一个单 **Filter（FilterChainProxy）** 存在于整个过滤器链中，而这个 `FilterChainProxy` 实际内部代理着众多的 **Spring Security Filter** 。这简直就是套娃啊！

## 2.1 过滤器链的形成过程

再多说一点 **Filter** 们的初始化过程，首先 **Filter** 们按照一定的顺序被 `SecurityBuilder` 的实现来组装为 `SecurityFilterChain` ，然后通过 `WebSecurity` 注入到 `FilterChainProxy` 中去，接着 `FilterChainProxy` 又在 `WebSecurityConfiguration` 中以 `springSecurityFilterChain` 的名称注册为 **Spring Bean** 。实际上还有一个隐藏层 `DelegatingFilterProxy` 代理了 `springSecurityFilterChain` 注入到最后整个 **Servlet** 过滤器链中。 简单画了个图;

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021973909" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>


>
>**Spring Security**
>
>**Filter**
>
>**Spring IoC**

**Spring Security** 允许有多 条过滤器链并行，**Spring Security** 的 `FilterChainProxy` 可以代理多条过滤器链并根据不同的 **URI** 匹配策略进行分发。但是每个请求每次只能被分发到一条过滤器链。如下图所示：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021973910" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

关于 **Filter** 的其它细节可以通过 [相关文章](https://www.felord.cn/spring-security-filters.html) 了解。


>
>`SecurityFilterChain`

## 4. 总结

今天我们通过对 **Spring Security** 中 过滤器链机制，对于深入学习 **Spring Security** 有着至关重要的意义。 有什么问题和心得请留言反馈。
