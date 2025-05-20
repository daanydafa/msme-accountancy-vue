<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getOrderDetails } from '@/services/api'

import TransactionList from '@/components/TransactionList.vue'
import OrderStatus from '@/components/OrderStatus.vue'
import OrderInfo from '@/components/OrderInfo.vue'
import ItemList from '@/components/ItemList.vue'
import Loading from '@/components/Loading.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const orderDetail = ref(null)
const error = ref(null)
const isLoading = ref(true)

const fetchOrderDetail = async () => {
    isLoading.value = true
    try {
        const data = await getOrderDetails(id)
        orderDetail.value = data
        console.log(orderDetail.value);
    } catch (err) {
        error.value = err.message || 'Failed to fetch order detail'
    } finally {
        isLoading.value = false
    }
}

const handleClick = () => {
    router.push(`/orders/${id}/add-transaction`)
}

onMounted(() => {
    fetchOrderDetail()
})
</script>

<template>
    <div class="mx-auto max-w-7xl bg-gray-200 text-gray-900 text-xl tracking-wide pt-24">
        <div v-if="isLoading" class="min-h-screen flex justify-center items-center">
            <Loading />
        </div>

        <div v-else-if="error" class="text-center text-red-600">
            Error: {{ error }}
        </div>

        <div v-else>
            <div class="overflow-hidden bg-white mb-2 px-8 py-4">
                <div class="flex justify-center flex-col items-center">
                    <OrderStatus :status="orderDetail.data.status" :id="orderDetail.data.id"
                        :date="orderDetail.data.created_at" />
                </div>
            </div>

            <div class="overflow-hidden bg-white mb-2 px-8 py-4">
                <h2 class="text-2xl font-bold mb-6 mt-2">Daftar Pesanan</h2>
                <div class="flex justify-center flex-col items-center">
                    <ItemList :items="orderDetail.data.items" />
                </div>
            </div>

            <div class="overflow-hidden bg-white mb-2 px-8 py-4">
                <h2 class="text-2xl font-bold mb-6 mt-2">Info Pesanan</h2>
                <div class="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center">
                    <OrderInfo :name="orderDetail.data.customer_name" :num="orderDetail.data.customer_phone"
                        :price="orderDetail.data.price_agreement" :date="orderDetail.data.completion_date" />
                </div>
            </div>

            <div class="overflow-hidden bg-white mb-2 px-8 py-4">
                <div class="flex justify-between items-center mb-6 mt-2">
                    <h2 class="text-2xl font-bold">Daftar Transaksi</h2>
                    <div class="flex items-center">
                        <button @click="handleClick" class="bg-green-700 text-white p-2 rounded text-sm">
                            + Tambah Transaksi
                        </button>
                    </div>
                </div>
                <div class="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center">
                    <TransactionList v-if="orderDetail.transactions.data.length"
                        :transactions="orderDetail.transactions.data" />
                    <div v-else class="bg-white w-full rounded-lg p-6 text-center">
                        <p class="text-gray-600">Belum ada transaksi pada pesanan ini</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
