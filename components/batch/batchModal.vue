<template>
  <a-modal
    v-model:open="internalVisible"
    title="刊登模板管理"
    :width="1200"
    :footer="null"
    centered
    :maskClosable="false"
    class="template-modal"
  >
    <div class="template-management-content">      
      <!-- 搜索区域 -->
      <a-card class="mb-4">
        <PageSearch
          v-model="searchParams"
          :fields="searchFields"
          @search="onSearch"
          @reset="onReset"
        >
          <template #prefix>
            <div class="flex items-center space-x-4">
              <a-button type="primary" @click="handleCreateTemplate">上传模板</a-button>
            </div>
          </template>
        </PageSearch>
      </a-card>
      
      <!-- 表格区域 -->
      <a-card>
        <PageTable
          :columns="tableColumns"
          :data-source="tableData"
          row-key="templateId"
          :loading="tableLoading"
          :pagination="{ total: Number(pagination.total), pageSize: Number(pagination.limit), current: Number(pagination.page) }"
          :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'platform'">
              <a-tag :color="getPlatformColor(record.platform)">{{ record.platform }}</a-tag>
            </template>
            <template v-if="column.key === 'status'">
              <a-tag :color="record.status === '启用' ? 'green' : 'default'">{{ record.status }}</a-tag>
            </template>
            <template v-if="column.key === 'action'">
              <a-space>
                <a-button type="link" size="small" @click="handlePreview(record)">预览</a-button>
                <a-button type="link" size="small" @click="handleEdit(record)">编辑</a-button>
                <a-popconfirm
                  title="确定要删除这个模板吗？"
                  @confirm="handleDelete(record)"
                  ok-text="确定"
                  cancel-text="取消"
                >
                  <a-button type="link" size="small" danger>删除</a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </template>
        </PageTable>
      </a-card>
    </div>
  </a-modal>

  <!-- 上传模板弹窗 -->
  <a-modal
    v-model:open="uploadModalVisible"
    title="上传模板文件"
    :width="600"
    :footer="null"
    centered
    :maskClosable="false"
  >
    <div class="upload-form">
      <!-- 平台选择 -->
      <div class="form-item">
        <label class="form-label">请选择模板平台</label>
        <a-select
          v-model:value="uploadForm.platform"
          placeholder="请选择平台"
          style="width: 100%"
        >
          <a-select-option value="amazon">亚马逊</a-select-option>
          <a-select-option value="ebay">eBay</a-select-option>
          <a-select-option value="shopify">Shopify</a-select-option>
        </a-select>
      </div>

      <!-- 模板名称 -->
      <div class="form-item">
        <label class="form-label">模板名称</label>
        <a-input
          v-model:value="uploadForm.templateName"
          placeholder="请输入名称（选填，不填写自动使用文件名）"
        />
      </div>

      <!-- 文件上传 -->
      <div class="form-item">
        <label class="form-label">请选择本地模板文件</label>
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
        <div v-if="uploadForm.file" class="selected-file">
          <div class="file-info">
            <file-excel-outlined style="color: #52c41a; margin-right: 8px" />
            <span>{{ uploadForm.file.name }}</span>
            <span class="file-size">({{ (uploadForm.file.size / 1024 / 1024).toFixed(2) }}MB)</span>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="form-actions">
        <a-button @click="handleCancelUpload">取消</a-button>
        <a-button 
          type="primary" 
          :loading="uploading"
          @click="handleConfirmUpload"
        >
          确定上传
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { message } from 'ant-design-vue'
import { InboxOutlined, FileExcelOutlined } from '@ant-design/icons-vue'
import PageSearch from '~/components/common/pageSearch.vue'
import PageTable from '~/components/common/pageTable.vue'
import { getTemplatePageList, createTemplate, type TemplatePageListParams, type TemplateDTO } from '~/apis/business/publish'
import { parseExcelToJson } from '~/utils/excelUtils'

// Props
interface Props {
  open?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: false
})

// Emits
interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
}

const emits = defineEmits<Emits>()

// 内部可见性状态
const internalVisible = computed({
  get: () => props.open,
  set: (value: boolean) => {
    emits('update:open', value)
    if (!value) {
      emits('close')
    }
  }
})

// 上传模板弹窗状态
const uploadModalVisible = ref(false)

// 上传表单数据
const uploadForm = reactive({
  platform: '',
  templateName: '',
  file: null as File | null
})

// 文件上传相关
const fileList = ref([])
const uploading = ref(false)

// 搜索参数
const searchParams = ref({
  templateName: '',
  platform: '',
  status: ''
})

// API请求参数
const apiParams = ref<TemplatePageListParams>({
  pageNum: 1,
  pageSize: 10,
})

