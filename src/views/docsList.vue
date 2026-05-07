<template>
  <div class="h-[calc(100vh-64px)] bg-#f5f5f5 pt-64 overflow-hidden">
    <div class="w-full h-[calc(100vh-160px)] flex flex-col items-center justify-center px-40">
      <h1 class="text-36 font-bold text-gray-800 mb-40 animate-fade-in">我的文档</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-40 max-w-900 w-full">
        <div
            v-for="(doc, index) in docs"
            :key="doc.type"
            class="doc-card bg-white rounded-16 shadow-lg cursor-pointer p-40"
            :style="{ animationDelay: `${index * 150}ms` }"
            @click="goToDoc(doc.type)">
          <div class="doc-icon text-80 mb-20 text-center">📄</div>
          <h3 class="doc-title text-28 font-semibold text-gray-800 mb-15 text-center">{{ doc.name }}</h3>
          <p class="doc-desc text-gray-500 text-20 text-center">{{ doc.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const docs = ref([
  { type: 'vue', name: 'Vue', description: 'Vue.js 学习笔记' },
  { type: 'flutter', name: 'Flutter', description: 'Flutter 开发指南' },
  { type: 'ArkTs', name: 'ArkTs', description: 'HarmonyOS 应用开发' },
  { type: '个人笔记', name: '个人笔记', description: '日常学习记录' },
]);

const goToDoc = (docType) => {
  router.push(`/docs/${docType}`);
};
</script>

<style scoped lang="less">
.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.doc-card {
  opacity: 0;
  transform: translateY(30px);
  animation: slideUp 0.6s ease-out forwards;
  transition: all 0.3s ease;
}

.doc-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.doc-card:hover .doc-icon {
  transform: scale(1.2) rotate(5deg);
  filter: drop-shadow(0 4px 8px rgba(64, 158, 255, 0.3));
}

.doc-card:hover .doc-title {
  color: #409eff;
}

.doc-icon {
  transition: all 0.3s ease;
}

.doc-title {
  transition: color 0.3s ease;
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
