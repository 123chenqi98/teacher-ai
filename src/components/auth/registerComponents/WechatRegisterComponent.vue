<script setup lang="ts">
import {Check, Refresh} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import "@/assets/auth/register/RegisterCss.css"



// 微信二维码相关的响应式数据
const qrCodeUrl = ref('')
const isLoading = ref(true)
const scanStatus = ref('等待扫码') // 扫码状态: 等待扫码、已扫描、已取消、注册成功

// 模拟生成微信二维码
const generateQRCode = () => {
  // 实际开发中这里应该调用微信注册接口获取二维码
  // 这里使用占位图片作为示例
  setTimeout(() => {
    qrCodeUrl.value = 'https://weixin.qq.com/cgi-bin/showqrcode?ticket=some_ticket_here'
    isLoading.value = false
  }, 1000)
}

// 模拟检查扫码状态
const checkScanStatus = () => {
  // 实际开发中这里应该是轮询检查扫码状态的API
  const statusChecker = setInterval(() => {
    // 模拟不同的扫码状态
    const statuses = ['等待扫码', '二维码已扫描', '注册成功']
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    if (randomStatus === '注册成功') {
      scanStatus.value = randomStatus
      clearInterval(statusChecker)
      // 实际开发中这里应该执行注册成功后的操作
      ElMessage.success('注册成功')
    } else {
      scanStatus.value = randomStatus
    }
  }, 3000)
}

// 刷新二维码
const refreshQRCode = () => {
  isLoading.value = true
  qrCodeUrl.value = ''
  scanStatus.value = '等待扫码'
  generateQRCode()
}



onMounted(() => {
  generateQRCode()
  checkScanStatus()
})
</script>

<template>
  <div class="qr-code-section">
    <div v-if="isLoading" class="loading">
      <el-skeleton animated>
        <template #template>
          <el-skeleton-item variant="image" class="skeleton-img" />
        </template>
      </el-skeleton>
      <p class="loading-text">正在加载二维码...</p>
    </div>

    <div v-else class="qr-code-content">
      <div class="qr-code-box">
        <img
            :src="qrCodeUrl"
            alt="微信二维码"
            class="qr-code-image"
        />
      </div>

      <div class="status-section">
        <p class="scan-status">{{ scanStatus }}</p>

        <div v-if="scanStatus === '注册成功'" class="success-message">
          <el-icon color="#67C23A" size="20"><Check /></el-icon>
          <span>注册成功！正在跳转...</span>
        </div>
      </div>
    </div>
  </div>

  <div v-if="!isLoading" class="refresh-section">
    <el-button @click="refreshQRCode" type="primary" link>
      <el-icon><Refresh /></el-icon>
      刷新二维码
    </el-button>
  </div>
</template>

<style scoped>

</style>