

最近公司项目需要，要做一个类似于iphone通讯录的索引栏功能，可以快速定位和搜索。项目使用的UI库为VANT，但是刚开始找对应功能的时候没有仔细看，以为没有所以自己徒手撸了一个。可以给大家作为一个参考，也为了自己今后能够温习和优化。<img referrerpolicy="no-referrer" data-src="/img/bVbEiQi" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="Snipaste_2020-03-09_16-34-29.png" title="Snipaste_2020-03-09_16-34-29.png">   图片中除了搜索和快速定位，UI又添加了一个按压后的一个问题提示图标，无形中增加了一些开发工作量..不过设计上来讲确实是一个用户体验良好的功能。   了解完需求，接下来就开始开发功能了！   首先，我把页面的功能分成了五个步骤，如下图。<img referrerpolicy="no-referrer" data-src="/img/bVbEiQ7" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="Snipaste_2020-03-09_16-38-26.png" title="Snipaste_2020-03-09_16-38-26.png">

---

首先是最简单的城市搜索功能，和普通的搜索功能大同小异，不过这个搜索功能是需要跳转到新页面进行搜索所以不做过多描述，本人这里是通过blur来进行控制。   第二部就是开发页面的城市索引的title，城市的数据是在百度上百度下来的，后期联调等待后台联调接口后会改成动态数据。目前的数据格式大致就是这样

```
{  
  "title":"A",  
  "lists":[  
  "阿坝","阿拉善","阿里","安康","安庆","鞍山","安顺","安阳","澳门"  
  ]  
},
```

然后这里我在编写页面的时候给每个title都赋值了一个id，id所对应的就是他的title，后期也就通过id来跳转索引到对应的内容栏

```
<h3 :id="item.title">{{item.title}}</h3>
```

---

然后就到了侧边栏功能，首先先解决编写侧边栏的页面内容和样式。<img referrerpolicy="no-referrer" data-src="/img/bVbEiTe" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">

---

再者把提示作用的图标也先添加上<img referrerpolicy="no-referrer" data-src="/img/bVbEiTV" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">

---

现在就开始编写js，首先我想的是先把touch事件给写上，这里就是用到了touch三兄弟start move end。第一个就是先获取start的起始位置

```
e.touches[0].clientY
```

client返回当事件被触发时鼠标指针向对于浏览器页面（客户区）的垂直坐标。 客户区指的是当前窗口。第一个位置获取到了之后就需要编写move事件内容，现在有了起始位置后就需要计算它的移动距离，这里我是使用移动位置clientY-起始位置，这时候就计算出来你到底是移动了多少距离。

```
e.touches[0].clientY - this.startIndex;
```

但是这些仅仅都是初步的工作，因为我这个使用在移动端的，并且使用的是响应式的布局，单位使用为rem。所以在距离的计算上需要转换单位，因为在浏览器的展示上最后展示的单位都是px。为了更好的理解，我先贴出我每个方法的代码，然后一点点的解析它的作用。

```
this.startIndex = e.touches[0].clientY;  
this.normalIndex = ((e.touches[0].clientY - 20) * 2 )/100;  
this.iconIndex = ((e.touches[0].clientY * 2 / 100 ) - 3) / 0.32 ;  
this.iconMoveIndex(this.iconIndex);  
this.show = true;  
this.$refs.pic.style.top = this.normalIndex +'rem';  
document.body.style.overflow= 'hidden';
```

首先startIndex就是触摸的第一起始位置，normalIndex为图标触摸后的起始位置，因UI要求，当触摸的时候图标就会显示。首先是通过起始的位置减去图标的高度的一半，然后用减去的结果乘以2，乘以2是因为我的全局响应式设置是2倍，也是就设计稿的2倍图。也是为了方便编写scss和单位换算。最后除以100是px转换rem的单位计算。

---

<img referrerpolicy="no-referrer" data-src="/img/bVbEiYT" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">

---

