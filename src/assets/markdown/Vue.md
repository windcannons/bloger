# Vue

# 常见的自定义指令

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

阻止 Vue 在启动时生成成产提示
Vue.config.productionTip = false

#### 创建vue实例

new Vue({
	el:"#root",
	data:{
		name:"尚硅谷"
	}
})

el与data的第二种写法
一、el的第二种写法
const vm = new Vue({
	data:{
		name:"尚硅谷"
	}
})
vm.$mount('#root')
$mount 为挂载
二、data的第二种写法
data:function(){
	return{
		name:"尚硅谷"
	}
}
以函数形式，值为return返回值
函数的this为Vue实例对象，是vue在调用函数，data函数不能是箭头函数


一、插值语法
功能：用于解析标签体内容
写法：{{xxx}}，
1.xxx可以是js表达式(如1+1)，
2.可以直接读取到data中所有的属性
3.可以是vm身上以及原型上所有的属性 
new Date() 可获取当前时间

二、指令语法
功能：用于解析标签（包括：标签属性、标签体内容、绑定事件...）
举例：v-bind:href="xxx" 或者 简写为 :href="xxx" xxx同样要写js表达式，且可以直接读取到data中所有属性
1.v-html="str"
会解析传入的内容以及标签，解析后存入标签文本中
不要在表单中写，防止xss攻击
2、v-text
3、v-show
适用于切换评率高的场景，不展示的DOM元素未被移除，仅仅是使用样式隐藏
v-show="true" 显示内容
v-show="false" 隐藏内容
布尔值可写表达式，判断表达式为真假

4、v-if、v-else-if、v-else
适用于切换频率低的场景，不展示的DOM元素直接被移除
v-if可以和v-else-if、v-else一起使用，但要求结构不能被打断
v-if="num>1" 通过判断，切换不同内容的显示
v-else-if="num<10"
v-else
可与template标签配合使用

<template></template>只能配合v-if使用，不会渲染在结构中

注：使用v-if时，元素可能无法获取到，而使用v-show一定可以获取到

5、v-for
不能同时给一个元素设置v-for和v-if
一般配合key使用 key作为循环的唯一标识符，key的值不能重复
:key="index" index为索引
in可替换为of
v-for="(item,index) in a"  循环5次标签,item为具体的值
a 可以为具体数字，可以为data中的数组、对象
调用数组对象中的值时使用item.
***根据属性设置样式 finish为类名
方法一    :class="[item.state ? 'finish' : '']
方法二    :class="{finish:item.state}"
当遍历对象时
v-for="(a,b) in obj"
a为键值，b为键名
当遍历字符串时
a为每一个字符，b为索引值

6、v-bind:
单项数据绑定
作用：让标签的属性可以设置为变量
可以简写为:
方式一：
直接加载被绑定属性前面
方式二
v-bind:class="{one:isone}"
可在data中存入isone:false，当为false时，不生效，true时生效
方式三
设置多个类名
v-bind:class="{one:isShow,two:!isShow}"
isShow，可直接换为布尔值，也可设置在data中，通过改变isShow的值切换显示形式。isShow也可以直接换为布尔值
方式四
:class="[istwo,isthree]"
:class="['istwo','isthree']"
加引号为类名值，不加引号为data中的属性
需在data中设置istwo和isthree的值
方法五
设置内联样式
:style="{fontSize:fsize+'px'}"
fsize为data中设置的值
方法六
:style="styleObj"
data中设置:
styleObj:{
	fontSize:'40px',
	color:'red'
}

7、v-model:
双向数据绑定：
v-model 只能运用在表单元素（输入类元素）上
v-model=""  不用写value
会自动关联value的值
修饰符
.number 转换为数字型
.lazy 懒收集，表单失去焦点时收集
.trim  过滤输入收尾空格

8.v-cloak
1.本质是一个特殊属性，Vue实例创建完毕接管容器后，会删掉v-cloak属性
2.使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题
[v-clock]{
	display:none;
}

9.v-once
1.v-once所在节点在初次动态渲染后，就视为静态内容
2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能

10.v-pre
1.跳过其所在节点的编译过程
2.可利用他跳过：没有使用指令语法、没有使用差值语法的节点，会加快编译

##### 11.自定义指令

何时调用？
1.指令与元素成功绑定时
2.指令所在的模板被重新解析时
自定义指令中的this为window
自定义指令名多个单词采用-分割（kebab-case命名方式）
1.全局注册指定

