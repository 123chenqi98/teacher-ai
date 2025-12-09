<script setup lang="ts">
import { studentListStatic, studentListColumns } from "@/data/teacher/classmanagement/ClassDetailStudentData.ts"
import ClassSelectionHeaderComponent from "@/components/teacher/classmanagement/common/ClassSelectionHeaderComponent.vue"
import { ElMessage } from "element-plus"
import { computed, ref } from "vue"
import "@/assets/teacher/classmanagementCss/StudentManagementCss.css"

interface Student {
  studentId: string
  name: string
  gender: string
  contact: string
  joinTime: string
  status: string
  latestScore: number
  absenceCount: number
  homeworkCompletionRate: string
}

const students = computed<Student[]>(() => studentListStatic)

// 班级切换处理
const currentClassId = ref('')
const handleClassChange = (classId: string) => {
  currentClassId.value = classId
  console.log(`学生管理模块 - 班级切换为: ${classId}`)
  // 这里后续可以添加重新获取学生列表的逻辑
}

const handleEdit = (row: Student): void => {
  ElMessage.success(`编辑成功: ${row.name}`)
}

const handleDelete = (row: Student): void => {
  ElMessage.warning("确定要删除吗？")
}

const handleAddStudent = (): void => {
  ElMessage.info("打开新增学生表单")
}

const handleImportStudents = (): void => {
  ElMessage.info("打开批量导入对话框")
}

const handleExportStudents = (): void => {
  ElMessage.success("导出成功")
}
</script>

<template>
  <div class="student-management-container">
    <class-selection-header-component @class-change="handleClassChange" />
    
    <div class="action-bar">
      <el-button type="primary" @click="handleAddStudent">添加学生</el-button>
      <el-button @click="handleImportStudents">批量导入</el-button>
      <el-button @click="handleExportStudents">导出名单</el-button>
    </div>

    <el-table :data="students" stripe>
      <el-table-column type="selection" width="55" />

      <el-table-column
        v-for="column in studentListColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :show-overflow-tooltip="column.showOverflowTooltip"
      />

      <el-table-column label="操作" width="160" fixed="right">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button link type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>
