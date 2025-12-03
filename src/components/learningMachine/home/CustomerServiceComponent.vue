<script setup lang="ts">
import "@/assets/learningMachine/homeCss/CustomerServiceCss.css"
import { ElMessage } from "element-plus";
import { Headset, ChatDotRound } from "@element-plus/icons-vue";

const handleContactService = () => {
  ElMessage.success("已打开客服通道~");
};
</script>

<template>
  <div class="customer-service-container">
    <el-button class="base-service-btn" size="large">
      <span class="button-content-wrapper">
        <el-icon class="service-icon">
          <Headset />
        </el-icon>
        <span class="service-text">客服</span>
      </span>
    </el-button>

    <el-button type="danger" class="contact-service-btn" @click="handleContactService">
      <el-icon>
        <ChatDotRound />
      </el-icon>
      联系客服
    </el-button>
  </div>
</template>

<style scoped>
</style>