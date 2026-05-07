<template>
  <div class="h-[calc(100vh-64px)] bg-#f5f5f5">
    <el-scrollbar class="h-full pt-64">
      <div class="w-1440 mx-a pt-20 pb-60">
        <h1 class="text-36 font-bold text-gray-800 mb-50 text-center">{{ currentTitle }}</h1>
        <ul>
          <li
              v-for="(project, index) in currentProjects"
              :key="project.name"
              :class="['flex items-center justify-between', projectType === 'software' ? 'h-auto py-15' : 'h-500', projectType === 'software' ? 'mb-40' : 'mb-80']">
            <div v-if="projectType !== 'software'" class="h-full overflow-hidden w-45%" v-scroll>
              <img class="w-full" :src="project.image" :alt="project.name">
            </div>
            <div :class="projectType === 'software' ? 'flex-1 w-full flex items-center justify-between p-40 rounded-16 bg-white shadow-lg' : 'flex-1 pl-5%'">
              <div class="flex-1">
                <h2 class="mb-10 text-30 tracking-1">{{ project.name }}</h2>
                <p v-if="project.description" class="mb-10 text-gray-600">{{ project.description }}</p>
                <p v-if="project.features && project.features.length > 0" class="mb-10">
                  <span class="font-800">功能特点：</span>
                  <br>
                  <span v-for="(feature, idx) in project.features" :key="idx">{{ idx + 1 }}、{{ feature }}<br></span>
                </p>
                <p v-if="project.links" class="mb-10 flex">
                  <span class="font-800">链接：</span>
                  <p>
                    <template v-for="(item, idx) in project.links" :key="idx">
                      <span class="text12 font-800">{{ item.label }}：</span>
                      <a class="text-sky" :href="item.url" target="_blank">{{ item.url }}</a>
                      <br v-if="idx < project.links.length - 1">
                    </template>
                  </p>
                </p>
                <p class="mb-10">
                  <span class="font-800">技术栈：</span>
                  {{ project.tech }}
                </p>
                <p v-if="project.duties && project.duties.length > 0" class="mb-10">
                  <span class="font-800">支持格式/说明：</span>
                  <br>
                  <span v-for="(duty, idx) in project.duties" :key="idx">{{ idx + 1 }}、{{ duty }}<br></span>
                </p>
              </div>
              <div v-if="project.link && projectType === 'software'" class="ml-30 flex-shrink-0">
                <el-button
                  type="primary"
                  size="large"
                  @click="downloadFile(project.link)"
                  class="download-btn">
                  <span class="iconfont icon-xiazai mr-5"></span>
                  立即下载
                </el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const projectType = ref(route.params.projectType || 'work');

