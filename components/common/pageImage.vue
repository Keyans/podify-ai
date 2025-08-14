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
    </a-modal>
</template>
<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue';
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
    }
})


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
    try{
        const res = await createCropperTask(taskParams)  
        if(res.code === 200){
            uploadImageFolderRef.value.clearFiles()
            emit('close');
            emit('success'); // 通知父组件刷新数据
        }  
    }catch(error){
        console.log(error)
    }
    // 如果 'close' 是一个单独的动作，可以保留
};
</script>
