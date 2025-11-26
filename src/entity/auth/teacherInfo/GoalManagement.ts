import { ref } from "vue";

// 编辑目标弹窗显隐
const dialogVisible = ref(false)
// 编辑模式
const editMode = ref(false)


const keyResultDialogVisible = ref(false)
const objectiveIdForKeyResult = ref(0)

export { dialogVisible, editMode, keyResultDialogVisible, objectiveIdForKeyResult }