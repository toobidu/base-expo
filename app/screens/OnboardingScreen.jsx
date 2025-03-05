import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Training from '../assets/icons/Training';
import Work from '../assets/icons/Work';
import Party from '../assets/icons/Party';

const { width, height } = Dimensions.get('window');

const gradientColors = [
  ['#8B5CF6', '#EC4899', '#EF4444'], // purple-500 -> pink-500 -> red-500
  ['#3B82F6', '#2DD4BF', '#22C55E'], // blue-500 -> teal-500 -> green-500
  ['#EAB308', '#F97316', '#EF4444'], // yellow-500 -> orange-500 -> red-500
  ['#6366F1', '#8B5CF6', '#EC4899']  // indigo-500 -> purple-500 -> pink-500
];

const onboardingData = [
  {
    title: 'Bứt phá giới hạn với nhịp điệu sôi động',
    IconComponent: Training,
  },
  {
    title: 'Tập trung tối đa với giai điệu yêu thích',
    IconComponent: Work,
  },
  {
    title: 'Quậy tưng bừng với những bản nhạc hot',
    IconComponent: Party,
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateXGradient = useSharedValue(0);
  const contentOpacity = useSharedValue(1);

  // Animated style cho gradient với hiệu ứng 3D và scale
  const animatedGradientStyle = useAnimatedStyle(() => {
    const absTranslation = Math.abs(translateXGradient.value);
    return {
      transform: [
        { perspective: 1000 }, // Tăng độ sâu 3D
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

  // Animated style cho nội dung
  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(translateXGradient.value, { duration: 600 }) },
      ],
      opacity: withTiming(1 - Math.abs(translateXGradient.value) / width, {
        duration: 6000,
      }),
    };
  });

  const panGesture = Gesture.Pan()
  .onUpdate((event) => {
    translateXGradient.value = event.translationX;
  })
  .onEnd((event) => {
    const direction = event.translationX > 50 ? -1 : 1;
    const shouldChangeIndex =
      (direction === -1 && currentIndex < onboardingData.length - 1) ||
      (direction === 1 && currentIndex > 0);

    if (shouldChangeIndex) {
      setCurrentIndex((prev) => prev - direction);
    }

    translateXGradient.value = withTiming(0, { duration: 300 });
  });


//   // Xử lý gesture kéo
//   const panGesture = Gesture.Pan()
//     .onUpdate((event) => {
//       translateXGradient.value = event.translationX;
//     })
//     .onEnd((event) => {
//       const shouldChangeIndex = 
//         (event.translationX > 50 && currentIndex > 0) || 
//         (event.translationX < -50 && currentIndex < onboardingData.length - 1);

//       if (shouldChangeIndex) {
//         // Ẩn nội dung trước khi chuyển
//         contentOpacity.value = withTiming(0, { duration: 300 });
        
//         setTimeout(() => {
//           if (event.translationX > 50) {
//             setCurrentIndex(currentIndex - 1);
//           } else {
//             setCurrentIndex(currentIndex + 1);
//           }
          
//           // Hiển thị lại nội dung
//           contentOpacity.value = withTiming(1, { duration: 300 });
//         }, 300);
//       }

//       // Reset vị trí gradient
//       translateXGradient.value = withTiming(0, { duration: 300 });
//     });

  // Xử lý nhấn vào hai bên màn hình
  const handleRightPress = () => {
    if (currentIndex < onboardingData.length - 1) {
      // Ẩn nội dung trước khi chuyển
      contentOpacity.value = withTiming(0, { duration: 300 });
      
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        
        // Hiển thị lại nội dung
        contentOpacity.value = withTiming(1, { duration: 300 });
      }, 300);
    }
  };
  
  const handleLeftPress = () => {
    if (currentIndex > 0) {
      // Ẩn nội dung trước khi chuyển
      contentOpacity.value = withTiming(0, { duration: 300 });
      
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        
        // Hiển thị lại nội dung
        contentOpacity.value = withTiming(1, { duration: 300 });
      }, 300);
    }
  };

  const renderDots = () => {
    return onboardingData.map((_, index) => {
      const isActive = index === currentIndex;
      return (
        <View
          key={index}
          style={[
            styles.dot,
            {
              width: isActive ? 30 : 12,
              backgroundColor: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
            },
          ]}
        />
      );
    });
  };

  const IconComponent = onboardingData[currentIndex].IconComponent;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Gradient background với hiệu ứng chuyển */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.gradientContainer, animatedGradientStyle]}>
            <LinearGradient
              colors={gradientColors[currentIndex % gradientColors.length]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </Animated.View>
        </GestureDetector>

        {/* Nội dung cố định (icon, title, dots) */}
        <Animated.View 
          style={[
            styles.contentContainer, 
            animatedContentStyle
          ]}
        >
          <View style={styles.fixedContent}>
            <IconComponent style={styles.icon} />
            <Text style={styles.title}>{onboardingData[currentIndex].title}</Text>
            <View style={styles.dotsContainer}>{renderDots()}</View>
          </View>
        </Animated.View>

        {/* Khu vực nhấn hai bên */}
        <TouchableOpacity
          style={styles.leftTouchArea}
          onPress={handleLeftPress}
        />
        <TouchableOpacity
          style={styles.rightTouchArea}
          onPress={handleRightPress}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  fixedContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: width * 0.8,
    height: height * 0.3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginVertical: 45,
  },
  dot: {
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  leftTouchArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width * 0.5,
    height: '100%',
    zIndex: 20,
  },
  rightTouchArea: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: width * 0.5,
    height: '100%',
    zIndex: 20,
  },
});

export default OnboardingScreen;