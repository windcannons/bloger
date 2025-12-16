<template>
    <div class="bg-#f5f5f5 docs h-100%">
        <div class="w-1440 mx-a flex h-100%">
            <el-scrollbar
                class="fixed! top-100"
                :height="`${windowHeight - 100}px`">
            <ul class="w-300">
                <li v-for="item in toc"
                    class="line-clamp-1 cursor-pointer hover:text-red mb-2"
                    :key="item.id"
                    :class="`title${item.level}`"
                    @click="scrollTo(item.id)">
                    {{item.title}}
                </li>
            </ul>
            </el-scrollbar>
            <el-scrollbar
                ref="contentScrollbar"
                class="docs-content bg-white flex-1 pl-20 pt-20 ml-300"
                :height="`${windowHeight - 100}px`">
                <v-md-preview
                    :text="markdownTxt"></v-md-preview>
            </el-scrollbar>
        </div>
    </div>
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
    watch,
    onMounted
} from "vue";
import {
    useRoute
} from "vue-router";

const {height: windowHeight} = useWindowSize();

const toc = ref([]);
const contentScrollbar = ref();

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
    const previewEl = contentScrollbar.value?.wrapRef?.querySelector('.v-md-editor-preview');
    const headers = previewEl
        ? previewEl.querySelectorAll('h1, h2, h3, h4, h5, h6')
        : [];
    toc.value = Array.from(headers).map((header, index) => ({
        id: `toc-${index}`,
        title: header.textContent || '',
        level: parseInt(header.tagName.replace('H', ''), 10),
    }));

    headers.forEach((header, index) => {
        header.id = `toc-${index}`;
    });
}

const scrollTo = (id) => {
    const wrap = contentScrollbar.value?.wrapRef;
    if (!wrap)
        return;
    const element = wrap.querySelector(`#${id}`);
    if (!element)
        return;
    const offset = element.getBoundingClientRect().top - wrap.getBoundingClientRect().top + wrap.scrollTop;
    wrap.scrollTo({
        top: offset - 12,
        behavior: 'smooth'
    });
};

// 监听路由变化，更新 Markdown 内容并滚动到顶部
watch(() => route.params.docType, async (newVal, oldVal) => {
    if (newVal !== oldVal) {
        await updateMarkdown();
        scrollToTop(); // 路由变化后滚动到顶部
    }
}, {
    deep: true,
    immediate: false
});

// 滚动到顶部的方法
const scrollToTop = () => {
    const wrap = contentScrollbar.value?.wrapRef;
    if (wrap) {
        wrap.scrollTop = 0; // 将滚动条滚动到顶部
    }
};

onMounted(async () => {
    await updateMarkdown();
    scrollToTop();
});
</script>

<style
    scoped lang="less">
.title1{
    font-size: 18px;
    font-weight: 700;
    padding-left: 0;
}
.title2{
    font-size: 16px;
    font-weight: 600;
    padding-left: 8px;
}
.title3{
    font-size: 14px;
    font-weight: 600;
    padding-left: 16px;
}
.title4{
    font-size: 13px;
    font-weight: 500;
    padding-left: 24px;
}
.title5{
    font-size: 12px;
    font-weight: 500;
    padding-left: 32px;
}
</style>
