import React, { useEffect, useState, useRef } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    ScrollView, 
    Image, 
    TouchableOpacity, 
    Animated,
    Platform 
} from 'react-native';
import { BlurView } from 'expo-blur';
import Bottom from '../../components/Bottom';
import { COLORS } from '@/constants/theme';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Sidebar from '../../components/Sidebar';
// import apiInstance from '@/api/apiInstance';

// Mock data cho ứng dụng
const MOCK_DATA = {
    // Thông tin người dùng - sẽ được lấy từ API endpoint /api/user/profile
    user: {
        id: 'user123',
        name: 'Nguyễn Văn A',
        avatarUrl: 'https://picsum.photos/seed/user123/100/100',
        email: 'nguyenvana@example.com',
        premium: true,
    },

    // Bài hát nghe gần đây - sẽ được lấy từ API endpoint /api/user/recently-played
    recentlyPlayed: [
        {
            id: 'song1',
            title: 'Hoa Nở Không Màu',
            artist: 'Hoài Lâm',
            albumCover: 'https://picsum.photos/seed/song1/200/200',
            duration: '4:12',
            lastPlayed: '2025-04-05T18:30:00Z'
        },
        {
            id: 'song2',
            title: 'Chúng Ta Của Hiện Tại',
            artist: 'Sơn Tùng M-TP',
            albumCover: 'https://picsum.photos/seed/song2/200/200',
            duration: '4:33',
            lastPlayed: '2025-04-05T15:12:00Z'
        },
        {
            id: 'song3',
            title: 'Waiting For You',
            artist: 'MONO',
            albumCover: 'https://picsum.photos/seed/song3/200/200',
            duration: '4:25',
            lastPlayed: '2025-04-04T21:45:00Z'
        },
        {
            id: 'song4',
            title: 'Có Chắc Yêu Là Đây',
            artist: 'Sơn Tùng M-TP',
            albumCover: 'https://picsum.photos/seed/song4/200/200',
            duration: '3:50',
            lastPlayed: '2025-04-04T18:20:00Z'
        },
        {
            id: 'song5',
            title: 'Bước Qua Nhau',
            artist: 'Vũ',
            albumCover: 'https://picsum.photos/seed/song5/200/200',
            duration: '4:05',
            lastPlayed: '2025-04-03T22:10:00Z'
        }
    ],

    // Danh sách các playlist đề xuất - sẽ được lấy từ API endpoint /api/recommendations/playlists
    recommendedPlaylists: [
        {
            id: 'playlist1',
            title: 'V-Pop Hits 2025',
            description: 'Dựa trên lịch sử nghe của bạn',
            coverImage: 'https://picsum.photos/seed/playlist1/200/200',
            totalSongs: 25,
            totalDuration: '1h 45m'
        },
        {
            id: 'playlist2',
            title: 'Acoustic Chill',
            description: 'Những bản acoustic nhẹ nhàng',
            coverImage: 'https://picsum.photos/seed/playlist2/200/200',
            totalSongs: 18,
            totalDuration: '1h 12m'
        },
        {
            id: 'playlist3',
            title: 'Rap Việt Tuyển Chọn',
            description: 'Những bản rap Việt hot nhất',
            coverImage: 'https://picsum.photos/seed/playlist3/200/200',
            totalSongs: 20,
            totalDuration: '1h 30m'
        },
        {
            id: 'playlist4',
            title: 'EDM Workout',
            description: 'Năng lượng cho buổi tập của bạn',
            coverImage: 'https://picsum.photos/seed/playlist4/200/200',
            totalSongs: 15,
            totalDuration: '58m'
        },
        {
            id: 'playlist5',
            title: 'Study Focus',
            description: 'Tập trung học tập và làm việc',
            coverImage: 'https://picsum.photos/seed/playlist5/200/200',
            totalSongs: 22,
            totalDuration: '1h 35m'
        }
    ],

    // Danh sách các đề xuất từ SoundClone - sẽ được lấy từ API endpoint /api/recommendations/featured
    featuredPlaylists: [
        {
            id: 'featured1',
            title: 'New Releases',
            description: 'Những bản phát hành mới nhất',
            coverImage: 'https://picsum.photos/seed/featured1/200/200',
            totalSongs: 30,
            totalDuration: '2h 05m'
        },
        {
            id: 'featured2',
            title: 'Top 50 Vietnam',
            description: 'Những bài hát được nghe nhiều nhất',
            coverImage: 'https://picsum.photos/seed/featured2/200/200',
            totalSongs: 50,
            totalDuration: '3h 15m'
        },
        {
            id: 'featured3',
            title: 'Indie Vietnam',
            description: 'Những nghệ sĩ indie Việt nổi bật',
            coverImage: 'https://picsum.photos/seed/featured3/200/200',
            totalSongs: 25,
            totalDuration: '1h 42m'
        },
        {
            id: 'featured4',
            title: 'Chill Weekend',
            description: 'Thư giãn cuối tuần',
            coverImage: 'https://picsum.photos/seed/featured4/200/200',
            totalSongs: 20,
            totalDuration: '1h 20m'
        },
        {
            id: 'featured5',
            title: 'Throwback Hits',
            description: 'Nhạc hay một thời',
            coverImage: 'https://picsum.photos/seed/featured5/200/200',
            totalSongs: 35,
            totalDuration: '2h 25m'
        }
    ],
};

