


>
>翻译：疯狂的技术宅
>
>原文：[https://alligator.io/vuejs/ne...](https://alligator.io/vuejs/nested-routes/)
>
>**未经允许严禁转载**

随着 Vue.js 单页应用（SPA）变得相当复杂，你开始需要 [Vue 路由](https://alligator.io/vuejs/intro-to-routing/)以及嵌套路由。嵌套路由允许更复杂的用户界面以及相互嵌套的组件。让我们创建一个相对简单的用例，来展示 Vue Router 中嵌套路由的实用性。

## 用 Vue CLI 进行设置

如果尚未安装，请运行以下命令全局安装 Vue CLI：

```
$ npm install -g @vue/cli
```

或者

```
$ yarn global add @vue/cli
```

现在你能从命令行运行 `vue` 命令了。让我们创建一个名为 alligator-nest 的 Vue 应用：

```
$ vue create alligator-nest
```

在提示符下选择默认预设（按 Enter 键）。之后，运行以下命令：

```
$ npm install vue-router
```

然后，在你选择的编辑器中打开 `alligator-nest` 目录。

## 基本代码

以下 CSS 将帮助我们为 UI 定位元素。将其作为样式表文件添加到  `public/` 文件夹中，并在 `public/index.html` 中引用它。为此，我们将使用 [CSS grid](https://alligator.io/css/css-grid-layout-intro/)：

**grid.css**

```
.row1 {
  grid-row-start: 1;
  grid-row-end: 2;
}

.row12 {
  grid-row-start: 1;
  grid-row-end: 3;
}

.row123 {
  grid-row-start: 1;
  grid-row-end: 4;
}

.row2 {
  grid-row-start: 2;
  grid-row-end: 3;
}

.row23 {
  grid-row-start: 2;
  grid-row-end: 4;
}

.row3 {
  grid-row-start: 3;
  grid-row-end: 4;
}

.col1 {
  grid-column-start: 1;
  grid-column-end: 2;
}

.col12 {
  grid-column-start: 1;
  grid-column-end: 3;
}

.col123 {
  grid-column-start: 1;
  grid-column-end: 4;
}

.col1234 {
  grid-column-start: 1;
  grid-column-end: 5;
}

.col2 {
  grid-column-start: 2;
  grid-column-end: 3;
}

.col23 {
  grid-column-start: 2;
  grid-column-end: 4;
}

.col234 {
  grid-column-start: 2;
  grid-column-end: 5;
}

.col3 {
  grid-column-start: 3;
  grid-column-end: 4;
}

.col34 {
  grid-column-start: 3;
  grid-column-end: 5;
}

.col4 {
  grid-column-start: 4;
  grid-column-end: 5;
}
```

接下来，让我们对 `vue-cli` 添加的默认文件进行一些更改。

从 `src/components` 文件夹中删除 `HelloWorld.vue`，并从 `src/App.vue` 中删除所有与其相关的东西。对 `App.vue` 中的 HTML 标记和 CSS 样式进行以下修改。

```
<template>
  <div id="app">
    <h1 class="row1 col12">Alligator Nest</h1>
    <a class="row1 col3">Travels</a>
    <a class="row1 col4">About</a>
    <div class="row2 col234"></div>
  </div>
</template>
html, body {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 2%;
  height: 100%;
  display: grid;
  grid-template-rows: 20% 80%;
  grid-template-columns: 25% 25% 25% 25%;
}
```

如果你在项目的根目录中运行 `npm run serve`，则可以将鼠标悬停在浏览器中的 `localhost:8080` 上，并查看框架布局。那些 `display:grid` 属性很有用！现在我们可以开始创建路由了。

## 输入 Vue 路由

在 `/components` 文件夹中创建一个名为 `AboutPage.vue` 的组件。它看起来像这样：

```
<template>
  <div>
    <h2>About</h2>
    <p>Alligators were around during the time of the dinosaurs.</p>
  </div>
</template>

<script>
  export default {
    name: 'AboutPage',
  }
</script>

<style scoped>
  
</style>
```

现在我们的 `main.js` 文件需要 `/about` 路由。它看起来像这样。

```
import VueRouter from 'vue-router';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import AboutPage from './components/AboutPage.vue';

const routes = [
  { path: '/about', component: AboutPage },
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
```

最后，让我们回到 `App.vue`，并将 “About” 的锚标记更改为属性为 `to="/about"` 的 `<router-link>` 标签。然后，将第二个 `div` 更改为 `<router-view>` 标签。确保保持网格定位类属性不变。

现在，我们有了一个功能齐全的站点框架，并为 “About” 页面处理了路由。

我们在此重点介绍路由功能，因此不会在样式上话费太多时间。尽管如此，我们也要让`Travels` 页面看起来更精致一些。

---

首先，创建一个 `TravelPage`，方法与创建 `AboutPage` 相同。在 `main.js` 中引用它。

还需要创建以下两个组件，这些组件最终将嵌套在 `TravelPage.vue` 中：

**TravelAmericaPage.vue**

```
<template>
  <div>
    <p>Alligators can be found in the American states of Louisiana and Florida.</p>
  </div>
</template>

<script>
  export default {
    name: 'TravelAmericaPage'
  }
</script>

<style scoped>
</style>
```

**TravelChinaPage.vue**

```
<template>
  <div>
    <p>Alligators can be found in China's Yangtze River Valley.</p>
  </div>
</template>

<script>
  export default {
    name: 'TravelChinaPage'
  }
</script>

<style scoped>

</style>
```

### 配置嵌套路由

现在，让我们同时更新 `main.js` 和 `TravelPage.vue`，以使用 `children` 来引用这些嵌套路由。必须将 `main.js` 更新为对 `routes` 常量具有以下定义：

```
const routes = [
  {
    path: '/travel', component: TravelPage,
    children: [
      { path: '/travel/america', component: TravelAmericaPage },
      { path: '/travel/china', component: TravelChinaPage}
    ]
  },
  {
    path: '/about', component: AboutPage
  }
];
```

请注意，子级的嵌套可以无限继续下去。

并且 `TravelPage.vue` 可以通过以下方式编写：

**TravelPage.vue**

```
<template>
  <div id="travel">
    <h2 class="row1">Travels</h2>
    <div class="flex-container row2">
      <router-link to="/travel/america">America</router-link>
      <router-link to="/travel/china">China</router-link>
    </div>
    <router-view class="row3"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'TravelPage'
  }
</script>

<style scoped>
div {
  text-align: center;
}

#travel {
  display: grid;
  grid-template-rows: 20% 40% 40%;
}

.flex-container {
  display: flex;
  justify-content: space-around;
}
</style>
```

检出 `localhost:8080`，你将看到 Travels 页面中包含 2 个子页面！当你单击任一链接时，我们的 URL 也会相应更新。

## 总结

希望本教程对你了解如何使用嵌套路由有帮助！

关于该主题的其他注意事项——我们可以使用动态段定义路由，例如 `path:'/location/:id'`。然后在这些路由的视图上，可以将该 id 引用为 `this.$route.params`。当你希望在网站和应用上显示更多特定类型的数据（用户、图片等）时，此功能非常有用。

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