在main.js文件中编写 (以自定聚焦指令为例)

```
Vue.directive('vocus',{
	//inserted 会在 指令所在的元素，被插入到页面中触发
	inserted(el，binding){
		// binding.value 获取等号右侧的值
		// el 就是指令绑定的元素
		el.focus()
	}
})
```

2.局部注册指令

在当前vue文件中编写

```
directives:{
	//指令名：指令的配置型
	focus:{
		inserted(el){
			el.focus()
		}
	}
}
```

###### 其他钩子

​	bind、insertes、update为钩子
​	//指令与元素成功绑定时
​	bind(){}
​	//指令所在元素被插入页面时
​	inserted(){}
​	//指令所在的模板被重新解析时
​	update(){}



过滤器
过滤器不能改变原数据，v-model不能绑定
| 管道符 将参数传入过滤器内

```
{{time | timeFormater}}  timeFormater为过滤器名
```

可设置格式

```
{{time | timeFormater('YYYY_MM_DD')}}
```

可连写，需设置两个函数

```
{{time | timeFormater('YYYY_MM_DD' | myslice)}}
```

局部过滤器--在vue中添加

```
filters:{
	timeFormater(value){
		return 
	}
}
```

全局过滤器--在vue创建前设置

```
Vue.filter('myslice',function(str){
})
```

在main.js中设置
Vue.fliter
用于修改数据格式
Vue.filter('过滤器名称，如money',function(传递的参数，可用value){
  return '$'+value.toFixed(2)
})

事件处理
v-on
绑定事件
可简写为@
语法：v-on:事件名="函数名"   函数名可加括号进行传参
若未传参，打印fun(e)的e时，为事件对象
函数存放在methods (methods与data同级，存放在vue中)   method意为方法

```
methods:{
	fun(){
		console.log(123)
		此处的this指向当前的vue对象
		通过this.isShow可直接拿到data的值，并可改变
	}
}
```

用法二
@click="num--"
**同时传参与拿取event
@click="事件名(66,$event)"

**事件修饰符
@click.prevent="事件名"
.prevent：阻止默认事件（常用）
.stop：阻止事件冒泡（常用）  e.stopPropagation()
.once：事件只触发一次（常用）
capture：使用事件的捕获模式
.self：只有event.target时当前操作的元素时才触发事件
.passive：事件的默认行为立即执行，无需等待事件回调执行完成
事件修饰符可连写

键盘事件
用法:@keyup.enter="show"
回车 => enter
删除 => delete(捕获"删除"和"退格"键)
退出 =>  esc
空格 => space
换行 => tab (必须配合keydown使用)
上 => up
下=> down
左=> left
右=> right
2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名)
3.系统修饰键（用法特殊）: ctrl、alt、 shift、meta
(1).配合keyup使用:按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
(2).配合keydown使用:正常触发事件。
5.Vue.config.keyCodes.自定义键名=键码，可以去定制按键别名
定义一个别名案件
vue.config.keyCodes.huiche = 13
系统修饰符可以连写
如：.ctrl.y

VUE配置项
一.el 绑定元素

二.data，存储数据

三.methods，存储函数
函数中的方法
如果修改数组或对象的值，页面不会跟着变化时必须使用$set(对象/数组，属性/下标，修改后的值)
this.$set(this.arr,0,"a")
删除数组或对象的值
$delete(对象/数组，属性/下标)
可设置为全局 vm.$set()

四.computed，计算属性
1.定义：要有的属性不存在，要通过已有的属性计算得来
2.原理：底层借助了object.defineproperty方法提供getter和setter
3.优势：与methods实现相比，内部有缓存机制(复用)，效率更高，调试方便
语法一：

```
fullName:{
	get(){
		return this.pic*this.num
	}
}
```

调用{{all}}
与methods的区别：
1、计算属性的调用只有当依赖的数据发生改变才会执行(变化时自动执行)，而methods只要调用就会执行
2、计算属性调用不用加小括号，而methods方法调用可以选择加小括号
简写：
只考虑读取，不考虑修改

```
fullName(){
	return this.pic*this.num
}
```

五、watch 监听属性
监听data内部的属性值是否发生改变
num、arr为data的值
监听方式1

```
watch:{
	arr:{
		console.log(123)
	}
}
```

监听方式2

```
arr(){
	console.log(123)
}
```

