<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-20">
        <div class="flex flex-col bg-white rounded-t-3xl shadow-lg items-center px-5 w-full h-1/2">
            <h2 class="text-xl uppercase font-medium my-10">Daftar Transaksi Reimburse</h2>
            <button class="absolute right-0 my-10 mr-12 text-3xl uppercase text-gray-500" @click="onClose">
                X
            </button>

            <div class="w-full h-full overflow-x-auto">
                <div v-if="isLoading" class="h-full flex justify-center">
                    <Loading />
                </div>
                <table v-else class="min-w-full bg-white rounded-lg">
                    <thead class="bg-white text-gray-600 sticky top-0 shadow-md">
                        <tr class="text-left text-base font-medium uppercase tracking-wider">
                            <th class="p-2">Tanggal</th>
                            <th class="p-2">Jumlah</th>
                            <th class="p-2">Kategori</th>
                            <th class="p-2 hidden">Deskripsi</th>
                            <th class="p-2">Status</th>
                            <th class="p-2"></th>
                            <th class="p-2"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
                        <tr v-for="transaction in reimbursementList" :key="transaction.id" class="hover:bg-gray-50">
                            <td class="px-2 py-4 whitespace-nowrap">
                                {{ transaction.date }}
                            </td>
                            <td class="px-2 whitespace-nowrap text-end text-red-700">
                                {{ transaction.amount }}
                            </td>
                            <td class="px-2 whitespace-nowrap capitalize">
                                {{ transaction.category || "-" }}
                            </td>
                            <td class="px-2 whitespace-nowrap capitalize hidden">
                                {{ transaction.description || "-" }}
                            </td>
                            <td class="px-2 whitespace-nowrap capitalize">
                                {{ transaction.reimbursement_status || "-" }}
                            </td>
                            <td class="p-4 whitespace-nowrap flex justify-end">
                                <div @click="handleClick(transaction)" role="button" tabindex="0"
                                    class="inline-block flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200 group">
                                    <ChevronRight
                                        class="h-6 w-fit transform group-hover:translate-x-1 transition-transform duration-200" />
                                </div>
                            </td>
                            <td v-if="transaction.reimbursement_status === 'pending'" class="p-2 whitespace-nowrap">
                                <button @click="handleButton(transaction.id)" :disabled="loading === transaction.id"
                                    class="px-4 py-2 text-white font-medium rounded" :class="loading === transaction.id
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-600'">
                                    {{ loading === transaction.id ? "Updating..." : "Update" }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <TransactionDetailCard v-if="selectedTransaction" :transaction="selectedTransaction" context="reimburse"
                @close="selectedTransaction = null" />

            <div v-if="errors" class="text-red-500 mt-2">{{ errors }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTransactionsByList, updateReimbursementStatus } from '../services/api'
import TransactionDetailCard from './TransactionDetailCard.vue'
import Loading from './Loading.vue'
import { ChevronRight } from '../assets/Icons.vue'

const props = defineProps({
    transactionIds: {
        type: Array,
        required: true
    },
    onClose: Function,
    onUpdate: Function
})

const isLoading = ref(true)
const reimbursementList = ref([])
const errors = ref(null)
const loading = ref(null)
const selectedTransaction = ref(null)

const handleClick = (transaction) => {
    selectedTransaction.value = transaction
}

const handleButton = async (transactionId) => {
    try {
        loading.value = transactionId
        await updateReimbursementStatus({ transaction_id: transactionId })
        loading.value = null
        if (props.onUpdate) {
            await props.onUpdate()
        }
    } catch (error) {
        loading.value = null
        errors.value = error.message || 'Terjadi kesalahan saat memperbarui status.'
    }
}

onMounted(async () => {
    isLoading.value = true
    try {
        const data = await getTransactionsByList(props.transactionIds)
        reimbursementList.value = data
    } catch (err) {
        errors.value = err.message || 'Gagal mengambil data reimbursement.'
    } finally {
        isLoading.value = false
    }
})
</script>