<script setup lang="ts">

import {growthSystem} from "@/data/learningMachine/VipContentData.ts";
import {Check, Trophy} from "@element-plus/icons-vue";
</script>

<template>
  <div class="lm-section">
    <h2 class="lm-section-title">
      <el-icon>
        <Trophy />
      </el-icon>
      会员成长体系
    </h2>
    <div class="lm-growth-system">
      <el-row :gutter="20">
        <el-col
            v-for="(level, index) in growthSystem"
            :key="index"
            :xs="24"
            :sm="12"
            :md="6"
        >
          <div class="lm-growth-level-card">
            <div class="lm-level-header">
              <h3 class="lm-level-name">{{ level.level }}</h3>
              <p class="lm-level-condition">{{ level.condition }}</p>
            </div>
            <ul class="lm-level-benefits">
              <li v-for="(benefit, bIndex) in level.benefits" :key="bIndex" class="lm-benefit-item">
                <el-icon color="#67c23a">
                  <Check />
                </el-icon>
                <span>{{ benefit }}</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>

</style>