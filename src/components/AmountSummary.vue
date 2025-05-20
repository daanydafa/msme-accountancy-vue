<template>
    <div class="w-full md:w-3/4 bg-base-100 bg-white rounded-lg">
        <div class="flex flex-col p-4">
            <h2 class="text-md font-medium uppercase tracking-wide text-gray-900 border-b pb-4">
                {{ amountType.label }}
            </h2>
            <span :class="['text-3xl font-bold pt-4', amountType.textColor]">
                Rp{{ formattedAmount }},
            </span>
            <span class="pt-2">{{ qty }} x Transaksi</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: String,
    amount: Number,
    qty: Number
});

const amountType = computed(() => {
    switch (props.type) {
        case 'income':
            return {
                textColor: 'text-green-700',
                label: 'Uang Masuk'
            };
        case 'expense':
            return {
                textColor: 'text-red-700',
                label: 'Uang Keluar'
            };
        default:
            return {
                textColor: 'text-gray-700',
                label: 'Unknown'
            };
    }
});

const formattedAmount = computed(() => {
    return props.amount?.toLocaleString('id-ID') || 0;
});
</script>