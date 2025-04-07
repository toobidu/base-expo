import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthForm } from '@/hooks/auth/useAuthForm';
import { useAuthStyles } from '@/hooks/styles/useAuthStyles';
import WibuLogin from '@/app/assets/images/wibu/WibuLogin';
import GoogleIcon from '@/app/assets/icons/GoogleIcon';
import useRefs from "@/app/hooks/useRef";

const LoginScreen = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const { formData, error, loading, updateField, handleSubmit } = useAuthForm('login');
    const styles = useAuthStyles('login');
    const goBack = () => router.push('screens/WelcomeScreen');

    const {refs, scrollToInput} = useRefs();

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header cố định */}
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M19 12H5M12 19l-7-7 7-7" />
                    </Svg>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Đăng nhập</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView
                    ref={(ref) => (refs.scrollView = ref)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.logoContainer}>
                        <WibuLogin width={170} height={170} />
                    </View>

                    <View style={styles.content}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Chào mừng trở lại!</Text>
                            <Text style={styles.subtitle}>SoundClone rất nhớ bạn</Text>
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
                                        ref={(ref) => (refs.inputs.email = ref)}
                                        style={styles.input}
                                        keyboardType="email-address"
                                        placeholderTextColor="#FFFFFF"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChangeText={(text) => updateField('email', text)}
                                        onFocus={() => {
                                            console.log('Email input focused');
                                            scrollToInput(refs.inputs.email);
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    <Ionicons
                                        name="lock-closed-outline"
                                        size={20}
                                        style={styles.inputIcon}
                                    />
                                    <TextInput
                                        ref={(ref) => (refs.inputs.password = ref)}
                                        style={styles.passwordInput}
                                        secureTextEntry={!showPassword}
                                        placeholderTextColor="#FFFFFF"
                                        placeholder="Mật khẩu"
                                        value={formData.password}
                                        onChangeText={(text) => updateField('password', text)}
                                        onFocus={() => scrollToInput(refs.inputs.password)}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeIcon}
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        <Ionicons
                                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                            size={20}
                                            color="#FFFFFF"
                                        />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    style={styles.forgotPasswordContainer}
                                    onPress={() => router.push('screens/ForgotPasswordScreen')}
                                >
                                    <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                                </TouchableOpacity>
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
                                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                                </Text>
                            </TouchableOpacity>

                            <View style={styles.dividerContainer}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>Hoặc</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            <TouchableOpacity style={styles.googleButton}>
                                <GoogleIcon width={20} height={20} style={styles.googleIcon} />
                                <Text style={styles.googleButtonText}>Tiếp tục với Google</Text>
                            </TouchableOpacity>

                            <View style={styles.registerContainer}>
                                <Text style={styles.registerText}>Bạn chưa có tài khoản? </Text>
                                <TouchableOpacity onPress={() => router.push('screens/RegisterScreen')}>
                                    <Text style={styles.registerLink}>Đăng ký ngay</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;
