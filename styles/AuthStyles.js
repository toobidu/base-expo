import { StyleSheet } from 'react-native';
import Dimensions from "@/constants/Dimensions";

const { screenWidth, screenHeight } = Dimensions;

const AuthStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'black',
    },
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: 24,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 40,  // Để cân bằng với backButton
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 170,
        height: 170,
        alignSelf: 'center',
        marginBottom: 24, // Điều chỉnh margin bottom
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 12,

    },
    subtitle: {
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    formContainer: {
    },
    inputContainer: {
        marginBottom: 12, // Giảm từ 20 xuống 12
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'white',
        height: 50,
        paddingHorizontal: 8,
    },
    inputIcon: {
        paddingHorizontal: 12,
        color: '#FFFFFF',
    },
    input: {
        flex: 1,
        color: 'white',
        height: '100%',
        paddingRight: 12,
        fontSize: 16,
    },
    passwordInput: {
        flex: 1,
        color: 'white',
        height: '100%',
        fontSize: 16,
    },
    eyeIcon: {
        paddingHorizontal: 12,
    },
    errorText: {
        color: '#ff4444',
        textAlign: 'center',
        marginTop: 8,
    },
    // Button styles
    buttonContainer: {
        width: '100%',
        marginTop: 16, // Giảm từ 24 xuống 16
    },
    button: {
        backgroundColor: '#1DB954',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8, // Giảm marginTop để gần hơn với dòng chữ phía trên
    },

    buttonText: {
        color: '#000000',
        fontSize: 20,
        fontWeight: "bold"
    },
    disclaimer: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 16,
        fontSize: 12,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#FFFFFF',
        opacity: 0.2,
    },
    dividerText: {
        color: '#FFFFFF',
        paddingHorizontal: 10,
        fontSize: 12,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        height: 50,
        borderRadius: 25,
        borderWidth: 1,        // Thêm border
        borderColor: 'white',  // Màu border trắng giống input
    },
    googleIcon: {
        marginRight: 10,
    },
    googleButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    registerText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    registerLink: {
        color: '#22C55E',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginTop: 20,
        marginRight: 8,
    },
    forgotPasswordText: {
        color: '#22C55E', // Đổi màu giống với registerLink
        fontSize: 14,
        fontWeight: '600', // Thêm fontWeight giống registerLink
    },
});

export default AuthStyles;