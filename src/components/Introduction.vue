<!--Introduction-->
<template>
    <div class="bg-#ffffff h-888px flex items-center">
        <div class="w-1240 mx-a">
            <h1 class="text-50 bBorder w-205">
                我的简介
            </h1>
            <div class="w-200 ml-2.5 bg-#f7eccb h-5 mt--12 mb-10"></div>
            <p class="text-18 tracking-1 mb-20">
                我的基本消息和我的自我介绍
            </p>
            <h5 class="text-16 tracking-1 mb-18">
                我是一名<span
                    class="text-orange">前端开发工程师</span>目前居住在<span
                    class="text-orange">上海</span>。
            </h5>
            <p class="leading-30 text-16 tracking-.8 mb-10">
                我熟练掌握vue2、vue3、nuxt3等技术进行网站小程序以及应用程序的开发。有多个官网、大屏、小程序、app开发上架维护经验。我能够熟练使用npm与git进行项目的管理，熟练运用Sass、Less、unocss等CSS预处理器进行精准的样式定制，熟练使用nuxt3进行网站开发并针对SEO从多个角度进行优化。进行npm发布包实现快速构建uniapp、vue3、nuxt3项目；快速清理仓库依赖；指令绑定本地代码与线上仓库等操作；针对不同框架进行组件、方法的可复用性封装实现项目的快速开发。
            </p>
            <p class="mb-16 text-18 text-shadow">
                不断学习；不断提升！</p>
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
                <li>
                    手机：
                    <span>
                        <a
                                href="tel:17581724627">17581724627
                    </a>
                    </span>
                </li>
                <li @click="copyText('lc2717741632')" class="cursor-pointer">
                    微信：<span>lc2717741632</span>
                </li>
                <li @click="copyText('2717741632@qq.com')" class="cursor-pointer">
                    邮箱：<span>2717741632@qq.com</span>
                </li>
                <li>
                    籍贯：<span>四川南充</span>
                </li>
                <li>
                    现居城市：<span>上海市奉贤区</span>
                </li>
            </ul>
            <ul
                    class="icons">
                <li class="li">
                    <img
                            src="@/assets/wx.jpg"
                            alt="">
                </li>
                <li class="li">
                    <img
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
                    <a href="https://www.npmjs.com/settings/lchao/packages"
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
}

.icons {
  height: 32px;
  margin-top: 20px;
  z-index: 999;
  display: flex;

  .li {
    width: 32px;
    height: 32px;
    float: left;
    margin-right: 10px;
    background: url("https://f.goodq.top/FeiEditor/images/icon/social_icon_32x32.png") no-repeat;
    position: relative;
    cursor: pointer;

    img {
      width: 88px;
      height: 88px;
      position: absolute;
      top: 120%;
      left: -5px;
      transition: .3s;
      opacity: 0;
    }

    &:hover img {
      opacity: 1;
    }

    &:nth-child(1) {
      background-position: -64px, 0;
    }

    &:nth-child(2) {
      background-position: 0, 0;
    }
  }
}
</style>
