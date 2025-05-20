<template>
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen bg-gray-100">
        <Loading />
    </div>

    <div v-else-if="error" class="mx-auto max-w-7xl bg-red-100 py-10 text-center min-h-screen">
        <p class="text-red-600 text-lg">{{ error }}</p>
    </div>
    <div v-else class="min-h-screen bg-white pt-40 pb-20">
        <div class="mx-auto max-w-7xl py-10">
            <div class="mx-5 text-xl">
                <div class="flex justify-between items-center px-4 border-b">
                    <div class="flex space-x-4">
                        <span v-for="status in ['Semua Pesanan', 'Selesai', 'Dalam Produksi', 'Pending']" :key="status"
                            @click="filterOrders(status)" :class="[
                                'cursor-pointer py-2 transition-colors duration-300',
                                activeStatus === status
                                    ? 'text-blue-700 border-b-2 border-blue-600 font-medium'
                                    : 'text-gray-500 font-normal'
                            ]">
                            {{ status }}
                        </span>
                    </div>
                    <button @click="goToAdd" class="bg-green-600 text-white py-1 px-3 h-fit rounded-xl text-lg">
                        + Pesanan
                    </button>
                </div>

                <OrderTable :orders="filteredOrders" :status="activeStatus" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import OrderTable from '@/components/OrderTable.vue'
import Loading from '@/components/Loading.vue'
import { getOrders } from '@/services/api'

const router = useRouter()

const orderList = ref([])
const filteredOrders = ref([])
const isLoading = ref(true)
const error = ref(null)
const activeStatus = ref('Semua Pesanan')

const fetchOrders = async () => {
    isLoading.value = true
    error.value = null
    try {
        const data = await getOrders()
        orderList.value = data
        filteredOrders.value = data
    } catch (err) {
        error.value = err.message || 'Failed to fetch orders'
    } finally {
        isLoading.value = false
    }
}

onMounted(fetchOrders)

const filterOrders = (status) => {
    activeStatus.value = status
    if (status === 'Semua Pesanan') {
        filteredOrders.value = orderList.value
    } else {
        filteredOrders.value = orderList.value.filter(order => {
            if (status === 'Selesai') return order.status === 'finished'
            if (status === 'Dalam Produksi') return order.status === 'processing'
            if (status === 'Pending') return order.status === 'pending'
            return true
        })
    }
}

const goToAdd = () => {
    router.push({ name: 'InputOrder' })
}
</script>