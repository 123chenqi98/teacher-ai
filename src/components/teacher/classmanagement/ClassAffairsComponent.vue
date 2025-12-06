<script setup lang="ts">
import { noticeListStatic, noticeListColumns } from "@/data/teacher/classmanagement/ClassDetailNoticeData.ts"
import ClassSelectionHeaderComponent from "@/components/teacher/classmanagement/common/ClassSelectionHeaderComponent.vue"
import { ElMessage } from "element-plus"
import { computed, ref } from "vue"
import "@/assets/teacher/classmanagementCss/ClassAffairsCss.css"

interface Notice {
  id: string
  title: string
  type: string
  source: string
  content: string
  time: string
  readCount: number
  totalCount: number
  isRead: boolean
  attachment: string
}

// 通知类型颜色配置
const NOTICE_TYPE_COLOR_MAP: Record<string, string> = {
  '学校公告': '#f56c6c',
  '班级通知': '#91c3f8',
  '系统通知': '#e6a23c'
}

const notices = computed<Notice[]>(() => noticeListStatic)

const handleMarkRead = (row: Notice): void => {
  ElMessage.success(`已标记 "${row.title}" 为已读`)
}

const handleDownload = (row: Notice): void => {
  ElMessage.success(`已下载附件: ${row.attachment}`)
}

const handlePublishNotice = (): void => {
  ElMessage.info("打开发布通知对话框")
}

const handleCreateActivity = (): void => {
  ElMessage.info("打开创建活动对话框")
}

const handleManageFile = (): void => {
  ElMessage.info("打开文件管理对话框")
}

const getStatusColor = (type: string): string => {
  return NOTICE_TYPE_COLOR_MAP[type] || '#909399'
}

const getReadPercentage = (readCount: number, totalCount: number): string => {
  if (totalCount === 0) return '0%'
  return `${Math.round((readCount / totalCount) * 100)}%`
}

// 班级切换处理
const currentClassId = ref('')
const handleClassChange = (classId: string) => {
  currentClassId.value = classId
  console.log(`班级事务模块 - 班级切换为: ${classId}`)
  // 这里后续可以添加重新获取通知列表的逻辑
}
</script>

<template>
  <div class="class-affairs-container">
    <class-selection-header-component @class-change="handleClassChange" />

    <div class="action-bar">
      <el-button type="primary" @click="handlePublishNotice">发布通知</el-button>
      <el-button @click="handleCreateActivity">创建活动</el-button>
      <el-button @click="handleManageFile">管理文件</el-button>
    </div>

    <el-table :data="notices" stripe highlight-current-row>
      <el-table-column type="selection" width="55" />

      <template v-for="column in noticeListColumns" :key="column.prop">
        <!-- type 列 - 显示标签 -->
        <el-table-column v-if="column.prop === 'type'" :label="column.label" :width="column.width" align="center">
          <template #default="scope">
            <el-tag :color="getStatusColor(scope.row.type)">{{ scope.row.type }}</el-tag>
          </template>
        </el-table-column>

        <!-- readInfo 列 - 显示进度 -->
        <el-table-column v-else-if="column.prop === 'readInfo'" :label="column.label" :width="column.width" align="center">
          <template #default="scope">
            <el-progress :percentage="parseInt(getReadPercentage(scope.row.readCount, scope.row.totalCount))" :show-text="false" />
            <span class="read-text">{{ scope.row.readCount }}/{{ scope.row.totalCount }}</span>
          </template>
        </el-table-column>

        <!-- isRead 列 - 显示状态标签 -->
        <el-table-column v-else-if="column.prop === 'isRead'" :label="column.label" :width="column.width" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.isRead" type="success">已读</el-tag>
            <el-tag v-else type="info">未读</el-tag>
          </template>
        </el-table-column>

        <!-- 普通列 -->
        <el-table-column
          v-else
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :show-overflow-tooltip="column.showOverflowTooltip"
        />
      </template>

      <!-- 操作列 -->
      <el-table-column label="操作" width="200" fixed="right" align="center">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleMarkRead(scope.row)">标记已读</el-button>
          <el-button
            v-if="scope.row.attachment"
            link type="success"
            size="small"
            @click="handleDownload(scope.row)"
          >
            下载附件
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>
