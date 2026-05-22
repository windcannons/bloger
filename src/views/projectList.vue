<template>
  <div class="h-[calc(100vh-64px)] bg-#f5f5f5 pt-64 overflow-hidden">
    <div class="w-full h-[calc(100vh-160px)] flex flex-col items-center justify-center px-40">
      <h1 class="text-36 font-bold text-gray-800 mb-40 animate-fade-in">开发项目</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-40 max-w-1000 w-full">
        <div
            v-for="(project, index) in projects"
            :key="project.type"
            class="project-card bg-white rounded-16 shadow-lg cursor-pointer p-40"
            :style="{ animationDelay: `${index * 150}ms` }"
            @click="goToProject(project.type)">
          <div class="project-icon text-80 mb-20 text-center">{{ project.icon }}</div>
          <h3 class="project-title text-28 font-semibold text-gray-800 mb-15 text-center">{{ project.name }}</h3>
          <p class="project-desc text-gray-500 text-20 text-center">{{ project.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const projects = ref([
  { type: 'work', name: '工作项目', description: '参与开发的企业项目', icon: '💼' },
  { type: 'entertainment', name: '娱乐项目', description: '兴趣驱动的个人项目', icon: '🎮' },
  { type: 'software', name: '我的软件', description: '独立开发的软件工具', icon: '⚙️' },
]);

const goToProject = (projectType) => {
  if (projectType === 'software') {
    router.push('/mySoftware');
  } else {
    router.push(`/myProject/${projectType}`);
  }
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
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.project-card {
  opacity: 0;
  transform: translateY(30px);
  animation: slideUp 0.6s ease-out forwards;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.project-card:hover .project-icon {
  transform: scale(1.2) rotate(5deg);
  filter: drop-shadow(0 4px 8px rgba(64, 158, 255, 0.3));
}

.project-card:hover .project-title {
  color: #409eff;
}

.project-icon {
  transition: all 0.3s ease;
}

.project-title {
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
