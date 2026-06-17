`display` 是 CSS 核心属性，用于控制元素的**显示类型**和**布局模式**，不同取值对应完全不同的渲染规则。以下是 `display` 所有常用取值的分类讲解，结合场景和示例，帮你彻底掌握各类布局用法：

### 一、基础显示类型（控制元素是否显示 / 基础盒模型）

#### 1. `display: none`

- **作用**：元素完全隐藏，不占据任何 DOM 布局空间，也无法被点击 / 选中；

- **区别于 `visibility: hidden`**：后者仅隐藏视觉，仍占布局空间；

- **场景**：动态隐藏元素（如弹窗关闭、条件渲染）；

- 示例：css

  ```css
  .hidden-element {
    display: none; /* 元素消失，布局空间释放 */
  }
  ```

  

#### 2. `display: block`（块级元素）

- 核心特性：

  - 独占一行，宽度默认撑满父容器（`100%`）；
  - 可设置 `width/height/margin/padding`；

- **默认块级元素**：`div`、`p`、`h1-h6`、`ul/li`、`section` 等；

- **场景**：页面大结构布局（如头部、主体、底部）；

- 示例：css

  ```css
  .block-btn {
    display: block;
    width: 200px;
    height: 40px;
    margin: 10px 0; /* 纵向间距生效 */
  }
  ```

  

#### 3. `display: inline`（行内元素）

- 核心特性：

  - 与其他行内元素同行显示，宽度高度由内容决定；
  - 无法设置 `width/height`，`margin/padding` 仅横向生效（纵向无效）；

- **默认行内元素**：`span`、`a`、`img`（特殊行内替换元素）、`strong` 等；

- **场景**：文本内的局部样式（如高亮、链接）；

- 示例：css

  ```css
  .inline-tag {
    display: inline;
    padding: 2px 8px; /* 仅左右内边距生效 */
    margin: 0 5px; /* 仅左右外边距生效 */
  }
  ```

  

#### 4. `display: inline-block`（行内块元素）

- 核心特性：

  - 兼具 `inline`（同行显示）和 `block`（可设宽高 / 边距）的优点；
  - 元素间会有默认「空白间隙」（因 HTML 换行符）；

- **场景**：按钮、导航项、卡片列表（需同行 + 自定义尺寸）；

- 示例：css

  ```css
  .inline-block-item {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin: 10px; /* 上下左右边距都生效 */
  }
  /* 消除空白间隙：父容器设 font-size: 0，子元素重置 */
  .parent {
    font-size: 0;
  }
  .inline-block-item {
    font-size: 16px;
  }
  ```

  

### 二、现代布局核心（Flex/Grid）

#### 5. `display: flex`（弹性布局）

- 核心特性：

  - 父容器设 `flex` 后，子元素变为「flex 项目」，支持灵活的水平 / 垂直对齐；
  - 一维布局（单行 / 单列），是目前前端布局的「首选方案」；

- 核心配套属性：

  - 父容器：`justify-content`（主轴对齐）、`align-items`（交叉轴对齐）、`flex-direction`（轴方向）、`flex-wrap`（换行）；
  - 子元素：`flex: 1`（占满剩余空间）、`align-self`（单独对齐）；

- **场景**：几乎所有现代布局（导航栏、居中、均分列表、响应式布局）；

- 示例（水平垂直居中）：css

  ```css
  .flex-container {
    display: flex;
    justify-content: center; /* 主轴水平居中 */
    align-items: center; /* 交叉轴垂直居中 */
    width: 100%;
    height: 300px;
  }
  ```

  

#### 6. `display: grid`（网格布局）

- 核心特性：

  - 二维布局（行 + 列），精准控制多行列的尺寸、间距、对齐；
  - 比 Flex 更适合「规整的网格场景」（如商品列表、表单布局）；

- 核心配套属性：

  - 父容器：`grid-template-columns`（列数 / 列宽）、`grid-template-rows`（行数 / 行高）、`gap`（行列间距）；
  - 子元素：`grid-column`（跨列）、`grid-row`（跨行）；

- **场景**：九宫格、商品网格、表单多列布局；

- 示例（4 列商品网格）：css

  ```css
  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4列，每列等分 */
    gap: 15px; /* 行列间距 */
    max-width: 1200px;
    margin: 0 auto;
  }
  ```

  

### 三、特殊布局类型

#### 7. `display: table` 系列（表格布局）

- 核心取值：

  - `display: table`：模拟 `<table>` 标签，父容器；
  - `display: table-row`：模拟 `<tr>`，行；
  - `display: table-cell`：模拟 `<td>`，单元格；

