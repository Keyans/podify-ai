<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 导航栏 -->
    <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">灵</span>
              </div>
              <span class="text-xl font-bold gradient-text">灵图AI</span>
            </NuxtLink>
          </div>

          <!-- 导航菜单 -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/gallery" class="nav-link">
              灵感资源
            </NuxtLink>
            <NuxtLink to="/app-market" class="nav-link">
              工具箱
            </NuxtLink>
            <NuxtLink to="/my-apps" class="nav-link">
              AI工具箱
            </NuxtLink>
            <NuxtLink to="/workflows" class="nav-link">
              案例共享
            </NuxtLink>
            <NuxtLink to="/dashboard" class="nav-link">
              合作中心
            </NuxtLink>
            <NuxtLink to="/account-settings" class="nav-link">
              关于我们
            </NuxtLink>
          </div>

          <!-- 用户操作区域 -->
          <div class="flex items-center space-x-4">
            <!-- 主题切换 -->
            <button @click="toggleTheme" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <SunIcon v-if="isDark" class="w-5 h-5" />
              <MoonIcon v-else class="w-5 h-5" />
            </button>

            <!-- 登录/用户菜单 -->
            <template v-if="isLoggedIn">
              <el-dropdown trigger="click">
                <div class="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <el-avatar :size="32" :src="userInfo?.avatar" />
                  <span class="text-sm font-medium">{{ userInfo?.name }}</span>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="$router.push('/account-settings')">
                      <UserCircleIcon class="w-4 h-4 mr-2" />
                      个人设置
                    </el-dropdown-item>
                    <el-dropdown-item @click="$router.push('/account-settings/recharge')">
                      <CreditCardIcon class="w-4 h-4 mr-2" />
                      充值中心
                    </el-dropdown-item>
                    <el-dropdown-item divided @click="logout">
                      <ArrowRightEndOnRectangleIcon class="w-4 h-4 mr-2" />
                      退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <template v-else>
              <NuxtLink to="/login" class="btn-primary">
                进入工作台
              </NuxtLink>
            </template>
          </div>

          <!-- 移动端菜单按钮 -->
          <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Icon name="heroicons:bars-3" class="w-6 h-6" />
          </button>
        </div>

        <!-- 移动端菜单 -->
        <div v-show="showMobileMenu" class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
          <div class="space-y-2">
            <NuxtLink to="/gallery" class="mobile-nav-link">灵感资源</NuxtLink>
            <NuxtLink to="/app-market" class="mobile-nav-link">工具箱</NuxtLink>
            <NuxtLink to="/my-apps" class="mobile-nav-link">AI工具箱</NuxtLink>
            <NuxtLink to="/workflows" class="mobile-nav-link">案例共享</NuxtLink>
            <NuxtLink to="/dashboard" class="mobile-nav-link">合作中心</NuxtLink>
            <NuxtLink to="/account-settings" class="mobile-nav-link">关于我们</NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main>
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">灵</span>
              </div>
              <span class="text-lg font-bold gradient-text">灵图AI</span>
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              用灵图AI，畅享创作乐趣<br>
              Less Design, More Creation.
            </p>
          </div>
          <div>
            <h3 class="font-semibold mb-4">产品</h3>
            <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div>AI工具箱</div>
              <div>灵感资源</div>
              <div>案例共享</div>
            </div>
          </div>
          <div>
            <h3 class="font-semibold mb-4">支持</h3>
            <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div>帮助中心</div>
              <div>联系我们</div>
              <div>用户协议</div>
            </div>
          </div>
          <div>
            <h3 class="font-semibold mb-4">关注我们</h3>
            <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div>微信公众号</div>
              <div>官方微博</div>
              <div>技术社区</div>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2024 灵图AI. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { 
  UserCircleIcon, 
  CreditCardIcon, 
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  SunIcon,
  MoonIcon
} from '@heroicons/vue/24/outline'

// 响应式数据
const showMobileMenu = ref(false)

// 使用store
const authStore = useAuthStore()
const themeStore = useThemeStore()

// 计算属性
const isLoggedIn = computed(() => authStore.isLoggedIn)
const userInfo = computed(() => authStore.userInfo)
const isDark = computed(() => themeStore.isDark)

// 方法
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const logout = () => {
  authStore.logout()
  navigateTo('/login')
}

// 关闭移动端菜单（路由变化时）
watch(() => useRoute().path, () => {
  showMobileMenu.value = false
})
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors;
}

.nav-link.router-link-active {
  @apply text-blue-600 dark:text-blue-400;
}

.mobile-nav-link {
  @apply block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors;
}

.mobile-nav-link.router-link-active {
  @apply text-blue-600 dark:text-blue-400;
}
</style> 