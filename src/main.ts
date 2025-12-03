import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
// 设置全局样式
import "@/assets/GlobalViewCss.css"


const app = createApp(App)
// element图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//pinia
app.use(createPinia())
//  router
app.use(router)
// element plus
app.use(ElementPlus)

app.mount('#app')




