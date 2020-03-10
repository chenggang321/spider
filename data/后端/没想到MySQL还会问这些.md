

## 前言

>**文本已收录至我的GitHub精选文章，欢迎Star**
>
>[https://github.com/ZhongFuCheng3y/3y](https://github.com/ZhongFuCheng3y/3y)

在前一阵子，大哥问过我：”你知道MySQL的原子性是怎么保证的吗“。我懵逼了，MySQL怎么保证原子性？我不会啊。

谁都知道在事务里边原子性的意思：”**一个事务包含多个操作，这些操作要么全部执行，要么全都不执行**“

于是大哥就给我讲：”用的就是 `undo log` 啊“。

我：”卧槽，又是知识盲区“

后来在网上翻了一下，MySQL里边还有几种常见的`log`，分别为：

*  `undo log`
*  `binlog`
*  `redo log`

如果你也未曾关注过这些`log`，麻烦在评论区给我留个言，**让我觉得不是只有我一个人这么菜，行不行**？

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021964634" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

后来我又去搜了一下，其实这几种log在**面试**的时候也经常会问到，这篇文章以最简单的方式来讲讲，希望对大家有帮助。

## 一、什么是binlog

`binlog`其实在日常的开发中是听得很多的，因为很多时候数据的更新就依赖着`binlog`。

举个很简单的例子：我们的数据是保存在数据库里边的嘛，现在我们对某个商品的某个字段的内容改了（数据库变更），而**用户检索的出来数据是走搜索引擎的**。为了让用户能搜到最新的数据，我们需要把引擎的数据也改掉。

一句话：**数据库的变更，搜索引擎的数据也需要变更**。

于是，我们就会监听`binlog`的变更，如果`binlog`有变更了，那我们就需要将变更写到对应的数据源。


>
>`binlog`

`binlog`记录了数据库表结构和表数据变更，比如`update/delete/insert/truncate/create`。它不会记录`select`（因为这没有对表没有进行变更）

>`binlog`

`binlog`我们可以简单理解为：存储着每条变更的`SQL`语句（当然从下面的图看来看，不止SQL，还有XID「事务Id」等等）

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021964632" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

>`binlog`

主要有两个作用：**复制和恢复数据**

*  MySQL在公司使用的时候往往都是**一主多从**结构的，从服务器需要与主服务器的数据保持一致，这就是通过`binlog`来实现的
*  数据库的数据被干掉了，我们可以通过`binlog`来对数据进行恢复。

因为`binlog`记录了数据库表的变更，所以我们可以用`binlog`进行复制（主从复制)和恢复数据。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021964637" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

## 二、什么是redo log

假设我们有一条sql语句：

```
update user_table set name='java3y' where id = '3'
```

MySQL执行这条SQL语句，肯定是先把`id=3`的这条记录查出来，然后将`name`字段给改掉。这没问题吧？

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021964633" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

实际上Mysql的基本存储结构是**页**(记录都存在页里边)，所以MySQL是先把这条记录所在的**页**找到，然后把该页加载到内存中，将对应记录进行修改。

现在就可能存在一个问题：**如果在内存中把数据改了，还没来得及落磁盘，而此时的数据库挂了怎么办**？显然这次更改就丢了。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021964635" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

如果每个请求都需要将数据**立马**落磁盘之后，那速度会很慢，MySQL可能也顶不住。所以MySQL是怎么做的呢？

MySQL引入了`redo log`，内存写完了，然后会写一份`redo log`，这份`redo log`记载着这次**在某个页上做了什么修改**。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021964636" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

其实写`redo log`的时候，也会有`buffer`，是先写`buffer`，再真正落到磁盘中的。至于从`buffer`什么时候落磁盘，会有配置供我们配置。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021964640" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

写`redo log`也是需要写磁盘的，但它的好处就是`顺序IO`（我们都知道顺序IO比随机IO快非常多）。

所以，`redo log`的存在为了：当我们修改的时候，写完内存了，但数据还没真正写到磁盘的时候。此时我们的数据库挂了，我们可以根据`redo log`来对数据进行恢复。因为`redo log`是顺序IO，所以**写入的速度很快**，并且`redo log`记载的是物理变化（xxxx页做了xxx修改），文件的体积很小，**恢复速度很快**。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021964638" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

## 三、binlog和redo log

看到这里，你可能会想：`binlog`和`redo log` 这俩也太像了吧，都是用作”恢复“的。

其实他俩除了"恢复"这块是相似的，很多都不一样，下面看我列一下。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021964643" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

### 存储的内容

`binlog`记载的是`update/delete/insert`这样的SQL语句，而`redo log`记载的是物理修改的内容（xxxx页修改了xxx）。

所以在搜索资料的时候会有这样的说法：`redo log` 记录的是数据的**物理变化**，`binlog` 记录的是数据的**逻辑变化**

### 功能

`redo log`的作用是为**持久化**而生的。写完内存，如果数据库挂了，那我们可以通过`redo log`来恢复内存还没来得及刷到磁盘的数据，将`redo log`加载到内存里边，那内存就能恢复到挂掉之前的数据了。

`binlog`的作用是复制和恢复而生的。

*  主从服务器需要保持数据的一致性，通过`binlog`来同步数据。
*  如果整个数据库的数据都被删除了，`binlog`存储着所有的数据变更情况，那么可以通过`binlog`来对数据进行恢复。

又看到这里，你会想：”如果整个数据库的数据都被删除了，那我可以用`redo log`的记录来恢复吗？“**不能**

