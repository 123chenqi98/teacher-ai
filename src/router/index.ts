import { createRouter, createWebHistory } from 'vue-router'
import { systemRouters } from "@/router/system/SystemRouters.ts";
import { userInfoRouters } from "@/router/auth/AuthRouters.ts";
import { teacherRouters } from "@/router/teacher/TeacherSideRouter.ts";
import { userCenterRoute } from "@/router/user/UserCenterRoute.ts";
import { learningMachineRouters} from "@/router/learningMachine/LearningMachineRouter.ts";
import {contactUsRouter} from "@/router/contactUs/ContactUsRouter.ts";
import {settingsRouter} from "@/router/Settings/SettingsRouter.ts";
import {AiDialogRouters} from "@/router/AiDialog/AiDialogRouters.ts";
import {StoryRoutes} from "@/router/story/StoryRoutes.ts";
const routes = [
    ...systemRouters,
    ...userInfoRouters,
    ...teacherRouters,
    ...userCenterRoute,
    ...learningMachineRouters,
    ...contactUsRouter,
    ...settingsRouter,
    ...AiDialogRouters,
    ...StoryRoutes
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router