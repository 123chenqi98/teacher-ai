// AI对话相关路由
export const AiDialogRouters = [
  // AI对话主页
  {
    path: '/ai-dialog',
    name: 'AiDialog',
    component: () => import('@/views/AiDialog/DialogView.vue')
  },
  // AI文档生成
  {
    path: '/document',
    name: 'DocumentView',
    component: () => import('@/views/AiDialog/DocumentView.vue')
  },
  // AI图片生成
  {
    path: '/picture',
    name: 'PictureView',
    component: () => import('@/views/AiDialog/PictureView.vue')
  },
  // AI代码生成
  {
    path: '/code',
    name: 'CodeView',
    component: () => import('@/views/AiDialog/CodeView.vue')
  }
]