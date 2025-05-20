<template>
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen bg-gray-100">
        <Loading />
    </div>

    <div v-else-if="error" class="mx-auto max-w-7xl bg-red-100 py-10 text-center min-h-screen">
        <p class="text-red-600 text-lg">{{ error }}</p>
    </div>

    <div v-else class="min-h-screen bg-gray-200 pt-40 pb-20">
        <div class="mx-auto max-w-7xl py-10">
            <div class="space-y-5 mx-10 text-xl">
                <h2 class="text-2xl font-bold uppercase tracking-wide text-gray-900">
                    Sebaran Arus Kas Bulan Ini
                </h2>
                <div v-if="transactions">
                    <DonutChart :percentage="data.percentage" />
                </div>
                <div v-else class="bg-white rounded-lg shadow p-6 text-center">
                    <p class="text-gray-600">Belum ada transaksi pada bulan ini</p>
                </div>

                <h2 class="text-2xl font-bold uppercase tracking-wide text-gray-900">
                    Pesanan Dalam Proses
                </h2>
                <OrderList v-if="orderList.length" :orders="orderList" />
                <div v-else class="bg-white rounded-lg shadow p-6 text-center">
                    <p class="text-gray-600">Belum ada pesanan dalam proses</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, onMounted, watch, inject } from 'vue';
import OrderList from '@/components/OrderList.vue';
import DonutChart from '@/components/DonutChart.vue';
import Loading from '@/components/Loading.vue';
import { ongoingOrders, showReportsByMonth } from '@/services/api';

const currentMonth = inject('currentMonth');
const currentYear = inject('currentYear');

const monthlyReports = ref(null);
const orderList = ref([]);
const error = ref(null);
const isLoading = ref(true);

const fetchReportData = async () => {
    isLoading.value = true;
    try {
        console.log(currentMonth, currentYear);
        console.log(isLoading);

        monthlyReports.value = await showReportsByMonth(currentMonth, currentYear);
        orderList.value = await ongoingOrders();
    } catch (err) {
        error.value = err.message || 'Gagal mengambil data laporan';
        console.error('Error fetching reports:', err);
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchReportData);

watch([currentMonth, currentYear], fetchReportData);

const data = computed(() => monthlyReports.value?.data || {});
const transactions = computed(() => monthlyReports.value?.transactions);
</script>