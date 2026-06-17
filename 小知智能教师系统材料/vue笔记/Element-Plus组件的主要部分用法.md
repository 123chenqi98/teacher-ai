“el-” 是 **Element UI（Vue 2）** 和 **Element Plus（Vue 3）** 组件库的核心前缀，所有组件均以 `el-` 开头（如 `el-button`、`el-form`），是 Vue 生态中最常用的企业级 UI 组件库之一。以下从 **核心用法分类、高频组件示例、进阶技巧、常见场景** 四个维度，详细梳理 `el-` 组件的各种用法：

## 一、先明确：el- 的核心场景

`el-` 本质是 Element 系列组件库的 **组件命名前缀**，用于区分原生 HTML 标签和 UI 组件，核心作用是：

- 快速搭建企业级中后台界面（表单、表格、布局、弹窗等）；
- 提供统一的样式、交互逻辑（如表单校验、分页、树形结构）；
- 支持自定义主题、按需引入，适配 Vue 2/Vue 3 生态。

⚠️ 注意：Element UI（Vue 2）已停止维护，推荐 Vue 3 项目使用 **Element Plus**，以下示例默认基于 Element Plus（语法兼容 Vue 3 组合式 API / 模板语法）。

## 二、el- 组件的核心用法分类（附示例）

### 1. 布局组件（页面结构搭建）

核心组件：`el-container`（布局容器）、`el-header`（头部）、`el-aside`（侧边栏）、`el-main`（主内容区）、`el-footer`（底部）、`el-row`/`el-col`（栅格布局）。

#### 示例 1：经典后台布局（容器 + 栅格）

vue

```vue
<template>
  <!-- 容器布局：垂直排列（默认horizontal，可通过direction修改） -->
  <el-container style="height: 100vh;">
    <!-- 头部 -->
    <el-header style="background: #fff; padding: 0 20px;">
      <el-row :gutter="20" align="middle" style="height: 100%;">
        <el-col :span="6">Element Plus 后台</el-col>
        <el-col :span="18" class="text-right">
          <el-button type="text">退出登录</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!-- 侧边栏（宽度200px） -->
      <el-aside width="200px" style="background: #f5f5f5;">
        <el-menu :default-active="activeMenu" class="el-menu-vertical-demo">
          <el-menu-item index="1">首页</el-menu-item>
          <el-sub-menu index="2">
            <template #title>数据管理</template>
            <el-menu-item index="2-1">用户列表</el-menu-item>
            <el-menu-item index="2-2">订单管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <!-- 主内容区（栅格分栏） -->
      <el-main>
        <el-row :gutter="30">
          <el-col :span="8"><div class="card">卡片1</div></el-col>
          <el-col :span="8"><div class="card">卡片2</div></el-col>
          <el-col :span="8"><div class="card">卡片3</div></el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';
const activeMenu = ref('1'); // 侧边栏默认激活项
</script>

<style scoped>
.card { height: 150px; background: #fff; border-radius: 8px; padding: 20px; }
</style>
```

#### 关键用法：

- 栅格 `el-col` 的 `:span` 属性：基于 24 分栏（如 `:span="8"` 占 1/3 宽度）；
- `:gutter`：栅格间距（单位 px）；
- `el-menu` 的 `default-active`：默认激活的菜单索引。

### 2. 表单组件（数据收集与校验）

核心组件：`el-form`（表单容器）、`el-form-item`（表单项）、`el-input`（输入框）、`el-select`（下拉选择）、`el-radio`（单选）、`el-checkbox`（多选）、`el-date-picker`（日期选择）等。

#### 示例 2：带校验的登录表单

vue

