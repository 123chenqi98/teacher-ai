import {reactive} from "vue";

// 1. 定义FAQ项的类型接口（规范类型）
interface FaqItem {
    category: number
    question: string
    answer: string
    open: boolean
}

const faqs = reactive<FaqItem[]>([
  {
    category: 0,
    question: '小知智能教师如何激活使用？',
    answer: '激活小知智能教师非常简单，您只需按照包装内的说明书步骤操作，连接网络后输入产品激活码即可完成激活。激活码通常位于产品底部或包装盒内侧。',
    open: false
  },
  {
    category: 0,
    question: '学习机支持哪些年龄段使用？',
    answer: '我们的学习机适用于3-18岁的学生使用，不同年龄段有对应的学习内容和功能设置，家长可以根据孩子的实际情况进行调整。',
    open: false
  },
  {
    category: 1,
    question: '如何更新学习机的系统？',
    answer: '学习机系统会不定期推送更新，您可以在"设置-系统更新"中检查并安装最新版本。建议在连接WiFi且电量充足的情况下进行更新操作。',
    open: false
  },
  {
    category: 1,
    question: '学习机可以连接外接设备吗？',
    answer: '是的，我们的学习机支持连接打印机、键盘、鼠标等外接设备，具体支持的设备型号可以参考产品说明书或联系客服咨询。',
    open: false
  },
  {
    category: 2,
    question: '产品出现故障时如何寻求技术支持？',
    answer: '您可以通过400-123-4567热线电话联系我们的技术支持团队，或者发送邮件至contact@example.com详细描述您遇到的问题，我们会尽快为您解决。',
    open: false
  },
  {
    category: 3,
    question: '学习机的保修期是多久？',
    answer: '我们的学习机提供1年整机保修服务，主要部件如屏幕、主板等提供2年保修。保修期限从购买日期开始计算，请妥善保管您的购买凭证。',
    open: false
  },
  {
    category: 4,
    question: '如何申请退换货？',
    answer: '在产品收到后7天内，如产品完好且不影响二次销售，您可以申请无理由退货。质量问题15天内可申请换货，具体退换货政策请参考我们的售后服务条款。',
    open: false
  }
])

export{
  faqs,


}
