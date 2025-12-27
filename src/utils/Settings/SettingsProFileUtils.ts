// 表单引用
import {ref} from "vue";
import { ElMessage ,ElForm,  } from 'element-plus' // 导入FormItemRule类型
import {userInfo} from '@/data/Settings/SettingsProFileData.ts'

const profileFormRef = ref<InstanceType<typeof ElForm>>()


// 其余方法（handleAvatarSuccess、beforeAvatarUpload等）不变
const handleAvatarSuccess = (response: any) => {
    userInfo.avatar = response.data.url
    ElMessage.success('头像上传成功')
}

const beforeAvatarUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJpgOrPng) {
        ElMessage.error('只能上传 JPG/PNG 格式的图片')
    }
    if (!isLt2M) {
        ElMessage.error('图片大小不能超过 2MB')
    }
    return isJpgOrPng && isLt2M
}

const handleSave = async () => {
    if (!profileFormRef.value) return
    try {
        await profileFormRef.value.validate()
        console.log('保存用户信息:', userInfo)
        ElMessage.success('个人资料修改成功')
    } catch (error) {
        console.log('表单验证失败:', error)
    }
}

const handleReset = () => {
    profileFormRef.value?.resetFields()
}

export {
    handleAvatarSuccess,
    beforeAvatarUpload,
    handleSave,
    handleReset,

}