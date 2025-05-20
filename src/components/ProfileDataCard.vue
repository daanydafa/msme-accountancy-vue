<template>
    <div class="w-full md:w-3/4 bg-base-100 bg-white rounded-xl p-10">
        <div class="flex flex-col items-center justify-center">
            <span class="text-3xl uppercase tracking-wider font-bold py-4">
                {{ data.name }}
            </span>
            <span class="text-lg text-gray-600 tracking-wide">
                {{ data.email }}
            </span>
            <p class="py-4">
                Total Reimburse:
                <strong class="text-3xl">
                    Rp{{ data.reimbursement_data.total_pending_amount }},-
                </strong>
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>