import {reactive, ref} from "vue";
const currentKeyResultRef = ref()

const currentKeyResult = reactive({
    id: 0,
    title: '',
    targetValue: 0,
    currentValue: 0
})

export {currentKeyResultRef, currentKeyResult}