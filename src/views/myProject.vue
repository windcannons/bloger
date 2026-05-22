<template>
  <div class="h-[calc(100vh-64px)] bg-#f5f5f5 overflow-x-hidden overflow-y-auto" id="project-scroll-container">
    <div class="w-1440 max-w-[100%] mx-auto px-20 pt-20 pb-60">
      <h1 class="text-36 font-bold text-gray-800 mb-50 text-center">{{ currentTitle }}</h1>
      <ul>
        <li
            v-for="(project, index) in currentProjects"
            :key="project.name"
            :ref="(el) => setProjectRef(el, index)"
            class="flex items-center justify-between gap-5% h-500 mb-80">
          <div class="project-image h-full overflow-hidden w-45%">
            <img class="w-full min-h-100% object-cover" :src="project.image" :alt="project.name">
          </div>
          <div class="project-content flex-1">
            <div class="flex-1">
              <h2 class="mb-10 text-30 tracking-1">{{ project.name }}</h2>
              <p v-if="project.links" class="mb-10 flex">
                <span class="font-800">链接：</span>
                <span>
                  <template v-for="(item, idx) in project.links" :key="idx">
                    <span class="text12 font-800">{{ item.label }}：</span>
                    <a class="text-sky" :href="item.url" target="_blank">{{ item.url }}</a>
                    <br v-if="idx < project.links.length - 1">
                  </template>
                </span>
              </p>
              <p v-if="project.link" class="mb-10">
                <span class="font-800">链接：</span>
                <a class="text-sky" :href="project.link" target="_blank">{{ project.link }}</a>
              </p>
              <p v-if="project.duties && project.duties.length > 0" class="mb-10">
                <span class="font-800">项目职责：</span>
                <br>
                <span v-for="(duty, idx) in project.duties" :key="idx">{{ idx + 1 }}、{{ duty }}<br></span>
              </p>
              <p class="mb-10">
                <span class="font-800">技术栈：</span>
                {{ project.tech }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, onMounted, onUnmounted} from 'vue';
import {useRoute} from 'vue-router';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import slr from '@/assets/object/slr.webp';
import hetCataX from '@/assets/object/HetCataX.webp';
import shouban from '@/assets/object/shouban.webp';
import deppon from '@/assets/object/deppon.webp';
import hg from '@/assets/object/hg.webp';
import travelMap from '@/assets/object/travelMap.webp';
import myMenu from '@/assets/object/myMenu.webp';
import ybbe from '@/assets/object/ybbe.webp';
import yjr from '@/assets/object/yjr.webp';
import yjd from '@/assets/object/yjd.webp';
import by from '@/assets/object/by.webp';
import sf from '@/assets/object/sf.webp';

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const projectType = ref(route.params.projectType || 'work');
const projectRefs = ref([]);
const scrollTriggers = ref([]);

const projectData = {
  work: {
    title: '工作项目',
    projects: [
      {
        name: '黑格科技官网',
        image: hg,
        link: 'https://www.heygears.com',
        tech: 'nuxt2、Tailwindcss、gsap',
        duties: [
          '根据ui图对网站的样式绘制、中英文的配置并使用gsap实现动画效果',
          '主要针对首页与一级菜单页面进行性能与seo的优化',
          '针对各个页面的pad端的展示效果进行优化兼容'
        ]
      },
      {
        name: '德邦大客户发件系统',
        image: deppon,
        link: 'https://vip.deppon.com/vas-cas-web/main/index.html',
        tech: 'vue2、element-ui',
        duties: [
          '参与需求分析会议并不断与产品经理确认需求点',
          '负责首页的重做、下单增加轿车下单、增加打印面单等功能需求优化点的制作',
          '进行代码的审查确保每行代码的准确高效无误'
        ]
      },
      {
        name: '四方支付平台',
        image: sf,
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
        name: '波益大屏',
        image: by,
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
        name: '瑜伽垫小程序',
        image: yjd,
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
        name: '园景人小程序',
        image: yjr,
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
        name: '拔俗官网',
        image: ybbe,
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
        name: '手办官网',
        image: shouban,
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
        name: '催化数据库官网',
        image: hetCataX,
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
        name: '双立人官网',
        image: slr,
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
      }
    ]
  },
  entertainment: {
    title: '娱乐项目',
    projects: [
      {
        name: '旅行地图',
        image: travelMap,
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
        image: myMenu,
        link: 'http://47.116.190.6:3002/',
        tech: 'Vue3、Element Plus、Firebase',
        duties: [
          '开发家庭菜谱管理系统',
          '支持菜谱分类和搜索',
          '分享烹饪心得和技巧'
        ]
      }
    ]
  }
};

const currentTitle = computed(() => projectData[projectType.value]?.title || '工作项目');
const currentProjects = computed(() => projectData[projectType.value]?.projects || []);

const setProjectRef = (el, index) => {
  if (el) {
    projectRefs.value[index] = el;
  }
};

onMounted(() => {
  const scrollContainer = document.getElementById('project-scroll-container');
  
  projectRefs.value.forEach((el, index) => {
    if (!el) return;
    
    const imageEl = el.querySelector('.project-image');
    const contentEl = el.querySelector('.project-content');
    const isReversed = (index + 1) % 2 === 0;
    
    gsap.set(imageEl, {
      x: isReversed ? '100%' : '-100%',
      opacity: 0
    });
    gsap.set(contentEl, {
      x: isReversed ? '-100%' : '100%',
      opacity: 0
    });
    
    const trigger = ScrollTrigger.create({
      trigger: el,
      scroller: scrollContainer,
      start: 'top 80%',
      toggleActions: 'play none none none',
      onEnter: () => {
        gsap.to(imageEl, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out'
        });
        gsap.to(contentEl, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.15,
          ease: 'power3.out'
        });
      }
    });
    
    scrollTriggers.value.push(trigger);
  });
});

onUnmounted(() => {
  scrollTriggers.value.forEach(trigger => {
    trigger.kill();
  });
  gsap.killTweensOf('*');
});
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
  }
}

.project-image,
.project-content {
  will-change: transform, opacity;
  position: relative;
}
</style>
