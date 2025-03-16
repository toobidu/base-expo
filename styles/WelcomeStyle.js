import { StyleSheet } from 'react-native';
import Dimensions from "@/constants/Dimensions";

const { screenWidth, screenHeight } = Dimensions;

const WelcomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        padding: 24,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 120,
        marginBottom: 32,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 32,
    },
    registerButton: {
        backgroundColor: '#22C55E',
        paddingVertical: 16,
        borderRadius: 999,
        marginBottom: 16,
        shadowColor: '#22C55E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    loginButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 16,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});
export default WelcomeStyle;