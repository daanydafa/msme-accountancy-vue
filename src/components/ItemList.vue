<template>
    <template v-if="hasItems">
        <div v-for="(data, i) in items" :key="i" class="w-full md:w-3/4 bg-base-100 pb-6">
            <div class="card border border-gray-200 rounded-2xl shadow shadow-lg">
                <div class="p-8">
                    <div class="flex justify-between items-end pb-1">
                        <div class="inline-block">
                            <p class="text-gray-700 text-2xl font-bold">
                                {{ data.item_name }}
                            </p>
                            <p class="text-gray-700 text-lg">
                                x {{ data.quantity }}
                            </p>
                        </div>
                        <div class="flex flex-col items-end">
                            <p class="text-gray-700 text-lg">Biaya</p>
                            <div class="font-bold">
                                {{ data.items_price }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

    <template v-else>
        <div>Belum ada transaksi pada pesanan ini</div>
    </template>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
})

const hasItems = computed(() => props.items && props.items.length > 0)
</script>