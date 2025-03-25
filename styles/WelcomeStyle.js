import { StyleSheet } from 'react-native';
import { COLORS, SPACING, SIZES, SHADOWS, TYPOGRAPHY } from '@/constants/theme';

const WelcomeStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        padding: SPACING.lg,
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
        width: SIZES.logo.width,
        height: SIZES.logo.height,
        marginBottom: SPACING.xl,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        ...TYPOGRAPHY.title,
        color: COLORS.text.primary,
        textAlign: 'center',
        marginBottom: SPACING.sm,
    },
    subtitle: {
        ...TYPOGRAPHY.subtitle,
        color: COLORS.text.secondary,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        marginBottom: SPACING.xl,
    },
    registerButton: {
        backgroundColor: COLORS.button.primary,
        height: SIZES.button.height,
        borderRadius: SIZES.button.radius,
        marginBottom: SPACING.md,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.primary,
    },
    loginButton: {
        backgroundColor: COLORS.button.secondary,
        height: SIZES.button.height,
        borderRadius: SIZES.button.radius,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        ...TYPOGRAPHY.button,
        color: COLORS.button.text.primary,
    },
    loginButtonText: {
        ...TYPOGRAPHY.button,
        color: COLORS.button.text.secondary,
    },
});
export default WelcomeStyle;