<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, UploadFile } from 'element-plus';

// 定义组件的 emits
const emit = defineEmits<{
  upload: [file: File];
  import-template: [];
  export-data: [];
}>();

// 上传状态
const uploadLoading = ref(false);
const fileList = ref<UploadFile[]>([]);

// 上传前检查
const beforeUpload = (file: File) => {
  // 检查文件类型
  const allowedExtensions = ['.xlsx', '.xls', '.csv'];
  const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  
  if (!allowedExtensions.includes(extension)) {
    ElMessage.error('只能上传 Excel 或 CSV 文件');
    return false;
  }
  
  // 检查文件大小
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    ElMessage.error('文件大小不能超过 10MB');
    return false;
  }
  
  emit('upload', file);
  return false; // 阻止默认上传
};

// 处理文件移除
const handleRemove = (file: UploadFile, fileList: UploadFile[]) => {
  ElMessage.info('已移除文件');
};

// 点击上传按钮
const handleClickUpload = () => {
  ElMessage.info('点击了上传按钮');
};

// 导入模板
const handleImportTemplate = () => {
  emit('import-template');
};

// 导出数据
const handleExportData = () => {
  emit('export-data');
};
</script>

<template>
  <div class="action-section">
    <el-upload
      class="upload-btn"
      action="#"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :disabled="uploadLoading"
    >
      <el-button type="primary" :loading="uploadLoading" @click="handleClickUpload">
        <el-icon><Upload /></el-icon>
        批量导入
      </el-button>
    </el-upload>
    <el-button type="success" @click="handleImportTemplate">导入模板</el-button>
    <el-button type="warning" @click="handleExportData">导出数据</el-button>
  </div>
</template>

<style scoped>
.action-section {
  margin-bottom: 20px;
  display: flex;
  gap: 12px;
  align-items: center;
}

.upload-btn {
  display: inline-block;
}
</style>