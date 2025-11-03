import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import './styles/theme.css'

const app = createApp(App)

//pinia
app.use(createPinia())
//  router
app.use(router)
// element plus
app.use(ElementPlus)

app.mount('#app')
