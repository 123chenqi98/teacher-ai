// 角色相关类型定义

export interface Role {
  id?: number | string;
  roleName: string;
  description: string;
  permissionScope: string;
  permissionIds?: (number | string)[]; // 权限ID数组
  createTime: string;
  userCount?: number; // 用户数量
  type?: 'system' | 'custom'; // 类型：系统角色/自定义角色
}

export interface RoleForm {
  roleName: string;
  description: string;
  permissionIds: (number | string)[];
}

export interface PermissionNode {
  id: number | string;
  label: string;
  code?: string;
  type?: 'menu' | 'button';
  children?: PermissionNode[];
}