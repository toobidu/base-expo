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
            route: '/screens/screen-bottom/SearchingScreen'
        },
        {
            name: 'Thư viện',
            icon: 'book',
            route: '/screens/screen-bottom/PlaylistScreen'
        }
    ];

    const handleNavigation = (route) => {
        if (currentPath !== route) {
            router.replace(route, {
                immediate: true,
                animation: 'none'
            });
        }
    };

    return (
        <View style={styles.container}>
            {navigationItems.map((item) => {
                const isActive = currentPath === item.route;

                return (
                    <TouchableOpacity
                        key={item.name}
                        style={styles.tabButton}
                        onPress={() => handleNavigation(item.route)}
                        activeOpacity={0.7}
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
        height: 60, // Giảm từ 70 xuống 60
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        paddingBottom: 8, // Giảm từ 12 xuống 8
        paddingTop: 4, // Giảm từ 8 xuống 4
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4, // Giảm từ 6 xuống 4
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