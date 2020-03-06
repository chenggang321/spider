

Symbol是ES6中新引入的一种基本数据类型，在此之前Javascript中已有几种基本数据类型：

*  Numberg
*  String
*  Boolean
*  Null
*  Undefined
*  Object

不同于其他基本类型的通俗易懂，`Symbol` 是什么和有什么用一直有些让人困惑。

# 什么是Symbol

JavaScript标准中规定对象的key只能是 `String` 或 `Symbol` 类型，区别在于 `String` 类型的key可以重复而 `Symbol` 类型的key是唯一的。`Symbol` 的本质是表示一个唯一标识。每次创建一个Symbol，它所代表的值都不可能重复，该值的内部实现可以视为一段数字（类似：`3423498431987719455..`）。所以理论上 Symbol 的存在只有一个意义：用于必须使用唯一值的场景。

# 创建Symbol

创建 Number、String等基本类型的实例有两种方法：通过构造函数（或者叫工厂函数）和文字语法糖。比如：

```
// 构造函数
const num = Number(3);
const str = String('hi');

// 语法糖
const num = 3;
const str = 'hi';
```

显然使用语法糖更加简洁。但是 Symbol 只能通过构造函数 `Symbol()` 进行创建：

```
const sym = Symbol();
```

或者，我们可以传入一个字符串参数（descriptor）用于描述该Symbol：

```
const sym = Symbol('cat');
```

**注意：传入的参数对 Symbol 值的产生并无影响，因为就算每次传入的参数都一样，生成的Symbol值也是不等的。该参数的作用仅用于描述被创建的Symbol，以便debug时可以识别出Symbol的含义。** 所以，下列等式结果为 `false`：

```
Symbol('cat') === Symbol('cat') // false
```

## `Symbol.for(key)`

和 `Symbol()` 类似，`Symbol.for(key)` 也可以创建一个Symbol，不一样的是：创建的 Symbol 是全局的（在全局Symbol表中注册），而如果全局已经存在相同 `key` 的Symbol，则直接返回该Symbol。所以，下列等式结果为 `true`：

```
Symbol.for('cat') === Symbol.for('cat') // true
```

# 如何使用Symbol

其实 Symbol 本身很简单，但是如何把它用好、且用的恰到好处却使人困惑，因为在平常工作中并没有多少非Symbol不用的场景。但是用对了Symbol会对你的代码质量有不少提升。来看下面几种案例：

## 1. 用作对象的key，防止命名冲突

使用Symbol作为Object的key，可以保证和其他key都不重复。因此，Symbol非常适合用于对对象的属性进行拓展。

比如，当使用 String 作为对象的key时，一旦出现重复的key则后面的属性会覆盖前面的：

```
const persons = {
  'bruce': 'wayne',
  'bruce': 'banner'
}

console.log(persons.bruce); // 'wayne'
```

使用Symbol作为Key可以避免这种情况：

```
const bruce1 = Symbol('bruce');
const bruce2 = Symbol('bruce');

const persons = {
  [bruce1]: 'wayne',
  [bruce2]: 'banner'
}

console.log(persons[bruce1]); // 'wayne'
console.log(persons[bruce2]); // 'banner'
```

JS很多内建的方法都是通过 Symbol 进行指定的，比如：`Symobol.iterator` 指定了一个iterable对象的迭代器方法；`Symbol.replace` 指定了对象字符串替换的方法，这类 Symbol 被称为 **Well-know Symbols**，代表了JS语言的内部行为。

## 2. 使用Symbol定义枚举

由于Javascript并不自带枚举类型，通常情况下我们会使用一个freezed的Object来模拟枚举类型，比如定义一个日期的枚举：

```
const DAYS = Object.freeze({
  monday: 1,
  tuesday: 2,
  wednesday: 3
});
```

此时有一个方法，接收 `DAYS` 的枚举值来返回当天要做的事：

```
function getTodo(day) {
  switch (day) {
    case DAYS.monday:
      return "看电影";
    case DAYS.tuesday:
      return "购物";
    case DAYS.wednesday:
      return "健身";
    default:
      return "日期错误";
  }
}
```

我们希望代码逻辑足够严谨，传入的参数严格按照 `DAYS.monday` 的形式，否则就返回日期错误，但是该枚举类型的实现却做不到。比如：`getTodo(1)` 依然能得到 “看电影” 这个结果。

但是使用Symbol却可以解决这一问题，`DAYS` 枚举类型可以重新定义为：

```
const DAYS = Object.freeze({
  monday: Symbol('monday'),
  tuesday: Symbol('tuesday'),
  wednesday: Symbol('wednesday')
});
```

此时 `getTodo` 方法必须接收 `DAYS.monday` 这样的枚举值作为参数，否则就返回 “日期错误”，因为世界上再没有任何一个值和 `DAYS.monday` 相等了。

这样定义枚举显然更严谨了。

## 3. 使用Symbol存储元数据

Key为Symbol类型的属性是不能被枚举的，这是 Symbol 除了唯一性外的第二大特性，因此使用`for...in`，`Object.keys()`、`Object.hasOwnProperty()`等方法不能识别Symbol属性，简而言之Symbol属性对用户是“隐藏”的（但并不是private的，因为有其他途径可以获取Symbol属性），例如：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021918751" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="4" title="4">

因此Symbol作为“隐藏”属性可以用来存储对象的元数据。比如，有一个 `TodoList`：

```
class TodoList {
  constructor() {
    // todo数量
    this.count = 0;
  }

  // 增加todo
  add(id, content) {
    this[id] = content;
    this.count++;
  }
}

const list = new TodoList();
```

我们使用 `add()` 方法向其中增加几个todo：

```
list.add('a', '看电影');
list.add('b', '购物');
list.add('c', '健身');
```

当我们想使用 `for...in` 查看里面所有的todo时，会把 `count` 属性也带出来：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021918752" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="1" title="1">

为了隐藏count属性，更方便的对todo进行操作，我们可以使用Symbol来存储它，`TodoList` 类修改为：

```
const count = Symbol('count');
class TodoList {
  constructor() {
    this[count] = 0;
  }

  add(id, content) {
    this[id] = content;
    this[count]++;
  }
}
```

当我们再遍历 `TodoList` 的时候，count就隐藏了：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021918753" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="2" title="2">

当我们想获取存储在Symbol中的原数据时，可以使用 `Object.getOwnPropertySymbols()` 方法：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021918754" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="3" title="3">

以上是我能想到的 Symbol 的用途，如果大家有其他心得体会欢迎补充。
