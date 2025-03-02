# 鸿蒙开发 ArkTS



# Image: 图片显示组件

#### 声明Image组件并设置图片源

``Image(src:string|PixelMap|Resource)``

##### 1、string格式：通常用来加载网络图片，需要申请网络访问权限：`ohos.permission.INTERNET`

`Image('https://xxx.png')`

##### 2、PixelMap格式，可以加载像素图，常用在图片编辑中

`Image(pixelMapobject)`

##### 3、Resource格式，加载本地图片，推荐使用

`Image($r('app .media.mate60'))`  读取media文件下图片

`Image($rawfile('mate60.png'))` 读取rawfile文件下图片

#### 图片插值

```
Image($r('app.media.icon'))
	.interpolation(ImageInterpolation.High)
	.fillColor(Color.White) 图片填充颜色 仅支持svg格式
```



# Text：文本显示组件

#### 配置不同系统不同文字

在文件resources中的base、en_US和zh_CN中的element的string.json文件中配置文字

```
{
	"string":[
		{
			"name":"width_label",//key
			"value":"显示的文字"
		}
	]
}
```

#### 读取并修改属性

```
Text($r('app.string.width_label'))
	.lineHeight(32) //行高
	.fontSize(20)//字体大小
	.fontColor('#fff')//字体颜色
	.fontWeight(FontWeight.Medium)//字体粗细
	.decoration({type:TextDecorationType:LineThrough})//文字装饰  下划线
```



## TextInput：文本输入框

#### 声明TextInput组件

```
TextInput({placeholder?:ResourceStr,text?:ResourceStr})
```

​	1、placeholder：输入框无输入时提示的文本

```
TextInput({placeholder:'请输入账号或手机号'}）
```

2、text:输入框当前的文本内容

```
TextInput({text:'admin'}）
```

#### 添加属性和事件

```
TextInput({text:'当前输入文本'})
	.width(150)//宽
	.height(30)//高
	.backgroundColor('#fff')//背景色
	.type(InputType.Password)//输入框类型
	.onChange(value => {//text默认值也会触发
		//value是用户输入的文本内容
	})
```

##### 输入框类型

type为数字类型时，拿取value时value类型为字符串

| 名称        | 描述                                                       |
| ----------- | ---------------------------------------------------------- |
| Normal      | 基本输入模式。支持输入数字、字母、下划线、空格、特殊字符   |
| Password    | 密码输入模式。支持输入数字、字母、下划线、空格、特殊字符。 |
| Email       | 邮箱地址输入模式。支持数字，字母，下划线，以及@字符        |
| Number      | 纯数字输入模式                                             |
| PhoneNumber | 电话号码输入模式。支持输入数字、+、-、*、#、长度不限       |

# Button：按钮组件

#### 声明Button组件，label是按钮文字

```
Button(label?:ResourceStr)
```

1、文字按钮

```
Button('点我')
```

2、自定义按钮，在Button内嵌套其他组件

```
Button(){
	Image($r('app.media.search')).width(20).margin(10)
}
```

#### 按钮属性和事件

```
Button('点我')
	.width(100)
	.height(30)
	.type(ButtonType.Normal)//按钮类型
	.onClick(()=>{
		//处理点击事件
	})
```

##### 按钮类型

| 名称    | 描述                                   |
| ------- | -------------------------------------- |
| Capsule | 胶囊型按钮(圆角默认为高度的一半，默认) |
| Circle  | 圆形按钮                               |
| Normal  | 普通按钮(默认不带圆角)                 |



# Slider：滑动条组件

#### 声明Slider组件

```
Slider({
	min:0,// 最小值
	max:100,// 最大值
	value:30,// 当前值
	step:10,// 滑动步长
	style:SliderStyle.OutSet,// 枚举，滑块与滑轨的样式  InSet
	direction:Axis.Horizontal,// 枚举，滑轨方向 Vertical
	reverse:false,// 是否反向
})
	.showTips(true) // 是否展示value百分比提示
	.blockColor('#36d') // 滑块颜色
	.trackThickness(8) // 滑轨粗细
	.onChange(value=>{
		
	})
```

# 布局

#### column容器

纵向布局

#### Row容器

横向布局

#### flex布局

```
Row(){
	//内容
}
	.justifyContent(FlexAlign.Center)
```

# 状态管理

#### 声明

在build函数外声明

```
@State message: string = 'Hello World'
```

#### 赋值

```
this.message = 'newValue'
```

#### 调用

通过`this.`来调用

```
 Text(this.message)
```

### @State 简单数据类型

- @State装饰器标记的变量必须初始化，不能为空值
- @State支持object、classstring、number、Boolean、enum类型以及这些类型的数值
- 嵌套类型以及数组中的对象属性无法触发试图更新



