import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { COLORS } from '@/constants/theme';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

const Bottom = () => {
    const router = useRouter();
    const currentPath = usePathname();

    const navigationItems = [
        {
            name: 'Trang chủ',
            icon: 'home',
            route: '/screens/screen-bottom/HomeScreen'
        },
        {
            name: 'Tìm kiếm',
            icon: 'magnifying-glass',
            route: '/screens/screen-bottom/SearchScreen'
        },
        {
            name: 'Thư viện',
            icon: 'book',
            route: '/screens/screen-bottom/PlaylistScreen'
        }
    ];

    // Xử lý chuyển trang chỉ khi màn hình hiện tại khác với màn hình muốn đến
    const handleNavigation = (route) => {
        if (currentPath !== route) {
            router.push(route);
        }
        // Nếu đã ở màn hình được chọn, không làm gì cả
    };

    return (
        <View style={styles.container}>
            {navigationItems.map((item) => {
                // Kiểm tra xem đường dẫn hiện tại có khớp với route của item hay không
                const isActive = currentPath === item.route;

                return (
                    <TouchableOpacity
                        key={item.name}
                        style={styles.tabButton}
                        onPress={() => handleNavigation(item.route)}
                        activeOpacity={0.7}
                        // Vô hiệu hóa nút khi đang ở màn hình đó
                        disabled={isActive}
                    >
                        <Entypo
                            name={item.icon}
                            size={isActive ? 28 : 24}
                            color={isActive ? COLORS.primary : COLORS.text.secondary}
                        />
                        <Text
                            style={[
                                styles.tabText,
                                isActive && styles.activeTabText
                            ]}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 70, // Tăng height từ 60 lên 70
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        paddingBottom: 12, // Tăng paddingBottom từ 8 lên 12
        paddingTop: 8, // Thêm paddingTop
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6, // Giảm từ 8 xuống 6
    },
    tabText: {
        fontSize: 12,
        marginTop: 4,
        color: COLORS.text.secondary,
    },
    activeTabText: {
        color: COLORS.primary,
        fontWeight: '600',
    },
});

export default Bottom;