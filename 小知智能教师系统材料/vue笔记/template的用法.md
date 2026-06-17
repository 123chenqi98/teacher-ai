### 二、Vue 中使用 `template`（高频场景）

Vue 对 `template` 做了增强，有 3 种核心用法，是前端开发中最常用的场景：

#### 1. 组件根模板（单文件组件 SFC）

Vue 单文件组件（`.vue`）中，`template` 是组件的「HTML 模板入口」，替代原生 HTML 的 `<div>` 作为根容器：

vue

```vue
<!-- UserCard.vue -->
<template>
  <!-- Vue 模板语法（插值、指令等）都写在这里 -->
  <div class="user-card" v-if="show">
    <h3>{{ user.name }}</h3>
    <p>{{ user.role }}</p>
    <button @click="handleEdit">编辑</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const show = ref(true);
const user = ref({ name: '小知老师', role: '数学教师' });
const handleEdit = () => { /* 编辑逻辑 */ };
</script>
```

**特性**：

- 支持 Vue 模板语法（插值 `{{}}`、指令 `v-if`/`v-for`、事件绑定 `@click` 等）；
- 单文件组件中只能有一个根 `<template>`；
- Vue 会将 `template` 编译为渲染函数，性能优于原生拼接 HTML。

#### 2. 模板片段（`<template>` 作为无渲染容器）

Vue 中可在组件内用 `<template>` 包裹多个元素，作为「无标签容器」（不会生成额外 DOM 节点），常配合 `v-if`/`v-for`/`v-slot` 使用：

vue

```vue
<template>
  <!-- 场景1：v-if 分组（避免多余的 div 容器） -->
  <template v-if="user.role === 'teacher'">
    <div>教师专属功能1</div>
    <div>教师专属功能2</div>
  </template>

  <!-- 场景2：v-for 遍历（无需外层容器） -->
  <template v-for="item in list" :key="item.id">
    <span>{{ item.name }}</span>
    <button @click="del(item.id)">删除</button>
  </template>

  <!-- 场景3：具名插槽（slot 载体） -->
  <template v-slot:footer>
    <div class="footer">组件底部内容</div>
  </template>
</template>
```

**核心优势**：

- 不会生成多余的 DOM 节点（如 `<div>`/`<span>`），保持 DOM 结构简洁；
- 支持所有 Vue 指令，是分组渲染、插槽定义的最佳载体。

#### 3. 动态组件 / 自定义模板（`<template>` 配合 `v-is`/`teleport`）

vue

```vue
<!-- 场景1：动态渲染不同模板 -->
<template>
  <component :is="currentComponent"></component>
</template>

<!-- 场景2：teleport 配合 template（指定挂载目标） -->
<teleport to="body">
  <template v-if="showModal">
    <div class="modal">弹窗内容</div>
  </template>
</teleport>
```