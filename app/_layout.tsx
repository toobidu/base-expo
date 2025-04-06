import {Stack} from "expo-router";

export default function RootLayout() {
    return (
        <Stack 
            screenOptions={{
                headerShown: false,
                animation: 'none'
            }}
        >
            <Stack.Screen name="index"/>
            <Stack.Screen name="screens/SplashScreen"/>
            <Stack.Screen name="screens/OnboardingScreen"/>
            <Stack.Screen name="screens/WelcomeScreen"/>
            <Stack.Screen name="screens/LoginScreen"/>
            <Stack.Screen name="screens/RegisterScreen"/>
            <Stack.Screen name="screens/Optional"/>
        </Stack>
    );
}