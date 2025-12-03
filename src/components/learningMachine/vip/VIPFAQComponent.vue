<script setup lang="ts">

import {expandedFaq} from "@/utils/learningMachine/VipContentUtils.ts";
import {faqs} from "@/data/learningMachine/VipContentData.ts";
import {StarFilled, Warning} from "@element-plus/icons-vue";
</script>

<template>
  <div class="lm-section">
    <h2 class="lm-section-title">
      <el-icon>
        <StarFilled />
      </el-icon>
      常见问题
    </h2>
    <div class="lm-faq">
      <el-collapse v-model="expandedFaq">
        <el-collapse-item v-for="faq in faqs" :key="faq.id" :name="faq.id">
          <template #title>
            <el-icon>
              <Warning />
            </el-icon>
            {{ faq.question }}
          </template>
          <div class="lm-faq-answer">{{ faq.answer }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style scoped>

</style>