// 搜索字段配置
const searchFields = [
  {
    key: 'templateName',
    label: '模板名称/ID',
    component: 'a-input',
    props:{
      placeholder: '请输入模板名称或ID搜索'
    }
  },
  {
    key: 'platform',
    label: '刊登平台',
    component: 'a-select',
    props:{
      placeholder: '请选择平台',
      options: [
        { label: '亚马逊', value: '亚马逊' },
        { label: 'TEMU', value: 'TEMU' },
        { label: 'Shein', value: 'Shein' }
      ],
      style: { width: '100px' } 
    }
  },
  {
    key: 'status',
    label: '状态',
    component: 'a-select',
    props:{
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: '启用' },
        { label: '禁用', value: '禁用' }
      ],
      style: { width: '100px' } 
    }
  }
]

// 表格列配置
const tableColumns = [
  {
    title: '模板ID',
    dataIndex: 'templateId',
    key: 'templateId',
    width: 120
  },
  {
    title: '刊登平台',
    dataIndex: 'platform',
    key: 'platform',
    width: 120
  },
  {
    title: '模板名称',
    dataIndex: 'templateName',
    key: 'templateName',
    width: 200
  },
  {
    title: '使用次数',
    dataIndex: 'usageCount',
    key: 'usageCount',
    width: 100
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 80
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
    width: 100
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 160
  },
  {
    title: '操作',
    key: 'action',
    width: 180,
    fixed: 'right'
  }
]

// 表格数据和状态
const tableData = ref([])
const tableLoading = ref(false)
const selectedRowKeys = ref([])

// 分页配置
const pagination = reactive({
  total: 0,
  page: 1,
  limit: 10
})

// 获取模板列表数据
const fetchTemplateList = async () => {
  try {
    tableLoading.value = true
    
    // 构建请求参数
    const params: TemplatePageListParams = {
      pageNum: pagination.page,
      pageSize: pagination.limit,
      orderBy: apiParams.value.orderBy,
      orderDirection: apiParams.value.orderDirection
    }
    
    // 添加搜索条件
    if (searchParams.value.templateName) {
      params.name = searchParams.value.templateName
    }
    if (searchParams.value.platform) {
      // 这里需要根据实际情况映射平台名称到platformId
      // 暂时使用模拟的platformId映射
      const platformMap: Record<string, number> = {
        '亚马逊': 1,
        'TEMU': 2,
        'Shein': 3
      }
      params.platformId = platformMap[searchParams.value.platform]
    }
    
    const response = await getTemplatePageList(params)
    
    if (response.data) {
      // 映射API返回的数据到表格显示格式
      tableData.value = response.data.records.map(item => ({
        templateId: item.id,
        platform: getPlatformName(item.platformName),
        templateName: item.templateName,
        usageCount: item.usageCount,
        status: item.status === 1 ? '启用' : '禁用',
        creator: item.creator,
        createTime: item.createTime
      }))
      pagination.total = response.data.total || 0
    }
  } catch (error) {
    console.error('获取模板列表失败:', error)
    message.error('获取模板列表失败，请重试')
  } finally {
    tableLoading.value = false
  }
}

// 获取平台名称（根据实际API返回的platformName进行映射）
const getPlatformName = (platformName: string) => {
  // 这里可以根据实际情况进行平台名称映射
  return platformName || '未知平台'
}

// 获取平台ID（根据平台名称映射为ID）
const getPlatformId = (platformName: string): number => {
  const platformMap: Record<string, number> = {
    'amazon': 1,
    'ebay': 2,
    'shopify': 3
  }
  return platformMap[platformName] || 0
}

// 获取平台颜色
const getPlatformColor = (platform: string) => {
  const colorMap: Record<string, string> = {
    '亚马逊': 'orange',
    'TEMU': 'blue',
    'Shein': 'purple'
  }
  return colorMap[platform] || 'default'
}

// 搜索处理
const onSearch = () => {
  pagination.page = 1 // 搜索时重置到第一页
  fetchTemplateList()
}

// 重置搜索
const onReset = () => {
  searchParams.value = {
    templateName: '',
    platform: '',
    status: ''
  }
  pagination.page = 1 // 重置到第一页
  fetchTemplateList()
}

// 表格变化处理
const handleTableChange = (pag: any) => {
  pagination.page = pag.current
  pagination.limit = pag.pageSize
  fetchTemplateList()
}

// 行选择处理
const onSelectChange = (keys: any[]) => {
  selectedRowKeys.value = keys
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
  
  uploadForm.file = file
  
  // 如果没有填写模板名称，使用文件名
  if (!uploadForm.templateName) {
    uploadForm.templateName = file.name.replace(/\.[^/.]+$/, '')
  }
  
  return false // 阻止自动上传
}

