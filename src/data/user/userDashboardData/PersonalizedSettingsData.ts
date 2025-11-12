import { reactive } from 'vue'
// 个性化设置表单数据
export const settingsForm = reactive({
    theme: 'purple',
    language: 'zh-CN',
    notifications: {
        system: true,
        message: false,
        marketing: false
    },
    layout: 'card',
    fontSize: 'medium', // 新增字体大小
    defaultTemplate: 'basic', // 新增默认教案模板
    autoSaveTime: '3' // 新增自动保存时间
})