```vue
<template>
  <el-form 
    :model="loginForm" 
    :rules="loginRules" 
    ref="loginFormRef" 
    label-width="80px"
    class="login-form"
  >
    <!-- 用户名 -->
    <el-form-item label="用户名" prop="username">
      <el-input 
        v-model="loginForm.username" 
        placeholder="请输入用户名" 
        prefix-icon="User" 
      />
    </el-form-item>

    <!-- 密码 -->
    <el-form-item label="密码" prop="password">
      <el-input 
        v-model="loginForm.password" 
        type="password" 
        placeholder="请输入密码" 
        prefix-icon="Lock" 
        show-password  <!-- 密码可见切换 -->
      />
    </el-form-item>

    <!-- 记住密码（多选框） -->
    <el-form-item>
      <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
    </el-form-item>

    <!-- 提交按钮 -->
    <el-form-item>
      <el-button type="primary" @click="handleLogin" class="w-full">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

// 表单数据
const loginForm = ref({
  username: '',
  password: '',
  remember: false
});

// 表单校验规则
const loginRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名长度3-10位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^(?=.*\d)(?=.*[a-z])\w{6,16}$/, message: '密码含数字和小写字母，6-16位', trigger: 'blur' }
  ]
});

// 表单引用（用于手动校验）
const loginFormRef = ref(null);

// 登录提交
const handleLogin = async () => {
  try {
    // 手动触发表单校验
    await loginFormRef.value.validate();
    // 校验通过，发起请求...
    ElMessage.success('登录成功');
  } catch (error) {
    ElMessage.error('表单校验失败，请检查输入');
  }
};
</script>

<style scoped>
.login-form { width: 350px; margin: 100px auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
</style>
```

#### 关键用法：

- `el-form` 的 `:model` 绑定表单数据，`:rules` 绑定校验规则；
- `el-form-item` 的 `prop` 必须与 `:model` 中的字段对应，否则校验失效；
- 校验规则支持 `required`（必填）、`min/max`（长度）、`pattern`（正则）、`validator`（自定义校验）；
- 手动校验：通过 `ref` 获取表单实例，调用 `validate()` 方法。

### 3. 数据展示组件（数据可视化）

核心组件：`el-table`（表格）、`el-tree`（树形结构）、`el-card`（卡片）、`el-statistic`（统计数字）、`el-tag`（标签）等。

#### 示例 3：带分页的表格（高频场景）

vue

```vue
<template>
  <el-card>
    <!-- 表格工具栏（搜索+新增） -->
    <div class="table-toolbar" style="margin-bottom: 16px;">
      <el-input 
        v-model="searchKey" 
        placeholder="搜索用户名" 
        style="width: 200px; margin-right: 16px;" 
        @clear="getUserList"  <!-- 清空搜索触发刷新 -->
      />
      <el-button type="primary" icon="Plus" @click="openAddDialog">新增用户</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="userList" border stripe :loading="loading">
      <!-- 索引列 -->
      <el-table-column label="序号" type="index" width="60" align="center" />
      <!-- 普通列（绑定数据字段） -->
      <el-table-column label="用户名" prop="username" align="center" />
      <el-table-column label="性别" prop="gender" align="center">
        <!-- 插槽：自定义列内容 -->
        <template #default="scope">
          <el-tag :type="scope.row.gender === '男' ? 'primary' : 'success'">
            {{ scope.row.gender }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center" width="180">
        <!-- 格式化时间（需引入dayjs） -->
        <template #default="scope">
          {{ scope.row.createTime | formatTime }}
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" align="center" width="160">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" text-color="red" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination" style="margin-top: 16px; text-align: right;">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="getUserList"  <!-- 每页条数变化 -->
        @current-change="getUserList"  <!-- 页码变化 -->
      />
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import dayjs from 'dayjs';

// 表格数据
const userList = ref([]);
const loading = ref(false);
const total = ref(0); // 总条数
const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 每页条数
const searchKey = ref(''); // 搜索关键词

// 时间格式化过滤器（Vue 3 需用computed模拟）
const formatTime = computed(() => (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'));

// 获取用户列表（模拟接口请求）
const getUserList = async () => {
  loading.value = true;
  try {
    // 模拟接口请求：传递页码、每页条数、搜索关键词
    const res = await mockApi({
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      username: searchKey.value
    });
    userList.value = res.list;
    total.value = res.total;
  } catch (err) {
    ElMessage.error('获取数据失败');
  } finally {
    loading.value = false;
  }
};

// 初始化加载数据
getUserList();

// 新增/编辑/删除方法（示例）
const openAddDialog = () => console.log('打开新增弹窗');
const handleEdit = (row) => console.log('编辑', row);
const handleDelete = (id) => console.log('删除', id);

// 模拟接口
const mockApi = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list: Array(params.pageSize).fill(0).map((_, i) => ({
          id: (params.currentPage - 1) * params.pageSize + i + 1,
          username: `用户${params.currentPage}-${i+1}${params.username}`,
          gender: i % 2 === 0 ? '男' : '女',
          createTime: new Date().toISOString()
        })),
        total: 100
      });
    }, 500);
  });
};
</script>
```

