const Profile = () => import('@/components/settings/home/SettingsProFile.vue') // 个人资料页面
const Safety = () => import('@/components/settings/home/SettingsSafetyPrivacy.vue') // 安全与隐私页面
const Appearance = () => import('@/components/settings/home/SettingsAppearance.vue')

//设置的路由
export  const settingsRouter =[
    {
        //设置的路由
        path: "/settings",
        name: "settings",
        component: () => import("@/views/settings/SettingsViews.vue"),
        children: [
            // 子路由（对应左侧导航项，会渲染到父组件的<router-view>中）
            {
                path: "profile",
                name: "profile",
                component: () => Profile,
            },
            {
                path: "safety",
                name: "safety",
                component: () => Safety,
            },
            {
                path: "appearance",
                name: "appearance",
                component: () => Appearance,
            },

        ]
    }
]
