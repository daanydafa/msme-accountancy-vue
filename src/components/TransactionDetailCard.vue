<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-20">
        <div class="flex flex-col bg-white rounded-t-3xl shadow-lg items-center px-10 w-full h-1/2">
            <h2 class="text-xl uppercase font-medium text-gray-500 my-10">Detail Transaksi</h2>
            <button class="absolute right-0 my-10 mr-12 text-3xl uppercase text-gray-500" @click="emit('close')">
                X
            </button>
            <div class="flex flex-col bg-gray-100 w-full h-fit rounded-3xl p-10 text-2xl space-y-3">
                <div class="pb-4 border-b-2 border-gray-400">
                    <StatusBadge :status="transaction.type" />
                    <p class="text-xl">
                        <span class="uppercase">{{ transaction.detailed_type }} |</span>
                        {{ transaction.description || '-' }}
                    </p>
                </div>
                <p class="flex justify-between">Tanggal <strong>{{ transaction.date }}</strong></p>
                <p class="flex justify-between">Oleh <strong>{{ transaction.user_id || '-' }}</strong></p>
                <p v-if="transaction.detailed_type === 'operational'" class="flex justify-between capitalize">
                    Kategori <strong>{{ transaction.category || '-' }}</strong>
                </p>
                <p class="flex justify-between pt-4 border-t-2 border-gray-400">
                    Jumlah <strong class="text-4xl">Rp{{ transaction.amount }},-</strong>
                </p>
                <p v-if="transaction.detailed_type === 'operational'">
                    Status Reimburse:
                    <strong class="capitalize">{{ transaction.reimbursement_status }}</strong>
                </p>
            </div>
            <p class="flex justify-end w-full py-5 px-10">
                Order Id: <strong class="pl-1">{{ transaction.order_id }}</strong>
            </p>
        </div>
    </div>
</template>

<script setup>
import StatusBadge from './StatusBadge.vue';

const props = defineProps({
    transaction: {
        type: Object,
        required: true,
    },
    context: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['close']);
</script>