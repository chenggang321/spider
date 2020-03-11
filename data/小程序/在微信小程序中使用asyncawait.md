

微信小程序中有大量接口是异步调用，比如 `wx.login()`、`wx.request()`、`wx.getUserInfo()` 等，都是使用一个对象作为参数，并定义了 `success()`、`fail()` 和 `complete()` 作为异步调用不同情况下的回调。

但是，以回调的方式来写程序，真的很伤，如果有一个过程需要依次干这些事情：

*  `wx.getStorage()` 获取缓存数据，检查登录状态
*  `wx.getSetting()` 获取配置信息，
*  `wx.login()` 使用配置信息进行登录
*  `wx.getUserInfo()` 登录后获取用户信息
*  `wx.request()` 向业务服务器发起数据请求
*  ……

那么，代码大概会长这样

```
wx.getStorage({
    fail: () => {
        wx.getSetting({
            success: settings => {
                wx.login({
                    success: ({ code }) => {
                        wx.getUesrInfo({
                            code,
                            success: (userInfo) => {
                                wx.request({
                                    success: () => {
                                        // do something
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});
```

显然，async/await 可以同样逻辑的代码看起来舒服得多。不过默认情况下，“微信开发者工具”并不支持 async/await。如何启用？

## 1. 用上 async/await

