<template>
    <div class="mx-auto max-w-7xl pt-24">
        <div class="space-y-10 mx-10 text-xl">
            <section class="bg-white rounded-xl shadow mt-10">
                <ProfileDataCard v-if="userData" :data="userData.data" />
            </section>

            <section class="overflow-hidden bg-white rounded-xl shadow">
                <h2 class="text-md font-medium uppercase tracking-wide text-gray-900 p-4 border-b">
                    Daftar Pengeluaran Oleh Anda
                </h2>
                <template v-if="userData?.transactions?.data?.length">
                    <TransactionTable :transactions="userData.transactions.data" :minimize="false" />
                </template>
                <template v-else>
                    <div class="bg-white rounded-lg shadow p-6 text-center">
                        <p class="text-gray-600">Belum ada transaksi oleh anda</p>
                    </div>
                </template>
            </section>
        </div>

        <div v-if="isLoading"
            class="min-h-screen flex justify-center items-center fixed inset-0 bg-white bg-opacity-75 z-50">
            <Loading />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserData } from '@/services/api'
import TransactionTable from '@/components/TransactionTable.vue'
import ProfileDataCard from '@/components/ProfileDataCard.vue'
import Loading from '@/components/Loading.vue'

const userData = ref(null)
const isLoading = ref(true)
const error = ref(null)

const fetchOrderDetail = async () => {
    isLoading.value = true
    try {
        const data = await getUserData()
        console.log(data)
        userData.value = data
    } catch (err) {
        error.value = err.message || 'Failed to fetch order detail'
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchOrderDetail()
})
</script>