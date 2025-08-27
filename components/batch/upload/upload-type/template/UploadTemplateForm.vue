<template>
  <div class="template-upload-form">
    <!-- 文件上传 -->
    <div class="form-item">
      <div class="flex items-center justify-between mb-2">
        <label class="form-label mb-0">请选择本地模板文件</label>
        <a-dropdown placement="bottomRight">
          <template #overlay>
            <a-menu>
              <a-menu-item key="temu" @click="downloadTemplate('TEMU')">
                <download-outlined class="mr-2" />
                下载TEMU模板
              </a-menu-item>
              <a-menu-item key="amazon" @click="downloadTemplate('亚马逊')">
                <download-outlined class="mr-2" />
                下载亚马逊模板
              </a-menu-item>
              <a-menu-item key="tiktok" @click="downloadTemplate('TikTok')">
                <download-outlined class="mr-2" />
                下载TikTok模板
              </a-menu-item>
              <a-menu-item key="shein" @click="downloadTemplate('Shein')">
                <download-outlined class="mr-2" />
                下载Shein模板
              </a-menu-item>
              <a-menu-item key="ebay" @click="downloadTemplate('eBay')">
                <download-outlined class="mr-2" />
                下载eBay模板
              </a-menu-item>
            </a-menu>
          </template>
          <a-button type="text" size="small">
            <download-outlined class="mr-1" />
            下载模板
            <down-outlined class="ml-1" />
          </a-button>
        </a-dropdown>
      </div>
      
      <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :multiple="false"
        :showUploadList="false"
        :beforeUpload="beforeUpload"
        :onChange="handleFileChange"
        accept=".xlsx,.xls"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined />
        </p>
        <p class="ant-upload-text">选择模板文件</p>
        <p class="ant-upload-hint">
          支持拖拽上传，仅支持 Excel 格式文件
        </p>
      </a-upload-dragger>
      
      <!-- 显示已选择的文件 -->
      <div v-if="templateFileForm.file" class="selected-file">
        <div class="file-info">
          <file-excel-outlined style="color: #52c41a; margin-right: 8px" />
          <span>{{ templateFileForm.file.name }}</span>
          <span class="file-size">({{ (templateFileForm.file.size / 1024 / 1024).toFixed(2) }}MB)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
// @ts-ignore
import { InboxOutlined, FileExcelOutlined, DownloadOutlined, DownOutlined } from '@ant-design/icons-vue'
import type { TemplateDTO, PlatformFieldConfig } from '~/apis/business/publish'
import { parseExcelToJson } from '~/utils/excelUtils'

// Props
interface Props {
  platformFieldConfig?: PlatformFieldConfig[]
  commonForm?: {
    platform: string
    templateName: string
  }
  getPlatformId?: (platformName: string) => number
}

const props = withDefaults(defineProps<Props>(), {
  platformFieldConfig: () => [],
  commonForm: () => ({ platform: '', templateName: '' }),
  getPlatformId: () => () => 0
})

// 模版文件上传数据
const templateFileForm = reactive({
  file: null as File | null,
  parsedData: null as any
})

// 文件上传相关
const fileList = ref([])

// 下载模板文件
const downloadTemplate = async (platform: string) => {
  try {
    // 创建模板数据结构
    const templateData = getTemplateStructure(platform)
    
    // 动态导入 xlsx 库
    const XLSX = await import('xlsx')
    
    // 创建工作簿
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet([templateData])
    XLSX.utils.book_append_sheet(wb, ws, '模板')
    
    // 导出 Excel 文件
    XLSX.writeFile(wb, `${platform}_批量刊登模板.xlsx`)
    
    message.success(`${platform}模板下载成功！`)
  } catch (error) {
    console.error('下载模板失败:', error)
    message.error('下载模板失败，请重试')
  }
}