因为功能的不同，`redo log` 存储的是物理数据的变更，如果我们内存的数据已经刷到了磁盘了，那`redo log`的数据就无效了。所以`redo log`不会存储着**历史**所有数据的变更，**文件的内容会被覆盖的**。

### binlog和redo log 写入的细节

`redo log`是MySQL的InnoDB引擎所产生的。

`binlog`无论MySQL用什么引擎，都会有的。

InnoDB是有事务的，事务的四大特性之一：持久性就是靠`redo log`来实现的（如果写入内存成功，但数据还没真正刷到磁盘，如果此时的数据库挂了，我们可以靠`redo log`来恢复内存的数据，这就实现了持久性）。

上面也提到，在修改的数据的时候，`binlog`会记载着变更的类容，`redo log`也会记载着变更的内容。（只不过一个存储的是物理变化，一个存储的是逻辑变化）。那他们的写入顺序是什么样的呢？

`redo log`**事务开始**的时候，就开始记录每次的变更信息，而`binlog`是在**事务提交**的时候才记录。

于是新有的问题又出现了：我写其中的某一个`log`，失败了，那会怎么办？现在我们的前提是先写`redo log`，再写`binlog`，我们来看看：

*  如果写`redo log`失败了，那我们就认为这次事务有问题，回滚，不再写`binlog`。
*  如果写`redo log`成功了，写`binlog`，写`binlog`写一半了，但失败了怎么办？我们还是会对这次的**事务回滚**，将无效的`binlog`给删除（因为`binlog`会影响从库的数据，所以需要做删除操作）
*  如果写`redo log`和`binlog`都成功了，那这次算是事务才会真正成功。

简单来说：MySQL需要保证`redo log`和`binlog`的**数据是一致**的，如果不一致，那就乱套了。

*  如果`redo log`写失败了，而`binlog`写成功了。那假设内存的数据还没来得及落磁盘，机器就挂掉了。那主从服务器的数据就不一致了。（从服务器通过`binlog`得到最新的数据，而主服务器由于`redo log`没有记载，没法恢复数据）
*  如果`redo log`写成功了，而`binlog`写失败了。那从服务器就拿不到最新的数据了。

MySQL通过**两阶段提交**来保证`redo log`和`binlog`的数据是一致的。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021964639" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

过程：

*  阶段1：InnoDB` redo log` 写盘，InnoDB 事务进入 `prepare` 状态
*  阶段2：`binlog` 写盘，InooDB 事务进入 `commit` 状态
*  每个事务`binlog`的末尾，会记录一个 `XID event`，标志着事务是否提交成功，也就是说，恢复过程中，`binlog` 最后一个 XID event 之后的内容都应该被 purge。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021964644" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

## 四、什么是undo log

>`undo log`

`undo log`主要有两个作用：回滚和多版本控制(MVCC)

在数据修改的时候，不仅记录了`redo log`，还记录`undo log`，如果因为某些原因导致事务失败或回滚了，可以用`undo log`进行回滚

`undo log`主要存储的也是逻辑日志，比如我们要`insert`一条数据了，那`undo log`会记录的一条对应的`delete`日志。我们要`update`一条记录时，它会记录一条对应**相反**的update记录。

这也应该容易理解，毕竟回滚嘛，跟需要修改的操作相反就好，这样就能达到回滚的目的。因为支持回滚操作，所以我们就能保证：“**一个事务包含多个操作，这些操作要么全部执行，要么全都不执行**”。【原子性】

因为`undo log`存储着修改之前的数据，相当于一个**前版本**，MVCC实现的是读写不阻塞，读的时候只要返回前一个版本的数据就行了。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021964641" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

## 最后

这篇文章把`binlog` /`redo log`/`undo log`最核心的知识给讲了，还有一些细节性的东西可以自行去补充（比如`binlog`有几种的模式，以及文章提到的刷盘策略等等）

**如果觉得学到了，请给我个赞行不行。**

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021964642" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

参考资料：

*  [https://www.jianshu.com/p/4bcfffb27ed5](https://www.jianshu.com/p/4bcfffb27ed5)
*  [https://yq.aliyun.com/articles/617335](https://yq.aliyun.com/articles/617335)
*  [MySQL的ACID原理！](https://mp.weixin.qq.com/s?__bizMzI4Njg5MDA5NA&mid2247485215&idx1&sn536d992835b4a40f7dc968acc5bea9c1&chksmebd7461edca0cf081bab56fb7b041331714f7d4849b605d8fb9390175f4a3eb7728a346ac02c&token1230572157&langzh_CN###rd)
*  [MySQL 是如何实现 ACID 中的 D 的？](https://mp.weixin.qq.com/s?__bizMzI4Njg5MDA5NA&mid2247486392&idx2&sn9acbd3e958a40e559ea41b878bc1da64&chksmebd74ab9dca0c3af3aca763faf2072e709ba54a4bbd8c37b25ba29f0fb88ce56443750342443&token1436027357&langzh_CN#rd)
*  [https://www.cnblogs.com/myseries/p/10728533.html](https://www.cnblogs.com/myseries/p/10728533.html)

如果大家想要**实时**关注我更新的文章以及分享的干货的话，可以关注我的公众号「**Java3y**」。

*  🔥**Java精美脑图**
*  🔥**Java学习路线**
*  🔥**开发常用工具**

在公众号下回复「**888**」即可获取！！

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021899798" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt title>

>**本已收录至我的GitHub精选文章，欢迎Star**
>
>[https://github.com/ZhongFuCheng3y/3y](https://github.com/ZhongFuCheng3y/3y)
>
>**求点赞** **求关注️**  **求分享👥** **求留言💬** 对我来说真的 **非常有用**！！！
