<script setup lang="ts">

import {vipEvents} from "@/data/learningMachine/VipContentData.ts";
import {Calendar, Timer} from "@element-plus/icons-vue";
</script>

<template>
  <div class="lm-section">
    <h2 class="lm-section-title">
      <el-icon>
        <Calendar />
      </el-icon>
      VIP专属活动
    </h2>
    <div class="lm-vip-events">
      <el-row :gutter="20">
        <el-col v-for="event in vipEvents" :key="event.id" :xs="24" :sm="12" :md="6">
          <div class="lm-event-card">
            <div class="lm-event-icon">{{ event.icon }}</div>
            <h3 class="lm-event-title">{{ event.title }}</h3>
            <p class="lm-event-description">{{ event.description }}</p>
            <div class="lm-event-date">
              <el-icon>
                <Timer />
              </el-icon>
              <span>{{ event.date }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>

</style>