<template>
    <Loading v-if="isLoading" />
    <FormLayout v-else>
        <FormInput context="transaction" :fields="formFields" :validator="validator" @submit="handleSubmit"
            @type-change="selectedType = $event" @detailed-type-change="selectedDetailedType = $event" />
    </FormLayout>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createTransaction } from '../services/api'
import FormInput from '../components/FormInput.vue'
import FormLayout from '../layouts/FormLayout.vue'
import Loading from '../components/Loading.vue'

const route = useRoute()
const router = useRouter()
const orderId = route.params.id

const formFields = ref([])
const selectedType = ref('expense')
const selectedDetailedType = ref('operational')
const errors = reactive({})
const isLoading = ref(false)

function getDetailedTypeOptions(type) {
    return type === 'income'
        ? [
            { value: 'lunas', label: 'Lunas' },
            { value: 'dp', label: 'Down Payment' }
        ]
        : [
            { value: 'production', label: 'Produksi' },
            { value: 'operational', label: 'Operasional' }
        ]
}

function getCategoryOptions(type, detailedType) {
    if (type === 'expense' && detailedType === 'operational') {
        return [
            { value: 'transport', label: 'Transport' },
            { value: 'legal', label: 'Legal' },
            { value: 'packaging', label: 'Packaging' }
        ]
    }
    return []
}

watch([selectedType, selectedDetailedType], () => {
    const fields = [
        {
            name: 'type',
            label: 'Tipe Transaksi',
            type: 'select',
            options: [
                { value: 'expense', label: 'Uang Keluar' },
                { value: 'income', label: 'Uang Masuk' }
            ]
        },
        {
            name: 'detailed_type',
            label: 'Tipe Detail',
            type: 'select',
            options: getDetailedTypeOptions(selectedType.value)
        },
        { name: 'amount', label: 'Jumlah', type: 'number' },
        ...(
            selectedType.value === 'expense' && selectedDetailedType.value === 'operational'
                ? [{
                    name: 'category',
                    label: 'Kategori',
                    type: 'select',
                    options: getCategoryOptions(selectedType.value, selectedDetailedType.value)
                }]
                : []
        ),
        { name: 'date', label: 'Tanggal', type: 'date' },
        { name: 'description', label: 'Keterangan Transaksi', type: 'text' }
    ]
    formFields.value = fields
}, { immediate: true })

function validator(values) {
    const errs = {}
    if (!values.type) errs.type = 'Tipe transaksi wajib dipilih'
    if (!values.detailed_type) errs.detailed_type = 'Tipe detail wajib dipilih'
    if (!values.amount) errs.amount = 'Jumlah wajib diisi'
    if (
        values.type === 'expense' &&
        values.detailed_type === 'operational' &&
        !values.category
    ) {
        errs.category = 'Kategori wajib dipilih'
    }
    if (!values.date) errs.date = 'Tanggal wajib diisi'
    if (!values.description) errs.description = 'Keterangan wajib diisi'
    return errs
}

async function handleSubmit(data) {
    data.order_id = orderId
    if (data.type !== 'expense' || data.detailed_type !== 'operational') {
        delete data.category
    }
    Object.keys(errors).forEach(key => delete errors[key])
    isLoading.value = true
    try {
        await createTransaction(data)
        router.back()
        setTimeout(() => router.push(`/orders/${orderId}`), 100)
    } catch (err) {
        errors.general = err.message || err
    } finally {
        isLoading.value = false
    }
}
</script>