import { computed } from "vue";
//  类型导入
import type {  NotificationType } from "@/utils/user/teacher/info/notificationCenter/NotificationEditUtils.ts";
//  值导入
import { currentTab, selectAll } from "@/utils/user/teacher/info/notificationCenter/NotificationEditUtils.ts";
//  数据导入
import { rawNotifications } from "@/data/user/notificationCenterData/NotificationListData";
import type {NotificationItem} from "@/data/user/notificationCenterData/NotificationInterface.ts";

// 校验原始数据类型
if (!rawNotifications.value) {
    rawNotifications.value = [];
    console.warn("原始通知数据为空，已初始化为空数组");
}

// 根据当前标签筛选通知
const filteredNotifications = computed<NotificationItem[]>(() => {
    // 提前获取值，减少重复访问 .value
    const tab = currentTab.value;
    const notifications = rawNotifications.value;

    switch (tab) {
        case "all":
            return notifications;
        case "unread":
            return notifications.filter((item) => !item.read);
        case "system":
        case "important":
        case "success":
        case "error":
            // 复用类型，避免重复逻辑
            return notifications.filter((item) => item.type === tab);
        default:
            // 非法标签时重置为 all，并给出警告
            console.warn(`非法标签页：${tab}，已切换为 all`);
            currentTab.value = "all";
            return notifications;
    }
});

// 获取通知类型对应的图标类名（严格类型限定）
function getIconClass(type: NotificationType): string {
    const iconMap: Record<NotificationType, string> = {
        system: "fa fa-cog",
        important: "fa fa-exclamation-circle",
        success: "fa fa-check-circle",
        error: "fa fa-times-circle",
    };
    // 兜底值（兼容扩展类型）
    return iconMap[type] || "fa fa-bell";
}

// 获取通知类型对应的图标颜色（严格类型限定）
function getIconColor(type: NotificationType): string {
    const colorMap: Record<NotificationType, string> = {
        system: "#409EFF", // 蓝色
        important: "#E6A23C", // 橙色
        success: "#67C23A", // 绿色
        error: "#F56C6C", // 红色
    };
    // 兜底值
    return colorMap[type] || "#909399"; // 灰色
}

// 切换标签页处理函数（严格类型限定）
function handleTabChange(tabName: "all" | "unread" | NotificationType): boolean {
    // 类型校验：防止传入非法标签
    const validTabs: Array<"all" | "unread" | NotificationType> = [
        "all",
        "unread",
        "system",
        "important",
        "success",
        "error",
    ];

    if (!validTabs.includes(tabName)) {
        console.warn(`非法标签页：${tabName}，拒绝切换`);
        return false; // 阻止切换
    }

    // 合法标签才允许切换
    currentTab.value = tabName;

    // 重置全选和选中状态（安全操作：先判断数组存在）
    if (rawNotifications.value) {
        selectAll.value = false;
        rawNotifications.value.forEach((item) => {
            item.selected = false;
        });
    }

    return true;
}

// 切换全选状态
function toggleSelectAll(): void {
    const filteredList = filteredNotifications.value;
    if (!filteredList.length) return;

    filteredList.forEach((item) => {
        item.selected = selectAll.value;
    });
}

// 单个通知选中状态变化处理
function handleSingleSelect(): void {
    const filteredList = filteredNotifications.value;
    if (!filteredList.length) {
        selectAll.value = false;
        return;
    }

    // 全选：所有项都被选中
    const isAllSelected = filteredList.every((item) => item.selected);
    // 全不选：所有项都未被选中
    const isNoneSelected = filteredList.every((item) => !item.selected);

    if (isAllSelected) {
        selectAll.value = true;
    } else if (isNoneSelected) {
        selectAll.value = false;
    } else {
        // 部分选中：这里可扩展半选状态（需要 UI 配合）
        selectAll.value = false;
        // 可选：向外暴露半选状态，供模板使用
        // isIndeterminate.value = true;
    }
}

// 导出类型
export type { NotificationType };
export {
    filteredNotifications,
    getIconClass,
    getIconColor,
    handleTabChange,
    toggleSelectAll,
    handleSingleSelect,
};