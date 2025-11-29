import { ref } from 'vue';

// 定义类型接口
export interface MessageItem {
    sender: string;
    avatar: string;
    time: string;
    content: string;
    type: 'private' | 'comment' | 'mention' | 'system' | 'notice';
    status: 'unread' | 'read';
}

export interface RecipientItem {
    name: string;
    avatar: string;
}

// 生成20条不同的消息数据
const messageList = ref<MessageItem[]>([
    {
        sender: '张老师',
        avatar: 'https://picsum.photos/40/40?random=1',
        time: '今天 10:20',
        content: '本周教案已更新，重点关注三年级语文备课内容，请查收。',
        type: 'private',
        status: 'unread'
    },
    {
        sender: '教研组',
        avatar: 'https://picsum.photos/40/40?random=2',
        time: '昨天 18:05',
        content: '本周三下午2点召开教研会议，主题为新课标教学方法研讨。',
        type: 'comment',
        status: 'read'
    },
    {
        sender: '@系统',
        avatar: 'https://picsum.photos/40/40?random=3',
        time: '2025-11-26 09:15',
        content: '你被李老师提及在三年级资源共享讨论中，快去看看吧。',
        type: 'mention',
        status: 'unread'
    },
    {
        sender: '王老师',
        avatar: 'https://picsum.photos/40/40?random=4',
        time: '2025-11-26 08:30',
        content: '上次你借的教学参考书我急用，方便的话请尽快归还。',
        type: 'private',
        status: 'unread'
    },
    {
        sender: '教务处',
        avatar: 'https://picsum.photos/40/40?random=5',
        time: '2025-11-25 14:20',
        content: '下周一进行教学常规检查，请准备好相关教案和课件。',
        type: 'notice',
        status: 'read'
    },
    {
        sender: '李老师',
        avatar: 'https://picsum.photos/40/40?random=6',
        time: '2025-11-25 10:10',
        content: '请问你有去年五年级的期中测试卷吗？急用，麻烦分享一下。',
        type: 'private',
        status: 'unread'
    },
    {
        sender: '@系统',
        avatar: 'https://picsum.photos/40/40?random=7',
        time: '2025-11-24 16:45',
        content: '你的教学成果分享帖被管理员推荐到首页，获得50积分奖励。',
        type: 'mention',
        status: 'read'
    },
    {
        sender: '后勤组',
        avatar: 'https://picsum.photos/40/40?random=8',
        time: '2025-11-24 09:30',
        content: '明天上午将对教师办公室进行空调检修，请提前做好准备。',
        type: 'notice',
        status: 'unread'
    },
    {
        sender: '赵老师',
        avatar: 'https://picsum.photos/40/40?random=9',
        time: '2025-11-23 15:20',
        content: '关于公开课的课件，我有些修改建议，有空我们讨论一下。',
        type: 'private',
        status: 'read'
    },
    {
        sender: '家长会筹备组',
        avatar: 'https://picsum.photos/40/40?random=10',
        time: '2025-11-23 11:05',
        content: '下周五召开全校家长会，请各位老师准备好学生情况总结。',
        type: 'comment',
        status: 'unread'
    },
    {
        sender: '孙老师',
        avatar: 'https://picsum.photos/40/40?random=11',
        time: '2025-11-22 17:15',
        content: '感谢你分享的教学视频，对我的课堂设计帮助很大，非常感谢！',
        type: 'private',
        status: 'read'
    },
    {
        sender: '@系统',
        avatar: 'https://picsum.photos/40/40?random=12',
        time: '2025-11-22 08:50',
        content: '你订阅的教学期刊已更新，可前往个人中心查看电子版。',
        type: 'system',
        status: 'unread'
    },
    {
        sender: '德育处',
        avatar: 'https://picsum.photos/40/40?random=13',
        time: '2025-11-21 14:00',
        content: '本周开展校园文明月活动，请各班班主任组织好相关主题班会。',
        type: 'notice',
        status: 'read'
    },
    {
        sender: '周老师',
        avatar: 'https://picsum.photos/40/40?random=14',
        time: '2025-11-21 10:40',
        content: '我这边有一些趣味教学小游戏的素材，需要的话我发给你。',
        type: 'private',
        status: 'unread'
    },
    {
        sender: '信息技术组',
        avatar: 'https://picsum.photos/40/40?random=15',
        time: '2025-11-20 16:25',
        content: '学校教学平台将于今晚10点进行升级维护，预计2小时完成。',
        type: 'system',
        status: 'read'
    },
    {
        sender: '钱老师',
        avatar: 'https://picsum.photos/40/40?random=16',
        time: '2025-11-20 09:15',
        content: '请问上周教研会议的纪要出来了吗？麻烦发我一份，谢谢。',
        type: 'private',
        status: 'unread'
    },
    {
        sender: '教研组长',
        avatar: 'https://picsum.photos/40/40?random=17',
        time: '2025-11-19 15:50',
        content: '推荐大家学习这份新课标解读材料，对教学很有帮助。',
        type: 'comment',
        status: 'read'
    },
    {
        sender: '@系统',
        avatar: 'https://picsum.photos/40/40?random=18',
        time: '2025-11-19 10:20',
        content: '你有新的好友申请，来自新进教师吴老师，请及时处理。',
        type: 'mention',
        status: 'unread'
    },
    {
        sender: '财务室',
        avatar: 'https://picsum.photos/40/40?random=19',
        time: '2025-11-18 14:30',
        content: '11月份的教学补贴已发放，请各位老师查收工资条。',
        type: 'notice',
        status: 'read'
    },
    {
        sender: '吴老师',
        avatar: 'https://picsum.photos/40/40?random=20',
        time: '2025-11-18 09:00',
        content: '作为新教师，想向你请教一下班级管理的经验，方便吗？',
        type: 'private',
        status: 'unread'
    }
]);

// 扩展后的收件人列表（包含更多不同的联系人）
const recipientList = ref<RecipientItem[]>([
    { name: '李老师', avatar: 'https://picsum.photos/36/36?random=101' },
    { name: '王老师', avatar: 'https://picsum.photos/36/36?random=102' },
    { name: '教研组', avatar: 'https://picsum.photos/36/36?random=103' },
    { name: '张老师', avatar: 'https://picsum.photos/36/36?random=104' },
    { name: '赵老师', avatar: 'https://picsum.photos/36/36?random=105' },
    { name: '教务处', avatar: 'https://picsum.photos/36/36?random=106' },
    { name: '孙老师', avatar: 'https://picsum.photos/36/36?random=107' },
    { name: '后勤组', avatar: 'https://picsum.photos/36/36?random=108' },
    { name: '周老师', avatar: 'https://picsum.photos/36/36?random=109' },
    { name: '钱老师', avatar: 'https://picsum.photos/36/36?random=110' }
]);

export {
    messageList,
    recipientList
}