const downloadFile = (url) => {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.download = url.split('/').pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const projectData = {
  work: {
    title: '工作项目',
    projects: [
      {
        name: '双立人官网',
        image: '/src/assets/object/slr.webp',
        link: 'https://www.zwilling.com.cn',
        tech: 'Vue2、Nuxt、Ant Design Vue、Swiper',
        duties: [
          '负责项目的前端开发，需求分析，提出解决方案',
          '实现页面响应式，确保其在不同设备下正常交互',
          '重构项目框架，减轻项目体积提高项目运行时响应速度',
          '与后端开发人员合作，制定接口规范和数据格式，对接后端接口，并进行跨域问题的解决',
          '优化双立人字体包，修改字体包加载方式，显著提升页面首次加载速度',
          '对项目的整合与打包，并与阿里云存储筒进行对接'
        ]
      },
      {
        name: '催化数据库官网',
        image: '/src/assets/object/HetCataX.webp',
        tech: 'vue3、vite、element Plus、CryptoJS、echarts',
        duties: [
          '深度理解项目制定开发框架与实现方式',
          '搭建项目框架，完成路由的配置，根据masterGo实现页面绘制',
          '对表单的交互效果进行编写，实现类型时表单内容变化',
          '根据后端需求调试接口并完成登录的加密',
          '测试项目根据客户提出的问题进行优化与修改'
        ]
      },
      {
        name: '手办官网',
        image: '/src/assets/object/shouban.webp',
        link: 'https://www.likefigure.com',
        tech: 'vue3、vite、uview Plus',
        duties: [
          '负责项目搭建与页面绘制',
          '添加操作动画反馈让项目更精致',
          '配置谷歌登录并与解决登录后准确回到未登录时访问的页面',
          '配置后台单/多图片上传自动增加水印与图片比例判断',
          '配置商品分享到Facebook、Twitter、微信',
          '配置页面布局实现大/小屏幕电脑完美展示'
        ]
      },
      {
        name: '拔俗官网',
        image: '/src/assets/object/ybbe.webp',
        link: 'https://www.eilve.com',
        tech: 'nuxt2、Ant Design、swiper、cheerio',
        duties: [
          '搭建项目并优化编译后项目结构，绘制响应式页面',
          '针对图片、链接等标签进行有利于seo写法',
          '进行接口服务端查询实现内容可被抓取',
          '配置robots.txt以及站点地图并进行上线测试',
          '登录百度站长进行提交站点地图并不断维护网站'
        ]
      },
      {
        name: '园景人小程序',
        image: '/src/assets/object/yjr.webp',
        tech: 'Uni-app、vue3、vite、uview Plus',
        duties: [
          '负责项目技术选型与搭建，理解需求，工作内容的分配',
          '对接支付与分享门票，同时处理分享后的操作',
          '对项目进行多端适配，让项目在各种手机排版正常显示',
          '添加各种操作动画，让项目操作更丝滑',
          '封装统一跳转与触底加载、文字溢出省略、防抖节流等方法，实现代码简洁开发高效',
          '检验项目并提交上线'
        ]
      },
      {
        name: '瑜伽垫小程序',
        image: '/src/assets/object/yjd.webp',
        tech: 'Uni-app、vue3、vite、uview Plus',
        duties: [
          '负责项目搭建、页面绘制与接口对接',
          '对接微信支付绑定地址配置购物流程',
          '针对多个列表请求数据进行可复用式封装实现代码简洁便于维护',
          '配置uniad进行广告绑定',
          '检验项目流程与逻辑并交付'
        ]
      },
      {
        name: '波益大屏',
        image: '/src/assets/object/by.webp',
        tech: 'vue3、element plus、rem、echarts、canvas、websocket',
        duties: [
          '负责项目前端开发和界面设计',
          '针对大屏显示比例进行优化',
          '实现WebSocket实时数据通信功能,实现数据可视化和图表展示功能',
          '设计并开发基于Canvas的图形展示',
          '线下调试并交付生产'
        ]
      },
      {
        name: '四方支付平台',
        image: '/src/assets/object/sf.webp',
        links: [
          {label: '管理端', url: 'https://payadmin.wwux.cn'},
          {label: '商户端', url: 'https://paymer.wwux.cn'}
        ],
        tech: 'vue3、element plus、Echarts、Canvas',
        duties: [
          '负责项目的搭建与页面设计与开发',
          '梳理项目逻辑与接口逻辑，确保项目的进行与落地',
          '针对支付进行RSA进行加密，针对登录进行md5加密',
          '对于用户的路由权限和按钮权限进行绑定与设置',
          '进行商户入驻、支付、账单、权限等流程的测试并交付'
        ]
      },
      {
        name: '德邦大客户发件系统',
        image: '/src/assets/object/deppon.webp',
        link: 'https://vip.deppon.com/vas-cas-web/main/index.html#/login',
        tech: 'vue2、element-ui',
        duties: [
          '参与需求分析会议并不断与产品经理确认需求点',
          '负责首页的重做、下单增加轿车下单、增加打印面单等功能需求优化点的制作',
          '进行代码的审查确保每行代码的准确高效无误'
        ]
      }
    ]
  },
  entertainment: {
    title: '娱乐项目',
    projects: [
      {
        name: '旅行地图',
        image: '/src/assets/object/travelMap.webp',
        link: 'http://47.116.190.6:3004/',
        tech: 'Vue3、Leaflet、OpenStreetMap',
        duties: [
          '开发交互式旅行地图应用',
          '支持标记旅行地点和路线规划',
          '记录旅行日记和照片分享'
        ]
      },
      {
        name: '家庭菜谱',
        image: '/src/assets/object/myMenu.webp',
        link: 'http://47.116.190.6:3002/',
        tech: 'Vue3、Element Plus、Firebase',
        duties: [
          '开发家庭菜谱管理系统',
          '支持菜谱分类和搜索',
          '分享烹饪心得和技巧'
        ]
      }
    ]
  },
  software: {
    title: '我的软件',
    projects: [
      {
        name: '图片转WebP工具',
        image: '@/assets/object/deppon.webp',
        link: 'http://47.116.190.6:11888/down/2OTD48eKbTqz.exe',
        tech: 'Python',
        description: '一个基于Python的图片格式转换工具，支持将JPG、PNG、BMP、GIF等格式转换为WebP格式。',
        features: [
          '批量/单独转换：支持文件夹和单张图片转换',
          '质量调节：支持10-100的质量调节范围',
          'GIF优化：保留动图格式并压缩',
          '保持目录结构：批量转换时保持原有结构'
        ],
        duties: [
          '输入格式：JPG、JPEG、PNG、BMP、GIF',
          '输出格式：WebP（GIF文件保持GIF格式并优化）'
        ]
      },
      {
        name: '浏览器插件',
        image: '@/assets/object/HetCataX.webp',
        link: 'http://47.116.190.6:11888/down/Jw795XH5wY5c.zip',
        tech: 'JavaScript、Chrome Extension',
        description: '一个功能丰富的浏览器插件，支持Cookie复制、销售数据查询、通知单统计等多种功能。',
        features: [
          'Cookie复制：一键复制当前页面的Cookie（支持字符串格式和JSON格式）',
          '销售数据查询：自动获取唯品会销售数据，生成信息总结',
          '通知单统计：自动统计webopm页面的通知单数量',
          '密码自动生成：基于AES加密算法自动生成月度密码',
          '主题切换：支持随机切换页面主题颜色',
          '账号密码显示：在特定域名下自动显示账号密码信息',
          '自动检测域名：根据当前访问的域名自动切换功能模式'
        ],
        duties: []
      },
      {
        name: '表格自动化程序',
        image: '@/assets/object/shouban.webp',
        link: 'http://47.116.190.6:11888/down/SWWzRToM9W01.exe',
        tech: 'Python、Tkinter',
        description: '自动生成配饰表格 & ERP明细工具，基于Python + Tkinter的桌面程序。',
        features: [
          'OMS订单解析：解析网页/表格，抽取配饰相关数据',
          'SKU→熊吊牌匹配：根据本地映射表自动匹配熊吊牌',
          '生成配饰Excel表格：按唯品会配饰要求生成标准表格',
          'ERP侧操作自动化：调用archivesAdd创建ERP单据，并通过DJMxEdit接口自动新增明细'
        ],
        duties: [
          '适合配饰业务的日常批量处理'
        ]
      },
      {
        name: '2048游戏',
        image: '@/assets/object/deppon.webp',
        link: 'http://47.116.190.6:11888/down/GVufpp8UispW.exe',
        tech: 'C#、WinForms',
        description: '经典的2048数字合并游戏',
        features: ['数字合并玩法', '分数记录', '简洁界面'],
        duties: []
      },
      {
        name: 'fireworks.exe',
        image: '@/assets/object/HetCataX.webp',
        link: 'http://47.116.190.6:11888/down/d0jf3Eke7LaQ.exe',
        tech: 'Python、Pygame',
        description: '烟花特效程序，绚丽的烟花绽放效果',
        features: ['绚丽烟花效果', '多种颜色', '鼠标交互'],
        duties: []
      },
      {
        name: 'LovePopup.exe',
        image: '@/assets/object/shouban.webp',
        link: 'http://47.116.190.6:11888/down/mAEHyoyCgrQb.exe',
        tech: 'C#、WinForms',
        description: '爱情回答弹窗，浪漫的表白工具',
        features: ['随机情话', '精美弹窗', '背景音乐'],
        duties: []
      },
      {
        name: 'restOfMyLife.exe',
        image: '@/assets/object/deppon.webp',
        link: 'http://47.116.190.6:11888/down/3cES5JIAIZeS.exe',
        tech: 'Python、Tkinter',
        description: '余生主题小程序',
        features: ['倒计时功能', '备忘录', '精美界面'],
        duties: []
      },
      {
        name: 'warm.exe',
        image: '@/assets/object/HetCataX.webp',
        link: 'http://47.116.190.6:11888/down/Du1D1ersRLbz.exe',
        tech: 'C#、WPF',
        description: '超级温馨问候弹窗',
        features: ['温馨祝福语', '动画效果', '定时提醒'],
        duties: []
      },
      {
        name: '小月壁纸.exe',
        image: '@/assets/object/shouban.webp',
        link: 'http://47.116.190.6:11888/down/r61wzrp5NdIE.exe',
        tech: 'Python、PyQt5',
        description: '小月壁纸程序，一键更换精美壁纸',
        features: ['壁纸下载', '自动切换', '多分辨率支持'],
        duties: []
      }
    ]
  }
};

const currentTitle = computed(() => projectData[projectType.value]?.title || '工作项目');
const currentProjects = computed(() => projectData[projectType.value]?.projects || []);
</script>

<style scoped lang="less">
ul {
  li {
    &:nth-child(2n) {
      flex-direction: row-reverse;
    }

    p, div {
      font-size: 20px;
    }

    li>div:first-child {
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .download-btn {
      padding: 12px 40px;
      font-size: 18px;
      font-weight: 600;
      border-radius: 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
}
</style>
