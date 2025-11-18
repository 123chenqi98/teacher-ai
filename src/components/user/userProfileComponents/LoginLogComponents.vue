<script setup lang="ts">
import { activeTab } from "@/data/user/userProfileData/PersonalInformationData.ts";
import { loginLogs } from "@/data/user/userProfileData/LoginLogData.ts";
import "@/assets/user/userProfileCss/LoginLogCss.css"
</script>

<template>
  <div class="profile-tab" v-if="activeTab === 'login-log'">
    <!-- 登录日志标签页内容（由父级卡片承载容器） -->
      <el-table :data="loginLogs" stripe style="width: 100%" class="login-log-tab">
        <el-table-column prop="time" label="登录时间" width="180" />
        <el-table-column prop="device" label="设备" />
        <el-table-column prop="ip" label="IP 地址" width="140" />
        <el-table-column prop="location" label="位置" width="120" />
        <el-table-column prop="status" label="状态" width="100" />
      </el-table>
  </div>
</template>

<style scoped>

</style>