<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ userName: string; currentRisk: 'low'|'medium'|'high'; width?: string | number }>()
const width = props.width ?? 520
const visible = ref(true)
const risk = ref<'low'|'medium'|'high'>(props.currentRisk)
const reason = ref('')
const emit = defineEmits<{ (e: 'confirm', payload: any): void; (e: 'close'): void }>()

function onConfirm() { emit('confirm', { risk: risk.value, reason: reason.value }) }
</script>

<template>
  <el-dialog v-model="visible" :title="'风险标记 - ' + userName" :width="width" append-to-body @closed="emit('close')">
    <div class="desc">选择风险等级并填写标记原因，便于后续审计与管控。</div>
    <el-form label-width="100px">
      <el-form-item label="风险等级">
        <el-radio-group v-model="risk">
          <el-radio-button label="low">低</el-radio-button>
          <el-radio-button label="medium">中</el-radio-button>
          <el-radio-button label="high">高</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标记原因">
        <el-input v-model="reason" type="textarea" :rows="3" placeholder="例如：频繁异常登录、短时大量操作等" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="emit('close')">取消</el-button>
      <el-button type="danger" @click="onConfirm">确认标记</el-button>
    </template>
  </el-dialog>
  
</template>

<style scoped>
.desc { margin-bottom: 8px; color: var(--color-muted); }
</style>