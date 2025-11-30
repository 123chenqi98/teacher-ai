// 页面数据
import {ref} from "vue";

// VIP套餐数据
const vipPackages = [
    {
        id: 1,
        name: "月度VIP",
        price: "29.9",
        originalPrice: "49.9",
        period: "1个月",
        features: [
            "全部学习资源访问权限",
            "专属学习报告（每周）",
            "智能答疑服务（10次/月）",
            "1台设备登录",
            "基础练习题库",
            "学习进度跟踪"
        ],
        backgroundColor: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)"
    },
    {
        id: 2,
        name: "年度VIP",
        price: "199",
        originalPrice: "599",
        period: "12个月",
        features: [
            "全部学习资源访问权限",
            "专属学习报告（每周）",
            "智能答疑服务（无限次）",
            "3台设备登录",
            "名师直播课优先参与权",
            "专属客服通道",
            "高级题库访问",
            "模拟考试系统",
            "错题本智能分析",
            "学习计划定制（月度）"
        ],
        backgroundColor: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)"
    },
    {
        id: 3,
        name: "终身VIP",
        price: "999",
        originalPrice: "2999",
        period: "永久",
        features: [
            "全部学习资源访问权限",
            "专属学习报告（每日）",
            "智能答疑服务（无限次）",
            "不限设备登录",
            "名师直播课优先参与权",
            "专属客服通道",
            "新品优先体验权",
            "定制学习计划（周度）",
            "一对一学习咨询（2次/月）",
            "专属学习资料下载",
            "线下活动优先参与权"
        ],
        backgroundColor: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)"
    }
]


// 支付方式
const paymentMethods = ref([
    { id: 1, name: '微信支付', icon: '💬' },
    { id: 2, name: '支付宝', icon: '💰' },
    { id: 3, name: '银行卡', icon: '💳' }
])

export {
    vipPackages,
    paymentMethods
}
