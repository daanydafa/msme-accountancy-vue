<template>
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen bg-gray-100">
        <Loading />
    </div>

    <div v-else-if="error" class="mx-auto max-w-7xl bg-red-100 py-10 text-center min-h-screen">
        <p class="text-red-600 text-lg">{{ error }}</p>
    </div>

    <div v-else class="min-h-screen bg-gray-200 pt-40 pb-20">
        <div class="mx-auto max-w-7xl py-10 tracking-wide text-xl text-gray-900">
            <div class="space-y-5 mx-10">
                <div class="flex justify-end gap-4">
                    <MonthSelectorInput :selectedMonth="month"
                        @update:month="newMonth => router.push(`/reports/${newMonth}/${year}`)" />
                    <YearSelectorInput :selectedYear="year" @update:year="newYear =>
                        router.push(`/reports/${month}/${newYear}`)" />
                </div>


                <div v-if="!monthlyReports?.transactions" class="bg-white rounded-lg shadow p-6 text-center">
                    <p class="text-gray-600">
                        Belum ada transaksi pada bulan {{ monthName }} tahun {{ year }}
                    </p>
                </div>

                <template v-else>
                    <div class="grid grid-cols-2 gap-4">
                        <AmountSummary type="income" :amount="monthlyReports.data.totalIncome"
                            :qty="monthlyReports.data.incomeCount" />
                        <AmountSummary type="expense" :amount="monthlyReports.data.totalExpense"
                            :qty="monthlyReports.data.expenseCount" />
                    </div>

                    <section class="bg-white rounded-lg shadow">
                        <h2 class="text-md font-medium uppercase p-4 border-b">Sebaran Arus Kas</h2>
                        <DonutChart :percentage="monthlyReports.data.percentage" />
                    </section>

                    <section class="bg-white rounded-lg shadow">
                        <h2 class="text-md font-medium uppercase p-4 border-b">Daftar Transaksi</h2>
                        <TransactionTable :transactions="monthlyReports.transactions.data" :isMinimize="true" />
                    </section>

                    <section class="bg-white rounded-lg shadow">
                        <h2 class="text-md font-medium uppercase p-4 border-b">Ringkasan Reimbursement</h2>
                        <ReimbursmentSummary :reimbursements="monthlyReports.data.reimbursements"
                            @update="fetchReportData" />
                    </section>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AmountSummary from '@/components/AmountSummary.vue';
import TransactionTable from '@/components/TransactionTable.vue';
import ReimbursmentSummary from '@/components/ReimbursementSummary.vue';
import DonutChart from '@/components/DonutChart.vue';
import MonthSelectorInput from '@/components/MonthSelectorInput.vue';
import YearSelectorInput from '@/components/YearSelectorInput.vue';
import Loading from '@/components/Loading.vue';

import { showReportsByMonth } from '@/services/api';

const router = useRouter();
const route = useRoute();
const month = ref(route.params.month);
const year = ref(route.params.year);

const monthlyReports = ref(null);
const isLoading = ref(true);
const error = ref(null);

const fetchReportData = async () => {
    isLoading.value = true;
    error.value = null;
    try {
        const data = await showReportsByMonth(month.value, year.value);
        monthlyReports.value = data;
    } catch (err) {
        error.value = err.message || 'Gagal mengambil data laporan';
        console.error('Error fetching reports:', err);
    } finally {
        isLoading.value = false;
    }
};

const handleChangeYear = (newYear) => {
    if (newYear >= 2000 && newYear <= 2100) {
        router.push(`/reports/${month.value}/${newYear}`);
    }
};

const monthName = computed(() =>
    new Date(0, parseInt(month.value) - 1).toLocaleString('id-ID', { month: 'long' })
);

watch(
    () => route.params,
    () => {
        month.value = route.params.month;
        year.value = route.params.year;
        fetchReportData();
    }
);

onMounted(fetchReportData);
</script>