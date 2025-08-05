import { defineEventHandler, proxyRequest } from 'h3'

export default defineEventHandler(async (event) => {
  const url = event.node.req.url
  
  // 只处理特定的API路径
  if (url?.startsWith('/pod/')) {
    // 从运行时配置获取代理目标地址
    const config = useRuntimeConfig()
    const proxyTarget = config.public.apiProxyTarget || 'http://192.168.1.151:30882'
    
    const targetUrl = `${proxyTarget}${url}`
    console.log(`[代理] ${event.node.req.method} ${url} -> ${targetUrl}`)
    console.log(`[代理配置] proxyTarget: ${proxyTarget}`)
    
    try {
      // 代理到远程API服务器
      return await proxyRequest(event, targetUrl)
    } catch (error) {
      console.error(`[代理错误] ${url}:`, error)
      console.error(`[代理错误] 目标地址: ${targetUrl}`)
      throw error
    }
  }
}) 