


>
>翻译：疯狂的技术宅
>
>原文：[https://dmitripavlutin.com/re...](https://dmitripavlutin.com/react-state-management/)
>
>**未经允许严禁转载**

React 组件内部的状态是在渲染过程之间保持不变的封装数据。 `useState()` 是 React hook，负责管理功能组件内部的状态。

我喜欢 `useState()` ，它确实使状态处理变得非常容易。但是我经常遇到类似的问题：

*  我应该将组件的状态划分为小状态，还是保持复合状态？
*  如果状态管理变得复杂，我应该从组件中提取它吗？该怎么做？
*  如果 `useState()` 的用法是如此简单，那么什么时候需要 `useReducer()`？

本文介绍了 3 条简单的规则，可以回答上述问题，并帮助你设计组件的状态。

## No.1 一个关注点

有效状态管理的第一个规则是：

使状态变量负责一个问题使其符合单一责任原则。

让我们来看一个复合状态的示例，即一种包含多个状态值的状态。

```
const [state, setState] = useState({
    on: true,
    count: 0
});

state.on    // => true
state.count // => 0
```

状态由一个普通的 JavaScript 对象组成，该对象具有 `on` 和 `count` 属性。

第一个属性 `state.on` 包含一个布尔值，表示开关。同样，``state.count` 包含一个表示计数器的数字，例如，用户单击按钮的次数。

然后，假设你要将计数器加1：

```
// Updating compound state
setUser({
    ...state,
    count: state.count + 1
});
```

你必须将整个状态放在一起，才能仅更新 `count`。这是为了简单地增加一个计数器而调用的一个大结构：这都是因为状态变量负责两个方面：开关和计数器。

解决方案是将复合状态分为两个原子状态 `on` 和 `count`：

```
const [on, setOnOff] = useState(true);
const [count, setCount] = useState(0);
```

状态变量 `on` 仅负责存储开关状态。同样，`count` 变量仅负责计数器。

现在，让我们尝试更新计数器：

```
setCount(count + 1);
// or using a callback
setCount(count => count + 1);
```

`count` 状态仅负责计数，很容易推断，也很容易更新和读取。

不必担心调用多个 `useState()` 为每个关注点创建状态变量。

但是请注意，如果你使用过多的 `useState()` 变量，则你的组件很有可能就违反了“单一职责原则”。只需将此类组件拆分为较小的组件即可。

## No.2 提取复杂的状态逻辑

在组件内保留复杂的状态操作是否有意义？

答案来自基本面（通常会发生这种情况）。

创建 React hook 是为了将组件与**复杂状态管理**和副作用隔离开。因此，由于组件只应关注要渲染的元素和要附加的某些事件侦听器，所以应该把复杂的状态逻辑提取到自定义 hook 中。

考虑一个管理产品列表的组件。用户可以添加新的产品名称。约束是产品名称必须是**唯一的**。

第一次尝试是将产品名称列表的设置程序直接保留在组件内部：

```
function ProductsList() {
    const [names, setNames] = useState([]);  
    const [newName, setNewName] = useState('');

    const map = name => <div>{name}</div>;

    const handleChange = event => setNewName(event.target.value);
    const handleAdd = () => {    
        const s = new Set([...names, newName]);    
        setNames([...s]);  };
    return (
        <div className="products">
            {names.map(map)}
            <input type="text" onChange={handleChange} />
            <button onClick={handleAdd}>Add</button>
        </div>
    );
}
```

`names` 状态变量保存产品名称。单击 *Add* 按钮时，将调用 `addNewProduct()` 事件处理程序。

在 `addNewProduct()` 内部，用 `Set` 对象来保持产品名称唯一。组件是否应该关注这个实现细节？不需要。

最好将复杂的状态设置器逻辑隔离到一个自定义 hook 中。开始做吧。

新的自定义钩子 `useUnique()` 可使每个项目保持唯一性：

```
// useUnique.js
export function useUnique(initial) {
    const [items, setItems] = useState(initial);
    const add = newItem => {
        const uniqueItems = [...new Set([...items, newItem])];
        setItems(uniqueItems);
    };
    return [items, add];
};
```

将自定义状态管理提取到一个 hook 中后，`ProductsList` 组件将变得更加轻巧：

```
import { useUnique } from './useUnique';

function ProductsList() {
  const [names, add] = useUnique([]);  const [newName, setNewName] = useState('');

  const map = name => <div>{name}</div>;

  const handleChange = event => setNewName(e.target.value);
  const handleAdd = () => add(newName);
  return (
    <div className="products">
      {names.map(map)}
      <input type="text" onChange={handleChange} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
```

`const [names, addName] = useUnique([])` 启用自定义 hook。该组件不再被复杂的状态管理所困扰。

如果你想在列表中添加新名称，则只需调用 `add('New Product Name')` 即可。

最重要的是，将复杂的状态管理提取到自定义 hooks 中的好处是：

*  该组件不再包含状态管理的详细信息
*  自定义 hook 可以重复使用
*  自定义 hook 可轻松进行隔离测试

## No.3 提取多个状态操作

继续用 `ProductsList` 的例子，让我们引入“delete”操作，该操作将从列表中删除产品名称。

现在，你必须为 2 个操作编码：添加和删除产品。处理这些操作，就可以创建一个简化器并使组件摆脱状态管理逻辑。

同样，此方法符合 hook 的思路：从组件中提取复杂的状态管理。

以下是添加和删除产品的 reducer 的一种实现：

```
function uniqueReducer(state, action) {
    switch (action.type) {
        case 'add':
            return [...new Set([...state, action.name])];
        case 'delete':
            return state.filter(name => name === action.name);
        default:
            throw new Error();
    }
}
```

然后，可以通过调用 React 的 `useReducer()`  hook 在产品列表中使用 `uniqueReducer()`：

```
function ProductsList() {
    const [names, dispatch] = useReducer(uniqueReducer, []);
    const [newName, setNewName] = useState('');

    const handleChange = event => setNewName(event.target.value);

    const handleAdd = () => dispatch({ type: 'add', name: newName });
    const map = name => {
        const delete = () => dispatch({ type: 'delete', name });    
        return (
            <div>
                {name}
                <button onClick={delete}>Delete</button>
            </div>
        );
    }

    return (
        <div className="products">
            {names.map(map)}
            <input type="text" onChange={handleChange} />
            <button onClick={handleAdd}>Add</button>
        </div>
    );
}
```

`const [names, dispatch] = useReducer(uniqueReducer, [])` 启用 `uniqueReducer`。 `names` 是保存产品名称的状态变量，而 `dispatch` 是使用操作对象调用的函数。

当单击 *Add* 按钮时，处理程序将调用 `dispatch({ type: 'add', name: newName })`。调度一个 `add` 动作使 reducer `uniqueReducer` 向状态添加一个新的产品名称。

以同样的方式，当单击 *Delete* 按钮时，处理程序将调用 `dispatch({ type: 'delete', name })`。`remove` 操作将产品名称从名称状态中删除。

有趣的是，reducer 是[命令模式](https://refactoring.guru/design-patterns/command)的特例。

## 总结

状态变量应只关注一个点。

如果状态具有复杂的更新逻辑，则将该逻辑从组件提取到自定义 hook 中。

同样，如果状态需要多个操作，请用 reducer 合并这些操作。

无论你使用什么规则，状态都应该尽可能地简单和分离。组件不应被状态更新的细节所困扰：它们应该是自定义 hook 或化简器的一部分。

这 3 个简单的规则能够使你的状态逻辑易于理解、维护和测试。

---

#### 本文首发微信公众号：前端先锋

#### 欢迎扫描二维码关注公众号，每天都给你推送新鲜的前端技术文章

## <img referrerpolicy="no-referrer" data-src="/img/bVRyYe" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="欢迎扫描二维码关注公众号，每天都给你推送新鲜的前端技术文章" title="欢迎扫描二维码关注公众号，每天都给你推送新鲜的前端技术文章">

### 欢迎继续阅读本专栏其它高赞文章：

*  [深入理解Shadow DOM v1](https://segmentfault.com/a/1190000019115050)
*  [一步步教你用 WebVR 实现虚拟现实游戏](https://segmentfault.com/a/1190000019135847)
*  [13个帮你提高开发效率的现代CSS框架](https://segmentfault.com/a/1190000019154021)
*  [快速上手BootstrapVue](https://segmentfault.com/a/1190000019085935)
*  [JavaScript引擎是如何工作的？从调用栈到Promise你需要知道的一切](https://segmentfault.com/a/1190000019205065)
*  [WebSocket实战：在 Node 和 React 之间进行实时通信](https://segmentfault.com/a/1190000019216390)
*  [关于 Git 的 20 个面试题](https://segmentfault.com/a/1190000019315509)
*  [深入解析 Node.js 的 console.log](https://segmentfault.com/a/1190000019302858)
*  [Node.js 究竟是什么？](https://segmentfault.com/a/1190000019283751)
*  [30分钟用Node.js构建一个API服务器](https://segmentfault.com/a/1190000019268920)
*  [Javascript的对象拷贝](https://segmentfault.com/a/1190000018903274)
*  [程序员30岁前月薪达不到30K，该何去何从](https://segmentfault.com/a/1190000018224157)
*  [14个最好的 JavaScript 数据可视化库](https://segmentfault.com/a/1190000018646425)
*  [8 个给前端的顶级 VS Code 扩展插件](https://segmentfault.com/a/1190000018439250)
*  [Node.js 多线程完全指南](https://segmentfault.com/a/1190000018660861)
*  [把HTML转成PDF的4个方案及实现](https://segmentfault.com/a/1190000018701596)

---

*  [更多文章...](http://blog.yidengxuetang.com/)
