<!-- FormInput.vue -->
<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
    fields: Array,
    dynamicFields: {
        type: Array,
        default: () => []
    },
    initialData: {
        type: Object,
        default: () => ({})
    },
    context: String,
    validator: Function,
    onSubmit: Function,
    onTypeChange: Function,
    onDetailedTypeChange: Function
});

const emit = defineEmits(['submit']);

const values = ref({ ...props.initialData });
const errors = ref({});
const dynamicValues = ref([{}]);

watch(() => values.value.type, (newType) => {
    props.onTypeChange?.(newType);
    validate();
});

watch(() => values.value.detailed_type, (newDetailedType) => {
    props.onDetailedTypeChange?.(newDetailedType);
    validate();
});

const validate = () => {
    if (props.validator) {
        errors.value = props.validator(values.value, dynamicValues.value);
    }
};

const handleChange = (e) => {
    const { name, value } = e.target;
    values.value[name] = value;
    validate();
};

const handleDynamicFieldChange = (index, e) => {
    const { name, value } = e.target;
    if (!dynamicValues.value[index]) dynamicValues.value[index] = {};
    dynamicValues.value[index][name] = value;
    validate();
};

const addDynamicField = () => {
    dynamicValues.value.push({});
};

const removeDynamicField = (index) => {
    dynamicValues.value.splice(index, 1);
};

const handleSubmit = () => {
    validate();
    if (Object.keys(errors.value).length === 0) {
        const payload = {
            ...values.value,
            ...(props.dynamicFields.length > 0 && { items: dynamicValues.value })
        };
        props.onSubmit(payload);
    }
};

const resetForm = () => {
    values.value = { ...props.initialData };
    dynamicValues.value = [{}];
};
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <div class="space-y-8 p-8">
            <div v-for="field in fields" :key="field.name">
                <label class="block mb-2 tracking-wider uppercase text-xl">{{ field.label }}</label>
                <template v-if="field.options">
                    <select :name="field.name" v-model="values[field.name]" @change="handleChange"
                        class="w-full p-4 border rounded-xl text-lg">
                        <option :value="''">Pilih {{ field.label }}</option>
                        <option v-for="option in field.options" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                </template>
                <template v-else>
                    <input :type="field.type" :name="field.name" v-model="values[field.name]" @input="handleChange"
                        class="w-full p-4 border rounded-xl text-lg" />
                </template>
                <span v-if="errors[field.name]" class="text-red-500 text-sm">{{ errors[field.name] }}</span>
            </div>

            <div v-if="dynamicFields.length > 0" class="space-y-2">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl uppercase tracking-wider font-semibold">
                        {{ context === 'transaction' ? 'Daftar Item' : 'Tambah Item' }}
                    </h3>
                    <button type="button" @click="addDynamicField" class="text-green-600 hover:text-green-800">
                        + Tambah Item
                    </button>
                </div>
                <div v-for="(item, index) in dynamicValues" :key="index" class="flex space-x-2 mb-2 items-center">
                    <div v-for="field in dynamicFields" :key="field.name" class="flex-grow">
                        <label class="block mb-2 uppercase">{{ field.label }}</label>
                        <input :type="field.type" :name="field.name" v-model="dynamicValues[index][field.name]"
                            @input="e => handleDynamicFieldChange(index, e)"
                            class="w-full p-4 border rounded-xl text-lg" required />
                    </div>
                    <div v-if="dynamicValues.length > 1" class="flex items-end">
                        <button type="button" @click="removeDynamicField(index)"
                            class="text-red-500 hover:text-red-700 mt-6">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-center items-center w-full fixed bottom-0 h-36 bg-white p-4 rounded-xl border-t-2">
            <div class="flex space-x-2 w-2/3">
                <button type="submit" class="bg-gray-900 text-2xl text-white py-2 rounded-xl flex-grow">
                    Simpan
                </button>
                <button type="button" @click="resetForm"
                    class="bg-gray-100 text-2xl text-gray-800 px-4 py-2 border rounded-xl">
                    Reset
                </button>
            </div>
        </div>
    </form>
</template>
