import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import OnboardingScreen from "./screens/OnboardingScreen";
import SplashScreen from "./screens/SplashScreen"; // Đảm bảo bạn đã tạo file này với code Splash Screen

export default function Index() {
    const [isLoading, setIsLoading] = useState(true);

    const onSplashFinish = () => {
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <SplashScreen onFinish={onSplashFinish} />
            ) : (
                <OnboardingScreen navigation={undefined} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#120E29",
    },
});