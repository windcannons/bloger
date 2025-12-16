# Vue

## 常见的自定义指令

#### 1. **`v-lazy`**

懒加载图片，当图片进入视口时才加载。

#### 2. **`v-debounce`**

防抖指令，用于限制输入框的事件触发频率。

#### 3. **`v-draggable`**

允许元素可拖动。

#### 4. **`v-intersect`**

检测元素是否进入视口。

#### 5. **`v-clipboard`**

更高级的剪贴板操作。

## 声明式渲染

### 阻止 Vue 在启动时生成生产提示

```javascript
Vue.config.productionTip = false
```

### 创建 Vue 实例

```javascript
new Vue({
  el: "#root",
  data: {
    name: "尚硅谷"
  }
})
```

### el 与 data 的第二种写法

#### 一、el 的第二种写法

```javascript
const vm = new Vue({
  data: {
    name: "尚硅谷"
  }
})
vm.$mount('#root')
```

`$mount` 为挂载

#### 二、data 的第二种写法

```javascript
data: function() {
  return {
    name: "尚硅谷"
  }
}
```

以函数形式，值为 return 返回值。函数的 this 为 Vue 实例对象，是 Vue 在调用函数，data 函数不能是箭头函数。

## 模板语法

### 一、插值语法

功能：用于解析标签体内容

写法：`{{xxx}}`

1. xxx 可以是 js 表达式（如 1+1）
2. 可以直接读取到 data 中所有的属性
3. 可以是 vm 身上以及原型上所有的属性

`new Date()` 可获取当前时间

### 二、指令语法

功能：用于解析标签（包括：标签属性、标签体内容、绑定事件...）

举例：`v-bind:href="xxx"` 或者简写为 `:href="xxx"`，xxx 同样要写 js 表达式，且可以直接读取到 data 中所有属性

#### 1. `v-html`

```vue
v-html="str"
```

会解析传入的内容以及标签，解析后存入标签文本中。不要在表单中写，防止 XSS 攻击。

#### 2. `v-text`

将数据以文本形式显示，不会解析 HTML 标签。

#### 3. `v-show`

适用于切换频率高的场景，不展示的 DOM 元素未被移除，仅仅是使用样式隐藏。

```vue
v-show="true"  <!-- 显示内容 -->
v-show="false" <!-- 隐藏内容 -->
```

布尔值可写表达式，判断表达式为真假。

#### 4. `v-if`、`v-else-if`、`v-else`

适用于切换频率低的场景，不展示的 DOM 元素直接被移除。

`v-if` 可以和 `v-else-if`、`v-else` 一起使用，但要求结构不能被打断。

```vue
v-if="num>1"        <!-- 通过判断，切换不同内容的显示 -->
v-else-if="num<10"
v-else
```

可与 `template` 标签配合使用。

```vue
<template></template> <!-- 只能配合 v-if 使用，不会渲染在结构中 -->
```

**注：** 使用 `v-if` 时，元素可能无法获取到，而使用 `v-show` 一定可以获取到。

#### 5. `v-for`

不能同时给一个元素设置 `v-for` 和 `v-if`。

一般配合 `key` 使用，`key` 作为循环的唯一标识符，`key` 的值不能重复。

```vue
:key="index"  <!-- index 为索引 -->
```

`in` 可替换为 `of`。

```vue
v-for="(item,index) in a"  <!-- 循环标签,item 为具体的值 -->
```

`a` 可以为具体数字，可以为 data 中的数组、对象。

调用数组对象中的值时使用 `item.`。

**根据属性设置样式**（`finish` 为类名）：

- 方法一：`:class="[item.state ? 'finish' : '']"`
- 方法二：`:class="{finish:item.state}"`

当遍历对象时：

```vue
v-for="(a,b) in obj"
```

`a` 为键值，`b` 为键名。

当遍历字符串时：

`a` 为每一个字符，`b` 为索引值。

#### 6. `v-bind`

单向数据绑定。

作用：让标签的属性可以设置为变量。

可以简写为 `:`。

**方式一：**

直接加在被绑定属性前面。

**方式二：**

```vue
v-bind:class="{one:isone}"
```

可在 data 中存入 `isone:false`，当为 false 时，不生效，true 时生效。

**方式三：**

设置多个类名：

```vue
v-bind:class="{one:isShow,two:!isShow}"
```

`isShow`，可直接换为布尔值，也可设置在 data 中，通过改变 `isShow` 的值切换显示形式。`isShow` 也可以直接换为布尔值。

**方式四：**

```vue
:class="[istwo,isthree]"
:class="['istwo','isthree']"
```

加引号为类名值，不加引号为 data 中的属性。需在 data 中设置 `istwo` 和 `isthree` 的值。

