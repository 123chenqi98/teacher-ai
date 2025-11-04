<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Check, Refresh } from '@element-plus/icons-vue'

// 微信二维码相关的响应式数据
const qrCodeUrl = ref('')
const isLoading = ref(true)
const scanStatus = ref('等待扫码') // 扫码状态: 等待扫码、已扫描、已取消、登录成功

// 模拟生成微信二维码
const generateQRCode = () => {
  // 实际开发中这里应该调用微信登录接口获取二维码
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
    const statuses = ['等待扫码', '二维码已扫描', '登录成功']
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    
    if (randomStatus === '登录成功') {
      scanStatus.value = randomStatus
      clearInterval(statusChecker)
      // 实际开发中这里应该执行登录成功后的操作
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
  <div class="wechat-login-container">
    <div class="header">
      <h3>微信扫码登录</h3>
    </div>
    
    <div class="qr-code-wrapper">
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
            
            <div v-if="scanStatus === '登录成功'" class="success-message">
              <el-icon color="#67C23A" size="20"><Check /></el-icon>
              <span>登录成功！正在跳转...</span>
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
    </div>

  </div>
</template>

<style scoped>
.wechat-login-container {
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  box-sizing: border-box;
}

.header {
  text-align: center;
}

.header h3 {
  margin: 0 0 10px 0;
  font-size: 22px;
  font-weight: 500;
  color: #333;
}



.qr-code-wrapper {
  background-color: #f8f8f8;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.qr-code-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.skeleton-img {
  width: 200px;
  height: 200px;
  border-radius: 8px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.loading-text {
  margin: 0;
  font-size: 14px;
  color: #999;
}

.qr-code-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.qr-code-box {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.qr-code-image {
  width: 180px;
  height: 180px;
  display: block;
}

.status-section {
  margin-top: 20px;
  text-align: center;
}

.scan-status {
  margin: 0;
  font-size: 15px;
  color: #666;
  font-weight: 500;
}

.success-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #67C23A;
  font-weight: 500;
  margin-top: 8px;
}

.refresh-section {
  margin-top: 20px;
}

.refresh-section :deep(.el-button) {
  font-size: 14px;
}


.login-options :deep(.el-button) {
  font-size: 14px;
  padding: 0;
}
</style>