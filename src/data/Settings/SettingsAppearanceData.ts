// 响应式变量：外观设置项
import {ref} from "vue";

const themeMode = ref('auto') // 主题模式：light/dark/auto
const themeColor = ref('#409eff') // 主题色
const customBg = ref(false) // 是否自定义背景
const fontSize = ref(16) // 字体大小（px）
const zoomRatio = ref('1.0') // 页面缩放比例
const fontFamily = ref('system') // 字体类型
const sidebarWidth = ref(220) // 侧边栏宽度（px）
const showNavShadow = ref(true) // 是否显示导航栏阴影
const cardRadius = ref('medium') // 卡片圆角


export  {
    themeMode,
    themeColor,
    customBg,
    fontSize,
    zoomRatio,
    fontFamily,
    sidebarWidth,
    showNavShadow,
    cardRadius
}