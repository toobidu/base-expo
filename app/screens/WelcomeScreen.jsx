import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Dimensions from "@/constants/Dimensions";
import {useRouter} from "expo-router";
import WelcomeAnime from "@/app/assets/images/wibu/WelcomeAnime";
import WelcomeStyle from "@/styles/WelcomeStyle";

const { screenWidth, screenHeight } = Dimensions;

const WelcomeScreen = () => {
    const router = useRouter();

    const handleRegister = () => {
        router.push('screens/RegisterScreen');
    };

    const handleLogin = () => {
        router.push('screens/LoginScreen');
    };

    return (
        <View style={WelcomeStyle.container}>
            <View style={WelcomeStyle.content}>
                <View style={WelcomeStyle.logoContainer}>
                    <WelcomeAnime />
                </View>

                <View style={WelcomeStyle.textContainer}>
                    <Text style={WelcomeStyle.title}>Trải nghiệm mọi nơi.</Text>
                    <Text style={WelcomeStyle.subtitle}>Lắng nghe cùng SoundClone</Text>
                </View>
            </View>

            <View style={WelcomeStyle.buttonContainer}>
                <TouchableOpacity style={WelcomeStyle.registerButton} onPress={handleRegister}>
                    <Text style={WelcomeStyle.buttonText}>Đăng ký miễn phí</Text>
                </TouchableOpacity>
                <TouchableOpacity style={WelcomeStyle.loginButton} onPress={handleLogin}>
                    <Text style={WelcomeStyle.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



export default WelcomeScreen;