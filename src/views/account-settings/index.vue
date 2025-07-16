<template>
  <div class="flex h-full bg-gray-50 dark:bg-dark-bg">
    <!-- 侧边栏 -->
    <div class="w-64 bg-white dark:bg-dark-card shadow-sm border-r border-gray-200 dark:border-dark-border">
      <div class="p-6">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-dark-text mb-6">账号设置</h1>

        <!-- 导航菜单 -->
        <nav class="space-y-2">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="[
              $route.path === item.path
                ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                : 'text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-border'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            {{ item.name }}
          </router-link>
        </nav>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="flex-1 overflow-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  UserIcon,
  CreditCardIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline';

// 菜单项配置
const menuItems = computed(() => [
  {
    name: '基本信息',
    path: '/account-settings/profile',
    icon: UserIcon
  },
  {
    name: '账号充值',
    path: '/account-settings/recharge',
    icon: CreditCardIcon
  },
  {
    name: '交易记录',
    path: '/account-settings/transactions',
    icon: ClipboardDocumentListIcon
  },
  {
    name: '子账号管理',
    path: '/account-settings/sub-accounts',
    icon: UsersIcon
  },
  {
    name: '权限设置',
    path: '/account-settings/permissions',
    icon: ShieldCheckIcon
  },
  {
    name: '退出登录',
    path: '/account-settings/logout',
    icon: ArrowRightOnRectangleIcon
  }
]);
</script>