# Progress进度条组件

```
Progres:({
	value:this.value,//进度值
	total:thiss.total,//总值
	type:ProgressType.Ring //环形进度条
})
```

# Stack堆叠容器

- 子组件按顺序依次入栈，后一个子组件覆盖前一个子组件



# Blank组件

- 作用：空白、在容器内部沾满剩余空间



# 构建函数

```
@Builder Button(index:Number){
	Button(){
		
	}
}
```



# 循环控制和List组件

```
List({space:10}){//每一条间距为10  需要设置高度才能滚动
	ForEach(arr:Array, //要遍历的数据数组(item:any,index?:number)=>{ //index可选
		ListItem(){ //List内部必须含有ListItem组件
			if( item.discount ){
				//内容A
			}else{
				//内容B
			}
		}
		.swipeAction({end:this.Button(index)})//滑动 在尾部滑动 接收构建函数 局部构建函数使用this调用
	}
}，
	.layoutWeight(1) //占据容器内剩余空间
	.listDirection(Axis.Vertical)// 列表方向，默认纵向 Axis.Horizontail(水平)
	KeyGenerator?:(item:any,index?:number):string=>{
		//键生成函数，为数组每一项生成一个唯一标示，组件是否重新渲染的判断标准
		//无需手动设置，会默认以index+item数据
	}
)
```



# 统一样式管理

```
//通用样式
@Style function 样式名称(){
	.width:('95%')
	.padding:(20)
	.backgroundColor(Color.White)
	.borderRadius(15)
	.shadow({radiu:6,color:'#36d',offetX:2,offsetY4})
}
//私有样式
@Extend(Text) function 样式名称(){
	.decoration({type:TextDecorationType.LineThrough})//设置文本装饰线（中划线）样式及其颜色
	.fontColor('#36d')
}
```



# 组件通信

#### 静态数据

```
//父组件
Header({title:'信息'})

//子组件
private title:ResourceStr

转递函数

//父组件
TaskItem({onTaskChange:this.TaskChange})
//传递时如果方法中只用了this，在子组件调用时this会指向子组件
//让this指向父组件
TaskItem({onTaskChange:this.TaskChange.bind(this)})

//子组件
函数名: ()=> viod //定义当前函数为无参无返回值的函数
```

#### 动态数据

@prop和@link装饰的变量不能做初始化

|                @prop                |           @link            |
| :---------------------------------: | :------------------------: |
|              单项同步               |          双向同步          |
| 只支持string、number、Boolean、enum | 父子类型一致，支持所有类型 |
|          {info:this.inofo}          |        {info:$info}        |

@Provide和Consume可以跨足剑提供类似于@State和Link的双向同步

直接定义状态，无需手写传值，会造成资源消耗

### 复杂数据类型

@ObjectLink和@Observed装饰器用于在设计嵌套对象或数元素为对象和的场景中进行双向数据同步

- 给元素的类型上加 @Observed
- 给元素对应的参数加@ObjectLink 需要将对应代码封装为组件



## 页面路由

- 页面栈的最大容量上限为32个页面，使用router.clear()方法可以清空页面栈，释放内存

Router有两种页面跳转模式，分别是:

- router.pushUrl(): 目标页不会替换当前页，而是压入页面栈，因此可以用router.back()返回当前页
- router.replaceUrl(): 目标页替换当前页，当前页会被销毁并释放资源，无法返回当前页

Router有两种页面实例模式，分别是:

- standard: 标准实例模式，每次跳转都会新建一个目标页并压入栈顶。默认
- single: 单实例模式，如果目标页已经在栈中，则离栈顶最近的同Ur页面会被移动到栈顶并重新加载

#### 使用路由

- 配置页面

一、如果创建时使用new ArkTS File时需要在resources/base/main_pages.json文件下进行配置

```
{
	"src":[
		"pages/Index",
		"pages/Login"
	]
}
```

二、如果使用new Page 创建，则自动配置页面



1、导入HarmonyOS提供的Router模块

```
impirt router from '@ohos.router';
```

2、配置跳转

```
router,pushUrl({
		url:'pages/page'
		params:{id:1}
	},
	router.RouterMode.Single
	err=>{
		if(err{
			console.log('路由失败'，err)
			// 错误码：
			100001：内部错误，可能是渲染失败
			100002：路由地址错误
			100003：路由栈中页面超过32
		})	
	}
)
```

3、接收参数

```
params: any = router.getParans()
```

4、返回

```
//返回上一页
router.back()
//返回指定页
router.back(
	{
		url:'pages/pages',
		params:{id:1}
	}
)
```

