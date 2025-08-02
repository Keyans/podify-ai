<template>
  <div class="p-6 space-y-6 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">环境配置调试工具</h1>
      
      <!-- 当前环境信息 -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">当前环境信息</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-600">环境名称</label>
            <p class="text-lg">{{ currentEnv.name || '未知' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">NODE_ENV</label>  
            <p class="text-lg">{{ nodeEnv }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">NUXT_ENV</label>
            <p class="text-lg">{{ nuxtEnv || '未设置' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">客户端类型</label>
            <p class="text-lg">{{ currentEnv.clientType || '未知' }}</p>
          </div>
        </div>
      </div>

      <!-- API 配置信息 -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">API 配置</h2>
        <div class="space-y-3">
          <div>
            <label class="text-sm font-medium text-gray-600">API Base URL</label>
            <p class="text-lg font-mono bg-gray-100 p-2 rounded">{{ currentEnv.apiBaseUrl || '使用代理模式' }}</p>  
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">API Prefix</label>
            <p class="text-lg font-mono bg-gray-100 p-2 rounded">{{ currentEnv.apiPrefix || '未设置' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">代理目标</label>
            <p class="text-lg font-mono bg-gray-100 p-2 rounded">{{ currentEnv.apiProxyTarget || '未设置' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">后端API</label>
            <p class="text-lg font-mono bg-gray-100 p-2 rounded">{{ currentEnv.backendApi || '未设置' }}</p>
          </div>
        </div>
      </div>

      <!-- COS凭证测试 -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">COS凭证测试</h2>
        <div class="space-y-4">
          <div class="flex space-x-4">
            <button 
              @click="testCosCredentials"
              :disabled="testing"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {{ testing ? '测试中...' : '测试COS凭证获取' }}
            </button>
            <button 
              @click="checkCredentialsStatus"
              :disabled="testing"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {{ testing ? '检查中...' : '检查凭证状态' }}
            </button>
            <button 
              @click="testCorsConfiguration"
              :disabled="testing"
              class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {{ testing ? '测试中...' : '测试CORS配置' }}
            </button>
            <button 
              @click="clearResults"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              清空结果
            </button>
          </div>
          
          <!-- 测试结果 -->
          <div v-if="testResult" class="space-y-3">
            <div>
              <label class="text-sm font-medium text-gray-600">请求URL</label>
              <p class="text-sm font-mono bg-gray-100 p-2 rounded">{{ testResult.requestUrl }}</p>
            </div>
            
            <div>
              <label class="text-sm font-medium text-gray-600">响应状态</label>
              <p class="text-lg" :class="testResult.success ? 'text-green-600' : 'text-red-600'">
                {{ testResult.success ? '✅ 成功' : '❌ 失败' }}
              </p>
            </div>
            
            <div v-if="testResult.success && testResult.data">
              <label class="text-sm font-medium text-gray-600">COS配置详情</label>
              <div class="bg-gray-100 p-3 rounded text-sm font-mono space-y-1">
                <div><strong>Bucket:</strong> {{ testResult.data.bucketName }}</div>
                <div><strong>Region:</strong> {{ testResult.data.region }}</div>  
                <div><strong>PathPrefix:</strong> {{ testResult.data.pathPrefix }}</div>
                <div><strong>ExpiredTime:</strong> {{ testResult.data.expiredTime }}</div>
                <div><strong>StartTime:</strong> {{ testResult.data.startTime }}</div>
                <div><strong>TmpSecretId:</strong> {{ testResult.data.tmpSecretId?.substring(0, 20) }}...</div>
                <div><strong>SessionToken:</strong> {{ testResult.data.sessionToken?.substring(0, 30) }}...</div>
              </div>
            </div>
            
            <div v-if="corsTestResult">
              <label class="text-sm font-medium text-gray-600">CORS测试结果</label>
              
              <!-- COS基本信息 -->
              <div v-if="corsTestResult.testUrl" class="mb-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                <div class="font-medium text-blue-800 mb-2">📍 测试目标信息</div>
                <div><strong>COS域名:</strong> {{ corsTestResult.testUrl }}</div>
                <div><strong>存储桶:</strong> {{ corsTestResult.bucket }}</div>
                <div><strong>地域:</strong> {{ corsTestResult.region }}</div>
                <div><strong>当前域名:</strong> {{ corsTestResult.origin }}</div>
              </div>

              <!-- 网络连通性测试 -->
              <div v-if="corsTestResult.CONNECTIVITY" class="mb-3 p-3 rounded text-sm" :class="corsTestResult.CONNECTIVITY.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
                <div class="font-medium mb-2" :class="corsTestResult.CONNECTIVITY.success ? 'text-green-800' : 'text-red-800'">
                  🌐 网络连通性: {{ corsTestResult.CONNECTIVITY.success ? '✅ 正常' : '❌ 异常' }}
                </div>
                <div>{{ corsTestResult.CONNECTIVITY.message }}</div>
                <div v-if="corsTestResult.CONNECTIVITY.error" class="text-red-600 text-xs mt-1">
                  错误: {{ corsTestResult.CONNECTIVITY.error }}
                </div>
              </div>

              <!-- CORS预检测试 -->
              <div v-if="corsTestResult.OPTIONS" class="p-3 rounded text-sm" :class="corsTestResult.OPTIONS.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
                <div class="font-medium mb-2" :class="corsTestResult.OPTIONS.success ? 'text-green-800' : 'text-red-800'">
                  🔒 CORS预检请求: {{ corsTestResult.OPTIONS.success ? '✅ 成功' : '❌ 失败' }}
                </div>
                
                <!-- 成功时显示CORS头信息 -->
                <div v-if="corsTestResult.OPTIONS.success" class="space-y-1">
                  <div><strong>状态:</strong> {{ corsTestResult.OPTIONS.status }} {{ corsTestResult.OPTIONS.statusText }}</div>
                  <div v-if="corsTestResult.OPTIONS.corsHeaders">
                    <strong>CORS配置:</strong>
                    <div class="ml-4 text-xs">
                      <div>• 允许来源: {{ corsTestResult.OPTIONS.corsHeaders.allowOrigin || '未设置' }}</div>
                      <div>• 允许方法: {{ corsTestResult.OPTIONS.corsHeaders.allowMethods || '未设置' }}</div>
                      <div>• 允许头部: {{ corsTestResult.OPTIONS.corsHeaders.allowHeaders || '未设置' }}</div>
                    </div>
                  </div>
                  <div v-if="corsTestResult.OPTIONS.analysis" class="mt-2 p-2 bg-white rounded border">
                    <div class="text-xs font-medium">📋 分析结果:</div>
                    <div class="text-xs">{{ corsTestResult.OPTIONS.analysis.recommendation }}</div>
                  </div>
                </div>

                <!-- 失败时显示错误信息和建议 -->
                <div v-else class="space-y-2">
                  <div class="text-red-600">
                    <strong>错误:</strong> {{ corsTestResult.OPTIONS.error }}
                  </div>
                  <div v-if="corsTestResult.OPTIONS.analysis" class="space-y-1">
                    <div class="p-2 bg-white rounded border">
                      <div class="text-xs font-medium text-red-700">🔍 问题诊断:</div>
                      <div class="text-xs">{{ corsTestResult.OPTIONS.analysis.diagnosis }}</div>
                    </div>
                                         <div class="p-2 bg-white rounded border">
                       <div class="text-xs font-medium text-blue-700">💡 解决建议:</div>
                       <pre class="text-xs whitespace-pre-wrap">{{ corsTestResult.OPTIONS.analysis.recommendation }}</pre>
                     </div>
                     
                     <!-- 快速复制配置 -->
                     <div class="p-2 bg-yellow-50 border border-yellow-200 rounded">
                       <div class="text-xs font-medium text-yellow-700 mb-2">⚡ 快速配置</div>
                       <div class="flex flex-col gap-2">
                         <div class="flex items-center gap-2">
                           <span class="text-xs">开发环境配置:</span>
                           <button 
                             @click="copyToClipboard('dev-cors')" 
                             class="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                           >
                             复制配置
                           </button>
                         </div>
                         <div class="flex items-center gap-2">
                           <span class="text-xs">临时测试配置:</span>
                           <button 
                             @click="copyToClipboard('temp-cors')" 
                             class="px-2 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600"
                           >
                             复制配置
                           </button>
                         </div>
                         <div class="text-xs text-gray-600">
                           复制后粘贴到腾讯云COS控制台的CORS规则中
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               
               <!-- 配置指南链接 -->
               <div class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                 <div class="font-medium text-blue-800 mb-1">📚 完整配置指南</div>
                 <div class="text-blue-600 text-xs">
                   查看详细的CORS配置步骤: 
                   <a href="/docs/CORS-CONFIG-GUIDE.md" target="_blank" class="underline hover:text-blue-800">
                     CORS配置指南
                   </a>
                 </div>
               </div>
             </div>
            
            <div v-if="testResult.error">
              <label class="text-sm font-medium text-gray-600">错误信息</label>
              <p class="text-sm text-red-600 bg-red-50 p-3 rounded">{{ testResult.error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 上传测试 -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">上传功能测试</h2>
        <div class="space-y-4">
          <div>
            <input 
              type="file" 
              accept="image/*" 
              @change="handleFileSelect"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            >
          </div>
          
          <div v-if="selectedFile" class="flex space-x-3">
            <button 
              @click="testUpload"
              :disabled="uploading"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {{ uploading ? '上传中...' : '使用工具类上传' }}
            </button>
            
            <button 
              @click="testDirectUpload"
              :disabled="uploading"
              class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
            >
              {{ uploading ? '上传中...' : '直接COS上传' }}
            </button>
            
            <button 
              @click="testWithCorsHeaders"
              :disabled="uploading"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {{ uploading ? '上传中...' : '带CORS头上传' }}
            </button>
          </div>
          
          <div v-if="uploadResult" class="space-y-3">
            <div>
              <label class="text-sm font-medium text-gray-600">上传状态</label>
              <p class="text-lg" :class="uploadResult.success ? 'text-green-600' : 'text-red-600'">
                {{ uploadResult.success ? '✅ 上传成功' : '❌ 上传失败' }}
              </p>
            </div>
            
            <div v-if="uploadResult.method">
              <label class="text-sm font-medium text-gray-600">测试方法</label>
              <p class="text-sm">{{ uploadResult.method }}</p>
            </div>
            
            <div v-if="uploadResult.success">
              <label class="text-sm font-medium text-gray-600">文件URL</label>
              <p class="text-sm font-mono bg-gray-100 p-2 rounded break-all">{{ uploadResult.url }}</p>
            </div>
            
            <div v-if="uploadResult.error">
              <label class="text-sm font-medium text-gray-600">错误详情</label>
              <div class="text-sm text-red-600 bg-red-50 p-3 rounded space-y-1">
                <div><strong>错误类型:</strong> {{ uploadResult.error?.name || typeof uploadResult.error }}</div>
                <div><strong>错误消息:</strong> {{ uploadResult.error?.message || uploadResult.error }}</div>
                <div v-if="uploadResult.error?.code"><strong>错误码:</strong> {{ uploadResult.error.code }}</div>
                <div v-if="uploadResult.error?.statusCode"><strong>状态码:</strong> {{ uploadResult.error.statusCode }}</div>
                <div v-if="uploadResult.error?.headers"><strong>响应头:</strong> {{ JSON.stringify(uploadResult.error.headers, null, 2) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getEnvironmentConfig, getCurrentEnvironment } from '~/config/environments'
import { buildApiPath } from '~/apis/apiConfig'
import { getTencentCosCredentials } from '~/apis/business/oss'
import tencentCOS from '~/utils/tencentCOS'

// 响应式数据
const currentEnv = ref({})
const nuxtEnv = ref('')
const nodeEnv = ref('')
const testing = ref(false)
const testResult = ref(null)
const corsTestResult = ref(null)
const selectedFile = ref(null)
const uploading = ref(false)
const uploadResult = ref(null)

// 获取当前环境配置
onMounted(() => {
  try {
    currentEnv.value = getEnvironmentConfig() || {}
    nuxtEnv.value = getCurrentEnvironment() || '未设置'
    
    // 安全地获取环境变量
    nodeEnv.value = process?.env?.NODE_ENV || '未知'
    
    console.log('当前环境配置:', currentEnv.value)
    console.log('Process env:', {
      NODE_ENV: nodeEnv.value,
      NUXT_ENV: nuxtEnv.value
    })
  } catch (error) {
    console.error('初始化环境配置失败:', error)
    currentEnv.value = {}
    nuxtEnv.value = '错误'
    nodeEnv.value = '错误'
  }
})

// 测试COS凭证获取
const testCosCredentials = async () => {
  testing.value = true
  testResult.value = null
  
  try {
    const requestUrl = '/pod/business/oss/tencent/key/temporary'
    console.log('请求COS凭证URL:', requestUrl)
    
    const response = await getTencentCosCredentials()
    
    testResult.value = {
      success: response.success,
      requestUrl: requestUrl,
      data: response.success ? response.data : null,
      error: response.success ? null : response.message
    }
    
    console.log('COS凭证响应:', response)
    
  } catch (error) {
    console.error('COS凭证测试失败:', error)
    testResult.value = {
      success: false,
      requestUrl: '/pod/business/oss/tencent/key/temporary',
      data: null,
      error: error.message
    }
  } finally {
    testing.value = false
  }
}

  // 测试CORS配置
  const testCorsConfiguration = async () => {
    testing.value = true
    corsTestResult.value = null
  
    try {
      console.log('开始CORS配置测试...')
  
      const response = await tencentCOS.testCorsConfiguration()
  
      corsTestResult.value = response
      console.log('CORS配置响应:', response)
  
    } catch (error) {
      console.error('CORS配置测试失败:', error)
      corsTestResult.value = {
        OPTIONS: {
          success: false,
          error: error.message
        }
      }
    } finally {
      testing.value = false
    }
  }

  // 检查凭证状态  
  const checkCredentialsStatus = async () => {
    testing.value = true
    testResult.value = null

    try {
      console.log('开始检查COS凭证状态...')
      const status = await tencentCOS.checkCredentialsStatus()
      
      testResult.value = {
        requestUrl: 'COS凭证状态检查',
        success: status.hasValidCredentials && !status.error,
        data: status.hasValidCredentials ? {
          hasCredentials: status.hasCredentials,
          hasValidCredentials: status.hasValidCredentials,
          expireTime: status.expireTime,
          needRefresh: status.needRefresh,
          status: status.error ? '❌ 凭证获取失败' : '✅ 凭证状态正常'
        } : null,
        error: status.error ? `凭证错误: ${status.error.message}` : null,
        statusDetails: status
      }
      
      console.log('COS凭证状态检查完成:', status)
      
    } catch (error) {
      console.error('COS凭证状态检查失败:', error)
      testResult.value = {
        requestUrl: 'COS凭证状态检查',
        success: false,
        error: error.message || error.toString()
      }
    } finally {
      testing.value = false
    }
  }

  // 清空测试结果
  const clearResults = () => {
    testResult.value = null
    uploadResult.value = null
    selectedFile.value = null
    corsTestResult.value = null
  }

  // 复制配置到剪贴板
  const copyToClipboard = async (type) => {
    let config = '';
    const origin = window.location.origin;
    
    if (type === 'dev-cors') {
      config = `来源 Origin: ${origin}
方法 Method: GET,PUT,POST,DELETE,HEAD,OPTIONS
允许的Header: *
暴露的Header: ETag,x-cos-version-id
超时 Max-Age: 3600`;
    } else if (type === 'temp-cors') {
      config = `来源 Origin: *
方法 Method: *
允许的Header: *
暴露的Header: *
超时 Max-Age: 3600`;
    }
    
    try {
      await navigator.clipboard.writeText(config);
      // 简单的成功提示
      const button = event.target;
      const originalText = button.textContent;
      button.textContent = '已复制!';
      button.classList.add('bg-green-500');
      button.classList.remove('bg-blue-500', 'bg-orange-500');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-500');
        if (type === 'dev-cors') {
          button.classList.add('bg-blue-500');
        } else {
          button.classList.add('bg-orange-500');
        }
      }, 2000);
      
      console.log('✅ CORS配置已复制到剪贴板');
    } catch (error) {
      console.error('❌ 复制失败:', error);
      alert('复制失败，请手动复制配置信息');
    }
  }

// 处理文件选择
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    uploadResult.value = null
  }
}

// 测试上传
const testUpload = async () => {
  if (!selectedFile.value) return
  
  uploading.value = true
  uploadResult.value = null
  
  try {
    console.log('开始测试上传:', selectedFile.value.name)
    
    const result = await tencentCOS.uploadFile(selectedFile.value, {
      galleryType: 'application',
      onProgress: (progress) => {
        console.log(`上传进度: ${progress.percent}%`)
      }
    })
    
    uploadResult.value = {
      success: true,
      url: result.url,
      key: result.key,
      error: null,
      method: '工具类上传'
    }
    
    console.log('上传测试成功:', result)
    
  } catch (error) {
    console.error('上传测试失败:', error)
    uploadResult.value = {
      success: false,
      url: null,
      key: null,
      error: {
        name: error.name || 'Error',
        message: error.message || error.toString(),
        code: error.code || null,
        statusCode: error.statusCode || null,
        headers: error.headers || null
      },
      method: '工具类上传'
    }
  } finally {
    uploading.value = false
  }
}

// 测试直接COS上传
const testDirectUpload = async () => {
  if (!selectedFile.value) return

  uploading.value = true
  uploadResult.value = null

  try {
    console.log('开始测试直接COS上传:', selectedFile.value.name)

    const result = await tencentCOS.directUpload(selectedFile.value, {
      galleryType: 'application',
      onProgress: (progress) => {
        console.log(`上传进度: ${progress.percent}%`)
      }
    })

    uploadResult.value = {
      success: true,
      url: result.url,
      key: result.key,
      error: null,
      method: '直接COS上传'
    }

    console.log('直接COS上传成功:', result)

  } catch (error) {
    console.error('直接COS上传失败:', error)
    uploadResult.value = {
      success: false,
      url: null,
      key: null,
      error: {
        name: error.name || 'Error',
        message: error.message || error.toString(),
        code: error.code || null,
        statusCode: error.statusCode || null,
        headers: error.headers || null
      },
      method: '直接COS上传'
    }
  } finally {
    uploading.value = false
  }
}

// 测试带CORS头上传
const testWithCorsHeaders = async () => {
  if (!selectedFile.value) return

  uploading.value = true
  uploadResult.value = null

  try {
    console.log('开始测试带CORS头上传:', selectedFile.value.name)

    const result = await tencentCOS.uploadWithCorsHeaders(selectedFile.value, {
      galleryType: 'application',
      onProgress: (progress) => {
        console.log(`上传进度: ${progress.percent}%`)
      }
    })

    uploadResult.value = {
      success: true,
      url: result.url,
      key: result.key,
      error: null,
      method: '带CORS头上传'
    }

    console.log('带CORS头上传成功:', result)

  } catch (error) {
    console.error('带CORS头上传失败:', error)
    uploadResult.value = {
      success: false,
      url: null,
      key: null,
      error: {
        name: error.name || 'Error',
        message: error.message || error.toString(),
        code: error.code || null,
        statusCode: error.statusCode || null,
        headers: error.headers || null
      },
      method: '带CORS头上传'
    }
  } finally {
    uploading.value = false
  }
}
</script> 