import { StyleSheet } from 'react-native';
import Dimensions from "@/constants/Dimensions";

const { screenWidth, screenHeight } = Dimensions;

const OnboardingStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    gradientContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    gradient: {
        width: "100%",
        height: "100%",
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 10,
    },
    fixedContent: {
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: screenWidth * 0.8,
        height: screenHeight * 0.3,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    subtitle: {
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.8)",
        textAlign: "center",
        marginBottom: 20,
        paddingHorizontal: 30,
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        zIndex: 20,
    },
    dotsWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        height: 12,
        borderRadius: 6,
        marginHorizontal: 6,
    },
    loadingContainer: {
        alignItems: 'center',
    },
    loadingBarBackground: {
        width: 240,
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 7,
        overflow: 'hidden',
        marginBottom: 8,
    },
    loadingBarForeground: {
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
    },
    loadingBarGradient: {
        height: '100%',
        width: '100%',
    },
    loadingBarContainer: {
        width: 240,
        alignItems: 'center',
    },

    shineEffect: {
        position: 'absolute',
        width: 20,
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 4,
        transform: [{ skewX: '-20deg' }],
    },
    startButton: {
        width: 160,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#1DB954', // Spotify's signature green
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        marginVertical: 16,
        zIndex: 30,
    },
    startButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    leftTouchArea: {
        position: "absolute",
        left: 0,
        top: 0,
        width: screenWidth * 0.3, // Narrower width
        height: screenHeight, // Full screen height
        zIndex: 20,
    },
    rightTouchArea: {
        position: "absolute",
        right: 0,
        top: 0,
        width: screenWidth * 0.3, // Narrower width
        height: screenHeight, // Full screen height
        zIndex: 20,
    },
});

export default OnboardingStyle;