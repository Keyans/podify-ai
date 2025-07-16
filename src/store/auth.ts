
import { ref } from 'vue';

// 检查 localStorage 中是否有 token 来初始化认证状态
const token = localStorage.getItem('user-token');
export const isAuthenticated = ref(!!token);