#### 关键用法：

- `el-table` 的 `:data` 绑定数据源，`border`（边框）、`stripe`（斑马纹）是常用样式属性；
- 表格插槽 `#default="scope"`：通过 `scope.row` 获取当前行数据，实现自定义列内容；
- 分页 `el-pagination` 的 `v-model:current-page`/`v-model:page-size` 双向绑定页码和每页条数；
- `layout` 属性控制分页显示元素（如 `jumper` 是快速跳转输入框）。

### 4. 反馈组件（交互提示）

核心组件：`el-dialog`（弹窗）、`el-message`（消息提示）、`el-notification`（通知）、`el-loading`（加载中）、`el-confirm`（确认框）。

#### 示例 4：弹窗 + 确认框

vue

```vue
<template>
  <!-- 新增用户弹窗 -->
  <el-dialog 
    v-model="isAddDialogOpen" 
    title="新增用户" 
    width="500px"
    :before-close="handleDialogClose"  <!-- 关闭前回调 -->
  >
    <el-form :model="newUserForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="newUserForm.username" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="newUserForm.gender">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="isAddDialogOpen = false">取消</el-button>
      <el-button type="primary" @click="submitNewUser">确定</el-button>
    </template>
  </el-dialog>

  <!-- 触发按钮 -->
  <el-button type="primary" @click="isAddDialogOpen = true">打开弹窗</el-button>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 弹窗显示状态
const isAddDialogOpen = ref(false);

// 新增用户表单
const newUserForm = ref({
  username: '',
  gender: '男'
});

// 提交新增
const submitNewUser = () => {
  if (!newUserForm.value.username) {
    ElMessage.warning('请输入用户名');
    return;
  }
  // 模拟提交成功
  ElMessage.success('新增成功');
  isAddDialogOpen.value = false;
  // 重置表单
  newUserForm.value = { username: '', gender: '男' };
};

// 弹窗关闭前回调（确认是否放弃编辑）
const handleDialogClose = (done) => {
  ElMessageBox.confirm(
    '是否放弃已输入的内容？',
    '确认关闭',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    done(); // 确认关闭
  }).catch(() => {
    // 取消关闭，不执行done()
  });
};
</script>
```

#### 关键用法：

- `el-dialog` 的 `v-model` 控制显示 / 隐藏，`#footer` 插槽自定义底部按钮；
- `ElMessageBox.confirm` 是异步确认框，通过 `then/catch` 处理确认 / 取消；
- `ElMessage` 用于轻量提示（成功、警告、错误），`ElNotification` 用于右上角通知（支持自动关闭）。

### 5. 其他常用组件

#### （1）导航组件：`el-menu`（菜单）、`el-breadcrumb`（面包屑）

vue

```vue
<!-- 面包屑 -->
<el-breadcrumb separator="/" style="margin: 16px 0;">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
```

#### （2）上传组件：`el-upload`

vue

```vue
<el-upload
  action="/api/upload"  <!-- 上传接口地址 -->
  :file-list="fileList"
  :on-success="handleUploadSuccess"
  :before-upload="beforeUpload"
  :limit="1"  <!-- 限制上传数量 -->
  accept=".jpg,.png"  <!-- 限制文件类型 -->
  list-type="picture-card"  <!-- 卡片式预览 -->
>
  <i class="el-icon-plus"></i>
</el-upload>

<script setup>
const fileList = ref([]);
// 上传前校验
const beforeUpload = (file) => {
  const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isImage) ElMessage.error('只能上传JPG/PNG格式');
  if (!isLt2M) ElMessage.error('文件大小不能超过2MB');
  return isImage && isLt2M;
};
// 上传成功回调
const handleUploadSuccess = (res) => {
  ElMessage.success('上传成功');
  console.log('文件地址：', res.url);
};
</script>
```

