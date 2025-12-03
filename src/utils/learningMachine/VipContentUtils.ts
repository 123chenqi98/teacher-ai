import {ref} from "vue";
import {ElMessage} from "element-plus";
import {promotion} from "@/data/learningMachine/VipContentData.ts";
import router from '@/router'


// 选中的VIP套餐
const selectedPackage = ref(2) // 默认选中年度VIP

// 展开的FAQ项
const expandedFaq = ref<number | null>(null)

// 购买VIP方法 - 修改为跳转到开通页面
const purchaseVip = (pkgId: number) => {
    selectedPackage.value = pkgId
    // 跳转到开通页面
    router.push({
        path: '/learningMachine/vip/checkout',
        query: {pkgId: pkgId.toString()}
    }).then()
}

// 跳转到产品页面
const goToProducts = () => {
    router.push({name: 'intelligentAssistant'}).then();
}

// 查看特权详情
const viewPrivilegeDetail = (privilege: any) => {
    ElMessage.info({
        message: privilege.detail,
        duration: 3000
    })
}

// 查看用户评价详情
const viewTestimonialDetail = (testimonial: any) => {
    ElMessage.success({
        message: `${testimonial.name}（${testimonial.grade}）：${testimonial.content}`,
        duration: 3000
    })
}

// 倒计时函数
const updateCountdown = () => {
    const now = new Date().getTime()
    const endTime = new Date(promotion.endTime).getTime()
    const distance = endTime - now

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        promotion.countdown = `${days}天 ${hours}时 ${minutes}分 ${seconds}秒`
    } else {
        promotion.active = false
    }
}

export {
    selectedPackage,
    expandedFaq,
    purchaseVip,
    goToProducts,
    viewPrivilegeDetail,
    viewTestimonialDetail,
    updateCountdown
}