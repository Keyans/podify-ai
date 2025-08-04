import { isLoggedIn } from '~/apis/auth'
import { isProtectedRoute, isPublicRoute, isGuestOnlyRoute, routeConfig } from '~/config/routes'

export default defineNuxtRouteMiddleware((to, from) => {
  // 只在客户端执行
  if (process.client) {
    const loggedIn = isLoggedIn()
    const targetPath = to.path
    
    console.log('路由认证检查:', {
      path: targetPath,
      loggedIn,
      isProtected: isProtectedRoute(targetPath),
      isPublic: isPublicRoute(targetPath),
      isGuestOnly: isGuestOnlyRoute(targetPath)
    })
    
    // 情况1: 访问受保护的路由但未登录
    if (isProtectedRoute(targetPath) && !loggedIn) {
      console.log('访问受保护路由但未登录，重定向到登录页面')
      return navigateTo(routeConfig.defaultRedirect.unauthenticated)
    }
    
    // 情况2: 已登录用户访问只允许游客的路由（如登录页）
    if (isGuestOnlyRoute(targetPath) && loggedIn) {
      console.log('已登录用户访问登录页，重定向到控制台')
      return navigateTo(routeConfig.defaultRedirect.authenticated)
    }
    
    // 情况3: 公开路由，任何人都可以访问
    if (isPublicRoute(targetPath)) {
      // 但如果是guest-only路由且用户已登录，仍然重定向
      if (isGuestOnlyRoute(targetPath) && loggedIn) {
        console.log('已登录用户访问guest-only路由，重定向到控制台')
        return navigateTo(routeConfig.defaultRedirect.authenticated)
      }
      console.log('访问公开路由，允许通过')
      return
    }
    
    // 情况4: 其他未明确配置的路由，根据是否登录决定
    if (!loggedIn) {
      console.log('访问未配置路由但未登录，重定向到登录页面')
      return navigateTo(routeConfig.defaultRedirect.unauthenticated)
    }
    
    console.log('路由认证检查通过')
  }
}) 