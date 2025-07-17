import { ref, computed } from 'vue';

// 类型定义
export interface WorkflowApp {
  id: string;
  name: string;
  type: string;
  settings: {
    mode: 'auto' | 'manual';
    dataSource: string;
    timeout: number;
    onError: 'stop' | 'skip' | 'retry';
    [key: string]: any; // 允许应用特定设置
  };
}

export interface Workflow {
  id: string;
  name: string;
  apps: WorkflowApp[];
  usageCount: number;
  status: 'enabled' | 'disabled';
  creator: string;
  createTime: string;
}

export interface CreateWorkflowRequest {
  name: string;
  apps: WorkflowApp[];
}

export interface UpdateWorkflowRequest {
  id: string;
  name: string;
  apps: WorkflowApp[];
}

export interface WorkflowStepResult {
  appId: string;
  appName: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime?: string;
  endTime?: string;
  duration?: string;
  inputCount?: number;
  outputCount?: number;
  errorMessage?: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowName: string;
  workflow: Workflow;
  status: 'pending' | 'running' | 'completed' | 'failed';
  stepResults: WorkflowStepResult[];
  startTime: string;
  endTime?: string;
  duration?: string;
  executor: string;
  inputData?: any;
  outputData?: any;
}

// 状态管理
const workflows = ref<Workflow[]>([]);
const executions = ref<WorkflowExecution[]>([]);
const loading = ref(false);

// 模拟数据
const mockWorkflows: Workflow[] = [
  {
    id: 'WF001',
    name: '商品采集+智能裁图+批量刊登',
    apps: [
      {
        id: 'app1',
        name: '商品采集',
        type: 'product-collection',
        settings: {
          mode: 'auto',
          dataSource: 'search',
          timeout: 30,
          onError: 'stop'
        }
      },
      {
        id: 'app2',
        name: '智能裁图',
        type: 'smart-crop',
        settings: {
          mode: 'auto',
          dataSource: 'previous',
          timeout: 20,
          onError: 'skip'
        }
      },
      {
        id: 'app3',
        name: '批量刊登',
        type: 'batch-listing',
        settings: {
          mode: 'manual',
          dataSource: 'previous',
          timeout: 60,
          onError: 'stop'
        }
      }
    ],
    usageCount: 156,
    status: 'enabled',
    creator: '张三',
    createTime: '2024-01-15 10:30:00'
  },
  {
    id: 'WF002',
    name: '一键抠图+超级裂变',
    apps: [
      {
        id: 'app1',
        name: '一键抠图',
        type: 'one-click-cutout',
        settings: {
          mode: 'auto',
          dataSource: 'gallery',
          timeout: 25,
          onError: 'retry'
        }
      },
      {
        id: 'app2',
        name: '超级裂变',
        type: 'super-split',
        settings: {
          mode: 'auto',
          dataSource: 'previous',
          timeout: 30,
          onError: 'stop'
        }
      }
    ],
    usageCount: 89,
    status: 'enabled',
    creator: '李四',
    createTime: '2024-01-14 14:20:00'
  },
  {
    id: 'WF003',
    name: '标题生成+POD合成+批量刊登',
    apps: [
      {
        id: 'app1',
        name: '标题生成',
        type: 'title-generator',
        settings: {
          mode: 'manual',
          dataSource: 'gallery',
          timeout: 15,
          onError: 'stop'
        }
      },
      {
        id: 'app2',
        name: 'POD合成',
        type: 'pod-compose',
        settings: {
          mode: 'auto',
          dataSource: 'previous',
          timeout: 45,
          onError: 'retry'
        }
      },
      {
        id: 'app3',
        name: '批量刊登',
        type: 'batch-listing',
        settings: {
          mode: 'manual',
          dataSource: 'previous',
          timeout: 60,
          onError: 'stop'
        }
      }
    ],
    usageCount: 234,
    status: 'disabled',
    creator: '王五',
    createTime: '2024-01-13 09:15:00'
  },
  {
    id: 'WF004',
    name: '智能裁图+一键抠图',
    apps: [
      {
        id: 'app1',
        name: '智能裁图',
        type: 'smart-crop',
        settings: {
          mode: 'auto',
          dataSource: 'gallery',
          timeout: 20,
          onError: 'skip'
        }
      },
      {
        id: 'app2',
        name: '一键抠图',
        type: 'one-click-cutout',
        settings: {
          mode: 'auto',
          dataSource: 'previous',
          timeout: 25,
          onError: 'retry'
        }
      }
    ],
    usageCount: 67,
    status: 'enabled',
    creator: '赵六',
    createTime: '2024-01-12 16:45:00'
  },
  {
    id: 'WF005',
    name: '完整电商流程',
    apps: [
      {
        id: 'app1',
        name: '商品采集',
        type: 'product-collection',
        settings: {
          mode: 'auto',
          dataSource: 'search',
          timeout: 30,
          onError: 'stop'
        }
      },
      {
        id: 'app2',
        name: '智能裁图',
        type: 'smart-crop',
        settings: {
          mode: 'auto',
          dataSource: 'previous',
          timeout: 20,
          onError: 'skip'
        }
      },
      {
        id: 'app3',
        name: '一键抠图',
        type: 'one-click-cutout',
        settings: {
          mode: 'auto',
          dataSource: 'previous',
          timeout: 25,
          onError: 'retry'
        }
      },
      {
        id: 'app4',
        name: '标题生成',
        type: 'title-generator',
        settings: {
          mode: 'manual',
          dataSource: 'previous',
          timeout: 15,
          onError: 'stop'
        }
      },
      {
        id: 'app5',
        name: '批量刊登',
        type: 'batch-listing',
        settings: {
          mode: 'manual',
          dataSource: 'previous',
          timeout: 60,
          onError: 'stop'
        }
      }
    ],
    usageCount: 423,
    status: 'enabled',
    creator: '孙七',
    createTime: '2024-01-11 11:20:00'
  }
];