**方式五：**

设置内联样式：

```vue
:style="{fontSize:fsize+'px'}"
```

`fsize` 为 data 中设置的值。

**方式六：**

```vue
:style="styleObj"
```

data 中设置：

```javascript
styleObj: {
  fontSize: '40px',
  color: 'red'
}
```

#### 7. `v-model`

双向数据绑定。

`v-model` 只能运用在表单元素（输入类元素）上。

```vue
v-model=""  <!-- 不用写 value，会自动关联 value 的值 -->
```

**修饰符：**

- `.number` - 转换为数字型
- `.lazy` - 懒收集，表单失去焦点时收集
- `.trim` - 过滤输入首尾空格

#### 8. `v-cloak`

1. 本质是一个特殊属性，Vue 实例创建完毕接管容器后，会删掉 `v-cloak` 属性
2. 使用 CSS 配合 `v-cloak` 可以解决网速慢时页面展示出 `{{xxx}}` 的问题

```css
[v-cloak] {
  display: none;
}
```

#### 9. `v-once`

1. `v-once` 所在节点在初次动态渲染后，就视为静态内容
2. 以后数据的改变不会引起 `v-once` 所在结构的更新，可以用于优化性能

#### 10. `v-pre`

1. 跳过其所在节点的编译过程
2. 可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译

#### 11. 自定义指令

**何时调用？**

1. 指令与元素成功绑定时
2. 指令所在的模板被重新解析时

自定义指令中的 this 为 window。

自定义指令名多个单词采用 `-` 分割（kebab-case 命名方式）。

**1. 全局注册指令**

在 main.js 文件中编写（以自定义聚焦指令为例）：

```javascript
Vue.directive('focus', {
  // inserted 会在指令所在的元素，被插入到页面中触发
  inserted(el, binding) {
    // binding.value 获取等号右侧的值
    // el 就是指令绑定的元素
    el.focus()
  }
})
```

**2. 局部注册指令**

在当前 vue 文件中编写：

```javascript
directives: {
  // 指令名：指令的配置对象
  focus: {
    inserted(el) {
      el.focus()
    }
  }
}
```

**其他钩子：**

`bind`、`inserted`、`update` 为钩子。

```javascript
// 指令与元素成功绑定时
bind() {}

// 指令所在元素被插入页面时
inserted() {}

// 指令所在的模板被重新解析时
update() {}
```

## 过滤器

过滤器不能改变原数据，`v-model` 不能绑定。

`|` 管道符，将参数传入过滤器内。

```vue
{{time | timeFormater}}  <!-- timeFormater 为过滤器名 -->
```

可设置格式：

```vue
{{time | timeFormater('YYYY_MM_DD')}}
```

可连写，需设置两个函数：

```vue
{{time | timeFormater('YYYY_MM_DD') | myslice}}
```

**局部过滤器** - 在 vue 中添加：

```javascript
filters: {
  timeFormater(value) {
    return 
  }
}
```

**全局过滤器** - 在 Vue 创建前设置：

```javascript
Vue.filter('myslice', function(str) {
})
```

在 main.js 中设置：

```javascript
Vue.filter('过滤器名称，如money', function(传递的参数，可用value) {
  return '$' + value.toFixed(2)
})
```

## 事件处理

### `v-on`

绑定事件，可简写为 `@`。

语法：`v-on:事件名="函数名"`，函数名可加括号进行传参。

若未传参，打印 `fun(e)` 的 `e` 时，为事件对象。

函数存放在 `methods`（`methods` 与 `data` 同级，存放在 vue 中），method 意为方法。

```javascript
methods: {
  fun() {
    console.log(123)
    // 此处的 this 指向当前的 vue 对象
    // 通过 this.isShow 可直接拿到 data 的值，并可改变
  }
}
```

**用法二：**

```vue
@click="num--"
```

**同时传参与拿取 event：**

```vue
@click="事件名(66,$event)"
```

### 事件修饰符

```vue
@click.prevent="事件名"
```

- `.prevent`：阻止默认事件（常用）
- `.stop`：阻止事件冒泡（常用），等同于 `e.stopPropagation()`
- `.once`：事件只触发一次（常用）
- `.capture`：使用事件的捕获模式
- `.self`：只有 `event.target` 是当前操作的元素时才触发事件
- `.passive`：事件的默认行为立即执行，无需等待事件回调执行完成

事件修饰符可连写。

### 键盘事件

用法：`@keyup.enter="show"`

**常用按键别名：**

- 回车 => `enter`
- 删除 => `delete`（捕获"删除"和"退格"键）
- 退出 => `esc`
- 空格 => `space`
- 换行 => `tab`（必须配合 `keydown` 使用）
- 上 => `up`
- 下 => `down`
- 左 => `left`
- 右 => `right`

