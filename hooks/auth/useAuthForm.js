import { useState } from 'react';
// import apiInstance from '@/api/apiInstance';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export const useAuthForm = (type = 'login') => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const updateField = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        if (error) setError('');
    };

    const validateForm = () => {
        // Valid email
        if (!formData.email) {
            setError('Email không được để trống');
            return false;
        }

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Email không hợp lệ');
            return false;
        }

        // valid username
        if (type === 'register' && !formData.username) {
            setError('Tên người dùng không được để trống');
            return false;
        }

        // Valid password
        if (!formData.password) {
            setError('Mật khẩu không được để trống');
            return false;
        }

        // Với đăng kí thì valid confirm password
        if (type === 'register') {
            if (!formData.confirmPassword) {
                setError('Vui lòng xác nhận mật khẩu');
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Mật khẩu xác nhận không khớp');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async () => {
        try {
            if (!validateForm()) return;

            setLoading(true);

            // TODO: Implement API call to authenticate user
            // const endpoint = type === 'login' ? '/auth/login' : '/auth/register';
            // const response = await apiInstance.post(endpoint, {
            //     email: formData.email,
            //     password: formData.password,
            //     ...(type === 'register' && { username: formData.username })
            // });

            // Simulate API call with timeout
            setTimeout(() => {
                // Simulate successful login/register
                if (type === 'login') {
                    // For login, navigate to Optional screen
                    router.push('screens/Optional');
                } else {
                    // For register, navigate to Optional screen as well
                    router.push('screens/Optional');
                }

                // TODO: Store user token when real API is implemented
                // if (response.data.success) {
                //     await AsyncStorage.setItem('userToken', response.data.token);
                // }

                setLoading(false);
            }, 1500); // Simulate network delay

            return; // Early return to prevent the finally block from executing too soon
        } catch (err) {
            setError(err.response?.data?.message || 'Đã có lỗi xảy ra');
            setLoading(false);
        }
    };

    const clearForm = () => {
        setFormData({
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        });
        setError('');
    };

    return {
        formData,
        error,
        loading,
        updateField,
        handleSubmit,
        clearForm
    };
};