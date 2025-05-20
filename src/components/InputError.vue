<template>
    <p v-if="message" v-bind="attrs" :class="['text-sm text-red-600', attrs.class]">
        {{ message }}
    </p>
</template>

<script setup>
import { defineProps, useAttrs } from 'vue';

const props = defineProps({
    message: String
});

const attrs = useAttrs();
</script>

<style scoped></style>