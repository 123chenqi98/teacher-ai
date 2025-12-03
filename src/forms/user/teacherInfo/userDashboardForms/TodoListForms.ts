import { ref } from 'vue'

type Priority = 'high' | 'medium' | 'low'

const todoDialogVisible = ref(false)

const todoForm = ref({
  title: '',
  priority: 'medium' as Priority,
  deadline: '',
  completed: false,
})

const todoRules = {
  title: [{ required: true, message: '请输入任务标题', trigger: 'blur' }],
  priority: [{ required: true, message: '请选择优先级', trigger: 'change' }],
  deadline: [{ required: true, message: '请输入截止时间', trigger: 'blur' }],
}

const openTodoDialog = () => {
  todoDialogVisible.value = true
}

const closeTodoDialog = () => {
  todoDialogVisible.value = false
}

const resetTodoForm = () => {
  todoForm.value = { title: '', priority: 'medium', deadline: '', completed: false }
}

export {
  todoDialogVisible,
  todoForm,
  todoRules,
  openTodoDialog,
  closeTodoDialog,
  resetTodoForm,
}