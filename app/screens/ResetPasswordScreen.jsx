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
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import apiInstance from '@/api/apiInstance'; // TODO: Uncomment khi implement API

const ResetPasswordScreen = () => {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const validatePasswords = () => {
        if (!newPassword) {
            setError('Vui lòng nhập mật khẩu mới');
            return false;
        }

        if (!confirmPassword) {
            setError('Vui lòng xác nhận mật khẩu');
            return false;
        }

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return false;
        }

        if (newPassword.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validatePasswords()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            // TODO: Implement API call với backend
            // const response = await apiInstance.post('/auth/reset-password', {
            //     token: token, // Token từ link trong email
            //     newPassword: newPassword,
            // });

            // TODO: Handle API response
            // if (response.data.success) {
            //     router.replace('screens/LoginScreen');
            // } else {
            //     setError(response.data.message || 'Có lỗi xảy ra');
            // }

            // TEMPORARY: Simulate API call
            setTimeout(() => {
                setLoading(false);
                router.replace('screens/LoginScreen');
            }, 1500);
        } catch (err) {
            setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.container}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.keyboardAvoidingView}
                    >
                        <View style={styles.content}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Đặt lại mật khẩu</Text>
                                <Text style={styles.subtitle}>
                                    Nhập mật khẩu mới của bạn
                                </Text>
                            </View>

                            <View style={styles.formContainer}>
                                {/* New Password Input */}
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons
                                            name="lock-closed-outline"
                                            size={20}
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Mật khẩu mới"
                                            placeholderTextColor="#FFFFFF"
                                            value={newPassword}
                                            onChangeText={(text) => {
                                                setNewPassword(text);
                                                setError('');
                                            }}
                                            secureTextEntry={!showNewPassword}
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.eyeIcon}
                                            onPress={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            <Ionicons
                                                name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                                                size={20}
                                                color="#FFFFFF"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Confirm Password Input */}
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons
                                            name="lock-closed-outline"
                                            size={20}
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Xác nhận mật khẩu"
                                            placeholderTextColor="#FFFFFF"
                                            value={confirmPassword}
                                            onChangeText={(text) => {
                                                setConfirmPassword(text);
                                                setError('');
                                            }}
                                            secureTextEntry={!showConfirmPassword}
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            style={styles.eyeIcon}
                                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            <Ionicons
                                                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                                                size={20}
                                                color="#FFFFFF"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {error && (
                                    <Text style={styles.errorText}>{error}</Text>
                                )}

                                <TouchableOpacity
                                    style={[styles.button, loading && { opacity: 0.7 }]}
                                    onPress={handleSubmit}
                                    disabled={loading}
                                >
                                    <Text style={styles.buttonText}>
                                        {loading ? 'Đang xử lý...' : 'Xác nhận'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
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
    },
    keyboardAvoidingView: {
        flex: 1,
        paddingHorizontal: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 40,
    },
    backButton: {
        padding: 8,
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
        marginBottom: 16,
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
    eyeIcon: {
        paddingHorizontal: 12,
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
        marginTop: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ResetPasswordScreen;