import { reactive, ref } from "vue"

// 智能题库表单引用
const smartQuestionBankFormRef = ref()

// 表单数据
const smartQuestionBankForm = reactive({
    discipline: '',              // 课程
    knowledgePoints: '',         // 知识点
    difficulty: '',              // 难度
    questionCount: '',           // 题目数量
    questionType: [] as string[], // 题型（复选框，所以用数组）
    description: '',             // 描述
    file: null as File | null,   //资料文件
    other: ''                    //其他
})

// 表单重置方法
const resetForm = () => {
    if(smartQuestionBankFormRef.value) {
        smartQuestionBankFormRef.value.resetFields()
    }
}

// 进行文件校验
const validateFile = (rule: any, value: File | null, callback: Function) => {
    if (!value) {
        callback(new Error('请上传资料文件'))
    } else if (value.size > 10 * 1024 * 1024) { // 10MB限制
        callback(new Error('文件大小不能超过10MB'))
    } else {
        callback()
    }
}

// 题目数量校验
const validateQuestionCount = (rule: any, value: string, callback: Function) => {
    if (!value) {
        callback(new Error('请输入题目数量'))
    } else if (!/^\d+$/.test(value)) {
        callback(new Error('题目数量只能是数字'))
    } else if (parseInt(value) < 1 || parseInt(value) > 150) {
        callback(new Error('题目数量范围在1到150之间'))
    } else {
        callback()
    }
}

// 表单校验规则
const smartQuestionBankFormRules={
    discipline:[
        {required:true,message:'请选择课程',trigger:["change", "blur"]}
    ],
    knowledgePoints:[
        {required:true,message:'请填写知识点',trigger:["change", "blur"]}
    ],
    difficulty:[
        {required:true,message:'请选择难度',trigger:["change", "blur"]}
    ],
    questionCount:[
        {required:true,message:'请选择题目数量',trigger:["change", "blur"]},
        {validator:validateQuestionCount,trigger:["change", "blur"]}
    ],
    questionType:[
        {required:true,message:'请选择题型',trigger:["change", "blur"]}
    ],
    description:[
        {required:false,min:0,max:500,message:'描述长度在0到500个字符',trigger:["change", "blur"]},
    ],
    file:[
        {
            required:false,
            validator:validateFile,
            trigger:["change", "blur"]
        }
    ],
    other:[
        { required: false },
        { min: 0, max: 500, message: '其他长度在0到500个字符', trigger: ["change", "blur"] }
    ]
}

export {
    smartQuestionBankFormRef,
    smartQuestionBankForm,
    smartQuestionBankFormRules,
    resetForm,
}