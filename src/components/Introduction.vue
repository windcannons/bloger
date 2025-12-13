<!--Introduction-->
<template>
  <div
      class="bg-#ffffff h-888px flex items-center w-full overflow-hidden"
      :class="{'intro-anim': shouldAnimate, 'is-visible': isVisible}"
      ref="introWrap"
      :style="delayVars"
  >
    <div class="w-1240 mx-a overflow-hidden">
      <h1 class="text-50 bBorder w-205">
          <span
              v-for="(c, idx) in titleChars"
              :key="'t-'+idx"
              class="char-anim"
              :style="charDelay(idx, 0.028, delays.title)"
          >{{ c.ch }}</span>
      </h1>
      <div class="w-200 ml-2.5 bg-#f7eccb h-5 mt--12 mb-10"></div>
      <p class="text-18 tracking-1 mb-20">
          <span
              v-for="(c, idx) in descChars"
              :key="'d-'+idx"
              class="char-anim"
              :style="charDelay(idx, 0.02, delays.desc)"
          >{{ c.ch }}</span>
      </p>
      <h5 class="text-16 tracking-1 mb-18">
          <span
              v-for="(c, idx) in line3Chars"
              :key="'l3-'+idx"
              class="char-anim"
              :class="{'text-orange': c.highlight}"
              :style="charDelay(idx, 0.02, delays.line3)"
          >{{ c.ch }}</span>
      </h5>
      <p class="leading-30 text-16 tracking-.8 mb-10">
          <span
              v-for="(c, idx) in longDescChunks"
              :key="'ld-'+idx"
              class="char-anim chunk"
              :style="charDelay(idx, 0.05, delays.longDesc)"
          >{{ c.ch }}</span>
      </p>
      <p class="mb-16 text-18 text-shadow">
          <span
              v-for="(c, idx) in mottoChars"
              :key="'m-'+idx"
              class="char-anim"
              :style="charDelay(idx, 0.03, delays.motto)"
          >{{ c.ch }}</span>
      </p>
      <ul
          class="inpLists">
        <li>
          名称：<span>刘超</span>
        </li>
        <li>
          出生日期：<span>2001/03</span>
        </li>
        <li>
          名族：<span>汉族</span>
        </li>
        <li class="copy">
          手机：
          <span>
            <a href="tel:17581724627">17581724627</a>
          </span>
        </li>
        <li @click="copyText('lc2717741632')"
            class="cursor-pointer copy">
          微信：<span>lc2717741632</span>
        </li>
        <li @click="copyText('2717741632@qq.com')"
            class="cursor-pointer copy">
          邮箱：<span>2717741632@qq.com</span>
        </li>
        <li>
          籍贯：<span>四川南充</span>
        </li>
        <li>
          现居城市：<span>上海市嘉定区</span>
        </li>
      </ul>
      <ul
          class="icons">
        <li class="li">
          <img
              class="codeImg"
              src="@/assets/wx.jpg"
              alt="">
        </li>
        <li class="li">
          <img
              class="codeImg"
              src="@/assets/qq.jpg"
              alt="">
        </li>
        <li class="h-32 w-32 mr-10">
          <a href="https://github.com/windcannons?tab=repositories"
             target="_blank">
            <img
                class="w-full h-full"
                src="@/assets/github.png"
                alt="">
          </a>
        </li>
        <li class="h-32 w-32 mr-10 flex items-center">
          <a href="https://blog.csdn.net/congenct"
             target="_blank">
            <img
                class="h-28"
                src="@/assets/csdn.png"
                alt="">
          </a>
        </li>
        <li class="h-32 w-32 mr-10 flex items-center">
          <a href="https://www.npmjs.com/package/lchao-cli"
             target="_blank">
            <img
                class="h-28"
                src="@/assets/npm_.png"
                alt="">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script
    setup>

import {
  copyText
} from "@/utils/utils.js";
import {computed, onMounted, onBeforeUnmount, ref} from "vue";
import {useAnimationStore} from "@/stores/animation";

const animationStore = useAnimationStore()
const introWrap = ref(null)
const isVisible = ref(false)
const hasPlayed = ref(false)
const shouldAnimate = ref(true) // 控制是否应用动画类
const titleChars = ref([])
const descChars = ref([])
const line3Chars = ref([])
const longDescChunks = ref([])
const mottoChars = ref([])
const delays = {
  title: 0,
  desc: 0.7,
  line3: 1.4,
  longDesc: 2.1,
  motto: 3.2,
  list: 3.8,
  icons: 4.8
}

