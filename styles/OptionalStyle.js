import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '@/constants/theme';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const ITEM_SPACING = 20;
const ITEM_WIDTH = 80; // Kích thước của avatar

const OptionalStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 40,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#000',
    },
    gridContainer: {
        paddingHorizontal: 10,
        paddingBottom: 100, // Tăng padding bottom để tránh content bị che bởi button
    },
    artistContainer: {
        width: (width - 60) / 3, // Chia đều không gian cho 3 cột
        marginBottom: ITEM_SPACING,
        alignItems: 'center',
    },
    artistButton: {
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 8,
        width: 80,  // Giữ nguyên kích thước avatar
        height: 80, // Giữ nguyên kích thước avatar
        alignItems: 'center',
        justifyContent: 'center',
    },
    artistImage: {
        width: 80,  // Giữ nguyên kích thước avatar
        height: 80, // Giữ nguyên kích thước avatar
        borderRadius: 40,
        backgroundColor: '#333',
    },
    selectedImage: {
        opacity: 0.5,  // Làm mờ ảnh khi được chọn
    },
    checkmark: {
        position: 'absolute',  // Định vị tuyệt đối so với container
        top: '50%',           // Căn giữa theo chiều dọc
        left: '50%',          // Căn giữa theo chiều ngang
        transform: [
            { translateX: -30 },  // Điều chỉnh để căn giữa (một nửa kích thước của icon)
            { translateY: -30 }   // Điều chỉnh để căn giữa (một nửa kích thước của icon)
        ],
        width: 60,                // Giữ kích thước lớn
        height: 60,               // Giữ kích thước lớn
        justifyContent: 'center', // Căn giữa nội dung bên trong
        alignItems: 'center',     // Căn giữa nội dung bên trong
        borderRadius: 30,         // Một nửa width/height để tạo hình tròn
    },
    artistName: {
        fontSize: 14,
        color: COLORS.text.primary,
        textAlign: 'center',
        marginTop: 8,
    },
    doneButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        width: 100,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    doneButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    loadMoreButton: {
        width: (width - 60) / 3, // Giống với artistContainer
        marginBottom: ITEM_SPACING,
        alignItems: 'center',
    },
    loadMoreContent: {
        width: 80,  // Giống kích thước avatar
        height: 80, // Giống kích thước avatar
        backgroundColor: '#f0f0f0',
        borderRadius: 40, // Giống với artistImage
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadMoreText: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
});

export default OptionalStyle;
