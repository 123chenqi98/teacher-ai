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
        roleName: '学生',
        description: '系统中的学生用户,可查看个人相关信息和学习资料',
        permissionScope: '个人学习数据、课程资料、作业提交',
        permissionIds: [1, 2, 5, 6],
        createTime: '2025-09-01 08:00:00',
        userCount: 45,
        type: 'system'
      },
      {
        id: 2,
        roleName: '教师',
        description: '系统中的教师用户,负责班级管理和教学工作',
        permissionScope: '班级管理、课程安排、成绩录入、作业批改',
        permissionIds: [1, 2, 3, 4, 5, 6, 7, 8],
        createTime: '2025-09-01 08:00:00',
        userCount: 5,
        type: 'system'
      },
      {
        id: 3,
        roleName: '家长',
        description: '学生家长用户,可查看子女的学习情况和学校通知',
        permissionScope: '子女成绩、出勤情况、学校通知、家校沟通',
        permissionIds: [1, 2, 5],
        createTime: '2025-09-01 08:00:00',
        userCount: 38,
        type: 'system'
      },
      {
        id: 4,
        roleName: '年级组长',
        description: '负责年级管理的教师,拥有跨班级查看权限',
        permissionScope: '年级所有班级数据、教师管理、成绩分析',
        permissionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        createTime: '2025-10-15 14:30:00',
        userCount: 2,
        type: 'custom'
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