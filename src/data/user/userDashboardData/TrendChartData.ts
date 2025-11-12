import { ref} from 'vue'
import {ElMessage} from "element-plus";

// 本月平台使用趋势数据
export const trendData = ref({
    dates: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日'],
    series: [
        { name: '教案操作', data: [3, 5, 2, 6, 4, 8, 3, 5, 7, 6, 9, 7, 4, 6, 8, 5, 7, 9, 8, 10], color: '#6366f1' },
        { name: '答疑次数', data: [12, 18, 15, 22, 16, 25, 14, 19, 23, 21, 28, 24, 17, 22, 26, 19, 24, 29, 27, 32], color: '#10b981' },
        { name: '资源收藏', data: [2, 3, 1, 4, 2, 3, 1, 2, 4, 3, 5, 3, 2, 4, 3, 2, 5, 4, 3, 6], color: '#f59e0b' },
        { name: '学生互动', data: [8, 12, 10, 15, 11, 16, 9, 13, 14, 12, 18, 15, 10, 14, 17, 12, 15, 19, 16, 20], color: '#ec4899' }
    ],
    growth: [
        { label: '教案操作', value: '12.5%', trend: 'up' },
        { label: '答疑次数', value: '8.3%', trend: 'up' },
        { label: '资源收藏', value: '3.7%', trend: 'up' },
        { label: '学生互动', value: '2.1%', trend: 'down' }
    ]
});

// 下载趋势报表
export const downloadReport = () => {
    ElMessage.success('报表下载成功！');
};
