//联系我们路由
export const contactUsRouter =[
    {
        //联系我们路
        path: "/contactUs",
        name: "contactUs",
        component: () => import("@/views/contactUs/ContactUsViews.vue")
    }
]