因为点击的时候没有办法保证完全点击在右侧索引栏元素的中间，所以看起来有点儿偏差，但是在开发中是一直保持显示的时候确实是居中的。然后第三个iconIndex也是icon位置的计算，但是这个计算是为了其=用户在触摸起始位置的时候图标显示并且能显示用户目前触摸在哪个字母元素上，首先就是起始位置的二倍除以100这样单位就换算为了rem，然后减3是因为右边字母索引栏离页面高度距离是3rem。最后结果除以0.32,0.32是右侧字母索引栏的高度+外边距。最终得出的结果通过iconMoveIndex()的方法来计算出是哪个字母的范围内。

```
 /* 检测起始与结束位置 */
      iconMoveIndex(item){
        let index = Math.round(item);
        this.iconText = this.navList[index];
      },
```

this.show就是控制图标显示隐藏的，大家应该能明白，这里就不多说了。然后就是设置图标的显示位置，也不多说，过

```
document.body.style.overflow= 'hidden';
```

这个设置是因为在滑动的时候页面也会进行滑动，所以做这个设置控制一下。接下来讲一下move方法的内容

```
        this.moveIndex = e.touches[0].clientY - this.startIndex;
        let len = this.navList.length;
        let heights = len * 20 + (len * 12);
        let step  = this.normalIndex + (this.moveIndex /100 *2) - 0.2;
        if(step >= ((heights + 266 - 32) /100) || step <= 2.6){
          console.log('超长了')
        }else {
          this.iconMoveIndex(((step-3+0.32)/0.32));
          this.$refs.pic.style.top = step +'rem';
        }
    
```

moveIndex,移动距离计算。过len是侧边字母索引栏的长度；heights是侧边栏的总长度（包含下边距）；step是用图标的其实位置加上换算过单位的移动距离，然后再减去图标的一半高度。接下来的判断是为了防止用户超出首位或者末尾字母的距离判断。效果如下图<img referrerpolicy="no-referrer" data-src="/img/bVbEi2B" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="gif.gif" title="gif.gif">

---

里面的方法和设置位置和上面意思一样。最后就是end的方法内容了。

```
document.body.style.overflow= 'auto';
        this.show = false;
        this.scrollTops();
```

这里就很简单了，还原body的远处设置，然后图标设为隐藏，然后调用scrollTops()的方法跳转到当前页面。<img referrerpolicy="no-referrer" data-src="/img/bVbEi3I" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="gif1.gif" title="gif1.gif">

---

这里贴上跳转的代码

```
/* 获取选择字母标记与浏览器间隔距离 */
      scrollTops(){
        let en = document.getElementById(this.iconText);
        let far = en.offsetTop;
        this.$nextTick(() => {
          document.documentElement.scrollTop = far;
        });
      }
```

首先就是获取需要跳转的标签的对象属性。然后获取该标签距离浏览器的高度。最后页面设置scrollTop来进行跳转，这里需要用到document.documentElement.scrollTop，如果直接使用document.body.scrollTop会发现不会生效。最后通过万能的度娘，找到了一篇我觉得比较认可的解释。

```
要获取当前页面的滚动条纵坐标位置，用：
document.documentElement.scrollTop;
而不是：
document.body.scrollTop;
documentElement 对应的是 html 标签，而 body 对应的是 body 标签。

在标准w3c下，document.body.scrollTop恒为0，需要用document.documentElement.scrollTop来代替;
如果你想定位鼠标相对于页面的绝对位置时，你会发现google里面1000篇文章里面有999.99篇会让你使用event.clientX+document.body.scrollLeft，event.clientY+document.body.scrollTop，如果你发现你的鼠标定位偏离了你的想象，请不要奇怪，这是再正常不过的事情。
ie5.5之后已经不支持document.body.scrollX对象了。
原文出处：CSDN博主
原文链接：https://blog.csdn.net/huang100qi/article/details/5950894
```

那么目前这个索引栏的功能基本上就完成了，当然比不上大佬们的思路和代码那么优秀，不过在此只是和大家做一个交流和参考，有更好更优的方法可以留言私信我交流，谢谢大家！
