import { useState, useEffect } from 'react';
import { Animated } from 'react-native';

export const useOnboardingState = (onboardingData) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDots, setShowDots] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const [showStartButton, setShowStartButton] = useState(false);
    const [loadingProgress] = useState(new Animated.Value(0));

    useEffect(() => {
        // Reset trạng thái khi không ở slide cuối
        if (currentIndex < onboardingData.length - 1) {
            setShowDots(true);
            setShowLoading(false);
            setShowStartButton(false);
            loadingProgress.setValue(0);
            return;
        }

        // Khi vào slide cuối, đặt timer để biến mất dots
        const dotsTimer = setTimeout(() => {
            setShowDots(false);

            // Sau khi dots biến mất, hiện loading bar
            setTimeout(() => {
                setShowLoading(true);

                // Animation loading bar
                Animated.timing(loadingProgress, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: false,
                }).start(() => {
                    // Khi loading xong, hiển thị Start button
                    setShowStartButton(true);
                });
            }, 500);
        }, 2000);

        return () => clearTimeout(dotsTimer);
    }, [currentIndex, onboardingData.length]);

    return {
        currentIndex,
        setCurrentIndex,
        showDots,
        showLoading,
        showStartButton,
        loadingProgress
    };
};