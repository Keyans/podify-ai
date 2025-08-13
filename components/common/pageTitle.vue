<template>
  <div>
        <div class="flex items-center justify-between">
            <section
              v-for="(item, index) in totalList"
              class="bg-dark-card rounded-lg p-6 border border-dark-border w-full mr-10"
              :key="index"
            >
              <p class="text-dark-text-secondary text-sm">{{ (item as { title: string, value: number | string }).title }}</p>
              <p class="text-dark-text text-2xl font-bold">{{ (item as { title: string, value: number | string}).value }}</p>
            </section>
        </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  totalList: {
    type: Array,
    required: true
  },
})


</script>

<style scoped>
</style>

