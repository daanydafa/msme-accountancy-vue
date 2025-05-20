<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import StatusBadge from './StatusBadge.vue'
import { ChevronRight } from '@/assets/Icons.vue'

defineProps({
    orders: {
        type: Array,
        default: () => []
    },
    status: {
        type: String,
        default: ''
    }
})

const router = useRouter()

const handleClick = (id) => {
    router.push(`/orders/${id}`)
}
</script>

<template>
    <div class="overflow-x-auto rounded-lg">
        <table class="min-w-full overflow-auto rounded-lg bg-white">
            <thead class="bg-white text-gray-600 sticky top-0 shadow-md">
                <tr>
                    <th class="p-4 text-left text-base font-medium uppercase tracking-wider">Pemesan</th>
                    <th class="p-4 text-left text-base font-medium uppercase tracking-wider">Kontak</th>
                    <th class="p-4 text-left text-base font-medium uppercase tracking-wider">Item</th>
                    <th class="p-4 text-left text-base font-medium uppercase tracking-wider">Status</th>
                    <th class="p-4 text-left text-base font-medium uppercase tracking-wider"></th>
                </tr>
            </thead>
            <tbody class="divide-y">
                <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 transition-colors duration-200">
                    <td class="p-4 whitespace-nowrap font-medium">{{ order.customer_name }}</td>
                    <td class="p-4 whitespace-nowrap">{{ order.customer_phone }}</td>
                    <td class="p-4 whitespace-nowrap">
                        <span v-for="(item, index) in order.items" :key="index" class="inline-block mx-1">
                            {{ item.item_name }} x {{ item.quantity }}
                        </span>
                    </td>
                    <td class="p-4 whitespace-nowrap text-sm text-gray-900">
                        <StatusBadge :status="order.status" />
                    </td>
                    <td class="p-4 whitespace-nowrap flex justify-end">
                        <div @click="handleClick(order.id)" role="button" tabindex="0"
                            class="inline-block flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200 group">
                            <ChevronRight
                                class="h-6 w-fit transform group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                    </td>
                </tr>
                <tr v-if="orders.length === 0">
                    <td colspan="7" class="p-10 text-center text-gray-600">
                        Tidak ada data dengan status "{{ status }}".
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
