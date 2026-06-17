`justify-content: flex-end;` 是 CSS Flex 布局中控制**主轴方向子元素对齐方式**的核心属性，作用是 **让 Flex 容器内的子元素沿主轴（默认水平方向）靠 “末端” 对齐**。

### 核心细节

1. **主轴默认方向**：Flex 容器默认 `flex-direction: row`（水平方向），此时 “末端” 就是容器的**右侧**，子元素会整体靠右排列。

2. 与其他对齐方式的区别

   ：

   - `flex-start`（默认）：子元素靠主轴起始端（左侧）对齐；
   - `center`：子元素在主轴居中对齐；
   - `space-between`：子元素两端对齐，中间间距均分；
   - `flex-end`：子元素靠主轴末端（右侧）对齐。

### 实际使用示例

css

```css
/* Flex 容器 */
.parent {
  display: flex;
  justify-content: flex-end; /* 子元素靠右对齐 */
  width: 100%; /* 容器占满宽度，方便观察对齐效果 */
  padding: 10px;
  border: 1px solid #eee;
}

/* 子元素 */
.child {
  width: 80px;
  height: 40px;
  margin-left: 10px; /* 子元素之间的间距 */
  background-color: #f0f0f0;
}
```

vue

```vue
<template>
  <div class="parent">
    <div class="child">子元素1</div>
    <div class="child">子元素2</div>
    <div class="child">子元素3</div>
  </div>
</template>
```

效果：三个子元素会整体靠父容器的右侧排列，而非默认的左侧。

### 适配你的项目场景

在你的教师个人中心页面中，常见使用场景：

- 顶部导航栏的 “用户操作区”（通知、消息、个人信息），用 `justify-content: flex-end` 让其靠右排列；
- 卡片内部的操作按钮组（如 “编辑”“删除”），靠右对齐更符合操作习惯。

### 总结

`justify-content: flex-end;` 本质是 “**Flex 子元素沿主轴末端对齐**”，默认场景下就是 “靠右对齐”，是布局中实现元素靠右排列的常用且灵活的方式（无需用 `float: right`，更适配 Flex 布局逻辑）。