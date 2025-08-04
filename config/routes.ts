// 路由认证配置
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
    '/test-cropper',
    '/test-task-list',
    '/test-upload-ui',
    '/debug-env'
  ],
  
  // 已登录用户不应该访问的路由（如登录页）
  guestOnlyRoutes: [
    '/login',
    '/register'
  ],
  
  // 默认重定向
  defaultRedirect: {
    // 未登录用户的默认重定向页面
    unauthenticated: '/login',
    // 已登录用户访问guest-only页面时的重定向
    authenticated: '/dashboard'
  }
}

// 检查路由是否需要认证
export const isProtectedRoute = (path: string): boolean => {
  return routeConfig.protectedRoutes.some(route => path.startsWith(route))
}

// 检查路由是否是公开的
export const isPublicRoute = (path: string): boolean => {
  return routeConfig.publicRoutes.some(route => {
    if (route === '/') {
      return path === '/'
    }
    return path.startsWith(route)
  })
}

// 检查路由是否只允许游客访问
export const isGuestOnlyRoute = (path: string): boolean => {
  return routeConfig.guestOnlyRoutes.some(route => {
    if (route === '/') {
      return path === '/'
    }
    return path.startsWith(route)
  })
} 