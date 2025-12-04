<script setup lang="ts">
import '@/assets/contactUs/homeCss/ContactUsInformationCss.css'
// 1. 补充Props定义（解决v-bind样式变量失效）
import { defineProps } from 'vue'
import {Location, Message, Phone} from "@element-plus/icons-vue";
import {ElIcon, ElLink} from "element-plus";

// 定义组件接收的样式属性（可外部传值，也可使用默认值）
const props = defineProps({
  phone:{
    type:String,
    default:"400-123-4567"
  },
  email:{
    type: String,
    default:" contact@example.com"
  },
  address: {
    type: String,
    default: '玉林市玉州区'
  },
  textColor: {
    type: String,
    default: '#333333' // 文字默认颜色
  },
  themeColor: {
    type: String,
    default: '#bd3131' // 主题色（匹配背景色的紫色系）
  },
  cardBorderColor: {
    type: String,
    default: '#2066e0' // 卡片边框默认色
  },
  showAddress: {
    type: Boolean,
    default: true
  },
})

const getMapLink = () => {
  const encodedAddress = encodeURIComponent( props.address);
  return `https://api.map.baidu.com/geocoder?address=${encodedAddress}&output=html`;
};
</script>


<template>
<div class="contact-info-box contact-props-container"
     :style="{
      '--text-color': props.textColor,       // 文字色变量
      '--theme-color': props.themeColor,     // 主题色变量
      '--card-border-color': props.cardBorderColor, // 边框色变量
        // 新增：主题色透明版变量（用于图标hover）
      // '--theme-color-light': `rgba(${props.themeColor.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16)).join(',')}, 0.7)`
    }"
>

          <!--电话卡片-->
    <el-card class="contact-card">
        <!--头像-->
      <div class="card-inner"> <!-- 包裹内部元素，控制布局 -->
        <div class="contact-image" >
          <el-icon><Phone /></el-icon>
          <i class="fas fa-phone-alt"></i> <!-- 电话图标 -->
        </div>
            <!--文字信息-->
        <div class="contact-content">
          <h3 class="contact-title">电话:</h3>
          <el-link
              :href="`tel:${phone}`"
              underline="never"
          >
              {{phone}}
          </el-link>
        </div>
      </div>
    </el-card>


            <!--邮箱卡片-->
    <el-card class="contact-card">
      <!--头像-->
      <div class="card-inner"> <!-- 包裹内部元素，控制布局 -->
        <div class="contact-image">
          <el-icon><Message /></el-icon>
          <i class="fas fa-envelope"></i> <!-- 邮箱图标 -->
        </div>
      <!--文字信息-->
        <div class="contact-content">
          <h3 class="contact-title">邮箱:</h3>
          <el-link
              :href="`mailto:${email}`"
              underline="never"
          >
            {{email}}
          </el-link>
        </div>
      </div>
    </el-card>


             <!--地址卡片-->

        <el-card class="contact-card">
          <!--头像-->
          <div class="card-inner"> <!-- 包裹内部元素，控制布局 -->
            <div class="contact-image">
              <el-icon><Location /></el-icon>
              <i class="fas fa-map-marker-alt"></i> <!-- 地址图标 -->
            </div>
            <!--文字信息-->
            <div class="contact-content">
              <h3 class="contact-title">地址</h3>
              <el-link
                  :href="getMapLink()"
                  underline="never"
              >
                {{ address }}
              </el-link>
            </div>
          </div>
        </el-card>

  </div>
</template>

<style scoped></style>