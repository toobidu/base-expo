import axios from 'axios';
import AuthService from '../auth/auth';

const BASE_URL = ''; //todo: thay bằng api

const apiInstance = {
    async get(endpoint, config = {}) {
        return this.request(endpoint, 'GET', null, config);
    },

    async post(endpoint, data, config = {}) {
        return this.request(endpoint, 'POST', data, config);
    },

    async put(endpoint, data, config = {}) {
        return this.request(endpoint, 'PUT', data, config);
    },

    async delete(endpoint, config = {}) {
        return this.request(endpoint, 'DELETE', null, config);
    },

    async request(endpoint, method, data = null, config = {}) {
        let isRetrying = false;
        const token = await AuthService.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...config.headers,
        };

        const url = `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

        try {
            const response = await axios({ method, url, headers, data, ...config });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401 && !isRetrying) {
                isRetrying = true;
                try {
                    const newToken = await AuthService.refreshToken();
                    headers.Authorization = `Bearer ${newToken}`;
                    const retryResponse = await axios({ method, url, headers, data, ...config });
                    return retryResponse.data;
                } catch (refreshError) {
                    console.error('Không thể refresh token:', refreshError);
                    throw refreshError;
                }
            }
            console.error(`Lỗi khi gọi API ${method} ${endpoint}:`, error.response?.data || error.message);
            throw error;
        }
    },
};

export default apiInstance;