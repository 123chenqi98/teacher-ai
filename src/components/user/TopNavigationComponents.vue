<script setup lang="ts">
import "@/assets/user/TopNavigationCss.css"
import { Search, Bell, Message, Setting, UserFilled } from "@element-plus/icons-vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";

// 搜索框绑定值
const searchText = ref<string>("");

// 接收父组件传入的标题参数
const props = defineProps<{
  navTitle?: string;
}>();

// 动态计算显示标题：优先父组件传入，否则取路由meta.title
const route = useRoute();
const displayTitle = computed(() => {
  const metaTitle = (route.meta?.title as string);
  return props.navTitle ?? metaTitle ?? "教师个人中心";
});
</script>

<template>
  <el-header class="top-nav" aria-label="顶部导航栏">
    <!-- 动态标题 -->
    <div class="top-title">{{ displayTitle }}</div>

    <!-- 全局搜索框 -->
    <el-input
        v-model="searchText"
        placeholder="搜索教案、题库、资源..."
        class="search-box"
        size="large"
        max-length="50"
        aria-label="全局搜索"
        aria-describedby="search-hint"
        clearable
    >
      <template #prefix>
        <el-icon class="search-icon" aria-hidden="true">
          <Search />
        </el-icon>
      </template>
    </el-input>
    <!-- 屏幕阅读器专用：搜索框辅助说明 -->
    <span id="search-hint" class="sr-only">支持教案、题库、资源等内容搜索，最多输入50个字符</span>

    <!-- 用户功能操作区 -->
    <div class="user-actions" aria-label="用户功能区">
      <!-- 通知中心 -->
      <el-badge :value="3" class="action-badge" type="danger">
        <el-button text circle class="action-btn" title="通知中心" aria-label="通知中心（3条未读）" @click="router.push('/user/notifications')">
          <el-icon aria-hidden="true"><Bell /></el-icon>
        </el-button>
      </el-badge>

      <!-- 消息中心 -->
      <el-badge :value="5" class="action-badge" type="primary">
        <el-button text circle class="action-btn" title="消息中心" aria-label="消息中心（5条未读）" @click="router.push('/user/messages')">
          <el-icon aria-hidden="true"><Message /></el-icon>
        </el-button>
      </el-badge>

      <!-- 系统设置 -->
      <el-button text circle class="action-btn" title="系统设置" aria-label="系统设置">
        <el-icon aria-hidden="true"><Setting /></el-icon>
      </el-button>

      <!-- 个人信息下拉菜单 -->
      <el-dropdown trigger="hover">
        <div class="user-profile" title="查看个人资料" aria-label="内格老师（数学教师）- 查看个人资料">
          <el-avatar src="https://randomuser.me/api/portraits/men/80.jpg" size="large" :fallback="UserFilled"/>
          <div class="user-info">
            <span class="user-name">内格老师</span>
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile" @click="router.push('/user/dashboard')">个人中心</el-dropdown-item>
            <el-dropdown-item command="settings">设置</el-dropdown-item>
            <el-dropdown-item command="logout" @click="router.push('/')">返回主页</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style scoped>

</style>