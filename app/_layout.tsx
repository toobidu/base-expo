import {Stack} from "expo-router";

export default function RootLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="screens/SplashScreen"/> // Thêm màn splash
            <Stack.Screen name="screens/OnboardingScreen"/>
            <Stack.Screen name="screens/WelcomeScreen"/>
            <Stack.Screen name="screens/LoginScreen"/>
            <Stack.Screen name="screens/RegisterScreen"/>
        </Stack>
    );
}