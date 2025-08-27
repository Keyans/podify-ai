<template>
  <a-modal
    v-model:open="internalVisible"
    title="刊登模板管理"
    :width="1200"
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

  <!-- 上传模板组件 -->
  <UploadTemplateModal
    v-model:open="uploadModalVisible"
    :platform-options="props.platformOptions"
    :platform-loading="props.platformLoading"
    @success="handleUploadSuccess"
  />
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { message } from 'ant-design-vue'
import PageSearch from '~/components/common/pageSearch.vue'
import PageTable from '~/components/common/pageTable.vue'
import UploadTemplateModal from '~/components/batch/upload/uploadTemplateModal.vue'
import { getTemplatePageList, getStorePageList, type TemplatePageListParams } from '~/apis/business/publish'

// Props
interface Props {
  open?: boolean
  platformOptions?: Array<{label: string, value: string, id?: string}>
  platformLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  platformOptions: () => [],
  platformLoading: false
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

// 搜索参数
const searchParams = ref({
  templateName: '',
  platform: null as string | null,
  store: null as string | null, // 添加店铺参数
  status: ''
})

// 店铺选项数据
const storeOptions = ref<Array<{label: string, value: string}>>([])

// API请求参数
const apiParams = ref<TemplatePageListParams>({
  pageNum: 1,
  pageSize: 10,
})

// 搜索字段配置
const searchFields = computed(() => [
  {
    key: 'templateName',
    label: '模板ID',
    component: 'a-input',
    allowClear: true,
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
      allowClear: true,
      options: props.platformOptions,
      loading: props.platformLoading,
      style: { width: '120px' },
      onChange: onPlatformChange // 添加平台变化事件
    }
  },
  {
    key: 'store',
    label: '店铺',
    component: 'a-select',
    props:{
      placeholder: '请选择店铺',
      allowClear: true,
      options: storeOptions.value,
      style: { width: '120px' }
    }
  }
])

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
    fixed: 'right' as const
  }
]

// 表格数据和状态
const tableData = ref<any[]>([])
const tableLoading = ref(false)
const selectedRowKeys = ref<any[]>([])

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
      // 使用新的辅助函数获取平台ID
      const platformId = getPlatformIdFromOptions(searchParams.value.platform)
      if (platformId) {
        // 如果有平台ID，则传递给接口（转换为数字类型）
        params.platformId = parseInt(platformId)
      }
      // 如果是"全部"选项（platformId为null），则不传递platformId参数
    }
    if (searchParams.value.store) {
      params.storeId = parseInt(searchParams.value.store)
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

// 获取平台ID（根据平台名称从传入的选项中查找真实ID）
const getPlatformIdFromOptions = (platformName: string): string | null => {
  if (!platformName || platformName === '') {
    return null // "全部"选项返回null
  }
  
  // 从传入的平台选项中查找对应的ID
  const platformOption = props.platformOptions?.find(option => option.value === platformName)
  return platformOption?.id || null
}

// 获取店铺列表
const fetchStoreList = async (platformName: string) => {
  try {
    const platformId = getPlatformIdFromOptions(platformName)
    
    console.log('开始获取店铺列表...', { platformName, platformId })
    
    // 构建请求参数
    const params: any = {
      page: 1,
      limit: 100 // 获取所有店铺
    }
    
    // 如果有平台ID，则传递给接口
    if (platformId) {
      params.platform = platformId
    }
    
    const response = await getStorePageList(params)
    console.log('店铺列表获取成功:', response)
    
    if (response.success && response.data) {
      // 构建店铺选项，添加"全部"选项
      storeOptions.value  = response.data.records?.map((store: any) => ({
        label: store.name || store.storeName,
        value: store.id || store.storeId
      })) || []
    } else {
      // 默认数据
      storeOptions.value = [
        { label: '全部', value: '' },
        { label: '默认店铺', value: 'default' }
      ]
    }
  } catch (error) {
    console.error('获取店铺列表失败:', error)
    // 错误处理
    storeOptions.value = [
      { label: '全部', value: '' },
      { label: '默认店铺', value: 'default' }
    ]
  } 
}

// 平台变化事件处理
const onPlatformChange = async (platformValue: string) => {
  console.log('平台变化:', platformValue)
  // 重置店铺选择
  searchParams.value.store = null
  storeOptions.value = []
  await fetchStoreList(platformValue)
}

// 获取平台ID（根据平台名称映射为ID）- 保留向后兼容
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
    platform: null,
    store: null, // 重置店铺选择
    status: ''
  }
  // 重置店铺选项
  storeOptions.value = [
    { label: '全部', value: '' }
  ]
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

// 操作处理函数
const handleCreateTemplate = () => {
  uploadModalVisible.value = true
}

// 上传成功处理
const handleUploadSuccess = () => {
  // 刷新模板列表
  fetchTemplateList()
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
watch(() => props.open, async (newVal) => {
  if (newVal) {
    // 弹窗打开时重置搜索条件并获取数据
    searchParams.value = {
      templateName: '',
      platform: null,
      store: null,
      status: ''
    }
    // 初始化店铺选项 - 触发一次加载
    await fetchStoreList('')
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
</style>