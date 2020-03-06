

<img referrerpolicy="no-referrer" data-src="/img/bVbD7YI" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="photo-1534447677768-be436bb09401.jpeg" title="photo-1534447677768-be436bb09401.jpeg">

# 什么是 JSX

要了解 JSX，首先先了解什么三个主要问题，什么事 VDOM，差异更新和 JSX 建模：

VDOM，也叫虚拟 DOM，它是仅存于内存中的 DOM，因为还未展示到页面中，所以称为 VDOM

```
var vdom = document.createElement("div");
```

上面这一句就是最简单的虚拟 DOM

```
var vdom = document.createElement("div");
document.body.append(vdom);
```

上面这两句就是把虚拟 DOM 转化为 真实 DOM，其实就是把节点 append 到页面中

常见 DOM 操作，就三类：增、删、改。对应的 DOM 操作如下：

|DOM 操作|DOM 方法|
|---|---|
|增加一个节点|appendChild|
|删除一个节点|removeChild|
|更改一个节点|replaceChild|

以前我们写代码经常会拼接完模板，简单粗暴的用`$(el).html(template)`整块节点替换

这样做最大的问题在于性能，如果页面比较小，问题不大，但如果页面庞大，这样会出现卡顿，用户体验会很差，所以解决办法就是**差量更新**

差量更新就是只对局面的 HTML 片段进行更新。比如你加了一个节点，那么我就只更新这个节点，我无需整个模板替换。这样做效率就会提高。但问题在于，不知道哪个节点更新了，哪个节点删除了，哪个节点替换了，所以我们需要对 DOM 建模

如果我们可以用一个 JS 对象来表示 VDOM，那么这个对象上多一个属性（增加节点），少一个属性（删除节点），或者属性值变了（更改节点），就很清醒了

DOM 也叫 DOM 树，是一个树形结构，DOM 树上有很多元素节点，要对 VDOM 进行建模，本质上就是对一个个元素节点进行建模，然后再把节点放回 DOM 树的指定位置

JSX 建模，每个节点都是由以下三部分组成：

*  type : 元素类型
*  props : 元素属性
*  children : 子元素集合

```
{type:"div",props: null, children:[
       {type:"img",props:{"src":"avatar.png", "className":"profile"},children:[],
       {type:"h3",props: null, children:[{[user.firstName, user.lastName].join(' ')}],
]}
```

上面 VDOM 建模是用下面的 HTML 结构转出来的

```
var profile = (
  <div>
    <img src="avatar.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(" ")}</h3>
  </div>
);
```

但这段代码并不是合法的 js 代码，它是一种被称为 jsx 的语法扩展，通过它我们就可以很方便的在 js 代码中书写 html 片段

本质上，jsx 是语法糖，上面这段代码会被 babel 转换成如下代码

```
React.createElement(
  "div",
  null,
  React.createElement("img", {
    src: "avatar.png",
    className: "profile"
  }),
  React.createElement("h3", null, [user.firstName, user.lastName].join(" "))
);
```

而上面的这段被转化的代码是 将我们的 VDOM 配合`React.createElement`(一般应该是`createElement`函数)转化为真实 DOM

注意，如果是自定义组件`<App />`会转化为`React.createElement(App, null)`，因为组件是`class App extends React.Component {}`这样定义的，所以 App 进入`createElement`函数里面就会变成是一个对象

