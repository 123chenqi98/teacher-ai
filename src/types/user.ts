// 用户相关类型定义

export interface User {
  userId: number | string;
  username: string;
  role: string;
  roleId?: number | string;
  phone: string;
  status: 'enable' | 'disable'; // 启用/禁用
  createTime: string;
  email?: string;
  avatar?: string;
  realName?: string;
  subject?: string; // 学科
  grade?: string; // 年级
}

export interface UserForm {
  username: string;
  password?: string;
  roleId: number | string;
  phone: string;
  email?: string;
  realName?: string;
  subject?: string;
  grade?: string;
  status?: 'enable' | 'disable';
}

export interface UserFilter {
  role?: string;
  status?: 'enable' | 'disable'|'';
  subject?: string;
  grade?: string;
  keyword?: string; // 搜索关键词（用户名、手机号）
}

export interface UserDetail extends User {
  lastLoginTime?: string;
  lastLoginIp?: string;
  permissions?: Permission[];
  operationLogs?: OperationLog[];
}

export interface Permission {
  id: number | string;
  name: string;
  code: string;
  type: 'menu' | 'button';
  children?: Permission[];
}

export interface OperationLog {
  id: number | string;
  operation: string;
  operator: string;
  operationTime: string;
  ip?: string;
  result?: string;
}