如果有心，在微信小程序官方文档中搜索 `async` 可以找到“[工具⇒开发辅助⇒代码编译](https://developers.weixin.qq.com/miniprogram/dev/devtools/codecompile.html)”页面中提到了对 async/await 的支持情况，是在“增加编译”小节的一个表格中，摘录一段：

>在 **1.02.1904282** 以及之后版本的开发工具中，增加了增强编译的选项来增强 ES6 转 ES5 的能力，启用后会使用新的编译逻辑以及提供额外的选项供开发者使用。
>
>|特性|原有逻辑|增强编译|
>|---|---|---|
>|Async/Await|不支持|支持|

>
>*  支持 async/await 语法，按需注入 `regeneratorRuntime`，目录位置与辅助函数一致

总之呢，就是，只要把“[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html)”更新到 `v1.02.1904282` 以上，就不需要干 `npm install regenerator` 这之类的事情，只需要修改一个配置项就能使用 `async/await` 特性了。这个配置就在“工具栏⇒详情⇒本地设置”页面中。

<img referrerpolicy="no-referrer" data-src="/img/bVbEkAA" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">

为了快速验证 async/await 可用，在 `app.js` 的 `onLaunch()` 事件函数中加一段代码：

```
(async () => {
    const p = await new Promise(resolve => {
        setTimeout(() => resolve("hello async/await"), 1000);
    });
    console.log(p);
})();
```

在短暂的自动编译运行之后，在调试器界面的 Console 页签中可以看到输出：

```
hello async/await
```

如果不行，请先检查“微信开发者工具”的版本——至少，去下载一个最新版本总不会有问题的。

## 2. 改造 wx.abcd 异步方法

虽然 async/await 得到了支持，但是还得把 `wx.abcd()` 封装成 Promise 风格才行。

Node.js 在 util 模块中提供了 `promisify` 来把 Node.js 风格的回调转换成 Promise 风格，但显然它不适用于 wx 风格。还是自己动手吧，也不用考虑太多，比如 wx 风格的异步调用在形式上都是一致的，它们的特征如下 ：

*  使用一个对象传递所有参数，包括三个主要的回调
*  `success: (res) => any` 在异步方法成功时回调
*  `fail: (err) => any` 在异步方法失败时回调
*  `complete: () => any` 在异步方法完成（不管成功还是失败）时回调

所以，如果 `wx.abcd()` 改成了 Promise 风格，通过 async/await 来编写，大概应该是这个样子

```
try {
    const res = wx.abcd();
    // do anything in success callback
} catch (err) {
    // do anything in fail callback
} finally {
    // do anything in complete callback
}
```

当然，`catch` 和 `finally` 这两个部分并不是必须，也就是说，不一定非得用 `try` 语句块。但是，如果不用 `catch`，会有一个神坑存在，这个问题后面再说。现在首先要做的是**改造**。

### 2.1. 定义 promisify()

`promisify()` 就是一个封装函数，传入原来的 `wx.abcd` 作为参加，返回一个 Promise 风格的新函数。代码和解释如下：

```
function promisify(fn) {
    // promisify() 返回的是一个函数，
    // 这个函数跟传入的 fn（即 wx.abcd） 签名相同（或兼容）
    return async function(args) {
    //                    ^^^^ 接受一个单一参数对象
        return new Promise((resolve, reject) => {
    //             ^^^^^^^^^^^ 返回一个 Promise 对象
            fn({
    //      ^^ ^ 调用原函数并使用改造过的新的参数对象
                ...(args || {}),
    //          ^^^^^^^^        这个新参数对象得有原本传入的参数，
    //                      ^^  当然得兼容没有传入参数的情况
                success: res => resolve(res),
    //          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^  注入 success 回调，resovle 它
                fail: err => reject(err)
    //          ^^^^^^^^^^^^^^^^^^^^^^^^ 注入 fail 回调，reject 它
            });
        });
    };
}
```

举例使用它：

```
const asyncLogin = promisify(wx.login);  // 注意别写成 wx.login()，为什么，我不说
try {
    const res = asyncLogin();
    const code = res.code;
    // do something with code
} catch (err) {
    // login error
} finally {
    // promisify 里没有专门注入 complete 回调，
    // 因为 complete 的内容可以写在这里
}
```

### 2.2. 定义 `wx.async()`

不过老实说，把要用的异步方法通过 `promisify` 一个个处理，写起来还是挺烦的，不如写个工具函数把要用的方法一次性转换出来。不过一查，`wx` 下定义了不知道多少异步方法，还是退而求其次，用到啥转啥，不过可以批量转，转出来的结果还是封装在一个对象中。整个过程就是迭代处理，最后把每个处理结果聚焦在一起：

```
function toAsync(names) {    // 这里 names 期望是一个数组
    return (names || [])
        .map(name => (
            {
                name,
                member: wx[name]
            }
        ))
        .filter(t => typeof t.member === "function")
        .reduce((r, t) => {
            r[t.name] = promisify(wx[t.name]);
            return r;
        }, {});
}
```

这个 `toAsync` 的用法大致是这样的

```
const awx = toAsync(["login", "request"]);
await awx.login();
await awx.request({...});
```

有些人可能更习惯单个参数传入的方式，像这样

```
const awx = toAsync("login", "request");
```

那么在 `toAsync` 的定义中，参数改为 `...names` 就好，即

```
function toAsync(...names) { ... }
```

还没完，因为我不想在每一个 JS 文件中去 `import { toAsync } from ...`。所以把它在 `App.onLaunch()` 中把它注入到 `wx` 对象中去，就像这样

```
App({
    onLaunch: function() {
        // ...
        wx.async = toAsync;
        // ...
    }
});
```

## 3. await 带来的神坑

工具准备好了，代码也大刀阔斧地进行了改造，看起来舒服多了，一运行却报错！为什么？？？

先来看一段原来的代码，是这样的

```
wx.getStorage({
    key: "blabla",
    success: res => {
        // do with res
    }
});
```

改造之后是这样

```
const res = await awx.getStorage({ key: "blabla" });  // <== runtime error
// do with res
```

`awx.getStorage` 抛了个异常，原因是叫 `"blabal"` 的这个数据不存在。

为什么原来没有错，现在却报错？

因为原来没有定义 `fail` 回调，所以错误被忽略了。但是 `promisify()` 把 `fail` 回调封装成了 `reject()`，所以 `awx.getStorage()` 返回的 Promise 对象上，需要通过 `catch()` 来处理。我们没有直接使用 Promise 对象，而是用的 `await` 语法，所以 `reject()` 会以抛出异常的形式体现出来。

用人话说，代码得这样改：

```
try {
    const res = await awx.getStorage({ key: "blabla" });  // <== runtime error
    // do with res
} catch (err) {
    // 我知道有错，就是当它不存在！
}
```

伤心了不是？如果没有伤心，你想想，每一个调用都要用 `try ... catch ...` 代码块，还能不伤心吗？

### 3.1. 忽略不需要处理的错误

处理错误真的是个好习惯，但真的不是所有错误情况都需要处理。其实要忽略错误也很简单，直接在每个 Promise 形式的异步调后面加句话就行，比如

```
const res = await awx
    .getStorage({ key: "blabla" })
    .catch(() => {});
//  ^^^^^^^^^^^^^^^^ 捕捉错误，但什么也不干
```

稍微解释一下，在这里 `awx.getStorage()` 返回一个 Promise 对象，对该对象调用 `.catch()` 会封装 reject 的情况，同时它会返回一个新的 Promise 对象，这个对象才是 `await` 等待的 Promise。

不过感觉 `.catch(() => {})` 写起来怪怪的，那就封装成一个方法吧，这得改 `Promise` 类的原形

```
Promise.prototype.ignoreError = function() {
    return this.catch(() => { });
};
```

这段代码放在定义 `toAsync()` 之前就好。

用起来也像那么回事

```
const res = await awx
    .getStorage({ key: "blabla" })
    .ignoreError();
```

对于单个 `await` 异步调用，如果不想写 `try ... catch ...` 块，还可以自己定义一个 `ifError(fn)` 来处理错误的情况。但是如果需要批量处理错误，还是 `try ... catch ...` 用起顺手：

## 4. 回到开始

```
try {
    const storeValue = await awx.getStorage({});
    const settings = await awx.getSetting();
    const { code } = await awx.login();
    const userInfo = await awx.getUserInfo({ code });
} catch (err) {
    // 处理错误吧
}
```

看，不需要对每个异步调用定义 `fail` 回调，一个 `try ... catch ...` 处理所有可能产生的错误，这可不也是 async/await 的优势！

---

看完了先别走，点个赞啊 ⇓，赞赏 ⇘ 也行！
