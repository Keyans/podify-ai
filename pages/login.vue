<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <!-- Logo -->
        <div class="mx-auto flex justify-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
            <span class="text-white font-bold text-xl">灵</span>
          </div>
        </div>
        <h2 class="text-3xl font-bold gradient-text mb-2">
          欢迎回来
        </h2>
        <p class="text-gray-600">
          登录您的灵图AI账户
        </p>
      </div>

      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          class="space-y-6"
          @submit.prevent="handleLogin"
        >
          <!-- 邮箱输入 -->
          <el-form-item prop="email">
            <el-input
              v-model="loginForm.email"
              placeholder="请输入邮箱"
              type="email"
              size="large"
              :prefix-icon="Message"
              class="h-12"
            />
          </el-form-item>

          <!-- 密码输入 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              type="password"
              size="large"
              :prefix-icon="Lock"
              show-password
              class="h-12"
            />
          </el-form-item>

          <!-- 记住我和忘记密码 -->
          <div class="flex items-center justify-between">
            <el-checkbox v-model="loginForm.remember">
              记住我
            </el-checkbox>
            <button type="button" class="text-blue-600 hover:text-blue-800 text-sm">
              忘记密码？
            </button>
          </div>

          <!-- 登录按钮 -->
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              size="large"
              class="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 border-none"
              @click="handleLogin"
            >
              {{ loading ? '登录中...' : '登录' }}
            </el-button>
          </el-form-item>
        </el-form>

        <!-- 第三方登录 -->
        <div class="space-y-4">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">或者使用以下方式登录</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#1877f2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669c1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span class="ml-2">微信</span>
            </button>

            <button
              type="button"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span class="ml-2">QQ</span>
            </button>
          </div>
        </div>

        <!-- 注册链接 -->
        <div class="text-center">
          <span class="text-gray-600">还没有账户？ </span>
          <button type="button" class="text-blue-600 hover:text-blue-800 font-medium">
            立即注册
          </button>
        </div>
      </div>

      <!-- 返回首页 -->
      <div class="text-center">
        <NuxtLink to="/" class="inline-flex items-center text-gray-600 hover:text-gray-800">
          <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
          返回首页
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message, Lock } from '@element-plus/icons-vue'
import { useAuthStore } from '~/stores/auth'

// SEO优化
useSeoMeta({
  title: '登录 - 灵图AI',
  description: '登录您的灵图AI账户，开始您的创作之旅',
  robots: 'noindex'
})

// 禁用默认布局，使用自定义布局
definePageMeta({
  layout: false
})

// 状态管理
const authStore = useAuthStore()

// 响应式数据
const loading = ref(false)
const loginFormRef = ref()

const loginForm = reactive({
  email: '',
  password: '',
  remember: false
})

// 表单验证规则
const loginRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
}

// 登录处理
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    await loginFormRef.value.validate()
    loading.value = true
    
    // 调用登录API
    await authStore.login({
      email: loginForm.email,
      password: loginForm.password
    })
    
    // 登录成功提示
    ElMessage.success('登录成功！')
    
    // 跳转到仪表板或用户指定的页面
    const redirect = useRoute().query.redirect as string
    await navigateTo(redirect || '/dashboard')
    
  } catch (error: any) {
    // 显示错误信息
    ElMessage.error(error?.message || '登录失败，请检查您的账户信息')
  } finally {
    loading.value = false
  }
}

// 检查是否已登录
onMounted(() => {
  if (authStore.isLoggedIn) {
    navigateTo('/dashboard')
  }
})
</script>

<style scoped>
/* Element Plus 自定义样式 */
:deep(.el-input__wrapper) {
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

:deep(.el-button--primary) {
  border-radius: 0.75rem;
  font-weight: 600;
}

:deep(.el-form-item__error) {
  font-size: 0.875rem;
}

/* 渐变按钮悬停效果 */
:deep(.el-button--primary:hover) {
  background: linear-gradient(to right, #4338ca, #7c3aed) !important;
  border-color: transparent !important;
}
</style> 