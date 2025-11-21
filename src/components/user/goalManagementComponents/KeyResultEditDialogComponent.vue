<script setup lang="ts">
import "@/assets/user/goalManagementCss/okr-management.css"
import {ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElInputNumber} from "element-plus";
import {keyResultDialogVisible} from "@/entity/auth/teacherInfo/GoalManagement.ts";
import {currentKeyResult} from "@/forms/user/teacherInfo/goalManagement/KeyResultForm.ts";
import {saveKeyResult} from "@/utils/user/teacher/info/goalManagement/KeyResultDataUtils.ts";
</script>

<template>
  <el-dialog v-model="keyResultDialogVisible" title="关键结果" width="500px" class="okr-dialog">
    <el-form :model="currentKeyResult" label-width="80px">
      <el-form-item label="KR标题">
        <el-input v-model="currentKeyResult.title" />
      </el-form-item>
      <el-form-item label="当前值">
        <el-input-number v-model="currentKeyResult.currentValue" :min="0" />
      </el-form-item>
      <el-form-item label="目标值">
        <el-input-number v-model="currentKeyResult.targetValue" :min="0" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="okr-dialog-footer">
        <el-button @click="keyResultDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveKeyResult">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>