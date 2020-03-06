

<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_jpg/iawKicic66ubH4U4oNRSZrCeiaYY9hGfb5w7CfufLuPjL7ibv3y2m6BASb2HdClib57MX258iadrWoQdH9QKRjhMrvH3Q/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

---

**写在开头：**  

单元测试对于很多人比较模式，它是一种推动开发，或者提高产品质量的手段，  

我画一张图，大家就能理解

<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/iawKicic66ubH4U4oNRSZrCeiaYY9hGfb5w727Z6WNh16339hxRXbD2eu9QR5zaxPsUastN7n5HPyX1hicSxLOtvYEw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

---

其实单元测试，就是先编写单元测试代码，然后使用单元测试框架，去模拟环境（例如浏览器），然后运行你的代码，看代码是否按预期运行

---

这里为了降低文章篇幅，对于初学者更友好，于是这里使用我开源的通用脚手架，集成TypeScript+JavaScript混合开发，Jest框架，测试React组件、Enzyme、dva、Antd按需加载等主流技术～ 推荐大家使用

![]()

**我开源的脚手架在npm上叫：****ykj-cli**  

使用步骤：

```
npm i ykj-cli -g 或 yarn add global ykj-cli 
ykj init project_name
cd project_name
yarn && yarn dev 
即可打开看到页面～
```

![]()

有什么问题或者建议可以提给我，我会即时改进，欢迎你们在项目中使用。我已经集成了PWA等功能，后期会按需加入更多可选功能

---

开始编写第一个单元测试代码

所有的测试代码必须在test文件夹下，我们的脚手架已经帮我们做好了  

<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/iawKicic66ubH4U4oNRSZrCeiaYY9hGfb5w7mGKhDC2aib11JFn7UuYuibLmZtSThzluxuC1wMzVf2G8VepXkgDWJchQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

---

新建一个app.test.tsx文件（必须是tsx结尾，因为要测试React组件）  

一个合格的React项目，组件必须是tsx结尾，工具文件以ts结尾，声明文件以.d.ts结尾

首先引入enzyme和React以及对应的组件

```

import App from '../src/app';
import { mount } from 'enzyme';
import React from 'react';
```

编写单元测试代码：

```
    test('login test', async () => {
  console.log('App-mountComponent test function  begin ');
});
```

每个test是一个单独的测试函数，我们使用封装好脚手架封装好的命令，测试一把看看

```
yarn test
```

发现没有反应，这是为什么？因为里面没有写任何单元测试代码，此时我们根据脚手架的实际文件来编写单元测试代码

```

import App from '../src/routers/home';
import { mount } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json'; //做快照
test('login test', async () => {
    console.log('App-mountComponent test function  begin ');

    const wrapper = mount(<App />);
    expect(wrapper.find('.login_fade_in').children().length).toBe(8);

    console.log('App-mountComponent test function  stop  --success ');
});
```

此时 yarn test 启动测试      

<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/iawKicic66ubH4U4oNRSZrCeiaYY9hGfb5w7h7vIIb7iaMJO5yzylPhlLsjzCIVGzVPNXicZ0ojPDzKdJ5axCwVLxTiag/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

发现报错，因为App组件是连接了dva的store数据中心，这里没有传入props

那么我们可以模拟传入store吗？ 最简单的方法，试试传入一个空对象

```

import App from '../src/routers/home';
import { mount } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json'; //做快照
test('login test', async () => {
    console.log('App-mountComponent test function  begin ');

    const wrapper = mount(<App store={{}}/>);

    expect(wrapper.find('.login_fade_in').children().length).toBe(8);

    console.log('App-mountComponent test function  stop  --success ');
});
```

```
yarn test
```

启动结果

<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/iawKicic66ubH4U4oNRSZrCeiaYY9hGfb5w7MQZEkoRsaV1PKDiaR9gMONoicYicC1I37t9iaibJVX0XhQV6lyywibLibHBWQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/iawKicic66ubH4U4oNRSZrCeiaYY9hGfb5w7XZqdUs4uEU4PfxunL2wD1cd4UicbnK1OvYBaUeDKgHlcyApVPlhxFIw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

发现报错，测试没有通过,那么我们要想办法让它测试通过，于是就要看看App.tsx组件需要什么props～

```

import React, { Fragment } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import './index.less';
interface Props {
    history: any;
    readonly count: number;
    dispatch: Function;
    list: Array<string>;
}
```

