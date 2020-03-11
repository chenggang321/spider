

### 参考链接

[https://www.cnblogs.com/canfo...](https://www.cnblogs.com/canfoo/p/6891868.html)

### 前言

提到vue，大家肯定会想到双向数据绑定，数据驱动视图，虚拟DOM，diff算法等等这些概念。在使用vue的时候，会感觉到它的数据双向绑定真的很爽啊。会不会在你用了很长时间后，会好奇到，这个是如何实现的？或者在遇到问题的时候，会不会想到，为啥这个数据并没有响应式的发生改变，视图怎么没有变化...当你抱着这些疑问的时候你肯定会想了解其中的原理了。那么我也是..现在把之前学习和理解的内容整理一下，如果有什么问题，请多多指教~

### 要了解的核心API

众所周知，是个vue的使用者都知道其响应式数据是结合`Object.defineProperty()`这个方法实现，那么关于这个方法的使用和作用，请自行了解..一个合格的jser应该都知道的。

### 要了解的设计模式

核心是`观察者模式`，数据是我们的`被观察者`，发生改变的时候，会通知我们所有的`观察者`。

### 我们来分析这个图

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000010352759" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="vue响应式" title="vue响应式">

关于上面这个图，请仔细的看下，从vue官网拔过来的...。主要包括数据变化更新视图，视图变化更新数据。其中主要涉及`Observe`，`Watcher`,`Dep`这三个类，要了解vue的响应式原理，弄清楚这三个类是如何运作的，这样就能够大概了解了。`Observe`是数据监听器，其实现方法就是`Object.defineProperty`。`Watcher`是我们所说的观察者。`Dep`是可以容纳观察者的一个订阅器，主要收集订阅者，然后在发生变化的时候通知每个订阅者。

### 实现一个Observe

observe的主要工作是针对vue中的响应式数据属性进行监听，所以通过递归的方法遍历属性。

```
function observe(data) {
    if(!data || typeof data !== 'object') {
        return
    }
    
    Object.keys(data).map((k) => {
        defineReactive(data, k, data[k])
    })
}

function defineReactive(data, k, val) {
    observe(val)
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            return val
        },
        set: function(newval) {
            val = newval
        }
    })
}
```

### 创建一个Dep订阅器

订阅器负责收集观察者，然后在属性变化的时候通知观察者进行更新。

```
function Dep() {
    this.subs = []
}

Dep.prototype.addSub = function(sub) {
    this.subs.push(sub)
}
Dep.prototype.notify = function() {
    this.subs.forEach(v => {
        v.update()
    })
}
```

那么什么时候将一个观察者添加到Dep里面呢？设计上是将观察者的添加放在getter里面。

### 实现一个Watcher

上面说到Watcher是在初始化的时候在getter里面放进订阅器Dep中。那么在Watcher初始化的时候触发getter。那么还有个问题，在getter中是如何获取到Watcher的？这个我们可以暂时缓存的放到Dep的静态属性`Dep.target`上面。

```
function Watcher(vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
}
Watcher.prototype.update = function() {}
Watcher.prototype.run = function() {
  var value = this.vm.data[this.exp]; 
  var oldVal = this.value; 
  if (value !== oldVal) {      
    this.value = value; 
    this.cb.call(this.vm, value, oldVal);
  }         
}
Watcher.prototype.get = function() {
    Dep.target = this // 在target上进行缓存
    var value = this.vm.data[exp] //触发getter
    Dep.target = null //清空null
    return value
}
```

这个时候我们还需要修改下Observe：

```
function defineReactive(data, k, val) {
    observe(val)
    var dep = new Dep(); 
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            if(Dep.target) {
                dep.addSub(Dep.target)
            }
            return val
        },
        set: function(newval) {
            if(newval === val) {
                return
            }
            val = newval
            dep.notify()
        }
    })
}
```

看到这里，大致应该都明白如何把`Observe`,`Dep`,`Watcher`如何运作到一起了吧。

### 如何通过这三者完成一个数据的双向绑定

```
function MyVue(data, el, exp) {
    this.data = data
    observe(this.data)
    el.innerHTML = this.data[exp]
    new Watcher(this, exp, function(value) {
        el.innerHTML = value
    })
}
```

### 优化MyVue，代理data上属性

```
function MyVue(data, el, exp) {
    this.data = data
    Object.key(data).forEach(function(k) => {
        this.proxyKeys(k)
    })
    observe(data);
    el.innerHTML = this.data[exp];  // 初始化模板数据的值
    new Watcher(this, exp, function (value) {
        el.innerHTML = value;
    });
    return this;
}
MyVue.prototype.proxyKeys = function(k) {
    Object.defineProperty(this, k, {
        enumerable: false,
        configurable: true,
        get: function proxyGetter() {
            return this.data[key];
        },
        set: function proxySetter(newVal) {
            this.data[key] = newVal;
        }
    })
}
```

### 实现compile解析dom节点

上面的例子中没有解析DOM节点的操作，只是针对指定dom节点进行内容的替换。那么compile要进行哪写操作呢？

1. 解析模板指定，并替换模板数据
2. 将模板指定对应的节点绑定对应的更新函数，并初始化相应的订阅器。

```
function nodeToFragment(el) {
    var fragment = document.createDocumentFragment()
    var child = el.firstChild
    while(child) {
        fragment.appendChild(child)
        child = el.firstChild
    }
    return fragment
}
```

接下来需要遍历各个节点，对含有相关指定的节点进行特殊处理。

```
function compileElement(el) {
    var childNodes = el.childNodes;
    var self = this;
    [].slice.call(childNodes).forEach(function(node) {
        var reg = /\{\{(.*)\}\}/;
        var text = node.textContent;
 
        if (self.isTextNode(node) && reg.test(text)) {  // 判断是否是符合这种形式{{}}的指令
            self.compileText(node, reg.exec(text)[1]);
        }
 
        if (node.childNodes && node.childNodes.length) {
            self.compileElement(node);  // 继续递归遍历子节点
        }
    });
}

function compileText (node, exp) {
    var self = this;
    var initText = this.vm[exp];
    updateText(node, initText);  // 将初始化的数据初始化到视图中
    new Watcher(this.vm, exp, function (value) {  // 生成订阅器并绑定更新函数
        self.updateText(node, value);
    });
},
function updateText (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
}
```

获取到最外层节点后，调用compileElement函数，对所有子节点进行判断，如果节点是文本节点且匹配{{}}这种形式指令的节点就开始进行编译处理，编译处理首先需要初始化视图数据，对应上面所说的步骤1，接下去需要生成一个并绑定更新函数的订阅器，对应上面所说的步骤2。这样就完成指令的解析、初始化、编译三个过程，一个解析器Compile也就可以正常的工作了。为了将解析器Compile与监听器Observer和订阅者Watcher关联起来，我们需要再修改一下类MySelf函数：

```
function MyVue(opt) {
    let self = this
    this.vm = this
    this.data = opt.data
    
    Object.key(this.data).forEach(function(k) {
        this.proxyKeys(k)
    })
    observe(this.data)
    new Compile(opt, this.vm)
    return this
}
```

感觉大致说的差不多了...希望能够对大家有点点启发，谢谢。
