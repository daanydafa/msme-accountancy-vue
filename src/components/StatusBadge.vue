<template>
    <span :class="[
        'inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset',
        config.bgColor,
        config.textColor,
        config.ringColor
    ]">
        {{ config.label }}
    </span>
</template>

<script setup>
const props = defineProps({
    status: {
        type: String,
        required: true
    }
});

const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
        case 'pending':
            return {
                bgColor: 'bg-red-50',
                textColor: 'text-red-700',
                ringColor: 'ring-red-600/10',
                label: 'Pending'
            };
        case 'processing':
            return {
                bgColor: 'bg-yellow-50',
                textColor: 'text-yellow-800',
                ringColor: 'ring-yellow-600/20',
                label: 'Proses Produksi'
            };
        case 'finished':
            return {
                bgColor: 'bg-green-50',
                textColor: 'text-green-700',
                ringColor: 'ring-green-600/20',
                label: 'Selesai'
            };
        case 'income':
            return {
                bgColor: 'bg-green-50',
                textColor: 'text-green-700',
                ringColor: 'ring-green-600/20',
                label: 'Uang Masuk'
            };
        case 'expense':
            return {
                bgColor: 'bg-red-50',
                textColor: 'text-red-700',
                ringColor: 'ring-red-600/10',
                label: 'Uang Keluar'
            };
        default:
            return {
                bgColor: 'bg-gray-50',
                textColor: 'text-gray-700',
                ringColor: 'ring-gray-600/20',
                label: 'Unknown'
            };
    }
};

const config = getStatusConfig(props.status);
</script>