<template>
  <div class="ability-page" ref="abilityWrap">
    <div :class="['ability-card', cardStateClass]">
      <div class="badge-row">
        <span class="badge primary">Full-stack Frontend</span>
        <span class="badge secondary">效率 · 体验 · 质量</span>
      </div>
      <div class="heading">
        <h2>专业能力</h2>
        <p class="subtitle">覆盖 Web / 移动 / 工具链 / 协作全链路，注重落地与体验</p>
      </div>
      <div class="ability-grid">
        <div
            v-for="(item, idx) in abilities"
            :key="item"
            :class="['ability-item', itemStateClass]"
            :style="firstAnimationActive ? { animationDelay: `${idx * 120}ms` } : undefined">
          <span class="bullet"></span>
          <p class="desc">{{ item }}</p>
          <span class="hover-glow"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onBeforeUnmount} from "vue";

const abilityWrap = ref(null)
const isVisible = ref(false)
const hasPlayed = ref(false)
const firstAnimationActive = ref(false)
let observer = null
let finishTimer = null

const createObserver = () => {
  if (!abilityWrap.value || typeof IntersectionObserver === 'undefined') {
    isVisible.value = true
    hasPlayed.value = true
    return
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!hasPlayed.value) {
          firstAnimationActive.value = true
          if (finishTimer) {
            clearTimeout(finishTimer)
          }
          finishTimer = setTimeout(() => {
            hasPlayed.value = true
            firstAnimationActive.value = false
          }, 1600)
        }
        isVisible.value = true
        if (observer) {
          observer.disconnect()
          observer = null
        }
      } else if (!hasPlayed.value) {
        isVisible.value = false
      }
    })
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -12% 0px'
  })

  observer.observe(abilityWrap.value)
}

onMounted(() => {
  createObserver()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (finishTimer) {
    clearTimeout(finishTimer)
    finishTimer = null
  }
})

const cardStateClass = computed(() => {
  if (hasPlayed.value) return 'card-visible'
  return isVisible.value ? 'card-in' : 'card-out'
})

const itemStateClass = computed(() => {
  if (hasPlayed.value) return 'stagger-visible'
  return isVisible.value ? 'stagger-in' : 'stagger-out'
})

const abilities = [
  '深入理解 HTML5/CSS3，多种布局实战，高保真还原设计稿',
  '精通 JS / TS，强调封装与可维护性，代码高效稳健',
  '熟练 Vue2 / Vue3，自定义指令经验丰富',
  '熟练 Nuxt3，多维度 SEO 优化落地',
  '熟悉微信小程序与 uniapp，上架流程与 uniad 广告对接',
  '精通 Less / Sass / Unocss，响应式布局经验丰富',
  '熟练 Git 分支管理、冲突解决与团队协作',
  '熟练蓝湖、MasterGo 等设计协作工具，高效落地界面',
  '善用 GPT 等 AI 工具，提升开发效率与问题解决力',
  '掌握 npm 指令编写与发包，脚手架与 API 生成实践'
];
</script>

<style scoped lang="less">
@bg-start: #f2f5ff;
@bg-mid: #e5ebff;
@bg-end: #d9e2ff;
@card-shadow: 0 36px 96px rgba(26, 46, 90, 0.18);
@item-shadow: 0 20px 46px rgba(22, 38, 78, 0.12);
@grad-primary: linear-gradient(90deg, #5f8bff, #73b2ff, #86e7ff);
@grad-bullet: linear-gradient(135deg, #ff7a7a, #ff9f68, #ffd266);

.ability-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 40px;
  box-sizing: border-box;
  background: radial-gradient(200% 200% at 50% 12%, @bg-start 0%, @bg-mid 45%, @bg-end 100%);
}

.ability-card {
  width: 100%;
  max-width: 1380px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 26px;
  padding: 48px 60px 52px;
  backdrop-filter: blur(14px);
  box-shadow: @card-shadow;
  transition: all 0.7s ease-out;
}

.badge-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;

  .badge {
    padding: 10px 16px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    line-height: 1;
  }

  .primary {
    color: #fff;
    background: @grad-primary;
    box-shadow: 0 16px 32px rgba(90, 150, 255, 0.35);
  }

  .secondary {
    color: #1f2d4a;
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.7);
  }
}

.heading {
  text-align: center;
  margin-bottom: 40px;

  h2 {
    margin: 0 0 10px;
    font-size: 44px;
    font-weight: 800;
    color: #111827;
    letter-spacing: 0.6px;
  }

  .subtitle {
    margin: 0;
    color: #4b556a;
    font-size: 15px;
  }
}

.ability-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(540px, 1fr));
  gap: 26px;
}

.ability-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 24px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(118, 140, 200, 0.14);
  box-shadow: @item-shadow;
  overflow: hidden;
  transition: all 0.5s ease-out;

  &:hover {
    transform: translateY(-4px);
  }

  .bullet {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: @grad-bullet;
    box-shadow: 0 0 0 3px rgba(255, 158, 104, 0.16);
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  .desc {
    margin: 0;
    font-size: 15px;
    line-height: 1.75;
    color: #0f172a;
    transition: color 0.3s ease;
  }

  &:hover .desc {
    color: #0b1221;
  }

  &:hover .bullet {
    transform: scale(1.12);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(26px);
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.card-in {
  opacity: 1;
  transform: translateY(0);
  animation: fadeUp 0.7s ease-out both;
}

.card-visible {
  opacity: 1;
  transform: translateY(0);
}

.card-out {
  opacity: 0;
  transform: translateY(18px);
}

.stagger-in {
  opacity: 1;
  transform: translateY(0);
  animation: fadeUp 0.6s ease-out both;
}

.stagger-out {
  opacity: 0;
  transform: translateY(12px);
}

.stagger-visible {
  opacity: 1;
  transform: translateY(0);
}

.hover-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(95, 139, 255, 0.22), rgba(134, 231, 255, 0.18), rgba(255, 255, 255, 0));
  transform: translateX(-100%);
  transition: transform 0.6s ease;
  pointer-events: none;
}

.ability-item:hover .hover-glow {
  transform: translateX(0);
}
</style>

