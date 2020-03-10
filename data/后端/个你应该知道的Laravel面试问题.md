

<img referrerpolicy="no-referrer" data-src="/img/remote/1460000021967248" src="https://cdn.segmentfault.com/v-5e67172c/global/img/squares.svg" alt="Laravel" title="Laravel">


>
>[https://learnku.com/laravel/t...](https://learnku.com/laravel/t/41264)
>
>
>
>[https://learnku.com/Laravel](https://learnku.com/Laravel)

探索下一次技术面试之前应该了解的前20个 Laravel 面试问题。

### Q1：什么是Laravel？


>
>**Laravel**
>

**Laravel** 是一个免费的开放源代码 PHP Web 框架，由 Taylor Otwell 创建，旨在遵循模型-视图-控制器(MVC)架构模式开发 Web 应用程序。

🔗 **来源:** [codingcompiler.com](https://codingcompiler.com/laravel-interview-questions-answers/)

### Q2: Laravel 与其他 Php 框架相比有哪些好处？


>
>**Laravel**
>

*  与其他框架相比，设置和自定义过程既简单又快速。
*  内置认证系统
*  支持多个文件系统
*  预装软件包，例如 Laravel Socialite，Laravel cashier，Laravel elixir，Passport，Laravel Scout
*  PHP active record 实现的 Eloquent ORM (对象关系映射)
*  内置命令行工具 “Artisan”，用于创建代码框架，数据库结构并构建其迁移

🔗 **来源:** [mytectra.com](https://www.mytectra.com/interview-question/laravel-interview-questions-and-answers/)

### Q3：解释 Laravel 中的迁移


>
>**Laravel**
>

**Laravel Migrations** 类似于数据库的版本控制，使团队可以轻松地修改和共享应用程序的数据库架构。迁移通常与 Laravel 的架构生成器搭配使用，以轻松构建应用程序的数据库架构。

🔗 **来源：** [laravelinterviewquestions.com](http://www.laravelinterviewquestions.com/laravel-interview-questions-and-answers/page/4#sthash.pQAzAunW.dpbs)

### Q4：Facade Pattern 有什么用？


>
>**Laravel**
>

**Facades** 为应用程序的服务容器中可用的类提供了一个 *静态* 接口。Laravel facades 作为服务容器中基础类的*静态代理*，提供了简洁、表达性强的语法的优势，同时保持了比传统静态方法更高的可测试性和灵活性。

所有的 Laravel facades 都是在 `Illuminate\Support\Facades` 命名空间中定义。查看:

```
use Illuminate\Support\Facades\Cache;

Route::get('/cache', function () {
    return Cache::get('key');
});
```

🔗 **来源：** [laravel.com](https://laravel.com/docs/5.6/facades)

### Q5：什么是服务容器？


>
>**Laravel**
>

Laravel **服务容器** 是用于管理类依赖性和执行依赖性注入的工具。

🔗 **来源：** [laravel.com](https://laravel.com/docs/5.7/eloquent#query-scopes)

### Q6：什么是 Eloquent Models？


>
>**Laravel**
>

Laravel 附带的 Eloquent ORM 提供了一个漂亮、简单的 ActiveRecord 实现，用于处理数据库。每个数据库表都有一个对应的**模型**，用于与该表进行交互。通过模型，您可以查询表中的数据，以及将新记录插入表中。

🔗 **来源：** [laravel.com](https://laravel.com/docs/5.7/eloquent)

### Q7：什么是Laravel事件？


>
>**Laravel**
>

Laravel 事件提供了一个简单的**观察者模式**实现，允许订阅和监听应用程序中的事件。事件是程序检测并处理的事故或事情。

以下是 Laravel 中的一些事件示例：

*  新用户注册
*  发布新评论
*  用户登录/注销
*  添加了新产品。

🔗 **来源：** [mytectra.com](https://www.mytectra.com/interview-question/laravel-interview-questions-and-answers/)

### Q8：你对 Laravel 中的查询生成器了解多少？


>
>**Laravel**
>

Laravel 的数据库查询构建器为创建和运行数据库查询提供了方便，流畅的接口。它可以用于在应用程序中执行大多数数据库操作，并且可以在所有支持的数据库系统上工作。

Laravel 查询构建器使用 PDO 参数绑定来保护应用程序免受 SQL 注入攻击。无需清除作为绑定传递的字符串。

查询生成器的一些功能：

*  分块
*  聚合
*  Selects
*  原生方法
*  Joins
*  Unions
*  Where 语句
*  Ordering，Grouping，Limit，& Offset

🔗 **Source:** [laravel.com](https://laravel.com/docs/5.7/queries#raw-expressions)

### Q9：如何生成迁移？


>
>**Laravel**
>

**迁移**就像您数据库的版本控制一样，使您的团队可以轻松地修改和共享应用程序的数据库架构。迁移通常与 Laravel 的架构构建器搭配使用，以轻松构建应用程序的数据库架构。

要创建迁移，使用 `make：migration` Artisan 命令：

```
php artisan make:migration create_users_table
```

新的迁移将放置在您的 `database/migrations` 目录中。每个迁移文件名都包含一个时间戳，该时间戳使 Laravel 可以确定迁移的顺序。

🔗 **来源：** [laravel.com](https://laravel.com/docs/5.7/migrations)

### Q10：如何 mock 一个静态 facade 方法？


>
>**Laravel**
>

Facades 为应用程序的服务容器中可用的类提供“静态”接口。与传统的静态方法调用不同，Facades 是*可被 mock 的*。我们可以使用 `shouldReceive` 方法 mock 对静态外观方法的调用，该方法将返回 `Mockery` mock 的实例。

```
// 实际代码
$value = Cache::get('key');

// 测试
Cache::shouldReceive('get')
                    ->once()
                    ->with('key')
                    ->andReturn('value');
```

🔗 **来源：** [laravel.com](https://laravel.com/docs/5.7/mocking)

### Q11：Eager Loading 有什么好处，何时使用？


>
>**Laravel**
>

当访问 Eloquent 关系作为属性时，关系数据是 “Lazy Loaded” 的。这意味着直到您首次访问该属性，关系数据才被实际加载。但是，Eloquent 可以在查询父模型时 “Eager Load” 关系。

当我们有嵌套对象时(例如书本->作者)，Eager Loading 减轻了 `N + 1` 查询的问题。我们可以使用 Eager Loading 将此操作减少为仅2个查询。

🔗 **来源：** [FullStack.Cafe](https://www.fullstack.cafe/)

### Q12：本地作用域有何用？


>
>**Laravel**
>

**Scopes** 允许您轻松地在模型中复用查询逻辑。要定义 scope，只需在模型方法的前面加上 scope：

```
class User extends Model {
    public function scopePopular($query)
    {
        return $query->where('votes', '>', 100);
    }

    public function scopeWomen($query)
    {
        return $query->whereGender('W');
    }
}
```

用法:

```
$users = User::popular()->women()->orderBy('created_at')->get();
```

有时您可能希望定义一个接受参数的 scope。**Dynamic scopes** 接受查询参数：

```
class User extends Model {
    public function scopeOfType($query, $type)
    {
        return $query->whereType($type);
    }
}
```

用法:

```
$users = User::ofType('member')->get();
```

🔗 **来源：** [laravel.com](https://laravel.com/docs/5.0/eloquent#query-scopes)

### Q13：Laravel中的路由命名是什么？


>
>**Laravel**
>

路由命名使得在生成重定向或者 URL 的时候更加方便地引用路由。您可以通过将 name 方法加到路由定义上来指定命名路由：

```
Route::get('user/profile', function () {
    //
})->name('profile');
```

您可以为控制器操作指定路由名称：

```
Route::get('user/profile', 'UserController@showProfile')->name('profile');
```

为路由分配名称后，您可以在生成 URL 或重定向时，通过全局路由功能使用路由名称：

```
// Generating URLs...
$url = route('profile');

// Generating Redirects...
return redirect()->route('profile');
```

🔗 **来源：** [laravelinterviewquestions.com](http://www.laravelinterviewquestions.com/laravel-interview-questions-and-answers/page/10#sthash.6MpaOmkG.dpbs)

### Q14：Laravel中的闭包是什么？


>
>**Laravel**
>

闭包是一个匿名函数。闭包通常用作回调方法，并且可以用作函数中的参数

```
function handle(Closure $closure) {
    $closure('Hello World!');
}

handle(function($value){
    echo $value;
});
```

🔗 **来源：** [stackoverflow.com](https://stackoverflow.com/questions/47348081/what-is-closure-in-laravel)

### Q15：列出 Laravel 中查询构建器提供的一些聚合方法？


>
>**Laravel**
>

聚合函数是一种功能，能够将多行的值组合在一起，作为某些条件下的输入，以形成具有更重要含义或度量值(例如集合，包或列表)的单个值。

以下是 Laravel 查询构建器提供的一些聚合方法的列表：

*  count()

```
$products = DB::table(‘products’)->count();
```

*  max()

```
    $price = DB::table(‘orders’)->max(‘price’);
```

*  min()

```
    $price = DB::table(‘orders’)->min(‘price’);
```

*  avg()

```
    *$price = DB::table(‘orders’)->avg(‘price’);
```

*  sum()

```
    $price = DB::table(‘orders’)->sum(‘price’);
```

🔗 **来源：** [laravelinterviewquestions.com](http://www.laravelinterviewquestions.com/laravel-interview-questions-and-answers/page/3#sthash.Pa7vkxua.dpbs)

### Q16：什么是 Laravel 中的反向路由？


>
>**Laravel**
>

在 Laravel 中，反向路由会根据路由声明生成 URL。反向路由使您的应用程序更加灵活。例如，下面的路由声明告诉 Laravel 当请求的 URI 为 “login” 时在 users 控制器中执行 “login” 操作。

[http://mysite.com/login](http://mysite.com/login)

```
Route::get(‘login’, ‘users@login’);
```

使用反向路由，我们可以创建到它的链接并传递我们定义的任何参数。如果未提供可选参数，则会从生成的链接中删除。

```
{{ HTML::link_to_action('users@login') }}
```

它将在视图中创建类似 [http://mysite.com/login](http://mysite.com/login) 的链接。

🔗 **来源：** [stackoverflow.com](https://stackoverflow.com/questions/30287896/rollback-one-specific-migration-in-laravel)

### Q17: ：让我们为 PHP 创建枚举，提供一些代码示例。


>
>**PHP**
>

如果我们的代码需要对枚举常量和值进行更多验证，该怎么办？

---

根据使用情况，我通常会使用类似以下的简单内容：

```
abstract class DaysOfWeek
{
    const Sunday = 0;
    const Monday = 1;
    // etc.
}

$today = DaysOfWeek::Sunday;
```

这是一个扩展的示例，可以更好地服务于更广泛的案例：

```
abstract class BasicEnum {
    private static $constCacheArray = NULL;

    private static function getConstants() {
        if (self::$constCacheArray == NULL) {
            self::$constCacheArray = [];
        }
        $calledClass = get_called_class();
        if (!array_key_exists($calledClass, self::$constCacheArray)) {
            $reflect = new ReflectionClass($calledClass);
            self::$constCacheArray[$calledClass] = $reflect - > getConstants();
        }
        return self::$constCacheArray[$calledClass];
    }

    public static function isValidName($name, $strict = false) {
        $constants = self::getConstants();

        if ($strict) {
            return array_key_exists($name, $constants);
        }

        $keys = array_map('strtolower', array_keys($constants));
        return in_array(strtolower($name), $keys);
    }

    public static function isValidValue($value, $strict = true) {
        $values = array_values(self::getConstants());
        return in_array($value, $values, $strict);
    }
}
```

我们可以将其用作：

```
abstract class DaysOfWeek extends BasicEnum {
    const Sunday = 0;
    const Monday = 1;
    const Tuesday = 2;
    const Wednesday = 3;
    const Thursday = 4;
    const Friday = 5;
    const Saturday = 6;
}

DaysOfWeek::isValidName('Humpday');                  // false
DaysOfWeek::isValidName('Monday');                   // true
DaysOfWeek::isValidName('monday');                   // true
DaysOfWeek::isValidName('monday', $strict = true);   // false
DaysOfWeek::isValidName(0);                          // false

DaysOfWeek::isValidValue(0);                         // true
DaysOfWeek::isValidValue(5);                         // true
DaysOfWeek::isValidValue(7);                         // false
DaysOfWeek::isValidValue('Friday');                  // false
```

🔗 **来源：** [stackoverflow.com](https://stackoverflow.com/questions/254514/php-and-enumerations)

### Q18：什么是PHP自动加载类？


>
>**PHP**
>

使用自动加载器，PHP 允许在由于错误而失败之前最后一次加载类或接口。

PHP中的 `spl_autoload_register() `函数可以注册任意数量的自动加载器，即使未定义类和接口也可以自动加载。

```
spl_autoload_register(function ($classname) {
    include  $classname . '.php';
});
$object  = new Class1();
$object2 = new Class2(); 
```

在上面的示例中，我们不需要包含 Class1.php 和 Class2.php。`spl_autoload_register()` 函数将自动加载 Class1.php 和 Class2.php。

🔗 **来源：** [github.com/Bootsity](https://github.com/Bootsity/cracking-php-interviews-book)

### Q19：PHP是否支持方法重载？


>
>**PHP**
>

**方法重载**是使用具有不同签名的相同方法名称的现象。PHP 中函数签名仅基于它们的名称，并且不包含参数列表，因此不能有两个具有相同名称的函数，所以 PHP 不支持方法重载。

但是，您可以声明一个**可变函数**，它接受可变数量的参数。您可以使用 `func_num_args()` 和 `func_get_arg()` 来传递参数并正常使用它们。

```
function myFunc() {
    for ($i = 0; $i < func_num_args(); $i++) {
        printf("Argument %d: %s\n", $i, func_get_arg($i));
    }
}

/*
Argument 0: a
Argument 1: 2
Argument 2: 3.5
*/
myFunc('a', 2, 3.5);
```

🔗 **来源：** [github.com/Bootsity](https://github.com/Bootsity/cracking-php-interviews-book)

### Q20：Laravel 中为什么需要 Traits？


>
>**Laravel**
>

**Traits** 已被添加到 PHP 中，原因很简单s：PHP 不支持多重继承。简而言之，一个类不能一次性扩展至多个类。当你需要在其他类也使用的两个不同类中声明的功能时，这变得很费力，结果是你必须重复执行代码才能完成工作，而不会纠缠自己。

引入 Traits，它能使我们声明一种包含多个可复用方法的类。更好的是，它们的方法可以直接注入到你使用的任何类中，并且你可以在同一类中使用多个 Trait。让我们看一个简单的 Hello World 示例。

```
trait SayHello
{
    private function hello()
    {
        return "Hello ";
    }

    private function world()
    {
        return "World";
    }
}

trait Talk
{
    private function speak()
    {
        echo $this->hello() . $this->world();
    }
}

class HelloWorld
{
    use SayHello;
    use Talk;

    public function __construct()
    {
        $this->speak();
    }
}

$message = new HelloWorld(); // returns "Hello World";
```

🔗 **来源：** [conetix.com.au](https://www.conetix.com.au/blog/simple-guide-using-traits-laravel-5)

### Q21：PHP 中的 Autoloader 是什么？


>
>**Laravel**
>

自动加载器定义了自动在代码中包含 PHP 类的方法，而不必使用诸如 require 和 include 之类的语句。

*  **PSR-4** 将支持更简单的文件夹结构，但是将使我们仅通过查看完全限定的名称就无法知道类的确切路径。
*  **PSR-0** 在硬盘驱动器上比较混乱，但是支持恋旧的开发人员(类名下划线用户)，并帮助我们通过以下方式辨别类的位置：看它的名字。

🔗 **来源：** [sitepoint.com](https://www.sitepoint.com/battle-autoloaders-psr-0-vs-psr-4/)

### Q22：在 PHP 中 yield 是什么意思？


>
>**PHP**
>

解释此代码以及 `yield` 的作用：

```
function a($items) {
    foreach ($items as $item) {
        yield $item + 1;
    }
}
```

---

`yield` 关键字从生成器函数返回数据。生成器函数实际上是编写 `Iterator` 的更紧凑和有效的方式。它允许您定义一个函数，该函数将在您遍历该函数时计算并返回值。

因此，问题中的函数与以下内容的函数几乎相同：

```
function b($items) {
    $result = [];
    foreach ($items as $item) {
        $result[] = $item + 1;
    }
    return $result;
}
```

只有一个区别，`a()` 返回一个 `generator`，而 `b()` 只是一个简单的 `数组`。而且两者都可以被迭代。

函数的生成器版本未分配完整的数组，因此对内存的需求较少。生成器可用于解决内存限制。由于生成器仅按需计算其 *yielded* 值，因此它们用于代替计算成本昂贵或无法一次性计算的序列很有用。

🔗 **来源：** [stackoverflow.com](https://stackoverflow.com/questions/17483806/what-does-yield-mean-in-php)

### Q23：$$$ 在 PHP 中是什么意思？


>
>**PHP**
>

类似 `$$variable` 的语法称为可变变量。

让我们尝试 $$$：

```
$real_variable = 'test';
$name = 'real_variable'; // variable variable for real variable
$name_of_name = 'name'; // variable variable for variable variable

echo $name_of_name . '<br />';
echo $$name_of_name . '<br />';
echo $$$name_of_name . '<br />';
```

这是输出：

```
name
real_variable
test
```

🔗 **来源：** [guru99.com](https://stackoverflow.com/questions/2715654/what-does-dollar-dollar-or-double-dollar-mean-in-php)


>
>[https://learnku.com/laravel/t...](https://learnku.com/laravel/t/41264)
>
>
>
>[https://learnku.com/Laravel](https://learnku.com/Laravel)
