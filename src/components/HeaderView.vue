<template>
  <div class="h-64 bg-black shadow-[0px_8px_24px_rgba(149,_157,_165,_0.15)] fixed top-0 left-0 w-full z-99">
    <div class="flex items-center justify-between w-1280 mx-a max-lg:w-full h-64 max-lg:px-50">
      <div class="flex items-center cursor-pointer"
           @click="copyText('lc2717741632')">
        <h1
            class="myName">
          Liu
          Chao
        </h1>
      </div>
      <div class="flex items-center">
        <RouterLink
            class="text-white text-18 mr-32 flex-shrink-0"
            to="/">
          自我介绍
        </RouterLink>
        <RouterLink
            :class="{ 'router-link-active': isDocsActive }"
            class="text-white text-18 mr-32 flex-shrink-0"
            to="/docs">
          我的文档
        </RouterLink>
        <RouterLink
            :class="{ 'router-link-active': isProjectActive }"
            class="text-white text-18 mr-32 flex-shrink-0"
            to="/myProject">
          开发项目
        </RouterLink>
        <!--<RouterLink-->
        <!--    class="text-white text-18 mr-32 flex-shrink-0"-->
        <!--    to="/">-->
        <!--    我的工作-->
        <!--</RouterLink>-->
        <!--<RouterLink-->
        <!--    class="text-white text-18 mr-32 flex-shrink-0"-->
        <!--    :to="`/resume`">-->
        <!--    我的简历-->
        <!--</RouterLink>-->
        <a href="/web前端 刘超 17581724627.pdf"
           target="_blank"
           class="text-white text-18 mr-32 flex-shrink-0">
          我的简历
        </a>
      </div>
    </div>
  </div>
</template>

<script
    setup>
import {
  computed,
  onMounted
} from "vue";
import bus
  from "../bus";
import {
  copyText,
} from "@/utils/utils.js";
import {
  useRoute
} from "vue-router";

onMounted(() => {
  // 接收全局事件总线
  bus.on('msg', (val) => {
    console.log('val', val);
  })
})
const route = useRoute()

const isDocsActive = computed(() => route.path.includes('/docs'))
const isProjectActive = computed(() => route.path.includes('/myProject'))


</script>

<style
    scoped
    lang="less">
.myName {
  font-size: 33px;
  font-family: f5f487082c474e4472d76201c069f2098, serif;
  color: #999;
  position: relative;

  &:after {
    content: "Liu Chao";
    position: absolute;
    top: 0;
    left: 0;
    color: transparent;
    clip-path: ellipse(15px 15px at 0% center);
    animation: spotligth 6s infinite;
    background-image: url("https://picnew13.photophoto.cn/20181230/xuanliduocailiutijianbianhaibaobeijing-32421215_1.jpg");
    background-size: 100%;
    background-position: center center;
    background-clip: text;
    -webkit-background-clip: text;
  }

  @keyframes spotligth {
    0% {
      clip-path: ellipse(15px 15px at 0% center);
    }
    50% {
      clip-path: ellipse(15px 15px at 100% center);
    }
    100% {
      clip-path: ellipse(15px 15px at 0% center);
    }
  }
}

a:hover {
  color: #f6cc52;
}

.router-link-active {
  color: #febd01 !important;
}
</style>