- **核心特性**：`table-cell` 支持 `vertical-align: middle`（垂直居中）；

- **场景**：兼容旧版浏览器的垂直居中（现代项目已被 Flex 替代）；

- 示例（垂直居中）：css

  ```css
  .table-container {
    display: table;
    width: 100%;
    height: 200px;
  }
  .table-cell {
    display: table-cell;
    vertical-align: middle; /* 垂直居中 */
    text-align: center; /* 水平居中 */
  }
  ```

  

#### 8. `display: inline-flex`

- **核心特性**：`flex` + `inline`，父容器本身同行显示（而非独占一行）；

- **区别于 `flex`**：`flex` 父容器是块级（独占一行），`inline-flex` 父容器是行内块级；

- **场景**：行内的弹性布局（如文本旁的按钮组）；

- 示例：css

  ```css
  .inline-flex-group {
    display: inline-flex; /* 按钮组同行显示，且内部弹性布局 */
    align-items: center;
    gap: 8px;
  }
  ```

  

#### 9. `display: inline-grid`

- **核心特性**：`grid` + `inline`，网格容器本身同行显示；

- **场景**：行内的小网格（如文本旁的图标网格）；

- 示例：css

  ```css
  .inline-grid {
    display: inline-grid;
    grid-template-columns: repeat(2, 20px);
    gap: 4px;
  }
  ```

  

#### 10. `display: flow-root`

- **核心特性**：创建一个「块级格式化上下文（BFC）」，自动清除子元素浮动带来的布局塌陷；

- **区别于 `clear: both`**：无需额外清除浮动的伪元素；

- **场景**：解决父容器因子元素浮动导致的高度塌陷；

- 示例：css

  ```css
  .parent {
    display: flow-root; /* 自动包含浮动子元素，高度不塌陷 */
  }
  .child {
    float: left;
    width: 100px;
    height: 100px;
  }
  ```

  

#### 11. `display: contents`

- **核心特性**：元素本身「消失」（不生成盒模型），但子元素保留，继承父容器的布局上下文；

- **场景**：消除多余的嵌套容器（如组件封装时的外层 div）；

- 示例：css

  ```css
  .wrapper {
    display: contents; /* 该 div 不生成盒模型，子元素直接继承父布局 */
  }
  .wrapper > div {
    width: 50px;
    height: 50px;
  }
  ```

  

### 四、移动端 / 响应式适配（display 常用技巧）

| 布局需求                  | 推荐 display 取值 | 核心优势                     |
| ------------------------- | ----------------- | ---------------------------- |
| 导航栏 / 按钮组           | `flex`            | 灵活对齐，适配不同屏幕       |
| 商品网格 / 九宫格         | `grid`            | 二维布局，精准控制行列       |
| 文本内的按钮 / 图标       | `inline-block`    | 同行显示 + 自定义尺寸        |
| 页面大结构（头部 / 主体） | `block`           | 独占一行，撑满宽度           |
| 动态隐藏元素              | `none`            | 释放布局空间                 |
| 行内弹性布局              | `inline-flex`     | 父容器同行显示，内部弹性布局 |

### 五、display 取值优先级与常见坑

1. **优先级**：`!important` > 行内样式 > 内嵌样式 > 外部样式；
2. 常见坑：
   - `inline` 元素设置 `width/height` 无效，需改用 `inline-block/flex`；
   - `flex/grid` 父容器的子元素，`float/clear/vertical-align` 失效；
   - `inline-block` 元素间的空白间隙，需通过父容器 `font-size: 0` 或消除 HTML 换行解决；
   - `display: none` 的元素无法被 JS 获取宽高（需先改为 `block/flex` 再获取）。

### 总结

| 类型     | 核心取值                         | 适用场景                     |
| -------- | -------------------------------- | ---------------------------- |
| 基础显示 | `none/block/inline/inline-block` | 元素显隐、基础盒模型控制     |
| 现代布局 | `flex/grid`                      | 绝大多数前端布局（首选）     |
| 特殊布局 | `table/flow-root/contents`       | 兼容旧版、清除浮动、消除嵌套 |
| 行内布局 | `inline-flex/inline-grid`        | 行内的弹性 / 网格布局        |

现代前端开发中，`flex` 是「通用布局首选」，`grid` 适配「规整二维网格」，`block/inline-block` 用于基础元素控制，`none` 用于显隐，掌握这几个核心取值即可覆盖 99% 的布局场景。