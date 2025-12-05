import { createRouter, createWebHistory } from 'vue-router'
import {systemRouters} from "@/router/system/SystemRouters.ts";
import {userInfoRouters} from "@/router/auth/AuthRouters.ts";
import {teacherRouters} from "@/router/teacher/TeacherSideRouter.ts";
import {gradeRouters} from "@/router/admin/GradeRouters.ts";
import {semesterRouters} from "@/router/admin/SemesterRouters.ts";
import {syllabasRouters} from "@/router/admin/SyllabasRouters";
import {subjectRouters} from "@/router/admin/SubjectRouters.ts";
import {AiDialogRouters} from "@/router/AiDialog/AiDialogRouters.ts";
import {StoryRoutes} from "@/router/story/StoryRoutes.ts";
const routes = [
    ...systemRouters,
    ...userInfoRouters,
    ...teacherRouters,
    ...gradeRouters,
    ...semesterRouters,
    ...syllabasRouters,
    ...subjectRouters,
    ...AiDialogRouters,
    ...StoryRoutes
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router