**其他说明：**

1. Vue 未提供别名的按键，可以使用按键原始的 key 值去绑定，但注意要转为 kebab-case（短横线命名）
2. 系统修饰键（用法特殊）：`ctrl`、`alt`、`shift`、`meta`
   - 配合 `keyup` 使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发
   - 配合 `keydown` 使用：正常触发事件
3. `Vue.config.keyCodes.自定义键名 = 键码`，可以去定制按键别名

定义一个别名按键：

```javascript
Vue.config.keyCodes.huiche = 13
```

系统修饰符可以连写，如：`.ctrl.y`

## Vue 配置项

### 一、el

绑定元素。

### 二、data

存储数据。

### 三、methods

存储函数。

**函数中的方法：**

如果修改数组或对象的值，页面不会跟着变化时必须使用 `$set(对象/数组，属性/下标，修改后的值)`。

```javascript
this.$set(this.arr, 0, "a")
```

删除数组或对象的值：

```javascript
this.$delete(对象/数组，属性/下标)
```

可设置为全局：`Vue.set()`、`Vue.delete()`

### 四、computed

计算属性。

1. **定义：** 要有的属性不存在，要通过已有的属性计算得来
2. **原理：** 底层借助了 `Object.defineProperty` 方法提供 getter 和 setter
3. **优势：** 与 methods 实现相比，内部有缓存机制（复用），效率更高，调试方便

**语法一：**

```javascript
fullName: {
  get() {
    return this.pic * this.num
  }
}
```

调用：`{{fullName}}`

**与 methods 的区别：**

1. 计算属性的调用只有当依赖的数据发生改变才会执行（变化时自动执行），而 methods 只要调用就会执行
2. 计算属性调用不用加小括号，而 methods 方法调用可以选择加小括号

**简写：**

只考虑读取，不考虑修改：

```javascript
fullName() {
  return this.pic * this.num
}
```

### 五、watch

监听属性，监听 data 内部的属性值是否发生改变。

`num`、`arr` 为 data 的值。

**监听方式 1：**

```javascript
watch: {
  arr: {
    handler() {
      console.log(123)
    }
  }
}
```

**监听方式 2：**

```javascript
watch: {
  arr() {
    console.log(123)
  }
}
```

普通监听默认不能监听数组和对象的改变，需采用深度监听。

**深度监听：**

监听数组和对象的地址，值改变地址不变，不会监听到。

`'numbers.a'` 监听多级结构中某个属性的变化。

```javascript
numbers: {  // 监听多级结构中所有属性的变化
  // 开启深度监听
  deep: true,
  // 监听回调函数
  // newValue,oldValue 分别为当前值和修改前的值
  handler(newValue, oldValue) {
    console.log(123)
  },
  // 初始化时让 handler 调用一下
  immediate: true
}
```

**全局监听：**

写法一：

```javascript
vm.$watch('arr', {
  // 监视内容
})
```

写法二：

```javascript
vm.$watch('arr', function() {
  // 监视内容
})
```

### 六、template

设置模板组件。

```javascript
template: '<App/>'
```

### 七、`$nextTick`

Vue 是异步更新 DOM 的。

`$nextTick` 所指定的回调函数会在更新 DOM 之后执行。

```javascript
this.$nextTick(function() {
})
```

## Vue 采用 MVVM 模型

一种软件架构模式。

1. **M：模型(Model)** - 对应 data 中的数据
2. **V：视图(View)** - 模板
3. **VM：视图模型(ViewModel)** - Vue 实例对象
   - data 中所有的属性，都出现在了 vm 身上
   - vm 身上所有的属性，以及 Vue 原型上所有属性，在 Vue 模板中可以直接使用

### 虚拟 DOM

通过对象的数据结构来模拟 DOM 节点，虚拟 DOM 通过 diff 算法将数据传输给页面。

diff 算法用于对比虚拟 DOM 和真实 DOM 的差别。

## Object.defineProperty 方法

给对象添加属性。

```javascript
Object.defineProperty(对象，'属性名', {配置项})
```

如：

```javascript
Object.defineProperty(person, 'age', {
  value: 18
})
```

1. **添加的属性不可被枚举（不可遍历）**

若需要遍历，在创建属性时添加：

```javascript
enumerable: true  // enumerable 控制属性是否可以枚举，默认值为 false
```

2. **通过 defineProperty 定义的属性不可修改**

需要修改，添加：

```javascript
writable: true  // writable 控制属性是否可以被修改，默认为 false
```

3. **属性需删除，添加**

