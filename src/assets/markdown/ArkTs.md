# 鸿蒙开发 ArkTS 完整指南

## ArkTS 简介

ArkTS 是 HarmonyOS 应用开发语言，基于 TypeScript 扩展，提供声明式 UI 开发能力。

### 特点

- 基于 TypeScript，支持静态类型检查
- 声明式 UI 开发
- 响应式数据绑定
- 组件化开发
- 高性能渲染

### 适用场景

- 熟悉 TS/前端栈，期望快速进入 HarmonyOS 原生开发
- 希望统一语言完成 UI、业务与系统能力调用
- 面向多设备形态（手机/平板/穿戴）需要一致体验的应用

---

## 开发环境搭建

### 1. 安装 DevEco Studio

1. 访问 [DevEco Studio 官网](https://developer.huawei.com/consumer/cn/deveco-studio)
2. 下载并安装最新版本
3. 首次启动配置 HarmonyOS SDK

### 2. 创建项目

1. 打开 DevEco Studio
2. 选择 **Create Project**
3. 选择 **Empty Ability**
4. 配置项目信息：
   - Project name: 项目名称
   - Project type: Application
   - Language: ArkTS
   - API Version: 选择 API 版本

### 3. 项目结构

```
MyApplication
├── entry
│   ├── src
│   │   ├── main
│   │   │   ├── ets
│   │   │   │   ├── pages          # 页面目录
│   │   │   │   ├── components     # 组件目录
│   │   │   │   └── utils          # 工具类目录
│   │   │   ├── resources          # 资源文件
│   │   │   └── module.json5       # 模块配置文件
│   │   └── ohosTest               # 测试代码
├── build-profile.json5            # 构建配置
└── hvigorfile.ts                  # 构建脚本
```

---

## 基础语法

> 小贴士：ArkTS 与 TS 基本一致，但运行在 HarmonyOS 运行时。建议开启严格类型检查，减少 any；异步逻辑配合 try/catch，避免在设备端抛未捕获异常。

### 变量与常量

```typescript
// 变量声明
let name: string = 'HarmonyOS'
let age: number = 18
let isActive: boolean = true

// 常量声明
const PI: number = 3.14159
const APP_NAME: string = 'MyApp'

// 类型推断
let count = 0  // 自动推断为 number
```

### 数据类型

```typescript
// 基本类型
let str: string = 'Hello'
let num: number = 100
let bool: boolean = true

// 数组
let arr1: number[] = [1, 2, 3]
let arr2: Array<string> = ['a', 'b', 'c']

// 对象
let obj: { name: string; age: number } = {
  name: 'Tom',
  age: 20
}

// 联合类型
let value: string | number = 'hello'
value = 123

// 可选属性
interface User {
  name: string
  age?: number  // 可选
}
```

### 函数

```typescript
// 函数声明
function add(a: number, b: number): number {
  return a + b
}

// 箭头函数
const subtract = (a: number, b: number): number => {
  return a - b
}

// 可选参数
function greet(name: string, age?: number): string {
  if (age) {
    return `Hello, ${name}, you are ${age} years old`
  }
  return `Hello, ${name}`
}

// 默认参数
function multiply(a: number, b: number = 1): number {
  return a * b
}
```

### 类与接口

```typescript
// 接口定义
interface Person {
  name: string
  age: number
  sayHello(): void
}

// 类实现接口
class Student implements Person {
  name: string
  age: number
  studentId: string

  constructor(name: string, age: number, studentId: string) {
    this.name = name
    this.age = age
    this.studentId = studentId
  }

  sayHello(): void {
    console.log(`Hello, I'm ${this.name}`)
  }
}

// 使用
const student = new Student('Tom', 20, 'S001')
student.sayHello()
```

### 异步编程

```typescript
// Promise
function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data loaded')
    }, 1000)
  })
}

