import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import Music from '../assets/icons/Music';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
    const animValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Hiệu ứng hiển thị - tất cả cùng lúc
        Animated.timing(animValue, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
        }).start();

        // Thời gian hiển thị splash screen
        setTimeout(() => {
            if (onFinish) {
                // Hiệu ứng ẩn đi - tất cả cùng lúc
                Animated.timing(animValue, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }).start(onFinish);
            }
        }, 4500); // Hiển thị splash screen trong 2.5 giây
    }, []);

    // Tính toán các giá trị animation từ animValue
    const opacity = animValue;
    const scale = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 1],
    });
    const translateY = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });

    return (
        <View style={styles.container}>
            {/* Hiệu ứng hình tròn nền */}
            <Animated.View
                style={[
                    styles.backgroundCircle,
                    {
                        opacity: animValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.15],
                        }),
                        transform: [{ scale }],
                    }
                ]}
            />

            {/* Logo và text được nhóm trong cùng một Animated.View
         để đảm bảo chúng xuất hiện và biến mất cùng lúc */}
            <Animated.View
                style={[
                    styles.contentContainer,
                    {
                        opacity,
                        transform: [
                            { scale },
                            { translateY }
                        ],
                    }
                ]}
            >
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Music width={150} height={150} />
                </View>

                {/* Text ngay bên dưới logo */}
                <View style={styles.textContainer}>
                    <Text style={styles.appName}>SoundClone©</Text>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    backgroundCircle: {
        position: 'absolute',
        width: width * 1.5,
        height: width * 1.5,
        borderRadius: width * 0.75,
        backgroundColor: '#121212',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
});

export default SplashScreen;