<template>
    <label v-bind="attrs" :class="['block font-medium text-xl md:text-sm text-gray-700', attrs.class]">
        <slot>{{ value }}</slot>
    </label>
</template>

<script setup>
import { defineProps, useAttrs } from 'vue';

const props = defineProps({
    value: String
});

const attrs = useAttrs();
</script>

<style scoped></style>