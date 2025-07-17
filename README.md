# 灵图AI - Nuxt3版本

这是将原Vue3项目改造为Nuxt3的版本，主要为了支持SSR和更好的SEO优化。

## 🚀 项目特性

- **Nuxt3** - 现代化的全栈Vue框架
- **TypeScript** - 类型安全的开发体验
- **Tailwind CSS** - 实用优先的CSS框架
- **Element Plus** - 企业级UI组件库
- **Pinia** - Vue3状态管理
- **SEO优化** - 服务端渲染，更好的搜索引擎收录
- **响应式设计** - 适配桌面端和移动端

## 📦 安装和运行

### 1. 安装依赖

```bash
# 删除旧的node_modules和lock文件
rm -rf node_modules package-lock.json

# 安装新的依赖
npm install
```

### 2. 开发环境运行

```bash
# 启动开发服务器
npm run dev

# 服务器将在 http://localhost:3000 启动
```

### 3. 生产环境构建

```bash
# 构建应用
npm run build

# 生成静态文件（可选）
npm run generate

# 预览构建结果
npm run preview
```

## 🏗️ 项目结构变化

从Vue3项目迁移到Nuxt3的主要变化：

### 目录结构对比

```
Vue3 项目                    Nuxt3 项目
src/                        ./
├── components/            ├── components/
├── views/                 ├── pages/
├── router/                ├── layouts/
├── store/                 ├── stores/
├── assets/                ├── assets/
├── main.ts                ├── plugins/
├── App.vue                ├── nuxt.config.ts
└── style.css              └── assets/css/main.css
```

### 主要变化

1. **路由系统**：从Vue Router迁移到Nuxt3的文件系统路由
2. **状态管理**：保持Pinia，但使用Nuxt3的自动导入
3. **布局系统**：使用Nuxt3的layouts系统
4. **SEO优化**：使用useSeoMeta等内置composables
5. **插件系统**：Element Plus等插件迁移到plugins目录

## 🎨 新增功能

### 1. 首页设计
- 全新的现代化首页设计
- 动态装饰元素和交互效果
- 响应式布局，适配各种设备

### 2. SEO优化
- 服务端渲染支持
- 自动生成meta标签
- 更好的搜索引擎收录

### 3. 性能优化
- 自动代码分割
- 组件懒加载
- 图片优化

## 🔧 配置说明

### Nuxt配置 (nuxt.config.ts)

主要配置项：
- **modules**: Tailwind CSS, Pinia, Nuxt UI
- **css**: Element Plus样式和自定义样式
- **build**: Element Plus构建优化
- **app**: SEO和meta信息配置

### 样式配置

- **主样式文件**: `assets/css/main.css`
- **Tailwind配置**: `tailwind.config.js`
- **Element Plus主题**: 在CSS中自定义CSS变量

## 📱 页面说明

### 首页 (`pages/index.vue`)
- 英雄区块：主要宣传内容和CTA
- 特性介绍：三个核心功能展示
- 产品展示：工具卡片网格
- 行动召唤：引导用户注册登录

### 登录页 (`pages/login.vue`)
- 现代化登录表单
- 表单验证
- 第三方登录选项
- 响应式设计

### 布局系统 (`layouts/default.vue`)
- 响应式导航栏
- 用户状态管理
- 主题切换功能
- 统一页脚

## 🔌 状态管理

### 认证状态 (`stores/auth.ts`)
- 用户登录/登出
- 用户信息管理
- 本地存储持久化

### 主题状态 (`stores/theme.ts`)
- 明暗主题切换
- 系统主题检测
- 本地存储持久化

## 🚢 部署

### Vercel部署（推荐）

```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel
```

### Netlify部署

```bash
# 构建命令
npm run build

# 输出目录
.output/public
```

### Docker部署

```bash
# 构建Docker镜像
docker build -t lingtu-ai .

# 运行容器
docker run -p 3000:3000 lingtu-ai
```

## 🛠️ 开发指南

### 添加新页面

在`pages/`目录下创建Vue文件即可自动生成路由：

```bash
pages/
├── index.vue           # /
├── login.vue          # /login
├── about.vue          # /about
└── users/
    ├── index.vue      # /users
    └── [id].vue       # /users/:id
```

### 添加新组件

在`components/`目录下创建组件，Nuxt3会自动导入：

```vue
<!-- components/MyComponent.vue -->
<template>
  <div>我的组件</div>
</template>

<!-- 在页面中直接使用，无需导入 -->
<template>
  <MyComponent />
</template>
```

### 使用Composables

Nuxt3提供了丰富的内置composables：

```typescript
// SEO优化
useSeoMeta({
  title: '页面标题',
  description: '页面描述'
})

// 路由导航
await navigateTo('/dashboard')

// 数据获取
const { data } = await $fetch('/api/users')
```

## 📋 待办事项

- [ ] 完成所有页面的迁移
- [ ] 实现API接口
- [ ] 添加单元测试
- [ ] 性能优化
- [ ] 国际化支持

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目！

## �� 许可证

MIT License 