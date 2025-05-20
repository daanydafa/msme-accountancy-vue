<template>
    <div>
      <div :class="['overflow-x-auto rounded-lg', isMinimize ? 'max-h-96' : '']">
        <table class="min-w-full overflow-auto rounded-lg bg-white">
          <thead class="bg-white text-gray-600 sticky top-0 shadow-md">
            <tr>
              <th class="p-4 text-left text-base font-medium uppercase tracking-wider">Tanggal</th>
              <th class="p-4 text-left text-base font-medium uppercase tracking-wider">Jumlah</th>
              <th class="p-4 text-left text-base font-medium uppercase tracking-wider">Tipe</th>
              <th class="p-4 text-left text-base font-medium uppercase tracking-wider">Kategori</th>
              <th class="p-4 text-left text-base font-medium uppercase tracking-wider">Oleh</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr
              v-for="transaction in transactions"
              :key="transaction.id"
              @click="handleClick(transaction)"
              class="hover:bg-gray-50 cursor-pointer"
            >
              <td class="p-4 whitespace-nowrap text-gray-900">
                {{ transaction.date }}
              </td>
              <td
                class="p-4 whitespace-nowrap text-end"
                :class="getTextColor(transaction.type)"
              >
                {{ formatCurrency(transaction.amount) }}
              </td>
              <td class="p-4 whitespace-nowrap text-gray-900 capitalize">
                {{ transaction.type === 'expense' ? transaction.detailed_type : 'Income' }}
              </td>
              <td class="p-4 whitespace-nowrap text-gray-900 capitalize">
                {{ transaction.category || '-' }}
              </td>
              <td class="p-4 whitespace-nowrap text-gray-900 capitalize">
                {{ transaction.user_name || '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <TransactionDetailCard
        v-if="selectedTransaction"
        :transaction="selectedTransaction"
        @close="selectedTransaction = null"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import TransactionDetailCard from './TransactionDetailCard.vue';
  
  const props = defineProps({
    transactions: {
      type: Array,
      default: () => [],
    },
    isMinimize: {
      type: Boolean,
      default: false,
    },
  });
  
  const selectedTransaction = ref(null);
  
  const handleClick = (transaction) => {
    selectedTransaction.value = transaction;
  };
  
  const getTextColor = (type) => {
    return type === 'income' ? 'text-green-700' : 'text-red-700';
  };
  
  const formatCurrency = (value) => {
    if (!value) return 'Rp0';
    return 'Rp' + value.toLocaleString('id-ID');
  };
  </script>
  