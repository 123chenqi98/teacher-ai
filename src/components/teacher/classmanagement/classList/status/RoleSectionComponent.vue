<script setup lang="ts">
import '@/assets/teacher/classmanagementCss/classList/RoleSectionCss.css'
import { roleBadgeImageSize } from '@/data/teacher/classmanagement/TeacherRoleData.ts'

interface ClassItem {
  classId: string
  className: string
}

interface Props {
  label: string
  classes: ClassItem[]
  tagType?: 'success' | 'info' | 'warning' | 'danger'
  emptyDescription?: string
}

withDefaults(defineProps<Props>(), {
  tagType: 'info',
  emptyDescription: '暂无数据'
})
</script>

<template>
  <div class="role-section">
    <div class="role-section-title">
      <el-badge :value="classes.length" class="item" />
      <span class="role-section-label">{{ label }}</span>
    </div>
    <div class="role-tags-container">
      <el-tag
        v-for="cls in classes"
        :key="cls.classId"
        :type="tagType"
        class="role-tag"
      >
        {{ cls.className }}
      </el-tag>
      <el-empty
        v-if="classes.length === 0"
        :description="emptyDescription"
        :image-size="roleBadgeImageSize"
      />
    </div>
  </div>
</template>
