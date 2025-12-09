<script setup lang="ts">
import "@/assets/teacher/functionCss/GradingAreaCss.css"
import SectionHeaderComponent from "@/components/teacher/SectionHeaderComponent.vue";
import {ElMessage} from "element-plus";
import {gradingAssignments} from "@/data/teacher/funtion/GradingAreaData.ts";
import router from "@/router";

// 定义查看全部批改作业的处理函数
const ViewAllGradingAssignments = () => {
  ElMessage.success('查看全部批改专区')
}
</script>

<template>
  <!-- 批改专区容器 -->
  <div class="grading-area-container">
    <!-- 区间头组件：包含标题"批改专区"和"查看全部"按钮 -->
    <section-header-component
        title="批改专区"
        titleColor="#40389e"
        @viewAll="ViewAllGradingAssignments"
    />
    <!-- 作业卡片网格容器 -->
    <div class="assignments-grid">
      <!-- v-for循环遍历批改作业数据 -->
      <div
          v-for="(assignment) in gradingAssignments"
          :key="assignment.id"
          class="grading-card"
          @click="() => router.push(assignment.routerPath)"
      >
        <!-- 卡片顶部：标题+班级（左侧）、状态标签（右侧） -->
        <div class="card-top">
          <!-- 标题组：包含作业标题和班级名称 -->
          <div class="title-group">
            <!-- 作业标题 -->
            <el-icon> <component :is="assignment.icon"/></el-icon>
            <h3 class="assignment-title">{{ assignment.title }}</h3>
            <!-- 所属班级 -->
          </div>
        </div>
        <div class="card-bottom">
          <span>{{assignment.description}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
