<template>
    <a-modal
        v-model:open="internalVisible"
        centered
        :width="modalWidth"
        wrap-class-name="gallery-modal"
        ok-text="确认" 
        cancel-text="取消" 
        >
        <a-tabs v-model:activeKey="activeKey" @change="handleTabChange">
            <a-tab-pane key="1" tab="商品图库">
                <GalleryShow ref="galleryShowRef1" :galleryList="galleryList" :categoryList="categoryList"
                @imagesSelected="handleImagesSelectedInTab('1', $event)"
                ></GalleryShow>
            </a-tab-pane>
            <a-tab-pane key="2" tab="素材图库" force-render>
                <GalleryShow ref="galleryShowRef2" :galleryList="galleryList" :categoryList="categoryList"
                @imagesSelected="handleImagesSelectedInTab('2', $event)"
                ></GalleryShow>
            </a-tab-pane>
            <a-tab-pane key="3" tab="结果图库" force-render>
                <GalleryShow ref="galleryShowRef3" :galleryList="galleryList" :categoryList="categoryList"
                @imagesSelected="handleImagesSelectedInTab('3', $event)"
                ></GalleryShow>
            </a-tab-pane>
        </a-tabs>
        <template #footer>
            <a-button @click="handleCancel">取消</a-button>
            <a-button type="primary" @click="handleOk"> 
                确认选中 <span v-if="totalSelectedImagesCount > 0">({{ totalSelectedImagesCount }})</span>
            </a-button>
        </template>
    </a-modal>
</template>
<script lang="ts" setup>
import { computed, defineProps, defineEmits , ref , onMounted, onUnmounted} from 'vue';
import GalleryShow from './galleryShow.vue';
import { getGalleryCategories, getGalleryImageList } from '@/apis/business/gallery'; // 假设你的API路径

interface GalleryShowInstance {
    getSelectedImages: () => any[];
    clearSelection: () => void;
    selectAll: () => void;
    getUniqueGalleryList: () => any[];
}

// --- 为每个 GalleryShow 组件声明 ref ---
const galleryShowRef1 = ref<GalleryShowInstance | null>(null);
const galleryShowRef2 = ref<GalleryShowInstance | null>(null);
const galleryShowRef3 = ref<GalleryShowInstance | null>(null);

const activeKey = ref('1');

// 响应式弹窗宽度
const modalWidth = ref('90%');
//分类列表
const categoryList = ref<any>([]);

const galleryList = ref<any>([]);



const props = defineProps({
    open: { // 将属性名从 'visible' 改为 'open'，以匹配 Ant Design Vue 的 a-modal
        type: Boolean,
        default: false
    },
})


const emit = defineEmits(['update:open', 'close','confirmSelection']) // 发射 'update:open' 事件用于 v-model

// 使用一个 Map 来存储每个 Tab 选中的图片，键是 activeKey
const selectedImagesPerTab = ref<Record<string, any[]>>({
    '1': [],
    '2': [],
    '3': [],
});
// 计算所有 Tab 中选中的图片总数
const totalSelectedImagesCount = computed(() => {
    let count = 0;
    for (const key in selectedImagesPerTab.value) {
        count += selectedImagesPerTab.value[key].length;
    }
    return count;
});

// 使用计算属性实现双向绑定
const internalVisible = computed({
  get: () => props.open, // getter 返回当前属性值
  set: (value) => {
    emit('update:open', value); // setter 发射更新事件
  }
});

// 获取当前活跃的 GalleryShow 实例
const currentGalleryShowRef = computed<GalleryShowInstance | null>(() => {
    switch (activeKey.value) {
        case '1': return galleryShowRef1.value;
        case '2': return galleryShowRef2.value;
        case '3': return galleryShowRef3.value;
        default: return null;
    }
});

const fetchCategories = async () => {
    try {
        const res = await getGalleryCategories({ galleryType: Number(activeKey.value) });
        categoryList.value = res.data?.categoryList || [];
    } catch (error) {
        console.error('获取分类失败:', error);
        categoryList.value = [];
    }
};

const fetchImageList = async () => { 
    try {
    const requestParams = {
        galleryType: Number(activeKey.value),
        page: 1,
        limit: 50
    }
        // 修正API参数，假设API需要galleryType而不是type
        const res = await getGalleryImageList(requestParams);
        // 兼容res.data和res.data.list可能为undefined的情况
        galleryList.value =  res.data?.imageList || [];
        } catch (error) {
        // 错误处理
        galleryList.value = [];
        }
}

