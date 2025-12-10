<!--BeGoodAt-->
<template>
  <div
      class="offer pt-64"
      id="offer"
      ref="offer"
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
        padding: 20px 0 33px;
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
          transition: .2s;
          cursor: pointer;

          &:hover {
            transform: translateY(-10px);
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
            margin: 20px 0 33px;
            min-height: 67px;
          }
        }
      }
    }
  }
}
</style>
