在 Vue 中，`v-model` 是 **双向绑定指令**，核心作用是「同步数据与 UI 状态」—— 数据变了，UI 会自动更新；用户操作 UI（比如输入、选择），数据也会自动同步。

它本质是 **语法糖**，简化了「绑定数据（`:value`）+ 监听事件（`@input`）」的写法，让代码更简洁。

### 一、核心逻辑（先懂底层，再用表层）

`v-model="xxx"` 等价于：

vue

```vue
:value="xxx"  <!-- 把数据 xxx 绑定到 UI 上 -->
@input="xxx = $event"  <!-- 监听 UI 的输入事件，把新值赋给 xxx -->
```

（不同组件 / 元素的事件名可能不同，比如复选框是 `@change`，但 `v-model` 会自动适配，不用手动关心）

### 二、最常用场景：原生表单元素

`v-model` 天生适配 `<input>`、`<textarea>`、`<select>` 等原生表单，直接绑定响应式数据即可。

#### 1. 文本输入（input/textarea）

适用于普通文本、密码、多行文本等，绑定字符串类型数据。

vue

```vue
<template>
  <!-- 单行文本 -->
  <input v-model="username" placeholder="请输入用户名" />
  <p>你输入的用户名：{{ username }}</p>

  <!-- 密码框（v-model 不区分 input 类型，自动同步值） -->
  <input type="password" v-model="password" placeholder="请输入密码" />

  <!-- 多行文本（textarea 不用写 value 属性，v-model 直接绑定） -->
  <textarea v-model="intro" placeholder="个人简介"></textarea>
</template>

<script setup>
import { ref } from 'vue'
// 响应式数据（初始值可选）
const username = ref('')  // 初始为空字符串
const password = ref('')
const intro = ref('')
</script>
```

效果：用户输入时，`username`/`password`/`intro` 会实时同步，页面上的 `{{ username }}` 也会实时更新。

#### 2. 复选框（checkbox）

分两种情况：单个复选框（绑定布尔值）、多个复选框（绑定数组）。

vue

```vue
<template>
  <!-- 1. 单个复选框（是否选中，绑定布尔值） -->
  <label>
    <input type="checkbox" v-model="isAgree" /> 同意用户协议
  </label>
  <p>是否同意：{{ isAgree ? '是' : '否' }}</p>

  <!-- 2. 多个复选框（多选，绑定数组，value 为选中后存入数组的值） -->
  <div>选择爱好：</div>
  <label><input type="checkbox" v-model="hobbies" value="篮球" /> 篮球</label>
  <label><input type="checkbox" v-model="hobbies" value="读书" /> 读书</label>
  <label><input type="checkbox" v-model="hobbies" value="旅行" /> 旅行</label>
  <p>你的爱好：{{ hobbies }}</p>
</template>

<script setup>
import { ref } from 'vue'
const isAgree = ref(false)  // 单个复选框：默认未选中
const hobbies = ref([])     // 多个复选框：默认空数组
</script>
```

效果：勾选 “同意协议”，`isAgree` 变成 `true`；勾选多个爱好，`hobbies` 数组会自动添加 / 删除对应的 `value`（比如 `['篮球', '旅行']`）。

#### 3. 单选框（radio）

多个单选框绑定同一个变量（字符串类型），选中项的 `value` 会赋给变量。

vue

```vue
<template>
  <div>选择性别：</div>
  <label><input type="radio" v-model="gender" value="male" /> 男</label>
  <label><input type="radio" v-model="gender" value="female" /> 女</label>
  <p>你的性别：{{ gender }}</p>
</template>

<script setup>
import { ref } from 'vue'
const gender = ref('')  // 初始为空，选中后变成对应 value
</script>
```

#### 4. 下拉选择器（select）

单选下拉（绑定字符串）、多选下拉（绑定数组，需加 `multiple` 属性）。

vue

