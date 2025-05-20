<template>
    <div class="w-full bg-white rounded-xl shadow-md p-4">
        <div class="max-w-sm mx-auto">
            <Doughnut :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

// Props
const props = defineProps({
    percentage: {
        type: Object,
        default: () => ({
            incomePercentage: 0,
            productionPercentage: 0,
            transportPercentage: 0,
            legalPercentage: 0,
            packagingPercentage: 0
        })
    }
})

const categories = ['Income', 'Production', 'Transport', 'Legal', 'Packaging']
const colors = ['#0088FE', '#FF8042', '#FF4D4D', '#E4A11B', '#FB6944']

const filteredData = computed(() => {
    const values = [
        props.percentage.incomePercentage,
        props.percentage.productionPercentage,
        props.percentage.transportPercentage,
        props.percentage.legalPercentage,
        props.percentage.packagingPercentage
    ]

    return values.map((value, index) => ({
        label: categories[index],
        value,
        color: colors[index]
    })).filter(item => item.value > 0)
})

const chartData = computed(() => ({
    labels: filteredData.value.map(item => item.label),
    datasets: [{
        data: filteredData.value.map(item => item.value),
        backgroundColor: filteredData.value.map(item => item.color),
        borderColor: filteredData.value.map(() => '#ffffff'),
        borderWidth: 2
    }]
}))

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'right'
        },
        title: {
            display: false,
        }
    },
    cutout: '60%'
}
</script>