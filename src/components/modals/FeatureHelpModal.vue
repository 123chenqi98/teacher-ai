<script setup lang="ts">
import { ref } from 'vue'
const props = withDefaults(defineProps<{ featureName: string; description?: string; width?: string | number }>(), {
  description: '此功能的详细说明与使用指引。',
  width: 520,
})
const visible = ref(true)
const emit = defineEmits<{ (e: 'confirm'): void; (e: 'close'): void }>()
</script>

<template>
  <el-dialog v-model="visible" :title="featureName + ' 功能说明'" :width="width" append-to-body @closed="emit('close')">
    <div class="content">
      <el-text type="primary">{{ description }}</el-text>
      <div class="tips">
        - 可在此处展示图例、步骤说明或注意事项。
      </div>
    </div>
    <template #footer>
      <el-button @click="emit('close')">关闭</el-button>
      <el-button type="primary" @click="emit('confirm')">我知道了</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.content { display: grid; gap: 8px; }
.tips { color: var(--color-muted); font-size: 12px; }
</style>