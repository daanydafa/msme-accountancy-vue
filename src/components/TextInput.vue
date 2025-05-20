<template>
    <input :type="type" :class="['w-full p-4 border rounded-xl text-lg', className]" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)" :autofocus="isFocused" v-bind="$attrs" />
</template>

<script setup>
defineProps({
    modelValue: String,
    type: {
        type: String,
        default: 'text'
    },
    className: {
        type: String,
        default: ''
    },
    isFocused: {
        type: Boolean,
        default: false
    }
})

defineEmits(['update:modelValue'])
</script>