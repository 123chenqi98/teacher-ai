<script setup lang="ts">

import router from "@/router";

const props = defineProps<{
  submitPhoneForm: () => void
}>()

</script>

<template>
  <div class="form-actions">
    <el-button  @click="submitPhoneForm" class="button-register">
      注册
    </el-button>
    <el-link @click="()=>{router.push('/login')}" class="login-link">
      已有账号？立即登录
    </el-link>
  </div>
</template>

<style scoped>
/*注册按钮*/
.button-register{
  width: 100%;
  height: 35px;
  background: rgb(170, 173, 93);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  color: #131319;
  margin-top: 10px;
  font-size: 1.2rem;
}
</style>