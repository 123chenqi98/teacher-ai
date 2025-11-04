<script setup lang="ts">
interface Props {
  currentTab: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'tab-click': [tab: string];
}>();

const handleTabChange = (tab: any) => {
  emit('tab-click', tab.paneName);
};
</script>

<template>
  <el-tabs v-model="currentTab" class="nav-tabs" @tab-click="handleTabChange">
    <el-tab-pane label="学期管理" name="semester" />
    <el-tab-pane label="学科管理" name="subject" />
    <el-tab-pane label="学生信息" name="student" />
    <el-tab-pane label="年级列表" name="year" />
    <el-tab-pane label="数据初始管理" name="data" />
  </el-tabs>
</template>

<style scoped>
.nav-tabs {
  margin-bottom: 20px;
}
</style>