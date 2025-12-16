<template>
  <div class="index">
    <div class="input-container">
      <el-input v-model="newNote" placeholder="输入工作内容" @keyup.enter="addNote"/>
      <el-button class="ml-20" type="primary" @click="addNote">添加</el-button>
    </div>

    <div v-for="(week, weekIndex) in weeks" :key="weekIndex" class="mb-26">
      <div class="week-header">
        <span class="text-20 font-800">日期范围: {{ week.startDate }} 到 {{ week.endDate }}</span>
        <div>
          <el-button type="success" @click="copyWeekNotes(week)" class="copy-button">复制</el-button>
          <el-button type="danger" @click="deleteWeek(weekIndex)" class="delete-button">删除</el-button>
        </div>
      </div>

      <div class="week-summary">
        <el-input
            type="textarea"
            v-if="week.isEditingSummary"
            v-model="week.summary"
            ref="summaryInputRefs"
            class="summary-input"
            @blur="saveWeekSummary(week)"
        />
        <template v-else>
          <el-button v-if="!week.summary" type="primary" @click="editWeekSummary(week)">编辑周总结</el-button>
          <div v-else class="summary-content">
            <span class="summary-text">{{ week.summary }}</span>
            <div>
              <el-button type="primary" @click="editWeekSummary(week)">编辑</el-button>
              <el-button type="success" @click="copyWeekSummary(week)">复制</el-button>
            </div>
          </div>
        </template>
      </div>

      <div v-for="(note, noteIndex) in week.notes" :key="noteIndex" class="note">
        <el-input
            class="flex-1 mr-20"
            v-if="note.isEditing"
            v-model="note.content"
            ref="noteInputRefs"
            @blur="saveNote(note)"
        />
        <span class="flex-1 mr-20" v-else>{{ note.content }}</span>
        <div>
          <el-button type="primary" @click="editNote(note, noteIndex)">编辑</el-button>
          <el-button type="danger" @click="confirmDeleteNote(note, weekIndex)">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, nextTick} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';

const weeks = ref([]);
const newNote = ref('');

const loadNotes = () => {
  const storedWeeks = localStorage.getItem('weeks');
  if (storedWeeks) {
    weeks.value = JSON.parse(storedWeeks);
  }
};

const saveNotes = () => {
  localStorage.setItem('weeks', JSON.stringify(weeks.value));
};

const addNote = () => {
  if (newNote.value.trim()) {
    const today = new Date().toLocaleDateString();
    const currentWeekIndex = getCurrentWeekIndex();
    if (currentWeekIndex !== -1) {
      const latestNote = weeks.value[currentWeekIndex].notes[0];
      if (latestNote && latestNote.date === today) {
        latestNote.content += `、${newNote.value}`;
      } else {
        weeks.value[currentWeekIndex].notes.unshift({content: newNote.value, date: today, isEditing: false});
      }
    } else {
      const [startDate, endDate] = getWeekDateRange();
      weeks.value.unshift({
        startDate,
        endDate,
        notes: [{content: newNote.value, date: today, isEditing: false}],
        summary: '',
        isEditingSummary: false
      });
    }
    newNote.value = '';
    saveNotes();
  }
};

const getCurrentWeekIndex = () => {
  const today = new Date();
  const currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1));
  return weeks.value.findIndex(week => new Date(week.startDate).getTime() === currentWeekStart.getTime());
};

const getWeekDateRange = () => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1));
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);
  return [startDate.toLocaleDateString(), endDate.toLocaleDateString()];
};

const saveNote = (note) => {
  note.isEditing = false;
  saveNotes();
};

const confirmDeleteNote = (note, weekIndex) => {
  ElMessageBox.confirm('确定要删除这条记事吗?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteNote(note, weekIndex);
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

const deleteNote = (note, weekIndex) => {
  weeks.value[weekIndex].notes = weeks.value[weekIndex].notes.filter(n => n !== note);
  saveNotes();
};

const deleteWeek = (weekIndex) => {
  ElMessageBox.confirm('确定要删除本周所有内容吗?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    weeks.value.splice(weekIndex, 1);
    saveNotes();
    ElMessage.success('本周内容已删除！');
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

const copyWeekNotes = (week) => {
  let content = '';
  week.notes.forEach(note => {
    const noteDate = new Date(note.date);
    const weekStartDate = new Date(week.startDate);
    const dayOfWeek = Math.floor((noteDate - weekStartDate) / (24 * 60 * 60 * 1000)); // 计算星期几
    const daysOfWeek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    content += `${daysOfWeek[dayOfWeek]}：${note.content}\n`;
  });

  // 创建隐藏的 textarea 元素
  let textarea = document.createElement('textarea');
  document.body.appendChild(textarea);
  textarea.style.position = 'fixed';
  textarea.style.clip = 'rect(0 0 0 0)';
  textarea.style.top = '10px';
  textarea.value = content; // 赋值
  textarea.select(); // 选中
  document.execCommand('copy'); // 复制
  document.body.removeChild(textarea); // 移除输入框

  ElMessage.success('已复制本周内容！'); // 使用 Element Plus 提示
  console.log('已复制本周内容:', content);
};

const noteInputRefs = ref([]);
const editNote = (note, weekIndex, noteIndex) => {
  note.isEditing = true;
  nextTick(() => {
    noteInputRefs.value[weekIndex][noteIndex]?.focus();
  });
};

// 编辑周总结
const summaryInputRefs = ref([]);
const editWeekSummary = (week, weekIndex) => {
  week.isEditingSummary = true;
  nextTick(() => {
    summaryInputRefs.value[weekIndex]?.focus();
  });
};

// 保存周总结
const saveWeekSummary = (week) => {
  week.isEditingSummary = false;
  saveNotes();
};

// 复制周总结
const copyWeekSummary = (week) => {
  // 创建隐藏的 textarea 元素
  let textarea = document.createElement('textarea');
  document.body.appendChild(textarea);
  textarea.style.position = 'fixed';
  textarea.style.clip = 'rect(0 0 0 0)';
  textarea.style.top = '10px';
  textarea.value = week.summary; // 赋值
  textarea.select(); // 选中
  document.execCommand('copy'); // 复制
  document.body.removeChild(textarea); // 移除输入框
  ElMessage.success('已复制周总结！');
};

onMounted(loadNotes);
</script>

<style scoped lang="less">
.index {
  width: 80%;
  margin: 40px auto;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.week-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.week-summary {
  margin: 10px 0;
}

.summary-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary-text {
  font-size: 18px;
  font-weight: bold;
  color: #d35400;
  margin-right: 10px;
  white-space: pre-wrap;
  flex: 1;
}

.note {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
}
</style>
