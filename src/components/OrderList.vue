<template>
    <div v-if="orders && orders.length > 0">
        <div v-for="(order, index) in orders" :key="index" class="card w-full md:w-3/4 shadow-lg">
            <div class="px-6 py-4 border-t bg-white rounded-xl my-5">
                <div class="flex justify-between">
                    <div class="inline-block">
                        <p class="text-gray-700 text-lg">Pemesan</p>
                        <div class="font-bold mb-2">{{ order.customer_name }}</div>
                    </div>
                    <div class="inline-block flex items-start gap-2">
                        <StatusBadge :status="order.status" />
                        <button @click="handleAddTransaction(order.id)"
                            class="bg-green-600 text-white p-2 rounded text-sm">
                            + Transaksi
                        </button>
                    </div>
                </div>

                <div class="flex justify-between mb-2">
                    <div class="inline-block">
                        <p class="text-gray-700 text-lg">Estimasi Selesai</p>
                        <div class="font-bold">{{ order.completion_date }}</div>
                    </div>

                    <div @click="handleClick(order.id)" class="inline-block flex items-end cursor-pointer">
                        <div>
                            <span v-for="(item, idx) in order.items" :key="idx" class="inline-block mx-1">
                                {{ item.item_name }} x {{ item.quantity }}
                            </span>
                        </div>
                        <ChevronRight class="h-6 w-fit" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else>
        Belum ada pesanan saat ini
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ChevronRight } from '../assets/Icons.vue'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
    orders: {
        type: Array,
        required: true
    }
})

const router = useRouter()

function handleClick(id) {
    router.push(`/orders/${id}`)
}

function handleAddTransaction(id) {
    router.push(`/orders/${id}/add-transaction`)
}
</script>