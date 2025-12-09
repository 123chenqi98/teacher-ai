<script setup lang="ts">
import { classBaseInfoStatic, jumpEntryStatic, infoItems } from "@/data/teacher/classmanagement/ClassDetailBaseInfoData.ts"
import ClassSelectionHeaderComponent from "@/components/teacher/classmanagement/common/ClassSelectionHeaderComponent.vue"
import { computed, ref } from "vue"
import "@/assets/teacher/classmanagementCss/ClassDetailCss.css"

interface BaseInfo {
  classId: string
  className: string
  grade: string
  mainSubject: string
  createTime: string
  headTeacher: string
  contactPhone: string
  classIntro: string
}

interface JumpEntry {
  name: string
  icon: string
  path: string
  desc: string
}

const classInfo = computed<BaseInfo>(() => classBaseInfoStatic)
const entries = computed<JumpEntry[]>(() => jumpEntryStatic)

// 班级切换处理
const currentClassId = ref('')
const handleClassChange = (classId: string) => {
  currentClassId.value = classId
  console.log(`班级详情模块 - 班级切换为: ${classId}`)
  // 这里后续可以添加重新获取班级详情的逻辑
}

const handleNavigate = (path: string): void => {
  // 待实现：实际路由导航逻辑
  console.log(`导航到: ${path}`)
}
</script>

<template>
  <div class="class-detail-container">
    <class-selection-header-component @class-change="handleClassChange" />

    <!-- 班级基础信息卡片 -->
    <el-card class="base-info-card">
      <template #header>
        <div class="card-header">
          <span class="card-title">班级基础信息</span>
        </div>
      </template>

      <div class="info-grid">
        <div v-for="item in infoItems" :key="item.key" class="info-item">
          <span class="label">{{ item.label }}：</span>
          <span class="value">{{ classInfo[item.key as keyof BaseInfo] }}</span>
        </div>
      </div>

      <div class="info-intro">
        <span class="label">班级简介：</span>
        <p class="intro-text">{{ classInfo.classIntro }}</p>
      </div>
    </el-card>

    <!-- 功能快速入口 -->
    <el-card class="entry-card">
      <template #header>
        <div class="card-header">
          <span class="card-title">功能快速入口</span>
        </div>
      </template>

      <div class="entry-grid">
        <div
          v-for="entry in entries"
          :key="entry.name"
          class="entry-item"
          @click="handleNavigate(entry.path)"
        >
          <div class="entry-icon">
            <i :class="entry.icon"></i>
          </div>
          <div class="entry-info">
            <h4 class="entry-name">{{ entry.name }}</h4>
            <p class="entry-desc">{{ entry.desc }}</p>
          </div>
          <el-icon class="entry-arrow"><i class="el-icon-arrow-right"></i></el-icon>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>
