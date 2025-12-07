<script setup lang="ts">
import {
  exportMessages, handleMessageTabChange,
  handleDeleteSelectedMessages, openNewMessageModal,
  handleStatusFilterChange, handleMessageSearch,
  filteredMessageList, filteredTotalCount,
  selectMessage, handleSizeChange,
  handleCurrentChange, isSelected,
  toggleSelect, selectedCount,
  closeChat, sendMessage,
  selectRecipient, sendNewMessage
} from "@/utils/user/teacher/info/messageCenter/MessageContentUtils.ts"
import "@/assets/user/messageCenterCss/MessageListCss.css"
import "@/assets/user/messageCenterCss/MessageChatCss.css"
import {getTagText, getTagType} from "@/utils/user/teacher/info/messageCenter/MessageListUtils.ts";
import { recipientList } from "@/data/user/messageCenterData/MessageListData";
import {
  activeMessageTab, chatMessages, currentPage,
  messageSearchKeyword,
  messageStatusFilter, newMessageContent,
  newMessageForm, pageSize,
  selectedMessage, showNewMessageModal
} from "@/entity/user/messageCenter/MessageListEntity.ts";
</script>

<template>
  <div class="mess-page-header">
    <!-- 页面标题 -->
    <div class="mess-header-content">
      <h1>消息中心</h1>
      <p class="mess-header-subtitle">查看和对话您的聊天消息通知</p>
    </div>
    <div class="mess-header-actions">
      <el-button type="primary" class="mess-export-btn" :style="{ backgroundColor: '#5a2ca0', borderColor: '#5a2ca0' }" @click="exportMessages">
        <template #icon><i class="fa fa-download"></i></template>
        导出消息记录
      </el-button>
    </div>
  </div>
  <el-divider/>

  <!-- 顶部数据概览卡片区：使用 ElCard -->
  <el-row :gutter="15" class="mess-stats-cards-grid">
    <el-col :span="6">
      <el-card class="mess-stat-card">
        <div class="mess-stat-value">28</div>
        <div class="mess-stat-label">私信对话</div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="mess-stat-card">
        <div class="mess-stat-value">15</div>
        <div class="mess-stat-label">未读消息</div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="mess-stat-card">
        <div class="mess-stat-value">42</div>
        <div class="mess-stat-label">评论回复</div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="mess-stat-card">
        <div class="mess-stat-value">8</div>
        <div class="mess-stat-label">@我的消息</div>
      </el-card>
    </el-col>
  </el-row>

  <!-- 消息中心 - 标签页与搜索操作区 -->
  <el-card class="mess-all-in-one-card" shadow="hover" aria-label="消息中心">
    <!-- 消息分类标签页 -->
    <el-tabs
        v-model="activeMessageTab"
        class="mess-category-tabs"
        @tab-click="handleMessageTabChange"
        type="card" :key="activeMessageTab"
    >
      <el-tab-pane label="全部消息" name="all"></el-tab-pane>
      <el-tab-pane label="私信对话" name="private"></el-tab-pane>
      <el-tab-pane label="评论回复" name="comment"></el-tab-pane>
      <el-tab-pane label="@我的消息" name="mention"></el-tab-pane>
    </el-tabs>

    <!-- 搜索与操作按钮区域 -->
    <div class="mess-search-action-group">
      <!-- 消息搜索输入框 -->
      <el-input
          v-model="messageSearchKeyword"
          placeholder="搜索消息内容或联系人..."
          prefix-icon="Search"
          class="mess-search-input"
          size="default"
          clearable
          @keyup.enter="handleMessageSearch"
          aria-label="消息搜索框"
      ></el-input>

      <!-- 操作控制区 -->
      <div class="mess-operation-controls">
        <!-- 消息状态筛选下拉框 -->
        <el-select
            v-model="messageStatusFilter"
            placeholder="全部状态"
            size="default"
            class="mess-status-filter"
            @change="handleStatusFilterChange"
            aria-label="消息状态筛选"
        >
          <el-option label="全部状态" value="all"></el-option>
          <el-option label="未读" value="unread"></el-option>
          <el-option label="已读" value="read"></el-option>
        </el-select>

        <!-- 删除选中按钮 -->
        <el-button type="text" class="mess-delete-selected-btn" size="default" :disabled="selectedCount === 0" @click="handleDeleteSelectedMessages" icon="Delete" aria-label="删除选中的消息">
          删除选中{{ selectedCount ? `(${selectedCount})` : '' }}
        </el-button>

        <!-- 新建消息按钮 -->
        <el-button type="primary" class="mess-new-create-btn" size="default" @click="openNewMessageModal" icon="Plus" aria-label="新建消息">
           新消息
        </el-button>
      </div>
    </div>
    <div
        class="mess-messages-container"
        :class="{ 'mess-chat-open': selectedMessage }"
    >
      <div class="mess-messages-list-container">
        <div class="mess-messages-list">
          <div
            v-for="(item, index) in filteredMessageList"
            :key="index"
            class="el-list-item"
            :class="[item.type, { 'mess-unread': item.status === 'unread' }]"
            @click="selectMessage(item)"
          >
            <el-checkbox :model-value="isSelected(item)" @change="(val:any) => toggleSelect(item, val)" />
            <img :src="item.avatar" :alt="item.sender" class="mess-message-avatar" />
            <div class="mess-message-content-inner">
              <div class="mess-message-header">
                <div class="mess-message-sender">{{ item.sender }}</div>
                <div class="mess-message-time">{{ item.time }}</div>
              </div>
              <div class="mess-message-text">{{ item.content }}</div>
              <el-tag :type="getTagType(item.type)" size="small" class="mess-message-tag">
                {{ getTagText(item.type) }}
              </el-tag>
            </div>
            <el-badge v-if="item.status === 'unread'" class="mess-unread-dot" :value="1" type="primary" />
          </div>
        </div>
      </div>

      <div v-if="selectedMessage" class="mess-chat-window">
        <div class="mess-chat-header">
          <img :src="selectedMessage.avatar" :alt="selectedMessage.sender" class="mess-chat-avatar" />
          <div class="mess-chat-title">
            <div class="mess-chat-name">{{ selectedMessage.sender }}</div>
            <div class="mess-chat-meta">{{ selectedMessage.time }}</div>
          </div>
          <el-button type="text" icon="Close" class="mess-chat-close" @click="closeChat">关闭</el-button>
        </div>

        <div class="mess-chat-content">
          <div
            v-for="(m, i) in chatMessages"
            :key="i"
            class="mess-chat-message"
            :class="{ 'self': m.isSelf }"
          >
            <div class="mess-chat-bubble">
              <template v-if="Array.isArray(m.content)">
                <p v-for="(line, k) in m.content" :key="k">{{ line }}</p>
              </template>
              <template v-else>
                {{ m.content }}
              </template>
            </div>
            <div class="mess-chat-time">{{ m.time }}</div>
          </div>
        </div>

        <div class="mess-chat-input-bar">
          <el-input
              v-model="newMessageContent"
              placeholder="输入消息..."
              @keyup.enter="sendMessage"
          />
          <el-button type="primary" @click="sendMessage">发送</el-button>
        </div>
      </div>

    </div>

    <div class="mess-pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[7, 14, 21, 28]"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="filteredTotalCount"
      />
    </div>
  </el-card>

  <el-dialog v-model="showNewMessageModal" title="新消息" width="600px">
    <div style="display: flex; flex-direction: column; gap: 16px">
      <div style="display: flex; align-items: center; gap: 12px">
        <span style="min-width: 64px; color: #666">收件人</span>
        <el-select v-model="newMessageForm.recipient" filterable placeholder="选择或输入收件人" style="flex: 1">
          <el-option v-for="(item, idx) in recipientList" :key="idx" :label="item.name" :value="item.name" @click="selectRecipient(item)"/>
        </el-select>
      </div>
      <div>
        <span style="display:block; margin-bottom:8px; color:#666">内容</span>
        <el-input v-model="newMessageForm.content" type="textarea" :rows="6" placeholder="请输入消息内容" />
      </div>
    </div>
    <template #footer>
      <el-button @click="showNewMessageModal=false">取消</el-button>
      <el-button type="primary" @click="sendNewMessage">发送</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
