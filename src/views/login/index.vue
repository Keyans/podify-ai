<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-900">登录</h2>
      <form class="space-y-6" @submit.prevent="login">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">用户名</label>
          <div class="mt-1">
            <input id="username" name="username" type="text" required v-model="username"
              class="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
          <div class="mt-1">
            <input id="password" name="password" type="password" required v-model="password"
              class="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>
        <div>
          <button type="submit"
            class="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            登录
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isAuthenticated } from '../../store/auth';

const username = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
  // Mock login logic - 只要有用户名和密码就允许登录
  if (username.value && password.value) {
    localStorage.setItem('user-token', 'mock-token');
    isAuthenticated.value = true;
    router.push('/dashboard');
  } else {
    // 可以在这里添加错误提示
    alert('请输入用户名和密码');
  }
};
</script>
