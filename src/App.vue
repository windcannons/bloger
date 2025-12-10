<template>
    <div class="App flex flex-col pt-64">
        <HeaderView></HeaderView>
        <RouterView></RouterView>
    </div>
</template>
<script
    setup>
import HeaderView
    from "@/components/HeaderView.vue";
import {
    onMounted,
    watch
} from "vue";
import {
    useRoute
} from "vue-router";


const route = useRoute();

onMounted(()=>{
    console.log(
        `%c✨ 欢迎来到刘超的个人博客 ✨`,
        'color: #2196F3; font-size: 24px; font-weight: bold; background-color: #E3F2FD; padding: 15px 30px; border-radius: 10px; text-align: center;'
    );

    console.log(
        `%c🚀 刘超，勤勤恳恳、认真负责的前端开发工程师 👨‍💻`,
        'color: #4CAF50; font-size: 18px; font-weight: bold; background-color: #F1F8E9; padding: 10px; border-radius: 8px;'
    );

    console.log(
        `%c🌟 专注于前端技术，致力于提升用户体验 🎨`,
        'color: #FF9800; font-size: 16px; font-weight: normal; background-color: #FFF3E0; padding: 10px; border-radius: 8px;'
    );

    console.log(
        `%c📍 目前居住在上海，探索无止境 🌆`,
        'color: #FF5722; font-size: 16px; font-weight: normal; background-color: #FFEBEE; padding: 10px; border-radius: 8px;'
    );

    console.log(
        `%c💬 通过这个博客记录成长，分享经验 📖`,
        'color: #9C27B0; font-size: 16px; font-weight: normal; background-color: #EDE7F6; padding: 10px; border-radius: 8px;'
    );

    console.log(
        `%c🔧 技术栈：Vue, nuxt, Node.js, Webpack, CSS3, HTML5 🛠️`,
        'color: #8BC34A; font-size: 16px; font-weight: normal; background-color: #C8E6C9; padding: 10px; border-radius: 8px;'
    );
})
// 检测页面跳转时滚动到顶部
watch(
    () => route,
    (to, from) => {
        window.scrollTo(0, 0)


    }, {deep: true}
);


</script>
<style
    scoped
    lang="less">
</style>