const HomeScreen = () => {
    const router = useRouter();
    const [greeting, setGreeting] = useState('');
    const [userData, setUserData] = useState(MOCK_DATA.user);
    const [recentlyPlayed, setRecentlyPlayed] = useState(MOCK_DATA.recentlyPlayed);
    const [recommendedPlaylists, setRecommendedPlaylists] = useState(MOCK_DATA.recommendedPlaylists);
    const [featuredPlaylists, setFeaturedPlaylists] = useState(MOCK_DATA.featuredPlaylists);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const translateX = useRef(new Animated.Value(-1000)).current;
    const blurOpacity = useRef(new Animated.Value(0)).current;

    const toggleSidebar = () => {
        if (isSidebarVisible) {
            // Hide sidebar and blur
            Animated.parallel([
                Animated.timing(translateX, {
                    toValue: -1000,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(blurOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start(() => setIsSidebarVisible(false));
        } else {
            // Show sidebar and blur
            setIsSidebarVisible(true);
            Animated.parallel([
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(blurOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        }
    };

    // TODO: Implement API calls using axios
    // const fetchUserData = async () => {
    //     try {
    //         const response = await apiInstance.get('/api/user/profile');
    //         setUserData(response.data);
    //     } catch (error) {
    //         console.error('Error fetching user data:', error);
    //     }
    // };

    // const fetchRecentlyPlayed = async () => {
    //     try {
    //         const response = await apiInstance.get('/api/user/recently-played');
    //         setRecentlyPlayed(response.data);
    //     } catch (error) {
    //         console.error('Error fetching recently played:', error);
    //     }
    // };

    // const fetchRecommendedPlaylists = async () => {
    //     try {
    //         const response = await apiInstance.get('/api/recommendations/playlists');
    //         setRecommendedPlaylists(response.data);
    //     } catch (error) {
    //         console.error('Error fetching recommended playlists:', error);
    //     }
    // };

    // const fetchFeaturedPlaylists = async () => {
    //     try {
    //         const response = await apiInstance.get('/api/recommendations/featured');
    //         setFeaturedPlaylists(response.data);
    //     } catch (error) {
    //         console.error('Error fetching featured playlists:', error);
    //     }
    // };

    const getGreetingByTime = () => {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            return 'Chào buổi sáng';
        } else if (currentHour >= 12 && currentHour < 18) {
            return 'Chào buổi chiều';
        } else if (currentHour >= 18 && currentHour < 22) {
            return 'Chào buổi tối';
        } else {
            return 'Muộn rồi nhỉ';
        }
    };

    useEffect(() => {
        setGreeting(getGreetingByTime());
        const intervalId = setInterval(() => {
            setGreeting(getGreetingByTime());
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // TODO: Implement API calls when ready

    }, []);

    // TODO: Implement with axios
    // const handleSongPress = async (songId) => {
    //     try {
    //         await apiInstance.post('/api/songs/play', { songId });
    //         console.log(`Playing song ${songId}`);
    //     } catch (error) {
    //         console.error('Error playing song:', error);
    //     }
    // };

    const handleSongPress = (songId) => {
        console.log(`Song ${songId} selected (mock)`);
    };

    // TODO: Implement with axios
    // const handlePlaylistPress = async (playlistId) => {
    //     try {
    //         router.push(`/screens/PlaylistDetail/${playlistId}`);
    //     } catch (error) {
    //         console.error('Error navigating to playlist:', error);
    //     }
    // };

    const handlePlaylistPress = (playlistId) => {
        console.log(`Playlist ${playlistId} selected (mock)`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContent}>
                <View style={styles.header}>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/screens/header-screen/NoticeScreen')}>
                            <Entypo name="bell" size={24} color={COLORS.text.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Entypo name="clock" size={24} color={COLORS.text.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={toggleSidebar}>
                            <Image
                                source={{ uri: userData.avatarUrl }}
                                style={styles.avatarImage}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.greeting}>{greeting}</Text>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/*todo: Phần này sẽ lấy dữ liệu từ lịch sử nghe (nếu không có thì nó sẽ không xuất hiện)*/}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Phát gần đây</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                            {recentlyPlayed.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.musicCard}
                                    onPress={() => handleSongPress(item.id)}
                                >
                                    <Image
                                        style={styles.albumCover}
                                        source={{ uri: item.albumCover }}
                                    />
                                    <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
                                    <Text style={styles.artistName} numberOfLines={1}>{item.artist}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/*todo: Phần này sẽ lấy dữ liệu từ cái gợi ý đã chọn 3 nghệ sĩ*/}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Có thể bạn sẽ thích</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                            {recommendedPlaylists.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.playlistCard}
                                    onPress={() => handlePlaylistPress(item.id)}
                                >
                                    <Image
                                        style={styles.playlistCover}
                                        source={{ uri: item.coverImage }}
                                    />
                                    <Text style={styles.playlistTitle} numberOfLines={2}>{item.title}</Text>
                                    <Text style={styles.playlistDescription} numberOfLines={2}>{item.description}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/*todo: Phần này sẽ gợi ý cho những bài hát đang hot*/}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>SoundCLone lựa chọn cho bạn</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                            {featuredPlaylists.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.playlistCard}
                                    onPress={() => handlePlaylistPress(item.id)}
                                >
                                    <Image
                                        style={styles.playlistCover}
                                        source={{ uri: item.coverImage }}
                                    />
                                    <Text style={styles.playlistTitle} numberOfLines={2}>{item.title}</Text>
                                    <Text style={styles.playlistDescription} numberOfLines={2}>{item.description}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>
                <Bottom />
            </View>

            {/* Blur Overlay */}
            {isSidebarVisible && (
                <Animated.View
                    style={[
                        styles.blurContainer,
                        { opacity: blurOpacity }
                    ]}
                >
                    <BlurView
                        intensity={20}
                        style={StyleSheet.absoluteFill}
                        tint="dark"
                    />
                    <TouchableOpacity
                        style={StyleSheet.absoluteFill}
                        onPress={toggleSidebar}
                    />
                </Animated.View>
            )}

            {/* Sidebar */}
            <Sidebar 
                isVisible={isSidebarVisible}
                onClose={toggleSidebar}
                userData={userData}
                translateX={translateX}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    mainContent: {
        flex: 1,
    },
    blurContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', // Fallback for devices that don't support BlurView
        zIndex: 999,
    },
    content: {
        flex: 1,
        paddingBottom: 80,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 60, // Cố định chiều cao header
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1DB954',
        lineHeight: 30, // Thêm line-height để text được căn đều
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center', // Căn giữa theo chiều dọc
        gap: 8, // Giảm khoảng cách giữa các icon xuống
    },
    iconButton: {
        width: 32, // Giảm kích thước button
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 0, // Bỏ padding bên phải
    },
    // Style mới cho avatar
    avatarImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.text.secondary,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    horizontalScroll: {
        paddingLeft: 16,
    },
    musicCard: {
        width: 150,
        marginRight: 16,
    },
    albumCover: {
        width: 150,
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    songTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text.primary,
        marginBottom: 4,
    },
    artistName: {
        fontSize: 12,
        color: COLORS.text.secondary,
    },
    playlistCard: {
        width: 180,
        marginRight: 16,
    },
    playlistCover: {
        width: 180,
        height: 180,
        borderRadius: 8,
        marginBottom: 8,
    },
    playlistTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text.primary,
        marginBottom: 4,
    },
    playlistDescription: {
        fontSize: 14,
        color: COLORS.text.secondary,
    },
});

export default HomeScreen;