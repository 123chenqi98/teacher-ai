// 用户管理相关 API 服务
import type { User, UserForm, UserFilter, UserDetail } from '@/types/user';

/**
 * 获取用户列表
 * @param params 筛选参数
 * @returns Promise 用户列表数据
 */
export function getUserList(params?: UserFilter) {
  // 模拟接口数据
  const mockUsers: User[] = [
    {
      userId: 1,
      username: 'admin',
      role: '管理员',
      roleId: 1,
      phone: '13800138000',
      status: 'enable',
      createTime: '2024-01-01 10:00:00',
      email: 'admin@example.com',
      realName: '王煦登',
      subject: '数学',
      grade: '高一'
    },
    {
      userId: 2,
      username: 'teacher01',
      role: '教师',
      roleId: 2,
      phone: '13800138001',
      status: 'enable',
      createTime: '2024-01-02 11:00:00',
      email: 'teacher01@example.com',
      realName: '吴忠艳',
      subject: '语文',
      grade: '高二'
    },
    {
      userId: 3,
      username: 'student01',
      role: '学生',
      roleId: 3,
      phone: '13800138002',
      status: 'disable',
      createTime: '2024-01-03 12:00:00',
      email: 'student01@example.com',
      realName: '张三',
      subject: '英语',
      grade: '高三'
    }
  ];

  // 模拟筛选逻辑
  let filteredUsers = [...mockUsers];
  if (params?.role) {
    filteredUsers = filteredUsers.filter(u => u.role === params.role);
  }
  if (params?.status) {
    filteredUsers = filteredUsers.filter(u => u.status === params.status);
  }
  if (params?.subject) {
    filteredUsers = filteredUsers.filter(u => u.subject === params.subject);
  }
  if (params?.grade) {
    filteredUsers = filteredUsers.filter(u => u.grade === params.grade);
  }
  if (params?.keyword) {
    const keyword = params.keyword.toLowerCase();
    filteredUsers = filteredUsers.filter(
      u => u.username.toLowerCase().includes(keyword) || u.phone.includes(keyword)
    );
  }

  return Promise.resolve({
    code: 200,
    message: '获取成功',
    data: filteredUsers,
    total: filteredUsers.length
  });
}

/**
 * 获取用户详情
 * @param userId 用户ID
 * @returns Promise 用户详情数据
 */
export function getUserDetail(userId: number | string): Promise<{ code: number; message: string; data: UserDetail }> {
  // 模拟接口数据
  const mockDetail: UserDetail = {
    userId,
    username: 'admin',
    role: '管理员',
    roleId: 1,
    phone: '13800138000',
    status: 'enable',
    createTime: '2024-01-01 10:00:00',
    email: 'admin@example.com',
    realName: '王煦登',
    subject: '数学',
    grade: '高一',
    lastLoginTime: '2024-01-15 14:30:00',
    lastLoginIp: '192.168.1.100',
    permissions: [
      { id: 1, name: '用户管理', code: 'user:view', type: 'menu' },
      { id: 2, name: '角色管理', code: 'role:view', type: 'menu' }
    ],
    operationLogs: [
      {
        id: 1,
        operation: '新增用户',
        operator: 'admin',
        operationTime: '2024-01-15 10:00:00',
        ip: '192.168.1.100',
        result: '成功'
      }
    ]
  };

  return Promise.resolve({
    code: 200,
    message: '获取成功',
    data: mockDetail
  });
}

/**
 * 新增用户
 * @param data 用户信息
 * @returns Promise 响应对象
 */
export function addUser(data: UserForm) {
  return Promise.resolve({
    code: 200,
    message: '用户新增成功',
    data: { userId: Date.now() }
  });
}

/**
 * 编辑用户
 * @param userId 用户ID
 * @param data 用户信息
 * @returns Promise 响应对象
 */
export function editUser(userId: number | string, data: UserForm) {
  return Promise.resolve({
    code: 200,
    message: '用户修改成功',
    data: null
  });
}

/**
 * 删除用户
 * @param userId 用户ID
 * @returns Promise 响应对象
 */
export function deleteUser(userId: number | string) {
  return Promise.resolve({
    code: 200,
    message: '用户删除成功',
    data: null
  });
}

/**
 * 批量删除用户
 * @param userIds 用户ID数组
 * @returns Promise 响应对象
 */
export function batchDeleteUsers(userIds: (number | string)[]) {
  return Promise.resolve({
    code: 200,
    message: '批量删除成功',
    data: null
  });
}

/**
 * 启用/禁用用户
 * @param userId 用户ID
 * @param status 状态
 * @returns Promise 响应对象
 */
export function toggleUserStatus(userId: number | string, status: 'enable' | 'disable') {
  return Promise.resolve({
    code: 200,
    message: status === 'enable' ? '用户已启用' : '用户已禁用',
    data: null
  });
}

/**
 * 批量启用/禁用用户
 * @param userIds 用户ID数组
 * @param status 状态
 * @returns Promise 响应对象
 */
export function batchToggleUserStatus(userIds: (number | string)[], status: 'enable' | 'disable') {
  return Promise.resolve({
    code: 200,
    message: `批量${status === 'enable' ? '启用' : '禁用'}成功`,
    data: null
  });
}

/**
 * 重置密码
 * @param userId 用户ID
 * @returns Promise 响应对象
 */
export function resetPassword(userId: number | string) {
  return Promise.resolve({
    code: 200,
    message: '密码重置成功，新密码已发送至用户手机',
    data: { newPassword: '123456' }
  });
}

/**
 * 导出用户列表
 * @param params 筛选参数
 * @returns Promise 响应对象
 */
export function exportUsers(params?: UserFilter) {
  return Promise.resolve({
    code: 200,
    message: '导出成功',
    data: { downloadUrl: '/api/export/users.xlsx' }
  });
}

