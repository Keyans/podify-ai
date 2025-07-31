import { defineEventHandler, proxyRequest } from 'h3'

export default defineEventHandler(async (event) => {
  const url = event.node.req.url
  
  // 只处理特定的API路径
  if (url?.startsWith('/pod/')) {
    const targetUrl = `http://192.168.1.151:30882${url}`
    console.log(`[代理] ${event.node.req.method} ${url} -> ${targetUrl}`)
    
    try {
      // 代理到远程API服务器
      return await proxyRequest(event, targetUrl)
    } catch (error) {
      console.error(`[代理错误] ${url}:`, error)
      throw error
    }
  }
}) 