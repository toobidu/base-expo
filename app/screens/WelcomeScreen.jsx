import React from 'react';
import { Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { useRouter } from "expo-router";
import WelcomeAnime from "@/app/assets/images/wibu/WelcomeAnime";
import WelcomeStyle from "@/styles/WelcomeStyle";
import { useAuthStyles } from '@/hooks/styles/useAuthStyles';

const WelcomeScreen = () => {
    const router = useRouter();

    const handleRegister = () => {
        router.push('screens/RegisterScreen');
    };

    const handleLogin = () => {
        router.push('screens/LoginScreen');
    };
    const styles = useAuthStyles('welcome');


    return (
        <SafeAreaView style={WelcomeStyle.safeArea}>
            <View style={WelcomeStyle.container}>
                <View style={WelcomeStyle.content}>
                    <View style={WelcomeStyle.logoContainer}>
                        <WelcomeAnime />
                    </View>

                    <View style={WelcomeStyle.textContainer}>
                        <Text style={styles.title}>Trải nghiệm mọi nơi.</Text>
                        <Text style={styles.subtitle}>Lắng nghe cùng SoundClone</Text>
                    </View>
                </View>

                <View style={WelcomeStyle.buttonContainer}>
                    <TouchableOpacity 
                        style={WelcomeStyle.registerButton} 
                        onPress={handleRegister}
                    >
                        <Text style={styles.buttonText}>Đăng ký miễn phí</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={WelcomeStyle.loginButton} 
                        onPress={handleLogin}
                    >
                        <Text style={WelcomeStyle.loginButtonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default WelcomeScreen;