```javascript
configurable: true  // configurable 控制属性是否可以被删除，默认值是 false
```

4. **get**

当有人读取 person 的 age 属性时，get 函数就会被调用，且返回值就是 age 的值。

```javascript
get() {
  return number
}
```

5. **set**

当修改 person 的 age 属性时，set 函数就会被调用，且会收到修改的具体值。

```javascript
set(value) {
  // value 为修改的值
}
```

## 数据代理

### 1. Vue 中的数据代理

通过 vm 对象来代理 data 对象中属性的操作（读/写）。

### 2. Vue 中数据代理的好处

更加方便的操作 data 中的数据。

### 3. 基本原理

通过 `Object.defineProperty()` 把 data 对象中所有的属性添加到 vm 上。为每一个添加到 vm 上的属性，都指定一个 getter/setter。在 getter/setter 内部去操作（读/写）data 中对应的属性。

在 `_data` 中的数据做了数据劫持，实现响应式。

## 数据劫持

遍历 data 中的数据，并为每个数据添加 setter 和 getter。

## 双向绑定的原理

1. Vue 遍历 Vue 对象中 data 属性对象的所有属性
2. 通过 `Object.defineProperty()` 给每个属性添加 getter 以及 setter（取值函数与存值函数）
3. 给每一个组件实例设置 watcher 对象
4. 会在组件渲染过程中将属性设置为依赖
5. 当依赖的属性 setter 方法被调用时会通知 watcher 对象，修改页面

过程中出现了三个对象（组件为元素标签）：

- **Observer 对象** - 在 Vue data 属性初始化转化时产生；将 data 转换为虚拟 DOM
- **Watcher 对象** - 在将组件与 Observer 对象结合时产生，通过 setter 和 getter 检测虚拟 DOM 是否改变
- **Dep 对象** - Observer 对象与 Watcher 对象之间的纽带

## 后添加数据实现响应式

只能给 data 中实例对象里面追加，不能给 vm 或 vm 的根数据对象添加属性。

```javascript
Vue.set(添加地址，名，值)
Vue.set(this.student, 'sex', '男')
// 或
this.$set(this.student, 'sex', '男')
```

## 修改数组数据

### 1. 包装数组

将被侦听的数组的变更方法进行了包装。

1. 调用 `Array.prototype` 身上的 push
2. 重新解析模板，生成虚拟 DOM

包装数组身上的常用修改数组方法实现：

```javascript
vm.student.hobby.push('添加的内容')
```

### 2. `Vue.set()`

```javascript
Vue.set(vm.student.hobby, 0, '添加的内容')
```

## 生命周期

又名：生命周期回调函数、生命周期函数、生命周期钩子。

生命周期的函数 this 都为 vue。

**四个阶段：**

### 1. 创建前创建后

数据检测与数据代理创建前后。

- **创建前** - `beforeCreate`：此时 vue 中无 `_data` 和 `methods`
- **创建后** - `created`

### 2. 挂载前挂载后

页面加载完成。

- **挂载前** - `beforeMount`
- **挂载后** - `mounted`：Vue 完成模板的解析并把初始的真实 DOM 元素放入页面后（挂载完毕），一般用于发起请求，设置 data 数据

### 3. 更新前更新后

可多次触发。

- **更新前** - `beforeUpdate`：数据是新的，页面数据是旧的，即：页面尚未和数据保持同步
- **更新后** - `updated`

### 4. 销毁前销毁后

自毁：调用 `vm.$destroy()`，完全销毁一个实例，清理它与其他实例的连接，解绑它的全部指令及事件监听器（自定义事件），原生 DOM 事件依然有效。

- **销毁前** - `beforeDestroy`：对数据的所有操作不会触发更新
- **销毁后** - `destroyed`

## Vue 组件

**定义：** 实现应用中局部功能代码和资源的集合。

**作用：** 复用编码，简化项目编码，提高运行效率。

### 创建组件

```javascript
const school = Vue.extend({
  // 配置组件结构
  template: ``,  // （非单文件写法）
  // 使用 name 配置项指定组件在开发者工具中呈现的名字
  name: ' ',
  // 将 data 写成函数形式，避免组件被复用时，数据存在引用关系，防止 data 中指向的地址为同一个
  data() {
    return {}
  }
})
```

可简写为：

```javascript
const school = {
  // 配置对象
}
```

### 注册组件

**局部组件：**

```javascript
components: {
  school,
  students
}
```

**全局组件：**

```javascript
Vue.component('hello', hello)
```

### 编写组件标签

```vue
<school></school>
<students/>  <!-- 需要脚手架 -->
```

## VueComponent

Component 意为组件。

