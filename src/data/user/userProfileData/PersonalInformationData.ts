import { ref, computed } from "vue";
const headerTitle = computed(() => {
    switch (activeTab.value) {
        case "security":
            return "账号安全";
        case "login-log":
            return "登录日志";
        case "profile":
        default:
            return "基本信息";
    }
});

const headerSubtitle = computed(() => {
    switch (activeTab.value) {
        case "security":
            return "管理账号安全设置与两步验证";
        case "login-log":
            return "查看最近登录活动与设备";
        case "profile":
        default:
            return "管理您的个人信息、账号安全及隐私设置";
    }
});
// 定义用户信息接口（规范数据类型）
interface UserInfo {
    avatar: string;
    intro: string;
    realName: string;
    nickname: string;
    gender: string;
    birthDate: string;
    phone: string;
    email: string;
    department: string;
    teachingAge: number; // 改为数字类型，展示时拼接"年"
    subject: string;
    title: string;
    hireDate: string;
    educationBackground: string;
}

// 模拟用户数据（实际从接口获取）
const userInfo = ref<UserInfo>({
    avatar: "https://randomuser.me/api/portraits/men/80.jpg",
    intro: "作为拥有十余年教学沉淀的资深教师，不仅熟知各学段知识体系与学生认知规律，更能精准把握课堂节奏与学情动态。在教学中深耕启发式方法，不直接灌输答案，而是以问题为导向、以案例为依托，引导学生主动拆解难题、探索本质，既点燃学习热情，又培养独立思考与解决问题的核心素养。",
    realName: "凯登内格",
    nickname: "内格老师",
    gender: "男",
    birthDate: "2005-08-19",
    phone: "13800138008",
    email: "lihuimin_edu@163.com",
    department: "初中英语教研组",
    teachingAge: 15, // 数字类型
    subject: "初中英语",
    title: "高级教师",
    hireDate: "2010-09-01",
    educationBackground: "硕士",
});

// 定义表单引用
const editFormRef = ref()

// 提交加载态
const isSubmitting = ref(false);

// 标签页激活状态（默认选中个人资料）
const activeTab = ref("profile");

// 编辑模式开关
const isEditing = ref(false);

// 切换编辑模式
const toggleEditMode = () => {
    isEditing.value = !isEditing.value;
};

export { headerTitle, headerSubtitle, userInfo, editFormRef, isSubmitting, activeTab, isEditing, toggleEditMode, type UserInfo };