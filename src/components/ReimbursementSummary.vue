<template>
    <div v-if="reimbursements.length === 0" class="bg-white rounded-lg shadow p-6 text-center">
        <p class="text-gray-600">Belum ada data reimburse pada bulan ini</p>
    </div>
    <div v-else>
        <div class="overflow-x-auto max-h-96 rounded-lg">
            <table class="min-w-full overflow-auto rounded-lg bg-white">
                <thead class="bg-white text-gray-600 sticky top-0 shadow-md">
                    <tr>
                        <th class="p-4 text-left text-base font-medium uppercase tracking-wide">Nama</th>
                        <th class="p-4 text-left text-base font-medium uppercase tracking-wide">Banyak Transaksi</th>
                        <th class="p-4 text-left text-base font-medium uppercase tracking-wider">Jumlah</th>
                        <th class="p-4"></th>
                    </tr>
                </thead>
                <tbody class="divide-y">
                    <tr v-for="reimbursement in reimbursements" :key="reimbursement.id" class="hover:bg-gray-50">
                        <td class="p-4 whitespace-nowrap capitalize font-medium">
                            {{ reimbursement.name }}
                        </td>
                        <td class="p-4 whitespace-nowrap text-end">
                            {{ reimbursement.count }}
                        </td>
                        <td class="p-4 whitespace-nowrap font-medium text-end">
                            {{ reimbursement.amount }}
                        </td>
                        <td class="p-4 whitespace-nowrap text-xl flex justify-end">
                            <div @click="handleClick(reimbursement.transaction_list)" role="button" tabindex="0"
                                class="inline-block flex items-center cursor-pointer hover:text-blue-600 transition-colors duration-200 group">
                                <ChevronRight
                                    class="h-6 w-fit transform group-hover:translate-x-1 transition-transform duration-200" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <ReimbursementList v-if="selectedRow" :transaction-ids="selectedRow" @close="selectedRow = null"
            @update="onUpdate" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronRight } from '../assets/Icons.vue'
import ReimbursementList from './ReimbursementList.vue'

const props = defineProps({
    reimbursements: {
        type: Array,
        required: false,
        default: () => []
    },
    onUpdate: {
        type: Function,
        required: false
    }
})

const selectedRow = ref(null)

function handleClick(transactionList) {
    selectedRow.value = transactionList
}
</script>