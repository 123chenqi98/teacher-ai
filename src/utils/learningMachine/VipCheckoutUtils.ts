// 路由和参数
import {vipPackages} from "@/data/learningMachine/VipCheckoutData.ts";
import {ref, watch} from "vue";
import router from '@/router'
import { useRoute } from 'vue-router'
import { buyVipForm } from "@/forms/learningMachine/BuyVipForm.ts";

// 根据ID获取套餐信息
const getPackageById = (id: number) => {
    return vipPackages.find(pkg => pkg.id === id) || vipPackages[1] // 默认返回年度VIP
}

// 选中的支付方式
const selectedPayment = ref(1)

// 页面数据 (初始值为空，会在组件挂载时设置)
const selectedPackage = ref(getPackageById(2))

// 页面加载时获取套餐信息
const loadPackageInfo = () => {
    const route = useRoute()
    // 在浏览器环境中获取查询参数
    const pkgId = Number(route.query.pkgId) || 2
    // 根据套餐ID更新套餐信息
    selectedPackage.value = getPackageById(pkgId)
    
    // 同步表单中的会员类型
    buyVipForm.type = pkgId.toString()
}

// 监听表单中会员类型的变化
watch(() => buyVipForm.type, (newType) => {
    if (newType) {
        const pkgId = parseInt(newType);
        selectedPackage.value = getPackageById(pkgId);
    }
});

// 返回VIP页面
const goBack = () => {
    router.push('/learningMachine/vip').then( )
}

export {
    selectedPackage,
    selectedPayment,
    loadPackageInfo,
    goBack,
    getPackageById
}