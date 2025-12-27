<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import '@/assets/contactUs/homeCss/ContactUsInformationCss.css';

// 导入类型和默认值（注意：导入类型时加 type 关键字）
import type { ContactInfoProps } from "@/data/contactUs/ContactUsInformationData.ts";
import { contactInfoDefaultProps } from "@/data/contactUs/ContactUsInformationData.ts";
import { getMapLink ,section1} from "@/utils/contactUs/ContactUsInformationUtils.ts";
// 导入 Element Plus 组件和图标
import { Location, Message, Phone } from "@element-plus/icons-vue";
import { ElIcon, ElLink, ElCard } from "element-plus";

// 核心：在组件内正确声明 Props（结合类型 + 默认值）
const props = withDefaults(
    defineProps<ContactInfoProps>(),
    contactInfoDefaultProps
);

</script>


<template>
  <div
      ref="section1"
      id="section1"
      class="contact-info-box contact-props-container"
      :style="{
      '--text-color': props.textColor,
      '--theme-color': props.themeColor,
      '--card-border-color': props.cardBorderColor
    }"
  >
    <!-- 电话卡片 -->
    <el-card class="contact-card">
      <div class="card-inner">
        <div class="contact-image">
          <el-icon><Phone /></el-icon>
        </div>
        <div class="contact-content">
          <h3 class="contact-title">电话:</h3>
          <el-link :href="`tel:${props.phone}`" underline="never">
            {{ props.phone }}
          </el-link>
        </div>
      </div>
    </el-card>

    <!-- 邮箱卡片 -->
    <el-card class="contact-card">
      <div class="card-inner">
        <div class="contact-image">
          <el-icon><Message /></el-icon>
        </div>
        <div class="contact-content">
          <h3 class="contact-title">邮箱:</h3>
          <el-link :href="`mailto:${props.email}`" underline="never">
            {{ props.email }}
          </el-link>
        </div>
      </div>
    </el-card>

    <!-- 地址卡片：通过 showAddress 控制显示 -->
    <el-card class="contact-card" v-if="props.showAddress">
      <div class="card-inner">
        <div class="contact-image">
          <el-icon><Location /></el-icon>
        </div>
        <div class="contact-content">
          <h3 class="contact-title">地址</h3>
          <!-- 修复：调用 getMapLink 时传入 address 参数 -->
          <el-link :href="getMapLink(props.address)" underline="never">
            {{ props.address }}
          </el-link>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped></style>