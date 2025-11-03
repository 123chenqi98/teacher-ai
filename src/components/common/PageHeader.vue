<template>
  <div class="page-header">
    <div class="left">
      <div class="title">{{ title }}</div>
      <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
    </div>
    <div class="right">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: #fff;
  border: 1px solid var(--brand-border);
  border-radius: 10px;
  margin-bottom: 14px;
}
.title {
  font-size: 20px;
  font-weight: 700;
  color: var(--brand-text);
}
.subtitle {
  margin-top: 6px;
  color: var(--brand-subtext);
  font-size: 13px;
}
</style>


