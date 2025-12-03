// 定义数据接口
interface BenefitItem {
    text: string;
}

interface FeedbackItem {
    name: string;
    duration: string;
    content: string;
}

interface PriceInfo {
    title: string;
    currentPrice: string;
    originalPrice: string;
    features: string[];
    buttonText: string;
}

// 配置数据
const benefits: BenefitItem[] = [
    { text: '专属课程提前预约' },
    { text: '会员专属活动参与权' },
    { text: '个性化成长报告' },
    { text: '优先预约专家咨询' },
    { text: '会员专属礼品' }
]

const feedbacks: FeedbackItem[] = [
    {
        name: '陈妈妈',
        duration: '会员1年',
        content: '会员活动非常丰富，孩子特别喜欢，每次都盼着参加，感谢老师们的精心安排！'
    },
    {
        name: '李爸爸',
        duration: '会员6个月',
        content: '成长报告很专业，让我们能更全面地了解孩子的发展情况，非常有价值。'
    },
    {
        name: '张妈妈',
        duration: '会员3个月',
        content: '专属课程质量很高，孩子学到了很多东西，性格也变得更开朗了，值得推荐！'
    }
]

// 价格信息配置
const priceInfo: PriceInfo = {
    title: '年度会员',
    currentPrice: '¥799',
    originalPrice: '原价 ¥1299',
    features: [
        '包含所有会员权益',
        '12个月会员有效期',
        '赠送2次一对一辅导',
        '专属会员礼包'
    ],
    buttonText: '立即开通'
}

export { benefits, feedbacks, priceInfo, }