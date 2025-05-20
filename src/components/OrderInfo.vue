<template>
    <div class="w-full md:w-3/4 bg-base-100 tracking-wide">
        <div class="flex items-center mb-2">
            <span class="w-1/2">Pemesan</span>
            <span class="text-gray-900 font-bold">{{ name }}</span>
        </div>
        <div class="flex items-center mb-2">
            <span class="w-1/2">Kontak Pemesan</span>
            <span class="text-gray-900 font-bold">{{ num }}</span>
        </div>
        <div class="flex items-center mb-2">
            <span class="w-1/2">Kesepakatan Harga</span>
            <span class="text-gray-900 font-bold">Rp{{ price }}</span>
        </div>
        <div class="flex items-center mb-2">
            <span class="w-1/2">Estimasi Selesai</span>
            <span class="text-gray-900 font-bold">{{ date }}</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    num: {
        type: String,
        required: true
    },
    price: {
        type: [String, Number],
        required: true
    },
    date: {
        type: String,
        required: true
    }
})
</script>