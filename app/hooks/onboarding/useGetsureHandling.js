import {Gesture} from 'react-native-gesture-handler';
import {withTiming} from 'react-native-reanimated';

export const useGestureHandling = (
    translateXGradient,
    contentOpacity,
    currentIndex,
    setCurrentIndex,
    totalSlides,
    fadeContent
) => {
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateXGradient.value = event.translationX;
        })
        .onEnd((event) => {
            const direction = event.translationX > 50 ? -1 : 1;
            const shouldChangeIndex =
                (direction === -1 && currentIndex < totalSlides - 1) ||
                (direction === 1 && currentIndex > 0);

            if (shouldChangeIndex) {
                setCurrentIndex((prev) => prev - direction);
            }

            translateXGradient.value = withTiming(0, {duration: 300});
        });

    const handleRightPress = () => {
        if (currentIndex < totalSlides - 1) {
            fadeContent(() => setCurrentIndex(currentIndex + 1));
        }
    };

    const handleLeftPress = () => {
        if (currentIndex > 0 && currentIndex < totalSlides - 1) {
            fadeContent(() => setCurrentIndex(currentIndex - 1));
        }
    };

    return {
        panGesture,
        handleRightPress,
        handleLeftPress
    };
};