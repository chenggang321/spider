

## 我与疫情

2020 转眼已来到3月，但疫情的突袭，让这个春节迟迟没有开始，也没法结束。这段时间看似是充电自我提升的大好时光，但家国情怀深厚的我为疫情真的是操碎了心，时不时都要看看哪里数据猛增了，哪里暴发了。结束一个月的在家办公，带着口罩在公司上班，状态稍有好转，注意力终归回到了技术。  

最近在组里推BFF Node接入与微前端改造，看到了组里各式各样实现地业务代码（组件），有激进开放的整个页面都用hooks实现，有沉迷于过去的停留于redux + saga + model的类组件写法，当然更多的是类组件中的子组件参和几个hooks。我带着好奇之心去goggle了一下这两个谁胜一筹，于是有了此文。

## hooks vs class

网上看了很多大佬观点，但脱离业务的争论都是耍流氓。作为眼见为实躺坑无数的练习生，我决定用事实说话。说那么多干嘛，上代码：慢...，先说说接下来要干的事情：

*  进入一个列表页面，首次进入，发起请求，获取列表数据；
*  列表有搜索框，支持条件搜索和重置；
*  列表支持翻页；
*  页面弹出一个对话框，用于，新增，修改数据；
*  修改数据时，需要发起一个请求，去获取详情；

发现没，这就是一个标准的`CRUD`，页面大致长这样：<img referrerpolicy="no-referrer" data-src="/img/bVbEjbI" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">

### 肤浅的看-表面

接下来，列一下两种方式实现，页面的大致结构，橙色方框内为Hook重构后的页面结构：<img referrerpolicy="no-referrer" data-src="/img/bVbEjBR" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">Hook重构后代码变化主要在index.js，删去了对Dva的Model依赖，转由Hook自己管理数据, 代码对比大致如下：<img referrerpolicy="no-referrer" data-src="/img/bVbEjDy" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">看代码，主要是数据层的实现有变化，UI保持一致。当页面跑起来，如果不看面包屑的话，也很难分辨谁是Hooks组件的实现,谁是类组件的实现，所以表面的看，是看不出谁高谁低的。

### 仔细的看-性能

毕竟人的肉眼，只有当低于30fps时，才能明显的观察到变化；所以要想客观的对比性能，得依赖Chrome的性能分析(Performerce);这里做两个对比：

1. 从其他菜单（主页）跳转到列表页
2. 从列表页到打开详情编辑Modal;

** 跳转到列表页 **<img referrerpolicy="no-referrer" data-src="/img/bVbEjQl" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">

** 打开编辑页 **<img referrerpolicy="no-referrer" data-src="/img/bVbEjTG" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">

为保证试验结果严谨，我尽量保证唯一性变量原则、多（san）次、与减少自己手抖的次数，但与自动化测试还是有较大差距，十几毫秒的误差再所难免。我观察了`列表页切换页`的两个图，除开请求的波动于手动测试的误差，两个页面从点击到请求再到页面渲染，时间相差无几，甚至调用栈都是惊人的相似（装逼的说法就是：从原理上分析，也应该是相似的：dispatch + diff + render）。也观察了`详情编辑Modal打开`两个图，多次测试，其打开速度hooks稍暂上风，由于这一块的实现逻辑有比较大的差别（`class`组件的数据获取是在最外层，获取完然后依次向里传递；而`hooks`则是从外层获取到id后，组件内部直接发起请求获取数据），所以两者火焰图也有比较大的差异；但从页面渲染的角度整体感觉差别不大。  

