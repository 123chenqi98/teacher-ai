// 学习机产品数据定义

export interface LearningMachineProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  category: number;
  price?: string;
  isNew?: boolean;
}

export interface LearningMachineProductCategory {
  id: number;
  name: string;
}

// 学习机产品分类数据
export const learningMachineProductCategories: LearningMachineProductCategory[] = [
  { id: 1, name: '全部产品' },
  { id: 2, name: '学习机设备' },
  { id: 3, name: '学习软件' },
  { id: 4, name: '教育资源' },
  { id: 5, name: '配件周边' },
];

// 学习机产品数据
export const learningMachineProducts: LearningMachineProduct[] = [
  {
    id: 1,
    name: '智能学习机Pro',
    description: '搭载最新AI芯片，支持语音交互、智能答疑、个性化学习路径推荐，配备10.1英寸高清护眼屏',
    image: '/src/static/logo.png',
    category: 2,
    price: '¥2999.00',
    isNew: true
  },
  {
    id: 2,
    name: '英语听说训练系统',
    description: '专为英语学习设计，提供沉浸式听说训练环境，支持多场景对话模拟和发音评测',
    image: '/src/static/logo.png',
    category: 3,
    price: '¥299.00',
    isNew: true
  },
  {
    id: 3,
    name: '名师精品课程包',
    description: '汇集重点中小学名师课程，覆盖语文、数学、英语等主要学科，同步教材版本',
    image: '/src/static/logo.png',
    category: 4,
    price: '¥599.00',
    isNew: false
  },
  {
    id: 4,
    name: '学习机保护套',
    description: '优质硅胶材质，防摔防刮，专为学习机设计，便于携带和日常保护',
    image: '/src/static/logo.png',
    category: 5,
    price: '¥89.00',
    isNew: false
  },
  {
    id: 5,
    name: '数学思维训练营',
    description: '通过游戏化方式培养数学思维能力，包含数百个互动练习和挑战关卡',
    image: '/src/static/logo.png',
    category: 3,
    price: '¥199.00',
    isNew: true
  },
  {
    id: 6,
    name: '理科实验仿真软件',
    description: '提供物理、化学、生物三科实验仿真环境，安全便捷地进行各类实验操作',
    image: '/src/static/logo.png',
    category: 3,
    price: '¥399.00',
    isNew: true
  },
  {
    id: 7,
    name: '错题本智能分析系统',
    description: '自动收集整理错题，分析错误原因，生成个性化巩固练习',
    image: '/src/static/logo.png',
    category: 3,
    price: '¥159.00',
    isNew: false
  },
  {
    id: 8,
    name: '学习机支架',
    description: '可调节角度金属支架，支持横竖屏切换，桌面收纳更方便',
    image: '/src/static/logo.png',
    category: 5,
    price: '¥129.00',
    isNew: false
  },
  {
    id: 9,
    name: '语文素养提升包',
    description: '涵盖古诗词、文言文、阅读理解等内容，全面提升语文综合素养',
    image: '/src/static/logo.png',
    category: 4,
    price: '¥349.00',
    isNew: true
  },
  {
    id: 10,
    name: '学习机充电底座',
    description: '无线充电+有线快充二合一设计，智能温控保护，充电更安全高效',
    image: '/src/static/logo.png',
    category: 5,
    price: '¥199.00',
    isNew: true
  },
];