import React, {useState} from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import {useAuthStyles} from '@/hooks/styles/useAuthStyles';
import {useAuthForm} from '@/hooks/auth/useAuthForm';
import WibuRegister from "@/app/assets/images/wibu/WibuRegister";
import useRefs from "@/app/hooks/useRef";
import Foundation from '@expo/vector-icons/Foundation';
import GoogleIcon from "@/app/assets/icons/GoogleIcon";

const RegisterScreen = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const styles = useAuthStyles('register');
    const {formData, error, loading, updateField, handleSubmit} = useAuthForm('register');

    const goBack = () => router.push('screens/WelcomeScreen');
    const {refs, scrollToInput} = useRefs();


    return (<SafeAreaView style={styles.safeArea}>
        {/* Header cố định */}
        <View style={styles.header}>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M19 12H5M12 19l-7-7 7-7"/>
                </Svg>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Đăng ký</Text>
        </View>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <ScrollView
                ref={(ref) => (refs.scrollView = ref)}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 50}}
                keyboardShouldPersistTaps="handled">

                <View style={styles.logoContainer}>
                    <WibuRegister width={170} height={170}/>
                </View>

                <View style={styles.content}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Bắt đầu hành trình mới!</Text>
                        <Text style={styles.subtitle}>SoundClone sẽ đồng hành cùng bạn</Text>
                    </View>

                    <View style={styles.formContainer}>

                        {/*Nhập họ và tên*/}
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="person" size={20} style={styles.inputIcon}/>
                                <TextInput
                                    ref={(ref) => (refs.inputs.fullName = ref)} // Gán ref cho username
                                    style={styles.input}
                                    placeholderTextColor="#FFFFFF"
                                    placeholder="Nhập họ và tên"
                                    value={formData.fullName}
                                    onChangeText={(text) => updateField('fullName', text)}
                                    onFocus={() => scrollToInput(refs.inputs.fullName)}
                                />
                            </View>
                        </View>

                        {/*Nhập email*/}
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="mail-outline" size={20} style={styles.inputIcon}/>
                                <TextInput
                                    ref={(ref) => (refs.inputs.email = ref)} // Gán ref cho email
                                    style={styles.input}
                                    placeholderTextColor="#FFFFFF"
                                    placeholder="Nhập email của bạn"
                                    value={formData.email}
                                    onChangeText={(text) => updateField('email', text)}
                                    onFocus={() => scrollToInput(refs.inputs.email)}
                                />
                            </View>
                        </View>


                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <Foundation
                                    name="lock"
                                    size={20}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    ref={(ref) => (refs.inputs.password = ref)} // Gán ref cho password
                                    style={styles.passwordInput}
                                    secureTextEntry={!showPassword}
                                    placeholderTextColor="#FFFFFF"
                                    placeholder="Nhập mật khẩu"
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
                        </View>

                        {/*Nhập lại mật khẩu*/}
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <Foundation
                                    name="lock"
                                    size={20}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    ref={(ref) => (refs.inputs.password = ref)} // Gán ref cho password
                                    style={styles.passwordInput}
                                    secureTextEntry={!showPassword}
                                    placeholderTextColor="#FFFFFF"
                                    placeholder="Nhập lại mật khẩu"
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
                                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
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
                            <Text style={styles.registerText}>Bạn đã có tài khoản? </Text>
                            <TouchableOpacity onPress={() => router.push('screens/LoginScreen')}>
                                <Text style={styles.registerLink}>Đăng nhập ngay</Text>
                            </TouchableOpacity>
                        </View>


                    </View>

                </View>
            </ScrollView>

        </KeyboardAvoidingView>


    </SafeAreaView>);
};

export default RegisterScreen;