```vue
<template>
  <!-- 1. 单选下拉 -->
  <select v-model="city">
    <option value="">请选择城市</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
  </select>
  <p>选中城市：{{ city }}</p>

  <!-- 2. 多选下拉（加 multiple，按住 Ctrl 多选） -->
  <select v-model="tags" multiple>
    <option value="vue">Vue</option>
    <option value="react">React</option>
  </select>
  <p>选中标签：{{ tags }}</p>
</template>

<script setup>
import { ref } from 'vue'
const city = ref('')    // 单选：字符串
const tags = ref([])    // 多选：数组
</script>
```

### 三、组件上的用法（重点！对应你之前的 el-tabs）

`v-model` 不仅能用于原生元素，还能用于 **自定义组件或 UI 库组件**（比如 Element Plus 的 `el-tabs`、`el-input` 等），核心是组件内部实现了 `value` 属性和 `input` 事件的适配。

以你之前的 `el-tabs` 为例：

vue

```vue
<el-tabs v-model="activeTab" ...>
  <el-tab-pane name="profile" ... />
</el-tabs>
```

这里的逻辑是：

1. 你给 `el-tabs` 绑定 `activeTab`，相当于给组件传了 `:value="activeTab"`；
2. 当你点击标签切换时，`el-tabs` 会触发 `input` 事件，把选中标签的 `name`（比如 `profile`）作为 `$event` 传递；
3. `v-model` 自动把 `$event` 赋给 `activeTab`，实现「数据与选中状态同步」。

再举个 Element Plus `el-input` 的例子（和原生 input 用法一致）：

vue

```vue
<template>
  <el-input v-model="searchText" placeholder="请输入搜索内容" />
  <p>搜索内容：{{ searchText }}</p>
</template>

<script setup>
import { ref } from 'vue'
const searchText = ref('')
</script>
```

UI 库的组件已经帮你封装好了 `value` 和 `input` 逻辑，所以 `v-model` 可以直接用，和原生元素体验一致。

### 四、进阶用法：修饰符

`v-model` 支持添加修饰符，优化使用场景，常用的有 3 个：

#### 1. `.lazy`：失去焦点后同步（默认是实时同步）

原生 input 默认实时同步，用 `.lazy` 可以改为「输入完成、失去焦点（或按回车）」才同步，减少数据更新频率。

vue

```vue
<input v-model.lazy="username" />
<!-- 只有当 input 失去焦点时，username 才会更新 -->
```

#### 2. `.number`：自动转为数字类型

默认输入值是字符串，用 `.number` 可以自动把「能转为数字的输入」转成 Number 类型（比如表单输入年龄、金额）。

vue

```vue
<input v-model.number="age" type="number" />
<p>年龄类型：{{ typeof age }}</p>  <!-- 输入 25，输出 number -->
```

（如果输入非数字内容，会保留字符串类型）

#### 3. `.trim`：自动去除首尾空格

输入时可能不小心输入前后空格，用 `.trim` 自动过滤。

vue

```vue
<input v-model.trim="username" />
<!-- 输入 " 张三 "，会自动转为 "张三" -->
```

### 五、关键总结

1. **核心功能**：双向绑定，数据 ↔ UI 自动同步；

2. **本质**：`v-model="x"` = `:value="x"` + `@input="x = $event"`（语法糖）；

3. 适用场景

   ：

   - 原生表单元素（input/textarea/select/checkbox/radio）；
   - UI 库组件（el-tabs、el-input、el-select 等，需组件支持）；

4. **简化记忆**：不管是原生还是组件，`v-model` 都只需要绑定一个响应式变量，剩下的同步逻辑交给 Vue / 组件处理。

结合你之前的代码，`v-model="activeTab"` 就是让 `activeTab` 变量和 `el-tabs` 的选中状态实时同步 —— 你修改 `activeTab` 的值（比如 `activeTab = 'security'`），标签会自动切换到 “账号安全”；你点击标签切换，`activeTab` 也会自动变成对应标签的 `name`。