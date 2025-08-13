<template>
    <a-upload-dragger
      ref="uploadRef"
      :before-upload="() => false"
      :show-upload-list="false"
      multiple
      :accept="accept"
      :open-file-dialog-on-click="false"  
      @click.prevent.stop="onClick"
      @drop.prevent="handleDrop"
      @dragover.prevent
    >
        <p class="ant-upload-text flex items-center justify-center" v-if="totalCount > 0 && !isUploading">
            已选择<span class="text-red-500">{{ totalCount }}张</span>图片
            <CloseOutlined class="ml-2" @click.stop="closeFolder"/>
        </p>
        <a-progress v-if="isUploading" class="w-1/2" :percent="totalProgress" status="active" />

        <p class="ant-upload-drag-icon mt-4">
            <a-button class="mr-5">上传图片</a-button>
            <a-button @click.stop="handleLibrary">图库选取</a-button>
        </p>
        <p class="ant-upload-hint">将文件/文件夹拖放到此处，不超过1000张</p>
    </a-upload-dragger>
  
    <!-- 我们自管的隐藏 input：文件 -->
    <input
      ref="fileInput"
      type="file"
      :multiple="multiple"
      :accept="accept"
      style="display:none"
    />
    <!-- 我们自管的隐藏 input：文件夹 -->
    <input
      ref="folderInput"
      type="file"
      webkitdirectory
      style="display:none"
    />
  </template>
  
  <script setup>
import { ref, computed } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import tencentCOS from '~/utils/tencentCOS'

const props = defineProps({
  prefer: { type: String, default: 'files' },
  accept: { type: String, default: 'image/*' },
  multiple: { type: Boolean, default: true },
  imagesOnly: { type: Boolean, default: true },
  maxCount: { type: Number, default: 1000 }
});

const emit = defineEmits(['files-change','upload-error','upload-success']);

const fileInput = ref(null);
const folderInput = ref(null);
const uploadRef = ref(null);
const totalProgress = ref(0) // 0~100 整体进度
let batchFiles = [] // 当前批次需要上传的所有文件
const uploadStatusMap = new Map() // 记录每个文件的上传百分比
const isUploading = ref(false)

const filesList = ref([]); // 所有已选文件
const totalCount = computed(() => filesList.value.length);


const closeFolder = () => {
  filesList.value = [];
}

const handleLibrary = ()=>{

}

const isImage = (file) =>
  file?.type?.startsWith('image/') ||
  /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(file?.name || '');

const filterFiles = (list) => {
  const arr = Array.from(list || []);
  return props.imagesOnly ? arr.filter(isImage) : arr;
};
const uploadFileToCos = (file) => {
  return new Promise((resolve, reject) => {
    tencentCOS.uploadFile(file, {
      galleryType: 'application',
      onProgress: (progress) => {
        uploadStatusMap.set(file, progress.percent) // 保留进度
        updateTotalProgress()
      }
    }).then(result => {
      uploadStatusMap.set(file, 1) // 100%
      updateTotalProgress()
      resolve({
        url: result.url,
        size: result.size,
        fileName: result.fileName,
        height: result.height,
        width: result.width
      })
    }).catch(err => {
      uploadStatusMap.set(file, 0) // 失败记 0 或移除
      updateTotalProgress()
      reject(err)
    })
  })
}

// 计算整体进度
const updateTotalProgress = () => {
  if (!batchFiles.length) {
    totalProgress.value = 0
    return
  }
  let sum = 0
  batchFiles.forEach(f => {
    sum += uploadStatusMap.get(f) || 0
  })
  totalProgress.value = Math.floor((sum / batchFiles.length) * 100)
}

const addFiles = (newFiles) => {
  const mapKey = f => `${f.name}-${f.size}-${f.lastModified}`
  const existKeys = new Set(filesList.value.map(f => mapKey(f)))
  const unique = newFiles.filter(f => !existKeys.has(mapKey(f)))
  if (!unique.length) return

  // 新的一批
  batchFiles = unique
  isUploading.value = true  // 🚀 开始上传
  let completed = 0
  
  unique.forEach(file => {
    uploadStatusMap.set(file, 0)
    uploadFileToCos(file)
      .then(cosFile => {
        filesList.value.push(cosFile)
        emit('files-change', filesList.value)
        emit('upload-success', cosFile)
      })
      .catch(error => {
        emit('upload-error', error)
      })
      .finally(() => {
        completed++
        if (completed === unique.length) {
          isUploading.value = false
        }
      })
  })
}