1. school 组件本质是一个名为 VueComponent 的构造函数，且不是程序员定义的，是 `Vue.extend` 生成的
2. 当调用组件时，Vue 解析时会帮我们创建 school 组件的实例对象，即 Vue 帮我们执行的 `new VueComponent(options)`
3. 每次调用 `Vue.extend`，返回的都是一个全新的 VueComponent
4. 组件中的 this 为 VueComponent 实例对象
5. VueComponent 简称为 vc，也称之为：组件实例对象

### 内置关系

实例的隐式原型属性永远指向自己缔造者的原型对象。

VueComponent 的原型对象的隐式原型指向 => Vue 的原型对象。

```javascript
VueComponent.prototype.__proto__ === Vue.prototype
```

原因：让组件实例对象（vc）可以访问到 Vue 原型上的属性和方法。

## 脚手架

### 搭建项目

```bash
vue init webpack project
```

### 初始化项目

```bash
npm i
```

### 运行项目

1. `npm start`
2. `npm run dev`

### 打包项目

```bash
npm run build
```

- `-g` 为全局
- `-s` 为当前项目

## render

render 意为渲染，是一个函数，用于解析模板。

**精简写法：**

```javascript
render: h => h(App)
```

**复杂写法：**

```javascript
render(createElement) {
  return createElement('h1', '你好啊')
}
```

```javascript
// components: { App },
// template: '<App/>'
```

## ref 属性

1. 被用来给元素或子组件注册引用信息（id 的替代者）
2. 应用在 html 标签上获取的是真实 DOM 元素，应用在组件标签上是组件实例对象(vc)
3. 使用方式：
   - 打标识：`<h1 ref="xxx"></h1>` 或 `<School ref="xxx"></School>`
   - 获取：`this.$refs.xxx`

## 组件之间的关系

父子组件、兄弟组件。

## 父子组件之间的通讯方式

### 一、父组件向子组件传参

1. 在父组件使用的子组件中添加自定义属性

如：`<Hello :son="msg">`

再在父组件的 data 中定义 msg 的值。

```vue
<Student name="李四" sex="女" :age="18">  <!-- :age 让传输的值变为"18"运算的值为 18（数字型） -->
```

2. 在子组件通过 props 进行接收

`props` 接收父组件传递的值，值不允许修改。

**接收方式一：**

```javascript
props: ['son']
```

**接收方式二：**

```javascript
props: {
  son: {
    // 定义接收的数据类型，需要大写（不加引号）
    type: String,
    // 设置默认值，没传递值时显示
    default: 'vue',
    // 必须传入，不和 default 同时设置
    required: true
  }
}
```

```javascript
props: {
  // 分别定义接受的值的类型
  name: String,
  age: Number,
  sex: String
}
```

`son` 为一个属性值，用法与 data 中属性的用法相同。

### 二、子组件向父组件传参

数据流为单向数据流，通过事件传递。

1. 在事件中通过 `$emit` 触发父组件定义事件

绑定事件：

```vue
@click="sendTo"
```

在事件中触发：

```javascript
sendTo() {
  this.$emit('sonMsg', '123')  // sonMsg 为事件名称
}
```

2. 在父组件使用的子组件中绑定事件名称

```vue
@sonMsg="getMsg"
<Hello @sonMsg="getMsg"/>
```

3. 在 data 中存储传递的数据

```javascript
sonMsg: ''
```

4. 赋值 data 中的数据

```javascript
getMsg(data) {
  this.sonMsg = data
}
```

### `.sync` 修饰符

作用：实现子组件与父组件数据的双向绑定，简化代码。

本质：`:属性名` 和 `@update:属性名` 合写。

### 通过父向子传函数

1. 在父组件中定义一个函数
2. 将函数名传入子组件：`:receive="receive"`
3. 子组件通过 props 接受：`props: ['receive']`
4. 在函数中将值传输：`this.receive(要传输的值)`

其余方法：通过事件总线、ref、vuex。

## mixin 混入

把多个组件共用的配置提取成一个混合对象。

**使用方式：**

第一步定义混合，例如：

```javascript
{
  data() {....},
  methods: {....}
  ....
}
```

第二步使用混合，例如：

引入混合：`import {mixin1, mixin2, ...} from '../mixin'`

- （1）全局混合：`Vue.mixin(xxx)`
- （2）局部混合：`mixins: ['xxx']`

## scoped 样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：`<style scoped>`

## 插槽 slot

### 默认插槽

用于接收父组件传给子组件的所有内容。

将需传递的元素添加到子组件内部。

默认情况下子组件标签中的值不会显示在页面上。

在子组件中添加 `<slot></slot>`，添加一次显示一个。

### 插槽-后备内容（默认值）