let observer = null

const createObserver = () => {
  if (!introWrap.value || typeof IntersectionObserver === 'undefined') {
    isVisible.value = true
    hasPlayed.value = true
    animationStore.setIntroAnimPlayed(true)
    return
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 动画开始的第一时间就保存状态为已播放
        if (!hasPlayed.value) {
          animationStore.setIntroAnimPlayed(true)
          hasPlayed.value = true
        }
        isVisible.value = true
        // 播放一次后断开观察，后续保持显示
        if (observer) {
          observer.disconnect()
          observer = null
        }
      } else if (!hasPlayed.value) {
        isVisible.value = false
      }
    })
  }, {
    threshold: 0.01,
    rootMargin: '0px 0px -15% 0px'
  })
  observer.observe(introWrap.value)
}

onMounted(() => {
  const makeCharList = (text, highlightRanges = []) => text.split('').map((ch, idx) => ({
    ch,
    highlight: highlightRanges.some(([s, e]) => idx >= s && idx <= e)
  }))

  const chunkText = (text, size = 8) => {
    const chunks = []
    for (let i = 0; i < text.length; i += size) {
      chunks.push(text.slice(i, i + size))
    }
    return chunks.map(ch => ({ch}))
  }

  titleChars.value = makeCharList('我的简介')
  descChars.value = makeCharList('我的基本信息和自我介绍')
  line3Chars.value = makeCharList('我是一名前端开发工程师目前居住在上海。', [
    [3, 10], // 前端开发工程师
    [13, 14] // 上海
  ])
  longDescChunks.value = chunkText('我熟练掌握vue2、vue3、nuxt3等技术进行网站小程序以及应用程序的开发。有多个官网、大屏、小程序、app开发上架维护经验。我能够熟练使用npm与git进行项目的管理，熟练运用Sass、Less、unocss等CSS预处理器进行精准的样式定制，熟练使用nuxt3进行网站开发并针对SEO从多个角度进行优化。进行npm发布包实现快速构建uniapp、vue3、nuxt3项目；接口请求代码的自动生成；指令绑定本地代码与线上仓库；一键切换npm镜像等操作；针对不同框架进行组件、方法的可复用性封装实现项目的快速开发。', 10)
  mottoChars.value = makeCharList('不断学习；不断提升！')

  // 检查 Pinia store 状态：true 表示已播放过（直接显示），false 表示需要执行动画
  if (animationStore.introAnimPlayed) {
    // 已播放过，直接显示，不创建 observer，不执行动画
    isVisible.value = true
    hasPlayed.value = true
    shouldAnimate.value = false // 不应用动画类，直接显示
  } else {
    // 未播放过，需要执行动画，初始状态保持隐藏，等待滚动到视口时播放动画
    isVisible.value = false
    hasPlayed.value = false
    shouldAnimate.value = true // 应用动画类
    createObserver()
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})

const charDelay = (idx, step = 0.02, base = 0) => ({
  animationDelay: `${base + idx * step}s`
})

const delayVars = computed(() => ({
  '--delay-list': `${delays.list}s`,
  '--delay-icons': `${delays.icons}s`
}))
</script>

<style
    scoped
    lang="less">
.inpLists {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  li {
    width: 48%;
    height: 52px;
    padding: 15px 0;
    border-bottom: 1px solid #eeeeee;
    font-size: 15px;
    font-weight: 800;
    display: flex;
    align-items: center;
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.6s ease, transform 0.7s cubic-bezier(0.17, 0.67, 0.35, 1.25);

    span {
      font-weight: 400;
      color: #828282;
      margin-left: 5px;

      a {
        color: #828282;

        &:hover {
          color: #828282;
        }
      }
    }

  }

  .copy:hover {
    color: orange;

    span {
      color: orange;
    }
  }
}

// 当没有 intro-anim 类时（已播放过），列表项直接显示
:not(.intro-anim) .inpLists li {
  opacity: 1;
  transform: translateX(0);
}

.intro-anim .inpLists li {
  opacity: 0;
  transform: translateX(90px);
}

.intro-anim .inpLists li:nth-child(odd) {
  transform: translateX(-90px);
}

.intro-anim.is-visible .inpLists li {
  opacity: 1;
  transform: translateX(0);
}

.intro-anim.is-visible .inpLists li:nth-child(1) {
  transition-delay: calc(var(--delay-list, 0s) + 0.06s);
}

.intro-anim.is-visible .inpLists li:nth-child(2) {
  transition-delay: calc(var(--delay-list, 0s) + 0.14s);
}

.intro-anim.is-visible .inpLists li:nth-child(3) {
  transition-delay: calc(var(--delay-list, 0s) + 0.22s);
}

.intro-anim.is-visible .inpLists li:nth-child(4) {
  transition-delay: calc(var(--delay-list, 0s) + 0.3s);
}

.intro-anim.is-visible .inpLists li:nth-child(5) {
  transition-delay: calc(var(--delay-list, 0s) + 0.38s);
}

.intro-anim.is-visible .inpLists li:nth-child(6) {
  transition-delay: calc(var(--delay-list, 0s) + 0.46s);
}

.intro-anim.is-visible .inpLists li:nth-child(7) {
  transition-delay: calc(var(--delay-list, 0s) + 0.54s);
}

.intro-anim.is-visible .inpLists li:nth-child(8) {
  transition-delay: calc(var(--delay-list, 0s) + 0.62s);
}

.icons {
  height: 32px;
  margin-top: 20px;
  z-index: 999;
  display: flex;

  li {
    width: 32px;
    height: 32px;
    float: left;
    margin-right: 10px;
    position: relative;
    cursor: pointer;
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s ease, transform 0.65s cubic-bezier(0.17, 0.67, 0.35, 1.25);

    .codeImg {
      width: 88px;
      height: 88px;
      position: absolute;
      top: 120%;
      left: -5px;
      transition: .3s;
      opacity: 0;
    }

    a {
      img {
        height: 32px;
        opacity: 1;
        object-fit: contain;
      }
    }

    &:hover img {
      opacity: 1;
    }

    &:nth-child(1) {
      background: url("https://f.goodq.top/FeiEditor/images/icon/social_icon_32x32.png") no-repeat;
      background-position: -64px -32px;
    }

    &:nth-child(2) {
      background: url("https://f.goodq.top/FeiEditor/images/icon/social_icon_32x32.png") no-repeat;
      background-position: 0 -32px;
    }
  }

}

// 当没有 intro-anim 类时（已播放过），图标直接显示
:not(.intro-anim) .icons li {
  opacity: 1;
  transform: translateY(0);
}

.intro-anim .icons li {
  opacity: 0;
  transform: translateY(80px);
}

.intro-anim.is-visible .icons li {
  opacity: 1;
  transform: translateY(0);
}

.intro-anim.is-visible .icons li:nth-child(1) {
  transition-delay: calc(var(--delay-icons, 0s) + 0.12s);
}

.intro-anim.is-visible .icons li:nth-child(2) {
  transition-delay: calc(var(--delay-icons, 0s) + 0.22s);
}

.intro-anim.is-visible .icons li:nth-child(3) {
  transition-delay: calc(var(--delay-icons, 0s) + 0.32s);
}

.intro-anim.is-visible .icons li:nth-child(4) {
  transition-delay: calc(var(--delay-icons, 0s) + 0.42s);
}

.intro-anim.is-visible .icons li:nth-child(5) {
  transition-delay: calc(var(--delay-icons, 0s) + 0.52s);
}

// 当没有 intro-anim 类时（已播放过），文字直接显示
:not(.intro-anim) .char-anim {
  opacity: 1;
  transform: translateY(0);
  animation: none;
}

.char-anim {
  display: inline-block;
  opacity: 0;
  transform: translateY(14px);
}

.char-anim.chunk {
  margin-right: 2px;
}

// 确保 intro-anim 下的文字在动画开始前保持隐藏
.intro-anim .char-anim {
  opacity: 0;
  transform: translateY(14px);
}

.intro-anim.is-visible .char-anim {
  animation: popText 0.55s cubic-bezier(0.2, 0.7, 0.35, 1.4) forwards;
}

@keyframes popText {
  0% {
    opacity: 0;
    transform: translateY(14px);
  }
  60% {
    opacity: 1;
    transform: translateY(-4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
