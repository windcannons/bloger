<template>
    <el-scrollbar
            @scroll="scrollFn"
            :height="`${windowHeight - 65}px`">
        <div class="h-[calc(100vh-64px)] relative overflow-hidden bg-black">
            <MyCanvas></MyCanvas>
            <div class="w-full h-full flex flex-col items-center justify-center relative z-99">
                <img
                        src="@/assets/header.png"
                        class="w-220 h-220 rounded-full mb-20"
                        alt="">
                <h1 class="text-white mb-15 font-800 text-35 tracking-10">
                    刘超
                </h1>
                <p class="text-white tracking-1 text-16 h-24">
                    {{
                    userinfo
                    }}
                </p>
            </div>
            <div v-show="!isDown" class="scroll-prompt absolute bottom-50 w-full text-center z-99999">
                <img
                        class="scroll-icon w-28"
                        src="@/assets/down.png"
                        alt="">
            </div>
        </div>
        <Introduction></Introduction>
        <BeGoodAt></BeGoodAt>
    </el-scrollbar>
</template>

<script
    setup>
import MyCanvas
    from "@/components/MyCanvas.vue";
import {
    onMounted,
    ref
} from "vue";
import Introduction
    from "@/components/Introduction.vue";
import BeGoodAt
    from "@/components/BeGoodAt.vue";
import {
    useWindowSize
} from '@vueuse/core';

const userinfo = ref('')
const num = ref(0)
const {height: windowHeight} = useWindowSize();
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

const isDown = ref(false)
const scrollFn = (e) => {
    isDown.value = e.scrollTop !== 0
}
</script>

<style
    scoped
    lang="less">
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
