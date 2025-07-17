<template>
  <div class="p-8">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-dark-text">基本信息</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-dark-text-secondary">管理您的账号基本信息</p>
    </div>

    <!-- 基本信息表单 -->
    <div class="max-w-2xl">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="space-y-6"
      >
        <!-- 头像上传 -->
        <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">头像设置</h3>
          <div class="flex items-center space-x-6">
            <div class="relative">
              <img
                :src="form.avatar || '/default-avatar.png'"
                alt="头像"
                class="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-dark-border shadow-lg"
              />
              <button
                @click="openAvatarUpload"
                class="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <CameraIcon class="w-4 h-4" />
              </button>
            </div>
            <div>
              <p class="text-sm text-gray-600 dark:text-dark-text-secondary mb-2">
                支持 JPG、PNG 格式，文件大小不超过 2MB
              </p>
              <button
                @click="openAvatarUpload"
                class="px-4 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-all duration-200"
              >
                更换头像
              </button>
            </div>
          </div>
        </div>

        <!-- 基本信息 -->
        <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">基本信息</h3>
          <div class="space-y-4">
            <el-form-item label="昵称" prop="nickname">
              <el-input
                v-model="form.nickname"
                placeholder="请输入昵称"
                class="w-full"
              />
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
              <div class="flex items-center space-x-3">
                <el-input
                  v-model="form.phone"
                  placeholder="请输入手机号"
                  :disabled="!editingPhone"
                  class="flex-1"
                />
                <button
                  v-if="!editingPhone"
                  @click="editingPhone = true"
                  class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text bg-gray-50 dark:bg-dark-border hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-all duration-200"
                >
                  修改
                </button>
                <div v-else class="flex space-x-2">
                  <button
                    @click="savePhone"
                    class="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
                  >
                    保存
                  </button>
                  <button
                    @click="cancelEditPhone"
                    class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text bg-gray-50 dark:bg-dark-border hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-all duration-200"
                  >
                    取消
                  </button>
                </div>
              </div>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <div class="flex items-center space-x-3">
                <el-input
                  v-model="form.email"
                  placeholder="请输入邮箱"
                  :disabled="!editingEmail"
                  class="flex-1"
                />
                <button
                  v-if="!editingEmail"
                  @click="editingEmail = true"
                  class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text bg-gray-50 dark:bg-dark-border hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-all duration-200"
                >
                  修改
                </button>
                <div v-else class="flex space-x-2">
                  <button
                    @click="saveEmail"
                    class="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
                  >
                    保存
                  </button>
                  <button
                    @click="cancelEditEmail"
                    class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text bg-gray-50 dark:bg-dark-border hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-all duration-200"
                  >
                    取消
                  </button>
                </div>
              </div>
            </el-form-item>
          </div>
        </div>

        <!-- 密码修改 -->
        <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">密码修改</h3>
          <div class="space-y-4">
            <el-form-item label="当前密码" prop="currentPassword">
              <el-input
                v-model="form.currentPassword"
                type="password"
                placeholder="请输入当前密码"
                show-password
                class="w-full"
              />
            </el-form-item>

            <el-form-item label="新密码" prop="newPassword">
              <el-input
                v-model="form.newPassword"
                type="password"
                placeholder="请输入新密码"
                show-password
                class="w-full"
              />
            </el-form-item>

            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                v-model="form.confirmPassword"
                type="password"
                placeholder="请再次输入新密码"
                show-password
                class="w-full"
              />
            </el-form-item>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-end space-x-3 pt-6">
          <button
            @click="resetForm"
            class="px-6 py-2 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text bg-gray-50 dark:bg-dark-border hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-all duration-200"
          >
            重置
          </button>
          <button
            @click="submitForm"
            :loading="submitting"
            class="px-6 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
          >
            保存修改
          </button>
        </div>
      </el-form>
    </div>

    <!-- 头像上传对话框 -->
    <el-dialog
      v-model="showAvatarDialog"
      title="更换头像"
      width="500px"
      :before-close="handleAvatarDialogClose"
    >
      <div class="space-y-4">
        <el-upload
          ref="uploadRef"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleAvatarChange"
          accept="image/jpeg,image/png"
          drag
        >
          <div class="text-center py-8">
            <CloudArrowUpIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-600 dark:text-dark-text-secondary">
              点击或拖拽图片到此处上传
            </p>
            <p class="text-sm text-gray-400 mt-2">
              支持 JPG、PNG 格式，文件大小不超过 2MB
            </p>
          </div>
        </el-upload>

        <div v-if="previewAvatar" class="text-center">
          <img
            :src="previewAvatar"
            alt="预览"
            class="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200 dark:border-dark-border"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <el-button @click="showAvatarDialog = false">取消</el-button>
          <el-button type="primary" @click="uploadAvatar" :loading="uploading">
            确认上传
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, type FormInstance, type FormRules, type UploadFile } from 'element-plus';
import { CameraIcon, CloudArrowUpIcon } from '@heroicons/vue/24/outline';

