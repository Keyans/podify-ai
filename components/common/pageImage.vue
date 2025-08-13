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
            prefer="files"          
            accept="image/*"
            :multiple="true"
            :images-only="true"
            @files-change="handleFiles"
        />
        <!-- <a-upload-dragger 
            class="w-full"
            name="file" 
            v-model:fileList="fileList"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :multiple="true" 
            accept="image/*"
            @change="handleChange"
            @drop="handleDrop"
        >
        <p class="ant-upload-text" v-if="fileList.length > 0">已选择{{ fileList.length }}张图片</p>
            <p class="ant-upload-drag-icon mt-4">
                <a-button class="mr-5">上传图片</a-button>
                <a-button @click.stop="handleLibrary">图库选取</a-button>
            </p>
            <p class="ant-upload-hint">将文件/文件夹拖放到此处，不超过1000张</p>
        </a-upload-dragger> -->
    </a-modal>
</template>
<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue';
import UploadImageFolder from './uploadImageFolder.vue';

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


const handleFiles = async (files:any) => {
    console.log(files,88888)
  // 示例：上传到后端
  // const fd = new FormData();
  // files.forEach(f => fd.append('files', f, f.webkitRelativePath || f.name));
  // await fetch('/api/upload', { method: 'POST', body: fd });
};

const emit = defineEmits(['update:open', 'close']) // 发射 'update:open' 事件用于 v-model


// 使用计算属性实现双向绑定
const internalVisible = computed({
  get: () => props.open, // getter 返回当前属性值
  set: (value) => {
    emit('update:open', value); // setter 发射更新事件
  }
});


const handleOk = () => {
  // 如果点击 OK 应该关闭模态框，更新 internalVisible
  internalVisible.value = false;
  // 如果 'close' 是一个单独的动作，可以保留
  emit('close');
};



</script>
<style>

</style>
