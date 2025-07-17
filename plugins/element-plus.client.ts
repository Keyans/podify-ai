import ElementPlus from 'element-plus'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus)
  
  // 注册所有图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    nuxtApp.vueApp.component(key, component)
  }

  // 全局属性
  nuxtApp.vueApp.config.globalProperties.$message = ElMessage
  nuxtApp.vueApp.config.globalProperties.$messageBox = ElMessageBox
  nuxtApp.vueApp.config.globalProperties.$notify = ElNotification

  return {
    provide: {
      message: ElMessage,
      messageBox: ElMessageBox,
      notify: ElNotification
    }
  }
}) 