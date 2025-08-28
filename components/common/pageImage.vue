<template>
    <a-modal
        v-model:open="internalVisible"
        :title="imageTitle"
        centered
        @ok="handleOk"
        ok-text="确认" 
        cancel-text="取消" 
        >
        <UploadImageFolder
            ref="uploadImageFolderRef"
            prefer="files"          
            accept="image/*"
            :multiple="true"
            :images-only="true"
        />
        
        <!-- 裂变数量设置 -->
        <div v-if="otherParams.fissionNum !== undefined" class="mt-4">
            <div class="mb-2">
                <label class="text-sm font-medium text-gray-700">裂变数量</label>
                <span class="text-xs text-gray-500 ml-2">最小1个，最多等于图片数量5个</span>
            </div>
            <a-input-number
                v-model:value="fissionNum"
                :min="1"
                :max="5"
                placeholder="请输入裂变数量"
                class="w-full"
                size="large"
            />
            <div class="text-xs text-gray-400 mt-1">
                设置每张图片的裂变生成数量，数量越多生成时间越长
            </div>
        </div>
    </a-modal>
</template>
<script lang="ts" setup>
import { computed, defineProps, defineEmits , ref} from 'vue';
import UploadImageFolder from './uploadImageFolder.vue';
import { createCropperTask } from '~/apis/business/cropper'

const props = defineProps({
    open: { // 将属性名从 'visible' 改为 'open'，以匹配 Ant Design Vue 的 a-modal
        type: Boolean,
        default: false
    },
    imageTitle:{
        type: String,
        default: ''
    },
    useMethod:{
        type: Function,
        default: createCropperTask
    },
    otherParams:{
        type: Object,
        default: () => ({})
    }
})

const fissionNum = ref<number>(1)

const emit = defineEmits(['update:open', 'close','success']) // 发射 'update:open' 事件用于 v-model

const uploadImageFolderRef = ref<any>(null)

// 使用计算属性实现双向绑定
const internalVisible = computed({
  get: () => props.open, // getter 返回当前属性值
  set: (value) => {
    emit('update:open', value); // setter 发射更新事件
  }
});



const handleOk = async() => {
  // 如果点击 OK 应该关闭模态框，更新 internalVisible
    internalVisible.value = false;
    const files = uploadImageFolderRef.value.getFiles()
    const type = files.some((item: any) => item.format)
    const taskParams = {
        uploadType: type ? 1 : 2,
        imageList: files
    }
    //新增裂变参数
    if(fissionNum.value !== undefined){
        Object.assign(taskParams, {
            fissionNum: fissionNum.value
        })
    }
    try{
        const res = await props.useMethod(taskParams)  
        if(res.code === 200){
            uploadImageFolderRef.value.clearFiles()
            emit('close');
            emit('success'); // 通知父组件刷新数据
        }
    } catch (error) {
        console.log(error)
    }
};
</script>

<style scoped>
/* ===== 局部Modal确认按钮修复 - 彻底解决白色底纹问题 ===== */

/* 确保Modal确认按钮在当前组件中使用主题色 */
:deep(.ant-modal-footer .ant-btn-primary) {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
  background-image: none !important;
  outline: none !important;
}

:deep(.ant-modal-footer .ant-btn-primary:hover) {
  background-color: var(--accent-hover) !important;
  border-color: var(--accent-hover) !important;
  color: white !important;
  box-shadow: none !important;
  background-image: none !important;
  outline: none !important;
}

:deep(.ant-modal-footer .ant-btn-primary:focus) {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: 0 0 0 2px rgba(var(--accent-color-rgb, 34, 211, 238), 0.2) !important;
  background-image: none !important;
  outline: none !important;
}

:deep(.ant-modal-footer .ant-btn-primary:active) {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
  background-image: none !important;
  outline: none !important;
}

/* 适配取消按钮 */
:deep(.ant-modal-footer .ant-btn:not(.ant-btn-primary)) {
  background-color: var(--bg-tertiary) !important;
  border-color: var(--border-color) !important;
  color: var(--text-primary) !important;
  box-shadow: none !important;
  background-image: none !important;
}

:deep(.ant-modal-footer .ant-btn:not(.ant-btn-primary):hover) {
  background-color: var(--bg-secondary) !important;
  border-color: var(--accent-color) !important;
  color: var(--accent-color) !important;
  box-shadow: none !important;
  background-image: none !important;
}

/* Modal整体样式适配暗色主题 */
:deep(.ant-modal) {
  background-color: var(--bg-secondary) !important;
  border-color: var(--border-color) !important;
}

:deep(.ant-modal-header) {
  background-color: var(--bg-secondary) !important;
  border-bottom-color: var(--border-color) !important;
}

:deep(.ant-modal-title) {
  color: var(--text-primary) !important;
}

:deep(.ant-modal-body) {
  background-color: var(--bg-secondary) !important;
  color: var(--text-primary) !important;
}

:deep(.ant-modal-footer) {
  background-color: var(--bg-secondary) !important;
  border-top-color: var(--border-color) !important;
}

/* 强制覆盖任何内联样式的白色底纹 */
:deep(.ant-modal-footer button[style]) {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
  background-image: none !important;
}

/* 覆盖Ant Design的特定类名 */
:deep(.css-dev-only-do-not-override-1onovbn.ant-btn-primary) {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
  background-image: none !important;
}

:deep(.css-dev-only-do-not-override-1onovbn.ant-btn-primary:hover) {
  background-color: var(--accent-hover) !important;
  border-color: var(--accent-hover) !important;
  color: white !important;
  box-shadow: none !important;
  background-image: none !important;
}
</style>

