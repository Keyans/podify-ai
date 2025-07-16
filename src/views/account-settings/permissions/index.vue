<template>
  <div class="p-8">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-dark-text">权限设置</h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-dark-text-secondary">管理权限组和权限分配</p>
      </div>
      <button
        @click="showCreateRoleDialog = true"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
      >
        <Plus class="w-4 h-4 mr-2" />
        创建权限组
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 权限组列表 -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">权限组</h3>
          
          <div class="space-y-3">
            <div
              v-for="role in permissionRoles"
              :key="role.id"
              @click="selectRole(role)"
              class="p-4 border rounded-lg cursor-pointer transition-all duration-200"
              :class="[
                selectedRole?.id === role.id
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                  : 'border-gray-200 dark:border-dark-border hover:border-amber-300 dark:hover:border-amber-600'
              ]"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-dark-text">{{ role.name }}</h4>
                  <p class="text-sm text-gray-500 dark:text-dark-text-secondary">{{ role.description }}</p>
                  <p class="text-xs text-gray-400 mt-1">{{ role.userCount }} 个用户</p>
                </div>
                <div class="flex space-x-2">
                  <button
                    @click.stop="editRole(role)"
                    class="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                  >
                    编辑
                  </button>
                  <button
                    v-if="!role.isSystem"
                    @click.stop="deleteRole(role)"
                    class="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 权限配置 -->
      <div class="lg:col-span-2">
        <div v-if="selectedRole" class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text">
              {{ selectedRole.name }} - 权限配置
            </h3>
            <button
              @click="savePermissions"
              :loading="saving"
              class="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
            >
              保存权限
            </button>
          </div>

          <el-tabs v-model="activeTab" class="permission-tabs">
            <!-- 功能权限 -->
            <el-tab-pane label="功能权限" name="function">
              <div class="space-y-6">
                <div
                  v-for="module in functionPermissions"
                  :key="module.id"
                  class="border border-gray-200 dark:border-dark-border rounded-lg p-4"
                >
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                      <el-checkbox
                        :model-value="isModuleAllSelected(module)"
                        :indeterminate="isModuleIndeterminate(module)"
                        @change="toggleModulePermissions(module, $event)"
                      />
                      <h4 class="ml-3 font-medium text-gray-900 dark:text-dark-text">{{ module.name }}</h4>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3 ml-6">
                    <label
                      v-for="permission in module.permissions"
                      :key="permission.id"
                      class="flex items-center space-x-2 text-sm"
                    >
                      <el-checkbox
                        v-model="selectedPermissions[permission.id]"
                        @change="updatePermissionSelection"
                      />
                      <span class="text-gray-700 dark:text-dark-text-secondary">{{ permission.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <!-- 菜单权限 -->
            <el-tab-pane label="菜单权限" name="menu">
              <div class="space-y-4">
                <div
                  v-for="menu in menuPermissions"
                  :key="menu.id"
                  class="border border-gray-200 dark:border-dark-border rounded-lg p-4"
                >
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                      <el-checkbox
                        :model-value="isMenuAllSelected(menu)"
                        :indeterminate="isMenuIndeterminate(menu)"
                        @change="toggleMenuPermissions(menu, $event)"
                      />
                      <h4 class="ml-3 font-medium text-gray-900 dark:text-dark-text">{{ menu.name }}</h4>
                    </div>
                  </div>
                  
                  <div v-if="menu.children" class="ml-6 space-y-2">
                    <label
                      v-for="child in menu.children"
                      :key="child.id"
                      class="flex items-center space-x-2 text-sm"
                    >
                      <el-checkbox
                        v-model="selectedMenus[child.id]"
                        @change="updateMenuSelection"
                      />
                      <span class="text-gray-700 dark:text-dark-text-secondary">{{ child.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <!-- 数据权限 -->
            <el-tab-pane label="数据权限" name="data">
              <div class="space-y-6">
                <div class="border border-gray-200 dark:border-dark-border rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 dark:text-dark-text mb-4">数据范围</h4>
                  <el-radio-group v-model="dataPermissions.scope" class="space-y-3">
                    <div class="flex flex-col space-y-3">
                      <el-radio label="all">全部数据</el-radio>
                      <el-radio label="department">本部门数据</el-radio>
                      <el-radio label="self">仅本人数据</el-radio>
                      <el-radio label="custom">自定义数据范围</el-radio>
                    </div>
                  </el-radio-group>
                </div>

                <div v-if="dataPermissions.scope === 'custom'" class="border border-gray-200 dark:border-dark-border rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 dark:text-dark-text mb-4">自定义范围</h4>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                        可访问部门
                      </label>
                      <el-select
                        v-model="dataPermissions.departments"
                        multiple
                        placeholder="选择部门"
                        class="w-full"
                      >
                        <el-option
                          v-for="dept in departments"
                          :key="dept.id"
                          :label="dept.name"
                          :value="dept.id"
                        />
                      </el-select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                        可访问用户
                      </label>
                      <el-select
                        v-model="dataPermissions.users"
                        multiple
                        placeholder="选择用户"
                        class="w-full"
                      >
                        <el-option
                          v-for="user in users"
                          :key="user.id"
                          :label="user.name"
                          :value="user.id"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>

                <div class="border border-gray-200 dark:border-dark-border rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 dark:text-dark-text mb-4">操作权限</h4>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label
                      v-for="operation in dataOperations"
                      :key="operation.id"
                      class="flex items-center space-x-2 text-sm"
                    >
                      <el-checkbox v-model="dataPermissions.operations[operation.id]" />
                      <span class="text-gray-700 dark:text-dark-text-secondary">{{ operation.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <div v-else class="bg-white dark:bg-dark-card rounded-lg p-12 shadow-sm text-center">
          <ShieldCheckIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-2">选择权限组</h3>
          <p class="text-gray-500 dark:text-dark-text-secondary">请从左侧选择一个权限组来配置权限</p>
        </div>
      </div>
    </div>

    <!-- 创建权限组对话框 -->
    <el-dialog
      v-model="showCreateRoleDialog"
      title="创建权限组"
      width="500px"
    >
      <el-form
        ref="createRoleFormRef"
        :model="createRoleForm"
        :rules="createRoleRules"
        label-width="100px"
      >
        <el-form-item label="权限组名称" prop="name">
          <el-input
            v-model="createRoleForm.name"
            placeholder="请输入权限组名称"
          />
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input
            v-model="createRoleForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入权限组描述"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <el-button @click="showCreateRoleDialog = false">取消</el-button>
          <el-button type="primary" @click="submitCreateRole" :loading="creatingRole">
            创建
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 编辑权限组对话框 -->
    <el-dialog
      v-model="showEditRoleDialog"
      title="编辑权限组"
      width="500px"
    >
      <el-form
        ref="editRoleFormRef"
        :model="editRoleForm"
        :rules="editRoleRules"
        label-width="100px"
        v-if="editingRole"
      >
        <el-form-item label="权限组名称" prop="name">
          <el-input
            v-model="editRoleForm.name"
            placeholder="请输入权限组名称"
          />
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input
            v-model="editRoleForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入权限组描述"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <el-button @click="showEditRoleDialog = false">取消</el-button>
          <el-button type="primary" @click="submitEditRole" :loading="editingRoleLoading">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { ShieldCheckIcon } from '@heroicons/vue/24/outline';

// 类型定义
interface PermissionRole {
  id: string;
  name: string;
  description: string;
  userCount: number;
  isSystem: boolean;
}

interface Permission {
  id: string;
  name: string;
  code: string;
}

interface PermissionModule {
  id: string;
  name: string;
  permissions: Permission[];
}

interface MenuItem {
  id: string;
  name: string;
  path?: string;
  children?: MenuItem[];
}

interface Department {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
}

interface DataOperation {
  id: string;
  name: string;
  code: string;
}

// 响应式数据
const saving = ref(false);
const creatingRole = ref(false);
const editingRoleLoading = ref(false);
const showCreateRoleDialog = ref(false);
const showEditRoleDialog = ref(false);
const selectedRole = ref<PermissionRole | null>(null);
const editingRole = ref<PermissionRole | null>(null);
const activeTab = ref('function');

// 表单引用
const createRoleFormRef = ref<FormInstance>();
const editRoleFormRef = ref<FormInstance>();

// 创建权限组表单
const createRoleForm = reactive({
  name: '',
  description: ''
});

// 编辑权限组表单
const editRoleForm = reactive({
  name: '',
  description: ''
});

// 权限选择状态
const selectedPermissions = ref<Record<string, boolean>>({});
const selectedMenus = ref<Record<string, boolean>>({});

// 数据权限配置
const dataPermissions = reactive({
  scope: 'department',
  departments: [] as string[],
  users: [] as string[],
  operations: {} as Record<string, boolean>
});

// 权限组数据
const permissionRoles = ref<PermissionRole[]>([
  { id: 'admin', name: '超级管理员', description: '拥有所有权限', userCount: 1, isSystem: true },
  { id: 'manager', name: '管理员', description: '管理权限', userCount: 3, isSystem: false },
  { id: 'operator', name: '操作员', description: '基本操作权限', userCount: 8, isSystem: false },
  { id: 'viewer', name: '查看员', description: '只读权限', userCount: 12, isSystem: false }
]);

// 功能权限模块
const functionPermissions = ref<PermissionModule[]>([
  {
    id: 'product-collection',
    name: '商品采集',
    permissions: [
      { id: 'product-collection:create', name: '创建采集任务', code: 'product-collection:create' },
      { id: 'product-collection:view', name: '查看采集任务', code: 'product-collection:view' },
      { id: 'product-collection:export', name: '导出采集数据', code: 'product-collection:export' },
      { id: 'product-collection:delete', name: '删除采集任务', code: 'product-collection:delete' }
    ]
  },
  {
    id: 'smart-crop',
    name: '智能裁图',
    permissions: [
      { id: 'smart-crop:create', name: '创建裁图任务', code: 'smart-crop:create' },
      { id: 'smart-crop:view', name: '查看裁图任务', code: 'smart-crop:view' },
      { id: 'smart-crop:download', name: '下载裁图结果', code: 'smart-crop:download' },
      { id: 'smart-crop:delete', name: '删除裁图任务', code: 'smart-crop:delete' }
    ]
  },
  {
    id: 'gallery',
    name: '图库管理',
    permissions: [
      { id: 'gallery:upload', name: '上传图片', code: 'gallery:upload' },
      { id: 'gallery:view', name: '查看图库', code: 'gallery:view' },
      { id: 'gallery:download', name: '下载图片', code: 'gallery:download' },
      { id: 'gallery:delete', name: '删除图片', code: 'gallery:delete' },
      { id: 'gallery:manage', name: '图库管理', code: 'gallery:manage' }
    ]
  },
  {
    id: 'products',
    name: '商品管理',
    permissions: [
      { id: 'products:create', name: '创建商品', code: 'products:create' },
      { id: 'products:view', name: '查看商品', code: 'products:view' },
      { id: 'products:edit', name: '编辑商品', code: 'products:edit' },
      { id: 'products:delete', name: '删除商品', code: 'products:delete' },
      { id: 'products:export', name: '导出商品', code: 'products:export' }
    ]
  },
  {
    id: 'account',
    name: '账号管理',
    permissions: [
      { id: 'account:sub-create', name: '创建子账号', code: 'account:sub-create' },
      { id: 'account:sub-view', name: '查看子账号', code: 'account:sub-view' },
      { id: 'account:sub-edit', name: '编辑子账号', code: 'account:sub-edit' },
      { id: 'account:sub-delete', name: '删除子账号', code: 'account:sub-delete' },
      { id: 'account:permission', name: '权限管理', code: 'account:permission' }
    ]
  }
]);

// 菜单权限
const menuPermissions = ref<MenuItem[]>([
  {
    id: 'dashboard',
    name: '驾驶舱',
    path: '/dashboard'
  },
  {
    id: 'my-apps',
    name: '我的应用',
    children: [
      { id: 'product-collection-menu', name: '商品采集', path: '/my-apps/product-collection' },
      { id: 'smart-crop-menu', name: '智能裁图', path: '/my-apps/smart-crop' },
      { id: 'one-click-cutout-menu', name: '一键抠图', path: '/my-apps/one-click-cutout' },
      { id: 'super-split-menu', name: '超级裂变', path: '/my-apps/super-split' },
      { id: 'title-generator-menu', name: '标题生成', path: '/my-apps/title-generator' },
      { id: 'batch-listing-menu', name: '批量刊登', path: '/my-apps/batch-listing' }
    ]
  },
  {
    id: 'workflows',
    name: '工作流',
    path: '/workflows'
  },
  {
    id: 'gallery-menu',
    name: '图库管理',
    children: [
      { id: 'gallery-overview-menu', name: '图库概览', path: '/gallery/overview' },
      { id: 'product-gallery-menu', name: '商品图库', path: '/gallery/products' },
      { id: 'material-gallery-menu', name: '素材图库', path: '/gallery/materials' },
      { id: 'background-gallery-menu', name: '背景图库', path: '/gallery/backgrounds' },
      { id: 'result-gallery-menu', name: '处理结果', path: '/gallery/results' }
    ]
  },
  {
    id: 'products-menu',
    name: '商品管理',
    children: [
      { id: 'basic-products-menu', name: '白品管理', path: '/products/basic' },
      { id: 'pod-products-menu', name: 'POD商品', path: '/products/pod' }
    ]
  },
  {
    id: 'app-market-menu',
    name: '应用市场',
    path: '/app-market'
  },
  {
    id: 'account-settings-menu',
    name: '账号设置',
    children: [
      { id: 'account-profile-menu', name: '基本信息', path: '/account-settings/profile' },
      { id: 'account-recharge-menu', name: '账号充值', path: '/account-settings/recharge' },
      { id: 'account-transactions-menu', name: '交易记录', path: '/account-settings/transactions' },
      { id: 'sub-accounts-menu', name: '子账号管理', path: '/account-settings/sub-accounts' },
      { id: 'permissions-menu', name: '权限设置', path: '/account-settings/permissions' }
    ]
  }
]);

// 部门数据
const departments = ref<Department[]>([
  { id: 'tech', name: '技术部' },
  { id: 'product', name: '产品部' },
  { id: 'operation', name: '运营部' },
  { id: 'sales', name: '销售部' }
]);

// 用户数据
const users = ref<User[]>([
  { id: 'user1', name: '张三' },
  { id: 'user2', name: '李四' },
  { id: 'user3', name: '王五' },
  { id: 'user4', name: '赵六' }
]);

// 数据操作权限
const dataOperations = ref<DataOperation[]>([
  { id: 'create', name: '创建', code: 'data:create' },
  { id: 'read', name: '查看', code: 'data:read' },
  { id: 'update', name: '编辑', code: 'data:update' },
  { id: 'delete', name: '删除', code: 'data:delete' },
  { id: 'export', name: '导出', code: 'data:export' },
  { id: 'import', name: '导入', code: 'data:import' }
]);

// 表单验证规则
const createRoleRules: FormRules = {
  name: [
    { required: true, message: '请输入权限组名称', trigger: 'blur' },
    { min: 2, max: 20, message: '名称长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入权限组描述', trigger: 'blur' }
  ]
};

const editRoleRules: FormRules = {
  name: [
    { required: true, message: '请输入权限组名称', trigger: 'blur' },
    { min: 2, max: 20, message: '名称长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入权限组描述', trigger: 'blur' }
  ]
};

// 计算属性
const isModuleAllSelected = (module: PermissionModule) => {
  return module.permissions.every(p => selectedPermissions.value[p.id]);
};

const isModuleIndeterminate = (module: PermissionModule) => {
  const selectedCount = module.permissions.filter(p => selectedPermissions.value[p.id]).length;
  return selectedCount > 0 && selectedCount < module.permissions.length;
};

const isMenuAllSelected = (menu: MenuItem) => {
  if (!menu.children) return selectedMenus.value[menu.id];
  return menu.children.every(child => selectedMenus.value[child.id]);
};

const isMenuIndeterminate = (menu: MenuItem) => {
  if (!menu.children) return false;
  const selectedCount = menu.children.filter(child => selectedMenus.value[child.id]).length;
  return selectedCount > 0 && selectedCount < menu.children.length;
};

// 方法
const selectRole = (role: PermissionRole) => {
  selectedRole.value = role;
  loadRolePermissions(role);
};

const loadRolePermissions = (role: PermissionRole) => {
  // 模拟加载角色权限
  const mockPermissions: Record<string, boolean> = {};
  const mockMenus: Record<string, boolean> = {};
  const mockDataOps: Record<string, boolean> = {};

  // 根据角色类型设置默认权限
  if (role.id === 'admin') {
    // 管理员拥有所有权限
    functionPermissions.value.forEach(module => {
      module.permissions.forEach(permission => {
        mockPermissions[permission.id] = true;
      });
    });
    menuPermissions.value.forEach(menu => {
      mockMenus[menu.id] = true;
      if (menu.children) {
        menu.children.forEach(child => {
          mockMenus[child.id] = true;
        });
      }
    });
    dataOperations.value.forEach(op => {
      mockDataOps[op.id] = true;
    });
    dataPermissions.scope = 'all';
  } else if (role.id === 'operator') {
    // 操作员基本权限
    mockPermissions['product-collection:create'] = true;
    mockPermissions['product-collection:view'] = true;
    mockPermissions['smart-crop:create'] = true;
    mockPermissions['smart-crop:view'] = true;
    mockMenus['dashboard'] = true;
    mockMenus['my-apps'] = true;
    mockMenus['product-collection-menu'] = true;
    mockMenus['smart-crop-menu'] = true;
    mockDataOps['create'] = true;
    mockDataOps['read'] = true;
    dataPermissions.scope = 'self';
  } else if (role.id === 'viewer') {
    // 查看员只读权限
    mockPermissions['product-collection:view'] = true;
    mockPermissions['smart-crop:view'] = true;
    mockMenus['dashboard'] = true;
    mockMenus['my-apps'] = true;
    mockMenus['product-collection-menu'] = true;
    mockMenus['smart-crop-menu'] = true;
    mockDataOps['read'] = true;
    dataPermissions.scope = 'self';
  }

  selectedPermissions.value = mockPermissions;
  selectedMenus.value = mockMenus;
  dataPermissions.operations = mockDataOps;
};

const toggleModulePermissions = (module: PermissionModule, checked: boolean) => {
  module.permissions.forEach(permission => {
    selectedPermissions.value[permission.id] = checked;
  });
};

const toggleMenuPermissions = (menu: MenuItem, checked: boolean) => {
  selectedMenus.value[menu.id] = checked;
  if (menu.children) {
    menu.children.forEach(child => {
      selectedMenus.value[child.id] = checked;
    });
  }
};

const updatePermissionSelection = () => {
  // 权限选择更新时的处理逻辑
};

const updateMenuSelection = () => {
  // 菜单选择更新时的处理逻辑
};

const savePermissions = async () => {
  if (!selectedRole.value) return;

  saving.value = true;
  try {
    // 模拟保存权限
    await new Promise(resolve => setTimeout(resolve, 1000));
    ElMessage.success('权限保存成功');
  } catch (error) {
    ElMessage.error('权限保存失败');
  } finally {
    saving.value = false;
  }
};

const editRole = (role: PermissionRole) => {
  editingRole.value = role;
  editRoleForm.name = role.name;
  editRoleForm.description = role.description;
  showEditRoleDialog.value = true;
};

const deleteRole = async (role: PermissionRole) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除权限组 "${role.name}" 吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }
    );

    // 模拟删除
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = permissionRoles.value.findIndex(item => item.id === role.id);
    if (index > -1) {
      permissionRoles.value.splice(index, 1);
    }

    if (selectedRole.value?.id === role.id) {
      selectedRole.value = null;
    }

    ElMessage.success('删除成功');
  } catch (error) {
    // 用户取消操作
  }
};

const submitCreateRole = async () => {
  if (!createRoleFormRef.value) return;

  try {
    await createRoleFormRef.value.validate();
    creatingRole.value = true;

    // 模拟创建
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newRole: PermissionRole = {
      id: `role_${Date.now()}`,
      name: createRoleForm.name,
      description: createRoleForm.description,
      userCount: 0,
      isSystem: false
    };

    permissionRoles.value.push(newRole);

    // 重置表单
    createRoleFormRef.value.resetFields();
    showCreateRoleDialog.value = false;

    ElMessage.success('权限组创建成功');
  } catch (error) {
    ElMessage.error('创建失败，请检查输入信息');
  } finally {
    creatingRole.value = false;
  }
};

const submitEditRole = async () => {
  if (!editRoleFormRef.value || !editingRole.value) return;

  try {
    await editRoleFormRef.value.validate();
    editingRoleLoading.value = true;

    // 模拟更新
    await new Promise(resolve => setTimeout(resolve, 1000));

    const index = permissionRoles.value.findIndex(item => item.id === editingRole.value!.id);
    if (index > -1) {
      permissionRoles.value[index].name = editRoleForm.name;
      permissionRoles.value[index].description = editRoleForm.description;
    }

    if (selectedRole.value?.id === editingRole.value.id) {
      selectedRole.value.name = editRoleForm.name;
      selectedRole.value.description = editRoleForm.description;
    }

    // 重置表单
    editRoleFormRef.value.resetFields();
    showEditRoleDialog.value = false;
    editingRole.value = null;

    ElMessage.success('权限组更新成功');
  } catch (error) {
    ElMessage.error('更新失败，请检查输入信息');
  } finally {
    editingRoleLoading.value = false;
  }
};

// 生命周期
onMounted(() => {
  // 初始化数据操作权限
  dataOperations.value.forEach(op => {
    dataPermissions.operations[op.id] = false;
  });
});
</script>
