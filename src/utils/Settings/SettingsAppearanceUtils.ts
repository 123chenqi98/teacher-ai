import {onMounted} from "vue";
import { ElMessage } from 'element-plus'
import { themeMode,
    themeColor,
    customBg,
    fontSize,
    zoomRatio,
    fontFamily,
    sidebarWidth,
    showNavShadow,
    cardRadius} from "@/data/Settings/SettingsAppearanceData.ts"

// 初始化：从本地存储读取设置（模拟持久化）
onMounted(() => {
    const savedSettings = localStorage.getItem('appearanceSettings')
    if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        themeMode.value = settings.themeMode || 'auto'
        themeColor.value = settings.themeColor || '#409eff'
        customBg.value = settings.customBg || false
        fontSize.value = settings.fontSize || 16
        zoomRatio.value = settings.zoomRatio || '1.0'
        fontFamily.value = settings.fontFamily || 'system'
        sidebarWidth.value = settings.sidebarWidth || 220
        showNavShadow.value = settings.showNavShadow || true
        cardRadius.value = settings.cardRadius || 'medium'
        // 应用初始化样式
        applyAppearanceSettings()
    }
})

// 应用外观设置到页面
const applyAppearanceSettings = () => {
    // 1. 主题模式（html 是 HTMLElement，无需断言，但做空值兜底）
    const html = document.documentElement as HTMLElement
    if (themeMode.value === 'dark') {
        html.setAttribute('data-theme', 'dark')
    } else if (themeMode.value === 'light') {
        html.setAttribute('data-theme', 'light')
    } else {
        html.removeAttribute('data-theme')
    }

    // 2. 主题色（html 已断言为 HTMLElement）
    html.style.setProperty('--el-color-primary', themeColor.value)

    // 3. 字体大小
    html.style.fontSize = `${fontSize.value}px`

    // 4. 页面缩放
    html.style.zoom = zoomRatio.value

    // 5. 字体类型
    if (fontFamily.value !== 'system') {
        html.style.fontFamily = fontFamily.value
    } else {
        html.style.fontFamily = ''
    }

    // 6. 侧边栏宽度（通知父组件）
    window.dispatchEvent(new CustomEvent('sidebarWidthChange', { detail: sidebarWidth.value }))

    // 7. 导航栏阴影（核心修正：添加类型断言 + 空值判断）
    const navBar = document.querySelector('.nav-bar') as HTMLElement | null
    if (navBar) { // 先判断是否存在，避免 null 访问 style
        navBar.style.boxShadow = showNavShadow.value ? '0 2px 12px 0 rgba(0,0,0,0.1)' : 'none'
    }

    // 8. 卡片圆角（html 已断言）
    const radiusMap = { small: '4px', medium: '8px', large: '12px' }
    html.style.setProperty('--card-radius', radiusMap[cardRadius.value as keyof typeof radiusMap])
}

// 事件处理：主题模式变更
const handleThemeChange = () => {
    applyAppearanceSettings()
    saveSettings()
    ElMessage.success(`已切换为${themeMode.value === 'light' ? '亮色' : themeMode.value === 'dark' ? '暗色' : '跟随系统'}模式`)
}

// 事件处理：主题色变更
const handleColorChange = () => {
    applyAppearanceSettings()
    saveSettings()
    ElMessage.success('主题色已更新')
}

// 事件处理：自定义背景开关
const handleBgSwitch = () => {
    saveSettings()
    if (customBg.value) {
        ElMessage.info('请选择自定义背景图片')
    } else {
        // 重置背景
        document.body.style.backgroundImage = ''
        ElMessage.success('已关闭自定义背景')
    }
}

// 事件处理：背景图片上传（模拟）
const handleBgUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        document.body.style.backgroundImage = `url(${e.target?.result})`
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundRepeat = 'no-repeat'
        ElMessage.success('自定义背景已设置')
        saveSettings()
    }
    reader.readAsDataURL(file)
    return false // 阻止默认上传
}

// 事件处理：字体大小变更
const handleFontSizeChange = () => {
    applyAppearanceSettings()
    saveSettings()
    ElMessage.success(`字体大小已设置为${fontSize.value}px`)
}

// 事件处理：页面缩放变更
const handleZoomChange = () => {
    applyAppearanceSettings()
    saveSettings()
    ElMessage.success(`页面缩放已设置为${Number(zoomRatio.value) * 100}%`)
}

// 事件处理：字体类型变更
const handleFontFamilyChange = () => {
    applyAppearanceSettings()
    saveSettings()
    ElMessage.success(`字体已切换为${fontFamily.value === 'system' ? '系统默认' : fontFamily.value}`)
}

// 事件处理：侧边栏宽度变更
const handleSidebarWidthChange = () => {
    applyAppearanceSettings()
    saveSettings()
    ElMessage.success(`侧边栏宽度已设置为${sidebarWidth.value}px`)
}

// 事件处理：导航栏阴影变更
const handleNavShadowChange = () => {
    applyAppearanceSettings()
    saveSettings()
    ElMessage.success(showNavShadow.value ? '已显示导航栏阴影' : '已隐藏导航栏阴影')
}

// 事件处理：卡片圆角变更
const handleRadiusChange = () => {
    applyAppearanceSettings()
    saveSettings()
    ElMessage.success(`卡片圆角已设置为${cardRadius.value === 'small' ? '小' : cardRadius.value === 'medium' ? '中' : '大'}`)
}

// 事件处理：重置所有设置
const handleReset = () => {
    themeMode.value = 'auto'
    themeColor.value = '#409eff'
    customBg.value = false
    fontSize.value = 16
    zoomRatio.value = '1.0'
    fontFamily.value = 'system'
    sidebarWidth.value = 220
    showNavShadow.value = true
    cardRadius.value = 'medium'
    // 重置样式
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.style.fontSize = ''
    document.documentElement.style.zoom = ''
    document.documentElement.style.fontFamily = ''
    document.body.style.backgroundImage = ''
    window.dispatchEvent(new CustomEvent('sidebarWidthChange', { detail: 220 }))
    // 保存设置
    saveSettings()
    applyAppearanceSettings()
    ElMessage.success('所有外观设置已重置为默认值')
}

// 保存设置到本地存储（持久化）
const saveSettings = () => {
    const settings = {
        themeMode: themeMode.value,
        themeColor: themeColor.value,
        customBg: customBg.value,
        fontSize: fontSize.value,
        zoomRatio: zoomRatio.value,
        fontFamily: fontFamily.value,
        sidebarWidth: sidebarWidth.value,
        showNavShadow: showNavShadow.value,
        cardRadius: cardRadius.value
    }
    localStorage.setItem('appearanceSettings', JSON.stringify(settings))
}

export {
    handleThemeChange,
    handleColorChange,
    handleBgSwitch,
    handleBgUpload,
    handleFontSizeChange,
    handleZoomChange,
    handleFontFamilyChange,
    handleSidebarWidthChange,
    handleNavShadowChange,
    handleRadiusChange,
    handleReset,

}