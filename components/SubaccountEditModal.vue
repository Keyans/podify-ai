<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <div class="p-5 border-b flex justify-between items-center">
        <h3 class="font-medium">编辑子账号</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <!-- 基本信息 -->
        <div class="mb-6">
          <h4 class="font-medium mb-4">基本信息</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">姓名</label>
              <input type="text" v-model="account.name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">邮箱</label>
              <input type="email" v-model="account.email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">手机号</label>
              <input type="text" v-model="account.phone" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">角色</label>
              <select v-model="account.role" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="admin">管理员</option>
                <option value="operator">操作员</option>
                <option value="viewer">查看员</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- 权限设置 -->
        <div class="mb-6">
          <h4 class="font-medium mb-4">权限设置</h4>
          <div class="space-y-3">
            <div class="p-3 border rounded-md">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input type="checkbox" id="perm-system" v-model="permissions.system" class="w-4 h-4 rounded mr-2">
                  <label for="perm-system" class="font-medium">系统管理权限</label>
                </div>
                <button @click="toggleSection('system')" class="text-blue-500">
                  {{ expandedSections.system ? '收起' : '展开' }}
                </button>
              </div>
              <div v-if="expandedSections.system" class="mt-3 space-y-2 pl-6">
                <div class="flex items-center">
                  <input type="checkbox" id="perm-system-user" v-model="permissions.systemUser" class="w-4 h-4 rounded mr-2">
                  <label for="perm-system-user" class="text-sm">用户管理</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="perm-system-role" v-model="permissions.systemRole" class="w-4 h-4 rounded mr-2">
                  <label for="perm-system-role" class="text-sm">角色管理</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="perm-system-setting" v-model="permissions.systemSetting" class="w-4 h-4 rounded mr-2">
                  <label for="perm-system-setting" class="text-sm">系统设置</label>
                </div>
              </div>
            </div>
            
            <div class="p-3 border rounded-md">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input type="checkbox" id="perm-product" v-model="permissions.product" class="w-4 h-4 rounded mr-2">
                  <label for="perm-product" class="font-medium">商品管理权限</label>
                </div>
                <button @click="toggleSection('product')" class="text-blue-500">
                  {{ expandedSections.product ? '收起' : '展开' }}
                </button>
              </div>
              <div v-if="expandedSections.product" class="mt-3 space-y-2 pl-6">
                <div class="flex items-center">
                  <input type="checkbox" id="perm-product-create" v-model="permissions.productCreate" class="w-4 h-4 rounded mr-2">
                  <label for="perm-product-create" class="text-sm">创建商品</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="perm-product-edit" v-model="permissions.productEdit" class="w-4 h-4 rounded mr-2">
                  <label for="perm-product-edit" class="text-sm">编辑商品</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="perm-product-delete" v-model="permissions.productDelete" class="w-4 h-4 rounded mr-2">
                  <label for="perm-product-delete" class="text-sm">删除商品</label>
                </div>
              </div>
            </div>
            
            <!-- 团队资源权限 -->
            <div class="p-3 border rounded-md bg-yellow-50">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input type="checkbox" id="perm-team-resources" v-model="permissions.teamResources" class="w-4 h-4 rounded mr-2">
                  <label for="perm-team-resources" class="font-medium">团队资源权限</label>
                </div>
                <button @click="toggleSection('teamResources')" class="text-blue-500">
                  {{ expandedSections.teamResources ? '收起' : '展开' }}
                </button>
              </div>
              <div v-if="expandedSections.teamResources" class="mt-3 space-y-3 pl-6">
                <!-- 工作流模板权限 -->
                <div class="space-y-2">
                  <h5 class="text-sm font-medium">工作流模板权限</h5>
                  <div class="flex items-center">
                    <input type="checkbox" id="perm-workflow-view" v-model="permissions.workflowView" class="w-4 h-4 rounded mr-2">
                    <label for="perm-workflow-view" class="text-sm">查看工作流模板</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" id="perm-workflow-edit" v-model="permissions.workflowEdit" class="w-4 h-4 rounded mr-2">
                    <label for="perm-workflow-edit" class="text-sm">编辑工作流模板</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" id="perm-workflow-delete" v-model="permissions.workflowDelete" class="w-4 h-4 rounded mr-2">
                    <label for="perm-workflow-delete" class="text-sm">删除工作流模板</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" id="perm-workflow-create" v-model="permissions.workflowCreate" class="w-4 h-4 rounded mr-2">
                    <label for="perm-workflow-create" class="text-sm">创建工作流模板</label>
                  </div>
                </div>
                
                <!-- 产品模板权限 -->
                <div class="space-y-2">
                  <h5 class="text-sm font-medium">产品模板权限</h5>
                  <div class="flex items-center">
                    <input type="checkbox" id="perm-product-tpl-view" v-model="permissions.productTplView" class="w-4 h-4 rounded mr-2">
                    <label for="perm-product-tpl-view" class="text-sm">查看产品模板</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" id="perm-product-tpl-edit" v-model="permissions.productTplEdit" class="w-4 h-4 rounded mr-2">
                    <label for="perm-product-tpl-edit" class="text-sm">编辑产品模板</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" id="perm-product-tpl-delete" v-model="permissions.productTplDelete" class="w-4 h-4 rounded mr-2">
                    <label for="perm-product-tpl-delete" class="text-sm">删除产品模板</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" id="perm-product-tpl-create" v-model="permissions.productTplCreate" class="w-4 h-4 rounded mr-2">
                    <label for="perm-product-tpl-create" class="text-sm">创建产品模板</label>
                  </div>
                </div>
                
                <!-- 资产库权限 -->
                <div class="space-y-2">
                  <h5 class="text-sm font-medium">团队资产库权限</h5>
                  <div class="flex items-center">
                    <input type="checkbox" id="perm-asset-view" v-model="permissions.assetView" class="w-4 h-4 rounded mr-2">
                    <label for="perm-asset-view" class="text-sm">查看资产库</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" id="perm-asset-upload" v-model="permissions.assetUpload" class="w-4 h-4 rounded mr-2">
                    <label for="perm-asset-upload" class="text-sm">上传资产</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" id="perm-asset-delete" v-model="permissions.assetDelete" class="w-4 h-4 rounded mr-2">
                    <label for="perm-asset-delete" class="text-sm">删除资产</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" id="perm-asset-categorize" v-model="permissions.assetCategorize" class="w-4 h-4 rounded mr-2">
                    <label for="perm-asset-categorize" class="text-sm">资产分类管理</label>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 其他权限区块可以继续添加... -->
          </div>
        </div>
        
        <!-- 备注 -->
        <div class="mb-6">
          <h4 class="font-medium mb-4">备注</h4>
          <textarea v-model="account.note" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
        </div>
      </div>
      
      <div class="p-5 border-t flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">取消</button>
        <button @click="saveChanges" class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">保存</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  accountData: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['close', 'save'])

