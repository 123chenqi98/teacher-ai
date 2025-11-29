// 模拟原始通知数据（实际项目中可替换为接口请求）
import {ref} from "vue";
import type {NotificationItem} from "@/forms/user/teacherInfo/notificationCenterForms/NotificationListForms.ts";

const rawNotifications = ref<NotificationItem[]>([
    {
        id: 1,
        title: '系统更新提醒',
        sender: '系统管理员',
        time: '2025-11-27 14:30:00',
        content: '系统将于2025-11-30 23:00进行升级维护，预计持续2小时，期间系统将暂停服务。',
        type: 'system',
        read: false,
        selected: false
    },
    {
        id: 2,
        title: '紧急通知',
        sender: '教务处',
        time: '2025-11-26 09:15:00',
        content: '原定12月1日的期末考试时间调整为12月3日，请各位老师做好准备。',
        type: 'important',
        read: false,
        selected: false
    },
    {
        id: 3,
        title: '操作成功',
        sender: '系统',
        time: '2025-11-25 16:45:00',
        content: '您提交的课程大纲已审核通过。',
        type: 'success',
        read: true,
        selected: false
    },
    {
        id: 4,
        title: '数据导入失败',
        sender: '系统',
        time: '2025-11-24 11:20:00',
        content: '您上传的学生成绩数据格式错误，请检查后重新上传。',
        type: 'error',
        read: true,
        selected: false
    },
    {
        id: 5,
        title: '新功能发布',
        sender: '系统管理员',
        time: '2025-11-23 18:00:00',
        content: '系统已发布新版功能，请及时更新。',
        type: 'system',
        read: false,
        selected: false
    },
    {
        id: 6,
        title: '权限变更提醒',
        sender: '系统管理员',
        time: '2025-11-22 10:30:00',
        content: '您的权限已发生变更，请及时查看。',
        type: 'important',
        read: false,
        selected: false
    },
    {
        id: 7,
        title: '新课程发布',
        sender: '教务处',
        time: '2025-11-21 14:00:00',
        content: '新课程《机器学习》已发布，请及时查看。',
        type: 'system',
        read: false,
        selected: false
    },
    {
        id: 8,
        title: '考试结果发布',
        sender: '教务处',
        time: '2025-11-20 09:00:00',
        content: '考试结果已发布，请及时查看。',
        type: 'system',
        read: false,
        selected: false
    },
    {
        id: 9,
        title: '新通知',
        sender: '系统管理员',
        time: '2025-11-19 16:00:00',
        content: '系统已发布新版通知，请及时查看。',
        type: 'system',
        read: false,
        selected: false
    },
    {
        id: 10,
        title: '新课程发布',
        sender: '教务处',
        time: '2025-11-18 10:00:00',
        content: '新课程《软件工程》已发布，请及时查看。',
        type: 'system',
        read: false,
        selected: false
    },
]);

export { rawNotifications }