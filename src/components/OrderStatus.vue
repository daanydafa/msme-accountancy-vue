<script setup>
import { computed } from 'vue'

const props = defineProps({
    status: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    id: {
        type: [String, Number],
        required: true
    }
})

const statusText = computed(() => {
    switch (props.status) {
        case 'pending':
            return 'Menunggu Pembayaran DP'
        case 'processing':
            return 'Sedang Dalam Masa Produksi'
        case 'finished':
            return 'Pesanan Selesai'
        default:
            return 'Tidak Diketahui'
    }
})
</script>

<template>
    <div class="w-full bg-base-100">
        <h2 class="text-2xl font-bold text-gray-900 mb-4 pb-4 mt-2 border-b border-gray-300">
            {{ statusText }}
        </h2>
        <span class="flex">
            ID: <div class="font-bold ml-2">{{ id }}</div>
        </span>
        <div class="flex justify-between items-center">
            <span>Tanggal Pesanan</span>
            <span class="text-gray-900 font-bold">{{ date }}</span>
        </div>
    </div>
</template>