// 子账号信息
const account = reactive({
  name: '',
  email: '',
  phone: '',
  role: 'operator',
  note: ''
})

// 权限控制
const permissions = reactive({
  // 系统权限
  system: false,
  systemUser: false,
  systemRole: false,
  systemSetting: false,
  
  // 商品管理权限
  product: false,
  productCreate: false,
  productEdit: false,
  productDelete: false,
  
  // 团队资源权限
  teamResources: false,
  
  // 工作流模板权限
  workflowView: false,
  workflowEdit: false,
  workflowDelete: false,
  workflowCreate: false,
  
  // 产品模板权限
  productTplView: false,
  productTplEdit: false,
  productTplDelete: false,
  productTplCreate: false,
  
  // 资产库权限
  assetView: false,
  assetUpload: false,
  assetDelete: false,
  assetCategorize: false
})

// 控制权限区块的展开/收起
const expandedSections = reactive({
  system: false,
  product: false,
  teamResources: true // 默认展开团队资源权限
})

// 监听账号数据变化
watch(() => props.accountData, (newVal) => {
  if (newVal) {
    // 填充账号信息
    account.name = newVal.name || ''
    account.email = newVal.email || ''
    account.phone = newVal.phone || ''
    account.role = newVal.role || 'operator'
    account.note = newVal.note || ''
    
    // 可以在这里根据后端返回的权限数据填充权限对象
  }
}, { immediate: true })

// 切换展开/收起状态
const toggleSection = (section) => {
  expandedSections[section] = !expandedSections[section]
}

// 关闭模态框
const close = () => {
  emits('close')
}

// 保存更改
const saveChanges = () => {
  // 构建要保存的数据对象
  const saveData = {
    ...account,
    permissions
  }
  
  // 发送保存事件
  emits('save', saveData)
}
</script> 