<template>
    <template v-if="!hasTransactions">
        <div className="bg-white w-full rounded-lg p-6 text-center">
            <p>Belum ada transaksi pada pesanan ini</p>
        </div>
    </template>
    <template v-else>
        <div v-for="(data, i) in transactions" :key="i" class="w-full md:w-3/4 bg-base-100 pb-6">
            <div class="card border border-gray-200 rounded-2xl shadow shadow-lg" @click="selectTransaction(data)">
                <div class="p-8">
                    <div class="flex justify-between border-b border-gray-300 pb-1">
                        <div class="inline-block">
                            <p class="text-gray-700 text-base font-bold">
                                {{ data.type === 'income' ? data.income_type : data.expanse_type }}
                            </p>
                            <p class="text-gray-700 text-sm">
                                {{ data.date }}
                            </p>
                        </div>
                        <div class="inline-block flex items-center">
                            <StatusBadge :status="data.type" />
                        </div>
                    </div>
                    <div class="flex justify-between mt-2">
                        <div class="flex font-bold items-center">
                            {{ data.description }}
                        </div>
                        <div class="flex flex-col items-end">
                            <p class="text-gray-700 text-sm">Jumlah</p>
                            <div class="font-bold">
                                {{ data.amount }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TransactionDetailCard v-if="selectedTransaction && selectedTransaction === data"
                :transaction="selectedTransaction" @close="selectedTransaction = null" />
        </div>
    </template>
</template>

<script setup>
import { ref, computed } from 'vue'
import StatusBadge from './StatusBadge.vue'
import TransactionDetailCard from './TransactionDetailCard.vue'

const props = defineProps({
    transactions: {
        type: Array,
        required: false,
        default: () => []
    }
})

const selectedTransaction = ref(null)

function selectTransaction(transaction) {
    selectedTransaction.value = transaction
}

const hasTransactions = computed(() => props.transactions && props.transactions.length > 0)

</script>