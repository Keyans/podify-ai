<template>
  <div class="flex h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
    <!-- Sidebar -->
    <div class="w-64 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl border-r border-gray-200 dark:border-dark-border shadow-elegant dark:shadow-elegant-dark">
      <!-- Logo -->
      <div class="p-6 border-b border-gray-200 dark:border-dark-border">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">R</span>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
            RiinAi
          </span>
        </div>
      </div>

      <nav class="mt-6 px-3">
        <div v-for="item in menuItems" :key="item.name" class="mb-1">
          <!-- 一级菜单 -->
          <div v-if="!item.children" class="group">
            <router-link :to="item.path"
              class="flex items-center px-3 py-2.5 text-gray-700 dark:text-dark-text-secondary rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 group-hover:scale-[1.02]"
              active-class="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium">
              <div class="w-5 h-5 mr-3 flex items-center justify-center">
                <component :is="getMenuIcon(item.name)" class="w-5 h-5" />
              </div>
              <span class="font-medium">{{ item.name }}</span>
            </router-link>
          </div>

          <!-- 有子菜单的一级菜单 -->
          <div v-else class="group">
            <div @click="toggleSubmenu(item.name)"
                 class="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group-hover:scale-[1.02]"
                 :class="isMenuActive(item) ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium' : 'text-gray-700 dark:text-dark-text-secondary hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400'">
              <div class="flex items-center">
                <div class="w-5 h-5 mr-3 flex items-center justify-center">
                  <component :is="getMenuIcon(item.name)" class="w-5 h-5" />
                </div>
                <span class="font-medium">{{ item.name }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <!-- 我的应用菜单的齿轮图标 -->
                <button v-if="item.name === '我的应用'"
                        @click.stop="toggleMyAppsSettings"
                        class="p-1 rounded-md hover:bg-primary-100 dark:hover:bg-primary-800/30 transition-colors duration-200"
                        :class="{ 'bg-primary-100 dark:bg-primary-800/30': showMyAppsSettings }">
                  <Cog6ToothIcon class="w-4 h-4" />
                </button>
                <svg :class="{ 'rotate-180': expandedMenus.includes(item.name) }"
                     class="w-4 h-4 transition-transform duration-300"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            <!-- 二级菜单 -->
            <div v-show="expandedMenus.includes(item.name)"
                 :class="item.name === '我的应用' ? (showMyAppsSettings ? 'mt-1 space-y-1 animate-slide-in' : 'mt-1 ml-8 space-y-1 animate-slide-in') : 'mt-1 ml-8 space-y-1 animate-slide-in'">
              <!-- 我的应用特殊菜单 -->
              <template v-if="item.name === '我的应用'">
                <!-- 设置菜单 -->
                <div v-show="showMyAppsSettings" class="mb-2 p-3 bg-gray-50 dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
                  <div class="flex gap-2">
                    <button @click="showRestoreDialog = true"
                            class="flex-1 flex items-center justify-center px-3 py-2 text-xs text-gray-600 dark:text-dark-text-secondary hover:bg-white dark:hover:bg-dark-surface rounded transition-colors duration-200">
                      <ArrowPathIcon class="w-3 h-3 mr-1" />
                      恢复默认
                    </button>
                    <button @click="showAddAppDialog = true"
                            class="flex-1 flex items-center justify-center px-3 py-2 text-xs text-gray-600 dark:text-dark-text-secondary hover:bg-white dark:hover:bg-dark-surface rounded transition-colors duration-200">
                      <PlusIcon class="w-3 h-3 mr-1" />
                      添加应用
                    </button>
                  </div>
                </div>

                <!-- 可拖拽的应用菜单 -->
                <draggable
                  v-model="myAppsMenuItems"
                  @end="onDragEnd"
                  item-key="id"
                  :animation="200"
                  :disabled="!showMyAppsSettings"
                  handle=".drag-handle"
                  ghost-class="sortable-ghost"
                  chosen-class="sortable-chosen"
                  drag-class="sortable-drag"
                  class="space-y-1">
                  <template #item="{ element: child }">
                    <div class="group relative">
                      <div class="flex items-center">
                        <!-- 拖拽手柄 -->
                        <div v-if="showMyAppsSettings"
                             class="drag-handle opacity-0 group-hover:opacity-100 p-1 mr-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-move transition-all duration-200">
                          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM17 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM17 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM17 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"></path>
                          </svg>
                        </div>
                        <router-link :to="child.path"
                          class="flex items-center flex-1 px-3 py-2 text-sm text-gray-600 dark:text-dark-text-secondary rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 hover:translate-x-1"
                          active-class="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium">
                          <div class="w-2 h-2 bg-current rounded-full mr-3 opacity-60"></div>
                          <span class="flex-1">{{ child.name }}</span>
                        </router-link>
                        <!-- 删除按钮 -->
                        <button v-if="showMyAppsSettings && myAppsMenuItems.length > 1"
                                @click="removeApp(child.id)"
                                class="opacity-0 group-hover:opacity-100 p-1 ml-2 text-red-500 hover:text-red-700 transition-all duration-200">
                          <XMarkIcon class="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </template>
                </draggable>
              </template>

              <!-- 普通二级菜单 -->
              <template v-else>
                <router-link
                  v-for="child in item.children"
                  :key="child.name"
                  :to="child.path"
                  class="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-dark-text-secondary rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 hover:translate-x-1"
                  active-class="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium"
                >
                  <div class="w-2 h-2 bg-current rounded-full mr-3 opacity-60"></div>
                  <span>{{ child.name }}</span>
                </router-link>
              </template>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Main content -->
    <div class="flex flex-col flex-1 min-w-0">
      <!-- Header -->
      <header class="flex items-center justify-between p-4 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl border-b border-gray-200 dark:border-dark-border shadow-elegant dark:shadow-elegant-dark">
        <div class="flex items-center space-x-4">
          <h1 class="text-lg font-semibold text-gray-900 dark:text-dark-text">
            {{ getCurrentPageTitle() }}
          </h1>
        </div>

        <div class="flex items-center space-x-4">
          <!-- 主题切换按钮 -->
          <el-dropdown @command="handleThemeChange" trigger="click">
            <button class="p-2 text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-all duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!isDark" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="light">
                  <div class="flex items-center space-x-2">
                    <span>☀️</span>
                    <span>亮色模式</span>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item command="dark">
                  <div class="flex items-center space-x-2">
                    <span>🌙</span>
                    <span>暗黑模式</span>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item command="auto">
                  <div class="flex items-center space-x-2">
                    <span>🔄</span>
                    <span>跟随系统</span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <!-- 用户信息 -->
          <div class="flex items-center space-x-3">
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900 dark:text-dark-text">Admin</div>
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary">管理员</div>
            </div>
            <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <span class="text-white font-medium text-sm">A</span>
            </div>
          </div>

          <!-- 退出按钮 -->
          <button @click="logout"
            class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            退出
          </button>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 p-6 overflow-auto">
        <div class="animate-fade-in">
          <router-view :key="$route.fullPath"></router-view>
        </div>
      </main>
    </div>
  </div>

  <!-- 恢复默认确认对话框 -->
  <el-dialog v-model="showRestoreDialog" title="恢复默认设置" width="400px" align-center>
    <div class="text-center">
      <div class="mb-4">
        <ExclamationTriangleIcon class="w-12 h-12 text-yellow-500 mx-auto mb-2" />
        <p class="text-gray-700 dark:text-dark-text">确定要恢复到默认的应用菜单设置吗？</p>
        <p class="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">此操作将清除您的自定义配置</p>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-center space-x-3">
        <el-button @click="showRestoreDialog = false">取消</el-button>
        <el-button type="primary" @click="restoreDefaultMenu">确认恢复</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 添加应用对话框 -->
  <el-dialog v-model="showAddAppDialog" title="添加应用" width="600px" align-center>
    <div class="max-h-96 overflow-y-auto">
      <div class="grid grid-cols-1 gap-3">
        <div v-for="app in availableAppsForAdd" :key="app.id"
             class="flex items-center p-3 border border-gray-200 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors duration-200">
          <div class="flex-1">
            <div class="flex items-center space-x-3">
              <span class="text-2xl">{{ app.icon }}</span>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-dark-text">{{ app.name }}</h4>
                <p class="text-sm text-gray-500 dark:text-dark-text-secondary">{{ app.description }}</p>
                <span class="inline-block px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded mt-1">
                  {{ app.category }}
                </span>
              </div>
            </div>
          </div>
          <el-button type="primary" size="small" @click="addApp(app)">
            添加
          </el-button>
        </div>
      </div>
      <div v-if="availableAppsForAdd.length === 0" class="text-center py-8 text-gray-500 dark:text-dark-text-secondary">
        <CubeIcon class="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>暂无可添加的应用</p>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { setTheme, isDark } from '~/stores/theme';
import {
  HomeIcon,
  CubeIcon,
  Cog6ToothIcon,
  RectangleStackIcon,
  PhotoIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  ArrowPathIcon,
  PlusIcon,
  XMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';
import draggable from 'vuedraggable';
import {
  menuStore,
  updateMyApps,
  addAppToMyApps,
  removeAppFromMyApps,
  restoreDefaultMenu as restoreDefault,
  getAvailableApps
} from '~/stores/menu';

const route = useRoute();

// 我的应用设置相关状态
const showMyAppsSettings = ref(false);
const showRestoreDialog = ref(false);
const showAddAppDialog = ref(false);

// 我的应用菜单项（从store获取）
const myAppsMenuItems = computed({
  get: () => menuStore.myApps,
  set: (value) => updateMyApps(value)
});

// 可添加的应用列表
const availableAppsForAdd = computed(() => getAvailableApps());

// 判断菜单是否激活
const isMenuActive = (menuItem: any) => {
  if (!menuItem.children) {
    return route.path === menuItem.path;
  }

  // 对于有子菜单的项目，检查当前路由是否匹配任何子菜单
  return menuItem.children.some((child: any) => {
    if (typeof child === 'string') return false;
    return route.path === child.path || route.path.startsWith(child.path + '/');
  });
};

const menuItems = computed(() => [
  { name: '驾驶舱', path: '/dashboard' },
  {
    name: '我的应用',
    children: myAppsMenuItems.value
  },
  { name: '工作流', path: '/workflows' },
  {
    name: '图库管理',
    children: [
      { name: '图库概览', path: '/gallery/overview' },
      { name: '商品图库', path: '/gallery/products' },
      { name: '素材图库', path: '/gallery/materials' },
      { name: '背景图库', path: '/gallery/backgrounds' },
      { name: '处理结果', path: '/gallery/results' }
    ]
  },
  {
    name: '商品管理',
    children: [
      { name: '白品管理', path: '/products/basic' },
      { name: 'POD商品', path: '/products/pod' }
    ]
  },
  { name: '应用市场', path: '/app-market' },
  { name: '账号设置', path: '/account-settings' },
]);

const expandedMenus = ref(['我的应用']); // 默认展开我的应用菜单

// 菜单图标映射
const menuIconMap: Record<string, any> = {
  '驾驶舱': HomeIcon,
  '我的应用': CubeIcon,
  '工作流': RectangleStackIcon,
  '图库管理': PhotoIcon,
  '商品管理': ShoppingBagIcon,
  '应用市场': BuildingStorefrontIcon,
  '账号设置': Cog6ToothIcon,
};

// 页面标题映射
const pageTitleMap: Record<string, string> = {
  '/dashboard': '驾驶舱',
  '/my-apps/product-collection': '商品采集',
  '/my-apps/smart-crop': '智能裁图',
  '/my-apps/one-click-cutout': '一键抠图',
  '/my-apps/super-split': '超级裂变',
  '/my-apps/title-generator': '标题生成',
  '/my-apps/batch-listing': '批量刊登',
  '/workflows': '工作流',
  '/gallery': '图库管理',
  '/gallery/overview': '图库概览',
  '/gallery/products': '商品图库',
  '/gallery/materials': '素材图库',
  '/gallery/backgrounds': '背景图库',
  '/gallery/results': '处理结果',
  '/products': '商品管理',
  '/app-market': '应用市场',
  '/account-settings': '账号设置',
};

const toggleSubmenu = (menuName: string) => {
  const index = expandedMenus.value.indexOf(menuName);
  if (index > -1) {
    expandedMenus.value.splice(index, 1);
  } else {
    expandedMenus.value.push(menuName);
  }
};

const getMenuIcon = (menuName: string) => {
  return menuIconMap[menuName] || HomeIcon;
};

const getCurrentPageTitle = () => {
  return pageTitleMap[route.path] || 'RiinAi';
};

const handleThemeChange = (theme: string) => {
  setTheme(theme as any);
};

const router = useRouter();

const logout = () => {
  const authStore = useAuthStore()
  authStore.logout()
  router.push('/login');
};

// 我的应用设置相关方法
const toggleMyAppsSettings = () => {
  showMyAppsSettings.value = !showMyAppsSettings.value;
};

const restoreDefaultMenu = () => {
  restoreDefault();
  showRestoreDialog.value = false;
  showMyAppsSettings.value = false;
};

const addApp = (app: any) => {
  const success = addAppToMyApps(app);
  if (success) {
    showAddAppDialog.value = false;
  }
};

const removeApp = (appId: string) => {
  const success = removeAppFromMyApps(appId);
  if (!success && myAppsMenuItems.value.length <= 1) {
    // 可以添加一个提示，告诉用户至少需要保留一个应用
    console.warn('至少需要保留一个应用');
  }
};

const onDragEnd = () => {
  // 拖拽结束后自动保存
  updateMyApps(myAppsMenuItems.value);
};
</script>

<style scoped>
/* 拖拽样式 */
.sortable-ghost {
  opacity: 0.5;
  background: #f3f4f6;
  border: 2px dashed #d1d5db;
}

.sortable-chosen {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.sortable-drag {
  transform: rotate(5deg);
  opacity: 0.8;
}

/* 暗黑模式下的拖拽样式 */
.dark .sortable-ghost {
  background: #374151;
  border-color: #6b7280;
}
</style>
