//设置的路由
export const settingsRouter =[
    {
        //设置的路由
        path: "/settings",
        name: "settings",
        component: () => import("@/views/settings/SettingsViews.vue"),
    }
]