// 初始化数据
export const initWorkflows = () => {
  workflows.value = [...mockWorkflows];
};

// 获取所有工作流
export const getWorkflows = () => {
  return workflows.value;
};

// 根据ID获取工作流
export const getWorkflowById = (id: string) => {
  return workflows.value.find(workflow => workflow.id === id);
};

// 创建工作流
export const createWorkflow = async (data: CreateWorkflowRequest): Promise<Workflow> => {
  loading.value = true;
  
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newWorkflow: Workflow = {
      id: `WF${String(workflows.value.length + 1).padStart(3, '0')}`,
      name: data.name,
      apps: data.apps,
      usageCount: 0,
      status: 'enabled',
      creator: '当前用户',
      createTime: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
    
    workflows.value.unshift(newWorkflow);
    return newWorkflow;
  } finally {
    loading.value = false;
  }
};

// 更新工作流
export const updateWorkflow = async (data: UpdateWorkflowRequest): Promise<Workflow> => {
  loading.value = true;
  
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = workflows.value.findIndex(workflow => workflow.id === data.id);
    if (index === -1) {
      throw new Error('工作流不存在');
    }
    
    const updatedWorkflow = {
      ...workflows.value[index],
      name: data.name,
      apps: data.apps
    };
    
    workflows.value[index] = updatedWorkflow;
    return updatedWorkflow;
  } finally {
    loading.value = false;
  }
};

// 切换工作流状态
export const toggleWorkflowStatus = (id: string): boolean => {
  const workflow = workflows.value.find(w => w.id === id);
  if (workflow) {
    workflow.status = workflow.status === 'enabled' ? 'disabled' : 'enabled';
    return workflow.status === 'enabled';
  }
  return false;
};

// 删除工作流
export const deleteWorkflow = (id: string): boolean => {
  const index = workflows.value.findIndex(workflow => workflow.id === id);
  if (index > -1) {
    workflows.value.splice(index, 1);
    return true;
  }
  return false;
};

