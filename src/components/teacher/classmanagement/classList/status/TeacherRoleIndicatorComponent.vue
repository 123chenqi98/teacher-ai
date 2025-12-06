<script setup lang="ts">
import '@/assets/teacher/classmanagementCss/classList/ClassListCommonCss.css'
import '@/assets/teacher/classmanagementCss/classList/TeacherRoleIndicatorCss.css'
import RoleSectionComponent from './RoleSectionComponent.vue'
import { classListStatic } from '@/data/teacher/classmanagement/ClassListData.ts'
import {
  teacherRoleIndicatorText,
  roleTypesConfig,
  type ClassItemWithRole,
  type TeacherRoleType
} from '@/data/teacher/classmanagement/TeacherRoleData.ts'
import { computed } from 'vue'

const teacherRoles = computed<ClassItemWithRole[]>(() => {
  return classListStatic.map((cls) => ({
    classId: cls.classId,
    className: cls.className,
    role: (cls.classId === 'class_001' ? 'headTeacher' : 'subjectTeacher') as TeacherRoleType
  }))
})

const headTeacherClasses = computed(() =>
  teacherRoles.value.filter((item) => item.role === 'headTeacher')
)
const subjectTeacherClasses = computed(() =>
  teacherRoles.value.filter((item) => item.role === 'subjectTeacher')
)
</script>

<template>
  <div class="teacher-role-indicator">
    <el-card>
      <template #header>
        <div class="teacher-role-header">
          <span class="teacher-role-title">{{ teacherRoleIndicatorText.cardTitle }}</span>
          <el-tag type="success">
            {{ teacherRoleIndicatorText.headTeacherCount(headTeacherClasses.length) }}
          </el-tag>
        </div>
      </template>

      <!-- 班主任班级 -->
      <role-section-component
        :label="roleTypesConfig[0].label"
        :classes="headTeacherClasses"
        :tag-type="roleTypesConfig[0].tagType"
        :empty-description="roleTypesConfig[0].emptyDescription"
      />

      <el-divider />

      <!-- 科任班级 -->
      <role-section-component
        :label="roleTypesConfig[1].label"
        :classes="subjectTeacherClasses"
        :tag-type="roleTypesConfig[1].tagType"
        :empty-description="roleTypesConfig[1].emptyDescription"
      />
    </el-card>
  </div>
</template>
