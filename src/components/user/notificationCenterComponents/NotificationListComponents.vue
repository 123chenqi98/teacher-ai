<script setup lang="ts">
import {currentTab, selectAll, clearAllNotifications, deleteSelectedNotifications, markSelectedAsRead, exportNotifications } from "@/utils/user/teacher/info/notificationCenter/NotificationEditUtils.ts";
import {filteredNotifications, getIconClass, getIconColor, handleSingleSelect, handleTabChange,toggleSelectAll} from "@/utils/user/teacher/info/notificationCenter/NotificationListUtils.ts";
import {detailItem, detailVisible, openDetail} from "@/entity/auth/teacherInfo/NotificationCenter.ts";
import "@/assets/user/notificationCenterCss/NotificationListCss.css"
</script>

<template>
  <!-- 标题与标签页 - 使用 ElTabs 组件 -->
  <div class="noti-page-header">
    <div class="noti-header-content">
      <h1>通知中心</h1>
      <p class="noti-header-subtitle">查看和管理您的系统通知</p>
    </div>

<div class="noti-header-actions">
      <el-button type="primary" class="noti-export-btn" :style="{ backgroundColor: '#5a2ca0', borderColor: '#5a2ca0' }" @click="exportNotifications" >
        <template #icon><i class="fafa-download"></i></template>
        导出通知记录
      </el-button>
    </div>
  </div>
  <el-divider/>

  <!-- 合并为一个卡片容器：标签栏 + 批量按钮 + 列表 -->
  <el-card class="noti-all-in-one-card" shadow="never">
    <div class="noti-tabs-bar">
      <el-tabs v-model="currentTab" class="noti-tab-navigation" tab-position="top" :before-leave="handleTabChange">
        <el-tab-pane label="全部" name="all" class="noti-tab-item">
          <template #label>
            <span>全部</span>
          </template>
        </el-tab-pane>
        <el-tab-pane label="未读" name="unread" class="noti-tab-item"></el-tab-pane>
        <el-tab-pane label="系统通知" name="system" class="noti-tab-item"></el-tab-pane>
        <el-tab-pane label="重要提醒" name="important" class="noti-tab-item"></el-tab-pane>
        <el-tab-pane label="成功通知" name="success" class="noti-tab-item"></el-tab-pane>
        <el-tab-pane label="错误提醒" name="error" class="noti-tab-item"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="noti-batch-actions">
      <!-- 全选复选框 - 使用 ElCheckbox 组件 -->
      <el-checkbox v-model="selectAll" @change="toggleSelectAll" class="notice-select-all">
        全选
      </el-checkbox>
      <el-button link class="noti-secondary-btn noti-mark-read-btn" @click="markSelectedAsRead">
        <template #icon><i class="fa fa-check"></i></template>
标记为已读
      </el-button>
      <el-button link class="noti-secondary-btn noti-delete-selected-btn" @click="deleteSelectedNotifications">
        <template #icon><i class="fa fa-trash"></i></template>
        删除选中
      </el-button>
     <el-button link class="noti-secondary-btn noti-clear-all-btn" @click="clearAllNotifications">
        <template #icon><i class="fa fa-trash-o"></i></template>
        清空全部
      </el-button>
    </div>

    <div class="noti-list-container">
      <div v-for="(item) in filteredNotifications"
           :key="item.id"
           class="noti-notification-item"
           :class="{ 'noti-unread': !item.read }"
           @click="openDetail(item)">
        <!-- 通知图标 - 使用 ElTag 组件模拟圆形图标-->
        <el-tag class="noti-notification-icon" :class="item.type" :style="{ backgroundColor: getIconColor(item.type) }">
          <i :class="getIconClass(item.type)"></i>
        </el-tag>

        <div class="noti-notification-content">
          <div class="noti-notification-header">
            <div class="noti-notification-title">{{ item.title }}</div>
            <div class="noti-notification-meta">
              <span class="noti-notification-sender">{{ item.sender }}</span>
              <span class="noti-notification-time">{{ item.time }}</span>
            </div>
          </div>
          <div class="noti-notification-text">{{ item.content }}</div>
        </div>

        <!-- 复选框 - 使用 ElCheckbox 组件 -->
        <el-checkbox v-model="item.selected" class="noti-notification-checkbox" @change="handleSingleSelect" @click.stop></el-checkbox>
      </div>

      <!-- 空状态提示 - 使用 ElEmpty 组件 -->
      <el-empty v-if="filteredNotifications.length === 0" description="暂无通知" :image-size="100"></el-empty>
    </div>
  </el-card>

  <el-dialog v-model="detailVisible" width="520px" :title="detailItem?.title || '通知详情'">
    <el-descriptions :column="1" border>
      <el-descriptions-item label="类型">
        <el-tag :style="{ backgroundColor: detailItem ? getIconColor(detailItem.type) : '#909399', color: '#fff' }">
          <i :class="detailItem ? getIconClass(detailItem.type) : 'fa fa-bell'"></i>
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="发送者">
        {{ detailItem?.sender }}
      </el-descriptions-item>
      <el-descriptions-item label="时间">
        {{ detailItem?.time }}
      </el-descriptions-item>
      <el-descriptions-item label="内容">
        {{ detailItem?.content }}
      </el-descriptions-item>
   </el-descriptions>
    <template #footer>
      <el-button link @click="detailVisible = false">关闭</el-button>
      <el-button
          type="primary"
          @click="() => {
            if (detailItem) {
              detailItem.read = true;
            }
            detailVisible= false;
          }"
          :style="{ backgroundColor: '#5a2ca0', borderColor: '#5a2ca0' }"
      >
        标记为已读
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>