普通监听默认不能监听数组和对象的改变,需采用深度监听
深度监听
监听数组和对象的地址，值改变地址不变，不会监听到
‘numbers.a’ 监听多级结构中某个属性的变化

```
numbers:{  //监听多级结构中所有属性的变化
	//开启深度监听
	deep:true,
	//监听回调函数
	//newValue,oldValue分别为当前值和修改前的值
	handler(newValue,oldValue){
		console.log(123)
	},
	//初始化时让handler调用一下
	immediate:true
}
```

2.全局监听
写法一：
vm.$watch('arr',{
	//监视内容
})
写法二：
vm.$watch('arr',function(){

	//监视内容

})

六、template 设置模板组件
template:'<APP/>'

#### 七.$nextTick

vue是异步更新DOM的

next所指定的回调函数会在更新DOM之后执行
this.$ntxtTick(function(){
})



## vue采用 MVVM模型  一种软件架构模式

1. M：模型(Model) ：对应 data 中的数据
2. V：视图(View) ：模板
3. VM：视图模型(ViewModel) ： Vue 实例对象
   1.data中所有的属性，都出现在了vm身上
   2.vm身上所有的属性，以及Vue原型上所有属性，在Vue末班中可以直接使用
   虚拟DOM 
   通过对象的数据结构来模拟DOM节点，虚拟DOM通过diff算法将数据传输给页面
   fidd算法用于对比虚拟DOM和真实DON的差别

Object.defineProperty方法
给对象添加属性
Object.defineProperty(对象，‘属性名’，{配置项})
如：
Object.defineProperty(person,'age',{
	value:18
})
1.添加的属性不可被枚举(不可遍历)
若需要遍历，在创建属性时添加
enumerable:true     enumerable 控制属性是否可以枚举，默认值为false
2.通过deineProperty定义的属性不可修改
需要修改，添加
writable:true       writable  控制属性是否可以被修改，默认为false
3.属性需删除，添加
configurable:true   configurable 控制属性是否可以被删除，默认值是false
4.get
当有人读取person的age属性时，age函数就会被调用，且返回值就是age的值
get(){
	return number
}
5.set
当修改person的age属性时，set函数就会被调用，且会受到修改的具体值

数据代理
1.Vue中的数据代理
	通过vm对象来代理data对象中属性的操作(读/写)
2.Vue中数据代理的好处
	更加方便的操作data中的数据
3.基本原理
	通过Object。defineProperty()把data对象中所有的属性添加到vm上。
	为每一个添加到vm上的属性，都执行一个getter/setter
	在getter/setter内部去操作(读/写)data中对应的属性

在_data中的数据做了数据劫持
实现响应式

数据劫持
遍历data中的数据，并为每个数据添加setter和datter
双向绑定的原理
1、vue遍历vue对象中daya属性对象的所有属性
2.通过Object.defineProperty()给每个属性添加getter以及setter（取值函数与存值函数）
3.给每一个组件实例设置watcher对象
4.会在组件渲染过程中将属性设置为依赖
5.当依赖的属性setter方法被调用时会通知watcher对象，修改页面
过程中出现了三个对象        （组件为元素标签）
Observer对象   在vue data 属性初始化转化时产生；将data转换为虚拟DON
Watcher对象    在将组件与与Oberver对象结合时产生，通过setter和getter检测虚拟DOM是否改变
Dep对象        Observer对象与Watach对象之间的纽带


后添加数据实现响应式
只能给data中实例对象里面追加，不能给vm或vm的跟数据对象添加属性
vue.set(添加地址，名，值)
vue.set(this.student,'sex','男')
vm.$set()

修改数组数据
1.包装数组
将被侦听的数组的变更方法进行了包装
1.调用Array.prototype身上的push
2.重新解析模板，生成虚拟DOM
包装数组身上的常用修改数组方法实现
vm.student.hobby.push('添加的内容')
2.vue.set()
vue.set(vm.student.hobbt,0,'添加的内容')

生命周期
又名：生命周期回调函数、生命周期函数、生命周期钩子
生命周期的函数this都为vue
四个阶段 
1.创建前创建后  数据检测与数据代理创建前后
	创建前	beforeCreate  此时vue中无_data和methods
	创建后	created
2.挂载前挂在后  页面加载完成
	挂载前	beforeMount
     *挂载后	mounted      Vue完成模板的解析并把初始的真实DOM元素放入页面后(挂在完毕)，一般用于发起请求，设置data数据
