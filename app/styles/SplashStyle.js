import {StyleSheet} from 'react-native';
import Dimensions from "@/app/constants/Dimensions";

const {screenWidth: width, screenHeight: height} = Dimensions;

const SplashStyle = StyleSheet.create({

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
    }, textContainer: {
        alignItems: 'center',
        marginTop: 30,
    }, appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
});

export default SplashStyle;