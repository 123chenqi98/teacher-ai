//学习机页面路由
export const learningMachineRouters=[
    {
        // 学习机路由
        path: '/learningMachine',
        name: 'learningMachine',
        component:() =>import("@/views/learningMachine/LearningMachineView.vue")
    },
    {
        // 智能助手路由（产品中心）
        path: '/learningMachine/product',
        name: 'intelligentAssistant',
        component:() =>import("@/views/learningMachine/ProductCenterView.vue")
    },
    {
        // 学习机VIP页面路由
        path: '/learningMachine/vip',
        name: 'learningMachineVip',
        component:() =>import("@/views/learningMachine/VipView.vue")
    },
    {
        // 学习机VIP开通页面路由
        path: '/learningMachine/vip/checkout',
        name: 'vipCheckout',
        component:() =>import("@/views/learningMachine/VipCheckoutView.vue")
    },
    {
        // 学习机产品详情页路由
        path: '/intelligentAssistant/product/:id',
        name: 'learningMachineProductDetail',
        component: () => import('@/views/learningMachine/LearningMachineProductDetailView.vue'),
        props: true
    }
]