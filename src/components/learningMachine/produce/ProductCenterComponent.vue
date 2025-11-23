<script setup lang="ts">
// 学习机产品中心组件
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { Search, Star } from '@element-plus/icons-vue';
import "@/assets/learningMachine/produce/LearningMachineProductCenterCss.css";
import { learningMachineProducts as products, learningMachineProductCategories as productCategories } from "@/data/learningMachine/LearningMachineProductData.ts";

// 获取路由实例
const router = useRouter();

// 产品分类数据
const categories = ref(productCategories);

// 当前选中的分类
const activeCategory = ref(1);

// 搜索关键词
const searchKeyword = ref('');

// 过滤后的产品列表
const filteredProducts = computed(() => {
  let result = products
  // 根据分类筛选
  if (activeCategory.value !== 1) {
    result = result.filter(product => product.category === activeCategory.value);
  }
  
  // 根据搜索关键词筛选
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    result = result.filter(product => 
      product.name.toLowerCase().includes(keyword) || 
      product.description.toLowerCase().includes(keyword)
    );
  }
  
  return result;
});

// 切换分类
const switchCategory = (categoryId: number) => {
  activeCategory.value = categoryId;
};

// 收藏产品
const toggleFavorite = (productId: number) => {
  ElMessage({
    message: `已收藏产品 ID: ${productId}`,
    type: 'success',
    duration: 1500
  });
};

// 查看详情
const viewDetails = (productId: number) => {
  console.log("点击的产品ID:", productId);
  router.push({ name: 'learningMachineProductDetail', params: { id: productId } }).catch(err => {
    console.error('路由跳转失败:', err);
    ElMessage.error('页面跳转失败，请重试');
  });
};
</script>

<template>
  <div class="lm-product-center-wrapper">
    <!-- 页面标题 -->
    <div class="lm-product-center-header">
      <h1 class="lm-product-center-title">学习机产品中心</h1>
      <p class="lm-product-center-subtitle">探索我们的智能学习机产品，助力孩子高效学习。我们提供全面的学习解决方案，满足不同年龄段的学习需求。</p>
    </div>

    <!-- 搜索框 -->
    <div class="lm-product-search-box">
      <el-input
        size="large"
        v-model="searchKeyword"
        placeholder="搜索产品..." 
        clearable
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <!-- 分类导航 -->
    <div class="lm-product-categories-nav">
      <div class="lm-categories-list">
        <el-tag
          style="width: 200px;height: 50px"
          v-for="category in categories" 
          :key="category.id"
          @click="switchCategory(category.id)"
        >
          <el-text  style="color: #b196e2">{{ category.name }}</el-text>
        </el-tag>
      </div>
    </div>

    <!-- 产品列表 -->
    <div class="lm-products-grid">
      <el-card
        class="product-card-center"
        v-for="product in filteredProducts" 
        :key="product.id"
      >
        <div class="lm-product-image-wrapper">
          <img 
            :src="product.image" 
            :alt="product.name"
            class="lm-product-image"
          >
          <div v-if="product.isNew" class="lm-product-badge">
            <el-tag type="danger">NEW</el-tag>
          </div>
        </div>
        <div class="lm-product-info">
          <h3 class="lm-product-name">{{ product.name }}</h3>
          <p class="lm-product-description">{{ product.description }}</p>
          <div class="lm-product-meta">
            <span class="lm-product-category">
              {{ categories.find(c => c.id === product.category)?.name }}
            </span>
            <span class="lm-product-price">{{ product.price || '¥0.00' }}</span>
          </div>
          <div class="lm-product-actions">
            <el-button 
              type="primary" 
              class="lm-product-detail-btn"
              @click="viewDetails(product.id)"
            >
              查看详情
            </el-button>
            <el-button 
              class="lm-product-favorite-btn" 
              @click="toggleFavorite(product.id)"
              circle
            >
              <el-icon><Star /></el-icon>
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.product-card-center{
  border-radius: 10px;
  background: linear-gradient(135deg,rgb(202,208,217),rgb(177,150,226));
}
.product-card-center:hover{
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
</style>