// 模拟执行历史数据
const mockExecutions: WorkflowExecution[] = [
  {
    id: 'EXE001',
    workflowId: 'WF001',
    workflowName: '商品采集+智能裁图+批量刊登',
    workflow: mockWorkflows[0],
    status: 'completed',
    stepResults: [
      {
        appId: 'app1',
        appName: '商品采集',
        status: 'completed',
        startTime: '2024-01-15 10:30:00',
        endTime: '2024-01-15 10:35:00',
        duration: '5分钟',
        inputCount: 0,
        outputCount: 50
      },
      {
        appId: 'app2',
        appName: '智能裁图',
        status: 'completed',
        startTime: '2024-01-15 10:35:00',
        endTime: '2024-01-15 10:40:00',
        duration: '5分钟',
        inputCount: 50,
        outputCount: 50
      },
      {
        appId: 'app3',
        appName: '批量刊登',
        status: 'completed',
        startTime: '2024-01-15 10:40:00',
        endTime: '2024-01-15 10:45:00',
        duration: '5分钟',
        inputCount: 50,
        outputCount: 48
      }
    ],
    startTime: '2024-01-15 10:30:00',
    endTime: '2024-01-15 10:45:00',
    duration: '15分钟',
    executor: '张三'
  },
  {
    id: 'EXE002',
    workflowId: 'WF002',
    workflowName: '一键抠图+超级裂变',
    workflow: mockWorkflows[1],
    status: 'running',
    stepResults: [
      {
        appId: 'app1',
        appName: '一键抠图',
        status: 'completed',
        startTime: '2024-01-15 14:20:00',
        endTime: '2024-01-15 14:25:00',
        duration: '5分钟',
        inputCount: 30,
        outputCount: 30
      },
      {
        appId: 'app2',
        appName: '超级裂变',
        status: 'running',
        startTime: '2024-01-15 14:25:00',
        inputCount: 30,
        outputCount: 0
      }
    ],
    startTime: '2024-01-15 14:20:00',
    duration: '8分钟',
    executor: '李四'
  },
  {
    id: 'EXE003',
    workflowId: 'WF001',
    workflowName: '商品采集+智能裁图+批量刊登',
    workflow: mockWorkflows[0],
    status: 'failed',
    stepResults: [
      {
        appId: 'app1',
        appName: '商品采集',
        status: 'completed',
        startTime: '2024-01-15 09:00:00',
        endTime: '2024-01-15 09:05:00',
        duration: '5分钟',
        inputCount: 0,
        outputCount: 25
      },
      {
        appId: 'app2',
        appName: '智能裁图',
        status: 'failed',
        startTime: '2024-01-15 09:05:00',
        endTime: '2024-01-15 09:07:00',
        duration: '2分钟',
        inputCount: 25,
        outputCount: 0,
        errorMessage: '图片格式不支持'
      }
    ],
    startTime: '2024-01-15 09:00:00',
    endTime: '2024-01-15 09:07:00',
    duration: '7分钟',
    executor: '王五'
  },
  {
    id: 'EXE004',
    workflowId: 'WF005',
    workflowName: '完整电商流程',
    workflow: mockWorkflows[4],
    status: 'completed',
    stepResults: [
      {
        appId: 'app1',
        appName: '商品采集',
        status: 'completed',
        startTime: '2024-01-14 16:00:00',
        endTime: '2024-01-14 16:10:00',
        duration: '10分钟',
        inputCount: 0,
        outputCount: 100
      },
      {
        appId: 'app2',
        appName: '智能裁图',
        status: 'completed',
        startTime: '2024-01-14 16:10:00',
        endTime: '2024-01-14 16:20:00',
        duration: '10分钟',
        inputCount: 100,
        outputCount: 100
      },
      {
        appId: 'app3',
        appName: '一键抠图',
        status: 'completed',
        startTime: '2024-01-14 16:20:00',
        endTime: '2024-01-14 16:30:00',
        duration: '10分钟',
        inputCount: 100,
        outputCount: 95
      },
      {
        appId: 'app4',
        appName: '标题生成',
        status: 'completed',
        startTime: '2024-01-14 16:30:00',
        endTime: '2024-01-14 16:35:00',
        duration: '5分钟',
        inputCount: 95,
        outputCount: 95
      },
      {
        appId: 'app5',
        appName: '批量刊登',
        status: 'completed',
        startTime: '2024-01-14 16:35:00',
        endTime: '2024-01-14 16:45:00',
        duration: '10分钟',
        inputCount: 95,
        outputCount: 92
      }
    ],
    startTime: '2024-01-14 16:00:00',
    endTime: '2024-01-14 16:45:00',
    duration: '45分钟',
    executor: '孙七'
  },
  {
    id: 'EXE005',
    workflowId: 'WF003',
    workflowName: '标题生成+POD合成+批量刊登',
    workflow: mockWorkflows[2],
    status: 'pending',
    stepResults: [
      {
        appId: 'app1',
        appName: '标题生成',
        status: 'pending'
      },
      {
        appId: 'app2',
        appName: 'POD合成',
        status: 'pending'
      },
      {
        appId: 'app3',
        appName: '批量刊登',
        status: 'pending'
      }
    ],
    startTime: '2024-01-15 15:00:00',
    executor: '赵六'
  }
];

// 获取工作流执行历史
export const getWorkflowExecutions = async (): Promise<WorkflowExecution[]> => {
  loading.value = true;

  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    executions.value = [...mockExecutions];
    return executions.value;
  } finally {
    loading.value = false;
  }
};

// 根据ID获取执行记录
export const getExecutionById = (id: string): WorkflowExecution | undefined => {
  return executions.value.find(execution => execution.id === id);
};

// 导出状态
export const workflowStore = {
  workflows: computed(() => workflows.value),
  executions: computed(() => executions.value),
  loading: computed(() => loading.value)
};
