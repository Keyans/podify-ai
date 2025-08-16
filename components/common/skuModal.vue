<template>
  <a-modal ref="detailModalRef" v-model:open="isOpen">
    <template #title>
      合成任务详情
    </template>
  </a-modal>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref<boolean>(false)

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}


</script>