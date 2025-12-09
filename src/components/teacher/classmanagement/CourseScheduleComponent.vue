<script setup lang="ts">
import { courseWeekViewStatic, courseChangeNoticeStatic } from "@/data/teacher/classmanagement/ClassDetailCourseData.ts"
import ClassSelectionHeaderComponent from "@/components/teacher/classmanagement/common/ClassSelectionHeaderComponent.vue"
import { computed, ref } from "vue"
import "@/assets/teacher/classmanagementCss/CourseScheduleCss.css"

interface Course {
  courseName: string
  teacher: string
  classroom: string
}

interface CourseSlot {
  timeSlot: string
  monday: Course | string
  tuesday: Course | string
  wednesday: Course | string
  thursday: Course | string
  friday: Course | string
  saturday: Course | string
  sunday: string
}

interface CourseChange {
  id: string
  title: string
  type: string
  originalCourse: string
  changeContent: string
  time: string
  classroom: string
  publishTime: string
}

interface TableRow {
  timeSlot: string
  [key: string]: string | Course
}

const DAYS = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
const DAY_KEYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const

const getCourseDisplay = (courseData: Course | string): string => {
  if (typeof courseData === 'string') {
    return courseData
  }
  if (courseData && typeof courseData === 'object' && 'courseName' in courseData) {
    return `${courseData.courseName}\n${courseData.teacher}\n${courseData.classroom}`
  }
  return ''
}

const tableData = computed<TableRow[]>(() => {
  return (courseWeekViewStatic as CourseSlot[]).map((slot: CourseSlot) => {
    const row: TableRow = {
      timeSlot: slot.timeSlot
    }
    DAY_KEYS.forEach((day: typeof DAY_KEYS[number], index: number) => {
      row[`day${index}`] = slot[day]
    })
    return row
  })
})

const notices = computed<CourseChange[]>(() => courseChangeNoticeStatic)

// 班级切换处理
const currentClassId = ref('')
const handleClassChange = (classId: string) => {
  currentClassId.value = classId
  console.log(`课程表模块 - 班级切换为: ${classId}`)
  // 这里后续可以添加重新获取课程表的逻辑
}
</script>

<template>
  <div class="course-schedule-container">
    <class-selection-header-component @class-change="handleClassChange" />
    
    <!-- 课程表 -->
    <el-card class="schedule-card">
      <template #header>
        <div class="card-header">
          <span class="card-title">课程表（周视图）</span>
        </div>
      </template>

      <el-table :data="tableData" :default-sort="{ prop: 'timeSlot', order: 'ascending' }" stripe>
        <el-table-column prop="timeSlot" label="时间" width="100" fixed="left" align="center" />
        <el-table-column
          v-for="(day, index) in DAYS"
          :key="`day-${index}`"
          :prop="`day${index}`"
          :label="day"
          min-width="140"
          align="center"
        >
          <template #default="scope">
            <div class="course-cell">
              {{ getCourseDisplay(scope.row[`day${index}`]) }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 课程变动通知 -->
    <el-card class="notice-card">
      <template #header>
        <div class="card-header">
          <span class="card-title">课程变动通知</span>
        </div>
      </template>
      <el-timeline v-if="notices.length > 0">
        <el-timeline-item
          v-for="notice in notices"
          :key="notice.id"
          :timestamp="notice.publishTime"
          placement="top"
        >
          <div class="notice-content">
            <h4>{{ notice.title }}</h4>
            <p><strong>变动类型：</strong><el-tag type="warning">{{ notice.type }}</el-tag></p>
            <p><strong>原课程：</strong>{{ notice.originalCourse }}</p>
            <p><strong>变动内容：</strong>{{ notice.changeContent }}</p>
            <p><strong>时间：</strong>{{ notice.time }}</p>
            <p><strong>教室：</strong>{{ notice.classroom }}</p>
          </div>
        </el-timeline-item>
      </el-timeline>
      <div v-else class="empty-state">
        <el-empty description="暂无课程变动通知" />
      </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>