const pickWithInput = (inputEl) =>
  new Promise((resolve) => {
    const onChange = () => {
      inputEl.removeEventListener('change', onChange);
      const files = filterFiles(inputEl.files);
      inputEl.value = '';
      resolve(files);
    };
    inputEl.addEventListener('change', onChange, { once: true });
    inputEl.click();

    const onFocusBack = () => {
      setTimeout(() => {
        if (inputEl && !inputEl.value) {
          inputEl.removeEventListener('change', onChange);
          resolve([]);
        }
        window.removeEventListener('focus', onFocusBack);
      }, 0);
    };
    window.addEventListener('focus', onFocusBack, { once: true });
  });

const pickWithDirectoryPicker = async () => {
  if (!('showDirectoryPicker' in window)) return [];
  try {
    const dirHandle = await window.showDirectoryPicker({ mode: 'read' });
    const files = [];
    const walk = async (dir, base = '') => {
      for await (const [name, handle] of dir.entries()) {
        if (handle.kind === 'file') {
          const f = await handle.getFile();
          if (!props.imagesOnly || isImage(f)) {
            Object.defineProperty(f, 'webkitRelativePath', {
              value: `${base}${name}`,
              configurable: true,
            });
            files.push(f);
          }
        } else if (handle.kind === 'directory') {
          await walk(handle, `${base}${name}/`);
        }
      }
    };
    await walk(dirHandle, '');
    return files;
  } catch {
    return [];
  }
};

const onClick = async () => {
  let files = [];

  // 按 prefer 优先一次选择，不做多次回退弹窗
  if (props.prefer === 'folder') {
    files = await pickWithDirectoryPicker();
    if (!files.length) files = await pickWithInput(folderInput.value);
  } else {
    files = await pickWithInput(fileInput.value);
  }

  if (files.length) addFiles(files);
};

const handleDrop = async (e) => {
  try {
    const dt = e.dataTransfer;
    const out = [];

    if (dt.items && dt.items[0]?.webkitGetAsEntry) {
      const entries = [];
      for (let i = 0; i < dt.items.length; i++) {
        const entry = dt.items[i].webkitGetAsEntry();
        if (entry) entries.push(entry);
      }
      const collected = await readEntriesRecursive(entries);
      out.push(...(props.imagesOnly ? collected.filter(isImage) : collected));
    } else {
      out.push(...filterFiles(dt.files));
    }

    if (out.length) addFiles(out);
  } catch (err) {
    console.error('[UploadImageFolder] drop error:', err);
  }
};

const readEntriesRecursive = async (entries, base = '') => {
  const results = [];
  for (const entry of entries) {
    if (entry.isFile) {
      const file = await entryToFile(entry, base);
      if (file) results.push(file);
    }
    if (entry.isDirectory) {
      const reader = entry.createReader();
      const batch = await readAllBatches(reader);
      for (const ent of batch) {
        if (ent.isFile) {
          const f = await entryToFile(ent, `${base}${entry.name}/`);
          if (f) results.push(f);
        } else if (ent.isDirectory) {
          const sub = await readEntriesRecursive([ent], `${base}${entry.name}/`);
          results.push(...sub);
        }
      }
    }
  }
  return results;
};

const readAllBatches = (reader) =>
  new Promise((resolve) => {
    const all = [];
    const readBatch = () => {
      reader.readEntries((batch) => {
        if (!batch.length) return resolve(all);
        all.push(...batch);
        readBatch();
      }, () => resolve(all));
    };
    readBatch();
  });

const entryToFile = (fileEntry, base = '') =>
  new Promise((resolve) => {
    try {
      fileEntry.file((f) => {
        Object.defineProperty(f, 'webkitRelativePath', {
          value: `${base}${f.name}`,
          configurable: true,
        });
        resolve(f);
      }, () => resolve(null));
    } catch {
      resolve(null);
    }
  });

// 父组件调用
defineExpose({
  getFiles: () => filesList.value,
  clearFiles: () => { filesList.value = []; }
});
</script>

  
  <style scoped>
  /* 兜底：禁用 antd 内置 input 的点击，防止多次弹窗（如果 open-file-dialog-on-click 属性无效时） */
  :deep(.ant-upload input[type="file"]) {
    pointer-events: none !important;
  }
  </style>
  