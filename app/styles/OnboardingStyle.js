import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

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
        width: width * 0.8,
        height: height * 0.3,
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
        width: 200,
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    loadingBarForeground: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
    },
    startButton: {
        width: 100,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    startButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    leftTouchArea: {
        position: "absolute",
        left: 0,
        top: 0,
        width: width * 0.5,
        height: "100%",
        zIndex: 20,
    },
    rightTouchArea: {
        position: "absolute",
        right: 0,
        top: 0,
        width: width * 0.5,
        height: "100%",
        zIndex: 20,
    },
});

export default OnboardingStyle;