import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Cấu hình mặc định
const apiInstance = axios.create({
    baseURL: 'https://api.soundclone.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export default apiInstance;