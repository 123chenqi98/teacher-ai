<script setup lang="ts">
//导入 Vue 的 computed 函数，用于创建计算属性
import { computed } from 'vue'
import "@/assets/teacher/SectionHeaderCss.css"

//定义组件的 Props（输入参数）接口
interface Props {
  title: string                          //标题文本
  titleSize?: number                     //标题字体大小
  showViewAll?: boolean                  //是否显示按钮
  titleColor?: string                    //标题文本颜色
  buttonText?: string                    //按钮显示文本
}

//定义 Props 及其默认值
const props = withDefaults(defineProps<Props>(),{
  buttonText: '查看全部',                 //按钮文本默认值
  showViewAll: true,                     //默认显示按钮
  titleSize: 24,                         //默认标题大小 18px
  titleColor: '#333'                     //默认标题颜色深灰色
})

//定义组件会发送的事件（发送给父组件）
defineEmits<{viewAll:[]}>()              //定义viewAll事件，不传参数

//计算属性：根据 Props 动态计算标题的样式
const titleStyle = computed(() => ({
  color: props.titleColor,               //使用Props中的标题颜色
  fontSize: `${props.titleSize}px`       //将Props中的数字转换为 px 单位
}))

</script>

<template>
  <!-- 外层容器 -->
  <div class="section-header">
    <!-- 标题元素：绑定动态计算的样式 -->
    <h2 class="title" :style="titleStyle">
      {{ title }}  <!-- 显示从 Props 中传入的标题文本 -->
    </h2>
    <!-- v-if 根据 Props 决定是否显示按钮 -->
    <!-- @click 点击时向父组件发送 viewAll 事件 -->
    <el-button
        v-if="showViewAll"
        type="text"
        class="view-all-btn"
        @click="$emit('viewAll')"
    >
      {{ buttonText }}
    </el-button>
  </div>
</template>

<style scoped>

</style>
