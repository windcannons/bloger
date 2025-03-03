<template>
    <iframe
        class="w-100vw flex-1"
        :src="pdfUrl"
    ></iframe>
</template>

<script setup>
import { useWindowSize } from "@vueuse/core";
const { height: windowHeight } = useWindowSize();

// 使用绝对路径
const pdfUrl = new URL("/public/web前端%20刘超%2017581724627.pdf", import.meta.url).href;
</script>

<style lang="less" scoped>
/* 如果需要额外的样式，可以在这里添加 */
</style>
