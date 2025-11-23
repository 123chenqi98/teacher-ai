import {reactive, ref} from "vue";

// 限时优惠活动数据
const promotion = reactive({
    active: true,
    title: "开学季特惠",
    description: "年度VIP立减50元，终身VIP立减200元",
    endTime: "2025-12-31 23:59:59",
    countdown: ""
})
// VIP套餐数据
const vipPackages = ref([
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
        backgroundColor: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        popular: false
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
        backgroundColor: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
        popular: true
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
        backgroundColor: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
        popular: false
    }
])

// VIP特权数据
const privileges = ref([
    {
        id: 1,
        title: "海量学习资源",
        description: "享受所有课程、题库、试卷等学习资源无限制访问",
        icon: "📚",
        detail: "包含小学到高中的全部课程，超过10000+精品题库"
    },
    {
        id: 2,
        title: "智能学习助手",
        description: "AI智能学习助手，个性化学习路径规划",
        icon: "🤖",
        detail: "基于AI算法分析学习情况，提供个性化学习建议"
    },
    {
        id: 3,
        title: "专属学习报告",
        description: "定期生成详细学习报告，追踪学习进度",
        icon: "📊",
        detail: "可视化展示学习进度，提供改进建议"
    },
    {
        id: 4,
        title: "名师直播课",
        description: "免费参与名师直播课程，与名师面对面交流",
        icon: "👨‍🏫",
        detail: "每周更新，涵盖各学科重点难点解析"
    },
    {
        id: 5,
        title: "优先答疑服务",
        description: "专享快速答疑通道，专业老师及时解答",
        icon: "❓",
        detail: "5分钟内响应，专业教师团队提供高质量答疑"
    },
    {
        id: 6,
        title: "学习计划定制",
        description: "根据个人情况定制专属学习计划",
        icon: "📅",
        detail: "根据目标和时间安排，制定个性化学习路线"
    }
])

// 用户评价数据
const testimonials = ref([
    {
        id: 1,
        name: "张同学",
        grade: "高三",
        content: "开通年度VIP后，我的成绩提升了50多名，特别是智能答疑功能真的帮了大忙！",
        rating: 5,
        avatar: ""
    },
    {
        id: 2,
        name: "李家长",
        grade: "初二学生家长",
        content: "孩子使用学习机VIP服务半年了，学习主动性明显提高，推荐给其他家长！",
        rating: 5,
        avatar: ""
    },
    {
        id: 3,
        name: "王同学",
        grade: "高一",
        content: "直播课程质量很高，老师讲解清晰易懂，比线下补习班效果还好。",
        rating: 4,
        avatar: ""
    }
])

// 常见问题数据
const faqs = ref([
    {
        id: 1,
        question: "VIP会员如何开通？",
        answer: "您可以选择合适的套餐点击立即开通，支持微信、支付宝等多种支付方式。"
    },
    {
        id: 2,
        question: "VIP会员权益何时生效？",
        answer: "支付成功后立即生效，您可以在个人中心查看会员有效期。"
    },
    {
        id: 3,
        question: "如何取消VIP会员？",
        answer: "VIP会员为一次性服务，不支持取消，但您可以选择不续费。"
    },
    {
        id: 4,
        question: "VIP会员可以多设备使用吗？",
        answer: "根据套餐不同，支持1-3台设备同时使用，终身VIP不限设备数量。"
    }
])



// 会员成长体系
const growthSystem = ref([
    {
        level: "青铜会员",
        condition: "累计消费0-99元",
        benefits: ["基础学习资源", "每周学习报告", "10次答疑服务/月"]
    },
    {
        level: "白银会员",
        condition: "累计消费100-499元",
        benefits: ["青铜权益+", "高级题库访问", "30次答疑服务/月", "模拟考试系统"]
    },
    {
        level: "黄金会员",
        condition: "累计消费500-999元",
        benefits: ["白银权益+", "名师直播课优先权", "无限次答疑服务", "学习计划定制"]
    },
    {
        level: "钻石会员",
        condition: "累计消费1000元以上",
        benefits: ["黄金权益+", "一对一学习咨询", "新品优先体验", "线下活动参与权"]
    }
])

// VIP专属活动
const vipEvents = ref([
    {
        id: 1,
        title: "名师面对面",
        description: "每月一次的名师在线答疑活动，VIP用户可优先提问",
        date: "每月第2周周六",
        icon: "👨‍🏫"
    },
    {
        id: 2,
        title: "学习成果展示",
        description: "季度性学习成果展示活动，优秀VIP学员可获得奖励",
        date: "每季度末",
        icon: "🏆"
    },
    {
        id: 3,
        title: "专属学习资料",
        description: "定期更新的VIP专属学习资料包，助力学习提升",
        date: "每月初",
        icon: "📚"
    },
    {
        id: 4,
        title: "线下交流会",
        description: "VIP用户专属线下交流会，与名师面对面交流",
        date: "每半年一次",
        icon: "👥"
    }
])

export {
    vipPackages,
    privileges,
    testimonials,
    faqs,
    growthSystem,
    vipEvents,
    promotion
}
