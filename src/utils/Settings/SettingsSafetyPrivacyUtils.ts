import { ref, reactive } from 'vue'
// 开关状态
const switchStates = reactive({
    wechatLogin: false,
    adSetting: false,
    loginRemind: true,
    operateRemind: true
})

// 设备弹窗显示状态
const deviceDialogVisible = ref(false)


// 菜单选择事件（替代原列表项点击）
const handleMenuSelect = (index: string) => {
    switch (index) {
        case 'modifyPwd':
            alert('跳转到修改密码页面')
            break
        case 'modifyPhone':
            alert('跳转到更换绑定手机号页面')
            break
        case 'deviceManage':
            deviceDialogVisible.value = true
            break
        case 'profileVisible':
            alert('跳转到资料可见范围设置（所有人/仅好友/仅自己）')
            break
        case 'authManage':
            alert('跳转到第三方授权管理页面（查看/取消授权）')
            break
        default:
            break
    }
}

// 开关状态变更事件
const handleSwitchChange = (key: string) => {
    const tips = {
        wechatLogin: switchStates.wechatLogin ? '已开启微信快捷登录' : '已关闭微信快捷登录',
        adSetting: switchStates.adSetting ? '已开启个性化广告' : '已关闭个性化广告',
        loginRemind: switchStates.loginRemind ? '已开启异地登录提醒' : '已关闭异地登录提醒',
        operateRemind: switchStates.operateRemind ? '已开启敏感操作提醒' : '已关闭敏感操作提醒'
    }
    alert(tips[key as keyof typeof tips])
}

// 退出设备登录
const handleLogoutDevice = () => {
    if (confirm('确定退出该设备的登录吗？')) {
        alert('已成功退出MacBook Pro的登录')
        deviceDialogVisible.value = false
    }
}

export {
    switchStates,
    deviceDialogVisible,
    handleMenuSelect,
    handleSwitchChange,
    handleLogoutDevice,


}