3.更新前更新后   可多次触发
	更新前	beforeUpdate  数据时新的，页面数据时旧的，即：页面尚未和数据保持同步
	更新后	updated
4.销毁前销毁后	
自毁： 调用vm.$destroy(),完全销毁一个实例，清理它与其他实例的连接，解绑它的全部指令及事件监听器（自定义事件），原生DOM事件依然有效
     *销毁前	beforeDestory  对数据的所有操作不会触发更新
	销毁后	destoryed

Vue组件
定义：实现应用中局部功能代码和资源的集合
作用：服用编码，简化项目编码，提高运行效率
创建组件

```
const school = Vue.extend({
	//配置组件结构
	template:``,  （非单文件写法）
	//使用name配置型指定组件在开发者工具中呈现的名字
	name:‘ ’
	//将data写成函数形式，避免组件被复用时，数据存在引用关系，防止data中指向的地址为同一个
	data(){
		return{}
	}
})
```

可简写为：

```
const school = {
	//配置对象
}
```

注册组件： 局部组件

```
components:{
	school，
	students
}
```



全局组件

```
Vue.component('hello',hello)
```

编写组件标签

```
<school></school>
<students/> （需要脚手架）
```

VueComponent  Component意为组件
1.school组件本质是一个名为VueComponent的构造函数，切不是程序员定义的，是Vue.extend生成的
2.当调用组件时，Vue解析时会帮我们创建school组件的实例对象，即Vue帮我们执行的new VueComponent(options)
3.每次调用Vue.extend，返回的都是一个全新的VueComponent
4.组件中的this为VueCompoment实例对象
5.VueComponent简称为vc，也称之为：组件实例对象

内置关系
实例的隐式原型属性永远指向自己缔造者的原型对象
VueComponent的原型对象的隐式原型 指向=> Vue的原型对象

```
VueComponent.prototype.__proto__===Vue.prototype
```

原因：让组件实例对象（vm）可以访问到Vue原型上的属性和方法

脚手架
搭建项目
vue init webpack project
初始化项目
npm i
运行项目
1.npm start
2.npm run dev
打包项目
npm run build
-g 为全局
-s 为当前项目

render  意为渲染
是一个函数，用于解析模板
精简写法
render:h => h(App)
复杂写法
render(createElement){
	return createElement('h1','你好啊')
}
 // components: { App },
 // template: '<App/>'

ref属性
1.被用来给元素或子组件注册引用信息（id的替代者）
2.应用在html标签上获取的真实DOM元素，应用在组件标签上是组件实例对象(vc)
3.使用方式
	打标识：`<h1 ref="xxx"></h1> `或 `<School ref="xxx"></School>`
	获取：this.$refs.xxx

组件之间的关系：父子组件、兄弟组件
父子组件之间的通讯方式
一、父组件向子组件传参
1.在父组件使用的子组件中添加自定义属性
如`<Hello :son="msg">`
再在父组件的data中定义msg的值
<Stuednt name="李四" sex="女" ：age="18">   :age让传输的值变为"18"运算的值为18（数字型）
2.在子组件通过props进行接收
props  接收父组件传递的值，值不允许修改
接收方式一

```
props:['son']
```

接收方式二

```
props:{
	son:{
		//定义接收的数据类型，需要大写(不加引号)
		type:String,
		//设置默认值，没传递值时显示
		default:'vue'
		必须传入，不和default同时设置
		required:true
	}	
}
props:{
	//分别定义接受的值的类型
	name:String,
	age:Number,
	sex:String
}
son为一个属性值，用法与data中属性的用法相同
```

二、子组件向父组件传参   数据流为单项数据流
通过事件传递
1.在事件中通过$emit触发父组件定义事件
绑定事件

```
@click="sendTo"
```

在事件中触发

```
 sendTo(){
	this.$emit('sonMsg',‘123’)   sonMsg为事件名称
}
```

2.在父组件使用的子组件中绑定事件名称

```
 @sonMsg="getMsg"
<Hello @sonMsg="getMsg"/>
```

3.在data中存储传递的数据
sonMsg: ''
4.赋值data中的数据

```
getMsg(data) {
      this.sonMsg = data
}
```



#### .sync修饰符

作用：实现子组件与父组件数据的双向绑定，简化代码

本质：：属性名和@update：属性名合写



