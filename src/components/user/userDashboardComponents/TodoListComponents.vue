<script setup lang="ts">
import "@/assets/user/userDashboardCss/TodoListCss.css"
import { todoList } from "@/data/user/userDashboardData/TodoListData.ts"
import {ElButton, ElCard, ElCheckbox, ElCol} from "element-plus";
import { ref } from 'vue'
import { todoDialogVisible, todoForm, todoRules, openTodoDialog, closeTodoDialog, resetTodoForm } from '@/forms/user/teacherInfo/userDashboardForms/TodoListForms.ts'

type FormInstance = any
const todoFormRef = ref<FormInstance>()

// 提交任务
const submitTodo = () => {
  if (!todoFormRef.value || !('validate' in todoFormRef.value)) return
  ;(todoFormRef.value as any).validate((valid: boolean) => {
    if (!valid) return
    const newId = todoList.value.length ? Math.max(...todoList.value.map(i => i.id)) + 1 : 1
    todoList.value.push({
      id: newId,
      title: todoForm.value.title,
      priority: todoForm.value.priority,
      deadline: todoForm.value.deadline,
      completed: todoForm.value.completed,
    })
    closeTodoDialog()
    resetTodoForm()
  })
}
</script>

<template>
  <!-- 待办任务卡片 -->
  <el-col :span="24">
    <el-card shadow="hover" :border="false" class="todo-card">
      <div class="card-header">
        <h2 class="top-title">待办任务</h2>
        <el-button type="primary" size="small" class="add-todo-btn" @click="openTodoDialog">
          <i class="el-icon-plus mr-1"></i>新增任务
        </el-button>
      </div>

      <!-- 待办任务列表 -->
      <div class="todo-list">
        <div v-for="(item) in todoList" :key="item.id" class="todo-item">
          <el-checkbox v-model="item.completed" class="todo-checkbox">
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

      <el-dialog v-model="todoDialogVisible" title="新增任务" width="480px" @close="resetTodoForm">
        <el-form :model="todoForm" :rules="todoRules" ref="todoFormRef" label-width="90px">
          <el-form-item label="任务标题" prop="title">
            <el-input v-model="todoForm.title" maxlength="50" show-word-limit placeholder="请输入任务标题" />
          </el-form-item>
          <el-form-item label="优先级" prop="priority">
            <el-select v-model="todoForm.priority" placeholder="请选择优先级">
              <el-option label="紧急" value="high" />
              <el-option label="普通" value="medium" />
              <el-option label="次要" value="low" />
            </el-select>
          </el-form-item>
          <el-form-item label="截止时间" prop="deadline">
            <el-input v-model="todoForm.deadline" placeholder="例如：今天 18:00" />
          </el-form-item>
          <el-form-item label="已完成">
            <el-checkbox v-model="todoForm.completed"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="() => { closeTodoDialog(); resetTodoForm() }">取消</el-button>
          <el-button type="primary" @click="submitTodo">确定</el-button>
        </template>
      </el-dialog>
    </el-card>
  </el-col>
</template>

<style scoped>

</style>
