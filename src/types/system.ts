// 系统设置相关类型定义

export interface SystemBasicConfig {
  systemName: string;
  logo?: string;
  copyright: string;
}

export interface SystemSecurityConfig {
  loginFailureLimit: number; // 登录失败次数限制
  passwordValidDays: number; // 密码有效期（天）
}

export interface NotificationTemplate {
  id?: number | string;
  type: 'sms' | 'email';
  name: string;
  content: string;
  variables?: string[]; // 模板变量
}

export interface ResourceCategory {
  id: number | string;
  name: string;
  parentId?: number | string;
  sort?: number;
  children?: ResourceCategory[];
}

export interface TeachingResource {
  id: number | string;
  title: string;
  category: string;
  categoryId: number | string;
  author: string;
  uploadTime: string;
  status: 'pending' | 'approved' | 'rejected'; // 待审核/已通过/已拒绝
  fileUrl?: string;
  fileSize?: string;
}

export interface SystemLog {
  id: number | string;
  type: 'system' | 'operation' | 'exception';
  level: 'info' | 'warning' | 'error';
  content: string;
  operator?: string;
  operationTime: string;
  ip?: string;
  module?: string;
}

export interface VersionRecord {
  version: string;
  updateTime: string;
  description: string;
  updater?: string;
}

