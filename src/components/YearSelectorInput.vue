<template>
    <div class="flex items-center gap-2">
        <label class="text-gray-700 font-medium">Tahun:</label>
        <select :value="selectedYear" @change="e => emit('update:year', parseInt(e.target.value, 10))"
            class="rounded-md border border-gray-300 shadow-sm p-2 w-28 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            <option v-for="year in yearOptions" :key="year" :value="year">
                {{ year }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    selectedYear: {
        type: Number,
        required: true
    },
    minYear: {
        type: Number,
        default: 2000
    },
    maxYear: {
        type: Number,
        default: 2100
    }
});

const emit = defineEmits(['update:year']);

const yearOptions = computed(() =>
    Array.from({ length: props.maxYear - props.minYear + 1 }, (_, i) => props.minYear + i)
);
</script>