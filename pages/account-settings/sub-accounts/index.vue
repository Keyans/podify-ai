<template>
  <div class="p-8">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-dark-text">子账号管理</h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-dark-text-secondary">管理您的子账号，分配不同的权限</p>
      </div>
      <button
        @click="showCreateDialog = true"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
      >
        <Plus class="w-4 h-4 mr-2" />
        创建子账号
      </button>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            <UsersIcon class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">总子账号</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalSubAccounts }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
            <CheckCircleIcon class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">活跃账号</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ activeSubAccounts }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
            <ClockIcon class="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">今日登录</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ todayLoginCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索和筛选 -->
    <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
            账号状态
          </label>
          <el-select v-model="filters.status" placeholder="全部状态" clearable class="w-full">
            <el-option label="全部状态" value="" />
            <el-option label="正常" value="active" />
            <el-option label="禁用" value="disabled" />
          </el-select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
            权限组
          </label>
          <el-select v-model="filters.roleId" placeholder="全部权限组" clearable class="w-full">
            <el-option label="全部权限组" value="" />
            <el-option
              v-for="role in permissionRoles"
              :key="role.id"
              :label="role.name"
              :value="role.id"
            />
          </el-select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
            搜索
          </label>
          <el-input
            v-model="filters.keyword"
            placeholder="搜索账号或昵称"
            clearable
            @keyup.enter="handleSearch"
          >
            <template #suffix>
              <MagnifyingGlassIcon class="w-4 h-4 text-gray-400" />
            </template>
          </el-input>
        </div>
      </div>

      <div class="flex justify-end mt-4 space-x-3">
        <button
          @click="resetFilters"
          class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text bg-gray-50 dark:bg-dark-border hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-all duration-200"
        >
          重置
        </button>
        <button
          @click="handleSearch"
          class="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
        >
          搜索
        </button>
      </div>
    </div>

    <!-- 子账号列表 -->
    <div class="bg-white dark:bg-dark-card rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <el-table
          :data="currentPageSubAccounts"
          style="width: 100%"
          v-loading="loading"
          @selection-change="handleSelectionChange"
          class="modern-table"
          :header-cell-style="{
            backgroundColor: 'var(--el-bg-color-page)',
            color: 'var(--el-text-color-primary)',
            fontWeight: '600',
            borderBottom: '1px solid var(--el-border-color-light)'
          }"
          :row-style="{ backgroundColor: 'transparent' }"
        >
          <el-table-column type="selection" width="55" />

          <el-table-column label="头像" width="80">
            <template #default="scope">
              <img
                :src="scope.row.avatar || '/default-avatar.png'"
                :alt="scope.row.nickname"
                class="w-10 h-10 rounded-full object-cover"
              />
            </template>
          </el-table-column>

          <el-table-column label="账号信息" min-width="200">
            <template #default="scope">
              <div>
                <div class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.nickname }}</div>
                <div class="text-sm text-gray-500 dark:text-dark-text-secondary">{{ scope.row.username }}</div>
                <div class="text-sm text-gray-500 dark:text-dark-text-secondary">{{ scope.row.domain }}</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="联系方式" width="150">
            <template #default="scope">
              <div class="text-sm">
                <div class="text-gray-900 dark:text-dark-text">{{ scope.row.phone || '-' }}</div>
                <div class="text-gray-500 dark:text-dark-text-secondary">{{ scope.row.email || '-' }}</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="权限组" width="120">
            <template #default="scope">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
                {{ getRoleName(scope.row.roleId) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="100">
            <template #default="scope">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="[
                  scope.row.status === 'active'
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                ]"
              >
                {{ scope.row.status === 'active' ? '正常' : '禁用' }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="最后登录" width="160">
            <template #default="scope">
              <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
                {{ scope.row.lastLoginTime || '从未登录' }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" width="160">
            <template #default="scope">
              <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
                {{ scope.row.createTime }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="200" fixed="right">
            <template #default="scope">
              <div class="flex items-center space-x-2">
                <button
                  @click="editSubAccount(scope.row)"
                  class="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                >
                  编辑
                </button>
                <button
                  @click="toggleSubAccountStatus(scope.row)"
                  class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {{ scope.row.status === 'active' ? '禁用' : '启用' }}
                </button>
                <button
                  @click="resetPassword(scope.row)"
                  class="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  重置密码
                </button>
                <button
                  @click="deleteSubAccount(scope.row)"
                  class="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  删除
                </button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="px-6 py-4 border-t border-gray-200 dark:border-dark-border">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <!-- 创建子账号对话框 -->
    <el-dialog
      v-model="showCreateDialog"
      title="创建子账号"
      width="600px"
      :before-close="handleCreateDialogClose"
    >
      <el-form
        ref="createFormRef"
        :model="createForm"
        :rules="createRules"
        label-width="100px"
        class="space-y-4"
      >
        <el-form-item label="域名" prop="domain">
          <el-input
            v-model="createForm.domain"
            placeholder="请输入域名，如：company.com"
          />
        </el-form-item>

        <el-form-item label="账号" prop="username">
          <el-input
            v-model="createForm.username"
            placeholder="请输入登录账号"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="createForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="createForm.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
          />
        </el-form-item>

        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="createForm.nickname"
            placeholder="请输入昵称"
          />
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="createForm.phone"
            placeholder="请输入手机号（可选）"
          />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="createForm.email"
            placeholder="请输入邮箱（可选）"
          />
        </el-form-item>

        <el-form-item label="权限组" prop="roleId">
          <el-select v-model="createForm.roleId" placeholder="请选择权限组" class="w-full">
            <el-option
              v-for="role in permissionRoles"
              :key="role.id"
              :label="role.name"
              :value="role.id"
            >
              <div>
                <div>{{ role.name }}</div>
                <div class="text-sm text-gray-500">{{ role.description }}</div>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="createForm.remark"
            type="textarea"
            :rows="3"
            placeholder="请输入备注信息（可选）"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <el-button @click="showCreateDialog = false">取消</el-button>
          <el-button type="primary" @click="submitCreateForm" :loading="creating">
            创建子账号
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 编辑子账号对话框 -->
    <el-dialog
      v-model="showEditDialog"
      title="编辑子账号"
      width="600px"
      :before-close="handleEditDialogClose"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        :rules="editRules"
        label-width="100px"
        class="space-y-4"
        v-if="selectedSubAccount"
      >
        <el-form-item label="域名" prop="domain">
          <el-input
            v-model="editForm.domain"
            placeholder="请输入域名"
          />
        </el-form-item>

        <el-form-item label="账号" prop="username">
          <el-input
            v-model="editForm.username"
            placeholder="请输入登录账号"
            disabled
          />
        </el-form-item>

        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="editForm.nickname"
            placeholder="请输入昵称"
          />
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="editForm.phone"
            placeholder="请输入手机号（可选）"
          />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="editForm.email"
            placeholder="请输入邮箱（可选）"
          />
        </el-form-item>

        <el-form-item label="权限组" prop="roleId">
          <el-select v-model="editForm.roleId" placeholder="请选择权限组" class="w-full">
            <el-option
              v-for="role in permissionRoles"
              :key="role.id"
              :label="role.name"
              :value="role.id"
            >
              <div>
                <div>{{ role.name }}</div>
                <div class="text-sm text-gray-500">{{ role.description }}</div>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="editForm.remark"
            type="textarea"
            :rows="3"
            placeholder="请输入备注信息（可选）"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <el-button @click="showEditDialog = false">取消</el-button>
          <el-button type="primary" @click="submitEditForm" :loading="editing">
            保存修改
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import {
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline';

// 类型定义
interface SubAccount {
  id: string;
  username: string;
  nickname: string;
  domain: string;
  phone?: string;
  email?: string;
  avatar?: string;
  roleId: string;
  status: 'active' | 'disabled';
  lastLoginTime?: string;
  createTime: string;
  remark?: string;
}

interface PermissionRole {
  id: string;
  name: string;
  description: string;
}

// 响应式数据
const loading = ref(false);
const creating = ref(false);
const editing = ref(false);
const showCreateDialog = ref(false);
const showEditDialog = ref(false);
const selectedSubAccount = ref<SubAccount | null>(null);
const selectedRows = ref<SubAccount[]>([]);

// 表单引用
const createFormRef = ref<FormInstance>();
const editFormRef = ref<FormInstance>();

// 创建表单数据
const createForm = reactive({
  domain: '',
  username: '',
  password: '',
  confirmPassword: '',
  nickname: '',
  phone: '',
  email: '',
  roleId: '',
  remark: ''
});

// 编辑表单数据
const editForm = reactive({
  domain: '',
  username: '',
  nickname: '',
  phone: '',
  email: '',
  roleId: '',
  remark: ''
});

// 统计数据
const totalSubAccounts = ref(8);
const activeSubAccounts = ref(6);
const todayLoginCount = ref(3);

// 筛选条件
const filters = reactive({
  status: '',
  roleId: '',
  keyword: ''
});

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
});

// 子账号数据
const subAccounts = ref<SubAccount[]>([]);

// 权限组数据
const permissionRoles = ref<PermissionRole[]>([
  { id: 'admin', name: '管理员', description: '拥有所有权限' },
  { id: 'operator', name: '操作员', description: '基本操作权限' },
  { id: 'viewer', name: '查看员', description: '只读权限' }
]);

// 表单验证规则
const createRules: FormRules = {
  domain: [
    { required: true, message: '请输入域名', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 20, message: '账号长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (_rule: any, value: string, callback: Function) => {
        if (value !== createForm.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  roleId: [
    { required: true, message: '请选择权限组', trigger: 'change' }
  ]
};

const editRules: FormRules = {
  domain: [
    { required: true, message: '请输入域名', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  roleId: [
    { required: true, message: '请选择权限组', trigger: 'change' }
  ]
};

// 计算属性
const currentPageSubAccounts = computed(() => {
  const start = (pagination.currentPage - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  return subAccounts.value.slice(start, end);
});

// 方法
const getRoleName = (roleId: string) => {
  const role = permissionRoles.value.find(r => r.id === roleId);
  return role?.name || roleId;
};

const handleSearch = () => {
  pagination.currentPage = 1;
  loadSubAccounts();
};

const resetFilters = () => {
  filters.status = '';
  filters.roleId = '';
  filters.keyword = '';
  handleSearch();
};

const handleSelectionChange = (selection: SubAccount[]) => {
  selectedRows.value = selection;
};

const handleSizeChange = (size: number) => {
  pagination.pageSize = size;
  loadSubAccounts();
};

const handleCurrentChange = (page: number) => {
  pagination.currentPage = page;
  loadSubAccounts();
};

const editSubAccount = (subAccount: SubAccount) => {
  selectedSubAccount.value = subAccount;
  // 填充编辑表单
  editForm.domain = subAccount.domain;
  editForm.username = subAccount.username;
  editForm.nickname = subAccount.nickname;
  editForm.phone = subAccount.phone || '';
  editForm.email = subAccount.email || '';
  editForm.roleId = subAccount.roleId;
  editForm.remark = subAccount.remark || '';
  showEditDialog.value = true;
};

const handleCreateDialogClose = () => {
  if (!creating.value) {
    resetCreateForm();
    showCreateDialog.value = false;
  }
};

const handleEditDialogClose = () => {
  if (!editing.value) {
    resetEditForm();
    showEditDialog.value = false;
  }
};

const resetCreateForm = () => {
  createFormRef.value?.resetFields();
  Object.assign(createForm, {
    domain: '',
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    phone: '',
    email: '',
    roleId: '',
    remark: ''
  });
};

const resetEditForm = () => {
  editFormRef.value?.resetFields();
  Object.assign(editForm, {
    domain: '',
    username: '',
    nickname: '',
    phone: '',
    email: '',
    roleId: '',
    remark: ''
  });
};

const submitCreateForm = async () => {
  if (!createFormRef.value) return;

  try {
    await createFormRef.value.validate();
    creating.value = true;

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 创建新的子账号
    const newSubAccount: SubAccount = {
      id: `SUB${Date.now()}`,
      username: createForm.username,
      nickname: createForm.nickname,
      domain: createForm.domain,
      phone: createForm.phone || undefined,
      email: createForm.email || undefined,
      roleId: createForm.roleId,
      status: 'active',
      createTime: new Date().toLocaleString(),
      remark: createForm.remark || undefined
    };

    subAccounts.value.unshift(newSubAccount);
    pagination.total = subAccounts.value.length;
    totalSubAccounts.value++;
    activeSubAccounts.value++;

    resetCreateForm();
    showCreateDialog.value = false;
    ElMessage.success('子账号创建成功');
  } catch (error) {
    ElMessage.error('创建失败，请检查输入信息');
  } finally {
    creating.value = false;
  }
};

const submitEditForm = async () => {
  if (!editFormRef.value || !selectedSubAccount.value) return;

  try {
    await editFormRef.value.validate();
    editing.value = true;

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 更新子账号信息
    const index = subAccounts.value.findIndex(item => item.id === selectedSubAccount.value!.id);
    if (index > -1) {
      Object.assign(subAccounts.value[index], {
        domain: editForm.domain,
        nickname: editForm.nickname,
        phone: editForm.phone || undefined,
        email: editForm.email || undefined,
        roleId: editForm.roleId,
        remark: editForm.remark || undefined
      });
    }

    resetEditForm();
    showEditDialog.value = false;
    ElMessage.success('子账号信息更新成功');
  } catch (error) {
    ElMessage.error('更新失败，请检查输入信息');
  } finally {
    editing.value = false;
  }
};

const toggleSubAccountStatus = async (subAccount: SubAccount) => {
  const action = subAccount.status === 'active' ? '禁用' : '启用';
  try {
    await ElMessageBox.confirm(
      `确定要${action}子账号 "${subAccount.nickname}" 吗？`,
      '确认操作',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    );

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500));
    
    subAccount.status = subAccount.status === 'active' ? 'disabled' : 'active';
    ElMessage.success(`${action}成功`);
  } catch (error) {
    // 用户取消操作
  }
};

const resetPassword = async (subAccount: SubAccount) => {
  try {
    await ElMessageBox.confirm(
      `确定要重置子账号 "${subAccount.nickname}" 的密码吗？新密码将发送到其邮箱。`,
      '确认重置密码',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    );

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500));
    
    ElMessage.success('密码重置成功，新密码已发送到用户邮箱');
  } catch (error) {
    // 用户取消操作
  }
};

const deleteSubAccount = async (subAccount: SubAccount) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除子账号 "${subAccount.nickname}" 吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }
    );

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = subAccounts.value.findIndex(item => item.id === subAccount.id);
    if (index > -1) {
      subAccounts.value.splice(index, 1);
      pagination.total = subAccounts.value.length;
    }
    
    ElMessage.success('删除成功');
  } catch (error) {
    // 用户取消操作
  }
};

const loadSubAccounts = () => {
  loading.value = true;
  
  // 模拟加载数据
  setTimeout(() => {
    // 模拟子账号数据
    const mockSubAccounts: SubAccount[] = [
      {
        id: 'SUB001',
        username: 'zhangsan',
        nickname: '张三',
        domain: 'company.com',
        phone: '13800138001',
        email: 'zhangsan@company.com',
        avatar: '/avatars/zhangsan.jpg',
        roleId: 'admin',
        status: 'active',
        lastLoginTime: '2024-01-15 14:30:00',
        createTime: '2024-01-01 10:00:00',
        remark: '技术负责人'
      },
      {
        id: 'SUB002',
        username: 'lisi',
        nickname: '李四',
        domain: 'company.com',
        phone: '13800138002',
        email: 'lisi@company.com',
        roleId: 'operator',
        status: 'active',
        lastLoginTime: '2024-01-15 09:15:00',
        createTime: '2024-01-02 11:00:00',
        remark: '运营专员'
      },
      {
        id: 'SUB003',
        username: 'wangwu',
        nickname: '王五',
        domain: 'company.com',
        email: 'wangwu@company.com',
        roleId: 'viewer',
        status: 'disabled',
        lastLoginTime: '2024-01-10 16:45:00',
        createTime: '2024-01-03 14:00:00',
        remark: '临时账号'
      }
    ];
    
    subAccounts.value = mockSubAccounts;
    pagination.total = mockSubAccounts.length;
    loading.value = false;
  }, 500);
};

const refreshData = () => {
  loadSubAccounts();
};

// 导出给模板使用
defineExpose({
  refreshData
});

// 生命周期
onMounted(() => {
  loadSubAccounts();
});
</script>
