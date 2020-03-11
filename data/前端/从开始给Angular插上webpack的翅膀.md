

引言:  Angular + Typescript + Webpack这套技术栈在工作中一直在用, 但是从0开始搭建起webpack的前端工程化基础还从来没有自己做过, 遇到一些问题总是稀里糊涂. 一直想从0开始搭建 angular的webpack打包工程.

npm版本: v6.13.4 node版本: v12.16.1

### 根据 [angular.io](https://angular.io/) 上的建议做好初始化工程

```
npm install -g @angular/cli
ng new angular-webpack
```

生成了angular-webpack目录, 但是此工程是用angular-cli来启动的.

### 加入webpack.config.js 并且配置上entry和ouput

```
const path = require('path');
module.exports = {
    entry: { main: './src/main.ts', },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
    }
}
```

有webpack.config.js文件, 并不能直接使用, 需要安装webpack

### 安装webpack, webpack-cli, rimraf;package.json加上对应的打包scripts

```
npm install webpack webpack-cli rimraf --save-dev 
```

```
/*package.json*/
"pack": "rimraf dist/\* && webpack",
```

试试打包看看

### 执行npm run pack看看第一次打包效果:

```
ERROR in ./src/main.ts Module not found: Error: Can't resolve './app/app.module' in '/Users/chenhua/CodeBase/angular-webpack/src'  @ ./src/main.ts 4:0-45 10:41-50
```

webpack默认只会去解析js文件,所以寻找app.module.js没找到就报错, 而实际上我们是app.module.ts文件

### 加入resolve.extension配置, 让webpack去"寻找"ts文件

```
resolve:{
    extensions:[  '.js', '.ts'],
}
```

运行再次报错:

```
ERROR in ./src/app/app.module.ts 8:0 Module parse failed: Unexpected character '@' (8:0)
```

原因是@NgModule不能解析, 装饰器语法 需要用typescript的loader来解析

### 加入awesome-typescript-loader

到此, 能够生成打包文件,下一个问题是怎么把打包后的js放入index.html中?

### html-webpack-plugin动态生成html文件

使用html-webpack-plugin将output打包好的js文件,以script标签的形式插入到一个index.html文件中,我们需要我们自己的index.html文件用于angular的启动,所以给html-webpack-plugin配置上template.

```
const HtmlWebpackPlugin = require( 'html-webpack-plugin');
plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
],
```

在浏览器中打开index.html,network显示文件获取不到bundle文件

```
file:///main.715b027541305761cdd9.js //如此获取文件失败
```

问题分析:直接打卡使用file协议请求, /bundle.js请求不到,

### 全局安装http-server, npx, 执行npx htpp-server ./dist 目录启动, 访问localhost:8080

```
Uncaught Error: Can't resolve all parameters for e: (?).  at Vt (main.715b027541305761cdd9.js:978) at e._getDependenciesMetadata (main.715b027541305761cdd9.js:1435) at e._getTypeMetadata (main.715b027541305761cdd9.js:1435) at e.getNgModuleMetadata (main.715b027541305761cdd9.js:1435) at e.getNgModuleSummary (main.715b027541305761cdd9.js:1435)
```

问题分析: webpack打包的时候自动进行了命名优化,看不出问题所在

### 加入mode: "development"

```
/*mode: "development"不会对打包文件进行命名优化, 所以能够看到更准确的问题*/
Uncaught Error: Can't resolve all parameters for ApplicationModule: (?).
```

问题分析:经过了解, 需要加入reflect的polyfills

#### 手动加入pollyfills的entry,polyfills中加入reflect

```
entry: {
    polyfills: "./src/polyfills.ts",
    main: "./src/main.ts",
},
    
/*polyfills.ts中手动加入,core-js注意版本, 否则可能找不到es7/reflect,   core-js: 2.6.0*/
import 'core-js/es7/reflect';
```

配置polyfills之后,仍然报错:

```
Unhandled Promise rejection: Failed to load app.component.html
```

问题分析: 因为没有正确的打包到app.component.html,所以加入angular2-template-loader用于加载组件的template文件

### 配置angular2-template-loader

```
 use:\[{ loader: 'angular2-template-loader', }\]
```

```
ERROR in ./src/app/app.component.html 1:0
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
```

问题分析: html文件缺少对应的loader

### 配置html-loader

```
{
    test: /\.html?$/,
    use: [
        {
            loader: 'html-loader',
        }
    ],
},
```

继续访问,报错:

```
compiler.js:6070 Uncaught Error: Expected 'styles' to be an array of strings.
   at assertArrayOfStrings (compiler.js:6070)
   at CompileMetadataResolver.getNonNormalizedDirectiveMetadata (compiler.js:21995)
   at CompileMetadataResolver.\_getEntryComponentMetadata (compiler.js:22655)
```

问题分析: css文件没有正确打包,

### 加入css文件对应的loader

```
{
    test: /\.css$/,
    use: ['to-string-loader', 'style-loader', 'css-loader'],
}
```

Bingo!!

<img referrerpolicy="no-referrer" data-src="/img/bVbEmaU" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="屏幕快照 2020-03-10 下午4.59.53.png" title="屏幕快照 2020-03-10 下午4.59.53.png">
