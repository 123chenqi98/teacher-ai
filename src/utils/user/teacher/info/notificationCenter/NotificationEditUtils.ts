import {type Ref, ref} from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {filteredNotifications} from "@/utils/user/teacher/info/notificationCenter/NotificationListUtils.ts";
import type {NotificationSettings} from "@/data/user/notificationCenterData/NotifficationInterface.ts";
import {rawNotifications} from "@/data/user/notificationCenterData/NotificationListData.ts";
// 严格定义通知类型
export type NotificationType = 'system' | 'important' | 'success' | 'error';

//  导出响应式对象 + 明确类型（分离类型和值）
// 当前选中的标签页（限定可选值，避免非法标签）
const currentTab: Ref<'all' | 'unread' | NotificationType> = ref('all');

// 全选状态
const selectAll: Ref<boolean> = ref(false);

// 通知设置数据（严格匹配接口）
const settings: Ref<NotificationSettings> = ref({
    systemNotice: true,
    importantReminder: true,
    successNotice: true,
    errorReminder: true,
    emailNotification: true,
    smsNotification: false
});

function markSelectedAsRead(): void {
    const selectedItems = filteredNotifications.value.filter(item => item.selected);
    if (selectedItems.length === 0) {
        ElMessage.warning('请先选择要标记的通知');
        return;
    }

    selectedItems.forEach(item => {
        item.read = true;
    });

    ElMessage.success(`已将 ${selectedItems.length} 条通知标记为已读`);
    // 重置选中状态
    selectAll.value = false;
    selectedItems.forEach(item => item.selected = false);
}

// 删除选中的通知
function deleteSelectedNotifications(): void {
    const selectedItems = filteredNotifications.value.filter(item => item.selected);
    if (selectedItems.length === 0) {
        ElMessage.warning('请先选择要删除的通知');
        return;
    }

    ElMessageBox.confirm(
        `确定要删除选中的 ${selectedItems.length} 条通知吗？此操作不可恢复！`,
        '删除确认',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        // 过滤掉选中的通知
        rawNotifications.value = rawNotifications.value.filter(item => !selectedItems.some(selected => selected.id === item.id)
        );
        ElMessage.success(`已删除 ${selectedItems.length} 条通知`);
        selectAll.value = false;
    }).catch(() => {
        ElMessage.info('已取消删除操作');
    });
}

// 清空所有通知
function clearAllNotifications(): void {
    ElMessageBox.confirm(
        '确定要清空所有通知吗？此操作不可恢复！',
        '清空确认',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(() => {
        rawNotifications.value = [];
        ElMessage.success('已清空所有通知');
        selectAll.value = false;
    }).catch(() => {
        ElMessage.info('已取消清空操作');
    });
}

function exportNotifications(): void {
    const selectedItems = filteredNotifications.value.filter(item => item.selected);
    const data = selectedItems.length > 0 ? selectedItems : filteredNotifications.value;
    if (!data.length) {
        ElMessage.info('无可导出的通知记录');
        return;
    }
    const headers = ['编号','标题','发送者','时间','类型','是否已读','内容'];
    const rows = data.map(item => [
        String(item.id).replace(',', ' '),
        item.title.replace('\n',' ').replace(',', ' '),
        item.sender.replace(',', ' '),
        item.time.replace(',', ' '),
        item.type,
        item.read ? '已读' : '未读',
        item.content.replace('\n',' ').replace(',', ' ')
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const now = new Date();
    const ts = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}`;
    link.download = `通知记录_${ts}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    ElMessage.success(`已导出 ${data.length} 条通知记录`);
}

export {
    currentTab,
    selectAll,
    settings,
    markSelectedAsRead,
    deleteSelectedNotifications,
    clearAllNotifications,
    exportNotifications
}
