<template>
    <el-scrollbar
        ref="scrollbar"
        class="bg-#f5f5f5 docs"
            :height="`${windowHeight - 65}px`">
        <div class="w-1440 mx-a flex ">
            <el-scrollbar
                class="fixed! top-100"
                :height="`${windowHeight - 265}px`">
            <ul class="w-300">
                <li v-for="item in toc"
                    class="line-clamp-1 cursor-pointer hover:text-red mb-2"
                    :key="item.id"
                    :class="`title${item.level}`"
                    @click="scrollTo(item.id)">
                    {{
                    item.title
                    }}
                </li>
            </ul>
            </el-scrollbar>
            <div class="bg-white flex-1 pl-20 pt-20 ml-300">
                <v-md-preview
                    :text="markdownTxt"></v-md-preview>
            </div>
        </div>
    </el-scrollbar>
</template>

<script
    setup
    lang="js">
import Vue
    from '../assets/markdown/Vue.md?raw';
import flutter
    from '../assets/markdown/flutter.md?raw';
import ArkTs
    from '../assets/markdown/ArkTs.md?raw';
import note
    from '../assets/markdown/个人笔记.md?raw';
import {
    useWindowSize
} from '@vueuse/core';
import {
    ref,
    nextTick,
    watch
} from "vue";
import {
    useRoute
} from "vue-router";

const {height: windowHeight} = useWindowSize();

const toc = ref([]);

const route = useRoute()
const markdownTxt = ref('')
const updateMarkdown = async() => {
    const docType = route.params.docType
    switch (docType) {
        case 'vue':
            markdownTxt.value = Vue
            break
        case 'flutter':
            markdownTxt.value = flutter
            break
        case 'ArkTs':
            markdownTxt.value = ArkTs
            break
        case '个人笔记':
            markdownTxt.value = note
            break
        default:
            markdownTxt.value = note
    }

    await nextTick();
    const headers = document.querySelectorAll('.v-md-editor-preview h1, .v-md-editor-preview h2, .v-md-editor-preview h3, .v-md-editor-preview h4, .v-md-editor-preview h5, .v-md-editor-preview h6');
    toc.value = Array.from(headers).map((header, index) => ({
        id: `toc-${index}`,
        title: header.textContent || '',
        level: parseInt(header.tagName.replace('H', ''), 10),
    }));

    headers.forEach((header, index) => {
        header.id = `toc-${index}`;
    });
}

// 监听路由变化，当路由参数变化时更新 markdownTxt
watch(() => route.params.docType, updateMarkdown,{
    deep:true,
    immediate:true
})

const scrollTo = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({behavior: 'smooth'});
};

// 监听路由变化，更新 Markdown 内容并滚动到顶部
watch(() => route.params.docType, async (newVal, oldVal) => {
    if (newVal !== oldVal) {
        await updateMarkdown();
        scrollToTop(); // 路由变化后滚动到顶部
    }
}, {
    deep: true,
    immediate: true
});

// 滚动到顶部的方法
const scrollToTop = () => {
    const scrollbarWrap = document.querySelector('.docs .el-scrollbar__wrap');
    if (scrollbarWrap) {
        scrollbarWrap.scrollTop = 0; // 将滚动条滚动到顶部
    }
};
</script>

<style
    scoped lang="less">
.title1{
    font-size: 16px;
}
.title2{
    font-size: 15px;
    padding-left: 3px;
}
.title3{
    font-size: 14px;
    padding-left: 6px;
}
.title4{
    font-size: 13px;
    padding-left: 9px;
}
.title5{
    font-size: 12px;
    padding-left: 12px;
}
</style>