语法：在 slot 标签内放置内容。

```vue
<slot>我是后备内容（默认值）</slot>
```

### 命名插槽

给 slot 标签添加 name 属性以及给传入的内容添加 slot 属性，只有当两个属性值相等时，才能接收到值。

```vue
name="one"
```

在父组件向子组件传递的标签中添加 `slot="one"`。

此时，普通插槽无效。

当使用 template 包裹内容时，可使用新语法定义名字：`v-slot:footer`

### 作用域插槽

基本使用步骤：

1. 给 slot 标签，以添加属性的方式传值

```vue
<slot :id="item.id" msg="测试文本"></slot>
```

2. 所有添加的属性，都会被收集到一个对象中

```javascript
{id: 3, msg: '测试文本'}
```

3. 在 template 中，通过 `#插槽名="obj"` 接收，默认插槽名为 default

```vue
<MyTable :list="list">
  <template #default="obj">
    <button @click="del(obj.id)">删除</button>
  </template>
</MyTable>
```

作用：可以给插槽上绑定数据，供将来使用组件时使用。

## 引入图片

如果图片放在 assets 目录下的静态文件，需要通过 js 获取，则必须将静态文件当做模块导入。

**方法一：**

```javascript
src: require("地址")
```

**方法二：**

```javascript
import imgSrc from "地址"
```

## 引入 CSS

```css
@import url("地址")
```

## moment 插件

**导入插件：**

```bash
npm i moment -s
```

**在 main 中引入：**

```javascript
import moment from 'moment'
```

**需要设置过滤器：**

```javascript
Vue.filter('changeTime', function(value) {
  return moment(value).format('YYYY/MM/DD hh:mm:ss')
})
```

## nanoid 插件

```bash
npm i nanoid
```

引入：

```javascript
import {nanoid} from 'nanoid'
```

调用：

```javascript
nanoid()
```

每次调用会返回随机唯一的字符串。

## Less

需要将 less 变为 css，浏览器才识别。

**引入：**

```bash
npm i --save less less-loader@5
```

**使用：**

在 style 中加入：

```vue
<style lang="less">
```

## 路由

### 1. 导入插件

```bash
npm i vue-router@3.0.1 -s
```

### 2. 在 src 中新建文件夹 router

### 3. 在 router 文件夹中添加 index.js 文件，作为路由文件

### 4. 配置 index.js 文件

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Home from "../views/Home"
import NotFind from "../views/NotFind"

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // 路由元信息，也就是每个路由身上携带的信息。
      meta: {
        num: 0
      },
      // 重定向
      redirect: '/Me'
    },
    // 匹配 404 页面
    {
      path: "/:catchAll(.*)",
      redirect: '/404',
      component: () => import('../views/NotFindView.vue'),
    }
  ]
})
```

### 5. 在 main.js 文件中的 new Vue 中引入配置的 vue-router 文件

```javascript
import router from './router'

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

### 6. 将 router 添加到配置项中

router 提供了两个自定义组件：

- **路由出口** - `router-view`
- **路由入口** - `router-link`，相当于 a 标签，属性 `to=""` 设置跳转地址

## 路由的跳转

### 声明式导航

`router-link`，可以进行路由的跳转。

### 编程式导航

`push` | `replace`，可以进行路由的跳转。

#### 一、path 路径跳转

**(1) 简写：**

```javascript
this.$router.push('/search?参数1=参数值1&参数2=参数值2')
this.$router.push('/search/参数值1/参数值2')
```

**(2) 完整写法：**

```javascript
this.$router.push({
  path: '/search',
  query: {
    参数1: '参数值1',
    参数2: "参数值2"
  }
})
this.$router.push({
  path: '/search/参数值1/参数值2',
})
```

#### 二、name 命名路由跳转（适合 path 路径长的场景）

```javascript
this.$router.push({
  name: '路由名',
  query: {
    参数1: '参数值1',
    参数2: "参数值2"
  }
})
this.$router.push({
  name: '路由名',
  params: {
    参数1: '参数值1',
    参数2: "参数值2"
  }
})
```

## 缓存组件 keep-alive

`keep-alive` 是 Vue 的内置组件，当它包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

```vue
<keep-alive>
  <router-view></router-view>
</keep-alive>
```

### keep-alive 的三个属性

1. `include`：组件名数组，只有匹配的组件会被缓存
2. `exclude`：组件名数组，任何匹配的组件不会被缓存
3. `max`：最多可以缓存多少组件实例

### 被缓存的组件多两个生命周期

1. `activated` - 激活时，组件被看到时触发
2. `deactivated` - 失活时，离开页面组件看不见时触发

## 过渡动画

### transition 标签

