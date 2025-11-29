<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import defaultProduct from "@/static/img.png";
import type { HotProduct } from "@/data/learningMachine/PopularProductsData";

const props = defineProps<{
  product: HotProduct;
}>();

const cardRef = ref<HTMLDivElement | null>(null);
let observer: IntersectionObserver | null = null;

const initObserver = () => {
  if (observer) return;
  observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
  );
};

const handleImageError = (event: Event) => {
  (event.target as HTMLImageElement).src = defaultProduct;
};

onMounted(() => {
  initObserver();
  if (cardRef.value) {
    observer?.observe(cardRef.value);
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<template>
  <div class="product-card" ref="cardRef">
    <div class="product-container">
      <div class="product-info">
        <h3 class="product-name">{{ props.product.title }}</h3>
        <p class="product-desc">{{ props.product.desc }}</p>
        <button class="product-btn">{{ props.product.button }}</button>
      </div>

      <div class="product-image-wrapper">
        <img
            :src="props.product.image || defaultProduct"
            :alt="props.product.title || '热门产品图片'"
            class="product-image"
            @error="handleImageError"
        >
      </div>
    </div>
  </div>
</template>

