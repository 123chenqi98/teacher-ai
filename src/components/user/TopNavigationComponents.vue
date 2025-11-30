<script setup lang="ts">
// 导入css样式
import "@/assets/user/TopNavigationCss.css"
// 导入 Element Plus 图标组件
import { Search, Bell, Message, Setting, UserFilled } from "@element-plus/icons-vue";
// 导入 Vue 响应式 API
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";

// 搜索框绑定的响应式变量，初始值为空字符串
const searchText = ref<string>("");

const props = defineProps<{
  navTitle?: string; // 可选参数，支持父组件传递
}>();

// 根据当前路由动态计算标题；优先使用父组件传入，其次使用路由 meta.title
const route = useRoute();
const displayTitle = computed(() => {
  const metaTitle = (route.meta?.title as string);
  return props.navTitle ?? metaTitle;
});
</script>

<template>
    <!-- aria-label="顶部导航栏"：无障碍标签，告知屏幕阅读器该区域功能 -->
    <el-header class="top-nav" aria-label="顶部导航栏">
      <!-- v-model="searchText": 双向绑定响应式变量 searchText，同步输入内容
           max-length="50": 输入最大长度限制：50个字符
           aria-describedby="search-hint": 关联辅助说明文本，增强无障碍体验
           父组件：el-input（支持 prefix/suffix 等插槽） -->
      <!-- 动态标题：优先使用外部传入，否则使用当前路由标题 -->
      <div class="top-title">{{ displayTitle }}</div>

      <el-input
          v-model="searchText"
          placeholder="搜索教案、题库、资源..."
          class="search-box"
          size="large"
          max-length="50"
          aria-label="全局搜索"
          aria-describedby="search-hint"
      >
        <!-- 向 el-input 的 prefix 插槽插入搜索图标 -->
        <template #prefix>
        <!-- 无障碍属性，告诉屏幕阅读器 “忽略该图标” -->
          <el-icon class="search-icon" aria-hidden="true">
            <Search />
          </el-icon>
        </template>
      </el-input>
      <!-- 搜索框辅助说明文本：屏幕阅读器专用 -->
      <!-- id="search-hint"：与 aria-describedby 关联的唯一标识 -->
      <!-- class="sr-only"：隐藏样式，仅屏幕阅读器可读取 -->
      <span id="search-hint" class="sr-only">支持教案、题库、资源等内容搜索，最多输入50个字符</span>

      <!-- 用户操作区：通知、消息、设置、个人信息 -->
      <div class="user-actions" aria-label="用户功能区">
        <!-- 通知图标（带徽章提示）：补充无障碍标签 -->
        <el-badge :value="3" class="action-badge" type="danger">
          <el-button text circle class="action-btn" title="通知中心" aria-label="通知中心（3条未读）" @click="router.push('/user/notifications')">
            <el-icon aria-hidden="true">
              <Bell />
            </el-icon>
          </el-button>
        </el-badge>

        <!-- 消息图标：带蓝色未读徽章（5条未读） -->
        <el-badge :value="5" class="action-badge" type="primary">
          <el-button text circle class="action-btn" title="消息中心" aria-label="消息中心（5条未读）" @click="router.push('/user/messages')">
            <el-icon aria-hidden="true">
              <Message />
            </el-icon>
          </el-button>
        </el-badge>

        <!-- 设置图标：无未读提示 -->
        <el-button text circle class="action-btn" title="系统设置" aria-label="系统设置">
          <el-icon aria-hidden="true">
            <Setting />
          </el-icon>
        </el-button>

        <!-- 个人信息区域：补充加载失败兜底图标 -->
        <el-dropdown trigger="hover">
          <div class="user-profile" title="查看个人资料" aria-label="张三老师（数学教师）- 查看个人资料">
            <el-avatar src="https://randomuser.me/api/portraits/men/80.jpg" size="large" :fallback="UserFilled"/>
            <div class="user-info">
              <span class="user-name">内格老师</span>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" @click="router.push('/user/dashboard')">个人中心</el-dropdown-item>
              <el-dropdown-item command="settings">设置</el-dropdown-item>
              <el-dropdown-item command="logout" @click="router.push('/')">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
</template>

