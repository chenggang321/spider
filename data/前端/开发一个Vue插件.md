

# 前言

Vue 项目开发过程中，经常用到插件，比如原生插件 `vue-router`、`vuex`，还有 `element-ui` 提供的 `notify`、`message` 等等。这些插件让我们的开发变得更简单更高效。那么 Vue 插件是怎么开发的呢？如何自己开发一个 Vue 插件然后打包发布到npm？

本文涉及技术点：

1. Vue 插件的本质
2. `Vue.extend()` 全局方法
3. 如何手动挂载 `Vue` 实例
4. `Vue.use()` 的原理
5. 如何打包成 `umd` 格式
6. 发布前如何测试 `npm` 包

# 一、定义

什么是Vue插件，它和Vue组件有什么区别？来看一下官网的解释：


>
>

Emmmm，似乎好像有种朦胧美。。。

我来尝试解释一下，其实， `Vue 插件` 和 `Vue组件` 只是在 `Vue.js` 中包装的两个概念而已，不管是插件还是组件，最终目的都是为了实现逻辑复用。它们的本质都是对代码逻辑的封装，只是封装方式不同而已。在必要时，组件也可以封装成插件，插件也可以改写成组件，就看实际哪种封装更方便使用了。

除此之外，插件是全局的，组件可以全局注册也可以局部注册。

我们今天只聚焦 Vue 插件。

>插件一般有下面几种：
>
>*  添加全局方法或者属性。如: vue-custom-element
>*  添加全局资源：指令/过滤器/过渡等。如 vue-touch
>*  通过全局混入来添加一些组件选项。如 vue-router
>*  添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
>*  一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router
>
>—— Vue.js 官网

# 二、插件的使用

插件需要通过 `Vue.use()` 方法注册到全局，并且需要在调用 `new Vue()` 启动应用之前完成。之后在其他 Vue 实例里面就可以通过 `this.$xxx` 来调用插件中提供的 API 了。

下面以实现一个简易的提示框插件 toast 为例，给大家介绍怎么一步一步开发和发布一个 Vue 插件。

希望达到的效果：在 main.js 中 use：

```
// src/main.js
import Vue from 'vue'
import toast from '@champyin/toast'

Vue.use(toast)
```

在 App.vue 的生命周期 mounted 方法里调用 this.$toast()：

```
// src/App.vue
<template>
 <div>
   <button @click='handleClick'>Toast</button>
 </div>
</template>
<script>
export default {
    name: 'demo',
    methods: {
      handleClick() {
      this.$toast({
        type: 'success',
        msg: '成功',
        duration: 3
      })
    }
  }
}
</script>
```

运行后在页面上点击按钮，弹出 `成功` 的提示，然后3秒后消失。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021959061" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="how-to-write-a-vue-plugin01.jpg" title="how-to-write-a-vue-plugin01.jpg">

