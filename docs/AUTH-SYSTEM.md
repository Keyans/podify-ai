# 认证系统说明

本项目实现了一个灵活的路由认证保护系统，支持精确配置哪些页面需要登录验证，哪些页面可以公开访问。

## 🔧 配置文件

### `config/routes.ts`

这是认证系统的核心配置文件，定义了所有路由的访问规则：

```typescript
export const routeConfig = {
  // 需要认证的路由前缀
  protectedRoutes: [
    '/dashboard'
  ],
  
  // 公开路由（不需要认证）
  publicRoutes: [
    '/',
    '/login',
    '/register',
    '/test-api',
    '/test-env',
    // ... 其他测试页面
  ],
  
  // 已登录用户不应该访问的路由
  guestOnlyRoutes: [
    '/login',
    '/register'
  ],
  
  // 默认重定向配置
  defaultRedirect: {
    unauthenticated: '/login',    // 未登录用户重定向
    authenticated: '/dashboard'    // 已登录用户重定向
  }
}
```

## 🛡️ 认证逻辑

### 路由保护规则

1. **受保护路由** (`protectedRoutes`)
   - 需要用户登录才能访问
   - 未登录用户会被重定向到登录页

2. **公开路由** (`publicRoutes`)
   - 任何人都可以访问
   - 不需要登录验证

3. **游客专用路由** (`guestOnlyRoutes`)
   - 只有未登录用户可以访问
   - 已登录用户会被重定向到dashboard

## 📝 使用示例

### 添加新的受保护路由

如果你要创建一个新的需要登录的模块，比如 `/admin`：

```typescript
// 在 config/routes.ts 中添加
protectedRoutes: [
  '/dashboard',
  '/admin'  // 新增
]
```

### 添加新的公开路由

如果你要创建一个公开访问的页面，比如 `/about`：

```typescript
// 在 config/routes.ts 中添加
publicRoutes: [
  '/',
  '/login',
  '/register',
  '/about'  // 新增
]
```

### 添加新的游客专用路由

如果你要创建一个只有未登录用户可以访问的页面，比如 `/forgot-password`：

```typescript
// 在 config/routes.ts 中添加
guestOnlyRoutes: [
  '/login',
  '/register',
  '/forgot-password'  // 新增
]
```

## 🔄 认证检查流程

1. 用户访问任何路由时，全局中间件 `middleware/auth.global.ts` 会自动执行
2. 检查目标路由的类型（受保护/公开/游客专用）
3. 检查用户的登录状态
4. 根据规则决定是否允许访问或进行重定向

## 🎯 实际场景

### 场景1: 访问首页
- 路由: `/`
- 配置: `publicRoutes`
- 结果: ✅ 任何人都可以访问

### 场景2: 未登录访问Dashboard
- 路由: `/dashboard`
- 配置: `protectedRoutes`
- 用户状态: 未登录
- 结果: ❌ 重定向到 `/login`

### 场景3: 已登录访问登录页
- 路由: `/login`
- 配置: `guestOnlyRoutes`
- 用户状态: 已登录
- 结果: ❌ 重定向到 `/dashboard`

### 场景4: 已登录访问Dashboard
- 路由: `/dashboard`
- 配置: `protectedRoutes`
- 用户状态: 已登录
- 结果: ✅ 正常访问

## 🔍 调试

中间件会在控制台输出详细的认证检查信息：

```javascript
路由认证检查: {
  path: "/dashboard/store",
  loggedIn: false,
  isProtected: true,
  isPublic: false,
  isGuestOnly: false
}
访问受保护路由但未登录，重定向到登录页面
```

## 🚀 高级配置

### 自定义重定向页面

```typescript
defaultRedirect: {
  unauthenticated: '/custom-login',  // 自定义登录页
  authenticated: '/custom-dashboard' // 自定义首页
}
```

### 路径匹配规则

- 使用 `startsWith` 进行前缀匹配
- `/dashboard` 会匹配 `/dashboard/store`、`/dashboard/apps/collection` 等所有子路径
- 根路径 `/` 只精确匹配，不包含子路径

## 💡 最佳实践

1. **明确分类**: 将所有路由明确归类到三种类型之一
2. **最小权限**: 默认要求认证，只有明确标记的路由才公开
3. **用户体验**: 已登录用户访问登录页时自动重定向，避免困惑
4. **安全优先**: 未明确配置的路由默认需要认证

## 🛠️ 维护指南

当添加新页面时，请确保：

1. 在 `config/routes.ts` 中添加适当的路由配置
2. 测试不同登录状态下的访问行为
3. 更新此文档的示例（如有需要） 