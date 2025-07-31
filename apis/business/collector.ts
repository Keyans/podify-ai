import { get, post, del } from '../index'
import { buildApiPath } from '../apiConfig'

// 采集模块API路径配置（相对路径，不包含前缀）
const collectorApiPaths = {
  total: '/product/collector/total',
  list: '/product/collector/list',
  taskList: '/product/collector/getTaskList',
  taskDetail: '/product/collector/getList',
  create: '/product/collector/create',
  delete: '/product/collector/delete'
}

// 构建完整路径的辅助方法
const getPath = (path: keyof typeof collectorApiPaths) => buildApiPath(collectorApiPaths[path])

// 任务列表查询参数接口
interface TaskListParams {
  page?: number
  limit?: number
  taskId?: string
  collectorType?: number
  collectorPlatform?: number  
  status?: number
  startTime?: string
  endTime?: string
  userId?: string
}

// 任务详情查询参数接口
interface TaskDetailParams {
  taskId: string      // 必需：任务ID
  page?: number       // 可选：页数
  limit?: number      // 可选：分页大小
}

// 获取采集统计数据
export const getCollectorStats = async () => {
  try {
    const data = await get(getPath('total'))
    return data
  } catch (error) {
    console.error('获取采集统计数据失败:', error)
    throw error
  }
}

// 获取采集任务列表
export const getCollectorList = async (params?: any) => {
  try {
    const data = await get(getPath('list'), params)
    return data
  } catch (error) {
    console.error('获取采集任务列表失败:', error)
    throw error
  }
}

// 获取任务列表（带分页和筛选）
export const getTaskList = async (params?: TaskListParams) => {
  try {
    const data = await get(getPath('taskList'), params)
    return data
  } catch (error) {
    console.error('获取任务列表失败:', error)
    throw error
  }
}

// 获取任务详情列表（查看详情时调用）
export const getTaskDetail = async (params: TaskDetailParams) => {
  try {
    const data = await get(getPath('taskDetail'), params)
    return data
  } catch (error) {
    console.error('获取任务详情失败:', error)
    throw error
  }
}

// 创建采集任务
export const createCollector = async (collectorData: any) => {
  try {
    const data = await post(getPath('create'), collectorData)
    return data
  } catch (error) {
    console.error('创建采集任务失败:', error)
    throw error
  }
}

// 删除采集任务
export const deleteCollector = async (id: string) => {
  try {
    const data = await del(`${getPath('delete')}/${id}`)
    return data
  } catch (error) {
    console.error('删除采集任务失败:', error)
    throw error
  }
}

// 批量删除采集任务
export const batchDeleteCollector = async (ids: string[]) => {
  try {
    const data = await post(getPath('delete'), { ids })
    return data
  } catch (error) {
    console.error('批量删除采集任务失败:', error)
    throw error
  }
}

export default {
  getCollectorStats,
  getCollectorList,
  getTaskList,
  getTaskDetail,
  createCollector,
  deleteCollector,
  batchDeleteCollector
} 