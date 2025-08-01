<template>
  <div>
    <!-- 子账号管理板块 -->
    <div 
      class="rounded-lg border"
      :style="{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)'
      }"
    >
      <div 
        class="p-5 border-b flex justify-between items-center"
        :style="{
          borderColor: 'var(--border-color)'
        }"
      >
        <div>
          <h3 
            class="font-medium"
            :style="{ color: 'var(--text-primary)' }"
          >
            子账号管理
          </h3>
          <p 
            class="text-sm mt-1"
            :style="{ color: 'var(--text-secondary)' }"
          >
            管理您的子账号权限和信息
          </p>
        </div>
        <button 
          @click="showCreateModal = true"
          class="px-4 py-2 rounded-md text-white hover:opacity-80 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
          :style="{
            background: 'linear-gradient(135deg, var(--accent-color) 0%, #667eea 100%)'
          }"
        >
          添加子账号
        </button>
      </div>
      
      <!-- 子账号列表 -->
      <div class="p-6">
        <div class="space-y-4">
          <!-- 子账号项 -->
          <div 
            class="p-4 border rounded-lg"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-color)'
            }"
          >
            <div class="flex justify-between items-start">
              <div class="flex items-center">
                <div 
                  class="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  :style="{
                    backgroundColor: 'var(--accent-color)'
                  }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div>
                  <p 
                    class="font-medium"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    李四
                  </p>
                  <p 
                    class="text-sm"
                    :style="{ color: 'var(--text-secondary)' }"
                  >
                    lisi@example.com
                  </p>
                  <div class="flex items-center mt-1">
                    <span 
                      class="px-2 py-1 text-xs rounded-md mr-2"
                      :style="{
                        backgroundColor: 'var(--accent-color)',
                        color: 'white'
                      }"
                    >
                      操作员
                    </span>
                    <span 
                      class="px-2 py-1 text-xs rounded-md"
                      :style="{
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        color: '#10b981'
                      }"
                    >
                      正常
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex space-x-2">
                <button 
                  class="px-3 py-1 border rounded-md text-sm hover:opacity-80 transition-colors"
                  :style="{
                    color: 'var(--accent-color)',
                    borderColor: 'var(--accent-color)'
                  }"
                >
                  编辑
                </button>
                <button 
                  class="px-3 py-1 border rounded-md text-sm hover:opacity-80 transition-colors"
                  :style="{
                    color: '#ef4444',
                    borderColor: '#ef4444'
                  }"
                >
                  禁用
                </button>
              </div>
            </div>
          </div>
          
          <div 
            class="p-4 border rounded-lg"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-color)'
            }"
          >
            <div class="flex justify-between items-start">
              <div class="flex items-center">
                <div 
                  class="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  :style="{
                    backgroundColor: '#6b7280'
                  }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div>
                  <p 
                    class="font-medium"
                    :style="{ color: 'var(--text-primary)' }"
                  >
                    王五
                  </p>
                  <p 
                    class="text-sm"
                    :style="{ color: 'var(--text-secondary)' }"
                  >
                    wangwu@example.com
                  </p>
                  <div class="flex items-center mt-1">
                    <span 
                      class="px-2 py-1 text-xs rounded-md mr-2"
                      :style="{
                        backgroundColor: '#6b7280',
                        color: 'white'
                      }"
                    >
                      查看员
                    </span>
                    <span 
                      class="px-2 py-1 text-xs rounded-md"
                      :style="{
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        color: '#ef4444'
                      }"
                    >
                      已禁用
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex space-x-2">
                <button 
                  class="px-3 py-1 border rounded-md text-sm hover:opacity-80 transition-colors"
                  :style="{
                    color: 'var(--accent-color)',
                    borderColor: 'var(--accent-color)'
                  }"
                >
                  编辑
                </button>
                <button 
                  class="px-3 py-1 border rounded-md text-sm hover:opacity-80 transition-colors"
                  :style="{
                    color: '#10b981',
                    borderColor: '#10b981'
                  }"
                >
                  启用
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 子账号编辑弹窗 -->
    <SubaccountEditModal 
      :isOpen="showCreateModal" 
      :subaccount="editingSubaccount"
      @close="showCreateModal = false"
      @save="handleSaveSubaccount"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SubaccountEditModal from '~/components/SubaccountEditModal.vue'

const showCreateModal = ref(false)
const editingSubaccount = ref({
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

const handleSaveSubaccount = (subaccountData) => {
  console.log('保存子账号:', subaccountData)
  showCreateModal.value = false
  // 这里处理保存逻辑
}
</script>

<style scoped>
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