给 transition 标签内的元素添加 `v-show` 属性，通过修改属性值控制动画。

可给 transition 取 name 来区分，此时样式类型 `v-` 变为：`name值-`。

实现加载完成自动动画：

```vue
:appear="true"  <!-- 简写为 appear -->
```

**使用动画实现：**

- 进入时样式类名：`v-enter-active`
- 离开时样式类名：`v-leave-active`

**动画倒放：**

```css
animation: move 1s reverse;
```

**Vue 样式实现：**

- 进入的起点样式，离开的起点：`.v-enter, .v-leave-to {}`
- 进入的终点样式，离开的终点：`.v-enter-to, .v-leave {}`
- 过渡时间添加在 transition 标签内部的元素上
- 在 Vue 类名中添加时间：`.v-enter-active, .v-leave-active {}`

**多个标签同时动画：**

使用 `transition-group` 标签包裹，并给内部标签添加 key 属性。

### 使用第三方库

**animate.css**

导入：

```bash
npm i animate.css
```

引入：

```javascript
import 'animate.css'
```

给 transition-group 添加配置好的 class 类名：

```vue
name="animate__animated animate__bounce"
```

设置进入和离开动画：

- 进入：`enter-active-class=""`
- 离开：`leave-active-class=""`

## axios 发送请求

**导入：**

```bash
npm i axios
```

**引入：**

```javascript
import axios from 'axios'
axios.get('请求地址').then(
  response => {
    // 请求成功
    console.log(response.data)  // 成功后的值
  },
  error => {
    // 请求失败
    console.log(error.message)
  }
)
```

### 二次封装

在 src 中新建文件夹进行编辑。

**1. 对 axios 进行封装：**

```javascript
import axios from 'axios'
let request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000
})
// 设置请求拦截器
// 使请求头携带 token
// 设置响应拦截器
// 处理返回的数据
export default request
```

**2. 对请求接口进行封装：**

```javascript
import request from './axios.js'
let getUser = (params = {}) => {
  return request.post('/getUser', params)
}
export default {getUser}
```

**局部调用（在 app.vue 中）：**

```javascript
import api from "./axios/api.js"
api.getUser().then(data => {
  console.log(data)
})
```

### 全局引入

```javascript
import api from './axios/api.js'
Vue.prototype.$http = api
```

**调用：**

```javascript
this.$http.getUser({}).then(data => {
  console.log(data)
})
```

## vue-cli 脚手架开启代理服务器

**方式一：**

在文件 `vue.config.js` 中：

```javascript
devServer: {
  proxy: 'http://localhost:5000'  // 5000 为需要请求的端口号
}
```

当请求的资源本身（文件夹中）就有时，不会向请求的端口号发送请求。

**方式二：**

查看官网 CLI 中的 `devServer.proxy`。

不将前缀作为请求：

```javascript
pathRewrite: {'^/atguigu': ''}
```

## Vuex

### 创建 Vuex 仓库

创建 store 文件夹以及内部的 index.js 文件：

```javascript
import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex)

const store = new Vuex.Store({
  // 用于处理异步操作
  actions: {
    setAsyncCount(context, num) {
      setTimeout(() => {
        context.commit('changeCount', num)
      })
    }
  },
  // 修改数据，必须同步
  mutations: {
    // 所有 mutation 函数，第一个参数为 state，第二个为传入的值
    addCount(state, n) {
      
    }
  },
  // 状态、数据
  state: {
    count: "100",
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  // 类似于计算属性
  getters: {
    // 第一个参数为 state，必须有返回值
    filterList(state) {
      return state.list.filter(item => item > 5)
    }
  }
})

export default store
```

### 在 main.js 中挂载

```javascript
import store from './store'

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
```

### 使用数据

#### 获取 store

**一、通过 store 直接访问：**

- 模板中：`{{ $store.state.xxx }}`
- 组件逻辑中：`this.$store.state.xxx`
- JS 模块中：`store.state.xxx`

**二、通过辅助函数：**

`mapState` 是辅助函数，帮助我们把 store 中的数据自动映射到组件的计算属性中。

1. 导入：

```javascript
import { mapState } from 'vuex'
```

2. 使用：

```javascript
computed: {
  ...mapState(['count', 'title'])
}
```

### 组件中修改数据

```javascript
this.$store.commit('addCount', n)
```

#### 辅助函数 mapMutations

调用：

```javascript
this.subCount(n)
```

### 调用 action

```javascript
this.$store.dispatch('setAsyncCount', 200)
```

### 访问 getters

**1. 通过 store 访问 getters：**

```vue
{{ $store.getters.filterList }}
```

**2. 通过辅助函数 mapGetters 映射：**

