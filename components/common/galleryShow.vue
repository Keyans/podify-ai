<template>
        <a-layout class="gallery-layout">
            <a-layout-sider :style="siderStyle" class="gallery-sider">
                <a-tree
                    v-model:expandedKeys="expandedKeys"
                    v-model:selectedKeys="selectedKeys"
                    show-line
                    :tree-data="treeData"
                    class="gallery-tree"
                >
                    <template #switcherIcon="{ switcherCls }"><down-outlined :class="switcherCls" /></template>
                </a-tree>
            </a-layout-sider>
            <a-layout-content :style="contentStyle" class="gallery-content">
                <!-- 选择控制区域 -->
                <div v-if="uniqueGalleryList && uniqueGalleryList.length > 0" class="selection-controls">
                    <div class="selection-info">
                        <a-checkbox 
                            :indeterminate="indeterminate"
                            :checked="checkAll"
                            @change="onCheckAllChange"
                        >
                            全选
                        </a-checkbox>
                        <span class="selection-count">
                            已选择 {{ selectedImages.length }} / {{ uniqueGalleryList.length }} 张图片
                        </span>
                    </div>
                    <div class="selection-actions" v-show="selectedImages.length > 0">
                        <a-button size="small" @click="clearSelection">清空选择</a-button>
                    </div>
                </div>
                
                <a-image-preview-group v-if="uniqueGalleryList && uniqueGalleryList.length > 0">
                    <a-list 
                        :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }" 
                        :data-source="uniqueGalleryList"
                        class="gallery-list"
                    >
                        <template #renderItem="{ item, index }">
                            <a-list-item class="gallery-image-wrapper">
                                <a-card 
                                    :body-style="{ padding: 0 }" 
                                    :class="['gallery-card', { 'selected': isImageSelected(item) }]"
                                    :hoverable="true"
                                    @click="() => onImageSelect(item, !isImageSelected(item))"
                                    style="cursor: pointer;"
                                >
                                    <!-- 复选框覆盖层 -->
                                    <div class="checkbox-overlay">
                                        <a-checkbox 
                                            :checked="isImageSelected(item)"
                                            @change="(e) => onImageSelect(item, e.target.checked)"
                                            class="image-checkbox"
                                        />
                                    </div>
                                    
                                    <!-- Preview按钮 -->
                                    <div class="preview-overlay">
                                        <a-button 
                                            type="text" 
                                            size="small"
                                            class="preview-button"
                                            @click.stop="() => onPreviewImage(item, index)"
                                            :icon="h(EyeOutlined)"
                                        />
                                    </div>
                                    
                                    <a-image 
                                        :src="item.imageUrl" 
                                        :placeholder="true"
                                        :preview="false"
                                        class="gallery-image"
                                        :fallback="'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMDAgNzVMMTI1IDUwSDc1TDEwMCA3NVoiIGZpbGw9IiNEOUQ5RDkiLz4KPC9zdmc+'"
                                    />
                                </a-card>
                            </a-list-item>
                        </template>
                    </a-list>
                </a-image-preview-group>
                <!-- 加载状态 -->
                <div v-else class="loading-container">
                    <a-spin tip="Loading..." size="large" />
                </div>
            </a-layout-content>
        </a-layout>

        <!-- 图片预览模态框 -->
        <div v-if="previewVisible" class="preview-modal" @click="closePreview">
            <div class="preview-container" @click.stop>
                <!-- 关闭按钮 -->
                <button class="preview-close" @click="closePreview">
                    <CloseOutlined />
                </button>
                
                <!-- 导航按钮 -->
                <button class="preview-nav prev" @click="goToPrevImage" v-if="previewImages.length > 1">
                    <LeftOutlined />
                </button>
                <button class="preview-nav next" @click="goToNextImage" v-if="previewImages.length > 1">
                    <RightOutlined />
                </button>
                
                <!-- 图片显示区域 -->
                <div class="preview-image-container">
                    <a-spin :spinning="false" class="preview-spin">
                        <img 
                             :src="previewImages[currentPreviewIndex]?.imageUrl" 
                             :alt="previewImages[currentPreviewIndex]?.name || 'Preview Image'"
                             class="preview-image"
                             @error="$event.target.src = '/placeholder-image.png'"
                         />
                    </a-spin>
                </div>
                
                <!-- 图片信息 -->
                <div class="preview-info">
                    <div class="preview-counter">
                        {{ currentPreviewIndex + 1 }} / {{ previewImages.length }}
                    </div>
                    <div class="preview-title">
                        {{ previewImages[currentPreviewIndex]?.name }}
                    </div>
                </div>
            </div>
        </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, h, onMounted, onUnmounted, type CSSProperties } from 'vue';
