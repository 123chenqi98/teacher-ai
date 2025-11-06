<script setup lang="ts">
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AdminTopbar from '@/components/admin/AdminTopbar.vue'
defineProps<{ title?: string }>()
</script>

<template>
  <div class="admin-shell">
    <AdminSidebar />
    <main class="content">
      <AdminTopbar />
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-shell { display: grid; grid-template-columns: 200px 1fr; min-height: 100vh; position: relative; }
.content { grid-column: 2; background: var(--color-bg); position: relative; z-index: 1; overflow: auto; }
</style>