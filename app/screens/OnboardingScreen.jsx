import React from "react";
import {Animated as RNAnimated, Dimensions, Text, TouchableOpacity, View,} from "react-native";
import Animated from "react-native-reanimated";
import {GestureDetector, GestureHandlerRootView,} from "react-native-gesture-handler";
import {LinearGradient} from "expo-linear-gradient";
import Training from "../assets/images/onboardings/Training";
import Work from "../assets/images/onboardings/Work";
import Party from "../assets/images/onboardings/Party";

import {useOnboardingState} from "../hooks/onboarding/useOnboardingState"
import {useAnimationEffects} from "../hooks/onboarding/useAnimationEffects";
import {useGestureHandling} from "../hooks/onboarding/useGetsureHandling"
import OnboardingStyle from "../styles/OnboardingStyle";

const {width} = Dimensions.get('window');

const gradientColors = ['#121212', '#212121', '#535353'];

const onboardingData = [{
  title: 'Bùng nổ cùng nhịp điệu', subtitle: 'Khám phá âm nhạc mới mỗi ngày', IconComponent: Training,
}, {
  title: 'Tập trung tối đa với giai điệu yêu thích',
  subtitle: 'Danh sách phát cho mọi khoảnh khắc trong ngày',
  IconComponent: Work,
}, {
  title: 'Quậy tưng bừng với những bản nhạc hot',
  subtitle: 'Chia sẻ niềm vui âm nhạc cùng bạn bè',
  IconComponent: Party,
},];

const OnboardingScreen = ({navigation}) => {
  // Sử dụng custom hooks
  const {
    currentIndex, setCurrentIndex, showDots, showLoading, showStartButton, loadingProgress
  } = useOnboardingState(onboardingData);

  const {
    translateXGradient, contentOpacity, animatedGradientStyle, fadeContent
  } = useAnimationEffects();

  const {
    panGesture, handleRightPress, handleLeftPress
  } = useGestureHandling(translateXGradient, contentOpacity, currentIndex, setCurrentIndex, onboardingData.length, fadeContent);


  const renderDots = () => {
    // Nếu không phải slide cuối, render dots bình thường
    if (currentIndex < onboardingData.length - 1) {
      return onboardingData.map((_, index) => {
        const isActive = index === currentIndex;
        return (<View
            key={index}
            style={[OnboardingStyle.dot, {
              width: isActive ? 30 : 12, backgroundColor: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)",
            },]}
        />);
      });
    }

    // Nếu là slide cuối
    return (<View style={OnboardingStyle.dotsWrapper}>
      {/* Hiển thị dots */}
      {showDots && (<View style={OnboardingStyle.dotsRow}>
        {onboardingData.map((_, index) => (<View
            key={index}
            style={[OnboardingStyle.dot, {
              width: index === currentIndex ? 30 : 12,
              backgroundColor: index === currentIndex ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)",
            },]}
        />))}
      </View>)}

      {/* Hiển thị loading */}
      {showLoading && !showStartButton && (<View style={OnboardingStyle.loadingContainer}>
        {/* Loading bar */}
        <View style={OnboardingStyle.loadingBarBackground}>
          <RNAnimated.View
              style={[OnboardingStyle.loadingBarForeground, {
                width: loadingProgress.interpolate({
                  inputRange: [0, 1], outputRange: ['0%', '100%'],
                }),
              },]}
          />
        </View>
      </View>)}

      {/* Nút Start */}
      {showStartButton && (<TouchableOpacity
          style={OnboardingStyle.startButton}
          onPress={() => navigation.navigate('WelcomeScreen')}
      >
        <Text style={OnboardingStyle.startButtonText}>Start</Text>
      </TouchableOpacity>)}
    </View>);
  };

  const IconComponent = onboardingData[currentIndex].IconComponent;

  return (<GestureHandlerRootView style={{flex: 1}}>
    <View style={OnboardingStyle.container}>
      {/* Gradient background với hiệu ứng chuyển */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
            style={[OnboardingStyle.gradientContainer, animatedGradientStyle]}
        >
          <LinearGradient
              colors={gradientColors}
              style={OnboardingStyle.gradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
          />
        </Animated.View>
      </GestureDetector>

      {/* Nội dung cố định (icon, title, dots) */}
      <Animated.View style={[OnboardingStyle.contentContainer, {opacity: contentOpacity}]}>
        <View style={OnboardingStyle.fixedContent}>
          <IconComponent style={OnboardingStyle.icon}/>
          <Text style={OnboardingStyle.title}>
            {onboardingData[currentIndex].title}
          </Text>
          <Text style={OnboardingStyle.subtitle}>
            {onboardingData[currentIndex].subtitle}
          </Text>
        </View>
      </Animated.View>

      {/* Dots luôn hiển thị */}
      <View style={OnboardingStyle.dotsContainer}>
        {renderDots()}
      </View>

      {/* Khu vực nhấn hai bên */}
      <TouchableOpacity
          style={OnboardingStyle.leftTouchArea}
          onPress={handleLeftPress}
      />
      <TouchableOpacity
          style={OnboardingStyle.rightTouchArea}
          onPress={handleRightPress}
      />
    </View>
  </GestureHandlerRootView>);
};

export default OnboardingScreen;