import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { useSharedValue, withTiming, withSequence, withRepeat } from 'react-native-reanimated';

export const useOnboardingState = (onboardingData) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDots, setShowDots] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const [showStartButton, setShowStartButton] = useState(false);
    const [loadingProgress] = useState(new Animated.Value(0));

    // Các giá trị animation mới cho loading bar
    const pulseAnim = useSharedValue(1);
    const glowAnim = useSharedValue(0);
    const shinePosition = useSharedValue(-20);

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

                // Hiệu ứng nhấp nháy nhẹ cho loading bar
                pulseAnim.value = withRepeat(
                    withSequence(
                        withTiming(1.05, { duration: 800 }),
                        withTiming(1, { duration: 800 })
                    ),
                    -1,
                    true
                );

                // Hiệu ứng phát sáng
                glowAnim.value = withRepeat(
                    withSequence(
                        withTiming(1, { duration: 1500 }),
                        withTiming(0.3, { duration: 1500 })
                    ),
                    -1,
                    true
                );

                // Hiệu ứng tia sáng chạy qua
                shinePosition.value = withRepeat(
                    withTiming(300, { duration: 1800 }),
                    -1,
                    false
                );

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
        loadingProgress,
        pulseAnim,
        glowAnim,
        shinePosition
    };
};