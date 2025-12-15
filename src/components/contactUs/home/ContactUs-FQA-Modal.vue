<script setup lang="ts">
import "@/assets/contactUs/homeCss/ConatctUs-FQA-ModalCss.css"
import {tabs,goToContact,toggleFaq,activeTab,searchQuery,filteredFaqs,section3,} from "@/utils/contactUs/ContactUs-FQA-ModalUtils.ts"
import {StarFilled, Warning} from "@element-plus/icons-vue";

</script>


<template>
  <div
      ref="section3"
      id="section3"
      class="faq-container"
  >
    <!-- 标题区域 -->
    <div class="faq-header">
      <h2>
        <el-icon>
          <StarFilled/>
        </el-icon>
        常见问题 FAQ
      </h2>
      <p>我们整理了用户最常咨询的问题，如果您有其他疑问，请联系我们</p>
    </div>

    <!-- 搜索框 -->
    <div class="search-box">
      <input type="text" placeholder="搜索问题..." v-model="searchQuery" />
    </div>

    <!-- FAQ分类标签 -->
    <div class="faq-tabs">
      <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
      >
        {{ tab }}
      </button>
    </div>

    <!-- FAQ列表 -->
    <div class="faq-list">
      <div
          class="faq-item"
          v-for="(item, index) in filteredFaqs"
          :key="index"
          @click="toggleFaq(index)"
      >
        <div class="faq-question">
          <span>
            <el-icon>
              <warning/>
            </el-icon>
            {{ item.question }}
          </span>
          <i :class="item.open ? 'icon-arrow-up' : 'icon-arrow-down'"></i>
        </div>
        <div class="faq-answer" v-if="item.open">
          {{ item.answer }}
        </div>
      </div>
    </div>


    <!-- 更多帮助 -->
    <div class="more-help">
      <p>还有其他问题？</p>
      <button @click="goToContact">联系我们</button>
    </div>
  </div>
</template>
