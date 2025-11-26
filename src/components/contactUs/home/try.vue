<template>
  <div class="contact-card-container">
    <!-- 电话卡片 -->
    <div
        v-if="showPhone"
        class="contact-card"
        :style="cardStyle"
        @mouseenter="handleHover(true, 'phone')"
        @mouseleave="handleHover(false, 'phone')"
    >
      <div class="contact-image" :class="{'phone-hover': hoverStates.phone}">
        <i class="fas fa-phone-alt"></i>
      </div>
      <div class="contact-content">
        <h3 class="contact-title">电话</h3>
        <a
            :href="`tel:${phone}`"
            class="contact-value"
            :style="linkStyle"
        >
          {{ phone }}
        </a>
      </div>
    </div>

    <!-- 邮箱卡片 -->
    <div
        v-if="showEmail"
        class="contact-card"
        :style="cardStyle"
        @mouseenter="handleHover(true, 'email')"
        @mouseleave="handleHover(false, 'email')"
    >
      <div class="contact-image" :class="{'email-hover': hoverStates.email}">
        <i class="fas fa-envelope"></i>
      </div>
      <div class="contact-content">
        <h3 class="contact-title">邮箱</h3>
        <a
            :href="`mailto:${email}`"
            class="contact-value"
            :style="linkStyle"
        >
          {{ email }}
        </a>
      </div>
    </div>

    <!-- 地址卡片 -->
    <div
        v-if="showAddress"
        class="contact-card"
        :style="cardStyle"
        @mouseenter="handleHover(true, 'address')"
        @mouseleave="handleHover(false, 'address')"
    >
      <div class="contact-image" :class="{'address-hover': hoverStates.address}">
        <i class="fas fa-map-marker-alt"></i>
      </div>
      <div class="contact-content">
        <h3 class="contact-title">地址</h3>
        <a
            :href="getMapLink()"
            class="contact-value"
            :style="linkStyle"
            target="_blank"
            rel="noopener noreferrer"
        >
          {{ address }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineOptions } from 'vue'

// 定义组件名称（Vue3 可选，便于调试）
defineOptions({
  name: 'ContactInfo'
})

// 定义 props（Vue3 组合式 API 写法）
const props = defineProps({
  // 电话
  phone: {
    type: String,
    default: '138-0000-8888'
  },
  // 邮箱
  email: {
    type: String,
    default: 'contact@example.com'
  },
  // 地址
  address: {
    type: String,
    default: '北京市朝阳区建国路88号'
  },
  // 是否显示电话
  showPhone: {
    type: Boolean,
    default: true
  },
  // 是否显示邮箱
  showEmail: {
    type: Boolean,
    default: true
  },
  // 是否显示地址
  showAddress: {
    type: Boolean,
    default: true
  },
  // 主题颜色
  themeColor: {
    type: String,
    default: '#42b983'
  },
  // 卡片背景色
  cardBg: {
    type: String,
    default: '#ffffff'
  },
  // 文字颜色
  textColor: {
    type: String,
    default: '#333333'
  },
  // 卡片阴影
  cardShadow: {
    type: String,
    default: '0 4px 12px rgba(0, 0, 0, 0.08)'
  }
})

// 响应式状态（替代 Vue2 的 data 选项）
const hoverStates = ref({
  phone: false,
  email: false,
  address: false
})

// 计算属性（Vue3 写法）
const cardStyle = computed(() => ({
  backgroundColor: props.cardBg,
  boxShadow: props.cardShadow,
  transition: 'all 0.3s ease'
}))

const linkStyle = computed(() => ({
  color: props.textColor,
  textDecoration: 'none',
  transition: 'color 0.3s ease'
}))

// 方法定义（直接在 setup 中声明，替代 Vue2 的 methods 选项）
const handleHover = (isHover, type) => {
  hoverStates.value[type] = isHover
}

const getMapLink = () => {
  const encodedAddress = encodeURIComponent(props.address)
  return `https://api.map.baidu.com/geocoder?address=${encodedAddress}&output=html`
}
</script>

<style scoped>
.contact-card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  padding: 1rem;
}

.contact-card {
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  flex: 1;
  min-width: 280px;
  max-width: 380px;
  position: relative;
  overflow: hidden;
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12) !important;
}

.contact-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  transition: all 0.3s ease;
}

.contact-image i {
  font-size: 1.5rem;
  color: #ffffff;
}

/* 不同类型的图标背景色（Vue3 依然支持 style 中 v-bind 绑定 props） */
.phone-hover, .contact-image:nth-child(1) {
  background-color: v-bind('props.themeColor');
}

.email-hover, .contact-image:nth-child(2) {
  background-color: v-bind('props.themeColor');
  opacity: 0.9;
}

.address-hover, .contact-image:nth-child(3) {
  background-color: v-bind('props.themeColor');
  opacity: 0.8;
}

.contact-content {
  flex: 1;
}

.contact-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: v-bind('props.textColor');
  opacity: 0.7;
  margin: 0 0 0.25rem 0;
}

.contact-value {
  font-size: 1.1rem;
  font-weight: 500;
  display: block;
}

.contact-value:hover {
  color: v-bind('props.themeColor') !important;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .contact-card-container {
    flex-direction: column;
    gap: 1rem;
  }

  .contact-card {
    min-width: auto;
    max-width: 100%;
  }

  .contact-image {
    width: 40px;
    height: 40px;
  }

  .contact-image i {
    font-size: 1.25rem;
  }

  .contact-value {
    font-size: 1rem;
  }
}

/* 动画效果 */
.contact-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 0.03),
      transparent
  );
  transition: left 0.6s ease;
}

.contact-card:hover::after {
  left: 100%;
}
</style>