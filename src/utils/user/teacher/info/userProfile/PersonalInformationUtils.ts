// 提交加载态
import { ref } from "vue";

const isSubmitting = ref(false);

// 标签页激活状态（默认选中个人资料）
const activeTab = ref("profile");

// 编辑模式开关
const isEditing = ref(false);

// 切换编辑模式
const toggleEditMode = () => {
    isEditing.value = !isEditing.value;
};

export {
    isSubmitting,
    activeTab,
    isEditing,
    toggleEditMode
}