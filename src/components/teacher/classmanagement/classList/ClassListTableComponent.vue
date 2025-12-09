<script setup lang="ts">
import '@/assets/teacher/classmanagementCss/ClassListCss.css'
import '@/assets/teacher/classmanagementCss/classList/ClassListCommonCss.css'
import '@/assets/teacher/classmanagementCss/classList/ClassListTableCss.css'
import { classListStatic, classListColumns } from '@/data/teacher/classmanagement/ClassListData.ts'
import { handleClassEdit, handleClassDelete } from '@/utils/teacher/classmanagement/ClassManagementFormFunctions'
import { Plus } from '@element-plus/icons-vue'

interface ClassItem {
  classId: string
  className: string
  grade: string
  subject: string[]
  studentCount: number
  headTeacher: string
  createTime: string
  status: string
  classIntro: string
}

interface Props {
  onAddClick?: () => void
}

const props = defineProps<Props>()

const emit = defineEmits<{
  edit: [row: ClassItem]
  delete: [row: ClassItem]
}>()

const handleEdit = (row: ClassItem): void => {
  handleClassEdit(row.className)
  emit('edit', row)
}

const handleDelete = (row: ClassItem): void => {
  handleClassDelete()
  emit('delete', row)
}

const handleAddClass = (): void => {
  if (props.onAddClick) {
    props.onAddClick()
  }
}
</script>

<template>
  <el-card class="class-list-table-card">
    <template #header>
      <div class="class-list-table-header">
        <span class="class-list-table-title">班级列表</span>
        <div class="class-list-table-actions">
          <el-button type="primary" size="small" @click="handleAddClass">
            <template #icon>
              <Plus />
            </template>
            新增班级
          </el-button>
        </div>
      </div>
    </template>

    <el-table :data="classListStatic" stripe>
      <el-table-column type="selection" width="55" />
      <template v-for="column in classListColumns" :key="column.prop">
        <el-table-column
          v-if="column.prop !== 'subject'"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :show-overflow-tooltip="column.showOverflowTooltip"
        />
        <el-table-column v-else :label="column.label" :min-width="column.minWidth">
          <template #default="scope">
            {{ scope.row.subject.join(', ') }}
          </template>
        </el-table-column>
      </template>

      <el-table-column label="操作" width="150" fixed="right">
        <template #default="scope">
          <el-button link type="primary" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button link type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