通过父向子传函数
1.在父组件中定义一个函数
2.将组件名传入子组件  :receive="receive"
3.子组件通过props接受 props:['receive']
4.在函数中将值传输  this.receive(要传输的值)

其余方法：通过事件总线、ref、vuex

mixin 混入
把多个组件共用的配置提取成一个混合对象
使用方式：
	第一步定义混合，例如：
		{
			data(){....},
			methods:{....}
			....
		}
	第二部使用混合，例如：
		引入混合 import {mixin1,mixin2,...} from '../minxin'
		（1）全局混合：Vue.minin(xxx)
		（2）局部混合：minin:['xxx']

scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：`<style scoped>`

### 插槽 slot

##### 默认插槽

用于接收父组件传给子组件的所有内容
将需传递的元素添加到子组件内部
默认情况下子组件标签中的值不会显示在页面上
在子组件中添加<slot><slot/>
添加一次显示一个



##### 插槽-后备内容（默认值）

语法：在slot标签内防止内容

```
<slot>我只后备内容（默认值）</slot>
```



##### 命名插槽

给slot标签添加name属性以及给传入的内容添加slot属性，只有当两个属性值相等时，才能接收到值
name="one"
在父组件向子组件传递的标签中添加``` slot="one"```
此时，普通插槽无效

当使用template包裹内容时，可使用新语法定义名字```v-slot:footer```



##### 作用于插槽

基本使用步骤

1.给slot标签，以添加属性的方式传值

```
<slot :id="item.id" msg="测试文本"></slot>
```

2.所有添加的属性，都会被收集到一个对象中

```
{id:3,msg:'测试文本'}
```

3.在template中，通过`#插槽名=“”obj`接收，默认插槽名为default

```
<MyTable :list="list">
	<template #default="obj">
		<button @click="del(obj.id)">删除</button>
	</template>
</MyTable>
```

作用：可以给插槽上绑定数据，供将来使用组件时使用



#### 引入图片

如果图片放在assets目录下的静态文件，需要通过js获取，则必需将静态文件当做模块导入
方法一

```
src:require("地址")
```

方法二

```
import imgSrc from "地址"
```

引入css

```
@importURL（“地址”）
```

moment插件
导入插件

```
npm i moment -s
```

在main中引入

```
import moment from 'moment'
```

需要设置过滤器

```
vue.fliter('changeTime',function(value){
	retuen moment(value).format('YYYY/MM/DD hh:mm:ss')
})
```

nanoid 插件
npm i nanoid
引入 import {nanoid} from 'nanoid'
调用nanoid()
每次调用会返回随机唯一的字符串

less
需要将less变为css，浏览器才识别
引入
npm i --save less less-loader@5
使用
在style中加入
lang = 'less'

## 路由

#### 1.导入插件

npm i vue-router@3.0.1  -s

##### 2.在src中新建文件夹router

##### 3.在router文件夹中添加index.js文件，作为路由文件

##### 4.配置index.js文件

```
import Vue
    from 'vue'
import Router
    from 'vue-router'
import Home
    from "../views/Home";
import NotFind
    from "../views/NotFind";

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
        //   匹配404页面
           {
            path: "/:catchAll(.*)",
            redirect: '/404',
            component: () => import('../views/NotFindView.vue'),
        }
    ]
})
```

5.在main.js文件中的new vue中引入配置的vue-router文件：

```
import router from './router'

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

6.将router添加到配置项中

router提供了两个自定义组件
路由出口 router-view
路由入口router-link 相当于a标签
	属性to=“”设置跳转地址

### 路由的跳转

#### 声明式导航:

router-link,可以进行路由的跳转 
编程式导航 push| replace ，可以进行路由的跳转

#### 编程式导航

##### 一、path路径跳转

(1)  简写

```
tnis.$router.push('/secrch?参数1=参数值1&参数2=参数值2')
tnis.$router.push('/secrch/参数值1/参数值2')
```

（2）完整写法

```
this.$router.push({
	path:'/search',
	query:{
		参数1：'参数值1',
		参数2:"参数值2"
	}
})
this.$router.push({
	path:'/search/参数值1/参数值2'，
})
```

##### 二、name命名路由跳转（适合path路径长的场景）

```
this.$router.push({
	name:'路由名',
	query:{
		参数1：'参数值1',
		参数2:"参数值2"
	}
})
this.$router.push({
	name:'路由名',
	params:{
		参数1：'参数值1',
		参数2:"参数值2"
	}
})
```

# 缓存组件 keep-alive

keep-alive是Vue的内置组件，当它包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

```
<keep-alive>
 <router-view></router-view>
