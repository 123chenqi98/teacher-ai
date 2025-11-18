<script setup lang="ts">
import "@/assets/teacher/functionCss/GradingAreaCss.css"
import SectionHeaderComponent from "@/components/teacher/SectionHeaderComponent.vue";
import {ElMessage} from "element-plus";
import {gradingAssignments} from "@/data/teacher/funtion/GradingAreaData.ts";

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
      >
        <!-- 卡片顶部：标题+班级（左侧）、状态标签（右侧） -->
        <div class="card-top">
          <!-- 标题组：包含作业标题和班级名称 -->
          <div class="title-group">
            <!-- 作业标题 -->
            <h3 class="assignment-title">{{ assignment.title }}</h3>
            <!-- 所属班级 -->
            <p class="assignment-class">{{ assignment.className }}</p>
          </div>
          <!-- 状态标签：批改中/已完成/待批改 -->
          <span class="status-badge" :style="{ backgroundColor: assignment.statusColor }">
            {{ assignment.statusLabel }}
          </span>
        </div>

        <!-- 进度条区域：进度条（左侧）、进度数字（右侧） -->
        <div class="progress-section">
          <!-- 进度条外层包装器 -->
          <div class="progress-bar-wrapper">
            <!-- 进度条背景 -->
            <div class="progress-bar-background">
              <!-- 进度条填充：根据完成数/总数计算百分比宽度 -->
              <div
                  class="progress-bar-fill"
                  :style="{
                    width: (assignment.completed / assignment.total * 100) + '%',
                    backgroundColor: assignment.progressColor
                  }"
              ></div>
            </div>
          </div>
          <!-- 进度数字显示：已完成数/总数 -->
          <p class="progress-text">{{ assignment.completed }}/{{ assignment.total }}</p>
        </div>

        <!-- 卡片底部：截止时间（左侧）、操作链接（右侧） -->
        <div class="card-bottom">
          <!-- 截止时间显示 -->
          <span class="deadline">截止时间: {{ assignment.deadline }}</span>
          <!-- 操作链接：继续批改/查看报告/开始批改 -->
          <a href="#" class="action-link">{{ assignment.actionText }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
