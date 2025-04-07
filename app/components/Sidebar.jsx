import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { COLORS } from '@/constants/theme';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Sidebar = ({ isVisible, onClose, userData, translateX }) => {
    const router = useRouter();

    const menuItems = [
        {
            icon: 'user',
            title: 'Hồ sơ',
            onPress: () => router.push('/screens/ProfileScreen')
        },
        {
            icon: 'cog',
            title: 'Cài đặt',
            onPress: () => router.push('/screens/SettingsScreen')
        },
        {
            icon: 'help-with-circle',
            title: 'Trợ giúp',
            onPress: () => router.push('/screens/HelpScreen')
        },
        {
            icon: 'log-out',
            title: 'Đăng xuất',
            onPress: () => {
                // TODO: Implement logout logic
                router.push('/screens/WelcomeScreen');
            }
        }
    ];

    if (!isVisible) return null;

    return (
        <Animated.View 
            style={[
                styles.container,
                {
                    transform: [{ translateX }]
                }
            ]}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Entypo name="chevron-left" size={24} color={COLORS.text.primary} />
                </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
                <Image
                    source={{ uri: userData.avatarUrl }}
                    style={styles.avatar}
                />
                <Text style={styles.userName}>{userData.name}</Text>
                <Text style={styles.userEmail}>{userData.email}</Text>
                {userData.premium && (
                    <View style={styles.premiumBadge}>
                        <Text style={styles.premiumText}>Premium</Text>
                    </View>
                )}
            </View>

            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={item.onPress}
                    >
                        <Entypo name={item.icon} size={24} color={COLORS.text.primary} />
                        <Text style={styles.menuText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '80%',
        backgroundColor: COLORS.background,
        zIndex: 1000,
        elevation: 5,
        borderRightWidth: 1,
        borderRightColor: 'rgba(255,255,255,0.1)',
    },
    header: {
        height: 60,
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    closeButton: {
        padding: 8,
    },
    userInfo: {
        padding: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 12,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: COLORS.text.secondary,
        marginBottom: 8,
    },
    premiumBadge: {
        backgroundColor: '#1DB954',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    premiumText: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
    },
    menuContainer: {
        padding: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    menuText: {
        marginLeft: 16,
        fontSize: 16,
        color: COLORS.text.primary,
    },
});

export default Sidebar;