</keep-alive>
```

##### keep-alive的三个属性

1.include ：组件名数组，只有匹配的组件会被缓存

2.exclude：组件名数组，任何匹配的组件不会被缓存

3.max：最多可以缓存多少组件实例

##### 被缓存的组件多两个生命周期

1. actived 激活时，组件被看到时触发
2. deactived 失活时，离开页面组件看不见时触发



# 过度动画

transition标签
给transition标签内的元素添加v-show属性，通过修改属性值控制动画
可给transition取name来区分
此时样式类型 v- 变为：name值-
实现加载完成自动动画
:appear="true"  简写为  appear
使用动画实现
进入时样式类名  v-enter-active
离开时样式类名 v-leave-active
动画倒放
animation:move 1s reverse;

vue样式实现
进入的起点样式,离开的起点
.v-enter,.v-leave-to{}
进入的终点样式,离开的终点
.v-enter-to,.v-leave{}
1.过度时间添加在transition标签内部的元素上
2.在vue类名中添加时间
.v-enter-active,.v-leave-active{}

多个标签同时动画
使用transition-group标签包裹
并给内部标签添加key属性

使用第三方库
animate.css
导入
npm i animate.css
引入
import 'animate.css'
给transition-group添加配置好的class类名
name="animate__animated animate__bounce"
设置进入和离开动画
进入：enter-active-class=""
离开：leave-active-class=""

axios发送请求
导入
npm i axios
引入

```
import axios from 'axios'
axios.get('请求地址').then(
	response => {
		// 请求成功
		console.log(response.data)  成功后的值
	}，
	error =>{
		// 请求失败
		console.log(error.message)
	}	
)
```

二次封装
在src中新建文件夹进行编辑
1.对
import axios from 'axios'
let request = axios.create({
	beseURL:"http://localhost:3000",
	timeout:10000
})
设置请求拦截器
	使请求头携带token
设置相应拦截器
	处理返回的数据
export default request

2.对请求接口进行封装

```
import request from './axios.js'
let getUser = (params={}) =>{
	return requests.post('/getUser',params)
}
export default {getUser}
```

局部调用（在app.vue中）

```
import api from "./axios/api.js"
api.getUser().then(data=>{console.log(data))
```



#### 全局引入

import api from './axios/api.js'
vue.prototype.$http=api

##### 调用

this.$http.getUser({}).then(data=>{console.log(data))

vue-cli 脚手架开启代理服务器
方式一
在文件vue.config.js中
devServer:{
	proxy:'http://localhost:5000'  5000为需要请求的端口号
}
当请求的资源本身（文件夹中）就有时，不会向请求的端口号发送请求
方式二
查看官网CLI中的devServer.proxy
不将前缀作为请求
pathRewriteL{'^/atguigu':''}

## vuex

#### 创建Vuex仓库

##### 创建store文件夹以及内部的index.js文件

```
import Vuex
    from "vuex";
import Vue
    from "vue";

Vue.use(Vuex)

const store = new Vuex.Store({
	// 用于处理异步操作
    actions = {
       setAsyncCount (context,num){
       		setTimeout(() => {
       			context.commit('changeCount',num)
       		})
       }
    }
	// 修改数据，必须同步
	
    mutations = {
    	// 所有mutation函数，第一个参数为state,第二个为传入的值
       addCount(state,n){
       	
       }
    }
	// 状态、数据
    state = {
        count: "100"，
        list:[1,2,3,4,5,6,7,8,9]
    }
    // 类似于计算属性
    getters:{
    	// 第一个参数为state，必须有返回值
    	filterList (state) {
    		return state.list.lilter(item => item > 5)
    	}
    }
})

export default store
```

##### 在main.js中挂在

```
import store from './store'

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
```

#### 使用数据

##### 获取 store

##### 一.通过store直接访问

模板中：{{ $store.state.xxx }}

组件逻辑中：this,$store.state.xxx

JS模块中： store.state.xxx

##### 二.通过辅助函数

mapState是辅助函数，帮助我们把store中的数据自动映射到组件的计算属性中

1.导入

```
import { mapState } from 'Vuex'
```

2.使用

```
computed:{
	...mapState(['count,title'])
}
```

#### 组件中修改数据

```
this.$store.commit('addCount'，n)
```

##### 辅助函数 mapMutations

调用

```
this，subCount(n)
```

#### 调用action

```
this.$store.dispatch('setAsyncCount',200)
```

#### 访问getters

1. 通过store访问getters

   ```
   {{ $store.getters.filterList }}
   ```

2. 通过辅助函数mapGetters映射

   ```
   computed:{
   	...mapGetters(['filterList'])
   }
   ```

   ```
   {{ filterList }}
   ```

   

#### token验证

###### 后端

安装插件

```
npm i jsontoken -s
```

用于生成token
在nodes中创建文件夹config，在内部创建store.js

```
module.exports = {
	//密钥
	"key":"",
	//过期时间
	”outtime“：60*60*24   //一天过期
}
```

##### 引入token

```
let {key,outtime} = require('../../config/store')
let jwt = require('jsonwebtoken')
//sign({用户信息}，密钥，过期时间)
let token = jwt.sign(req.body,key,{expiresIn:outtime})
```

- //返回给前端

判断请求头是否携带token

安装插件

```
npm i express-jwt -s
```

###### 前端

//将token存入缓存

```
window.localStorage.setItem('token',data.data.token)
```



# VUE3

#### 使用webpack创建项目

方法1.vue create 项目名称
方法2.vue ui 
启动项目
npm run server

#### 使用vite创建项目

npm init vue@latest
启动项目
npm run dev



#### setup

setup函数在created之前进行调用
注意：
1.setup函数中不能使用this
2.setup不是生命周期
3.选项式API尽量不要和组合式API混用

#### ref() 

引入ref
import {ref} from 'vue'
定义响应式数据，需要通过value属性改变值
主要用于修改值类型响应式数据，也可以修改引用类型数据为响应式数据
修改值类型使用的但是vue2使用的数据双向绑定原理，object.defineproperty方法
修改引用类型，需要自动盗用reactive方法在修改幸运数据，reactive方法实现数据双向绑定的原理采用

# axios

方法一、

1.将axios挂在到全局对象上

2.在需要使用的vue组件中导入getCurrentInstance

``import {getCurrentInstance} from 'vue'``

3.调用

``getCurrentInstance().proxy.$axios``

getCurrentInstance().proxy相当于this

方法二、

```
import {getType} from "@/axios/api"
getType().then(*res*=>{
    
})
```

配置代理服务器

```
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



# pinia

特点：

1.兼容ts

2.核心更少

## 重置 state

你可以通过调用 store 的 `$reset()` 方法将 state 重置为初始值。

https://pinia.vuejs.org/zh/core-concepts/state.html#resetting-the-state

```
const store = useStore()

store.$reset()
```



## 持久化存储

### 1. 安装插件

```
yarn add pinia-plugin-persist
# 或者使用 npm
npm install pinia-plugin-persist
```

### 2. 引入插件

和引入 `pinia` 一样，在 `main.js` 中引入。

```
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPersist)

createApp(App).use(pinia).mount('#app')
```

### 3. 使用插件

将当前模块中的所有数据都进行持久化保存，默认保存在 `sessionStorage` 中， `key` 为模块 `id`

##### 选项式api中

```
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: null,
    age: null,
    sex: null,
    count:1
  }),
  actions: {
    increment: {
        this.count++
    }  
  },
  persist: {
    enabled: true // true 表示开启持久化保存
    strategies: [
      { storage: sessionStorage, paths: ['name'] }
    ],
  }
})
```

##### 组合式api中

```
export count useCounterStore = defineStore('counter',() => {
    const count = ref(0)
    function increment() {
        count.value++
    }
    return { count,increment }
}，{
	// 开启持久化
	persist:{
		key:"hm-counter", //修改本地存储的唯一标识
			paths:['count'] // 存储的时哪些数据
	}
})
```

在 Setup Store 中

ref() 就是 state 属性

computed() 就是 getters

function() 就是 actions

### Pinia持久化

1.安装插件 pinpa-plugin-persistedstate

```
npm i pinpa-plugin-persistedstate
```

2.在main.js使用

```
import persist from 'pinpa-plugin-persistedstate'

app.use(createPinia().use(persist))
```

3.store仓库中，persis : true 开启

# vue使用props

## 接收变量

defineProps函数

const info = defineProps(["info"])

接收函数

defineEmits函数

const emit = defineEmits(["addinfo"])
