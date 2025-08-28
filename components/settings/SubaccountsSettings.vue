<template>
  <div>
    <!-- 团队成员板块 -->
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
            团队成员
          </h3>
          <p 
            class="text-sm mt-1"
            :style="{ color: 'var(--text-secondary)' }"
          >
            管理您的团队成员及其权限
          </p>
        </div>
        <button 
          @click="showCreateModal = true"
          class="px-4 py-2 rounded-md text-white hover:opacity-80 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
          :style="{
            background: 'linear-gradient(135deg, var(--accent-color) 0%, #667eea 100%)'
          }"
        >
          添加团队成员
        </button>
      </div>
      
      <!-- 成员列表（动态） -->
      <div class="p-6">
        <div v-if="loading" class="text-sm" :style="{ color: 'var(--text-secondary)' }">正在加载成员...</div>
        <div v-else-if="members.length === 0" class="text-sm" :style="{ color: 'var(--text-secondary)' }">暂无成员</div>
        <div v-else class="space-y-4">
          <div v-for="m in members" :key="m.id" class="p-4 border rounded-lg"
               :style="{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }">
            <div class="flex justify-between items-start">
              <div class="flex items-center">
                <img v-if="m.avatar" :src="m.avatar" class="w-10 h-10 rounded-full mr-3 object-cover" />
                <div v-else class="w-10 h-10 rounded-full flex items-center justify-center mr-3" :style="{ backgroundColor: 'var(--accent-color)' }">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <div>
                  <p class="font-medium" :style="{ color: 'var(--text-primary)' }">{{ m.username || m.nickname || '未命名' }}</p>
                  <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">{{ m.email }}</p>
                  <div class="flex items-center mt-1">
                    <span class="px-2 py-1 text-xs rounded-md mr-2" :style="{ backgroundColor: 'var(--accent-color)', color: 'white' }">{{ m.roleTypeName || '成员' }}</span>
                    <span v-if="m.status === 1" class="px-2 py-1 text-xs rounded-md" :style="{ backgroundColor: 'rgba(16,185,129,0.2)', color: '#10b981' }">正常</span>
                    <span v-else class="px-2 py-1 text-xs rounded-md" :style="{ backgroundColor: 'rgba(239,68,68,0.2)', color: '#ef4444' }">禁用</span>
                  </div>
                </div>
              </div>
              <div class="flex space-x-2">
                <button class="px-3 py-1 border rounded-md text-sm hover:opacity-80 transition-colors" :style="{ color: 'var(--accent-color)', borderColor: 'var(--accent-color)' }">编辑</button>
                <button class="px-3 py-1 border rounded-md text-sm hover:opacity-80 transition-colors" :style="{ color: '#ef4444', borderColor: '#ef4444' }">禁用</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 团队成员编辑弹窗 -->
    <SubaccountEditModal 
      :isOpen="showCreateModal" 
      :subaccount="editingSubaccount"
      @close="showCreateModal = false"
      @save="handleSaveSubaccount"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SubaccountEditModal from '~/components/SubaccountEditModal.vue'
import auth from '~/apis/auth'
import teamApi from '~/apis/business/team'

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

const loading = ref(false)
const members = ref([])

const loadTeamMembers = async () => {
  try {
    loading.value = true
    const currentTeam = auth.getCurrentTeamInfo()
    if (!currentTeam) throw new Error('未找到当前团队信息')
    const res = await teamApi.getTeamDetail(currentTeam.id)
    // 兼容不同返回结构：res.data.members 或 res.data?.teamInfo / members
    const list = res?.data?.members || res?.data?.data?.members || []
    members.value = Array.isArray(list) ? list : []
  } catch (e) {
    console.error('加载团队成员失败', e)
    members.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadTeamMembers()
  // 监听团队切换事件，实时刷新
  const handler = () => loadTeamMembers()
  if (process.client) {
    window.addEventListener('team-switched', handler)
  }
  // 卸载时清理
  onUnmounted(() => {
    if (process.client) window.removeEventListener('team-switched', handler)
  })
})

// 保存 => 调用 添加团队成员 接口
const handleSaveSubaccount = async (subaccountData) => {
  try {
    const currentTeam = auth.getCurrentTeamInfo()
    if (!currentTeam) {
      throw new Error('未找到当前团队信息')
    }
    const operatorUserId = Number(localStorage.getItem('user_id') || '0')
    const body = {
      userId: Number(subaccountData.userId || 0),
      operatorUserId,
      roleType: subaccountData.roleType ?? 30
    }
    await teamApi.addTeamMember(currentTeam.id, body)
    showCreateModal.value = false
    await loadTeamMembers()
  } catch (e) {
    console.error(e)
    alert('添加团队成员失败')
  }
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