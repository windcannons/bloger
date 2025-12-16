<template>
  <div class="bg-#f5f5f5 docs h-100%">
    <div class="w-1440 mx-a flex h-100%">
      <el-scrollbar
          ref="tocScrollbar"
          class="fixed! top-100"
          :height="`${windowHeight - 100}px`">
        <ul class="w-300">
          <li v-for="item in toc"
              class="line-clamp-1 cursor-pointer mb-2 toc-item"
              :key="item.id"
              :class="[
                        `title${item.level}`,
                        {active: item.id === activeTocId}
                    ]"
              :data-id="item.id"
              @click="scrollTo(item.id)">
            {{ item.title }}
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
  onMounted,
  onBeforeUnmount
} from "vue";
import {
  useRoute
} from "vue-router";
import {
  useRouter
} from "vue-router";

const {height: windowHeight} = useWindowSize();

const toc = ref([]);
const contentScrollbar = ref();
const tocScrollbar = ref();
const activeTocId = ref('');
const isProgrammaticScroll = ref(false);
let scrollResumeTimer = null;
let wheelListener = null;
let touchListener = null;

const scheduleResumeScroll = (delay = 400) => {
  if (scrollResumeTimer)
    clearTimeout(scrollResumeTimer);
  scrollResumeTimer = setTimeout(() => {
    isProgrammaticScroll.value = false;
  }, delay);
};

const cancelProgrammaticScroll = () => {
  if (isProgrammaticScroll.value) {
    isProgrammaticScroll.value = false;
  }
  if (scrollResumeTimer)
    clearTimeout(scrollResumeTimer);
};

const route = useRoute()
const router = useRouter()
const markdownTxt = ref('')
const updateMarkdown = async () => {
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
  toc.value = Array.from(headers).map((header, index) => {
    const title = header.textContent || '';
    const id = makeHeaderId(title, index);
    return {
      id,
      title,
      level: parseInt(header.tagName.replace('H', ''), 10),
    };
  });

  headers.forEach((header, index) => {
    const title = header.textContent || '';
    header.id = makeHeaderId(title, index);
  });
  setActiveToc();
  attachScrollListener();
  scrollToHash(); // 根据路由 hash 定位
}

const scrollTo = (id) => {
  const wrap = contentScrollbar.value?.wrapRef;
  if (!wrap)
    return;
  // 在点击目录时，暂时关闭内容滚动驱动的高亮联动
  isProgrammaticScroll.value = true;
  scheduleResumeScroll();

  const element = wrap.querySelector(`#${id}`);
  if (!element)
    return;
  const offset = element.getBoundingClientRect().top - wrap.getBoundingClientRect().top + wrap.scrollTop;
  wrap.scrollTo({
    top: offset - 12,
    behavior: 'smooth'
  });
  activeTocId.value = id;
  router.replace({
    hash: `#${id}`
  });
};

const scrollToHash = () => {
  const id = route.hash ? route.hash.replace('#', '') : '';
  if (!id)
    return;

  // 先滚动右侧内容
  scrollTo(id);

  // 再确保左侧大纲也滚动到对应位置
  nextTick(() => {
    scrollTocIntoView(id);
  });
};

const handleContentScroll = () => {
  if (isProgrammaticScroll.value) {
    // 仍处于程序触发的滚动，等待滚动稳定后再恢复联动
    scheduleResumeScroll();
    return;
  }
  setActiveToc();
};

const setActiveToc = () => {
  const wrap = contentScrollbar.value?.wrapRef;
  if (!wrap || toc.value.length === 0)
    return;

  const headers = wrap.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (!headers.length)
    return;

  const wrapTop = wrap.getBoundingClientRect().top;
  const scrollTop = wrap.scrollTop;
  let currentId = toc.value[0].id;

  headers.forEach((header) => {
    const offsetTop = header.getBoundingClientRect().top - wrapTop + scrollTop;
    if (offsetTop - 20 <= scrollTop) {
      currentId = header.id;
    }
  });

  if (currentId !== activeTocId.value) {
    activeTocId.value = currentId;
    if (!isProgrammaticScroll.value) {
      scrollTocIntoView(currentId);
    }
  }
};

