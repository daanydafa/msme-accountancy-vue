<template>
    <FormLayout>
        <Loading v-if="isLoading" />
        <FormInput v-else context="order" :fields="staticFields" :dynamic-fields="dynamicItemFields"
            :validator="validator" @submit="handleSubmit" />
    </FormLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormLayout from '@/layouts/FormLayout.vue'
import FormInput from '@/components/FormInput.vue'
import Loading from '@/components/Loading.vue'
import { createOrder } from '@/services/api'

const router = useRouter()
const isLoading = ref(false)

const staticFields = [
    { name: 'customer_name', label: 'Nama Pelanggan', type: 'text' },
    { name: 'customer_phone', label: 'Nomor Telepon', type: 'tel' },
    { name: 'completion_date', label: 'Tanggal Selesai', type: 'date' }
]

const dynamicItemFields = [
    { name: 'item_name', label: 'Nama Item', type: 'text' },
    { name: 'quantity', label: 'Kuantitas', type: 'number' },
    { name: 'items_price', label: 'Harga Item', type: 'number' }
]

const validator = (values, items) => {
    const errors = {}

    if (!values.customer_name) errors.customer_name = 'Nama pelanggan wajib diisi'
    if (!values.customer_phone) errors.customer_phone = 'Nomor telepon wajib diisi'
    if (!values.completion_date) errors.completion_date = 'Tanggal selesai wajib diisi'

    if (!items || items.length === 0) {
        errors.items = 'Minimal satu item harus ditambahkan'
    } else {
        items.forEach((item, index) => {
            if (!item.item_name) errors[`item_${index}_name`] = 'Nama item wajib diisi'
            if (!item.quantity) errors[`item_${index}_quantity`] = 'Kuantitas wajib diisi'
            if (!item.items_price) errors[`item_${index}_price`] = 'Harga item wajib diisi'
        })
    }

    return errors
}

const handleSubmit = async (data) => {
    data.completion_date = Math.floor(new Date(data.completion_date).getTime() / 1000)
    try {
        isLoading.value = true
        const response = await createOrder(data)
        router.back()
        setTimeout(() => {
            router.push(`/orders/${response.id}`)
        }, 100)
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
}
</script>