这里又要提到TypeScript是真香，我的脚手架支持TS和JS混合开发，赶紧来把～

一看原来需要传入四个必须的参数，那么我们模拟一份吧,这次是认真的测试哦～ 

```
import App from '../src/routers/login';
import { mount } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json'; //做快照
test('login test', async () => {
    console.log('App-mountComponent test function  begin ');

    const wrapper = mount(<App Name="Peter Hello" changeShowContent={() => {}} />);

    expect(wrapper.find('.container').length).toBe(1);

    console.log('App-mountComponent test function  stop  --success ');
});
```

---

上面单元测试代码意思是：

1. 挂载login组件
2. 传入Name和changeShowCount函数作为Props
3. 检测挂载后的树型结构中的container类名的元素长度为1

这里⚠️：如果是断言，需要判断值的，使用toBe，如果是  

对象要进行比较的，使用toEqual

```
yarn test
```

<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/iawKicic66ubH4U4oNRSZrCeiaYY9hGfb5w7NeJRtFAXqg9Gj7MWRab1rxVlnYw5YcmgnJMBrElfiaSNiaJVQXNpKh8Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

测试结果通过，这就是一个最简单的单元测试编写，通常推荐根据需求先编写单元测试代码，再进行业务代码编写

然后生成单元测试报告

```
yarn test-c
```

<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/iawKicic66ubH4U4oNRSZrCeiaYY9hGfb5w72xpYQgGX8PM0TVFzCiaIBic6aBQ6ibpKjIduZ4VyYpAAC7betAkibA0uIQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

此时可以看到根目录的coverage文件夹下有了lcov-report文件夹，进入后我们直接打开里面的index.html文件，可以看到单元测试报告

<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/iawKicic66ubH4U4oNRSZrCeiaYY9hGfb5w7r38icicgkTxpNVjwTtMejUdKYWNJYnYRYrclYhECJCtezb72YKhrHGkw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

---

这样里面有一些像分支覆盖率、函数、代码函数覆盖等

其实像Jest用起来还是比较方便的，核心理念就是使用测试框架运行业务代码，再用单元测试代码去检测你的业务代码，前后端单元测试理念其实都是一样的思想，检测代码运行结果嘛。其他的API这里就不做解释了，有兴趣的可以用ykj-cli这个脚手架试验一把，上面的例子都在里面，非常方便

---

前端单元测试还有一个很重要的一点，就是生成页面快照

为什么要生成页面快照？  

你可以先在某个时间端生成页面快照，保存。

然后等部分代码跑完后，再生成一次快照，跟之前的快照进行对比，这样就能判断你中间的这部分代码有没有影响UI，这样能确定有没有BUG的出现

---

**页面快照：**

```
import App from '../src/routers/login';
import { mount, shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json'; //做快照
test('login test', async () => {
    console.log('App-mountComponent test function  begin ');

    const wrapper = shallow(<App Name="Peter Hello" changeShowContent={() => {}} />);
    // toJson(wrapper, {
    //     noKey: false,
    //     mode: 'deep',
    // });
    expect(wrapper).toMatchSnapshot()

    console.log('App-mountComponent test function  stop  --success ');
});
```

这里 expect(wrapper).toMatchSnapshot() 这行代码，帮我们在test文件夹下生成了__snapshots__文件夹

<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/iawKicic66ubH4U4oNRSZrCeiaYY9hGfb5w7icOooTUy7bpt9hVw51Cwgia95GH8tEnVklQjkSwLxYsERCLRD5v0LvvQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

后面测试代码中如果有操作改变了这个页面，那么就会报错，单元测试不通过

---

下面的内容希望你也能认真看完

常见的单元测试代码例子  

<img referrerpolicy="no-referrer" data-src="https://mmbiz.qpic.cn/mmbiz_png/iawKicic66ubH4U4oNRSZrCeiaYY9hGfb5w7rI5xDMAqm9vrYeBbKnzte3M8nOlUK0lh1k3ibNN3uYMAiasHfBzw9zHQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt title>

单元测试的编写难度可能比业务代码难度更高，本文带你入门，没有问题，其他的API需要你去多看文档，学习，多写。

推荐一些资料：

```
http://caibaojian.com/scb/enzyme.html
```

原创很累，感觉有帮助，点个赞，关注下 `前端巅峰` 公众号。推荐一下文章给需要的人吧
