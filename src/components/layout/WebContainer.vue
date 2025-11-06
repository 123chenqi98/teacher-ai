<script setup lang="ts">
defineProps<{ pad?: boolean }>()
</script>

<template>
  <div class="container" :class="{ pad }">
    <slot />
  </div>
</template>

<style scoped>
.pad { padding-top: 12px; padding-bottom: 24px; }
</style>