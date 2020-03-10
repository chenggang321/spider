

### 在线预览

[https://jsrun.pro/AafKp/embed...](https://jsrun.pro/AafKp/embedded/result,css,html/light/)

先看效果：<img referrerpolicy="no-referrer" data-src="/img/bVbEicf" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="image.png" title="image.png">

### 第一步，实现网格背景：

```
background-image:
    linear-gradient(0deg,
    transparent 24%,
    rgba(32, 255, 77, 0.1) 25%,
    rgba(32, 255, 77, 0.1) 26%,
    transparent 27%,
    transparent 74%,
    rgba(32, 255, 77, 0.1) 75%,
    rgba(32, 255, 77, 0.1) 76%,
    transparent 77%,
    transparent),
    linear-gradient(90deg,
    transparent 24%,
    rgba(32, 255, 77, 0.1) 25%,
    rgba(32, 255, 77, 0.1) 26%,
    transparent 27%,
    transparent 74%,
    rgba(32, 255, 77, 0.1) 75%,
    rgba(32, 255, 77, 0.1) 76%,
    transparent 77%,
    transparent);
background-size: 3rem 3rem;
background-position: -1rem -1rem;
```

### 第二部实现扫码线以及渐变背景特效

```
background: linear-gradient(180deg, rgba(0, 255, 51, 0) 50%, #00ff33 300%);
border-bottom: 2px solid #00ff33;
```

### 四角特效

就是四个宽高相等的正方形，分别设置边框即可。

### 设置扫描动画

```
@keyframes radar-beam {  
    0% {  
        transform: translateY(-110%);  
  }  
  
    100% {  
        transform: translateY(120%);  
  }  
}
```

完整代码：

```
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>css3-scanner.html</title>
    <style>
    html,
    body {
        height: 100%;
        margin: 0;
    }

    .qr-scanner {
        background-image:
            linear-gradient(0deg,
            transparent 24%,
            rgba(32, 255, 77, 0.1) 25%,
            rgba(32, 255, 77, 0.1) 26%,
            transparent 27%,
            transparent 74%,
            rgba(32, 255, 77, 0.1) 75%,
            rgba(32, 255, 77, 0.1) 76%,
            transparent 77%,
            transparent),
            linear-gradient(90deg,
            transparent 24%,
            rgba(32, 255, 77, 0.1) 25%,
            rgba(32, 255, 77, 0.1) 26%,
            transparent 27%,
            transparent 74%,
            rgba(32, 255, 77, 0.1) 75%,
            rgba(32, 255, 77, 0.1) 76%,
            transparent 77%,
            transparent);
        background-size: 3rem 3rem;
        background-position: -1rem -1rem;
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #111;
    }

    .qr-scanner .box {
        width: 75vw;
        height: 75vw;
        max-height: 75vh;
        max-width: 75vh;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        border: 0.1rem solid rgba(0, 255, 51, 0.2);
    }

    .qr-scanner .line {
        height: calc(100% - 2px);
        width: 100%;
        background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #00ff33 211%);
        border-bottom: 3px solid #00ff33;
        transform: translateY(-100%);
        animation: radar-beam 2s infinite;
        animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
        animation-delay: 1.4s;
    }

    .qr-scanner .box:after,
    .qr-scanner .box:before,
    .qr-scanner .angle:after,
    .qr-scanner .angle:before {
        content: '';
        display: block;
        position: absolute;
        width: 3vw;
        height: 3vw;

        border: 0.2rem solid transparent;
    }

    .qr-scanner .box:after,
    .qr-scanner .box:before {
        top: 0;
        border-top-color: #00ff33;
    }

    .qr-scanner .angle:after,
    .qr-scanner .angle:before {
        bottom: 0;
        border-bottom-color: #00ff33;
    }

    .qr-scanner .box:before,
    .qr-scanner .angle:before {
        left: 0;
        border-left-color: #00ff33;
    }

    .qr-scanner .box:after,
    .qr-scanner .angle:after {
        right: 0;
        border-right-color: #00ff33;
    }

    @keyframes radar-beam {
        0% {
            transform: translateY(-100%);
        }

        100% {
            transform: translateY(0);
        }
    }
    </style>
</head>

<body>
    <div class="qr-scanner">
        <div class="box">
            <div class="line"></div>
            <div class="angle"></div>
        </div>
    </div>
</body>

</html>
```

### 在线预览

[https://jsrun.pro/AafKp/embed...](https://jsrun.pro/AafKp/embedded/result,css,html/light/)
