<template>
    <div class="index">
        <div class="input-container">
            <el-input v-model="newNote" placeholder="输入工作内容" @keyup.enter="addNote" />
            <el-button class="ml-20" type="primary" @click="addNote">添加</el-button>
        </div>

        <div v-for="(week, weekIndex) in weeks" :key="weekIndex" class="week">
            <div class="week-header">
                <span class="text-20 font-800">日期范围: {{ week.startDate }} 到 {{ week.endDate }}</span>
                <div>
                    <el-button type="success" @click="copyWeekNotes(week)" class="copy-button">复制</el-button>
                    <el-button type="danger" @click="deleteWeek(weekIndex)" class="delete-button">删除</el-button>
                </div>
            </div>
            <div v-for="(note, noteIndex) in week.notes" :key="noteIndex" class="note">
                <el-input
                    class="flex-1 mr-20"
                    v-if="note.isEditing"
                    v-model="note.content"
                    ref="noteInput"
                    @blur="saveNote(note)"
                />
                <span class="flex-1 mr-20" v-else>{{ note.content }}</span>
                <div>
                    <el-button type="danger" @click="editNote(note, noteIndex)">编辑</el-button>
                    <el-button type="danger" @click="confirmDeleteNote(note, weekIndex)">删除</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const weeks = ref([]);
const newNote = ref('');

// 从 localStorage 加载笔记
const loadNotes = () => {
    const storedWeeks = localStorage.getItem('weeks');
    if (storedWeeks) {
        weeks.value = JSON.parse(storedWeeks);
    }
};

// 保存笔记到 localStorage
const saveNotes = () => {
    localStorage.setItem('weeks', JSON.stringify(weeks.value));
};

const addNote = () => {
    if (newNote.value.trim()) {
        const today = new Date().toLocaleDateString(); // 获取当前日期
        const currentWeekIndex = getCurrentWeekIndex();
        if (currentWeekIndex !== -1) {
            const latestNote = weeks.value[currentWeekIndex].notes[0]; // 获取本周最新笔记
            if (latestNote && latestNote.date === today) {
                // 如果最新笔记的日期与今天相同，则追加内容
                latestNote.content += `、${newNote.value}`;
            } else {
                // 如果不同，则新增笔记
                weeks.value[currentWeekIndex].notes.unshift({ content: newNote.value, date: today, isEditing: false });
            }
        } else {
            // 如果当前周不存在，创建新周
            const [startDate, endDate] = getWeekDateRange();
            weeks.value.unshift({
                startDate,
                endDate,
                notes: [{ content: newNote.value, date: today, isEditing: false }]
            });
        }
        newNote.value = '';
        saveNotes(); // 更新 localStorage
    }
};

const getCurrentWeekIndex = () => {
    const today = new Date();
    const currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1); // 周一
    return weeks.value.findIndex(week => {
        const weekStart = new Date(week.startDate);
        return weekStart.getTime() === currentWeekStart.getTime();
    });
};

const getWeekDateRange = () => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1); // 周一
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // 周日
    return [startDate.toLocaleDateString(), endDate.toLocaleDateString()];
};

const saveNote = (note) => {
    note.isEditing = false;
    saveNotes(); // 更新 localStorage
};

const confirmDeleteNote = (note, weekIndex) => {
    ElMessageBox.confirm('确定要删除这条记事吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        deleteNote(note, weekIndex);
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '已取消删除'
        });
    });
};

const deleteNote = (note, weekIndex) => {
    weeks.value[weekIndex].notes = weeks.value[weekIndex].notes.filter(n => n !== note);
    saveNotes(); // 更新 localStorage
};

const deleteWeek = (weekIndex) => {
    ElMessageBox.confirm('确定要删除本周所有内容吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        weeks.value.splice(weekIndex, 1);
        saveNotes(); // 更新 localStorage
        ElMessage.success('本周内容已删除！');
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '已取消删除'
        });
    });
};

const copyWeekNotes = (week) => {
    let content = '';
    week.notes.forEach(note => {
        const noteDate = new Date(note.date);
        const weekStartDate = new Date(week.startDate);
        const dayOfWeek = Math.floor((noteDate - weekStartDate) / (24 * 60 * 60 * 1000)) + 1; // 计算星期几
        const daysOfWeek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
        content += `${daysOfWeek[dayOfWeek - 1]}：${note.content}\n`;
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

const editNote = (note, noteIndex) => {
    note.isEditing = true;
    // 在下一次 DOM 更新后获取焦点
    nextTick(() => {
        const inputs = document.querySelectorAll('.el-input__inner'); // 获取所有输入框
        if (inputs.length > noteIndex) {
            inputs[noteIndex].focus(); // 调用 focus 方法
        }
    });
};

// 在组件挂载时加载笔记
onMounted(loadNotes);
</script>

<style scoped lang="less">
.index {
    width: 80%;
    margin: 40px auto;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.input-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.week {
    margin-bottom: 20px;
}

.week-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.date-range {
    font-size: 0.9em; /* 调整字体大小 */
    color: #666; /* 调整颜色 */
}

.copy-button {
    margin-left: auto; /* 将复制按钮推到右侧 */
}

.delete-button {
    margin-left: 10px; /* 与复制按钮的间距 */
}

.note {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
}
</style>
