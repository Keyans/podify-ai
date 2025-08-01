<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div 
      class="rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border relative"
      :style="{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)'
      }"
    >
      <!-- 科技感头部 -->
      <div 
        class="p-5 border-b flex justify-between items-center relative overflow-hidden"
        :style="{
          borderColor: 'var(--border-color)',
          background: 'linear-gradient(135deg, var(--accent-color) 0%, #667eea 100%)'
        }"
      >
        <!-- 科技感装饰 -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-2 right-8 w-16 h-16 border border-white rounded-full animate-pulse"></div>
          <div class="absolute bottom-3 left-6 w-8 h-8 border border-white rounded-full opacity-50"></div>
          <div class="absolute top-5 left-1/3 w-2 h-2 bg-white rounded-full animate-ping"></div>
          <div class="absolute bottom-2 right-1/4 w-1 h-1 bg-white rounded-full opacity-60"></div>
        </div>
        
        <div class="relative z-10">
          <h3 class="text-lg font-medium text-white">{{ subaccount.id ? '编辑子账号' : '添加子账号' }}</h3>
          <p class="text-sm text-white opacity-80 mt-1">
            {{ subaccount.id ? '修改子账号信息和权限设置' : '创建新的子账号并设置权限' }}
          </p>
        </div>
        
        <!-- 增强的关闭按钮 -->
        <div class="relative z-10 flex items-center space-x-2">
          <!-- ESC 提示 -->
          <div class="hidden sm:flex items-center text-white opacity-70 text-xs">
            <span class="mr-1">按</span>
            <kbd class="px-2 py-1 bg-white bg-opacity-20 rounded text-xs">ESC</kbd>
            <span class="ml-1">退出</span>
          </div>
          
          <!-- 主关闭按钮 -->
          <button 
            @click="$emit('close')"
            class="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 hover:scale-110 hover:rotate-90 group"
            :title="'关闭对话框'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 表单内容 -->
      <div 
        class="p-6"
        :style="{
          backgroundColor: 'var(--bg-secondary)'
        }"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 基本信息 -->
          <div 
            class="p-4 border rounded-lg"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-color)'
            }"
          >
            <h4 
              class="font-medium mb-4 flex items-center"
              :style="{ color: 'var(--text-primary)' }"
            >
              <div class="w-2 h-2 rounded-full mr-2" :style="{ backgroundColor: 'var(--accent-color)' }"></div>
              基本信息
            </h4>
            
            <div class="space-y-4">
              <div>
                <label 
                  class="block text-sm font-medium mb-2"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  用户名
                </label>
                <input 
                  v-model="subaccount.username"
                  type="text" 
                  class="w-full px-3 py-2 border rounded-md text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    '--tw-ring-color': 'var(--accent-color)'
                  }"
                  placeholder="请输入用户名"
                />
              </div>
              
              <div>
                <label 
                  class="block text-sm font-medium mb-2"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  邮箱
                </label>
                <input 
                  v-model="subaccount.email"
                  type="email" 
                  class="w-full px-3 py-2 border rounded-md text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    '--tw-ring-color': 'var(--accent-color)'
                  }"
                  placeholder="请输入邮箱地址"
                />
              </div>
              
              <div>
                <label 
                  class="block text-sm font-medium mb-2"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  手机号
                </label>
                <input 
                  v-model="subaccount.phone"
                  type="tel" 
                  class="w-full px-3 py-2 border rounded-md text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    '--tw-ring-color': 'var(--accent-color)'
                  }"
                  placeholder="请输入手机号"
                />
              </div>
              
              <div>
                <label 
                  class="block text-sm font-medium mb-2"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  状态
                </label>
                <select 
                  v-model="subaccount.status"
                  class="w-full px-3 py-2 border rounded-md text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    '--tw-ring-color': 'var(--accent-color)'
                  }"
                >
                  <option value="active">激活</option>
                  <option value="inactive">停用</option>
                  <option value="pending">待激活</option>
                </select>
              </div>
            </div>
          </div>

          <!-- 权限设置 -->
          <div 
            class="p-4 border rounded-lg"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-color)'
            }"
          >
            <h4 
              class="font-medium mb-4 flex items-center"
              :style="{ color: 'var(--text-primary)' }"
            >
              <div class="w-2 h-2 rounded-full mr-2" :style="{ backgroundColor: 'var(--accent-color)' }"></div>
              权限设置
            </h4>
            
            <div class="space-y-3">
              <div>
                <label 
                  class="block text-sm font-medium mb-2"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  角色
                </label>
                <select 
                  v-model="subaccount.role"
                  class="w-full px-3 py-2 border rounded-md text-sm transition-all duration-200 focus:ring-2 focus:ring-opacity-50"
                  :style="{
                    backgroundColor: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    '--tw-ring-color': 'var(--accent-color)'
                  }"
                >
                  <option value="admin">管理员</option>
                  <option value="operator">操作员</option>
                  <option value="viewer">查看员</option>
                </select>
              </div>
              
              <div class="space-y-2">
                <label 
                  class="block text-sm font-medium"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  功能权限
                </label>
                
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input 
                      v-model="subaccount.permissions.canViewProducts" 
                      type="checkbox" 
                      class="mr-2 w-4 h-4 rounded"
                    />
                    <span 
                      class="text-sm"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      查看产品
                    </span>
                  </label>
                  
                  <label class="flex items-center">
                    <input 
                      v-model="subaccount.permissions.canEditProducts" 
                      type="checkbox" 
                      class="mr-2 w-4 h-4 rounded"
                    />
                    <span 
                      class="text-sm"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      编辑产品
                    </span>
                  </label>
                  
                  <label class="flex items-center">
                    <input 
                      v-model="subaccount.permissions.canViewImages" 
                      type="checkbox" 
                      class="mr-2 w-4 h-4 rounded"
                    />
                    <span 
                      class="text-sm"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      查看图片库
                    </span>
                  </label>
                  
                  <label class="flex items-center">
                    <input 
                      v-model="subaccount.permissions.canUploadImages" 
                      type="checkbox" 
                      class="mr-2 w-4 h-4 rounded"
                    />
                    <span 
                      class="text-sm"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      上传图片
                    </span>
                  </label>
                  
                  <label class="flex items-center">
                    <input 
                      v-model="subaccount.permissions.canManageWorkflows" 
                      type="checkbox" 
                      class="mr-2 w-4 h-4 rounded"
                    />
                    <span 
                      class="text-sm"
                      :style="{ color: 'var(--text-primary)' }"
                    >
                      管理工作流
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 备注 -->
        <div 
          class="mt-6 p-4 border rounded-lg"
          :style="{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)'
          }"
        >
          <label 
            class="block text-sm font-medium mb-2 flex items-center"
            :style="{ color: 'var(--text-primary)' }"
          >
            <div class="w-2 h-2 rounded-full mr-2" :style="{ backgroundColor: 'var(--accent-color)' }"></div>
            备注信息
          </label>
          <textarea 
            v-model="subaccount.notes"
            rows="3" 
            class="w-full px-3 py-2 border rounded-md text-sm resize-none transition-all duration-200 focus:ring-2 focus:ring-opacity-50"
            :style="{
              backgroundColor: 'var(--bg-input)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              '--tw-ring-color': 'var(--accent-color)'
            }"
            placeholder="请输入备注信息（可选）"
          />
        </div>
      </div>

      <!-- 底部操作栏 -->
      <div 
        class="p-6 border-t flex justify-between items-center"
        :style="{
          borderColor: 'var(--border-color)',
          backgroundColor: 'var(--bg-secondary)'
        }"
      >
        <div class="flex items-center text-sm" :style="{ color: 'var(--text-secondary)' }">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          保存后将立即生效
        </div>
        
        <div class="flex space-x-3">
          <button 
            @click="$emit('close')"
            class="px-4 py-2 border rounded-md text-sm transition-all duration-200 hover:opacity-80 hover:scale-105"
            :style="{
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-tertiary)'
            }"
          >
            取消
          </button>
          
          <button 
            @click="handleSave"
            class="px-6 py-2 rounded-md text-sm text-white transition-all duration-200 hover:opacity-90 hover:scale-105 hover:shadow-lg transform"
            :style="{
              background: 'linear-gradient(135deg, var(--accent-color) 0%, #667eea 100%)'
            }"
          >
            {{ subaccount.id ? '保存修改' : '创建账号' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  isOpen: Boolean,
  subaccount: {
    type: Object,
    default: () => ({
      id: null,
      username: '',
      email: '',
      phone: '',
      role: 'viewer',
      status: 'active',
      notes: '',
      permissions: {
        canViewProducts: true,
        canEditProducts: false,
        canViewImages: true,
        canUploadImages: false,
        canManageWorkflows: false
      }
    })
  }
})

// Emits
const emit = defineEmits(['close', 'save'])

// 处理保存
const handleSave = () => {
  // 基本表单验证
  if (!props.subaccount.username || !props.subaccount.email) {
    alert('请填写用户名和邮箱')
    return
  }
  
  emit('save', props.subaccount)
}

// ESC 键关闭
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        emit('close')
      }
    }
    document.addEventListener('keydown', handleEsc)
    
    // 清理事件监听器
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }
})
</script>

<style scoped>
/* 焦点状态样式 */
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(var(--accent-color-rgb), 0.1);
}

/* 复选框样式 */
input[type="checkbox"] {
  accent-color: var(--accent-color);
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg-tertiary);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: var(--accent-color);
  border-radius: 3px;
  opacity: 0.6;
}

::-webkit-scrollbar-thumb:hover {
  opacity: 0.8;
}

/* 动画效果 */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* 响应式隐藏 */
@media (max-width: 640px) {
  .hidden.sm\:flex {
    display: none !important;
  }
}

/* Hover 效果 */
button:hover {
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

/* 过渡效果 */
* {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
</style> 