最后我得出的看法是：Hooks更多是一种管理数据的手段，与class相比，并没有什么性能上的优势，更多的主动权，在编写代码的人手里，就像我驾校老师爱说的那句狗屁不通的谚语：**再好的车，给这个二傻子开，都能开熄火**。关于更多，可以关注[B乎讨论: React hooks 和 Class Component 的性能哪一个更好?](https://www.zhihu.com/question/338443007)。 如果对我的测试有疑惑，可以自己动手，我提供示例项目：

*  [在线地址](http://admin.closertb.site/#/login)，自己在线玩的项目，请高抬贵手
*  [示例项目](https://github.com/closertb/koa-spring-client)

我个人始终赞成：框架只是实现业务的手段，在使用成熟的框架前提下，页面的性能完全由司机掌控。（我个人有个观点就是：`Vue是自动档，React更像手动档`）

## hooks：useRequest

要想完全脱离redux或mobx，简单使用Hooks中的useState或useEffect来完成页面，其难度还是很大且`很难管理`，毕竟页面大多数数据源都来自异步请求，所以封装一个useRequest hooks是势在必要的，而且Hooks最大的优势就是逻辑复用。以下将分享部门封装useRequest组件的思考过程，其思路参考于`Apollo-Graphql`的[react-hooks项目](https://github.com/closertb/react-apollo/tree/master/packages/hooks)。先看示例代码(上面列表页的部分代码)：

```
export default function Root() {
 const [search, onSearch, onReset] = usePagination({});

 // 请求：admin.closertb.site/rule/query接口
 const { data = {}, loading, error } = useRequest('/rule/query', search);

 const { datas, total } = data;
 const tableProps = {
   search,
   datas,
   fields,
   onSearch,
   total,
   loading,
 };

 const searchProps = {
   fields: searchFields,
   search,
   onReset,
   onSearch,
 };
 return (
   <div>
     <WithSearch {...searchProps} />
     <div className="pageContent">
       <EnhanceTable {...tableProps} />
     </div>
   </div>
 );
}
```

以上就是一个最常见的useRequest hook应用，用非常简短的代码替换了Dva中的路由监听(`subscription`), 异步请求（`effect`）,数据更新(`reducer`)等一连串逻辑；下图是一个简单的流程示意图：<img referrerpolicy="no-referrer" data-src="/img/bVbEmSk" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">

根据这个示意图，老司机应该就大概知道怎么实现的了：

*  运用`useRef` 来缓存请求实例，即每个useRequest仅创建一个query实例，页面更新时，沿用已经存在的示例；
*  运用`useMemo`做计算，判断请求参数是否更新;
*  运用`useEffect`, 用useMemo计算结果作为依赖，判断是否发起请求；
*  当然，更新页面，采用了一个自增的useReducer；

现在留下的唯一疑问就是，发布订阅怎么实现的，看一下代码：

```
// query 示例其中的两个核心方法：
  startQuery() {
    const { url, body, forceUpdate, result } = this;
    if (this.status > STATUS.fetch) {
      return;
    }
    // 状态反转为请求中
    this.status = STATUS.fetch;
    result.loading = true;
    // 发起请求
    this.request(url, body).then((data) => {
      // 更新结果
      result.data = data;
      result.loading = false;
      this.status = STATUS.success;
      // 更新订阅
      forceUpdate();
    }).catch((error) => {
      this.status = STATUS.error;
      result.error = error;
      result.loading = false;
      forceUpdate();
    });
  }

  execute() {
    // skip：是否禁用查询
    const { result, options: { skip = false } } = this;
    !skip && this.startQuery();

    // 当skip 为true 时，说明没有查询结果，所以不能用上次的查询结果来做过渡
    return Object.assign({
      error: undefined,
      data: undefined,
      loading: !skip,
      forceUpdate: this.forceQuery,
    }, skip ? {} : result);
  }
```

是不是有种恍然大悟，并没有什么发布订阅的具体实现，完全依赖于`Promise`对象隐式的`发布订阅`，而forceUpdate的实现则依赖于`useReducer`:

```
const [tick, forceUpdate] = useReducer(x => x + 1, 0);
```

从去年用`Graphql`写完自己的[博客](https://closertb.site)，发现Apollo的useQuery这个hooks彩蛋，就一直有想法去实现一个useRequest hooks，在去年的一次需求推进中，强迫自己去编写了这个组件。收获还是很大的，在我们团队中已经有一定尝试，当然还有很大的拓展空间。从这个组件的编写历程，我也再一次体验了开手动挡，司机经验的重要性，拿我自己挖到的一个坑举例：

```
  cleanup() {
    this.result.data = undefined;
    this.result.loading = false;
    this.result.error = undefined;
  }
```

上面一段代码，是每次请求完成后，页面更新后, 有一个useEffect副作用会执行`query.cleanup()`来保证请求示例回到初始状态。但就这样一段代码，引起了极大的性能问题：


>
>`react-redux`

但后面通过应用chrome performance，观测到其抖动，是由于`this.result.data = undefined`造成的，用一个示意图表示：<img referrerpolicy="no-referrer" data-src="/img/bVbEmV2" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">大概意思就是，如果当前页面有数据，再次发起查询时，列表除了当前更新为loading状态，当前10天数据也会被清除，相当于列表做了一次`diff并render`；请求完成后，loading状态消失，更新列表，又做了一次diff并render.所以会造成抖动。后面完善代码后，就和下面正常的阶跃曲线一样，只有一次阶跃，列表实际只会做一次render.

此次实现是基于团队现有的http库来做的，这个库的原理在以前的一篇文章讲过：[边看边写：基于Fetch仿洋葱模型写一个Http构造类](https://closertb.site/#/blog/33?cursorY3Vyc29yOnYyOpK5MjAxOS0xMC0wNFQyMzoxMDowOCswODowMM4d9nli)  

如果你感兴趣，可以在我的github看到：

*  [antd-doddle](https://github.com/closertb/antd-doddle)

## 结语

没啥想总结的，愿疫情早日过去。愿口罩早日摘下，愿火锅早日成为生活的日常。

对了，Antd4.0已经到来，Form表单基本被重写，这意味着我组件库[Antd-doddle](https://github.com/closertb/antd-doddle), 又得做一次大的升级了！！！！cd
