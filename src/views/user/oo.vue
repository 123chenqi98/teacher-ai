<script setup lang="ts">
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue"
import "@/assets/user/UserOverallCss.css"
</script>

<template>

</template>

<style scoped>






/* 表单样式 */
.lesson-form {
  margin-top: 8px;
}

.form-hint {
  font-size: 12px;
  color: #888;
  margin-top: 8px;
}

.upload-hint {
  font-size: 12px;
  color: #888;
  margin-top: 8px;
}

.upload-file-info {
  font-size: 13px;
  color: #666;
  margin-top: 8px;
}

/* 详情模态框样式 */
.lesson-detail {
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 16px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.detail-title {
  font-size: 20px;
  font-weight: 600;
  color: #1d2129;
  margin: 0;
  flex: 1;
}

.detail-actions {
  display: flex;
  gap: 8px;
}

.detail-meta {
  margin-bottom: 24px;
}

.meta-label {
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
}

.meta-value {
  font-size: 14px;
  color: #1d2129;
  font-weight: 500;
}

.content-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #1d2129;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

.section-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background-color: #409eff;
  margin-right: 8px;
  border-radius: 2px;
}

.section-content {
  font-size: 14px;
  color: #333;
  line-height: 1.8;
}

.file-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.file-icon {
  font-size: 32px;
  color: #409eff;
  margin-right: 16px;
}

.file-details {
  flex: 1;
}

.file-name {
  font-size: 14px;
  font-weight: 500;
  color: #1d2129;
  margin-bottom: 4px;
}

.file-meta {
  font-size: 12px;
  color: #666;
  display: flex;
  gap: 16px;
}

.file-download {
  margin-left: 16px;
}

.stat-card-small {
  padding: 12px;
  text-align: center;
  background-color: #f5f7fa;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .lesson-grid el-col {
    --el-col-span: 12 !important;
  }

  .stats-row el-col {
    --el-col-span: 8 !important;
  }
}

@media (max-width: 768px) {
  .lesson-grid el-col {
    --el-col-span: 24 !important;
  }

  .stats-row el-col {
    --el-col-span: 12 !important;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .filters-content el-col {
    --el-col-span: 24 !important;
    margin-bottom: 12px;
  }
}
</style>