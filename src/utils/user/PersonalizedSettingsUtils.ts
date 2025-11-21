import {syncDialogVisible} from "@/entity/auth/useinfo/PersonalInformation.ts";
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