const handleFileChange = (info: any) => {
  const { fileList } = info
  // 只保留最新的一个文件
  if (fileList.length > 1) {
    fileList.splice(0, fileList.length - 1)
  }
}

// 取消上传
const handleCancelUpload = () => {
  uploadModalVisible.value = false
  // 重置表单
  uploadForm.platform = ''
  uploadForm.templateName = ''
  uploadForm.file = null
  fileList.value = []
}

// 确定上传
const handleConfirmUpload = async () => {
  if (!uploadForm.platform || !uploadForm.file) {
    message.error('请选择平台并上传文件')
    return
  }
  
  try {
    uploading.value = true
    
    // 解析 Excel 文件
    const parseResult = await parseExcelToJson(uploadForm.file, {
      header: true,
      skipRows: 0
    })
    
    if (!parseResult.success) {
      message.error(parseResult.message || 'Excel 文件解析失败')
      return
    }
    
    console.log('Excel 解析结果:', parseResult.data)
    
    // 构造模版DTO对象，将解析的数据填充到相应字段
    const templateDTO: TemplateDTO = {
      id: 0,
      name: uploadForm.templateName || uploadForm.file.name.replace(/\.[^/.]+$/, ''),
      platformId: getPlatformId(uploadForm.platform),
      storeId: 0, // 根据实际需求设置
      categoryId: 0, // 根据实际需求设置
      baseTemplateId: 0, // 根据实际需求设置
      platformFields: {
        key: {
          // 将解析的 Excel 数据填充到 platformFields
          columns: parseResult.data.columns,
          totalRows: parseResult.data.totalRows,
          fileName: parseResult.data.fileName
        }
      },
      categoryFields: {
        key: {
          // 将解析的 Excel 数据填充到 categoryFields
          data: parseResult.data.rows.slice(0, 5), // 只取前5行作为示例
          sheetName: parseResult.data.currentSheet
        }
      }
    }
    
    // 调用创建模板接口
    const response = await createTemplate(templateDTO)
    
    if (response.success) {
      message.success('模板上传成功！')
      handleCancelUpload()
      
      // 刷新模板列表
      fetchTemplateList()
    } else {
      message.error(response.message || '上传失败，请重试')
    }
    
  } catch (error) {
    console.error('上传模板失败:', error)
    message.error('上传失败，请重试')
  } finally {
    uploading.value = false
  }
}

// 操作处理函数
const handleCreateTemplate = () => {
  uploadModalVisible.value = true
}

const handlePreview = (record: any) => {
  message.info(`预览模板: ${record.templateName}`)
}

const handleEdit = (record: any) => {
  message.info(`编辑模板: ${record.templateName}`)
}

const handleDelete = async (record: any) => {
  try {
    // 这里应该调用删除API
    // await deleteTemplate(record.templateId)
    
    message.success('删除成功')
    // 删除成功后重新获取数据
    fetchTemplateList()
  } catch (error) {
    console.error('删除模板失败:', error)
    message.error('删除失败，请重试')
  }
}

// 监听弹窗打开状态，调用API获取数据
watch(() => props.open, (newVal) => {
  if (newVal) {
    // 弹窗打开时重置搜索条件并获取数据
    searchParams.value = {
      templateName: '',
      platform: '',
      status: ''
    }
    pagination.page = 1
    fetchTemplateList()
  }
})
</script>

<style scoped>
.template-modal :deep(.ant-modal-body) {
  padding: 16px;
  max-height: 70vh;
  overflow-y: auto;
}

.template-management-content {
  min-height: 500px;
}

.template-modal :deep(.ant-card) {
  border-radius: 8px;
}

.template-modal :deep(.ant-table-wrapper) {
  border-radius: 8px;
}

/* 上传弹窗样式 */
.upload-form {
  .form-item {
    margin-bottom: 24px;
    
    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #262626;
    }
  }
  
  .selected-file {
    margin-top: 12px;
    padding: 12px;
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    border-radius: 6px;
    
    .file-info {
      display: flex;
      align-items: center;
      
      .file-size {
        margin-left: 8px;
        color: #8c8c8c;
        font-size: 12px;
      }
    }
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #f0f0f0;
  }
}

/* 自定义上传区域样式 */
:deep(.ant-upload-drag) {
  background: #fafafa;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  padding: 32px 16px;
  
  &:hover {
    border-color: #40a9ff;
  }
  
  .ant-upload-drag-icon {
    margin-bottom: 16px;
    
    .anticon {
      font-size: 48px;
      color: #40a9ff;
    }
  }
  
  .ant-upload-text {
    font-size: 16px;
    color: #262626;
    margin-bottom: 8px;
  }
  
  .ant-upload-hint {
    color: #8c8c8c;
    font-size: 14px;
  }
}
</style>