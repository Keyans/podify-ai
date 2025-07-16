import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { initTheme } from './store/theme'

// 初始化主题
initTheme()

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
