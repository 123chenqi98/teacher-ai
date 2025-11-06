<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ width?: string | number; defaultRange?: [Date | null, Date | null] }>()
const width = props.width ?? 520
const visible = ref(true)
const range = ref<[Date | null, Date | null]>(props.defaultRange ?? [null, null])
const format = ref<'csv' | 'json'>('csv')
const emit = defineEmits<{ (e: 'confirm', payload: any): void; (e: 'close'): void }>()

function onConfirm() {
  emit('confirm', { range: range.value, format: format.value })
}
</script>

<template>
  <el-dialog v-model="visible" title="导出审计日志" :width="width" append-to-body @closed="emit('close')">
    <el-form label-width="88px">
      <el-form-item label="时间范围">
        <el-date-picker v-model="range" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%" />
      </el-form-item>
      <el-form-item label="导出格式">
        <el-radio-group v-model="format">
          <el-radio-button label="csv">CSV</el-radio-button>
          <el-radio-button label="json">JSON</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="emit('close')">取消</el-button>
      <el-button type="info" @click="onConfirm">导出</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>