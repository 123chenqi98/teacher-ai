// 角色权限相关 API 服务
// 引入请求工具（若后续对接真实接口，需确保 request 已正确配置）
// 若未封装 request，可先注释该行，当前模拟数据无需依赖
// import request from '@/net/request';
import type { Role, RoleForm } from '@/types/role';
import type { PermissionNode } from '@/types/role';

/**
 * 获取角色列表（模拟假数据，后续可替换为真实接口请求）
 * @returns Promise 包含角色列表数据的响应对象
 */
export function getRoleList(params?: { query?: string; page?: number; size?: number }): Promise<{ code: number; message: string; data: Role[] }> {
  // 模拟接口异步返回数据，与真实接口返回格式保持一致
  return Promise.resolve({
    code: 200, // 状态码（成功标识）
    message: '请求成功', // 响应信息
    data: [
      {
        id: 1,
        roleName: '管理员',
        description: '系统超级管理员，拥有所有操作权限',
        permissionScope: '全部',
        permissionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        createTime: '2025-10-30 10:00:00'
      },
      {
        id: 2,
        roleName: '普通用户',
        description: '仅能查看基础数据，无修改/删除权限',
        permissionScope: '部分',
        permissionIds: [1, 2, 5, 6],
        createTime: '2025-10-31 15:30:00'
      },
      {
        id: 3,
        roleName: '运营人员',
        description: '负责数据统计与内容管理',
        permissionScope: '运营模块',
        permissionIds: [3, 4, 7, 8],
        createTime: '2025-11-01 09:15:00'
      }
    ]
  });
}

// 预留后续扩展接口（如新增/编辑/删除角色），保持文件结构统一
/**
 * 获取权限树数据
 * @returns Promise 权限树数据
 */
export function getPermissionTree(): Promise<{ code: number; message: string; data: PermissionNode[] }> {
  // 模拟权限树数据
  const mockPermissionTree: PermissionNode[] = [
    {
      id: 1,
      label: '系统管理',
      code: 'system',
      type: 'menu',
      children: [
        { id: 11, label: '用户管理', code: 'system:user', type: 'menu' },
        { id: 12, label: '角色管理', code: 'system:role', type: 'menu' },
        { id: 13, label: '系统设置', code: 'system:settings', type: 'menu' }
      ]
    },
    {
      id: 2,
      label: '用户管理',
      code: 'user',
      type: 'menu',
      children: [
        { id: 21, label: '查看用户', code: 'user:view', type: 'button' },
        { id: 22, label: '新增用户', code: 'user:add', type: 'button' },
        { id: 23, label: '编辑用户', code: 'user:edit', type: 'button' },
        { id: 24, label: '删除用户', code: 'user:delete', type: 'button' }
      ]
    },
    {
      id: 3,
      label: '角色管理',
      code: 'role',
      type: 'menu',
      children: [
        { id: 31, label: '查看角色', code: 'role:view', type: 'button' },
        { id: 32, label: '新增角色', code: 'role:add', type: 'button' },
        { id: 33, label: '编辑角色', code: 'role:edit', type: 'button' },
        { id: 34, label: '删除角色', code: 'role:delete', type: 'button' }
      ]
    },
    {
      id: 4,
      label: '教学管理',
      code: 'teaching',
      type: 'menu',
      children: [
        { id: 41, label: '课程管理', code: 'teaching:course', type: 'menu' },
        { id: 42, label: '资源管理', code: 'teaching:resource', type: 'menu' }
      ]
    }
  ];

  return Promise.resolve({
    code: 200,
    message: '获取成功',
    data: mockPermissionTree
  });
}

/**
 * 新增角色
 * @param data 角色信息（角色名称、描述、权限范围等）
 * @returns Promise 响应对象
 */
export function addRole(data: RoleForm) {
  // 模拟新增成功响应，后续替换为真实接口请求
  return Promise.resolve({
    code: 200,
    message: '角色新增成功',
    data: { roleId: Date.now() }
  });
}

/**
 * 编辑角色
 * @param roleId 角色ID
 * @param data 包含角色ID的更新信息
 * @returns Promise 响应对象
 */
export function editRole(roleId: number | string, data: RoleForm) {
  return Promise.resolve({
    code: 200,
    message: '角色修改成功',
    data: null
  });
}

/**
 * 删除角色
 * @param id 角色ID
 * @returns Promise 响应对象
 */
export function deleteRole(id: number | string) {
  return Promise.resolve({
    code: 200,
    message: '角色删除成功',
    data: null
  });
}

/**
 * 复制角色
 * @param roleId 角色ID
 * @param newRoleName 新角色名称
 * @returns Promise 响应对象
 */
export function copyRole(roleId: number | string, newRoleName: string) {
  return Promise.resolve({
    code: 200,
    message: '角色复制成功',
    data: { roleId: Date.now() }
  });
}

/**
 * 导出角色列表
 */
export function exportRoles() {
  return Promise.resolve({
    code: 200,
    message: '导出成功',
    data: { downloadUrl: '/api/export/roles.xlsx' }
  })
}