这里我们可以把这个函数放进[`createElement()`](https://github.com/Wscats/virtual-dom/blob/master/src/base.js)里面生成一个 VDOM 对象，然后用生成的 VDOM 对象，配合[`render()`](https://github.com/Wscats/virtual-dom/blob/master/src/base.js)生成一个 DOM 插入页面，从而转变成真实 DOM 结构

# 元素和组件有什么区别

React 元素，它是 React 中最小基本单位，我们可以使用上面提到的 JSX 语法轻松地创建一个 React 元素：

```
const element = <div>It is element</div>;
```

这个元素经过 babel 转化之后会变成带 `React.createElement` 的函数，而`React.createElement()` 构建 React 元素的时候。它接受三个参数，第一个参数可以是一个标签名。如 div、p，或者 React 组件。第二个参数为传入的属性，如 class，style。第三个以及之后的参数，皆作为组件的子组件。

```
React.createElement(type, [props], [...children]);
```

`React.createElement`它执行后是一个普通的对象，由于 React 元素不是真实的 DOM 元素，所以也没办法直接调用 DOM 原生的 API。上面的 JSX 转译后的对象大概是这样的：

```
{
  "_context": Object,
  "_owner": null,
  "key": null,
  "props": {
    "className": null,
    "children": "It is element"
  },
  "ref": null,
  "type": "div"
}
```

而 React 中有三种方法构建组件：

*  React.createClass() 旧版的方法现在不建议使用
*  ES6 类 推荐使用
*  无状态函数

`React.createClass()`由于是旧版本的，我们重点讲两种就够了，一种是**函数式(无状态函数)**，一种是**类式(ES6 类)**，就是用 `ES6 class` 我们所有的组件都继承自`React.Component`函数式很简单，就像我们平常写函数一个，接受一个参数作为输入，然后进行相应的输出，只不过它输出的 JSX 格式，注意组件只能有一个根元素：

```
function Wscats(props) {
  return <h1> {props.name}</h1>;
}

//ES6
const Wscats = ({ props }) => (
  <div>
    <h1>{props.name}</h1>
  </div>
);
```

类式组件如下，是一个纯函数：

```
import React from 'react';
//推荐这种
class Wscats extends React.Component {
  render() {
    return  <h1> {this.props.name}</h1>
  }
}
//or 这种方法将要废弃
var Wscats = React.createClass({
  render() {
    return  <h1> {this.props.name}</h1>
  }
}
```

`React.createClass()`和`ES6 class`构建的组件的数据结构本质都是类，而无状态组件数据结构是纯函数，但它们在 React 被能视为组件，综上所得组件是由元素构成的，元素是构造组件的重要部分，元素数据结构是普通对象，而组件数据结构是类或纯函数。

# 类组件和函数组件的区别

类组件有生命周期和状态，而函数组件则没有。

React 给类组件定义了非常完善的生命周期函数，类组件渲染到页面中叫挂载`mounting`，所以渲染完成后，叫做`componentDidMount`， 类组件的卸载叫`Unmount`，所以类组件将要卸载 叫做`componentWillUnmount`。我们想要在什么时候使用状态，就可以直接调用生命周期函数，把想要做的事情写到函数里面，生命周期函数直接写在类组件内部，类组件在初始化时会触发 5 个钩子函数：

|id|钩子函数|用处|
|---|---|---|
|1|getDefaultProps()|设置默认的 props，也可以用 defaultProps 设置组件的默认属性|
|2|getInitialState()|在使用 es6 的 class 语法时是没有这个钩子函数的，可以直接在 constructor 中定义 this.state。此时可以访问 this.props|
|3|componentWillMount()|组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改 state|
|4|render()|react 最重要的步骤，创建虚拟 dom，进行 diff 算法，更新 dom 树都在此进行。此时就不能更改 state 了|
|5|componentDidMount()|组件渲染之后调用，可以通过 this.getDOMNode()获取和操作 dom 节点，只调用一次|

类组件在更新时也会触发 5 个钩子函数：

|id|钩子函数|用处|
|---|---|---|
|6|componentWillReceivePorps(nextProps)|组件初始化时不调用，组件接受新的 props 时调用|
|7|shouldComponentUpdate(nextProps, nextState)|react 性能优化非常重要的一环。组件接受新的 state 或者 props 时调用，我们可以设置在此对比前后两个 props 和 state 是否相同，如果相同则返回 false 阻止更新，因为相同的属性状态一定会生成相同的 dom 树，这样就不需要创造新的 dom 树和旧的 dom 树进行 diff 算法对比，节省大量性能，尤其是在 dom 结构复杂的时候。不过调用 this.forceUpdate 会跳过此步骤|
|8|componentWillUpdate(nextProps, nextState)|组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改 state|
|9|render()|同上|
|10|componentDidUpdate()|组件初始化时不调用，组件更新完成后调用，此时可以获取 dom 节点。还有一个卸载钩子函数|
|11|componentWillUnmount()|组件将要卸载时调用，一些事件监听和定时器需要在此时清除|

比如，页面渲染完成后时间自动加一秒，这时还要涉及到类组件的状态更改。React 不允许直接更改状态, 或者说，我们不能给状态（如: date）进行赋值操作, 必须调用组件的`setState()`方法去更改状态。这里写一个函数`changeTime`来更改状态，[详情看 setState 更改状态](https://wscats.github.io/react-tutorial/%E7%BB%84%E4%BB%B6/setState%E6%9B%B4%E6%94%B9%E7%8A%B6%E6%80%81.html)

`changeTime`函数也可以直接写到组件里面，根据 `ES6 class`语法的规定，直接写在类中的函数都会绑定在原型上，所以`this.changeTime`可以调用。但要保证 this 指向的是我们这个组件，而不是其他的东西， 这也是在 `setInterval` 中使用箭头函数的原因：

```
//类式组件
class Wscats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }; // 给组件添加状态
  }
  changeTime() {
    this.setState({ date: new Date() });
  }
  // 生命周期函数
  componentDidMount() {
    setInterval(() => {
      this.changeTime();
    }, 1000);
  }
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <h2>现在时间是：{this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}
//组件的组合
function App() {
  return (
    <div>
      <Wscats name="Oaoafly" />
      <Wscats name="Eno" />
    </div>
  );
}
```

# PureComponent 和 Component 的区别

`PureCompoent`是更具性能的`Component`的版本。它为你提供了一个具有浅比较的 `shouldComponentUpdate`方法，也就是上面我们提到的那个类组件的生命周期，除此之外`PureComponent` 和 `Component` 基本上完全相同。当状态发生改变时，`PureComponent` 将对 props 和 state 进行浅比较。另一方面，而`Component`是不会比较的，当 `shouldComponentUpdate`被调用时，组件默认的会重新渲染，所以可以在`Component`里面自己手动调用`shouldComponentUpdate`进行比较来获取更优质的性能。

# 状态和属性的区别

props（properties 的缩写）和 state 都是普通的 JS 对象。它们都是用来保存信息的，这些信息可以控制组件的渲染输出。

而它们的一个重要的不同点就是：

*  props 是传递给组件的（类似于函数的形参）
*  state 是在组件内被组件自己管理的（类似于在一个函数内声明的变量）

```
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Hello World"
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.message} {this.props.message}</h1>
      </div>
    );
  }
}
// 传递Props给组件，message=”Hi“会被 Test组件里面的 props接受
React.render(<Test message="Hi">, document.getElementById('#demo'))
```

所以，状态（State）与属性（Props）很类似，但 state 是组件私有的控制的，除了自身外部任何组件都无法访问它，而 props 是组件从外部获取的值，类似形参。

如果文章和笔记能带您一丝帮助或者启发，请不要吝啬你的赞和收藏，你的肯定是我前进的最大动力😁

*  想了解更多的 React 内容，可以关注：[我的React学习笔记](https://github.com/Wscats/react-tutorial)
*  阅读往期更多优质文章可移步我的 [GitHub](https://github.com/Wscats) 查看
