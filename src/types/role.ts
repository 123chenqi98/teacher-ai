// 角色相关类型定义

export interface Role {
  id?: number | string;
  roleName: string;
  description: string;
  permissionScope: string;
  permissionIds?: (number | string)[]; // 权限ID数组
  createTime: string;
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