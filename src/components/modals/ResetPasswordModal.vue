<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ userName: string; width?: string | number }>()
const width = props.width ?? 460
const visible = ref(true)
const pwd = ref('')
const confirmPwd = ref('')
const emit = defineEmits<{ (e: 'confirm', payload: any): void; (e: 'close'): void }>()

function genRandom() {
  const s = Math.random().toString(36).slice(2, 10) + 'A!7'
  pwd.value = s
  confirmPwd.value = s
}

function onConfirm() {
  if (!pwd.value || pwd.value !== confirmPwd.value) return
  emit('confirm', { password: pwd.value })
}
</script>

<template>
  <el-dialog v-model="visible" :title="'重置密码 - ' + userName" :width="width" append-to-body @closed="emit('close')">
    <div class="tips">为保证安全，请设置强密码（至少8位，包含大小写与符号）。</div>
    <el-form label-width="88px">
      <el-form-item label="新密码">
        <el-input v-model="pwd" type="password" show-password />
        <el-button size="small" text type="primary" @click="genRandom">生成强密码</el-button>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="confirmPwd" type="password" show-password />
        <el-text type="danger" v-if="pwd && confirmPwd && pwd!==confirmPwd">两次输入不一致</el-text>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="emit('close')">取消</el-button>
      <el-button :disabled="!pwd || pwd!==confirmPwd" type="warning" @click="onConfirm">确认重置</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.tips { margin-bottom: 8px; color: var(--color-muted); }
</style>