在线体验地址：[http://champyin.com/toast/](http://champyin.com/toast/)

# 三、插件开发

## 1. 编写 toast 的本体。

在 Vue 项目（你可以使用 Vue-cli 快速生成一个 Vue 项目，也可以自己用 webpack 搭建一个）的 src 目录下创建 components/Toast/index.vue 文件。

```
// src/components/Toast/index.vue
<template>
  <transition name='fade'>
    <div class='uco-toast' v-if='isShow'>
      <span :class='iconStyle'></span>
      <span>{{msg}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      type: 'success',
      msg: '成功',
      duration: 1,
    };
  },
  computed: {
    iconStyle() {
      return `tfont icon-${this.type} toast-icon`;
    },
  },
  mounted() {
    this.isShow = true;
    setTimeout(() => {
      this.isShow = false;
    }, this.duration * 1000);
  },
};
</script>

<style lang='less' scoped>
// 样式略
</style>
```

现在 toast 本体完成了，但是它里面的数据目前没法改变，因为我没有给它定义 props 属性。这不是 bug，而是，插件并不是通过 pops 来传值的。

## 2. 手动挂载 toast 实例的 dom

为了给插件传值，可以利用基础 Vue 构造器 `Vue.extend()` 创建一个“子类”。这个子类相当于一个继承了 Vue 的 Toast 构造器。然后在 new 这个构造函数的时候，给 Toast 的 data 属性传值，然后手动调用这个实例的 `$mount()` 方法手动挂载，最后使用原生JS的 appendChild 将真实 DOM （通过实例上的 `$el` 属性获取）添加到 body 上。

在 src 目录下新建 components/Toast/index.js 文件：

```
// src/components/Toast/index.js
import Vue from 'vue';
import Toast from './index.vue';

// 使用 Vue.extend() 创建 Toast 的构造器
const ToastConstructor = Vue.extend(Toast);

const toast = function(options = {}) {
    // 创建 Toast 实例，通过构造函数传参，
    // 并调用 Vue 实例上的 $mount() 手动挂载
    const toastInstance = new ToastConstructor({
        data: options
    }).$mount();

    // 手动把真实 dom 挂到 html 的 body 上
    document.body.appendChild(toastInstance.$el);

    return toastInstance;
};

// 导出包装好的 toast 方法
export default toast;
```

## 3. 暴露 install 方法给 Vue.use() 使用。


>

通过 [Vue.js 源码](https://github.com/vuejs/vue/blob/dev/src/core/global-api/use.js)也可以看出，Vue.use() 方法所做的事情就是调用插件或者组件的 install 方法，然后把全局 Vue 传进去供插件和组件使用。

```
// https://github.com/vuejs/vue/blob/dev/src/core/global-api/use.js
/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
```

在 src 目录下新建 components/index.js 文件，定义一个 install 方法，在里面将 toast 实例放到 Vue.prototype 上作为 Vue 实例的方法暴露到全局。

```
// src/components/index.js
import toast from './Toast/index';
import '../icon/iconfont.css';

// 准备好 install 方法 给 Vue.use() 使用
const install = function (Vue) {
  if (install.installed) return;
  install.installed = true;

  // 将包装好的 toast 挂到Vue的原型上，作为 Vue 实例上的方法
  Vue.prototype.$toast = toast;
}

// 默认导出 install
export default {
  install,
};
```

现在插件就开发完成了，可以在当前项目中本地引用这个插件了。

```
//在 main.js 中
import toast from src/components/index.js;
Vue.use(toast);

//在 App.vue 中
handleClick(){
  this.$toast();
}
```

# 四、发布到npm

为了方便其他人也可以使用到这个插件，我们可以把它发布到 npm 上去。发布的步骤很简单，但是发布之前，需要有一些小配置和一些注意的地方。

## 1. 打包配置

首先我们要把它打包成可以给浏览器解析的 UMD 格式的的模块，并且去掉对 Vue.js 的打包，这样别人在 Vue 项目中使用这个插件的时候就不会有两份 Vue 或者出现 Vue 版本冲突的问题，以保证可以更好被独立引用。

如果你是用 Vue-cli 生成的项目，那只需要在你的 npm 脚本中配置一下库的打包命令：

```
// package.json
"build:lib": "vue-cli-service build --target lib --name toast --dest lib  src/components/index.js"
```

命令说明：

```
--target：构建的目标
          targetType 有三个选项：lib | wc | wc-async
          lib：库
          wc：web component
          wc-async：异步的 web component

--name：库或组件的名字
          当入口为单一文件时，name为库或组件的文件名
          当入口为global表达式时，name为每个库或组件文件名字的前缀

[entry]：打包入口
          可以是.vue文件，也可以是.js文件
          当注册多个web component时，入口可以是一个global表达式，如 components/*.vue

--dest：输出目录
          默认为dist目录，也可以修改为自定义的目录
```

然后运行 `npm run build:lib`，即可在 lib 目录下生成如下文件：

```
toast.umd.js 一个直接给浏览器或者AMD loader 使用的 UMD 包
toast.umd.min.js 一个压缩版 UMD 构建版本
toast.common.js 一个给打包器用的CommonJS包
```

如果你是用 webpack 搭建的 Vue 项目，那就需要在 webpck 中配置一下 output.libraryTarget 等属性：

```
// build/webpack.lib.conf.js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/components/index.js',
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'toast.js',
    library: 'toast',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
```

然后运行 `npm run build:lib`，即可在 lib 目录下生成如下文件：

```
toast.js 直接给浏览器或者AMD loader 使用的 UMD 包
```

## 2. 发布前的测试

发布前，我们需要配置一下 package.json 里的 `name` 和 `main` 字段：`name` 的值是最终包的名字，`install` 和 `import` 的就是这个名字（请确保全网唯一）。`main` 的值是包的入口文件路径（相对当前文件的路径），一定要填写正确，否则包无法被引用。

```
"name": "@champyin/toast",
"main": "lib/toast.js",
```

为了确保包的配置没有问题，我们可以利用 `npm link` 命令在本地测试一下包的使用情况。使用npm link测试包的使用估计很多人都会，就不赘述了。如果有需要可以看我的另一篇中文章[npm link详解](https://champyin.com/2019/08/27/npm-link%E8%AF%A6%E8%A7%A3/)。

这个时候，我们其实就可以发布了，但是为了防止把不必要的文件发布出去（比如测试用例和demo）浪费人家下载的流量，我们最好是建一个 `.npmigore` 文件，语法跟 `.gitignore` 相同。

## 3. 发布

发布的方法很简单(不过首先你要有个 npm 账号)，在 package.json 所在的目录下执行这两句就可以了：

```
npm add user
npm publish
```

关于更详细的发布教程，我在另一篇文章有专门细说：[如何发布一个npm模块](https://champyin.com/2018/06/07/%E5%A6%82%E4%BD%95%E5%8F%91%E5%B8%83%E4%B8%80%E4%B8%AAnpm%E6%A8%A1%E5%9D%97/)。

## 4. 安装测试

其实到了这一步一99.99%是不会出错了，安装一遍只是为了那 0.01% 的万一。

在另一个 Vue 项目里（注意不能在开发toast的项目里哈），从 npm 安装自己刚才发布的包：

```
npm i -D @champyin/toast
```

然后在项目中使用一下自己的插件，点击按钮就会弹出 toast 小提示了。

```
//在 main.js 中
import toast from '@champyin/toast';
Vue.use(toast);

//在 App.vue 中
handleClick(){
  this.$toast();
}
```

项目体验地址：[http://champyin.com/toast/](http://champyin.com/toast/)  npm 地址：[https://www.npmjs.com/package/@champyin/toast](https://www.npmjs.com/package/@champyin/toast)  欢迎给我提 issue：[https://github.com/yc111/toast/issues](https://github.com/yc111/toast/issues)  

Happy coding :)

文章同时发表于公众号「前端手札」，喜欢的话可以关注一下哦。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021959062" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="qianduanshouzha-gzh.png" title="qianduanshouzha-gzh.png">

更多参考：  [https://cn.vuejs.org/v2/guide...](https://cn.vuejs.org/v2/guide/plugins.html)  [https://cn.vuejs.org/v2/api/#...](https://cn.vuejs.org/v2/api/#Vue-extend-options)  [https://cli.vuejs.org/zh/guid...](https://cli.vuejs.org/zh/guide/build-targets.html)  [https://webpack.js.org/guides...](https://webpack.js.org/guides/author-libraries/)  [https://docs.npmjs.com/cli-co...](https://docs.npmjs.com/cli-commands/link.html)  [https://docs.npmjs.com/cli-co...](https://docs.npmjs.com/cli-commands/pack.html)  [https://www.npmjs.com/package...](https://www.npmjs.com/package/@champyin/toast)  


>
>
>[http://champyin.com/2020/03/05/开发一个Vue插件/](http://champyin.com/2020/03/05/%E5%BC%80%E5%8F%91%E4%B8%80%E4%B8%AAVue%E6%8F%92%E4%BB%B6/)
