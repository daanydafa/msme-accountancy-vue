// src/contexts/useAuth.js
import { ref, provide, inject, onMounted } from 'vue';
import { authService } from '../services/authServices';

const AuthSymbol = Symbol('Auth');

export function provideAuth() {
    const user = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const initAuth = async () => {
        try {
            const token = authService.getToken();
            const name = localStorage.getItem('name');

            if (token && name) {
                user.value = { name };
            }
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    onMounted(initAuth);

    const login = async (credentials) => {
        try {
            error.value = null;
            const response = await authService.login(credentials);
            const { name } = response.data;
            user.value = { name };
            return response;
        } catch (err) {
            error.value = err.message;
            throw err;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            user.value = null;
            error.value = null;
        }
    };

    provide(AuthSymbol, {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: authService.isAuthenticated()
    });
}

export function useAuth() {
    const context = inject(AuthSymbol);
    if (!context) {
        throw new Error('useAuth must be used within a provider using provideAuth');
    }
    return context;
}
