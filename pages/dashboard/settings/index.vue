<template>
  <div 
    class="min-h-screen"
    :style="{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }"
  >
    <div class="flex">
      <!-- 主标题 -->
      <div class="flex-1">
        <div 
          class="border-b pb-4"
          :style="{
            borderColor: 'var(--border-color)'
          }"
        >
          <h2 
            class="text-xl font-medium"
            :style="{ color: 'var(--text-primary)' }"
          >
            账号设置
          </h2>
        </div>
      </div>
    </div>
    
    <div class="flex mt-6 gap-6">
      <!-- 左侧导航 -->
      <div class="w-64 shrink-0">
        <div 
          class="rounded-lg border"
          :style="{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)'
          }"
        >
          <div class="p-4">
            <button 
              @click="setCurrentTab('basic')"
              class="w-full flex items-center p-3 rounded-md mb-2 text-left transition-all duration-200 hover:opacity-80"
              :style="{
                backgroundColor: currentTab === 'basic' ? 'var(--accent-color)' : 'transparent',
                color: currentTab === 'basic' ? 'white' : 'var(--text-primary)'
              }"
            >
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </span>
              <span class="text-sm">基本信息</span>
            </button>
            
            <button 
              @click="setCurrentTab('charge')"
              class="w-full flex items-center p-3 rounded-md mb-2 text-left transition-all duration-200 hover:opacity-80"
              :style="{
                backgroundColor: currentTab === 'charge' ? 'var(--accent-color)' : 'transparent',
                color: currentTab === 'charge' ? 'white' : 'var(--text-primary)'
              }"
            >
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
              </span>
              <span class="text-sm">账号充值</span>
            </button>
            
            <button 
              @click="setCurrentTab('transactions')"
              class="w-full flex items-center p-3 rounded-md mb-2 text-left transition-all duration-200 hover:opacity-80"
              :style="{
                backgroundColor: currentTab === 'transactions' ? 'var(--accent-color)' : 'transparent',
                color: currentTab === 'transactions' ? 'white' : 'var(--text-primary)'
              }"
            >
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm8 10h6v2h-6v-2zm-3-3h9v2h-9v-2zm0-3h9v2h-9V9zm-1 9H5v-2h3v2zm0-3H5v-2h3v2zm0-3H5V9h3v2z"/>
                </svg>
              </span>
              <span class="text-sm">交易记录</span>
            </button>
            
            <button 
              @click="setCurrentTab('subaccounts')"
              class="w-full flex items-center p-3 rounded-md mb-2 text-left transition-all duration-200 hover:opacity-80"
              :style="{
                backgroundColor: currentTab === 'subaccounts' ? 'var(--accent-color)' : 'transparent',
                color: currentTab === 'subaccounts' ? 'white' : 'var(--text-primary)'
              }"
            >
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M9 14.9V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6.1a5 5 0 1 1 6 0zM6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm13 6.1V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6.1a5 5 0 1 1 6 0zM16 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </span>
              <span class="text-sm">子账号管理</span>
            </button>
            
            <button 
              @click="setCurrentTab('permissions')"
              class="w-full flex items-center p-3 rounded-md mb-2 text-left transition-all duration-200 hover:opacity-80"
              :style="{
                backgroundColor: currentTab === 'permissions' ? 'var(--accent-color)' : 'transparent',
                color: currentTab === 'permissions' ? 'white' : 'var(--text-primary)'
              }"
            >
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z"/>
                </svg>
              </span>
              <span class="text-sm">权限设置</span>
            </button>
            
            <button 
              @click="setCurrentTab('team-resources')"
              class="w-full flex items-center p-3 rounded-md mb-2 text-left transition-all duration-200 hover:opacity-80"
              :style="{
                backgroundColor: currentTab === 'team-resources' ? 'var(--accent-color)' : 'transparent',
                color: currentTab === 'team-resources' ? 'white' : 'var(--text-primary)'
              }"
            >
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm9 6h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z"/>
                </svg>
              </span>
              <span class="text-sm">团队资源权限</span>
            </button>
            
            <button 
              @click="setCurrentTab('logout')"
              class="w-full flex items-center p-3 rounded-md text-left transition-all duration-200 hover:opacity-80"
              :style="{
                backgroundColor: currentTab === 'logout' ? 'var(--accent-color)' : 'transparent',
                color: currentTab === 'logout' ? 'white' : 'var(--text-primary)'
              }"
            >
              <span class="w-5 h-5 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5zm10-6l5-4-5-4v3H9v2h6v3z"/>
                </svg>
              </span>
              <span class="text-sm">退出登录</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 右侧内容区域 -->
      <div class="flex-1">
        <!-- 带过渡效果的内容切换 -->
        <Transition name="fade" mode="out-in">
          <component :is="currentComponent" :key="currentTab" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import BasicSettings from '~/components/settings/BasicSettings.vue'
import ChargeSettings from '~/components/settings/ChargeSettings.vue'
import TransactionsSettings from '~/components/settings/TransactionsSettings.vue'
import SubaccountsSettings from '~/components/settings/SubaccountsSettings.vue'
import PermissionsSettings from '~/components/settings/PermissionsSettings.vue'
import TeamResourcesSettings from '~/components/settings/TeamResourcesSettings.vue'
import LogoutSettings from '~/components/settings/LogoutSettings.vue'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 当前选中的标签页
const currentTab = ref('basic')

// 标签页对应的组件映射
const tabComponents = {
  'basic': BasicSettings,
  'charge': ChargeSettings,
  'transactions': TransactionsSettings,
  'subaccounts': SubaccountsSettings,
  'permissions': PermissionsSettings,
  'team-resources': TeamResourcesSettings,
  'logout': LogoutSettings
}

// 当前组件
const currentComponent = computed(() => {
  return tabComponents[currentTab.value] || BasicSettings
})

// 设置当前标签页
const setCurrentTab = (tab) => {
  currentTab.value = tab
  // 更新 URL 但不刷新页面
  if (process.client) {
    const newPath = tab === 'basic' ? '/dashboard/settings' : `/dashboard/settings?tab=${tab}`
    window.history.replaceState({}, '', newPath)
  }
}

// 从 URL 参数初始化标签页
onMounted(() => {
  const route = useRoute()
  if (route.query.tab && tabComponents[route.query.tab]) {
    currentTab.value = route.query.tab
  }
})

// 监听路由变化
watch(() => useRoute().query.tab, (newTab) => {
  if (newTab && tabComponents[newTab]) {
    currentTab.value = newTab
  } else {
    currentTab.value = 'basic'
  }
})

// 标签页名称映射
const tabTitles = {
  'basic': '基本信息',
  'charge': '账号充值',
  'transactions': '交易记录',
  'subaccounts': '子账号管理',
  'permissions': '权限设置',
  'team-resources': '团队资源权限',
  'logout': '退出登录'
}

useHead({
  title: computed(() => `${tabTitles[currentTab.value]} - 账号设置 - CUZCUZAI`),
  meta: [
    { name: 'description', content: '管理您的账号设置' }
  ]
})
</script>

<style scoped>
/* 淡入淡出过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 按钮悬停效果 */
button:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

/* 平滑过渡 */
* {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
</style>