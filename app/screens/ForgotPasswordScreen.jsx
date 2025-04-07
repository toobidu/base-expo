import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import apiInstance from '@/api/apiInstance'; // TODO: Uncomment khi implement API

const ForgotPasswordScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const goBack = () => router.back();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const resetPassword = async () => {
        // Client-side validation
        if (!email) {
            setError('Email không được để trống');
            return;
        }

        if (!validateEmail(email)) {
            setError('Email không hợp lệ');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // TODO: Implement API call với backend
            // Expected API implementation:
            // const response = await apiInstance.post('/auth/forgot-password', {
            //     email: email
            // });
            
            // TODO: Handle API response
            // if (response.data.success) {
            //     // Hiển thị thông báo thành công
            //     // Có thể sử dụng Toast hoặc Alert
            //     router.back();
            // } else {
            //     setError(response.data.message || 'Có lỗi xảy ra');
            // }

            // TEMPORARY: Simulate API call
            setTimeout(() => {
                setLoading(false);
                // TODO: Thay thế bằng proper success handling
                router.back();
            }, 1500);
        } catch (err) {
            // TODO: Implement proper error handling
            // Các trường hợp lỗi có thể xảy ra:
            // - Email không tồn tại trong hệ thống
            // - Server error
            // - Network error
            setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M19 12H5M12 19l-7-7 7-7" />
                    </Svg>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View style={styles.content}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Đặt lại mật khẩu</Text>
                        <Text style={styles.subtitle}>
                            Nhập email của bạn để nhận link đặt lại mật khẩu
                        </Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <Ionicons
                                    name="mail-outline"
                                    size={20}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    keyboardType="email-address"
                                    placeholderTextColor="#FFFFFF"
                                    placeholder="Nhập email của bạn"
                                    value={email}
                                    onChangeText={(text) => {
                                        setEmail(text);
                                        setError('');
                                    }}
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {error && (
                            <Text style={styles.errorText}>{error}</Text>
                        )}

                        <TouchableOpacity
                            style={[styles.button, loading && { opacity: 0.7 }]}
                            onPress={resetPassword}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'Đang gửi...' : 'Gửi link xác nhận'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000000',
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 12,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 100,
    },
    textContainer: {
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        opacity: 0.8,
    },
    formContainer: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 24,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'white',
        height: 50,
        paddingHorizontal: 8,
    },
    inputIcon: {
        paddingHorizontal: 12,
        color: '#FFFFFF',
    },
    input: {
        flex: 1,
        color: 'white',
        height: '100%',
        fontSize: 16,
    },
    errorText: {
        color: '#ff4444',
        textAlign: 'center',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#1DB954',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ForgotPasswordScreen;