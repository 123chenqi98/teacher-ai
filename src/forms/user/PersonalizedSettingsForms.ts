import { ref } from 'vue'

// 控制弹窗显示/隐藏
const syncDialogVisible = ref(false);

// 数据同步处理函数
const handleSync = () => {
    // 模拟同步接口请求
    setTimeout(() => {
        syncDialogVisible.value = true; // 显示弹窗
    }, 800);
};

// 关闭弹窗
const closeDialog = () => {
    syncDialogVisible.value = false;
};

export { syncDialogVisible, handleSync, closeDialog };