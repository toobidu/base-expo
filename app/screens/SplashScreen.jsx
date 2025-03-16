import React, {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';
import Music from '../assets/images/logo/Music';
import SplashStyle from "@/styles/SplashStyle";
import Dimensions from "@/constants/Dimensions";
import {useRouter} from "expo-router";

const {screenWidth, screenHeight} = Dimensions;

const SplashScreen = () => {
    const  router = useRouter();
    const animValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Hiệu ứng hiển thị - tất cả cùng lúc
        Animated.timing(animValue, {
            toValue: 1, duration: 1200, useNativeDriver: true,
        }).start();

        // Thời gian hiển thị splash screen
        setTimeout(() => {
            // Hiệu ứng ẩn đi - tất cả cùng lúc
            Animated.timing(animValue, {
                toValue: 0, duration: 800, useNativeDriver: true,
            }).start(() => {
                // Điều hướng đến màn hình onboarding sau khi animation hoàn thành
                router.replace('/screens/OnboardingScreen');
            });
        }, 4500); // Hiển thị splash screen trong 4.5 giây
    }, []);

    // Tính toán các giá trị animation từ animValue
    const opacity = animValue;
    const scale = animValue.interpolate({
        inputRange: [0, 1], outputRange: [0.3, 1],
    });
    const translateY = animValue.interpolate({
        inputRange: [0, 1], outputRange: [50, 0],
    });

    return (<View style={SplashStyle.container}>
        {/* Hiệu ứng hình tròn nền */}
        <Animated.View
            style={[SplashStyle.backgroundCircle, {
                opacity: animValue.interpolate({
                    inputRange: [0, 1], outputRange: [0, 0.15],
                }), transform: [{scale}],
            }]}
        />

        <Animated.View
            style={[SplashStyle.contentContainer, {
                opacity, transform: [{scale}, {translateY}],
            }]}
        >
            {/* Logo */}
            <View style={SplashStyle.logoContainer}>
                <Music width={150} height={150}/>
            </View>

            {/* Text ngay bên dưới logo */}
            <View style={SplashStyle.textContainer}>
                <Text style={SplashStyle.appName}>SoundClone©</Text>
            </View>
        </Animated.View>
    </View>);
};


export default SplashScreen;