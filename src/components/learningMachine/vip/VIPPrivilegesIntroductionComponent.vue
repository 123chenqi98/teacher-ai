<script setup lang="ts">

import {privileges} from "@/data/learningMachine/VipContentData.ts";
import {viewPrivilegeDetail} from "@/utils/learningMachine/VipContentUtils.ts";
import {ArrowRight, StarFilled} from "@element-plus/icons-vue";
</script>

<template>
  <div class="lm-section">
    <h2 class="lm-section-title">
      <el-icon>
        <StarFilled />
      </el-icon>
      VIP会员特权
    </h2>
    <div class="lm-vip-privileges">
      <el-row :gutter="20">
        <el-col
            v-for="privilege in privileges"
            :key="privilege.id"
            :xs="24"
            :sm="12"
            :md="8"
        >
          <div class="lm-privilege-card" @click="viewPrivilegeDetail(privilege)">
            <div class="lm-privilege-icon">{{ privilege.icon }}</div>
            <h3 class="lm-privilege-title">{{ privilege.title }}</h3>
            <p class="lm-privilege-description">{{ privilege.description }}</p>
            <div class="lm-privilege-action">
              <span>查看详情</span>
              <el-icon>
                <ArrowRight />
              </el-icon>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>

</style>