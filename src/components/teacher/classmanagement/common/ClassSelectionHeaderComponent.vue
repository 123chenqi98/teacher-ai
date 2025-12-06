<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { classListStatic } from '@/data/teacher/classmanagement/ClassListData.ts'
import '@/assets/teacher/classmanagementCss/common/ClassSelectionHeaderCss.css'

// 定义事件
const emit = defineEmits<{
  (e: 'class-change', classId: string): void
}>()

// 状态
const currentClassId = ref('')

// 初始化默认班级
onMounted(() => {
  if (classListStatic.length > 0) {
    currentClassId.value = classListStatic[0].classId
    emit('class-change', currentClassId.value)
  }
})

// 计算当前选中的班级信息
const currentClassInfo = computed(() => {
  return classListStatic.find(c => c.classId === currentClassId.value) || classListStatic[0]
})

// 处理班级切换
const handleClassChange = (val: string) => {
  currentClassId.value = val
  emit('class-change', val)
}

// 模拟头像颜色（根据名字生成）
const getAvatarColor = (name: string) => {
  const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}
</script>

<template>
  <div class="class-header-card" v-if="currentClassInfo">
    <!-- 居中容器 -->
    <div class="class-info-container">
      <h2 class="current-class-name">{{ currentClassInfo.className }}</h2>
      
      <el-dropdown trigger="click" @command="handleClassChange">
        <div class="class-select-trigger" title="切换班级">
          <el-icon><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item 
              v-for="item in classListStatic" 
              :key="item.classId" 
              :command="item.classId"
              :disabled="item.classId === currentClassId"
            >
              {{ item.className }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
