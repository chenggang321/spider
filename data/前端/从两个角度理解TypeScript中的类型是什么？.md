


>
>翻译：疯狂的技术宅
>
>原文：[https://2ality.com/2020/02/un...](https://2ality.com/2020/02/understanding-types-typescript.html)
>
>**未经允许严禁转载**

TypeScript中的类型是什么？本文中描述了两种有助于理解它们的观点。

## 每个角度三个问题

以下三个问题对于理解类型如何工作非常重要，并且需要从两个角度分别回答。

1. `myVariable` 具有 `MyType` 类型是什么意思？

```
   let myVariable: MyType = /*...*/;
```

1. `SourceType` 是否可以分配给 `TargetType`？

```
   let source: SourceType = /*...*/;
   let target: TargetType = source;
```

1. `TypeUnion` 是如何从 `Type1`，`Type2` 和 `Type3` 派生的？

```
   type TypeUnion = Type1 | Type2 | Type3;
```

## 观点1：类型是值的集合

从这个角度来看，类型是一组值：

1. 如果 `myVariable` 的类型为 `MyType`，则意味着所有可以分配给 `myVariable` 的值都必须是 `MyType` 集合的元素。
2. `SourceType` 可分配给 `TargetType` ，`SourceType` 是 `TargetType` 的子集。结果所有能被 `SourceType` 接受的值也被 `TargetType` 接受。
3. 类型 `Type1`、`Type2` 和 `Type3` 的类型联合是定义它们集合的集合理论 union。

## 观点2：类型兼容性关系

从这个角度来看，我们不关心值本身以及在执行代码时它们是如何流动的。相反，我们采取了更加静态的观点：

*  源代码中包含 location，每个 location 都有一个静态类型。在支持 TypeScript 的编辑器中，如果将光标悬停在 location 上方，则可以看到该 location 的静态类型。
*  当源 location 通过分配、函数调用等连接到目标 location 时，则源 location 的类型必须与目标 location 的类型兼容。 TypeScript 规范通过所谓的[**类型关系**](https://github.com/microsoft/TypeScript/blob/master/doc/spec.md#3.11)定义类型兼容性。
*  [类型关系*分配兼容性*](https://github.com/microsoft/TypeScript/blob/master/doc/spec.md#3114-assignment-compatibility)定义什么时候把源类型 `S` 分配给目标类型 `T`：
   
   *  `S` 和 `T` 是相同的类型。

*  `S` 或 `T` 是 `any` 类型。
   
   *  等

让我们考虑以下问题：

1. 如果将 `myVariable` 的静态类型分配给 `MyType`，则 `myVariable` 的类型为 `MyType`。
2. 如果 `SourceType` 是兼容分配的，则可以将它们分配给 `TargetType`。
3. 通过[类型关系*apparent 成员*](https://github.com/microsoft/TypeScript/blob/master/doc/spec.md#3111-apparent-members)定义类型 union 的工作方式。

TypeScript 类型系统的一个有趣特征是，同一变量在不同位置可以具有不同的静态类型：

```
const arr = [];
// %inferred-type: any[]
arr;

arr.push(123);
// %inferred-type: number[]
arr;

arr.push('abc');
// %inferred-type: (string | number)[]
arr;
```

## 名义类型系统与结构类型系统

静态类型系统的职责之一是确定两种静态类型是否兼容：

*  实际参数的静态类型 `U`（例如，通过函数调用提供）
*  对应形式参数的静态类型 `T`（在函数定义中指定）

这通常意味着检查 `U` 是否为 `T` 的子类型。大致有两种检查方法：

*  在**名义**类型系统中，两个静态类型如果具有相同的标识（“名称”）则相等。如果明确声明了它们的子类型关系，则一种类型是另一种类型的子类型。
*  名义类型的语言为 C ++、Java、C#、Swift 和 Rust。
*  在**结构**类型系统中，两个静态类型具有相同的结构（如果它们具有相同的名称和相同的类型）则相等。如果 `U` 具有 `T` 的所有部分（可能还有其他），并且 `U` 的每个部分具有 `T` 的相应部分的子类型，则类型 `U` 是另一种类型 `T` 的子类型。
*  具有结构化类型的语言为 OCaml/ReasonML、Haskell 和 TypeScript。

以下代码在名义类型系统中会产生类型错误（A 行），但在 TypeScript 的结构类型系统中是合法的，因为类 `A` 和类 `B` 具有相同的结构：

```
class A {
  name = 'A';
}
class B {
  name = 'B';
}
const someVariable: A = new B(); // (A)
```

TypeScript 的 interface 在结构上也可以正常工作 —— 不必为了匹配而实现它们：

```
interface Point {
  x: number;
  y: number;
}
const point: Point = {x: 1, y: 2}; // OK
```

## 进一步阅读

*  [TypeScript 手册中的“类型兼容性”一章](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)
*  [TypeScript 规范中的 “TypeRelationships” 部分](https://github.com/microsoft/TypeScript/blob/master/doc/spec.md#311-type-relationships)

---

#### 本文首发微信公众号：前端先锋

#### 欢迎扫描二维码关注公众号，每天都给你推送新鲜的前端技术文章

## <img referrerpolicy="no-referrer" data-src="/img/bVRyYe" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="欢迎扫描二维码关注公众号，每天都给你推送新鲜的前端技术文章" title="欢迎扫描二维码关注公众号，每天都给你推送新鲜的前端技术文章">

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
