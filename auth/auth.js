import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'jwt_token';

const AuthService = {
    async saveToken(token) {
        try {
            await SecureStore.setItemAsync(TOKEN_KEY, token);
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

    async removeToken() {
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
        } catch (error) {
            console.error('Lỗi khi xóa token:', error);
            throw error;
        }
    },
};

export default AuthService;