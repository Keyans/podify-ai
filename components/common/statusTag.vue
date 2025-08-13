<template>
    <section>
        <a-tag :color="getStatusText(value,type).color">
            {{ getStatusText(value,type).text }}
        </a-tag>
    </section>
</template>
<script setup lang="ts">
import { getStatusText } from '~/utils/statusUtils'; 

defineProps({
    value: {
        type: Number,
        default: 0
    },
    type: {
        type:String,
        default:'status'
    }
})

</script>
