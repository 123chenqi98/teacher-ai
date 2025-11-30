// 获取路由参数
import {useRoute} from "vue-router";
import {computed, ref, watch} from "vue";
import {learningMachineProducts} from "@/data/learningMachine/LearningMachineProductData.ts";
import {ElMessage, ElNotification} from "element-plus";
import router from "@/router";

// 产品ID
const productId = ref(1);

// 查找当前产品
const currentProduct = computed(() => {
    const product = learningMachineProducts.find(product => product.id === productId.value);
    return product || learningMachineProducts[0];
});

// 相关产品（同分类的其他产品）
const relatedProducts = computed(() => {
    return learningMachineProducts
        .filter(product => product.category === currentProduct.value.category && product.id !== currentProduct.value.id)
        .slice(0, 4);
});

// 购买数量
const quantity = ref(1);

// 添加到购物车
const addToCart = () => {
    ElNotification({
        title: '成功',
        message: `已将 ${currentProduct.value.name} 添加到购物车，数量：${quantity.value}`,
        type: 'success',
        duration: 2000
    });
};

// 立即购买
const buyNow = () => {
    ElMessage({
        message: `立即购买 ${currentProduct.value.name}，数量：${quantity.value}`,
        type: 'success',
        duration: 2000
    });
};

// 返回产品中心
const goBack = () => {
    router.push('/learningMachine/product').then();
};

// 切换标签页
const activeTab = ref('detail');

// 选择缩略图
const selectThumbnail = (index: number) => {
    // 这里可以实现切换主图的逻辑
    ElMessage({
        message: `切换到图片 ${index + 1}`,
        type: 'info',
        duration: 1000
    });
};

// 在组件中调用此函数以初始化路由监听
const initRouteWatcher = () => {
  try {
    const route = useRoute();
    
    // 初始化时设置产品ID
    const id = Number(route.params.id);
    if (!isNaN(id) && id > 0) {
      productId.value = id;
    }
    
    // 监听路由变化
    watch(
      () => route.params.id,
      (newId) => {
        const id = Number(newId);
        if (!isNaN(id) && id > 0) {
          productId.value = id;
        } else {
          productId.value = 1; // 默认值
        }
      }
    );
  } catch (error) {
    console.error("路由初始化错误:", error);
  }
};

export {
    currentProduct,
    relatedProducts,
    quantity,
    addToCart,
    buyNow,
    goBack,
    activeTab,
    selectThumbnail,
    productId,
    initRouteWatcher
};