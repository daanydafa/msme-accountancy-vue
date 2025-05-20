<template>
    <div class="flex bg-gray-900 min-h-screen items-center">
        <div
            class="flex flex-col w-3/4 md:w-1/4 justify-center mx-auto items-center bg-gray-100 rounded-xl shadow-md font-medium">
            <h2 class="flex justify-center mt-6 text-2xl font-semibold leading-tight text-gray-800">
                Login
            </h2>
            <div class="p-8 w-full">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped></style>