// async/await
async function loadData() {
  try {
    const data = await fetchData()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

---

## 组件系统

> 组件是 UI 基本单元，保持“小而专一”，避免在 build 中做重计算；链式属性多时拆分样式复用，减少重复代码。

### Image: 图片显示组件

#### 声明 Image 组件并设置图片源

```typescript
Image(src: string | PixelMap | Resource)
```

#### 1. string 格式

通常用来加载网络图片，需要申请网络访问权限：`ohos.permission.INTERNET`

```typescript
Image('https://xxx.png')
  .width(200)
  .height(200)
  .alt('图片描述')
```

#### 2. PixelMap 格式

可以加载像素图，常用在图片编辑中。

```typescript
Image(pixelMapObject)
```

#### 3. Resource 格式

加载本地图片，推荐使用。

```typescript
Image($r('app.media.mate60'))  // 读取 media 文件下图片
Image($rawfile('mate60.png'))  // 读取 rawfile 文件下图片
```

#### 图片属性

```typescript
Image($r('app.media.icon'))
  .width(100)
  .height(100)
  .borderRadius(10)
  .interpolation(ImageInterpolation.High)  // 图片插值
  .fillColor(Color.White)  // 图片填充颜色，仅支持 svg 格式
  .objectFit(ImageFit.Cover)  // 图片缩放类型
  .onComplete((event: { width: number, height: number }) => {
    // 图片加载完成回调
  })
  .onError(() => {
    // 图片加载失败回调
  })
```

### Text：文本显示组件

注意：多语言请放入资源文件，避免硬编码；长文本需设置 `maxLines` + `textOverflow` 防止撑破布局；字号/行高保持一致以免跳动。

#### 配置不同系统不同文字

在文件 `resources` 中的 `base`、`en_US` 和 `zh_CN` 中的 `element` 的 `string.json` 文件中配置文字。

```json
{
  "string": [
    {
      "name": "width_label",
      "value": "显示的文字"
    }
  ]
}
```

#### 读取并修改属性

```typescript
Text($r('app.string.width_label'))
  .fontSize(20)  // 字体大小
  .fontColor('#fff')  // 字体颜色
  .fontWeight(FontWeight.Medium)  // 字体粗细
  .fontFamily('Arial')  // 字体族
  .lineHeight(32)  // 行高
  .maxLines(2)  // 最大行数
  .textOverflow({ overflow: TextOverflow.Ellipsis })  // 文本溢出处理
  .decoration({ 
    type: TextDecorationType.LineThrough,  // 文字装饰
    color: Color.Red 
  })
  .textAlign(TextAlign.Center)  // 文本对齐
  .onClick(() => {
    // 点击事件
  })
```

### TextInput：文本输入框

#### 声明 TextInput 组件

```typescript
TextInput({ placeholder?: ResourceStr, text?: ResourceStr })
```

#### 基本使用

```typescript
TextInput({ placeholder: '请输入账号或手机号' })
  .width('100%')
  .height(40)
  .backgroundColor('#f5f5f5')
  .borderRadius(8)
  .type(InputType.Password)  // 输入框类型
  .maxLength(20)  // 最大长度
  .showPasswordIcon(true)  // 显示密码图标
  .onChange((value: string) => {
    // value 是用户输入的文本内容
    console.log(value)
  })
  .onSubmit((enterKey: EnterKeyType) => {
    // 提交事件
  })
```

#### 输入框类型

| 名称        | 描述                                                       |
| ----------- | ---------------------------------------------------------- |
| Normal      | 基本输入模式。支持输入数字、字母、下划线、空格、特殊字符   |
| Password    | 密码输入模式。支持输入数字、字母、下划线、空格、特殊字符。 |
| Email       | 邮箱地址输入模式。支持数字，字母，下划线，以及 @ 字符        |
| Number      | 纯数字输入模式                                             |
| PhoneNumber | 电话号码输入模式。支持输入数字、+、-、*、#、长度不限       |

**注意**：`type` 为数字类型时，获取 `value` 时 `value` 类型为字符串。

### Button：按钮组件

#### 声明 Button 组件

```typescript
Button(label?: ResourceStr)
```

#### 基本使用

```typescript
// 文字按钮
Button('点我')
  .width(100)
  .height(40)
  .type(ButtonType.Normal)  // 按钮类型
  .backgroundColor('#007DFF')
  .fontColor(Color.White)
  .fontSize(16)
  .borderRadius(8)
  .onClick(() => {
    // 处理点击事件
  })

// 自定义按钮
Button() {
  Row() {
    Image($r('app.media.search')).width(20).height(20)
    Text('搜索').margin({ left: 8 })
  }
}
  .width(120)
  .height(40)
```

#### 按钮类型

| 名称    | 描述                                   |
| ------- | -------------------------------------- |
| Capsule | 胶囊型按钮（圆角默认为高度的一半，默认） |
| Circle  | 圆形按钮                               |
| Normal  | 普通按钮（默认不带圆角）                 |

### Slider：滑动条组件

```typescript
Slider({
  min: 0,  // 最小值
  max: 100,  // 最大值
  value: 30,  // 当前值
  step: 10,  // 滑动步长
  style: SliderStyle.OutSet,  // 滑块与滑轨的样式
  direction: Axis.Horizontal,  // 滑轨方向
  reverse: false,  // 是否反向
})
  .width('100%')
  .height(40)
  .showTips(true)  // 是否展示 value 百分比提示
  .blockColor('#36d')  // 滑块颜色
  .trackColor('#e5e5e5')  // 滑轨颜色
  .selectedColor('#36d')  // 已选择颜色
  .trackThickness(8)  // 滑轨粗细
  .onChange((value: number) => {
    console.log('当前值：', value)
  })
```

### Progress 进度条组件

```typescript
// 线性进度条
Progress({
  value: this.progressValue,  // 进度值
  total: 100,  // 总值
  type: ProgressType.Linear  // 线性进度条
})
  .width('100%')
  .height(4)
  .color('#007DFF')  // 进度条颜色
  .backgroundColor('#e5e5e5')  // 背景色

// 环形进度条
Progress({
  value: this.progressValue,
  total: 100,
  type: ProgressType.Ring  // 环形进度条
})
  .width(100)
  .height(100)
  .color('#007DFF')
```

### Checkbox 复选框

```typescript
Checkbox({ name: 'checkbox1', group: 'group1' })
  .select(true)  // 是否选中
  .selectedColor('#007DFF')  // 选中颜色
  .shape(CheckboxShape.Circle)  // 形状
  .onChange((isChecked: boolean) => {
    console.log('选中状态：', isChecked)
  })
```

### Radio 单选框

```typescript
Radio({ value: 'option1', group: 'radioGroup' })
  .checked(true)
  .onChange((isChecked: boolean) => {
    console.log('选中状态：', isChecked)
  })
```

### Switch 开关

```typescript
Switch()
  .checked(true)
  .selectedColor('#007DFF')
  .onChange((isOn: boolean) => {
    console.log('开关状态：', isOn)
  })
```

### DatePicker 日期选择器

```typescript
DatePicker({
  start: new Date('2020-1-1'),
  end: new Date('2025-12-31'),
  selected: new Date()
})
  .onChange((value: DatePickerResult) => {
    console.log('选择的日期：', value)
  })
```

### TimePicker 时间选择器

```typescript
TimePicker({
  selected: new Date()
})
  .onChange((value: TimePickerResult) => {
    console.log('选择的时间：', value)
  })
```

---

## 布局系统

> Row/Column/Flex/Stack/Grid 组合即可覆盖大多数场景。保持布局层级扁平；滚动区必须有明确高度；栅格、列表要控制间距与对齐，减少抖动。

### Column 容器（纵向布局）

```typescript
Column() {
  Text('第一行')
  Text('第二行')
  Text('第三行')
}
  .width('100%')
  .height('100%')
  .justifyContent(FlexAlign.Start)  // 主轴对齐方式
  .alignItems(HorizontalAlign.Center)  // 交叉轴对齐方式
  .space(10)  // 子组件间距
  .padding({ top: 20, bottom: 20, left: 16, right: 16 })
```

### Row 容器（横向布局）

```typescript
Row() {
  Text('第一列')
  Text('第二列')
  Text('第三列')
}
  .width('100%')
  .height(50)
  .justifyContent(FlexAlign.SpaceBetween)  // 主轴对齐
  .alignItems(VerticalAlign.Center)  // 交叉轴对齐
  .space(10)  // 子组件间距
```

### Flex 布局

```typescript
Row() {
  // 内容
}
  .justifyContent(FlexAlign.Center)  // 主轴对齐
  .alignItems(VerticalAlign.Center)  // 交叉轴对齐
  .flexWrap(FlexWrap.Wrap)  // 换行
  .flexGrow(1)  // 弹性增长
  .flexShrink(1)  // 弹性收缩
```

### Stack 堆叠容器

子组件按顺序依次入栈，后一个子组件覆盖前一个子组件。

```typescript
Stack({ alignContent: Alignment.TopStart }) {
  Image($r('app.media.bg'))
    .width('100%')
    .height('100%')
  Text('覆盖文字')
    .fontSize(20)
    .fontColor(Color.White)
}
  .width('100%')
  .height(200)
```

### Grid 网格布局

```typescript
Grid() {
  ForEach(this.dataList, (item: string) => {
    GridItem() {
      Text(item)
        .width('100%')
        .height('100%')
        .textAlign(TextAlign.Center)
    }
  })
}
  .columnsTemplate('1fr 1fr 1fr')  // 列模板
  .rowsTemplate('1fr 1fr')  // 行模板
  .columnsGap(10)  // 列间距
  .rowsGap(10)  // 行间距
```

### List 列表组件

```typescript
List({ space: 10 }) {  // 每一条间距为 10，需要设置高度才能滚动
  ForEach(this.dataList, (item: any, index?: number) => {
    ListItem() {  // List 内部必须含有 ListItem 组件
      Row() {
        Text(item.name)
          .fontSize(16)
        Blank()
        Text(item.value)
          .fontSize(14)
          .fontColor('#999')
      }
        .width('100%')
        .height(50)
        .padding({ left: 16, right: 16 })
    }
      .swipeAction({  // 滑动操作
        end: {
          builder: () => {
            Button('删除')
              .backgroundColor(Color.Red)
              .onClick(() => {
                // 删除操作
              })
          }
        }
      })
  }, (item: any) => item.id)  // 键生成函数
}
  .width('100%')
  .layoutWeight(1)  // 占据容器内剩余空间
  .listDirection(Axis.Vertical)  // 列表方向，默认纵向
  .divider({  // 分割线
    strokeWidth: 1,
    color: '#e5e5e5',
    startMargin: 16,
    endMargin: 16
  })
  .onReachStart(() => {
    // 到达列表顶部
  })
  .onReachEnd(() => {
    // 到达列表底部
  })
```

### Blank 组件

作用：空白，在容器内部占满剩余空间。

```typescript
Row() {
  Text('左侧内容')
  Blank()  // 占据剩余空间
  Text('右侧内容')
}
```

### RelativeContainer 相对布局

```typescript
RelativeContainer() {
  Text('文本1')
    .id('text1')
    .alignRules({
      left: { anchor: '__container__', align: HorizontalAlign.Start },
      top: { anchor: '__container__', align: VerticalAlign.Top }
    })
  Text('文本2')
    .id('text2')
    .alignRules({
      left: { anchor: 'text1', align: HorizontalAlign.End },
      top: { anchor: 'text1', align: VerticalAlign.Top }
    })
}
```

---

## 状态管理

> 选择合适的装饰器：组件内部优先 `@State`，父子单向用 `@Prop`，需要双向再用 `@Link` 或 `@Provide`/`@Consume`。嵌套对象务必用 `@Observed`/`@ObjectLink`，否则更新不触发 UI。

### @State 装饰器

用于组件内部的状态管理，当状态改变时，会触发 UI 更新。

```typescript
@Entry
@Component
struct StateExample {
  @State count: number = 0
  @State message: string = 'Hello'
  @State isActive: boolean = false

  build() {
    Column() {
      Text(`Count: ${this.count}`)
        .fontSize(20)
      Button('增加')
        .onClick(() => {
          this.count++
        })
      Text(this.message)
      Switch()
        .checked(this.isActive)
        .onChange((value: boolean) => {
          this.isActive = value
        })
    }
  }
}
```

#### @State 特点

- `@State` 装饰器标记的变量必须初始化，不能为空值
- `@State` 支持 `object`、`class`、`string`、`number`、`Boolean`、`enum` 类型以及这些类型的数组
- 嵌套类型以及数组中的对象属性无法触发视图更新（需要使用 `@Observed` 和 `@ObjectLink`）

### @Prop 装饰器

用于父子组件之间的单向数据同步，子组件不能修改 `@Prop` 装饰的变量。

```typescript
// 父组件
@Entry
@Component
struct ParentComponent {
  @State message: string = 'Hello from Parent'

  build() {
    Column() {
      Text(this.message)
      ChildComponent({ message: this.message })
      Button('修改')
        .onClick(() => {
          this.message = 'Updated'
        })
    }
  }
}

// 子组件
@Component
struct ChildComponent {
  @Prop message: string

  build() {
    Column() {
      Text(this.message)
      // 不能直接修改 this.message
    }
  }
}
```

### @Link 装饰器

用于父子组件之间的双向数据同步。

```typescript
// 父组件
@Entry
@Component
struct ParentComponent {
  @State message: string = 'Hello'

  build() {
    Column() {
      Text(this.message)
      ChildComponent({ message: $message })  // 使用 $ 符号
    }
  }
}

// 子组件
@Component
struct ChildComponent {
  @Link message: string

  build() {
    Column() {
      Text(this.message)
      Button('修改')
        .onClick(() => {
          this.message = 'Updated'  // 可以修改，会同步到父组件
        })
    }
  }
}
```

### @Provide 和 @Consume 装饰器

用于跨组件提供类似于 `@State` 和 `@Link` 的双向同步。

```typescript
// 祖先组件
@Entry
@Component
struct AncestorComponent {
  @Provide message: string = 'Hello'

  build() {
    Column() {
      Text(this.message)
      MiddleComponent()
    }
  }
}

// 中间组件
@Component
struct MiddleComponent {
  build() {
    Column() {
      ChildComponent()
    }
  }
}

// 子组件
@Component
struct ChildComponent {
  @Consume message: string

  build() {
    Column() {
      Text(this.message)
      Button('修改')
        .onClick(() => {
          this.message = 'Updated'  // 会同步到所有使用 @Consume 的组件
        })
    }
  }
}
```

### @Observed 和 @ObjectLink 装饰器

用于嵌套对象或数组元素为对象的场景中进行双向数据同步。

```typescript
// 定义被观察的类
@Observed
class User {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

// 父组件
@Entry
@Component
struct ParentComponent {
  @State user: User = new User('Tom', 20)

  build() {
    Column() {
      Text(`Name: ${this.user.name}, Age: ${this.user.age}`)
      ChildComponent({ user: $user })
    }
  }
}

// 子组件
@Component
struct ChildComponent {
  @ObjectLink user: User

  build() {
    Column() {
      Text(this.user.name)
      Button('修改年龄')
        .onClick(() => {
          this.user.age++  // 会触发父组件更新
        })
    }
  }
}
```

### @Watch 装饰器

用于监听状态变量的变化。

```typescript
@Entry
@Component
struct WatchExample {
  @State count: number = 0
  @State message: string = ''

  @Watch('onCountChange')
  count: number = 0

  onCountChange() {
    this.message = `Count changed to ${this.count}`
  }

  build() {
    Column() {
      Text(this.message)
      Button('增加')
        .onClick(() => {
          this.count++
        })
    }
  }
}
```

---

## 生命周期

> 页面/组件钩子用于初始化与释放资源。重计算、网络请求可放在 aboutToAppear/onPageShow；长耗时任务请异步并注意取消，避免阻塞 UI。

### 页面生命周期

```typescript
@Entry
@Component
struct LifecycleExample {
  aboutToAppear() {
    // 页面即将显示时触发
    console.log('aboutToAppear')
  }

  aboutToDisappear() {
    // 页面即将消失时触发
    console.log('aboutToDisappear')
  }

  onPageShow() {
    // 页面显示时触发
    console.log('onPageShow')
  }

  onPageHide() {
    // 页面隐藏时触发
    console.log('onPageHide')
  }

  onBackPress() {
    // 返回按钮被按下时触发
    // 返回 true 表示拦截返回事件
    return false
  }

  build() {
    Column() {
      Text('生命周期示例')
    }
  }
}
```

### 组件生命周期

```typescript
@Component
struct ComponentLifecycle {
  aboutToAppear() {
    // 组件即将出现时触发
  }

  aboutToDisappear() {
    // 组件即将消失时触发
  }

  build() {
    Column() {
      Text('组件生命周期')
    }
  }
}
```

---

## 事件处理

> 同一组件上存在手势/点击时注意冲突（如 TapGesture 可能拦截 onClick）；高频事件应做节流/防抖，触摸回调里避免大量同步计算。

### 点击事件

```typescript
Button('点击')
  .onClick(() => {
    console.log('按钮被点击')
  })

// 带参数的事件
Button('点击')
  .onClick((event: ClickEvent) => {
    console.log('点击位置：', event.target)
  })
```

### 长按事件

```typescript
Button('长按')
  .onLongPress(() => {
    console.log('长按事件')
  })
```

### 触摸事件

```typescript
Text('触摸')
  .onTouch((event: TouchEvent) => {
    if (event.type === TouchType.Down) {
      console.log('按下')
    } else if (event.type === TouchType.Up) {
      console.log('抬起')
    } else if (event.type === TouchType.Move) {
      console.log('移动')
    }
  })
```

### 手势事件

```typescript
// 拖动手势
Text('拖动')
  .gesture(
    PanGesture({ direction: PanDirection.All, distance: 1 })
      .onActionStart((event: GestureEvent) => {
        console.log('开始拖动')
      })
      .onActionUpdate((event: GestureEvent) => {
        console.log('拖动中')
      })
      .onActionEnd((event: GestureEvent) => {
        console.log('拖动结束')
      })
  )

// 点击手势
Text('点击')
  .gesture(
    TapGesture({ count: 1 })
      .onAction(() => {
        console.log('点击手势')
      })
  )

// 长按手势
Text('长按')
  .gesture(
    LongPressGesture({ duration: 1000 })
      .onAction(() => {
        console.log('长按手势')
      })
  )
```

---

## 网络请求

> 移动端要考虑弱网/断网：设置超时、错误重试与取消；请求完成后立即销毁实例；涉及隐私数据请使用 HTTPS 并校验证书；跨域通过网关或后端配置解决。

### HTTP 请求

```typescript
import http from '@ohos.net.http'

// GET 请求
async function getData() {
  let httpRequest = http.createHttp()
  try {
    let response = await httpRequest.request('https://api.example.com/data', {
      method: http.RequestMethod.GET,
      header: {
        'Content-Type': 'application/json'
      }
    })
    let result = JSON.parse(response.result.toString())
    console.log('请求成功：', result)
  } catch (error) {
    console.error('请求失败：', error)
  } finally {
    httpRequest.destroy()
  }
}

// POST 请求
async function postData() {
  let httpRequest = http.createHttp()
  try {
    let response = await httpRequest.request('https://api.example.com/data', {
      method: http.RequestMethod.POST,
      header: {
        'Content-Type': 'application/json'
      },
      extraData: JSON.stringify({
        name: 'Tom',
        age: 20
      })
    })
    let result = JSON.parse(response.result.toString())
    console.log('请求成功：', result)
  } catch (error) {
    console.error('请求失败：', error)
  } finally {
    httpRequest.destroy()
  }
}
```

### 封装网络请求工具类

```typescript
import http from '@ohos.net.http'

class HttpUtil {
  private static baseURL: string = 'https://api.example.com'

  static async request<T>(
    url: string,
    method: http.RequestMethod = http.RequestMethod.GET,
    data?: any
  ): Promise<T> {
    let httpRequest = http.createHttp()
    try {
      let response = await httpRequest.request(`${this.baseURL}${url}`, {
        method: method,
        header: {
          'Content-Type': 'application/json'
        },
        extraData: data ? JSON.stringify(data) : undefined
      })
      return JSON.parse(response.result.toString()) as T
    } catch (error) {
      console.error('请求失败：', error)
      throw error
    } finally {
      httpRequest.destroy()
    }
  }

  static async get<T>(url: string): Promise<T> {
    return this.request<T>(url, http.RequestMethod.GET)
  }

  static async post<T>(url: string, data: any): Promise<T> {
    return this.request<T>(url, http.RequestMethod.POST, data)
  }
}

// 使用
async function loadData() {
  try {
    let data = await HttpUtil.get<{ name: string }>('/user')
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

### 请求拦截器

```typescript
class HttpInterceptor {
  static async request(config: any): Promise<any> {
    // 添加 token
    if (!config.header) {
      config.header = {}
    }
    config.header['Authorization'] = 'Bearer ' + this.getToken()
    return config
  }

  static async response(response: any): Promise<any> {
    // 处理响应
    if (response.responseCode === 401) {
      // token 过期，跳转登录
      this.handleTokenExpired()
    }
    return response
  }

  private static getToken(): string {
    // 从本地存储获取 token
    return ''
  }

  private static handleTokenExpired() {
    // 处理 token 过期
  }
}
```

---

## 数据持久化

> 轻量配置/状态优先 Preferences；结构化关系型数据用 RDB；大文件走文件存储。敏感信息请加密存储并控制访问权限，频繁读写需异步化避免阻塞 UI 线程。

### Preferences 轻量级存储

```typescript
import preferences from '@ohos.data.preferences'

// 获取 Preferences 实例
async function getPreferences(context: Context): Promise<preferences.Preferences> {
  return await preferences.getPreferences(context, 'myPreferences')
}

// 保存数据
async function saveData(context: Context) {
  let prefs = await getPreferences(context)
  await prefs.put('name', 'Tom')
  await prefs.put('age', 20)
  await prefs.put('isLogin', true)
  await prefs.flush()  // 提交数据
}

// 读取数据
async function loadData(context: Context) {
  let prefs = await getPreferences(context)
  let name = await prefs.get('name', 'default')
  let age = await prefs.get('age', 0)
  let isLogin = await prefs.get('isLogin', false)
  console.log(name, age, isLogin)
}

// 删除数据
async function deleteData(context: Context) {
  let prefs = await getPreferences(context)
  await prefs.delete('name')
  await prefs.flush()
}

// 清空所有数据
async function clearData(context: Context) {
  let prefs = await getPreferences(context)
  await prefs.clear()
  await prefs.flush()
}
```

### 关系型数据库 (RDB)

```typescript
import dataRdb from '@ohos.data.rdb'

// 初始化数据库
async function initDatabase(context: Context): Promise<dataRdb.RdbStore> {
  const config: dataRdb.StoreConfig = {
    name: 'myDatabase.db',
    securityLevel: dataRdb.SecurityLevel.S1
  }
  const rdbStore = await dataRdb.getRdbStore(context, config)

  // 创建表
  const sql = `CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    email TEXT
  )`
  await rdbStore.executeSql(sql)

  return rdbStore
}

// 插入数据
async function insertUser(rdbStore: dataRdb.RdbStore) {
  const valueBucket: dataRdb.ValuesBucket = {
    'name': 'Tom',
    'age': 20,
    'email': 'tom@example.com'
  }
  await rdbStore.insert('user', valueBucket)
}

// 查询数据
async function queryUsers(rdbStore: dataRdb.RdbStore) {
  const predicates = new dataRdb.RdbPredicates('user')
  predicates.equalTo('age', 20)
  const resultSet = await rdbStore.query(predicates, ['id', 'name', 'age', 'email'])
  
  while (resultSet.goToNextRow()) {
    const id = resultSet.getLong(resultSet.getColumnIndex('id'))
    const name = resultSet.getString(resultSet.getColumnIndex('name'))
    const age = resultSet.getLong(resultSet.getColumnIndex('age'))
    const email = resultSet.getString(resultSet.getColumnIndex('email'))
    console.log(`ID: ${id}, Name: ${name}, Age: ${age}, Email: ${email}`)
  }
  resultSet.close()
}

// 更新数据
async function updateUser(rdbStore: dataRdb.RdbStore) {
  const predicates = new dataRdb.RdbPredicates('user')
  predicates.equalTo('name', 'Tom')
  const valueBucket: dataRdb.ValuesBucket = {
    'age': 21
  }
  await rdbStore.update(valueBucket, predicates)
}

// 删除数据
async function deleteUser(rdbStore: dataRdb.RdbStore) {
  const predicates = new dataRdb.RdbPredicates('user')
  predicates.equalTo('name', 'Tom')
  await rdbStore.delete(predicates)
}
```

---

## 动画系统

### 属性动画

```typescript
@Entry
@Component
struct AnimationExample {
  @State translateX: number = 0
  @State opacity: number = 1
  @State scale: number = 1

  build() {
    Column() {
      Text('动画示例')
        .translate({ x: this.translateX, y: 0 })
        .opacity(this.opacity)
        .scale({ x: this.scale, y: this.scale })
        .onClick(() => {
          // 创建动画
          animateTo({
            duration: 1000,  // 持续时间（毫秒）
            curve: Curve.EaseInOut,  // 动画曲线
            iterations: 1,  // 重复次数
            playMode: PlayMode.Normal  // 播放模式
          }, () => {
            this.translateX = 100
            this.opacity = 0.5
            this.scale = 1.5
          })
        })
    }
  }
}
```

### 页面转场动画

```typescript
// 页面转场
@Entry
@Component
struct PageTransition {
  build() {
    Column() {
      Button('跳转')
        .onClick(() => {
          router.pushUrl({
            url: 'pages/NextPage'
          })
        })
    }
    .transition(PageTransitionEnter.Slide.animation({ duration: 300 }))
  }
}
```

### 组件转场动画

```typescript
@Entry
@Component
struct ComponentTransition {
  @State show: boolean = true

  build() {
    Column() {
      if (this.show) {
        Text('显示内容')
          .transition(TransitionEffect.OPACITY.animation({ duration: 300 }))
      }
      Button('切换')
        .onClick(() => {
          this.show = !this.show
        })
    }
  }
}
```

---

## 自定义组件

### 创建自定义组件

```typescript
@Component
export struct CustomButton {
  private label: string = ''
  private onClickHandler?: () => void

  build() {
    Button(this.label)
      .width(100)
      .height(40)
      .backgroundColor('#007DFF')
      .fontColor(Color.White)
      .onClick(() => {
        if (this.onClickHandler) {
          this.onClickHandler()
        }
      })
  }
}

// 使用
@Entry
@Component
struct MyPage {
  build() {
    Column() {
      CustomButton()
    }
  }
}
```

### 组件参数传递

```typescript
@Component
export struct UserCard {
  private name: string = ''
  private age: number = 0
  private avatar?: Resource

  build() {
    Row() {
      if (this.avatar) {
        Image(this.avatar)
          .width(50)
          .height(50)
          .borderRadius(25)
      }
      Column() {
        Text(this.name)
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
        Text(`年龄：${this.age}`)
          .fontSize(14)
          .fontColor('#999')
      }
        .margin({ left: 10 })
    }
      .width('100%')
      .padding(16)
      .backgroundColor('#f5f5f5')
      .borderRadius(8)
  }
}

// 使用
@Entry
@Component
struct MyPage {
  build() {
    Column() {
      UserCard({ name: 'Tom', age: 20, avatar: $r('app.media.avatar') })
    }
  }
}
```

### @Builder 构建函数

```typescript
@Entry
@Component
struct BuilderExample {
  @Builder Button(index: number) {
    Button(`按钮${index}`)
      .width(100)
      .height(40)
      .onClick(() => {
        console.log(`按钮${index}被点击`)
      })
  }

  build() {
    Column() {
      this.Button(1)
      this.Button(2)
    }
  }
}

// 全局构建函数
@Builder function GlobalButton(text: string) {
  Button(text)
    .width(100)
    .height(40)
}

// 使用
@Entry
@Component
struct MyPage {
  build() {
    Column() {
      GlobalButton('全局按钮')
    }
  }
}
```

### @Styles 和 @Extend 样式复用

```typescript
// 通用样式
@Styles function commonStyle() {
  .width('95%')
    .padding(20)
    .backgroundColor(Color.White)
    .borderRadius(15)
    .shadow({
      radius: 6,
      color: '#36d',
      offsetX: 2,
      offsetY: 4
    })
}

// 私有样式（扩展特定组件）
@Extend(Text) function textStyle() {
  .fontSize(16)
    .fontColor('#333')
    .fontWeight(FontWeight.Medium)
}

// 使用
@Entry
@Component
struct StyleExample {
  build() {
    Column() {
      Text('样式示例')
        .textStyle()  // 使用扩展样式
        .commonStyle()  // 使用通用样式
    }
  }
}
```

---

## 路由导航

### 页面路由配置

#### 方式一：使用 new Page 创建（自动配置）

使用 DevEco Studio 创建 Page 时，会自动在 `module.json5` 中配置路由。

#### 方式二：手动配置

在 `resources/base/profile/main_pages.json` 中配置：

```json
{
  "src": [
    "pages/Index",
    "pages/Login",
    "pages/Detail"
  ]
}
```

### 路由跳转

```typescript
import router from '@ohos.router'

// 导入 Router 模块
// router.pushUrl() - 压入页面栈
router.pushUrl({
  url: 'pages/Detail',
  params: {
    id: 1,
    name: 'Tom'
  }
}, router.RouterMode.Standard, (err) => {
  if (err) {
    console.error('路由失败：', err)
    // 错误码：
    // 100001：内部错误，可能是渲染失败
    // 100002：路由地址错误
    // 100003：路由栈中页面超过 32
  }
})

// router.replaceUrl() - 替换当前页
router.replaceUrl({
  url: 'pages/Login'
})

// 返回上一页
router.back()

// 返回指定页
router.back({
  url: 'pages/Index',
  params: {
    refresh: true
  }
})

// 清空页面栈
router.clear()
```

### 接收路由参数

```typescript
@Entry
@Component
struct DetailPage {
  private params: Record<string, Object> = router.getParams() as Record<string, Object>

  build() {
    Column() {
      Text(`ID: ${this.params.id}`)
      Text(`Name: ${this.params.name}`)
    }
  }
}
```

### 路由模式

- **Standard（标准模式）**：每次跳转都会新建一个目标页并压入栈顶（默认）
- **Single（单例模式）**：如果目标页已经在栈中，则离栈顶最近的同 URL 页面会被移动到栈顶并重新加载

---

## 性能优化

> 快速检查清单：
- 列表使用 LazyForEach/虚拟化并提供稳定 key
- 图片按需裁剪，优先本地资源，合理设置 objectFit
- 避免在 build/渲染路径里做重计算，使用缓存或预处理
- 组件拆分与 memo 化减少无关重渲染
- 动画控制持续时间/阴影/模糊强度，防止掉帧

### 1. 列表性能优化

```typescript
// 使用 keyGenerator 提供唯一键
List() {
  ForEach(this.dataList, (item: any) => {
    ListItem() {
      Text(item.name)
    }
  }, (item: any) => item.id)  // 提供唯一键
}

// 使用 LazyForEach 处理大数据列表
LazyForEach(this.dataSource, (item: any) => {
  ListItem() {
    Text(item.name)
  }
}, (item: any) => item.id)
```

### 2. 图片优化

```typescript
// 使用合适的图片格式和大小
Image($r('app.media.image'))
  .objectFit(ImageFit.Cover)  // 使用合适的缩放模式
  .alt('图片描述')  // 提供替代文本
```

### 3. 避免不必要的重建

```typescript
// 使用 @State 而不是频繁创建新对象
@State data: DataModel = new DataModel()

// 而不是
@State data: DataModel = { ... }  // 每次都是新对象
```

### 4. 使用 @Reusable 装饰器

```typescript
@Reusable
@Component
struct ReusableComponent {
  build() {
    Text('可复用组件')
  }
}
```

### 5. 延迟加载

```typescript
// 使用条件渲染延迟加载组件
if (this.shouldLoad) {
  HeavyComponent()
}
```

---

## 项目打包发布

### 1. 配置应用信息

在 `module.json5` 中配置应用信息：

```json5
{
  "module": {
    "name": "entry",
    "type": "entry",
    "description": "$string:module_desc",
    "mainElement": "EntryAbility",
    "deviceTypes": [
      "phone",
      "tablet"
    ],
    "deliveryWithInstall": true,
    "installationFree": false,
    "pages": "$profile:main_pages",
    "abilities": [
      {
        "name": "EntryAbility",
        "srcEntry": "./ets/entryability/EntryAbility.ts",
        "description": "$string:EntryAbility_desc",
        "icon": "$media:icon",
        "label": "$string:EntryAbility_label",
        "startWindowIcon": "$media:icon",
        "startWindowBackground": "$color:start_window_background",
        "exported": true,
        "skills": [
          {
            "entities": [
              "entity.system.home"
            ],
            "actions": [
              "action.system.home"
            ]
          }
        ]
      }
    ],
    "requestPermissions": [
      {
        "name": "ohos.permission.INTERNET"
      }
    ]
  }
}
```

### 2. 配置签名

在 `build-profile.json5` 中配置签名信息：

```json5
{
  "apiType": "stageMode",
  "buildOption": {
    "arkOptions": {
      "runtimeOnly": false
    }
  },
  "modules": [
    {
      "name": "entry",
      "srcPath": "./entry",
      "targets": [
        {
          "name": "default",
          "applyToProducts": [
            "default"
          ],
          "signingConfig": {
            "configPath": "signing/signing_config.json",
            "certpath": "signing/xxx.p12",
            "keyAlias": "xxx",
            "keyPwd": "xxx",
            "certPwd": "xxx"
          }
        }
      ]
    }
  ]
}
```

### 3. 构建 HAP 包

#### 方式一：使用 DevEco Studio

1. 选择 **Build > Build Hap(s)/APP(s) > Build Hap(s)**
2. 等待构建完成
3. 在 `build/default/outputs/default` 目录下找到 `.hap` 文件

#### 方式二：使用命令行

```bash
# 在项目根目录执行
hvigor build
```

### 4. 生成 APP 包（可选）

如果需要生成 APP 包（包含多个 HAP）：

```bash
hvigor assembleHap
```

### 5. 应用上架

1. 登录 [华为开发者联盟](https://developer.huawei.com/)
2. 进入 **我的项目**
3. 创建应用
4. 上传 HAP 包
5. 填写应用信息
6. 提交审核

### 6. 版本管理

在 `module.json5` 中配置版本信息：

```json5
{
  "app": {
    "bundleName": "com.example.myapp",
    "vendor": "example",
    "version": {
      "code": 1,  // 版本号（整数）
      "name": "1.0.0"  // 版本名称（字符串）
    }
  }
}
```

### 7. 调试技巧

#### 日志输出

```typescript
import hilog from '@ohos.hilog'

// 输出日志
hilog.info(0x0000, 'MyTag', '日志信息')

// 不同级别
hilog.debug(0x0000, 'MyTag', 'Debug 日志')
hilog.info(0x0000, 'MyTag', 'Info 日志')
hilog.warn(0x0000, 'MyTag', 'Warn 日志')
hilog.error(0x0000, 'MyTag', 'Error 日志')
```

#### 断点调试

1. 在代码行号左侧点击设置断点
2. 点击 **Debug** 按钮启动调试
3. 使用调试工具栏控制程序执行

#### 性能分析

使用 DevEco Studio 的 **Profiler** 工具分析应用性能。

---

## 常见问题

### 1. 页面跳转失败

- 检查路由配置是否正确
- 确认目标页面是否存在
- 检查页面栈是否超过 32 个

### 2. 状态不更新

- 确认使用了正确的装饰器（@State、@Link 等）
- 对于嵌套对象，使用 @Observed 和 @ObjectLink
- 检查是否直接修改了数组或对象的引用

### 3. 图片加载失败

- 检查图片路径是否正确
- 确认图片资源是否存在
- 网络图片需要申请网络权限

### 4. 数据库操作失败

- 确认数据库已初始化
- 检查 SQL 语句是否正确
- 确认表结构是否创建

---

## 最佳实践

1. **组件化开发**：将功能拆分为独立组件，提高代码复用性
2. **状态管理**：合理使用装饰器，避免过度使用 @State
3. **性能优化**：使用 LazyForEach 处理大数据列表，优化图片加载
4. **错误处理**：使用 try-catch 处理异步操作
5. **代码规范**：遵循 TypeScript 编码规范，使用类型注解
6. **资源管理**：及时释放资源，避免内存泄漏

---

## 参考资源

- [HarmonyOS 开发者文档](https://developer.harmonyos.com/)
- [ArkTS API 参考](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/ts-overview-0000001477981205-V3)
- [DevEco Studio 使用指南](https://developer.harmonyos.com/cn/develop/deveco-studio/)

---

## 总结

本文档涵盖了 ArkTS 开发从基础到进阶的完整知识体系，包括：

- ✅ 基础语法和类型系统
- ✅ 组件系统和布局
- ✅ 状态管理和数据绑定
- ✅ 生命周期和事件处理
- ✅ 网络请求和数据持久化
- ✅ 动画和自定义组件
- ✅ 路由导航
- ✅ 性能优化
- ✅ 项目打包发布