import { DownOutlined, EyeOutlined, CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import type { TreeProps } from 'ant-design-vue';

const expandedKeys = ref<string[]>(['all']);
const selectedKeys = ref<string[]>([]);

// 选中的图片列表
const selectedImages = ref<any[]>([]);

const props = defineProps({
    galleryList: {
        type: Array as () => any[],
        default: () => [],
    },
    categoryList: {
        type: Array as () => any[],
        default: () => [],
    }
})

// 定义 emits
const emit = defineEmits(['imagesSelected', 'imagePreview']);

// 去重后的图片列表 - 基于图片地址去重
const uniqueGalleryList = computed(() => {
    if (!props.galleryList || props.galleryList.length === 0) {
        return [];
    }
    
    const uniqueMap = new Map();
    props.galleryList.forEach(item => {
        if (item.imageUrl && !uniqueMap.has(item.imageUrl)) {
            uniqueMap.set(item.imageUrl, item);
        }
    });
    
    return Array.from(uniqueMap.values());
});

// 全选状态计算 - 基于去重后的列表
const checkAll = computed(() => {
    return uniqueGalleryList.value.length > 0 && selectedImages.value.length === uniqueGalleryList.value.length;
});

// 半选状态计算 - 基于去重后的列表
const indeterminate = computed(() => {
    return selectedImages.value.length > 0 && selectedImages.value.length < uniqueGalleryList.value.length;
});

// 判断图片是否被选中
const isImageSelected = (image: any) => {
return selectedImages.value.some(selected => selected.imageUrl === image.imageUrl);
};

// 单个图片选择处理
const onImageSelect = (image: any, checked: boolean) => {
    if (checked) {
        if (!isImageSelected(image)) {
            selectedImages.value.push(image);
        }
    } else {
        selectedImages.value = selectedImages.value.filter(selected => selected.imageUrl !== image.imageUrl);
    }
    // 通知父组件选中的图片发生变化
    emit('imagesSelected', selectedImages.value);
};

// 全选/取消全选处理 - 基于去重后的列表
const onCheckAllChange = (e: any) => {
    if (e.target.checked) {
        selectedImages.value = [...uniqueGalleryList.value];
    } else {
        selectedImages.value = [];
    }
    
    // 通知父组件选中的图片发生变化
    emit('imagesSelected', selectedImages.value);
};

// 清空选择
const clearSelection = () => {
    selectedImages.value = [];
    emit('imagesSelected', selectedImages.value);
};

// 预览相关状态
const previewVisible = ref(false)
const currentPreviewIndex = ref(0)
const previewImages = ref<any[]>([])

const onPreviewImage = (image: any, index: number) => {
  previewImages.value = uniqueGalleryList.value
  currentPreviewIndex.value = index
  previewVisible.value = true
}

// 预览导航功能
const goToPrevImage = () => {
  if (currentPreviewIndex.value > 0) {
    currentPreviewIndex.value--
  } else {
    currentPreviewIndex.value = previewImages.value.length - 1
  }
}

const goToNextImage = () => {
  if (currentPreviewIndex.value < previewImages.value.length - 1) {
    currentPreviewIndex.value++
  } else {
    currentPreviewIndex.value = 0
  }
}

const closePreview = () => {
  previewVisible.value = false
}

// 键盘事件处理
const handleKeydown = (event: KeyboardEvent) => {
  if (!previewVisible.value) return
  
  switch (event.key) {
    case 'ArrowLeft':
      goToPrevImage()
      break
    case 'ArrowRight':
      goToNextImage()
      break
    case 'Escape':
      closePreview()
      break
  }
}

// 监听键盘事件
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// 监听 galleryList 变化，清空选择状态
watch(() => props.galleryList, () => {
    selectedImages.value = [];
    emit('imagesSelected', selectedImages.value);
}, { deep: true });

// 监听去重后的列表变化，同步更新选择状态
watch(uniqueGalleryList, (newList) => {
    // 过滤掉不在新列表中的选中项
    selectedImages.value = selectedImages.value.filter(selected => 
        newList.some(item => item.imageUrl === selected.imageUrl)
    );
    emit('imagesSelected', selectedImages.value);
}, { deep: true });

// 暴露方法给父组件
defineExpose({
    getSelectedImages: () => selectedImages.value,
    clearSelection,
    selectAll: () => {
        selectedImages.value = [...uniqueGalleryList.value];
        emit('imagesSelected', selectedImages.value);
    },
    getUniqueGalleryList: () => uniqueGalleryList.value
});

// 递归转换 categoryList 为树形数据结构
const transformCategoryToTree = (categories: any[]): TreeProps['treeData'] => {
  return categories.map(category => ({
    title: category.categoryName,
    key: category.categoryId,
    children: category.categoryList && category.categoryList.length > 0 
      ? transformCategoryToTree(category.categoryList) 
      : undefined
  }));
};

// 动态生成树形数据
const treeData = computed<TreeProps['treeData']>(() => {
  const children: TreeProps['treeData'] = [];
  
  // 添加未分类节点
  children.push({
    title: '未分类',
    key: '0'
  });
  
  // 添加 categoryList 中的分类
  if (props.categoryList && props.categoryList.length > 0) {
    const treeNodes = transformCategoryToTree(props.categoryList);
    if (treeNodes) {
      children.push(...treeNodes);
    }
  }
  
  // 返回包含"全部"根节点的完整树结构
  return [{
    title: '全部',
    key: 'all',
    children
  }];
});
const contentStyle: CSSProperties = {
  textAlign: 'left',
  minHeight: '100vh',
  color: 'var(--text-primary, #333333)',
  backgroundColor: 'var(--bg-primary, #ffffff)',
  padding: '0',
};

const siderStyle: CSSProperties = {
  textAlign: 'left',
  minHeight: '100vh',
  color: 'var(--text-primary, #333333)',
  backgroundColor: 'var(--bg-secondary, #f5f5f5)',
  width: '250px',
  padding: '16px',
};


</script>
<style scoped>
/* 主布局样式 */
.gallery-layout {
  background: var(--bg-primary, #ffffff);
}

.gallery-sider {
  background: var(--bg-secondary, #f5f5f5) !important;
  border-right: 1px solid var(--border-color, #e8e8e8);
}

.gallery-content {
  background: var(--bg-primary, #ffffff) !important;
  padding: 16px;
}

/* 选择控制区域样式 */
.selection-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 16px;
  background: var(--bg-secondary, #f8f9fa);
  border: 1px solid var(--border-color, #e8e8e8);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  line-height: 30px;
}

.selection-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.selection-count {
  color: var(--text-secondary, #666666);
  font-size: 14px;
}

.selection-actions {
  display: flex;
  gap: 8px;
}

.selection-actions .ant-btn {
  height: 28px;
  font-size: 12px;
}

/* 树形菜单样式 */
.gallery-tree :deep(.ant-tree) {
  background: transparent;
  color: var(--text-primary, #333333);
}

.gallery-tree :deep(.ant-tree-node-content-wrapper) {
  color: var(--text-primary, #333333);
}

.gallery-tree :deep(.ant-tree-node-content-wrapper:hover) {
  background-color: var(--accent-color, #1890ff) !important;
  color: var(--bg-primary, #ffffff) !important;
}

.gallery-tree :deep(.ant-tree-node-selected .ant-tree-node-content-wrapper) {
  background-color: var(--accent-color, #1890ff) !important;
  color: var(--bg-primary, #ffffff) !important;
}

/* 列表容器样式 */
.gallery-list {
  width: 100%;
}

/* 图片容器统一尺寸 */
.gallery-image-wrapper {
  width: 100%;
  height: 150px; /* 固定高度 */
  overflow: hidden;
  border-radius: 8px;
  transition: all 0.3s ease;
}

/* 卡片样式 */
.gallery-card {
  width: 100%;
  border: 1px solid var(--border-color, #e8e8e8);
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-secondary, #ffffff);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.gallery-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border-color: var(--accent-color, #1890ff);
}

/* 选中状态样式 */
.gallery-card.selected {
  border-color: var(--accent-color, #1890ff);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  transform: translateY(-2px);
}

.gallery-card.selected::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(24, 144, 255, 0.1);
  pointer-events: none;
  z-index: 1;
}

/* 加载状态容器 */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;
}

/* 复选框覆盖层 */
.checkbox-overlay {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 10;
  border-radius: 4px;
  padding: 4px;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

/* Preview按钮覆盖层 */
.preview-overlay {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  opacity: 0;
  transition: all 0.3s ease;
}

.gallery-card:hover .preview-overlay {
  opacity: 1;
}

.preview-button {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.preview-button:hover {
  background: var(--accent-color, #1890ff);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(24, 144, 255, 0.3);
}

.preview-button :deep(.anticon) {
  font-size: 14px;
}


.image-checkbox {
  margin: 0;
}

.image-checkbox :deep(.ant-checkbox) {
  transform: scale(1.1);
}

.image-checkbox :deep(.ant-checkbox-checked .ant-checkbox-inner) {
  background-color: var(--accent-color, #1890ff);
  border-color: var(--accent-color, #1890ff);
}

/* 卡片内容区域 */
.gallery-card :deep(.ant-card-body) {
  padding: 0 !important;
  width: 100%;
  height: 150px; /* 固定高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary, #ffffff);
}

/* 图片组件样式 */
.gallery-image {
  width: 100%;
  height: 150px; /* 固定高度 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-image :deep(.ant-image) {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 实际图片样式 - 关键优化 */
.gallery-image :deep(.ant-image-img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
  border-radius: 8px;
}

.gallery-card:hover .gallery-image :deep(.ant-image-img) {
  transform: scale(1.05);
}

/* 加载占位符样式 */
.gallery-image :deep(.ant-image-placeholder) {
  width: 100%;
  height: 100%;
  background: var(--bg-tertiary, #f0f0f0);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary, #999999);
}

/* 错误状态样式 */
.gallery-image :deep(.ant-image-img[src=""]) {
  background: var(--bg-tertiary, #f0f0f0);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 响应式设计 */
@media (max-width: 576px) {
  .gallery-content {
    padding: 8px;
  }
  
  .gallery-image-wrapper {
    height: 150px; /* 小屏幕稍微降低高度 */
  }
  
  .gallery-card :deep(.ant-card-body) {
    height: 150px;
  }
  
  .gallery-image {
    height: 150px;
  }
}

@media (max-width: 768px) {
  .gallery-sider {
    width: 200px !important;
  }
  
  .gallery-image-wrapper {
    height: 180px;
  }
  
  .gallery-card :deep(.ant-card-body) {
    height: 180px;
  }
  
  .gallery-image {
    height: 180px;
  }
}

@media (max-width: 992px) {
  .gallery-image-wrapper {
    height: 180px;
  }
  
  .gallery-card :deep(.ant-card-body) {
    height: 180px;
  }
  
  .gallery-image {
    height: 180px;
  }
}

/* 暗色主题适配 */
@media (prefers-color-scheme: dark) {
  .gallery-layout {
    background: var(--bg-primary, #1a1a1a);
  }
  
  .gallery-sider {
    background: var(--bg-secondary, #2a2a2a) !important;
    border-right-color: var(--border-color, #404040);
  }
  
  .gallery-content {
    background: var(--bg-primary, #1a1a1a) !important;
  }
  
  .gallery-card {
    background: var(--bg-secondary, #2a2a2a);
    border-color: var(--border-color, #404040);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .gallery-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }
  
  .preview-button {
    background: rgba(42, 42, 42, 0.9);
    border-color: rgba(255, 255, 255, 0.1);
    color: var(--text-primary, #ffffff);
  }
  
  .preview-button:hover {
    background: var(--accent-color, #1890ff);
    color: white;
  }
}

/* 预览模态框样式 */
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.preview-container {
  position: relative;
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.preview-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  z-index: 10001;
  transition: all 0.3s ease;
}

.preview-close:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.preview-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  z-index: 10001;
  transition: all 0.3s ease;
}

.preview-nav:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.preview-nav.prev {
  left: 20px;
}

.preview-nav.next {
  right: 20px;
}

.preview-image-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 60px 80px 80px;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.preview-info {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 12px 20px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
}

.preview-counter {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.preview-title {
  font-size: 12px;
  opacity: 0.8;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 预览模态框响应式设计 */
@media (max-width: 768px) {
  .preview-container {
    width: 95vw;
    height: 95vh;
  }
  
  .preview-close {
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
  
  .preview-nav {
    width: 44px;
    height: 44px;
    font-size: 18px;
  }
  
  .preview-nav.prev {
    left: 10px;
  }
  
  .preview-nav.next {
    right: 10px;
  }
  
  .preview-image-container {
    padding: 50px 60px 70px;
  }
  
  .preview-info {
    bottom: 10px;
    padding: 8px 16px;
  }
  
  .preview-title {
    max-width: 200px;
  }
}
</style>