// 类型定义
interface ProfileForm {
  nickname: string;
  phone: string;
  email: string;
  avatar: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// 响应式数据
const formRef = ref<FormInstance>();
const uploadRef = ref();
const submitting = ref(false);
const uploading = ref(false);
const editingPhone = ref(false);
const editingEmail = ref(false);
const showAvatarDialog = ref(false);
const previewAvatar = ref('');

const form = reactive<ProfileForm>({
  nickname: '',
  phone: '',
  email: '',
  avatar: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// 备份原始数据
const originalPhone = ref('');
const originalEmail = ref('');

// 表单验证规则
const rules: FormRules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  newPassword: [
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    {
      validator: (_rule: any, value: string, callback: Function) => {
        if (value && value !== form.newPassword) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

// 方法
const loadUserProfile = () => {
  // 模拟加载用户数据
  form.nickname = '张三';
  form.phone = '13800138000';
  form.email = 'zhangsan@example.com';
  form.avatar = '/default-avatar.png';
  
  originalPhone.value = form.phone;
  originalEmail.value = form.email;
};

const openAvatarUpload = () => {
  showAvatarDialog.value = true;
  previewAvatar.value = '';
};

const handleAvatarChange = (file: UploadFile) => {
  if (file.raw) {
    // 验证文件大小
    if (file.raw.size > 2 * 1024 * 1024) {
      ElMessage.error('文件大小不能超过 2MB');
      return;
    }

    // 创建预览
    const reader = new FileReader();
    reader.onload = (e) => {
      previewAvatar.value = e.target?.result as string;
    };
    reader.readAsDataURL(file.raw);
  }
};

const uploadAvatar = async () => {
  if (!previewAvatar.value) {
    ElMessage.warning('请选择要上传的头像');
    return;
  }

  uploading.value = true;
  try {
    // 模拟上传
    await new Promise(resolve => setTimeout(resolve, 1000));
    form.avatar = previewAvatar.value;
    showAvatarDialog.value = false;
    ElMessage.success('头像更新成功');
  } catch (error) {
    ElMessage.error('头像上传失败');
  } finally {
    uploading.value = false;
  }
};

const handleAvatarDialogClose = () => {
  previewAvatar.value = '';
  uploadRef.value?.clearFiles();
};

const savePhone = async () => {
  try {
    await formRef.value?.validateField('phone');
    // 模拟保存
    await new Promise(resolve => setTimeout(resolve, 500));
    originalPhone.value = form.phone;
    editingPhone.value = false;
    ElMessage.success('手机号修改成功');
  } catch (error) {
    // 验证失败
  }
};

const cancelEditPhone = () => {
  form.phone = originalPhone.value;
  editingPhone.value = false;
};

const saveEmail = async () => {
  try {
    await formRef.value?.validateField('email');
    // 模拟保存
    await new Promise(resolve => setTimeout(resolve, 500));
    originalEmail.value = form.email;
    editingEmail.value = false;
    ElMessage.success('邮箱修改成功');
  } catch (error) {
    // 验证失败
  }
};

const cancelEditEmail = () => {
  form.email = originalEmail.value;
  editingEmail.value = false;
};

const submitForm = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    submitting.value = true;

    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    ElMessage.success('信息保存成功');
    
    // 清空密码字段
    form.currentPassword = '';
    form.newPassword = '';
    form.confirmPassword = '';
  } catch (error) {
    ElMessage.error('保存失败，请检查输入信息');
  } finally {
    submitting.value = false;
  }
};

const resetForm = () => {
  formRef.value?.resetFields();
  loadUserProfile();
  editingPhone.value = false;
  editingEmail.value = false;
};

// 生命周期
onMounted(() => {
  loadUserProfile();
});
</script>
