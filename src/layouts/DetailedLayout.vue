<template>
    <div class="min-h-full bg-gray-100">
        <header class="bg-white border-b border-gray-400 fixed w-full top-0 z-10">
            <div @click="handleClick" class="flex mx-auto max-w-7xl p-8 items-center cursor-pointer">
                <ChevronRight class="rotate-180 w-9 h-fit mr-2" />
                <h1 class="text-3xl font-bold tracking-wide text-gray-900">
                    {{ pageTitle }}
                </h1>
            </div>
        </header>
        <main class="min-h-screen">
            <div class="max-w-7xl mx-auto">
                <router-view />
            </div>
        </main>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronRight } from '@/assets/Icons.vue'

const router = useRouter()
const route = useRoute()

const pageTitle = ref('Detail')

const routeTitles = {
    '/orders/:id': 'Detail Pesanan',
    '/profile': 'Profil Pengguna',
    '/orders/:id/add-transaction': 'Tambah Transaksi',
    '/orders/add': 'Buat Pesanan Baru'
}

const getPageTitle = (path) => {
    for (const [pattern, title] of Object.entries(routeTitles)) {
        const regexPattern = pattern.replace(/:\w+/g, '[^/]+').replace(/\//g, '\\/')
        const regex = new RegExp(`^${regexPattern}$`)
        console.log(regex);
        if (regex.test(path)) return title
    }
}

const handleClick = () => {
    router.back()
}

const updatePageTitle = () => {
    console.log(route.path);
    pageTitle.value = getPageTitle(route.path)
    console.log(pageTitle.value);
}

onMounted(updatePageTitle)

watch(() => route.path, updatePageTitle)
</script>