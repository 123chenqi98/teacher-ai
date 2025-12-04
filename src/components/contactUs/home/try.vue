<template>
  <!-- 命名空间容器：承接CSS变量 + 隔离样式 -->
  <div
      class="contact-info"
      :style="{
      '--theme-color': themeColor,
      '--card-bg': cardBg,
      '--text-color': textColor,
      '--card-shadow': cardShadow
    }"
  >
    <!-- Element Plus栅格系统：替代原生flex，适配响应式 -->
    <el-row :gutter="24">
      <!-- 电话卡片 -->
      <el-col
          v-if="showPhone"
          :xs="24" :sm="12" :md="8"
      >  <!-- 响应式栅格：移动端占满，平板半宽，PC三分屏 -->
        <el-card
            @mouseenter="handleHover(true, 'phone')"
            @mouseleave="handleHover(false, 'phone')"
        >
          <!-- Element Plus图标容器 -->
          <div
              class="contact-icon-wrapper"
              :class="{ 'hover-active': hoverStates.phone }"
          >
            <el-icon><Phone /></el-icon>
          </div>
          <div class="contact-content">
            <p class="contact-title">电话</p>
            <!-- Element Plus链接：替代原生a标签 -->
            <el-link :href="`tel:${phone}`" type="default" underline="false">
              {{ phone }}
            </el-link>
          </div>
        </el-card>
      </el-col>

      <!-- 邮箱卡片 -->
      <el-col
          v-if="showEmail"
          :xs="24" :sm="12" :md="8"
      >
        <el-card
            @mouseenter="handleHover(true, 'email')"
            @mouseleave="handleHover(false, 'email')"
        >
          <div
              class="contact-icon-wrapper email"
              :class="{ 'hover-active': hoverStates.email }"
          >
            <el-icon><Message /></el-icon>
          </div>
          <div class="contact-content">
            <p class="contact-title">邮箱</p>
            <el-link :href="`mailto:${email}`" type="default" underline="false">
              {{ email }}
            </el-link>
          </div>
        </el-card>
      </el-col>

      <!-- 地址卡片 -->
      <el-col
          v-if="showAddress"
          :xs="24" :sm="12" :md="8"
      >
        <el-card
            @mouseenter="handleHover(true, 'address')"
            @mouseleave="handleHover(false, 'address')"
        >
          <div
              class="contact-icon-wrapper address"
              :class="{ 'hover-active': hoverStates.address }"
          >
            <el-icon><Location /></el-icon>
          </div>
          <div class="contact-content">
            <p class="contact-title">地址</p>
            <el-link
                :href="getMapLink()"
                type="default"
                underline="false"
                target="_blank"
                rel="opener noreferrer"
            >
              {{ address }}
            </el-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 导入独立CSS文件
import '@/assets/contactUs/homeCss/try.css';

// 导入Vue3核心API
import { ref, defineProps, defineOptions } from 'vue';

// 导入Element Plus组件 + 图标
import { ElRow, ElCol, ElCard, ElLink, ElIcon } from 'element-plus';
import { Phone, Message, Location } from '@element-plus/icons-vue';


// 定义组件名称（调试用）
defineOptions({
  name: 'ContactInfo'
});
// 1. 定义合法的卡片类型（核心：限制 type 只能是这三个值）
type ContactCardType = 'phone' | 'email' | 'address';
// 定义Props（保持原有逻辑不变）

const props = defineProps({
  phone: {
    type: String,
    default: '138-0000-8888'
  },
  email: {
    type: String,
    default: 'contact@example.com'
  },
  address: {
    type: String,
    default: '北京市朝阳区建国路88号'
  },
  showPhone: {
    type: Boolean,
    default: true
  },
  showEmail: {
    type: Boolean,
    default: true
  },
  showAddress: {
    type: Boolean,
    default: true
  },
  themeColor: {
    type: String,
    default: '#42b983'
  },
  cardBg: {
    type: String,
    default: '#ffffff'
  },
  textColor: {
    type: String,
    default: '#333333'
  },
  cardShadow: {
    type: String,
    default: '0 4px 12px rgba(0, 0, 0, 0.08)'
  }
});

// 响应式状态（保持原有逻辑不变）
const hoverStates = ref<Record<ContactCardType, boolean>>({
  phone: false,
  email: false,
  address: false
});

// 方法定义（保持原有逻辑不变）
const handleHover = (isHover: boolean, type: ContactCardType) => {
  hoverStates.value[type] = isHover;
};

const getMapLink = () => {
  const encodedAddress = encodeURIComponent(props.address);
  return `https://api.map.baidu.com/geocoder?address=${encodedAddress}&output=html`;
};
</script>

<!-- 组件内无scoped样式，所有样式都在独立css文件中 -->
<style></style>