import React from "react";
import {Animated as RNAnimated, Text, TouchableOpacity, View,} from "react-native";
import Animated, {useAnimatedStyle} from "react-native-reanimated";
import {GestureDetector, GestureHandlerRootView,} from "react-native-gesture-handler";
import {LinearGradient} from "expo-linear-gradient";
import Training from "../assets/images/onboardings/Training";
import Work from "../assets/images/onboardings/Work";
import Party from "../assets/images/onboardings/Party";

import {useOnboardingState} from "@/hooks/onboarding/useOnboardingState"
import {useAnimationEffects} from "@/hooks/onboarding/useAnimationEffects";
import {useGestureHandling} from "@/hooks/onboarding/useGetsureHandling"
import OnboardingStyle from "@/styles/OnboardingStyle";
import Dimensions from "@/constants/Dimensions";
import {useRouter} from "expo-router";

const { screenWidth, screenHeight } = Dimensions;
const gradientColors = ['#121212', '#212121', '#535353'];

const onboardingData = [
  {
    title: 'Bùng nổ cùng nhịp điệu',
    subtitle: 'Khám phá âm nhạc mới mỗi ngày',
    IconComponent: Training,
  },
  {
    title: 'Tập trung với giai điệu yêu thích',
    subtitle: 'Danh sách phát cho mọi lúc, mọi nơi',
    IconComponent: Work,
  },
  {
    title: 'Lan tỏa niềm vui âm nhạc',
    subtitle: 'Quẩy hết mình cùng những bản nhạc hot',
    IconComponent: Party,
  },
];

const OnboardingScreen = () => {
  const router = useRouter();
  const handleStartPress = () => {
    console.log("Start button pressed, navigating to /welcome");
router.push("/screens/WelcomeScreen");  };

  const {
    currentIndex, setCurrentIndex, showDots, showLoading, showStartButton,
    loadingProgress, pulseAnim, glowAnim, shinePosition
  } = useOnboardingState(onboardingData);

  const {
    translateXGradient, contentOpacity, animatedGradientStyle, fadeContent
  } = useAnimationEffects();

  const {
    panGesture, handleRightPress, handleLeftPress
  } = useGestureHandling(translateXGradient, contentOpacity, currentIndex, setCurrentIndex, onboardingData.length, fadeContent);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    style: {
      shadowOpacity: glowAnim.value * 0.8,
      shadowColor: '#FFFFFF',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 6,
      elevation: glowAnim.value * 4,
    }
  }));

  const shineStyle = useAnimatedStyle(() => ({
    left: shinePosition.value,
  }));

  const renderDots = () => {

    if (currentIndex < onboardingData.length - 1) {
      return onboardingData.map((_, index) => {
        const isActive = index === currentIndex;
        return (
            <View
                key={index}
                style={[OnboardingStyle.dot, {
                  width: isActive ? 30 : 12,
                  backgroundColor: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)",
                }]}
            />
        );
      });
    }

    return (
        <View style={OnboardingStyle.dotsWrapper}>
          {showDots && (
              <View style={OnboardingStyle.dotsRow}>
                {onboardingData.map((_, index) => (
                    <View
                        key={index}
                        style={[OnboardingStyle.dot, {
                          width: index === currentIndex ? 30 : 12,
                          backgroundColor: index === currentIndex ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)",
                        }]}
                    />
                ))}
              </View>
          )}

          {showLoading && !showStartButton && (
              <View style={OnboardingStyle.loadingContainer}>
                <Animated.View
                    style={[
                      OnboardingStyle.loadingBarBackground,
                      pulseStyle,
                      {
                        shadowOpacity: 0.8,
                        shadowColor: '#FFFFFF',
                        shadowOffset: { width: 0, height: 0 },
                        shadowRadius: 6,
                        elevation: 4,
                      }
                    ]}
                >
                  <RNAnimated.View
                      style={[OnboardingStyle.loadingBarForeground, {
                        width: loadingProgress.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        }),
                      }]}
                  >
                    <LinearGradient
                        colors={['#1DB954', '#2FD267', '#54E87F']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={OnboardingStyle.loadingBarGradient}
                    />
                  </RNAnimated.View>
                  <Animated.View style={[OnboardingStyle.shineEffect, shineStyle]} />
                </Animated.View>
              </View>
          )}

          {showStartButton && (
              <TouchableOpacity
                  style={OnboardingStyle.startButton}
                  onPress={handleStartPress} // Sử dụng hàm điều hướng
              >
                <Text style={OnboardingStyle.startButtonText}>Bắt đầu</Text>
              </TouchableOpacity>
          )}
        </View>
    );
  };

  const IconComponent = onboardingData[currentIndex].IconComponent;

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={OnboardingStyle.container}>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[OnboardingStyle.gradientContainer, animatedGradientStyle]}>
              <LinearGradient
                  colors={gradientColors}
                  style={OnboardingStyle.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
              />
            </Animated.View>
          </GestureDetector>

          <Animated.View style={[OnboardingStyle.contentContainer, { opacity: contentOpacity }]}>
            <View style={OnboardingStyle.fixedContent}>
              <IconComponent style={OnboardingStyle.icon} />
              <Text style={OnboardingStyle.title}>
                {onboardingData[currentIndex].title}
              </Text>
              <Text style={OnboardingStyle.subtitle}>
                {onboardingData[currentIndex].subtitle}
              </Text>
            </View>
          </Animated.View>

          <View style={OnboardingStyle.dotsContainer}>
            {renderDots()}
          </View>

          <TouchableOpacity
              style={OnboardingStyle.leftTouchArea}
              onPress={handleLeftPress}
          />
          <TouchableOpacity
              style={OnboardingStyle.rightTouchArea}
              onPress={handleRightPress}
          />
        </View>
      </GestureHandlerRootView>
  );
};

export default OnboardingScreen;