<template>
    <LoginLayout>
        <form @submit.prevent="submit">
            <div>
                <InputLabel for="email" value="Email" />
                <TextInput id="email" type="email" name="email" class="mt-1 block w-full" v-model="data.email"
                    autocomplete="username" :autofocus="true" />
                <InputError :message="errors.email" />
            </div>

            <div class="mt-4 space-y-2">
                <InputLabel for="password" value="Password" />
                <TextInput id="password" type="password" name="password" class="mt-1 block w-full"
                    autocomplete="current-password" v-model="data.password" />
                <InputError :message="errors.password" />
            </div>

            <div v-if="errors.general" class="mt-4 text-red-500">
                {{ errors.general }}
            </div>

            <div class="mt-4 flex items-center justify-end">
                <PrimaryButton :disabled="processing">Log in</PrimaryButton>
            </div>
        </form>
    </LoginLayout>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../contexts/authContext';

import TextInput from '../components/TextInput.vue';
import InputLabel from '../components/InputLabel.vue';
import InputError from '../components/InputError.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import LoginLayout from '../layouts/LoginLayout.vue';

const router = useRouter();
const { login } = useAuth();

const data = reactive({
    email: '',
    password: ''
})

const errors = reactive({})
const processing = ref(false)

onUnmounted(() => {
    data.value.password = ''
})

const submit = async () => {
    processing.value = true
    Object.keys(errors).forEach(key => delete errors[key]);

    try {
        await login(data);
        router.push('/');
    } catch (error) {
        errors.general = error.message;
    }
}
</script>

<style scoped></style>