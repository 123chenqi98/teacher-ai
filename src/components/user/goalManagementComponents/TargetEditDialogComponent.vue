<script setup lang="ts">
import "@/assets/user/goalManagementCss/okr-management.css"
import {ElButton, ElDatePicker, ElDialog, ElForm, ElFormItem, ElInput} from "element-plus";
import {dialogVisible, editMode} from "@/entity/auth/teacherInfo/GoalManagement.ts";
import {currentObjective} from "@/forms/user/teacherInfo/goalManagement/TargetEditForm.ts";
import {saveObjective} from "@/utils/user/teacher/info/goalManagement/DataUtlis.ts";
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="editMode ? '编辑目标' : '添加目标'" width="500px" class="okr-dialog">
    <el-form :model="currentObjective" label-width="80px">
      <el-form-item label="目标标题">
        <el-input v-model="currentObjective.title" />
      </el-form-item>
      <el-form-item label="目标描述">
        <el-input v-model="currentObjective.description" type="textarea" />
      </el-form-item>
      <el-form-item label="截止日期">
        <el-date-picker v-model="currentObjective.deadline" type="date" placeholder="选择日期" style="width: 100%" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="okr-dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveObjective">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>