const scrollTocIntoView = (id) => {
  const wrap = tocScrollbar.value?.wrapRef;
  if (!wrap)
    return;
  const target = wrap.querySelector(`[data-id="${id}"]`);
  if (!target)
    return;
  const elTop = target.offsetTop;
  const elHeight = target.offsetHeight;
  const targetScrollTop = elTop - (wrap.clientHeight / 2) + (elHeight / 2);
  wrap.scrollTop = Math.max(targetScrollTop, 0);
};

const attachScrollListener = () => {
  const wrap = contentScrollbar.value?.wrapRef;
  if (!wrap)
    return;
  wrap.removeEventListener('scroll', handleContentScroll);
  wrap.addEventListener('scroll', handleContentScroll, {
    passive: true
  });

  // 用户主动滚动时立刻恢复联动
  if (wheelListener)
    wrap.removeEventListener('wheel', wheelListener);
  wheelListener = () => cancelProgrammaticScroll();
  wrap.addEventListener('wheel', wheelListener, {
    passive: true
  });

  if (touchListener)
    wrap.removeEventListener('touchstart', touchListener);
  touchListener = () => cancelProgrammaticScroll();
  wrap.addEventListener('touchstart', touchListener, {
    passive: true
  });
};

onBeforeUnmount(() => {
  const wrap = contentScrollbar.value?.wrapRef;
  if (wrap) {
    wrap.removeEventListener('scroll', handleContentScroll);
    if (wheelListener)
      wrap.removeEventListener('wheel', wheelListener);
    if (touchListener)
      wrap.removeEventListener('touchstart', touchListener);
  }
  if (scrollResumeTimer)
    clearTimeout(scrollResumeTimer);
});

// 监听路由变化，更新 Markdown 内容并滚动到顶部
watch(() => route.params.docType, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    await updateMarkdown();
    route.hash ? scrollToHash() : scrollToTop(); // 路由变化后滚动到顶部或 hash
  }
}, {
  deep: true,
  immediate: false
});

// 监听 hash 变化，滚动到对应位置
watch(() => route.hash, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    await nextTick();
    scrollToHash();
  }
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
  route.hash ? scrollToHash() : scrollToTop();
});

const makeHeaderId = (title, index) => {
  const slug = (title || '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]/g, '');
  const base = slug || 'toc';
  // 加统一前缀，避免数字开头或连续连字符导致 querySelector 无效
  return `toc-${base}-${index}`;
};
</script>

<style
    scoped lang="less">
.toc-item {
  /* 右、上、下留内边距，左侧由 titleX 控制缩进 */
  padding: 2px 8px 2px 0;
  border-radius: 2px;
  transition: all .1s;
  display: block;
  box-sizing: border-box;
}

.title1 {
  font-size: 18px;
  font-weight: 700;
  padding-left: 0;
}

.title2 {
  font-size: 16px;
  font-weight: 600;
  padding-left: 8px;
}

.title3 {
  font-size: 14px;
  font-weight: 600;
  padding-left: 16px;
}

.title4 {
  font-size: 13px;
  font-weight: 500;
  padding-left: 24px;
}

.title5 {
  font-size: 12px;
  font-weight: 500;
  padding-left: 32px;
}

.toc-item:hover {
  color: #409eff;
  background-color: #f0f7ff; // hover：浅一点
}

.toc-item.active {
  color: #409eff;
  font-weight: 700;
  background-color: #d6e8ff; // 选中：更深一点
}

.toc-item.active:hover {
  color: #409eff;
  background-color: #c5ddff; // 选中 + hover：再深一点
}
</style>