#### （3）下拉菜单：`el-dropdown`

vue

```vue
<el-dropdown @command="handleDropdownCommand">
  <span class="el-dropdown-link">
    操作<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <template #dropdown>
    <el-dropdown-menu>
      <el-dropdown-item command="edit">编辑</el-dropdown-item>
      <el-dropdown-item command="delete" type="danger">删除</el-dropdown-item>
    </el-dropdown-menu>
  </template>
</el-dropdown>

<script setup>
const handleDropdownCommand = (command) => {
  if (command === 'edit') console.log('编辑');
  if (command === 'delete') console.log('删除');
};
</script>
```

## 三、el- 组件的进阶用法

### 1. 组件自定义（样式 / 内容）

- 自定义样式：通过custom-class属性（如el-button custom-btn）或深度选择器（::v-deep/:deep()）修改组件默认样式；

  css

  ```css
  /* 修改按钮颜色 */
  :deep(.el-button--primary) {
    background-color: #165DFF;
    border-color: #165DFF;
  }
  ```

- **插槽自定义**：大部分组件支持插槽（如 `el-table` 的列插槽、`el-dialog` 的头部 / 底部插槽），实现个性化内容；

- **主题定制**：Element Plus 支持通过 SCSS 变量（如 `$--color-primary`）或在线主题编辑器修改全局主题色、字体、边距等。

### 2. 按需引入（优化打包体积）

Element Plus 支持按需引入，避免全量引入导致包体积过大：

javascript

运行

```javascript
// main.js（Vue 3）
import { createApp } from 'vue';
import App from './App.vue';
// 引入需要的组件和样式
import { ElButton, ElForm, ElInput } from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
// 全局注册组件
app.use(ElButton).use(ElForm).use(ElInput);
app.mount('#app');
```

### 3. 组件通信与联动

- 父子组件通信：通过 `props` 传值（如 `el-form` 的 `:model`）、`emit` 事件（如 `el-upload` 的 `@success`）；

- 兄弟组件通信：使用 Vuex/Pinia 或事件总线（`mitt`）；

- 表单联动：通过

  ```
  watch
  ```

  监听表单字段变化，动态修改校验规则或组件状态；

  javascript

  运行

  ```javascript
  // 监听用户名变化，动态修改密码校验规则
  watch(() => loginForm.username, (val) => {
    if (val === 'admin') {
      loginRules.value.password.push({ 
        min: 8, 
        message: '管理员密码至少8位', 
        trigger: 'blur' 
      });
    } else {
      loginRules.value.password = loginRules.value.password.filter(rule => rule.min !== 8);
    }
  });
  ```

  

## 四、常见问题与注意事项

1. **组件不渲染**：检查是否引入组件和样式、Vue 版本是否匹配（Element UI 对应 Vue 2，Element Plus 对应 Vue 3）；
2. **样式错乱**：确保引入了 Element 的样式文件（`import 'element-plus/dist/index.css'`），避免自定义样式覆盖全局样式；
3. **表单校验失效**：`el-form-item` 的 `prop` 必须与 `:model` 中的字段一致，且校验规则的 `trigger` 触发方式正确（如 `blur`/`change`）；
4. **表格性能问题**：大数据量（>1000 条）时，使用 `el-table` 的 `virtual-scroll`（虚拟滚动）或分页加载；
5. **图标不显示**：Element Plus 需单独引入图标库（`import { User, Lock } from '@element-plus/icons-vue'`），或使用全局图标注册。

## 五、总结

`el-` 组件的核心价值是 **“开箱即用的企业级 UI 解决方案”**，用法围绕 “组件实例化 + 属性绑定 + 事件监听 + 插槽自定义” 展开，覆盖从布局、表单、数据展示到交互反馈的全场景。实际开发中，需根据 Vue 版本选择 Element UI/Plus，优先按需引入优化性能，通过插槽和样式定制满足个性化需求。

如需更具体的组件用法（如 `el-tree` 树形结构、`el-tabs` 标签页），可参考官方文档：

- Element Plus（Vue 3）：https://element-plus.org/zh-CN/
- Element UI（Vue 2）：https://element.eleme.io/#/zh-CN