<template>
  <div class="p-8">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-dark-text">退出登录</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-dark-text-secondary">安全退出您的账号</p>
    </div>

    <div class="max-w-2xl">
      <!-- 当前登录信息 -->
      <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm mb-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">当前登录信息</h3>
        
        <div class="flex items-center space-x-4 mb-6">
          <img
            :src="userInfo.avatar || '/default-avatar.png'"
            alt="头像"
            class="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-dark-border shadow-lg"
          />
          <div>
            <h4 class="text-lg font-medium text-gray-900 dark:text-dark-text">{{ userInfo.nickname }}</h4>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">{{ userInfo.email }}</p>
            <p class="text-sm text-gray-500 dark:text-dark-text-secondary">账号ID: {{ userInfo.accountId }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-dark-text-secondary">登录时间:</span>
            <span class="text-gray-900 dark:text-dark-text">{{ userInfo.loginTime }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-dark-text-secondary">登录IP:</span>
            <span class="text-gray-900 dark:text-dark-text">{{ userInfo.loginIp }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-dark-text-secondary">设备信息:</span>
            <span class="text-gray-900 dark:text-dark-text">{{ userInfo.deviceInfo }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-dark-text-secondary">在线时长:</span>
            <span class="text-gray-900 dark:text-dark-text">{{ onlineDuration }}</span>
          </div>
        </div>
      </div>

      <!-- 退出选项 -->
      <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm mb-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">退出选项</h3>
        
        <div class="space-y-4">
          <label class="flex items-start space-x-3 cursor-pointer">
            <input
              type="radio"
              v-model="logoutOption"
              value="current"
              class="mt-1 text-amber-600 focus:ring-amber-500"
            />
            <div>
              <div class="font-medium text-gray-900 dark:text-dark-text">仅退出当前设备</div>
              <div class="text-sm text-gray-500 dark:text-dark-text-secondary">
                只退出当前浏览器，其他设备上的登录状态保持不变
              </div>
            </div>
          </label>

          <label class="flex items-start space-x-3 cursor-pointer">
            <input
              type="radio"
              v-model="logoutOption"
              value="all"
              class="mt-1 text-amber-600 focus:ring-amber-500"
            />
            <div>
              <div class="font-medium text-gray-900 dark:text-dark-text">退出所有设备</div>
              <div class="text-sm text-gray-500 dark:text-dark-text-secondary">
                退出所有已登录的设备，需要重新登录才能访问
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- 活跃会话 -->
      <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text">活跃会话</h3>
          <button
            @click="refreshSessions"
            class="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
          >
            刷新
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="session in activeSessions"
            :key="session.id"
            class="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-border rounded-lg"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="[
                  session.isCurrent
                    ? 'bg-green-100 dark:bg-green-900/20'
                    : 'bg-gray-100 dark:bg-gray-800'
                ]"
              >
                <component
                  :is="getDeviceIcon(session.deviceType)"
                  class="w-5 h-5"
                  :class="[
                    session.isCurrent
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-600 dark:text-gray-400'
                  ]"
                />
              </div>
              <div>
                <div class="flex items-center space-x-2">
                  <span class="font-medium text-gray-900 dark:text-dark-text">
                    {{ session.deviceInfo }}
                  </span>
                  <span
                    v-if="session.isCurrent"
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                  >
                    当前设备
                  </span>
                </div>
                <div class="text-sm text-gray-500 dark:text-dark-text-secondary">
                  {{ session.location }} · {{ session.lastActive }}
                </div>
                <div class="text-xs text-gray-400">IP: {{ session.ip }}</div>
              </div>
            </div>
            <button
              v-if="!session.isCurrent"
              @click="terminateSession(session)"
              class="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              终止
            </button>
          </div>
        </div>
      </div>

      <!-- 注销账号 -->
      <div class="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div class="flex items-start space-x-3">
          <ExclamationTriangleIcon class="w-6 h-6 text-red-600 dark:text-red-400 mt-0.5" />
          <div class="flex-1">
            <h3 class="text-lg font-medium text-red-900 dark:text-red-400 mb-2">注销账号</h3>
            <p class="text-sm text-red-700 dark:text-red-300 mb-4">
              注销账号将永久删除您的所有数据，包括图库、商品、交易记录等，此操作不可恢复。
            </p>
            <button
              @click="showDeleteAccountDialog = true"
              class="px-4 py-2 text-sm font-medium text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            >
              申请注销账号
            </button>
          </div>
        </div>
      </div>

      <!-- 退出按钮 -->
      <div class="flex justify-end space-x-3 mt-8">
        <button
          @click="$router.go(-1)"
          class="px-6 py-2 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text bg-gray-50 dark:bg-dark-border hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-all duration-200"
        >
          取消
        </button>
        <button
          @click="handleLogout"
          :loading="loggingOut"
          class="px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          {{ logoutOption === 'all' ? '退出所有设备' : '退出登录' }}
        </button>
      </div>
    </div>

    <!-- 注销账号确认对话框 -->
    <el-dialog
      v-model="showDeleteAccountDialog"
      title="注销账号确认"
      width="500px"
    >
      <div class="space-y-4">
        <div class="flex items-start space-x-3">
          <ExclamationTriangleIcon class="w-6 h-6 text-red-600 dark:text-red-400 mt-0.5" />
          <div>
            <h3 class="font-medium text-gray-900 dark:text-dark-text mb-2">确认注销账号</h3>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary mb-4">
              注销账号后，您将失去以下数据：
            </p>
            <ul class="text-sm text-gray-600 dark:text-dark-text-secondary space-y-1 mb-4">
              <li>• 所有图库文件和处理结果</li>
              <li>• 商品信息和SKU数据</li>
              <li>• 交易记录和充值记录</li>
              <li>• 工作流配置和历史记录</li>
              <li>• 子账号和权限设置</li>
            </ul>
            <p class="text-sm text-red-600 dark:text-red-400 font-medium">
              此操作不可恢复，请谨慎操作！
            </p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
            请输入您的密码以确认注销
          </label>
          <el-input
            v-model="deleteAccountPassword"
            type="password"
            placeholder="请输入当前密码"
            show-password
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
            请输入 "确认注销" 以继续
          </label>
          <el-input
            v-model="deleteAccountConfirm"
            placeholder="请输入：确认注销"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <el-button @click="showDeleteAccountDialog = false">取消</el-button>
          <el-button
            type="danger"
            @click="handleDeleteAccount"
            :loading="deletingAccount"
            :disabled="!canDeleteAccount"
          >
            确认注销账号
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';
import { isAuthenticated } from '~/stores/auth';

// 类型定义
interface UserInfo {
  nickname: string;
  email: string;
  accountId: string;
  avatar?: string;
  loginTime: string;
  loginIp: string;
  deviceInfo: string;
}

interface Session {
  id: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  deviceInfo: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

// 响应式数据
const router = useRouter();
const loggingOut = ref(false);
const deletingAccount = ref(false);
const showDeleteAccountDialog = ref(false);
const logoutOption = ref('current');
const deleteAccountPassword = ref('');
const deleteAccountConfirm = ref('');
const onlineStartTime = ref(Date.now());

// 用户信息
const userInfo = ref<UserInfo>({
  nickname: '张三',
  email: 'zhangsan@example.com',
  accountId: 'ACC20240001',
  avatar: '/default-avatar.png',
  loginTime: '2024-01-15 09:30:00',
  loginIp: '192.168.1.100',
  deviceInfo: 'Chrome 120.0 on Windows 10'
});

// 活跃会话
const activeSessions = ref<Session[]>([
  {
    id: 'session1',
    deviceType: 'desktop',
    deviceInfo: 'Chrome 120.0 on Windows 10',
    location: '北京市',
    ip: '192.168.1.100',
    lastActive: '刚刚',
    isCurrent: true
  },
  {
    id: 'session2',
    deviceType: 'mobile',
    deviceInfo: 'Safari on iPhone 15',
    location: '上海市',
    ip: '192.168.1.101',
    lastActive: '2小时前',
    isCurrent: false
  },
  {
    id: 'session3',
    deviceType: 'tablet',
    deviceInfo: 'Chrome on iPad',
    location: '广州市',
    ip: '192.168.1.102',
    lastActive: '1天前',
    isCurrent: false
  }
]);

// 在线时长计算
const onlineDuration = computed(() => {
  const duration = Date.now() - onlineStartTime.value;
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}小时${minutes}分钟`;
});

// 是否可以注销账号
const canDeleteAccount = computed(() => {
  return deleteAccountPassword.value && deleteAccountConfirm.value === '确认注销';
});

// 方法
const getDeviceIcon = (deviceType: string) => {
  const iconMap = {
    desktop: ComputerDesktopIcon,
    mobile: DevicePhoneMobileIcon,
    tablet: DeviceTabletIcon
  };
  return iconMap[deviceType as keyof typeof iconMap] || ComputerDesktopIcon;
};

const refreshSessions = () => {
  ElMessage.success('会话信息已刷新');
};

const terminateSession = async (session: Session) => {
  try {
    await ElMessageBox.confirm(
      `确定要终止 "${session.deviceInfo}" 的登录会话吗？`,
      '确认终止会话',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    );

    // 模拟终止会话
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = activeSessions.value.findIndex(s => s.id === session.id);
    if (index > -1) {
      activeSessions.value.splice(index, 1);
    }
    
    ElMessage.success('会话已终止');
  } catch (error) {
    // 用户取消操作
  }
};

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm(
      logoutOption.value === 'all' 
        ? '确定要退出所有设备的登录吗？' 
        : '确定要退出当前登录吗？',
      '确认退出',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    );

    loggingOut.value = true;

    // 模拟退出登录
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 清除认证状态
    if (process.client) {
      localStorage.removeItem('user-token');
    }

    ElMessage.success('退出登录成功');
    router.push('/login');
  } catch (error) {
    // 用户取消操作
  } finally {
    loggingOut.value = false;
  }
};

const handleDeleteAccount = async () => {
  if (!canDeleteAccount.value) {
    ElMessage.warning('请完成所有确认步骤');
    return;
  }

  deletingAccount.value = true;
  try {
    // 模拟注销账号
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 清除认证状态
    if (process.client) {
      localStorage.removeItem('user-token');
    }

    ElMessage.success('账号注销成功');
    router.push('/login');
  } catch (error) {
    ElMessage.error('注销失败，请重试');
  } finally {
    deletingAccount.value = false;
  }
};

// 生命周期
onMounted(() => {
  // 记录进入页面时间
  onlineStartTime.value = Date.now() - (Math.random() * 3600000); // 模拟已在线时间
});

onUnmounted(() => {
  // 清理定时器等
});
</script>
