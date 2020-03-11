

内容来自 Guide 哥的读者朋友大厂的真实面试经历，Guide哥整理！希望通过这些问题，能够让大家学习更有方向，而不是单纯把这些问题都背会了！

另外，内容会继续完善，欢迎你在评论区说出你遇到的高频面试题！

### Java

**基础：**

1. Java 反射？反射有什么缺点？你是怎么理解反射的（为什么框架需要反射）？
2. 谈谈对 Java 注解的理解，解决了什么问题？
3. 内部类了解吗？匿名内部类了解吗？
4. BIO和NIO区别,4核cpu，100个http连接，用BIO和NIO分别需要多少个线程
5. HashMap的负载因子。

**jvm:**

1. jvm 内存结构
2. jvm 调优参数
3. 什么是类加载？
4. 何时类加载？
5. java的类加载流程？
6. 知道哪些类加载器。类加载器之间的关系？
7. 类加载器之间的关系？
8. **类加载器的双亲委派** （结合tomcat说一下双亲委派）
9. **为什么需要双亲委派**
10. Java内存模型
11. 栈中存放什么数据，堆中呢？
12. 大对象放在哪个内存区域
13. 堆区如何分类
14. 垃圾回收有哪些算法
15. GC的全流程
16. GC中老年代用什么回收方法？

**多线程：**

1. **Java线程池有哪些参数？阻塞队列有几种？拒绝策略有几种？**
2. 死锁

**设计模式：**

1. 阅读Spring源码的时候什么设计模式最让你影响深刻？如何使用？
2. 单例模式，单例模式的使用场景
3. 观察者模式，观察者模式的使用场景

### Spring

1. spring boot和spring的区别
2. ioc 和 aop(ioc流程、aop实现原理)、spring aop异常处理、当一段代码被try catch后再发生异常时，aop的异常通知是否执行，为什么？
3. spring bean的生命周期说一下
4. spring data jpa底层是什么？
5. hibernate和mybatis区别
6. spring boot 过滤器
7. spring boot 拦截器
8. Spring动态代理默认用哪一种
9. 写出spring jdk动态代理的实现。
10. 画出spring boot处理一个http请求的全过程

**推荐**

1. 手写实现Spring核心功能： [https://github.com/jinzzzzz/spring-demo](https://github.com/jinzzzzz/spring-demo)

### 权限认证

1. 认证 (Authentication) 和授权 (Authorization)的区别是什么？
2. 什么是Cookie ? Cookie的作用是什么?如何在服务端使用 Cookie ?
3. Cookie 和 Session 有什么区别？如何使用Session进行身份验证？
4. 如果没有Cookie的话Session还能用吗？
5. 为什么Cookie 无法防止CSRF攻击，而token可以？
6. 什么是 Token?什么是 JWT?如何基于Token进行身份验证？
7. 什么是OAuth 2.0？
8. 什么是SSO(单点登录)


>
>[https://snailclimb.gitee.io/j...](https://snailclimb.gitee.io/javaguide/#/docs/system-design/authority-certification/basis-of-authority-certification)

### 微服务/分布式

1. 为什么要网关？
2. 限流的算法有哪些？
3. 为什么要分布式 id ？分布式 id 生成策略有哪些？
4. 了解RPC吗？有哪些常见的 RPC 框架？
5. 如果让你自己设计 RPC 框架你会如何设计？
6. Dubbo 了解吗？Spring Cloud 了解吗？

### 数据库

1. 非关系型数据库和关系型数据库的区别？
2. **事务的四大特性**
3. **MySQL 事务隔离级别？默认是什么级别？**
4. **乐观锁与悲观锁的区别**
5. 数据库两种存储引擎的区别
6. 最左前缀匹配原则及它的原因
7. 大表优化的思路
8. **where和having的区别**
9. 分库分表
10. **explain 命令**

**索引**

1. **如何加快数据库查询速度**
2. **聚集索引和非聚集索引的区别**
3. **什么时候不该使用索引？**
4. **索引底层的数据结构？**
5. **B+树做索引比红黑树好在哪里？**
6. 

**Redis:**

1. 项目中 redis 是怎么用的？解决了什么问题？
2. 说一下有缓存情况下查询的流程以及有缓存情况下修改的流程。
3. redis有哪些数据结构
4. redis内存满了怎么办
5. redis内存淘汰算法除了lru还有哪些
6. 分布式缓存可能出现的问题
7. 缓存穿透问题

### 网络

1. **计算机网络的一些常见状态码**
2. ping 所使用的协议
3. **TCP的三次握手与四次挥手的内容**
4. **TCP为什么连接是三次握手而断开是四次握手**
5. TCP与UDP的区别及使用场景
6. **一次完整的HTTP请求所经的步骤**
7. http 如何保存登录信息(没太搞懂意思)
8. **Cookie 和 Session的关系**

### 算法和数据结构

**算法**

1. LRU 算法了解吗？你能实现一个吗？
2. 写排序算法（快排、堆排）

**数据结构**

1. 布隆过滤器了解吗？

### 设计题

1. 假如有10亿个数，只有一个重复，内存只能放下5亿个数，怎么找到这个重复的数字？
2. 如何设计一个秒杀系统（服务端、数据库、分布式）？分布式系统的设计？
3. 有一个服务器专门接收大量请求，怎么设计？
4. 如果让你自己设计 RPC 框架你会如何设计？
5. 怎么快速出现一个stackoverflow错误？

### 其他问题

1. 自我介绍。
2. 说说你的项目中的亮点有哪些。
3. 画一下你的项目的架构图。
4. **Restful 了解吗？简单说一下自己对它的认识，如果我要返回一个 boolean 类型的数据怎么办？**

### 经验总结

1. 多面试，不要害怕失败，多总结经验。
2. 尽早准备，不论是找工作前、面试前还是面试后。
3. 熟悉自己的简历。
4. 电话和视频面试很平常，面试前提前准备一下。
5. 坚持！offer 虽然可能会迟到，但是只要不放弃，就一定不会缺席。

**作者介绍:**  Github 70k Star 项目  **[JavaGuide](https://github.com/Snailclimb/JavaGuide)**（公众号同名） 作者。每周都会在公众号更新一些自己原创干货。公众hao后台回复“1”领取Java工程师必备学习资料+面试突击pdf。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021978439" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>
