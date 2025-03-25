import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStyles } from '@/hooks/styles/useAuthStyles';
import { useAuthForm } from '@/hooks/auth/useAuthForm';
import WibuRegister from "@/app/assets/images/wibu/WibuRegister";

const RegisterScreen = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const styles = useAuthStyles('register');
    const { formData, error, loading, updateField, handleSubmit } = useAuthForm('register');

    const goBack = () => router.back();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={goBack} style={styles.backButton}>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <Path d="M19 12H5M12 19l-7-7 7-7" />
                        </Svg>
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Đăng ký</Text>
                    </View>
                </View>

                <View style={styles.welcomeContainer}>
                    <WibuRegister width={171} height={171} />
                    <Text style={styles.welcomeTitle}>Bắt đầu hành trình mới!</Text>
                    <Text style={styles.welcomeSubtitle}>SoundClone sẽ đồng hành cùng bạn</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Ionicons
                                name="mail-outline"
                                size={20}
                                style={styles.inputIcon}
                                color="#666"
                            />
                            <TextInput
                                style={styles.input}
                                keyboardType="email-address"
                                placeholderTextColor="#666"
                                placeholder="Nhập email của bạn"
                                value={formData.email}
                                onChangeText={(text) => updateField('email', text)}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Ionicons
                                name="person-outline"
                                size={20}
                                style={styles.inputIcon}
                                color="#666"
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#666"
                                placeholder="Nhập tên người dùng"
                                value={formData.username}
                                onChangeText={(text) => updateField('username', text)}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.passwordContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                style={styles.inputIcon}
                                color="#666"
                            />
                            <TextInput
                                style={styles.passwordInput}
                                secureTextEntry={!showPassword}
                                placeholderTextColor="#666"
                                placeholder="Nhập mật khẩu"
                                value={formData.password}
                                onChangeText={(text) => updateField('password', text)}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.passwordContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                style={styles.inputIcon}
                                color="#666"
                            />
                            <TextInput
                                style={styles.passwordInput}
                                secureTextEntry={!showConfirmPassword}
                                placeholderTextColor="#666"
                                placeholder="Xác nhận mật khẩu"
                                value={formData.confirmPassword}
                                onChangeText={(text) => updateField('confirmPassword', text)}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Ionicons
                                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {error && (
                        <Text style={styles.errorText}>{error}</Text>
                    )}

                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            loading && { opacity: 0.7 }
                        ]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text style={styles.submitButtonText}>
                            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.disclaimer}>
                        Bằng cách đăng ký, bạn đồng ý với các Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;