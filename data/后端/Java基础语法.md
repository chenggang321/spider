


>
>
>
>[https://github.com/zhangzhibo1014/DaBoJava](https://github.com/zhangzhibo1014/DaBoJava)

### 前言

俗话说 **“工欲善其事，必先利其器”** ，作为 `Java` 开发人员，不仅要学习更多的技术栈，而且要时常回顾 `Java` 的基础。 `Java` 基础掌握的牢固，后续的开发也会变得相对 `easy` ！下面一文讲述的是**Java基础语法**，对于刚入门的小白也非常适合哦！

### 标识符

**标识符：** 如同人的姓名一样，在计算机程序中为常量，变量，类，方法等进行命名。

**命名规则：**

*  以**数字**，**字母**，**下划线(_)**，**美元符号($)**组成
*  不能以数字开头
*  不能为Java中的关键字
*  严格区分大小写，不能包含空格
*  可以为中文，但不推荐使用

**PS**

*  起名字的目的是为了让人们记住，所以最好做到（**见名知意**）。
   
   ```
   1.包名 - 全小写，多级中间用[.]分割，一般为域名的倒叙
       example: top.zhangzhibo
   2.类名/接口名 - 开头字母大写，多个单词每个单词首字母都大写
       example: HelloWorld  Student
   3.方法名/变量 - 开头字母小写，多个单词从第二个单词开始首字母大写
       example: display()  setAge()  getAge()  name  firstName
   4.常量 - 每个字母都大写，多个单词之间用下划线(_)分隔
       example: SCORE MAX_AGE
   5.项目名 - 每个字母都小写，多个单词之间用(-)分隔
       example: demo java-demo
   ```

*  尽量采用**驼峰式**的命名方式
   
   ```
   example: 苹果 apple /  笔记本 noteBook
   ```

### 关键字

**关键字:** 被 `Java` 语言赋予了特殊含义，用作专门用途的字符串。

*  关键字不能作为标识符出现，但是可以是标识符其中的一部分。
*  ```
   example: int,long,double 
   ```
   |abstract|assert|boolean|break|byte|case|catch|
|---|---|---|---|---|---|---|
|char|class|continue|const|default|do|double|
|else|extends|enum|final|finally|float|for|
|goto|if|implements|import|instanceof|int|interface|
|long|native|new|package|private|protected|public|
|return|short|static|synchronized|super|strictfp|this|
|throw|throws|transient|try|void|volatile|while|

### 注释

**注释是用来对当前编写的代码进行解释，方便后续人员的维护。因此，我们在编写代码的时候一定要书写注释，养成良好的编程习惯**

```
Java中的注释有三种
1.单行注释
    // 我是注释的内容
2.多行注释
    /*
        你好呀！
        我是注释。
    */
3.文档注释，可以使用javadoc生成文档
    /**
      * 我是文档注释。
      */
```

**注意**

*  被注释的文字不会被编译
*  多行注释和文档注释不能嵌套使用！

### 数据类型

**Java是强类型语言，对于每一种数据都需要定义明确的数据类型**

1. `Java` 中数据类型分为**基本数据类型**和**引用数据类型**。
   
   *  ```
      基本数据类型分为数值型(整型、浮点型)、字符型、布尔型，共8种.
      byte、short、char、int、long、float、double、boolean
      ```
   *  ```
      引用数据类型：类、数组、接口等(此处不过多介绍，后续会详细说明)
      ```

2. **整型**：用于表示没有小数部分的数值，它允许为负数。
   |类型|存储空间|取值范围|默认值|
|---|---|---|---|
|byte|1个字节|-128 ~ 127|0|
|short|2个字节|-32768 ~ 32767|0|
|int|4个字节|-2147483648 ~ 2147483647|0|
|long|8个字节|-9223372036854775808 ~ 9223372036854775807|0|
   
   **注释**
   
   ```
   int为整型的默认类型.
   在声明long类型变量时，需要数字末尾加上L/l. example: long l1 = 100L;
   ```

3. **浮点型**：用于表示有小数部分的数值
   |类型|存储空间|取值范围|默认值|
|---|---|---|---|
|float|4个字节|大约 ± 3.40282347E+38F(有效位数6 ~ 7位)|0.0|
|double|8个字节|大约 ± 1.79769313486231570E+308(有效位数为15位)|0.0|
   
   **转义字符：** 是Java中一种特殊的字符常量，转义字符以(\)开头后面接1个或多个字符。
   
   ```
   \t - 制表符，等同于TAB键
   \n - 换行符
   \\ - 表示\
   \" - 表示"
   \' - 表示'
   \0 - 表示空白字符
   ```
   
   **注释**
   
   ```
   double为浮点型的默认类型.
   在声明float变量时，需在数字末尾加上F/f. example: float f1 = 10.2F;
   浮点数值采用二进制系统表示，无法精确的表示1/10等，如不允许有误差，请参照BigDecimal类.
   ```

4. **字符型**：char
   
   ```
   char: 字符型。占2个字节，默认值：'\u0000'
   不建议在程序中使用char类型。
   ```

5. **布尔型**：boolean
   
   ```
   boolean：布尔型。占1个字节，只有true和false两种取值。默认值：false
   整型和布尔型之间不可以相互转换
   ```

### 自动类型转换与强制类型转换

1. **自动类型转换**：精度小的数据类型到精度大的数据类型为自动类型转换
   
   <img referrerpolicy="no-referrer" data-src="/img/bVbD6ub" src="https://cdn.segmentfault.com/v-5e154194/global/img/squares.svg" alt="basic1.png" title="basic1.png">
   
   ```
      图中实线箭头表示无信息丢失的转换
      图中虚线箭头表示可能有精度损失的转换

      当两个数值在进行二元计算时：
      两个操作数中有一个是double类型，另一个操作数就会转为double类型
      两个操作数中有一个是float类型，另一个操作数就会转为float类型
      两个操作数中有一个是long类型，另一个操作数就会转为long类型
      其余情况，都转为int类型计算
   ```
   
   **注释**
   
   ```
      char <-> int 字符型可与整型互相转换
      boolean不参与自动类型转换
      不能把对象类型转为不相关类的对象
      转换过程中可能出现精度损失，浮点数到整数通过舍弃小数得到，而不是四舍五入
   ```

2. **强制类型转换**：把容量大的类型转为容量小的类型
   
   ```
   1).转换的类型必须是兼容的
   2).不建议强制类型转换，因为会损失精度
   3).从浮点型强制转为整型，会截断小数部分，仅保留整数部分(不是四舍五入)
       double x = 9.97;
       int nx = (int)x; // nx = 9
   ```

### 运算符

1. **算数运算符**
   
   ```
   +(正号)、-(负号)
   +(加)、-(减)、*(乘)、/(除)、%(取余)
   ++(自增)、--(自减)、+(连接符，用于连接两个字符串)
      % ：最后的符号和被模数一样。example: a % b = ? 最后的符号和b的符号一样
      / ：做除法运算时，最后的结果为整型。example: 5 / 2 = 2
          当除数为浮点类型时，结果为浮点类型. example: 5 / 2.0 = 2.5
      a++ : 在进行运算时，用a的值进行运算，最终a+1
      ++a : 在进行运算时，用a+1的值进行运算，最终a+1
      +: 连接符 example: "hello" + "world" = "helloworld"
   ```

2. **关系运算符**
   
   ```
   >(大于)、<(小于)
   >=(大于等于)、>=(小于等于)
   ==(等于)、!=(不等于)
   instanceof(检查是否为类的对象)
   关系运算符的最终结果为布尔型，要么为true，要么为false.
   ```

3. **赋值运算符**
   
   ```
   =、+=、-=、*=、/=、%=
       a += b ：相当于 a = a + b
   最后结果的数据类型和左侧操作数的类型相同
   example: 
       int a = 2;
       a += 2.5; //等同于 a = (int)(a + 2.5);
   ```

4. **逻辑运算符**
   
   ```
   &(与)、|(或)
   &&(短路与)、||(短路或)
   !(非)
   &&和||两侧为boolean类型
       &&运算规则：两侧都为true结果为true
       ||运算规则：两侧都为false结果才为false
   &&与&的区别：&&在参与运算时，只要左侧为false，右侧则不参与运算，而&两侧都参与运算
   ||与|的区别：||在参与运算时，只要左侧为true，右侧则不参与运算，而|两侧都参与运算
   ```

5. **位运算符**
   
   ```
   &(按位与)、|(按位或)、^(按位异或，同为0，异为1)、~(取反)
   >>(右移位)、<<(左移位)、>>>(无符号右移)
   &和|两侧为数值型
       运算规则：将数字转为二进制，按位计算，位数少的左侧补0
                左移相当于在此基础上乘2 example: 2 << 1 = 2 * 2
                右移相关于在此基础上除2 example: 2 >> 1 = 2 / 2
   ```

6. **三目运算符**
   
   ```
   条件表达式 ? 表达式1 : 表达式2
       条件表达式结果为true，执行表达式1
       条件表达式结果为false，执行表达式2
       表达式1 与 表达式2 的类型必须一致！
   ```

7. **注意**
   
   ```
   相关计算：
   byte，short，char在进行运算时，优先会转为int类型进行运算。
   a += b 与 a = a + b 的区别：
       当byte,short,char进行运算时：
           byte += 2 -> 最后的类型为byte
           byte = byte + 2 -> 程序不能编译
           因为byte在参与运算时会以int类型计算
           所以int不能直接赋值给byte
           需要强制类型转化
           byte = (byte)byte + 2;
   ```

### 常量和变量

**常量** : 在 `Java` 中用关键字 `final` 指示常量，常量一旦被赋值，不能被改变

**类常量** : 在一个类的多个方法中使用，可以定义为类常量，用 `static final` 来设置一个常量

```
final double CIRCLE_R = 2.3;
static final double CIRCLE_R = 3.3;
```

**变量** : 在程序中，其值可以被改变的。在声明一个变量时，必须对变量进行初始化，不能使用没被初始化的变量

```
int studentNumber = 20;
double area = 10;
```

### 流程控制

**块作用域** : 即复合语句，指由一对大括号括起来的若干语句，块确定了变量的作用域

```
public static void main(String[] args) {
    int n = 0;
    {
        int p = 4;  //只在此大括号内有效
    }
    System.out.println(p); //出错，找不到变量p
}
```

**流程结构分为：顺序结构，选择结构，循环结构**

1. **顺序结构**：自顶向下依次执行
2. **选择结构**：也叫分支结构。
   
   ```
   1.switch-case[-default] 用于处理多个选项的操作
       switch() 表达式可为char byte short int 等常量表达式，字符串(JDK1.7引入)，枚举类型(JDK1.5引入)等
       case子句必须为常量
       default在没有对应case的情况下来执行的。为可选项
       case 和 default 后的语句可加break，用来跳出当前分支，执行后续语句，
       如没有break，则从匹配项开始以下向下执行，途中遇到break也会跳出当前分支。
   2.if, if-else, if-else if[-else]
     if - else if - else 中的条件最好有范围大道范围小去书写
     example: 
         int grade  = 80;
         if(grade > 80) {
           System.out.println("优秀");
         } else if (grade >= 60 && grade < 80) {
           System.out.println("中等");
         } else {
           System.out.println("不及格");
         }
   ```
   
   详细代码见[Github](https://github.com/zhangzhibo1014/DaBoJava/blob/master/Basic/src/Demo.java)~

3. **循环结构**：
   
   ```
   1.while(条件表达式) 
   先判断是否符合条件，符合后执行循环体，如果开始不符合条件，则一次也不执行
   2.do-while(条件表达式); 注意分号
   先执行一次，在判断是否符合条件，符合后执行循环体，不管是否符合条件都会执行一次循环体
   3.for(,,)
   4.foreach - 增强for循环
   for(variable : collection) statement
   example: 
       for(int element : a) 
           System.out.println(element); //打印a集合中的元素

   循环结构中，往往都会有循环变量，用来控制循环的次数
   一般循环结构为：循环变量初始化，循环条件判断，循环变量自增
   循环条件为boolean类型

   break：用于结束当前循环(多重循环结束本层)
   continue：用于结束本次循环，开始下一次循环
   ```
   
   详细代码见[Github](https://github.com/zhangzhibo1014/DaBoJava/blob/master/Basic/src/Demo.java)~

### 数组

**数组：** 是一种数据结构，存储相同类型数据的集合。下面所有数据我们都以 `int` 类型为例。

1. **定义数组**
   
   ```
   int[] numbers = null;
   ```

2. **初始化**
   
   ```
   静态初始化：int[] numbers = {1,2,3,4,5};
             int[] numbers = new int[] {1,2,3,4,5};
   动态初始化：int[] numbers = new int[5]; //定义一个长度为5的int类型的数组
   数据类型[] 数组名 = new 数据类型[长度]
   ```

3. **数组的访问**
   
   ```
   在数组中，可以采用数组名[下标|索引]的方式来访问数组中的元素
   所有数组的下标都从0开始，最后一个元素为数据的长度-1.
   Java中用length属性来获取数据的长度。
   int len = numbers.length;
   ```

4. **数组的赋值**
   
   ```
   我们可以为数组中的每一位进行赋值
   numbers[0]=0;
   numbers[4]=4;
   当数组长度太多时，可以通过循环来进行赋值
   for(int i = 0; i < 100; i++) { 
       numbers[i] = i; 
   }
   ```

5. **数组的遍历**
   
   ```
   int[] numbers = new int[] {1,2,3,4,5};
   for (int i  : numbers) {
       System.out.println(i);
   }
   ```

6. **数组拷贝**
   
   ```
   在Java中，允许将一个数组变量拷贝给另一个数组变量，这时两个变量都引用同一个数组
   example:
       int[] numbers = {1,2,3,4,5};
       int[] nums = numbers;
       
   Arrays.copyOf();也能实现，后续会说~
   ```

### 方法

`Java`中为了提高代码的复用性，可以将其定义成一个单独的功能，该功能的体现就是`Java`中的方法。

`Java` 中方法的格式:

```
访问控制符 返回值类型 函数名(参数类型1，形式参数1，参数类型2，形式参数2) {
    执行语句;
    return 返回值;
}
```

当函数没有具体返回值时，返回值类型为 `void` 关键字表示如果函数的返回值类型是 `void` 时，`return` 语句可以省略不写，系统会自动添加`return` 的作用：结束函数。

**方法的作用**

1. 用于定义功能
2. 用于封装代码提高代码的复用性

**注意：方法中只用调用方法，不能定义方法**

### 输入和输出

#### 输入

为了增加后面示例程序的趣味性，需要程序能够接收输入，并以适当的格式输出。

要想通过控制台进行输入，首先需要构造一个 `Scanner `对象，并与“ 标准输入流” `System.in`关联.

`Scanner` 类定义在`java.util` 包中。当使用的类不是定义在基本`java.lang` 包中时，一定要使用`import `指示字将相应的包加载进来。

```
import java.util.*;  //必须导入该包

Scanner in = new Scanner(System.in);
String name = in.nextLine(); //输入一行,使用 nextLine方法是因为在输入行中有可能包含空格。
String firstName = in.next();//读取一个单词，遇见空白符停止
int i = in.nextInt();//读取一个整数
double d = in.nextDouble();//读取一个浮点数

Scanner API:
next():获取字符串，遇到空白字符停止
nextLine():获取一行字符
nextInt():获取int类型的整数
nextDouble():获取double类型的浮点数
hasNext():是否有下一个输入，如果有，返回true，否则返回false
```

#### 输出

*  `System.out.println(); //输出并换行`
*  `System.out.print(); // 输出不换行`
*  `System.out.printf(); //格式化输出`
   |%d|以十进制整数格式输出|%f|以十进制浮点数格式输出|
|---|---|---|---|
|%c / %C|以字符符号输出|%s / %S|以字符串格式输出|
|%o|以八进制整数格式输出|%x / %X|以十六进制整数格式输出|
   
   以上为常用的一些格式化控制符，还有其他的，可自行查询。

### 总结

掌握 `Java` 基础语法部分后，大家一定要多加练习，程序员的路就是 **多动手** 

相关代码记录于[GitHub](https://github.com/zhangzhibo1014/DaBoJava)中，欢迎各位伙伴 **Star** ！

有任何疑问 **微信搜一搜 [程序猿大博]** 与我联系~

如果觉得对您有所帮助，请 **点赞** ，**收藏** ，如有不足，请评论或私信指正！谢谢~
