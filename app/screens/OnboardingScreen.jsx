import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated as RNAnimated,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Training from "../assets/icons/Training";
import Work from "../assets/icons/Work";
import Party from "../assets/icons/Party";


const {width, height} = Dimensions.get('window');

// Khai báo một lần duy nhất
const gradientColors = ['#121212', '#212121', '#535353'];

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
  const [showDots, setShowDots] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const translateXGradient = useSharedValue(0);
  const contentOpacity = useSharedValue(1);

  // State và animation cho loading bar
  const [loadingProgress] = useState(new RNAnimated.Value(0));

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
        RNAnimated.timing(loadingProgress, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }).start(() => {
          // Khi loading xong, hiển thị Start button
          setShowStartButton(true);
        });
      }, 500); // Delay ngắn giữa việc biến mất dots và xuất hiện loading bar
    }, 2000);

    return () => clearTimeout(dotsTimer);
  }, [currentIndex]);


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
    // Don't allow going back if on the last slide
    if (currentIndex > 0 && currentIndex < onboardingData.length - 1) {
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
    // Nếu không phải slide cuối, render dots bình thường
    if (currentIndex < onboardingData.length - 1) {
      return onboardingData.map((_, index) => {
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
    }

    // Nếu là slide cuối
    return (
        <View style={styles.dotsWrapper}>
          {/* Hiển thị dots */}
          {showDots && (
              <View style={styles.dotsRow}>
                {onboardingData.map((_, index) => (
                    <View
                        key={index}
                        style={[
                          styles.dot,
                          {
                            width: index === currentIndex ? 30 : 12,
                            backgroundColor:
                                index === currentIndex
                                    ? "#FFFFFF"
                                    : "rgba(255, 255, 255, 0.5)",
                          },
                        ]}
                    />
                ))}
              </View>
          )}

          {/* Hiển thị loading */}
          {showLoading && !showStartButton && (
              <View style={styles.loadingContainer}>
                {/* Loading bar */}
                <View style={styles.loadingBarBackground}>
                  <RNAnimated.View
                      style={[
                        styles.loadingBarForeground,
                        {
                          width: loadingProgress.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%'],
                          }),
                        },
                      ]}
                  />
                </View>
              </View>
          )}

          {/* Nút Start */}
          {showStartButton && (
              <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => navigation.navigate('Welcome')}
              >
                <Text style={styles.startButtonText}>Start</Text>
              </TouchableOpacity>
          )}
        </View>
    );
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
                  colors={gradientColors}
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
  // Các style khác giữ nguyên không thay đổi
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

export default OnboardingScreen;