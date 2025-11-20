import { createRouter, createWebHistory } from 'vue-router'
import {systemRouters} from "@/router/system/SystemRouters.ts";
import {userInfoRouters} from "@/router/auth/AuthRouters.ts";
import {teacherRouters} from "@/router/teacher/TeacherSideRouter.ts";
import {contactUsRouter} from "@/router/contactUs/ContactUsRouter.ts";

// 页面路由合并
const routes = [
    ...systemRouters,
    ...userInfoRouters,
    ...teacherRouters,
    ...contactUsRouter,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
