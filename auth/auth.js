import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const TOKEN_KEY = 'jwt_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const AuthService = {
    async saveToken(token, refreshToken = null) {
        try {
            await SecureStore.setItemAsync(TOKEN_KEY, token);
            if (refreshToken) {
                await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
            }
        } catch (error) {
            console.error('Lỗi khi lưu token:', error);
            throw error;
        }
    },

    async getToken() {
        try {
            return await SecureStore.getItemAsync(TOKEN_KEY);
        } catch (error) {
            console.error('Lỗi khi lấy token:', error);
            return null;
        }
    },

    async getRefreshToken() {
        try {
            return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
        } catch (error) {
            console.error('Lỗi khi lấy refresh token:', error);
            return null;
        }
    },

    async removeToken() {
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        } catch (error) {
            console.error('Lỗi khi xóa token:', error);
            throw error;
        }
    },

    async isAuthenticated() {
        const token = await this.getToken();
        return !!token;
    },

    async refreshToken() {
        const refreshToken = await this.getRefreshToken();
        if (!refreshToken) throw new Error('Không có refresh token');

        //todo: call api
        try {
            const response = await axios.post('', {
                refreshToken,
            });
            const { token, newRefreshToken } = response.data;
            await this.saveToken(token, newRefreshToken);
            return token;
        } catch (error) {
            console.error('Refresh token thất bại:', error);
            throw error;
        }
    },

    async logout() {
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
            console.log('Đăng xuất thành công');
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
            throw error;
        }
    },
};

export default AuthService;