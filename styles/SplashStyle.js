import {StyleSheet} from 'react-native';
import Dimensions from "@/constants/Dimensions";

const {screenWidth: width, screenHeight: height} = Dimensions;

const SplashStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#121212',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    }, 
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default SplashStyle;