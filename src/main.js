// 样式文件引入
import './assets/main.less'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import 'virtual:uno.css'

// 第三方库引入
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import 'amfe-flexible'
import VueFullPage from 'vue-fullpage.js'
import 'vue-fullpage.js/dist/style.css'

// 插件和工具函数引入
import piniaPluginPersist from 'pinia-plugin-persist'
import isPhone from './utils/isPhone'
import vScroll from './utils/vScroll.js';
import './plugins/setRem'

// 引入v-md-editor组件
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// 路由配置引入
import router from './router'

// 主组件引入
import App from './App.vue'

// 插件初始化与应用
const pinia = createPinia()
pinia.use(piniaPluginPersist)

const app = createApp(App)

// 注册 Element Plus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
VMdPreview.use(vuepressTheme);

// 使用 Element Plus 和中文语言包
app.use(ElementPlus, { locale: zhCn })

// 使用 Pinia 状态管理
app.use(pinia)

app.use(VMdPreview)

// 使用 Vue Router 路由
app.use(router)

// 使用全屏滚动插件
app.use(VueFullPage)

// 全局注册自定义指令
app.directive('isPhone', isPhone)
app.directive('scroll', vScroll);

// 挂载应用
app.mount('#app')
