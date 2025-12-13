<template>
  <full-page ref="fullpage" :options="options" id="fullpage">
    <!-- 第一屏 -->
    <div class="section">
        <div class="h-full w-full relative overflow-hidden bg-black">
          <MyCanvas></MyCanvas>
          <div class="w-full h-full flex flex-col items-center justify-center relative z-99">
            <img
                src="@/assets/me.webp"
                class="w-240 h-240 rounded-full mb-20"
                alt="">
            <h1 class="text-white mb-15 font-800 text-35 tracking-10">
              刘超
            </h1>
            <p class="text-white tracking-1 text-16 h-24">
              {{ userinfo }}
            </p>
          </div>
          <div class="scroll-prompt absolute bottom-50 w-full text-center z-99999">
            <img
                class="scroll-icon w-28"
                src="@/assets/down.png"
                alt="">
          </div>
      </div>
    </div>

    <!-- 第二屏 -->
    <div class="section">
       <Introduction></Introduction>
    </div>

    <!-- 第三屏 -->
    <div class="section">
        <BeGoodAt></BeGoodAt>
    </div>
  </full-page>

</template>

<script
    setup>
import MyCanvas
  from "@/components/MyCanvas.vue";
import {
  nextTick,
  onMounted,
  ref
} from "vue";
import Introduction
  from "@/components/Introduction.vue";
import BeGoodAt
  from "@/components/BeGoodAt.vue";

const fullpage = ref(null)

// 配置选项 - 支持所有 FullPage.js 选项
const options = ref({
  // 基础配置
  navigation: true,           // 显示导航点
  navigationPosition: 'right', // 导航点位置
  navigationColor: '#ff5f45',
  scrollingSpeed: 500,       // 滚动速度（毫秒）
  easingcss3: 'ease-in-out',  // CSS3 缓动函数

  // 控制选项
  keyboardScrolling: true,    // 键盘控制
  touchSensitivity: 5,        // 触摸灵敏度
  autoScrolling: true,        // 自动滚动
  fitToSection: true,         // 适配屏幕

  // 回调函数
  afterLoad: (origin, destination) => {
    console.log('切换到屏幕:', destination.index + 1)
  },
  onLeave: (origin, destination) => {
    console.log('离开屏幕:', origin.index + 1, '前往:', destination.index + 1)
  }
})

const userinfo = ref('')
const num = ref(0)
onMounted(() => {
  let userText = " 一个勤勤恳恳、认真负责的前端开发工程师，目前居住在上海。",
      moveTime = setInterval(() => {
        userinfo.value += userText[num.value]
        num.value++
        if (num.value === userText.length) {
          clearInterval(moveTime)
        }
      }, 100)
})
</script>

<style
    scoped
    lang="less">
:deep(.fp-overflow) {
  height: 100%;
}

.screen {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}


.scroll-prompt {
  animation: bounce 3s ease-in-out infinite, fadeInOut 1.5s ease-in-out infinite;
}

.scroll-icon {
  animation: bounce 3s ease-in-out infinite, fadeInOut 1.5s ease-in-out infinite;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(18px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes fadeInOut {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

</style>
