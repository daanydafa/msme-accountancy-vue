<template>
    <div class="min-h-full">
        <!-- Top navigation -->
        <Disclosure as="nav" class="bg-gray-800 fixed w-full top-0 z-10">
            <div class="mx-auto max-w-7xl px-8 lg:px-8">
                <div class="flex h-20 items-center justify-between">
                    <div class="flex items-center">
                        <div class="shrink-0">
                            <span class="font-medium rounded-full text-stone-50 capitalize text-xl">
                                MSME ACCOUNTANCY
                            </span>
                        </div>
                    </div>
                    <div class="ml-4 flex items-center md:ml-6">
                        <Menu as="div" class="relative ml-3">
                            <MenuButton
                                class="relative gap-2 flex max-w-xs items-center rounded-full bg-gray-800 text-sm">
                                <span class="absolute -inset-1.5" />
                                <span class="sr-only">Open user menu</span>
                                <span class="font-bold rounded-full text-stone-50 capitalize">{{ userName }}</span>
                                <ChevronRight class="rotate-90 bg-white rounded-2xl" />
                            </MenuButton>
                            <MenuItems
                                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                <MenuItem v-for="item in userNavigation" :key="item.name">
                                <button @click="item.action"
                                    class="block px-4 py-2 text-xl text-gray-700 focus:bg-gray-100 focus:outline-none">
                                    {{ item.name }}
                                </button>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
        </Disclosure>

        <!-- Header -->
        <header class="bg-white shadow mt-20 fixed w-full top-0 z-9">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                    {{ activeNavItem.name || 'Dashboard' }}
                </h1>
            </div>
        </header>

        <!-- Main content -->
        <main :class="[
            'flex justify-center items-center mx-auto max-w-7xl min-h-screen',
            activeNavItem.name !== 'Orders' ? 'bg-gray-200' : 'bg-white'
        ]">
            <div class="w-full">
                <router-view />
            </div>
        </main>

        <!-- Mobile bottom navigation -->
        <Disclosure as="nav" class="block md:hidden bg-gray-800 px-28 w-full fixed bottom-0 z-10">
            <div class="flex w-full h-auto items-center justify-between">
                <button v-for="item in navigation" :key="item.name" @click="goTo(item.href)" :class="classNames(
                    item.current ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md py-2 text-sm font-medium'
                )">
                    <div class="flex flex-col items-center mx-2">
                        <component :is="item.icon" class="h-14 w-fit" />
                        {{ item.name }}
                    </div>
                </button>
            </div>
        </Disclosure>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Disclosure, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { ChevronRight, DashboardIcon, OrderIcon, ReportIcon } from '../assets/Icons.vue';
import { useAuth } from '../contexts/authContext';
import { provide } from 'vue';

const router = useRouter();
const route = useRoute();
const { logout, user } = useAuth();
const userName = ref(user?.value.name ?? '');

const now = new Date();
const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
const currentYear = now.getFullYear();

provide('currentMonth', currentMonth);
provide('currentYear', currentYear);

const baseNav = [
    { name: 'Dashboard', href: '/', icon: DashboardIcon },
    { name: 'Orders', href: '/orders', icon: OrderIcon },
    {
        name: 'Reports',
        href: `/reports/${currentMonth}/${currentYear}`,
        icon: ReportIcon,
    },
];

const navigation = computed(() => {
    return baseNav.map((item) => ({
        ...item,
        current:
            route.path === item.href ||
            (item.href !== '/' && route.path.startsWith(item.href)),
    }));
});

const activeNavItem = computed(() => {
    return navigation.value.find((item) => item.current) || baseNav[0];
});

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function goTo(href) {
    router.push(href);
}

const userNavigation = [
    { name: 'Your Profile', action: () => router.push('/profile') },
    { name: 'Sign out', action: () => logout() },
];
</script>