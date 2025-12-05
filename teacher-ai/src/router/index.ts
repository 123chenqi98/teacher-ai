import { createRouter, createWebHistory } from 'vue-router'
import {systemRouters} from "@/router/system/SystemRouters.ts";
import {userInfoRouters} from "@/router/auth/AuthRouters.ts";
import {teacherRouters} from "@/router/teacher/TeacherSideRouter.ts";
import {StoryRoutes} from "@/router/story/StoryRoutes.ts";
import {DialogRoutes} from "@/router/AiDialog/DialogRouters.ts";
import { DocumentRoutes } from "@/router/AiDialog/DocumentRouter.ts";
import { PictureRoutes } from "@/router/AiDialog/PictureRouters.ts";
import { CodeRoutes } from "@/router/AiDialog/CodeRouters.ts";



// 页面路由合并
const routes = [
    ...systemRouters,
    ...userInfoRouters,
    ...teacherRouters,
    ...StoryRoutes,
    ...DialogRoutes,
    ...DocumentRoutes,
    ...PictureRoutes,
    ...CodeRoutes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
