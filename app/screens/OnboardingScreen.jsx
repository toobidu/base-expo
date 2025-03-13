import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import Animated, {Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming,} from 'react-native-reanimated';
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';
import Training from '../assets/icons/Training';
import Work from '../assets/icons/Work';
import Party from '../assets/icons/Party';

const {width, height} = Dimensions.get('window');

const gradientColors = [
  ['#121212', '#212121', '#535353'],
  ['#121212', '#212121', '#535353'], // Đen -> Xám đậm -> Xám (màu tông tối)
  ['#121212', '#212121', '#535353'],
  ['#121212', '#212121', '#535353']
];
const onboardingData = [
  {
    title: 'Bùng nổ cùng nhịp điệu',
    subtitle: 'Khám phá âm nhạc mới mỗi ngày',
    IconComponent: Training,
  },
  {
    title: 'Tập trung tối đa với giai điệu yêu thích',
    subtitle: 'Danh sách phát cho mọi khoảnh khắc trong ngày',
    IconComponent: Work,
  },
  {
    title: 'Quậy tưng bừng với những bản nhạc hot',
    subtitle: 'Chia sẻ niềm vui âm nhạc cùng bạn bè',
    IconComponent: Party,
  },
];

const OnboardingScreen = ({ navigation }) => {
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
      // Nếu là màn cuối cùng, hiển thị nút Start thay cho dot
      if (index === onboardingData.length - 1 && currentIndex === index) {
        return (
            <TouchableOpacity
                key={index}
                style={[styles.dot, styles.startButton]}
                onPress={() => navigation.navigate('Welcome')}
            >
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
        );
      }

      const isActive = index === currentIndex;
      return (
          <View
              key={index}
              style={[
                styles.dot,
                {
                  width: isActive ? 30 : 12,
                  backgroundColor: isActive
                      ? "#FFFFFF"
                      : "rgba(255, 255, 255, 0.5)",
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
            <Animated.View
                style={[styles.gradientContainer, animatedGradientStyle]}
            >
              <LinearGradient
                  colors={gradientColors[currentIndex]}
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
                { opacity: contentOpacity }
              ]}
          >
            <View style={styles.fixedContent}>
              <IconComponent style={styles.icon} />
              <Text style={styles.title}>
                {onboardingData[currentIndex].title}
              </Text>
            </View>
          </Animated.View>

          {/* Dots luôn hiển thị */}
          <View style={styles.dotsContainer}>
            {renderDots()}
          </View>

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
    marginVertical: 20,
    paddingHorizontal: 20,
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
  dot: {
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
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

export default OnboardingScreen;