// 获取不同平台的模板结构
const getTemplateStructure = (platform: string): string[] => {
  const baseFields = ['商品标题', '商品描述', '价格', '库存', '分类', '品牌', '主图URL', '详情图URL']
  
  // 根据平台添加特定字段
  switch (platform) {
    case 'TEMU':
      return [...baseFields, 'TEMU类目ID', '运费模板', '商品重量']
    case '亚马逊':
      return [...baseFields, 'ASIN', 'UPC/EAN', 'FBA配送', '变体关系']
    case 'TikTok':
      return [...baseFields, 'TikTok分类', '视频URL', '标签']
    case 'Shein':
      return [...baseFields, 'Shein类目', '尺码表', '颜色', '材质']
    case 'eBay':
      return [...baseFields, 'eBay类目ID', '拍卖/一口价', '运费']
    default:
      return baseFields
  }
}

// 构造模版文件上传专用的DTO对象
const buildTemplateUploadDTO = (): TemplateDTO => {
  return {
    id: 0,
    name: props.commonForm?.templateName || templateFileForm.file!.name.replace(/\.[^/.]+$/, ''),
    platformId: props.getPlatformId?.(props.commonForm?.platform || '') || 0,
    storeId: 0,
    categoryId: 0,
    baseTemplateId: 0,
    platformFields: {
      key: {
        type: 'template_file',
        columns: templateFileForm.parsedData?.columns || [],
        totalRows: templateFileForm.parsedData?.totalRows || 0,
        fileName: templateFileForm.parsedData?.fileName || templateFileForm.file?.name,
        uploadMethod: 'template',
        platformFieldConfig: props.platformFieldConfig // 包含平台字段配置
      }
    },
    categoryFields: {
      key: {
        source: 'file',
        data: templateFileForm.parsedData?.rows?.slice(0, 5) || [],
        sheetName: templateFileForm.parsedData?.currentSheet || 'Sheet1',
        uploadMethod: 'template'
      }
    }
  }
}

// 文件上传处理函数
const beforeUpload = (file: File) => {
  // 验证文件类型
  const isValidType = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                     file.type === 'application/vnd.ms-excel' ||
                     file.name.endsWith('.xlsx') ||
                     file.name.endsWith('.xls')
  
  if (!isValidType) {
    message.error('只能上传 Excel 文件！')
    return false
  }
  
  // 验证文件大小 (10MB)
  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isLt10M) {
    message.error('文件大小不能超过 10MB！')
    return false
  }
  
  templateFileForm.file = file
  
  return false // 阻止自动上传
}

const handleFileChange = (info: any) => {
  const { fileList } = info
  // 只保留最新的一个文件
  if (fileList.length > 1) {
    fileList.splice(0, fileList.length - 1)
  }
}

// 获取DTO数据
const getDto = async (): Promise<TemplateDTO | null> => {
  if (!templateFileForm.file) {
    message.error('请选择模板文件')
    return null
  }
  
  // 解析Excel文件
  try {
    console.log('开始解析Excel文件:', templateFileForm.file.name)
    templateFileForm.parsedData = await parseExcelToJson(templateFileForm.file)
    console.log('Excel解析结果:', templateFileForm.parsedData)
  } catch (error) {
    console.error('Excel解析失败:', error)
    message.error('解析Excel文件失败，请检查文件格式')
    return null
  }
  
  return buildTemplateUploadDTO()
}

// 重置表单
const resetForm = () => {
  templateFileForm.file = null
  templateFileForm.parsedData = null
  fileList.value = []
}

// 暴露方法给父组件
defineExpose({
  getDto,
  resetForm
})
</script>

<style scoped>
.template-upload-form {
  padding: 16px 0;
}

.form-item {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-primary);
}

.selected-file {
  margin-top: 12px;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.file-info {
  display: flex;
  align-items: center;
}

.file-size {
  margin-left: 8px;
  color: var(--text-tertiary);
  font-size: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-item {
    margin-bottom: 12px;
  }
}
</style>