import { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const useAnimationEffects = () => {
    const translateXGradient = useSharedValue(0);
    const contentOpacity = useSharedValue(1);

    // Animated style cho gradient với hiệu ứng 3D và scale
    const animatedGradientStyle = useAnimatedStyle(() => {
        const absTranslation = Math.abs(translateXGradient.value);
        return {
            transform: [
                { perspective: 1000 },
                {
                    rotateY: withTiming(`${translateXGradient.value / 15}deg`, {
                        duration: 600,
                        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    }),
                },
                {
                    translateX: withTiming(translateXGradient.value, {
                        duration: 600,
                        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    }),
                },
                {
                    scale: withTiming(1 - absTranslation / (width * 1.5), {
                        duration: 600,
                    }),
                },
            ],
            opacity: withTiming(1 - absTranslation / width, {
                duration: 600,
            }),
        };
    });

    // Các hàm xử lý animation
    const fadeContent = (callback) => {
        contentOpacity.value = withTiming(0, { duration: 300 });

        setTimeout(() => {
            callback();
            contentOpacity.value = withTiming(1, { duration: 300 });
        }, 300);
    };

    return {
        translateXGradient,
        contentOpacity,
        animatedGradientStyle,
        fadeContent
    };
};