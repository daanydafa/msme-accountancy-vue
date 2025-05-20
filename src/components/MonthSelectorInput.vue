<template>
    <div class="flex items-center gap-2">
        <label class="text-gray-700 font-medium">Bulan:</label>
        <select :value="selectedMonth" @change="e => emit('update:month', e.target.value)"
            class="rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            <option v-for="month in months" :key="month.value" :value="month.value">
                {{ month.label }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    selectedMonth: {
        type: String,
        required: true
    }
});
const emit = defineEmits(['update:month']);

const months = computed(() =>
    [...Array(12)].map((_, i) => ({
        value: String(i + 1).padStart(2, '0'),
        label: new Date(0, i).toLocaleString('id-ID', { month: 'long' })
    }))
);
</script>