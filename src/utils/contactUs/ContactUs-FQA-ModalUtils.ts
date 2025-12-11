
// 1. 定义FAQ项的类型接口（规范类型）
import {computed, ref} from "vue";
import {faqs} from "@/data/contactUs/ContactUs-FQA-ModalData.ts";

interface FaqItem {
    category: number
    question: string
    answer: string
    open: boolean
}

// 2. 响应式数据 + 显式类型注解
const searchQuery = ref<string>('')
const activeTab = ref<number>(0)
const tabs = ref<string[]>(['全部', '产品使用', '技术支持', '购买咨询', '售后服务'])


// 3. 计算属性 + 类型注解
const filteredFaqs = computed<FaqItem[]>(() => {
    // 1. 按标签筛选
    let filtered: FaqItem[] = activeTab.value === 0
        ? [...faqs] // 解构避免直接引用响应式数组
        : faqs.filter(item => item.category === activeTab.value)

    // 2. 按搜索关键词筛选
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(item =>
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query)
        )
    }

    return filtered
})

// 4. 方法 + 显式参数类型注解（核心修复点）
const toggleFaq = (index: number) => {
    // 关闭其他所有问题
    filteredFaqs.value.forEach((item, i) => {
        if (i !== index) item.open = false
    })
    // 切换当前问题状态
    filteredFaqs.value[index].open = !filteredFaqs.value[index].open
}

// 5. 联系我们方法
const goToContact = (): void => {
    // 可替换为实际路由跳转逻辑（如使用vue-router）
    // router.push('/contact')
    alert('跳转到联系我们页面')
}
export{
    searchQuery,
    activeTab,
    tabs,
    filteredFaqs,
    toggleFaq,
    goToContact,


}