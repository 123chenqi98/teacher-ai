import {reactive, ref} from "vue";
// 编辑目标表单数据
const currentObjectiveRef = ref()

const currentObjective = reactive({
    id: 0,
    title: '',
    description: '',
    deadline: ''
})

export {currentObjective, currentObjectiveRef}