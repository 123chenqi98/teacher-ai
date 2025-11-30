<script setup lang="ts">
import "@/assets/user/userDashboardCss/TodoListCss.css"
import { todoList, toggleTodoStatus } from "@/data/user/userDashboardData/TodoListData.ts"
import {ElButton, ElCard, ElCheckbox, ElCol} from "element-plus";
</script>

<template>
  <!-- 待办任务卡片 -->
  <el-col :span="24">
    <el-card shadow="hover" :border="false" class="todo-card">
      <div class="card-header">
        <h2 class="top-title">待办任务</h2>
        <el-button disabled type="primary" size="small" class="add-todo-btn">
          <i class="el-icon-plus mr-1"></i>新增任务
        </el-button>
      </div>

      <!-- 待办任务列表 -->
      <div class="todo-list">
        <div v-for="(item) in todoList" :key="item.id" class="todo-item">
          <el-checkbox
              v-model="item.completed"
              @change="toggleTodoStatus(item.id)"
              class="todo-checkbox"
          >
            <div class="todo-content">
              <div class="todo-title" :class="{ 'todo-completed': item.completed }">
                {{ item.title }}
                <span class="todo-priority" :class="`priority-${item.priority}`">
                            {{ item.priority === 'high' ? '紧急' : item.priority === 'medium' ? '普通' : '次要' }}
                          </span>
              </div>
              <div class="todo-deadline">
                <i class="el-icon-clock mr-1"></i>截止：{{ item.deadline }}
              </div>
            </div>
          </el-checkbox>
        </div>
      </div>
    </el-card>
  </el-col>
</template>

<style scoped>

</style>