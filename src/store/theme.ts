import { ref, watch } from 'vue';

// 主题类型
export type Theme = 'light' | 'dark' | 'auto';

// 获取系统主题偏好
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// 从localStorage获取保存的主题
const getSavedTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme') as Theme;
    if (saved && ['light', 'dark', 'auto'].includes(saved)) {
      return saved;
    }
  }
  return 'auto';
};

// 主题状态
export const currentTheme = ref<Theme>(getSavedTheme());
export const isDark = ref<boolean>(false);

// 计算实际主题
const computeActualTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme === 'auto') {
    return getSystemTheme();
  }
  return theme;
};

// 应用主题到DOM
const applyTheme = (theme: 'light' | 'dark') => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      isDark.value = true;
    } else {
      root.classList.remove('dark');
      isDark.value = false;
    }
  }
};

// 设置主题
export const setTheme = (theme: Theme) => {
  currentTheme.value = theme;
  localStorage.setItem('theme', theme);
  
  const actualTheme = computeActualTheme(theme);
  applyTheme(actualTheme);
};

// 切换主题
export const toggleTheme = () => {
  const newTheme = isDark.value ? 'light' : 'dark';
  setTheme(newTheme);
};

// 监听主题变化
watch(currentTheme, (newTheme) => {
  const actualTheme = computeActualTheme(newTheme);
  applyTheme(actualTheme);
}, { immediate: true });

// 监听系统主题变化
if (typeof window !== 'undefined' && window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    if (currentTheme.value === 'auto') {
      const actualTheme = computeActualTheme('auto');
      applyTheme(actualTheme);
    }
  });
}

// 初始化主题
export const initTheme = () => {
  const actualTheme = computeActualTheme(currentTheme.value);
  applyTheme(actualTheme);
};

// 主题配置
export const themeConfig = {
  light: {
    name: '亮色模式',
    icon: '☀️'
  },
  dark: {
    name: '暗黑模式', 
    icon: '🌙'
  },
  auto: {
    name: '跟随系统',
    icon: '🔄'
  }
};

// 获取当前主题配置
export const getCurrentThemeConfig = () => {
  return themeConfig[currentTheme.value];
};
