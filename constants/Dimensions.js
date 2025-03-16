import { Dimensions } from 'react-native';

// Lấy width và height từ Dimensions
const { width, height } = Dimensions.get('window');

export default {
    screenWidth: width,
    screenHeight: height,
};