const handleTabChange = async (key: '1' | '2' | '3') => {
    galleryList.value = []; 
    categoryList.value = [];
    activeKey.value = key;
    fetchCategories();
    fetchImageList();
}

// 监听每个 GalleryShow 子组件发出的 imagesSelected 事件
const handleImagesSelectedInTab = (tabKey: string, selected: any[]) => {
    selectedImagesPerTab.value[tabKey] = selected;
    console.log(`Tab ${tabKey} 选中了:`, selected);
};

const handleOk = () => {
    let allSelectedImages: any[] = [];
    for (const key in selectedImagesPerTab.value) {
        allSelectedImages = allSelectedImages.concat(selectedImagesPerTab.value[key]);
    }
    emit('confirmSelection', allSelectedImages); 
    internalVisible.value = false; 
};

// 模态框取消按钮点击
const handleCancel = () => {
    internalVisible.value = false;
    emit('close'); // 也可以保留 close 事件，如果需要
};

// 更新弹窗宽度的函数
const updateModalWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1200) {
        modalWidth.value = '1200px'; // 大屏幕最大宽度
    } else if (screenWidth > 1024) {
        modalWidth.value = '95%'; // 平板横屏
    } else if (screenWidth > 768) {
        modalWidth.value = '90%'; // 平板竖屏
    } else if (screenWidth > 480) {
        modalWidth.value = '95%'; // 大手机
    } else if (screenWidth > 360) {
        modalWidth.value = '98%'; // 小手机
    } else {
        modalWidth.value = '99%'; // 超小屏幕
    }
};

onMounted(()=>{
    fetchCategories();
    fetchImageList();
    updateModalWidth();
    window.addEventListener('resize', updateModalWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateModalWidth);
});

// --- 暴露方法给外部（如果这个 modal 本身也需要被父组件调用其内部方法） ---
defineExpose({
    // 例如，你可以暴露一个方法来获取所有 Tab 选中的图片
    getAllSelectedImages: () => {
        let allSelected: any[] = [];
        for (const key in selectedImagesPerTab.value) {
            allSelected = allSelected.concat(selectedImagesPerTab.value[key]);
        }
        return allSelected;
    },
    // 或者暴露方法来清空所有 Tab 的选择
    clearAllSelections: () => {
        // 调用每个 GalleryShow 实例的 clearSelection 方法
        galleryShowRef1.value?.clearSelection();
        galleryShowRef2.value?.clearSelection();
        galleryShowRef3.value?.clearSelection();
        // 并清空父组件的记录
        selectedImagesPerTab.value = { '1': [], '2': [], '3': [] };
    }
});

</script>
<style>
.gallery-modal .ant-modal {
    max-width: 1200px;
    max-height: 90vh;
}

.gallery-modal .ant-modal-content {
    max-height: 90vh;
    overflow: hidden;
}

.gallery-modal .ant-modal-body {
    max-height: calc(90vh - 110px);
    overflow-y: auto;
    padding: 16px;
}

/* 平板横屏 */
@media (max-width: 1024px) {
    .gallery-modal .ant-modal {
        max-width: calc(100vw - 40px);
        margin: 20px;
    }
}

/* 平板竖屏 */
@media (max-width: 768px) {
    .gallery-modal .ant-modal {
        margin: 15px;
        max-width: calc(100vw - 30px);
        max-height: 92vh;
    }
    
    .gallery-modal .ant-modal-content {
        max-height: 92vh;
    }
    
    .gallery-modal .ant-modal-body {
        padding: 12px;
        max-height: calc(92vh - 100px);
    }
}

/* 大手机 */
@media (max-width: 480px) {
    .gallery-modal .ant-modal {
        margin: 8px;
        max-width: calc(100vw - 16px);
        max-height: 95vh;
    }
    
    .gallery-modal .ant-modal-content {
        max-height: 95vh;
    }
    
    .gallery-modal .ant-modal-body {
        padding: 8px;
        max-height: calc(95vh - 90px);
    }
}

/* 小手机 */
@media (max-width: 360px) {
    .gallery-modal .ant-modal {
        margin: 4px;
        max-width: calc(100vw - 8px);
        max-height: 98vh;
    }
    
    .gallery-modal .ant-modal-content {
        max-height: 98vh;
    }
    
    .gallery-modal .ant-modal-body {
        padding: 6px;
        max-height: calc(98vh - 85px);
    }
}
</style>
