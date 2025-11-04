// 系统设置相关 API 服务
import type {
  SystemBasicConfig,
  SystemSecurityConfig,
  NotificationTemplate,
  ResourceCategory,
  TeachingResource,
  SystemLog,
  VersionRecord
} from '@/types/system';

/**
 * 获取系统基础设置
 * @returns Promise 基础设置数据
 */
export function getSystemBasicConfig(): Promise<{ code: number; message: string; data: SystemBasicConfig }> {
  return Promise.resolve({
    code: 200,
    message: '获取成功',
    data: {
      systemName: '小知智能教师系统',
      logo: '',
      copyright: '© 2024 小知智能教师系统 版权所有'
    }
  });
}

/**
 * 保存系统基础设置
 * @param data 基础设置数据
 * @returns Promise 响应对象
 */
export function saveSystemBasicConfig(data: SystemBasicConfig) {
  return Promise.resolve({
    code: 200,
    message: '保存成功',
    data: null
  });
}

/**
 * 上传系统Logo
 * @param file 文件对象
 * @returns Promise 响应对象
 */
export function uploadLogo(file: File) {
  return Promise.resolve({
    code: 200,
    message: '上传成功',
    data: { url: URL.createObjectURL(file) }
  });
}

/**
 * 获取系统安全设置
 * @returns Promise 安全设置数据
 */
export function getSystemSecurityConfig(): Promise<{ code: number; message: string; data: SystemSecurityConfig }> {
  return Promise.resolve({
    code: 200,
    message: '获取成功',
    data: {
      loginFailureLimit: 5,
      passwordValidDays: 90
    }
  });
}

/**
 * 保存系统安全设置
 * @param data 安全设置数据
 * @returns Promise 响应对象
 */
export function saveSystemSecurityConfig(data: SystemSecurityConfig) {
  return Promise.resolve({
    code: 200,
    message: '保存成功',
    data: null
  });
}

/**
 * 获取通知模板列表
 * @param type 模板类型
 * @returns Promise 模板列表数据
 */
export function getNotificationTemplates(type?: 'sms' | 'email') {
  const mockTemplates: NotificationTemplate[] = [
    {
      id: 1,
      type: 'sms',
      name: '登录验证码',
      content: '您的登录验证码是：{code}，有效期5分钟。',
      variables: ['code']
    },
    {
      id: 2,
      type: 'email',
      name: '密码重置',
      content: '您好，您的密码重置链接：{link}，有效期24小时。',
      variables: ['link']
    }
  ];

  let templates = mockTemplates;
  if (type) {
    templates = templates.filter(t => t.type === type);
  }

  return Promise.resolve({
    code: 200,
    message: '获取成功',
    data: templates
  });
}

/**
 * 保存通知模板
 * @param template 模板数据
 * @returns Promise 响应对象
 */
export function saveNotificationTemplate(template: NotificationTemplate) {
  return Promise.resolve({
    code: 200,
    message: '保存成功',
    data: null
  });
}

/**
 * 获取资源分类列表
 * @returns Promise 分类列表数据
 */
export function getResourceCategories() {
  const mockCategories: ResourceCategory[] = [
    {
      id: 1,
      name: '课件',
      parentId: 0,
      sort: 1,
      children: [
        { id: 11, name: '数学课件', parentId: 1, sort: 1 },
        { id: 12, name: '语文课件', parentId: 1, sort: 2 }
      ]
    },
    {
      id: 2,
      name: '视频',
      parentId: 0,
      sort: 2,
      children: [
        { id: 21, name: '教学视频', parentId: 2, sort: 1 },
        { id: 22, name: '实验视频', parentId: 2, sort: 2 }
      ]
    }
  ];

  return Promise.resolve({
    code: 200,
    message: '获取成功',
    data: mockCategories
  });
}

/**
 * 获取教学资源列表
 * @param params 筛选参数
 * @returns Promise 资源列表数据
 */
export function getTeachingResources(params?: { categoryId?: number | string; status?: string; page?: number; size?: number }) {
  const mockResources: TeachingResource[] = [
    {
      id: 1,
      title: '高中数学第一章课件',
      category: '数学课件',
      categoryId: 11,
      author: '张老师',
      uploadTime: '2024-01-10 10:00:00',
      status: 'approved',
      fileSize: '5.2MB'
    },
    {
      id: 2,
      title: '语文古诗词讲解视频',
      category: '教学视频',
      categoryId: 21,
      author: '李老师',
      uploadTime: '2024-01-11 14:00:00',
      status: 'pending',
      fileSize: '120MB'
    }
  ];

  let resources = [...mockResources];
  if (params?.categoryId) {
    resources = resources.filter(r => r.categoryId === params.categoryId);
  }
  if (params?.status) {
    resources = resources.filter(r => r.status === params.status);
  }

  return Promise.resolve({
    code: 200,
    message: '获取成功',
    data: resources,
    total: resources.length
  });
}

/**
 * 审核教学资源
 * @param resourceId 资源ID
 * @param status 审核状态
 * @param reason 拒绝原因（可选）
 * @returns Promise 响应对象
 */
export function auditResource(resourceId: number | string, status: 'approved' | 'rejected', reason?: string) {
  return Promise.resolve({
    code: 200,
    message: status === 'approved' ? '审核通过' : '审核已拒绝',
    data: null
  });
}

/**
 * 获取系统日志
 * @param params 筛选参数
 * @returns Promise 日志列表数据
 */
export function getSystemLogs(params?: { type?: string; level?: string; page?: number; size?: number }) {
  const mockLogs: SystemLog[] = [
    {
      id: 1,
      type: 'operation',
      level: 'info',
      content: '用户登录成功',
      operator: 'admin',
      operationTime: '2024-01-15 10:00:00',
      ip: '192.168.1.100',
      module: '登录模块'
    },
    {
      id: 2,
      type: 'exception',
      level: 'error',
      content: '数据库连接超时',
      operator: 'system',
      operationTime: '2024-01-15 11:00:00',
      module: '数据库模块'
    }
  ];

  let logs = [...mockLogs];
  if (params?.type) {
    logs = logs.filter(l => l.type === params.type);
  }
  if (params?.level) {
    logs = logs.filter(l => l.level === params.level);
  }

  return Promise.resolve({
    code: 200,
    message: '获取成功',
    data: logs,
    total: logs.length
  });
}

/**
 * 导出系统日志
 * @param params 筛选参数
 * @returns Promise 响应对象
 */
export function exportSystemLogs(params?: { type?: string; level?: string }) {
  return Promise.resolve({
    code: 200,
    message: '导出成功',
    data: { downloadUrl: '/api/export/logs.xlsx' }
  });
}

/**
 * 清理缓存
 * @param type 缓存类型（可选，不传则清理所有）
 * @returns Promise 响应对象
 */
export function clearCache(type?: string) {
  return Promise.resolve({
    code: 200,
    message: '缓存清理成功',
    data: null
  });
}

/**
 * 获取版本更新记录
 * @returns Promise 版本记录列表
 */
export function getVersionRecords() {
  const mockVersions: VersionRecord[] = [
    {
      version: 'v1.2.0',
      updateTime: '2024-01-15 10:00:00',
      description: '新增用户管理功能，优化系统性能',
      updater: '系统管理员'
    },
    {
      version: 'v1.1.0',
      updateTime: '2024-01-01 10:00:00',
      description: '首次发布，包含基础功能',
      updater: '系统管理员'
    }
  ];

  return Promise.resolve({
    code: 200,
    message: '获取成功',
    data: mockVersions
  });
}

