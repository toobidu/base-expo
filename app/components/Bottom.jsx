
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import Entypo from '@expo/vector-icons/Entypo';

const Bottom = () => {
    const router = useRouter();
    const currentPath = usePathname();

    const navigationItems = [
        {
            name: 'Home',
            icon: <Entypo name="home" size={24} color="black" />, // Outline khi không active
            activeIcon: <Entypo name="home" size={28} color="black" />, // Tăng size khi active
            route: '/screens/screen-bottom/HomeScreen'
        },
        {
            name: 'Search',
            icon: <Entypo name="magnifying-glass" size={24} color="black" />,
            activeIcon: <Entypo name="magnifying-glass" size={28} color="black" />,
            route: '/screens/screen-bottom/SearchScreen'
        },
        {
            name: 'Playlist',
            icon: <Entypo name="list" size={24} color="black" />,
            activeIcon: <Entypo name="list" size={28} color="black" />,
            route: '/screens/screen-bottom/PlaylistScreen'
        }
    ];

    const handleNavigation = (route) => {
        router.push(route);
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
                    >
                        <Ionicons
                            name={isActive ? item.activeIcon : item.icon}
                            size={24}
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
        height: 60,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        paddingBottom: 8,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
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
