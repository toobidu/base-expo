import AuthService from '../auth/auth';

// Cấu hình URL cơ sở của API
const BASE_URL = ''; //API server

// Hàm tạo instance API
const apiInstance = {
    // Gửi yêu cầu GET
    async get(endpoint, config = {}) {
        return this.request(endpoint, 'GET', null, config);
    },

    // Gửi yêu cầu POST
    async post(endpoint, data, config = {}) {
        return this.request(endpoint, 'POST', data, config);
    },

    // Gửi yêu cầu PUT
    async put(endpoint, data, config = {}) {
        return this.request(endpoint, 'PUT', data, config);
    },

    // Gửi yêu cầu DELETE
    async delete(endpoint, config = {}) {
        return this.request(endpoint, 'DELETE', null, config);
    },

    // Hàm thực hiện yêu cầu chung
    async request(endpoint, method, data = null, config = {}) {
        const token = await AuthService.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }), // Thêm token nếu có
            ...config.headers, // Ghi đè headers nếu người dùng cung cấp
        };

        const url = `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

        try {
            const response = await fetch(url, {
                method,
                headers,
                body: data ? JSON.stringify(data) : null,
                ...config, // Ghi đè các cấu hình khác nếu có
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Yêu cầu API thất bại: ${response.status} - ${errorText}`);
            }

            return response.json();
        } catch (error) {
            console.error(`Lỗi khi gọi API ${method} ${endpoint}:`, error);
            throw error;
        }
    },
};

export default apiInstance;