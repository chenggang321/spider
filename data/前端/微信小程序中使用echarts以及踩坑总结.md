

**人在家中坐，锅从天上来**。

半个月前本来在家写着一个项目，还没来得及提测，领导突然一个电话，需要立刻去支援另一个项目，一打听，一个烂尾半年的项目，纵使内心不愿意，还是要去啊。因为鲁迅说过，生活就像强奸，既然不能反抗，那就好好享受吧。

这个项目分为PC端、用户端小程序和商家端小程序，这里主要讲讲在商家端中的某个模块，需要用到数据统计图表，当时觉得有两个插件不错：

*  [百度 echarts](https://www.echartsjs.com/zh/index.html)
*  [阿里 AntV](https://f2.antv.vision/zh)

因为之前在项目中使用`echarts`比较多，所以最终选择了`echarts`作为项目中的图表插件。

## echarts的引入

我是按照`echarts`官网教程来引入的，很简单，不多说。[传送门](https://www.echartsjs.com/zh/tutorial.html#%E5%9C%A8%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts)

## echarts中使用多个图表

wxml代码如下：

```

<view class="echarts-container" hidden="{{!isShoweyes || !echartsData.totalRecentRansactions.allTotalMoney}}">
    <ec-canvas id="mychart-dom-turnover" canvas-id="mychart-turnover" ec="{{ turnoverEc }}"></ec-canvas>
</view>

<view class="echarts-container" hidden="{{!isShoweyes || !echartsData.shopNewCustomerRespVo.allNewCustomer}}">
    <ec-canvas id="mychart-dom-customer" canvas-id="mychart-customer" ec="{{ customerEc }}"></ec-canvas>
</view>

<view class="echarts-container" hidden="{{!isShoweyes || !echartsData.customerOrderAverageRespVo.customerAverage}}">
    <ec-canvas id="mychart-dom-price" canvas-id="mychart-price" ec="{{ priceEc }}"></ec-canvas>
</view>
```

js代码如下

```

data: {
    isShoweyes: true,
    turnoverEc: {
      lazyLoad: true,
    },
    customerEc: {
      lazyLoad: true,
    },
    priceEc: {
      lazyLoad: true,
    },
    echartsData: {}
  },
  

onLoad: function (options) {
    this.echartsComponnet1 = this.selectComponent('#mychart-dom-turnover');
    this.echartsComponnet2 = this.selectComponent('#mychart-dom-customer');
    this.echartsComponnet3 = this.selectComponent('#mychart-dom-price');
  },
  
  getData: function () {
    //  .... 获取数据
    
    
    for (let i = 1; i < 4; i++) {
        if (!Chart[i]) {
          this.initEcharts(i); //初始化图表
        } else {
          this.setOption(i); //更新数据
        }
      }
  },
  
  initEcharts: function (i) {
    this['echartsComponnet' + i].init((canvas, width, height) => {
      // 初始化图表
      Chart[i - 1] = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(i);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart[i - 1];
    });
  },
  setOption: function (i) {
    Chart[i - 1].clear(); // 清除
    Chart[i - 1].setOption(this['getOption' + i]()); //获取新数据
  },
  
  
  getOption1() {
    let {
      echartsData
    } = this.data;
    return {
      color: ['#0179FF'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          shadowStyle: {
            opacity: 0.8
          }
        },
        formatter: this.formatterTooltip,
        position: this.setTooltipPositionfunction
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#999',
          }
        },
        axisLabel: {
          color: '#666',
        },
        data: echartsData.totalRecentRansactions.dates,
      }
      ],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#999',
          }
        },
        axisLabel: {
          color: '#666',
          fontSize: 13
        }
      }],
      series: [{
        name: '订单总额',
        type: 'line',
        label: {
          normal: {
            show: true,// 是否在折线点上显示数值
            position: 'inside'
          }
        },
        data: echartsData.totalRecentRansactions.allTotalMoney
      }]
    };
  }
```

## 遇到的坑

### 1.Tooltip支持不好

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021974962" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="echarts官网说明" title="echarts官网说明">虽然官网上echarts暂时不支持`Tooltip`，但是经过试验，还是`Tooltip`还是有效果的，但是，x轴对应的坐标值并不会显示在`Tooltip`中，需要使用`Tooltip`的`formatter`函数，自己处理需要展示的数据，代码如下：

```
// 格式化Tooltip
  formatterTooltip(param) {
    return "日期：" + param[0].name + "\n" + param[0].seriesName + ": " + param[0].data
  },
```

### 2.当点击靠近屏幕右侧或者底部的item项时，`Tooltip`会溢出边界，解决办法：

给`Tooltip`的`position`函数返回一个根据点击位置计算的坐标点，（也可以给一个固定的位置，但是体验不好）

```
 // 更改Tooltip的位置，处理边界超出的情况
  setTooltipPositionfunction(point, params, dom, rect, size) {
    //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
    // 更改提示框的显示位置
    let x = point[0];//
    let y = point[1];
    // size: 包括 dom 的尺寸和 echarts 容器的当前尺寸，例如：{contentSize: [width, height], viewSize: [width, height]}
    let boxWidth = size.contentSize[0];
    // let boxHeight = size.contentSize[1]; // size里面此处获取不到dom的高度，值为NAN，所以下面指定了一个固定值
    let boxHeight = 50;
    let posX = 0;//x坐标位置
    let posY = 0;//y坐标位置
    if (x < boxWidth) {//左边放不开
      posX = 5;
    } else {//左边放的下
      posX = x - boxWidth;
    }

    if (y < boxHeight) {//上边放不开
      posY = 5;
    } else {//上边放得下
      posY = y - boxHeight;
    }
    return [posX, posY];
  },
```

上面需要注意的是，获取`dom`的高度，官方上说的是可以从`position`回调函数的`size`参数中获取到`dom`的高度，但是我打印出来却是`NAN`。<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021974963" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image" title="image">打印出来结果：

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021974965" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image" title="image">后来发现参数`params`中`outerWidth`的值和参数`size`中`contentSize`的宽度值相同，所以果断取参数`params`中的`outerHeight`作为`dom`的高度，最后运行的效果确实没有问题。

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021974966" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image" title="image">

### 3.左右滑动柱状图时，柱状图画板会变空白，点一下空白又会出现柱状图，而且这个问题只有在柱状图上出现！

刚开始以为是自己代码的问题，后来自己检查了几遍，确实没什么问题，然后扫码体验了官方的小程序demo，发现也有这个问题，顿时只想对它口吐芬芳。既然是官方代码自身的问题，于是去看了下源码，如下：

```
<canvas class="ec-canvas" canvas-id="{{ canvasId }}" bindinit="init" bindtouchstart="{{ ec.disableTouch ? '' : 'touchStart' }}" bindtouchmove="{{ ec.disableTouch ? '' : 'touchMove' }}" bindtouchend="{{ ec.disableTouch ? '' : 'touchEnd' }}"></canvas>
```

官方代码给画布绑定一个`bindtouchmove`事件

```
touchMove(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'change');
      }
    },
```

这里面又去调用了`echarts.js`中的方法，最后想了一个粗暴的解决办法：

**`删掉源码中的bindtouchmove事件`**

完美解决，哈哈或或红红火火恍恍惚惚~~~

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021974964" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image" title="image">

### 最终效果图片

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021974968" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image" title="image">

### Demo源码

[点         这                      里](https://github.com/LJZJIANG/weappEcharts.git)

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021974967" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image" title="image">
