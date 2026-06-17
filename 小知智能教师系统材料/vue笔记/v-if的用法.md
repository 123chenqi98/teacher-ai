在 Vue 中，`v-if` 是 **条件渲染指令**，核心作用是：**根据表达式的 “真假”，决定元素是否被渲染到 DOM 中**（为 `true` 则渲染，为 `false` 则从 DOM 中移除，而非隐藏）。

它是 Vue 中控制元素 “显示 / 隐藏” 的核心指令，用法灵活，支持单个条件、多条件分支、分组渲染等场景，下面从「基础到进阶」逐步说明：

### 一、核心语法（基础用法）

#### 1. 单个条件：`v-if="表达式"`

表达式可以是 **布尔值、响应式变量、计算属性** 等，只要结果为 “真值”（`true`、非空字符串、非 0 数字等），元素就会渲染；“假值”（`false`、`''`、`0`、`null`、`undefined`）则不渲染。

vue

```vue
<template>
  <!-- 按钮切换条件 -->
  <button @click="isShow = !isShow">切换显示/隐藏</button>

  <!-- 条件为真时，渲染这个 div（否则从 DOM 中移除） -->
  <div v-if="isShow" class="content">
    我只在 isShow 为 true 时才会出现！
  </div>

  <!-- 表达式也可以是计算属性/复杂逻辑 -->
  <div v-if="user.age > 18 && user.isVIP">
    仅成年 VIP 用户可见
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 响应式变量（控制显示隐藏）
const isShow = ref(true) // 初始为 true，默认显示

// 复杂数据示例
const user = reactive({
  age: 20,
  isVIP: true
})
</script>
```

#### 2. 多条件分支：`v-if + v-else-if + v-else`

类似 JavaScript 的 `if-else if-else`，用于处理多个互斥条件，**必须连续书写，不能中间插入其他元素**。

vue

```vue
<template>
  <div class="score-box">
    <p>你的分数：{{ score }}</p>
    <!-- 多条件判断等级 -->
    <div v-if="score >= 90">等级：优秀</div>
    <div v-else-if="score >= 80">等级：良好</div>
    <div v-else-if="score >= 60">等级：及格</div>
    <div v-else>等级：不及格</div> <!-- 所有条件不满足时触发 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
const score = ref(75) // 渲染“等级：及格”
</script>
```

- 执行逻辑：从上到下依次判断，满足第一个条件后，后续分支不再执行；
- `v-else` 不需要写表达式，自动匹配 “所有前面条件都不满足” 的情况。

### 二、进阶用法：控制多个元素（`template` 分组）

如果需要同时控制 **多个元素** 的显示 / 隐藏，不需要给每个元素都加 `v-if`，可以用 `<template>` 标签包裹（虚拟元素，不会被渲染到最终 DOM 中），只给 `<template>` 加 `v-if` 即可。

vue

```vue
<template>
  <button @click="showUserInfo = !showUserInfo">显示/隐藏用户信息</button>

  <!-- template 只做分组，不渲染实际 DOM -->
  <template v-if="showUserInfo">
    <div class="user-item">姓名：张三</div>
    <div class="user-item">年龄：25</div>
    <div class="user-item">邮箱：zhangsan@xxx.com</div>
  </template>
</template>

<script setup>
import { ref } from 'vue'
const showUserInfo = ref(false) // 初始隐藏
</script>
```

### 三、关键注意事项（避坑重点）

#### 1. `v-if` 是 “真实渲染”：移除 DOM 而非隐藏

`v-if` 为 `false` 时，元素会被 **完全从 DOM 树中移除**（不是设置 `display: none`），对应的事件监听器、子组件也会被销毁；为 `true` 时，会重新创建元素并挂载。

#### 2. 与 `v-for` 一起使用的优先级问题（重要！）

- Vue 官方规则：`v-for` 的优先级 **高于** `v-if`，如果同时写在同一个元素上，会先执行 `v-for` 循环，再对每个循环项执行 `v-if` 判断（效率低，不推荐）。

- 错误示例（不推荐）：

  vue

  ```vue
  <!-- 先循环所有列表项，再逐个判断是否显示（多余循环） -->
  <div v-for="item in list" v-if="item.isActive" :key="item.id">
    {{ item.name }}
  </div>
  ```

  

- 正确做法（先过滤数组，再循环）：

  vue

  ```vue
  <template>
    <!-- 用计算属性过滤出需要渲染的项，再循环 -->
    <div v-for="item in activeList" :key="item.id">
      {{ item.name }}
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  const list = ref([
    { id: 1, name: '苹果', isActive: true },
    { id: 2, name: '香蕉', isActive: false },
    { id: 3, name: '橙子', isActive: true }
  ])
  
  // 计算属性过滤：只保留 isActive 为 true 的项
  const activeList = computed(() => list.value.filter(item => item.isActive))
  </script>
  ```

  

#### 3. `key` 避免 DOM 复用导致的问题

Vue 为了优化性能，会复用相同结构的 DOM 元素。如果两个元素结构相似，可能导致意外的状态残留（比如表单输入值）。此时可以用 `key` 标识唯一性，强制 Vue 销毁旧 DOM 并创建新 DOM。

vue

```vue
<template>
  <button @click="isLogin = !isLogin">切换登录/注册</button>

  <!-- 加 key 避免输入框值残留 -->
  <div v-if="isLogin" key="login">
    登录：<input type="text" placeholder="用户名" />
  </div>
  <div v-else key="register">
    注册：<input type="text" placeholder="手机号" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isLogin = ref(true)
</script>
```

- 不加 `key` 时，切换后输入框的内容会保留（因为 Vue 复用了 input 元素）；
- 加 `key` 后，Vue 会认为是两个不同的元素，销毁旧的、创建新的，避免状态残留。

### 四、`v-if` vs `v-show`（核心区别，必懂！）

很多人会混淆 `v-if` 和 `v-show`，两者都能控制显示隐藏，但核心逻辑和使用场景完全不同：

| 特性         | `v-if`                         | `v-show`                                        |
| ------------ | ------------------------------ | ----------------------------------------------- |
| 渲染方式     | 条件为假时 **移除 DOM**        | 条件为假时 **设置 display: none**（DOM 仍存在） |
| 切换开销     | 高（销毁 / 重建 DOM + 组件）   | 低（仅修改 CSS 样式）                           |
| 初始渲染开销 | 低（条件为假时不渲染）         | 高（无论条件真假，都先渲染 DOM）                |
| 支持场景     | 多条件分支（v-else-if/v-else） | 仅单个条件（无分支）                            |
| 适用元素     | 普通元素、template 分组        | 普通元素（不支持 template）                     |

#### 使用场景建议：

- 用 `v-if`：条件 **不频繁切换**（比如页面初始化时判断一次、根据用户角色显示不同内容）、需要多条件分支；
- 用 `v-show`：条件 **频繁切换**（比如按钮控制显示隐藏、Tab 切换中的内容）。

### 五、总结：`v-if` 核心用法

1. 核心功能：根据表达式真假，**渲染 / 移除 DOM 元素**；
2. 基础用法：单个条件（`v-if`）、多条件分支（`v-if + v-else-if + v-else`）；
3. 进阶用法：用 `<template>` 分组控制多个元素；
4. 避坑重点：不与 `v-for` 同元素使用、用 `key` 避免 DOM 复用、区分 `v-show` 的使用场景；
5. 核心原则：**按需渲染**，只在需要时将元素加入 DOM，提升页面性能。

简单说：`v-if` 是 “按需创建”，`v-show` 是 “按需显示”，根据切换频率选择即可。