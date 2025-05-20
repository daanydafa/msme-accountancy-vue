import axios from 'axios'

class AuthService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:8000/api'
    })

    this.axiosInstance.interceptors.request.use((config) => {
      const token = this.getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { response, config } = error;
        // Cek 401
        if (response?.status === 401) {
          // Jika ini request logout, jangan panggil logout() lagi:
          if (config.url.endsWith('/logout')) {
            this.clearSession();
            // Biarkan caller menangani error 401 logout jika perlu
            return Promise.reject(error);
          }

          // Untuk semua endpoint lain: lakukan logout + redirect
          await this.logout();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    )
  }

  async login(credentials) {
    const response = await this.axiosInstance.post('/login', credentials)
    const { token, name } = response.data.data
    localStorage.setItem('token', token)
    localStorage.setItem('name', name)
    return response.data
  }

  async logout() {
    try {
      if (this.getToken()) {
        await this.axiosInstance.post('/logout')
      }
    } finally {
      this.clearSession()
    }
  }

  getToken() {
    return localStorage.getItem('token')
  }

  clearSession() {
    localStorage.clear()
  }

  isAuthenticated() {
    return !!this.getToken()
  }

  get http() {
    return this.axiosInstance
  }
}

export const authService = new AuthService()
