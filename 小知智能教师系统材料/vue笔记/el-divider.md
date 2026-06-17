`el-divider` 是 Element Plus（Vue 3 组件库）提供的 **分割线组件**，核心作用是「在页面中添加视觉分隔元素」，用于区分不同模块、分组内容，让页面布局更清晰、层次更分明（替代原生 `<hr>` 标签，且自带 UI 库统一的样式和灵活配置）。

它的用法非常简洁，支持 **水平 / 垂直方向、带文本、自定义样式** 等场景，下面从「基础到进阶」逐步说明：

### 一、核心用法：基础分割线（最常用）

#### 1. 水平分割线（默认）

无需额外属性，直接使用 `<el-divider>` 即可生成水平分割线（占满父容器宽度），用于分隔上下两个模块（比如表单分区、列表分组、卡片内容分割）。

vue

```vue
<template>
  <!-- 上方内容 -->
  <div class="module">个人基本信息</div>
  
  <!-- 水平分割线（默认） -->
  <el-divider />
  
  <!-- 下方内容 -->
  <div class="module">账号安全设置</div>
</template>

<style scoped>
.module {
  padding: 16px;
}
</style>
```

效果：上下两个模块之间出现一条灰色水平细线，自动适配父容器宽度。

#### 2. 垂直分割线（需指定方向）

通过 `direction="vertical"` 属性设置为垂直分割线，用于分隔同一行的左右元素（比如导航栏选项、操作按钮组）。

⚠️ 注意：垂直分割线需要 **父容器为 Flex 布局**（或设置固定高度），否则无法正常显示（默认高度为 `100%`，依赖父元素高度）。

vue

```vue
<template>
  <!-- 父容器必须是 Flex 布局，让子元素横向排列且垂直居中 -->
  <div class="horizontal-group">
    <span>首页</span>
    <!-- 垂直分割线 -->
    <el-divider direction="vertical" />
    <span>我的订单</span>
    <el-divider direction="vertical" />
    <span>个人中心</span>
    <el-divider direction="vertical" />
    <span>退出登录</span>
  </div>
</template>

<style scoped>
.horizontal-group {
  display: flex; /* Flex 布局 */
  align-items: center; /* 垂直居中 */
  gap: 16px; /* 元素间距 */
  padding: 16px;
}
</style>
```

效果：横向排列的文本之间，插入垂直细线，实现导航栏选项分隔。

### 二、进阶用法：带文本 / 自定义样式的分割线

#### 1. 带文本的分割线（常用场景）

在分割线中间插入文本，用于给模块分组命名（比如表单分区标题、列表分类），通过 `content-position` 属性控制文本位置（默认 `center` 居中）。

支持 3 种文本位置：`left`（左对齐）、`center`（居中，默认）、`right`（右对齐）。

vue

```vue
<template>
  <!-- 1. 文本居中（默认） -->
  <el-divider content-position="center">基础信息</el-divider>
  <div class="form-group">姓名、年龄、手机号...</div>

  <!-- 2. 文本左对齐 -->
  <el-divider content-position="left">账号安全</el-divider>
  <div class="form-group">密码修改、绑定手机...</div>

  <!-- 3. 文本右对齐 -->
  <el-divider content-position="right">其他设置</el-divider>
  <div class="form-group">通知开关、主题切换...</div>
</template>
```

效果：分割线中间（或左右）显示文本，文本与分割线自动间距适配，视觉更美观。

#### 2. 自定义样式（颜色、粗细、虚线）

通过 Element Plus 提供的属性，或自定义 CSS，修改分割线的样式：

- `border-color`：修改分割线颜色（直接通过 style 绑定）；
- `border-width`：修改分割线粗细；
- `dashed`：设置为虚线分割线（布尔值属性）。

vue

```vue
<template>
  <!-- 1. 自定义颜色 + 加粗 -->
  <el-divider style="border-color: #409eff; border-width: 2px;" />

  <!-- 2. 虚线分割线 -->
  <el-divider dashed />

  <!-- 3. 带文本的虚线 + 自定义文本颜色 -->
  <el-divider dashed content-position="center" style="--el-divider-text-color: #f56c6c;">
    警告区域
  </el-divider>

  <!-- 4. 垂直虚线分割线 -->
  <div class="horizontal-group">
    <button>编辑</button>
    <el-divider direction="vertical" dashed style="border-color: #999;" />
    <button>删除</button>
  </div>
</template>
```

- 注：文本颜色也可以通过 CSS 变量 `--el-divider-text-color` 直接修改，更贴合 Element Plus 样式体系。

### 三、关键属性总结（表格清晰查看）

| 属性名             | 类型    | 可选值                  | 默认值       | 作用                          |
| ------------------ | ------- | ----------------------- | ------------ | ----------------------------- |
| `direction`        | string  | `horizontal`/`vertical` | `horizontal` | 设置分割线方向（水平 / 垂直） |
| `content-position` | string  | `left`/`center`/`right` | `center`     | 带文本时，控制文本位置        |
| `dashed`           | boolean | `true`/`false`          | `false`      | 是否显示为虚线                |

### 四、常见使用场景

1. **表单分区**：分隔不同类别的表单字段（比如 “基础信息” 和 “账号安全” 分区）；
2. **列表分组**：在长列表中分隔不同分类的内容（比如订单列表中 “待付款” 和 “已完成” 分组）；
3. **导航栏 / 操作栏**：用垂直分割线分隔横向排列的选项或按钮；
4. **卡片内容分隔**：在卡片内部分隔标题、内容、操作区；
5. **页面区块划分**：分隔页面中不同功能的大模块（比如 “个人资料” 和 “登录日志” 模块）。

### 五、注意事项（避坑重点）

1. **垂直分割线依赖父容器**：必须让父容器为 `display: flex`（或设置固定高度），否则分割线会因无高度而不显示；
2. **自定义样式优先级**：通过 `style` 绑定的样式优先级高于 Element Plus 默认样式，若需全局修改，可在全局 CSS 中覆盖 `--el-divider-border-color` 等变量；
3. **文本长度限制**：带文本的分割线文本不宜过长，否则会挤压分割线长度，建议控制在 8 字以内；
4. **与原生 `<hr>` 的区别**：`el-divider` 自带统一的间距、颜色、响应式适配，无需手动写样式，且支持垂直方向和文本，比原生 `<hr>` 更灵活、美观。

### 总结：el-divider 核心用法

`el-divider` 是「轻量、美观、配置灵活的视觉分隔工具」，核心用法可概括为：

- 水平分割：直接用 `<el-divider />` 分隔上下模块；
- 垂直分割：加 `direction="vertical"`，父容器设 Flex；
- 带文本分割：中间插文本，用 `content-position` 控制位置；
- 自定义样式：改颜色、粗细、虚线，适配不同视觉需求。

它的核心价值是「让页面布局层次清晰，同时保持 Element Plus 统一的 UI 风格，减少手动写分割线样式的工作量」。