<!--BeGoodAt-->
<template>
  <div
      class="offer pt-88"
      id="offer"
      ref="offer"
      :class="{'is-visible': isVisible, 'no-delay': noDelay}"
  >
    <div
        class="w">
      <div
          class="top">
        <div
            class="topBox">
          <div
              class="title">
            <h1>
              我的擅长</h1>
            <div
                class="wire"></div>
          </div>
          <p>
            我能为您提供前端开发方案、网站设计、用户体验优化、交互效果制作、响应式布局、浏览器兼容性支持等服务。</p>
        </div>
      </div>
      <div
          class="content">
        <ul>
          <li>
            <img
                src="@/assets/li01.png"
                alt="">
            <h4>
              网页设计定制</h4>
            <p>
              提供定制化的网站设计服务，以满足您的特定业务需求和用户体验
            </p>
          </li>
          <li>
            <img
                src="@/assets/li02.png"
                alt="">
            <h4>
              界面开发</h4>
            <p>
              开发易用、美观、直观的用户界面，提高您网站的用户满意度。</p>
          </li>
          <li>
            <img
                src="@/assets/li03.png"
                alt="">
            <h4>
              响应式设计</h4>
            <p>
              创建针对不同设备的响应式设计，确保您的网站在手机、平板和桌面电脑上都能完美显示。</p>
          </li>
          <li>
            <img
                src="@/assets/li04.png"
                alt="">
            <h4>
              网站重构</h4>
            <p>
              帮助您更新老旧的网站，优化网站结构，使其更易于使用和管理。</p>
          </li>
          <li>
            <img
                src="@/assets/li05.png"
                alt="">
            <h4>
              SEO优化</h4>
            <p>
              对您的网站进行搜索引擎优化，提高其在搜索引擎中的排名</p>
          </li>
          <li>
            <img
                src="@/assets/li06.png"
                alt="">
            <h4>
              数据可视化设计</h4>
            <p>
              利用现有的数据可视化库和工具，对数据进行分析和可视化处理，帮助企业更好地理解和利用数据。</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script
    setup>

import { onMounted, onBeforeUnmount, ref } from "vue";

const offer = ref(null)
const isVisible = ref(false)
const noDelay = ref(false)
let observer = null
let delayTimer = null

const createObserver = () => {
  if (!offer.value || typeof IntersectionObserver === 'undefined') {
    isVisible.value = true
    noDelay.value = true
    return
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (!delayTimer && !noDelay.value) {
          // 最后一个卡片延时 0.55s + 动画 0.6s 再留少许缓冲
          delayTimer = setTimeout(() => {
            noDelay.value = true
          }, 1250)
        }
      } else {
        isVisible.value = false
      }
    })
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -12% 0px'
  })

  observer.observe(offer.value)
}

onMounted(() => {
  createObserver()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (delayTimer) {
    clearTimeout(delayTimer)
    delayTimer = null
  }
})
</script>

<style
    scoped
    lang="less">
.offer {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #f5f8fd;

  @media (max-width: 1200px) {
    .w {
      width: 100% !important;
    }
  }
  @media (max-width: 990px) {
    .top {
      p {
        text-align: center;
        padding: 20px 20px 33px !important;
        height: auto !important;
      }
    }

    .content {
      height: auto !important;

      li {
        width: 88% !important;
      }
    }
  }

  .w {
    width: 1200px;
    margin: 0 auto;

    .top {
      overflow: hidden;
      text-align: center;

      .offerTop {
        animation-name: offerTop;
        animation-duration: 1s;
        animation-fill-mode: forwards;
      }

      .topBox {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .title {
        width: 201px;
        height: 65px;

        h1 {
          font-size: 44px;
          font-weight: 400;
          color: #000;
          font-family: f5f487082c474e4472d76201c069f2098, serif;
        }

        .wire {
          width: 200px;
          height: 5px;
          background-color: #f9e5a8;
          margin: -10px 1px 0;
        }
      }

      p {
        font-size: 15px;
        color: #828282;
        height: 77px;
        padding: 20px 0 20px;
      }
    }

    .content {
      width: 100%;
      padding: 0 10px;
      margin: 0 auto;
      height: 670px;

      ul {
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;

        .offerContent1 {
          animation-name: offerContent;
          animation-duration: 1s;
          animation-fill-mode: forwards;
        }

        .offerContent2 {
          animation-name: offerContent;
          animation-duration: .8s;
          animation-fill-mode: forwards;
        }

        li {
          background-color: #fff;
          width: 30%;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 33px;
          box-shadow: 5px 5px 10px #ccc;
          border: 1px solid #e9e9e9;
          opacity: 0;
          transform: translateY(80px);
          transition: opacity 0.6s ease,
                      transform 0.6s cubic-bezier(0.2, 0.7, 0.35, 1.3),
                      box-shadow 0.2s ease,
                      top 0.25s ease;
          transition-delay: var(--enter-delay, 0s);
          cursor: pointer;
          position: relative;
          top: 0;

          &:hover {
            top: -10px;
            transition: top 0.25s ease;
            transition-delay: 0s;
          }

          img {
            width: 80px;
            height: 80px;
          }

          h4 {
            font-size: 16px;
            margin-top: 16px;
          }

          h4 {
            font-family: fd721bf845ff7dd1453a0242bf8cd7b2c, sans-serif;
            color: #000;
          }

          p {
            width: 100%;
            text-align: center;
            font-size: 15px;
            color: #828282;
            margin: 20px 0 10px;
            min-height: 67px;
          }
        }
      }
    }
  }
}

.offer.is-visible .content ul li {
  opacity: 1;
  transform: translateY(0);
}

.offer.is-visible .content ul li:nth-child(1) { transition-delay: 0.05s; --enter-delay: 0.05s; }
.offer.is-visible .content ul li:nth-child(2) { transition-delay: 0.15s; --enter-delay: 0.15s; }
.offer.is-visible .content ul li:nth-child(3) { transition-delay: 0.25s; --enter-delay: 0.25s; }
.offer.is-visible .content ul li:nth-child(4) { transition-delay: 0.35s; --enter-delay: 0.35s; }
.offer.is-visible .content ul li:nth-child(5) { transition-delay: 0.45s; --enter-delay: 0.45s; }
.offer.is-visible .content ul li:nth-child(6) { transition-delay: 0.55s; --enter-delay: 0.55s; }

.offer.no-delay .content ul li {
  --enter-delay: 0s;
  transition-delay: 0s !important;
}
</style>