```javascript
computed: {
  ...mapGetters(['filterList'])
}
```

```vue
{{ filterList }}
```

## token 验证

### 后端

**安装插件：**

```bash
npm i jsonwebtoken -s
```

**用于生成 token：**

在 node 中创建文件夹 config，在内部创建 store.js：

```javascript
module.exports = {
  // 密钥
  "key": "",
  // 过期时间
  "outtime": 60 * 60 * 24  // 一天过期
}
```

**引入 token：**

```javascript
let {key, outtime} = require('../../config/store')
let jwt = require('jsonwebtoken')
// sign({用户信息}，密钥，过期时间)
let token = jwt.sign(req.body, key, {expiresIn: outtime})
// 返回给前端
```

**判断请求头是否携带 token：**

安装插件：

```bash
npm i express-jwt -s
```

### 前端

将 token 存入缓存：

```javascript
window.localStorage.setItem('token', data.data.token)
```

# Vue 3

## 使用 webpack 创建项目

方法 1：`vue create 项目名称`

方法 2：`vue ui`

启动项目：

```bash
npm run serve
```

## 使用 vite 创建项目

```bash
npm init vue@latest
```

启动项目：

```bash
npm run dev
```

## setup

`setup` 函数在 `created` 之前进行调用。

**注意：**

1. `setup` 函数中不能使用 this
2. `setup` 不是生命周期
3. 选项式 API 尽量不要和组合式 API 混用

## ref()

**引入 ref：**

```javascript
import {ref} from 'vue'
```

定义响应式数据，需要通过 `value` 属性改变值。

主要用于修改值类型响应式数据，也可以修改引用类型数据为响应式数据。

修改值类型使用的是 Vue 2 的数据双向绑定原理，`Object.defineProperty` 方法。

修改引用类型，需要自动调用 `reactive` 方法在修改响应式数据，`reactive` 方法实现数据双向绑定的原理采用 Proxy。

## axios

### 方法一

1. 将 axios 挂载到全局对象上

2. 在需要使用的 vue 组件中导入 `getCurrentInstance`

```javascript
import {getCurrentInstance} from 'vue'
```

3. 调用：

```javascript
getCurrentInstance().proxy.$axios
```

`getCurrentInstance().proxy` 相当于 this。

### 方法二

```javascript
import {getType} from "@/axios/api"
getType().then(res => {
    
})
```

### 配置代理服务器

```javascript
server: {
  proxy: {
    host: "localhost",
    port: "5173",
    open: "true",
    https: "true",
    cors: "true",
    "/api": {
      target: "http://8.130.28.129:9090",
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, ""),
    }
  },
}
```

# Pinia

**特点：**

1. 兼容 ts
2. 核心更少

## 重置 state

你可以通过调用 store 的 `$reset()` 方法将 state 重置为初始值。

参考：https://pinia.vuejs.org/zh/core-concepts/state.html#resetting-the-state

```javascript
const store = useStore()

store.$reset()
```

## 持久化存储

### 1. 安装插件

```bash
yarn add pinia-plugin-persist
# 或者使用 npm
npm install pinia-plugin-persist
```

### 2. 引入插件

和引入 `pinia` 一样，在 `main.js` 中引入。

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPersist)

createApp(App).use(pinia).mount('#app')
```

### 3. 使用插件

将当前模块中的所有数据都进行持久化保存，默认保存在 `sessionStorage` 中，`key` 为模块 `id`。

#### 选项式 API 中

```javascript
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: null,
    age: null,
    sex: null,
    count: 1
  }),
  actions: {
    increment() {
      this.count++
    }
  },
  persist: {
    enabled: true, // true 表示开启持久化保存
    strategies: [
      { storage: sessionStorage, paths: ['name'] }
    ],
  }
})
```

#### 组合式 API 中

```javascript
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }
  return { count, increment }
}, {
  // 开启持久化
  persist: {
    key: "hm-counter", // 修改本地存储的唯一标识
    paths: ['count'] // 存储的是哪些数据
  }
})
```

在 Setup Store 中：

- `ref()` 就是 state 属性
- `computed()` 就是 getters
- `function()` 就是 actions

### Pinia 持久化

1. 安装插件 `pinia-plugin-persistedstate`

```bash
npm i pinia-plugin-persistedstate
```

2. 在 main.js 使用

```javascript
import persist from 'pinia-plugin-persistedstate'

app.use(createPinia().use(persist))
```

3. store 仓库中，`persist: true` 开启

## Vue 使用 props

### 接收变量

`defineProps` 函数：

```javascript
const info = defineProps(["info"])
```

### 接收函数

`defineEmits` 函数：

```javascript
const emit = defineEmits(["addinfo"])
```
