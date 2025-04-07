import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bottom from '../../components/Bottom';
// import apiInstance from '@/api/apiInstance';

const SEARCH_HISTORY_KEY = '@search_history';
const MAX_HISTORY_ITEMS = 10;

// Mock data 
const mockSearchResults = {
    songs: [
        {
            id: '1',
            title: 'Hãy Trao Cho Anh',
            artist: 'Sơn Tùng M-TP',
            artwork: 'https://i.scdn.co/image/ab6761610000e5eb352d5672d70464e67c3ae963',
            duration: '4:05'
        },
        {
            id: '2',
            title: 'Chúng Ta Của Hiện Tại',
            artist: 'Sơn Tùng M-TP',
            artwork: 'https://i.scdn.co/image/ab6761610000e5eb352d5672d70464e67c3ae963',
            duration: '3:52'
        }
    ],
    artists: [
        {
            id: '1',
            name: 'Sơn Tùng M-TP',
            image: 'https://i.scdn.co/image/ab6761610000e5eb352d5672d70464e67c3ae963',
            followers: '1.2M'
        }
    ]
};

const SearchingScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);

    // Load search history when component mounts
    useEffect(() => {
        loadSearchHistory();
    }, []);

    const loadSearchHistory = async () => {
        try {
            const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
            if (history) {
                setSearchHistory(JSON.parse(history));
            }
        } catch (error) {
            console.error('Error loading search history:', error);
        }
    };

    const saveSearchHistory = async (query) => {
        try {
            const updatedHistory = [
                query,
                ...searchHistory.filter(item => item !== query)
            ].slice(0, MAX_HISTORY_ITEMS);
            
            await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
            setSearchHistory(updatedHistory);
        } catch (error) {
            console.error('Error saving search history:', error);
        }
    };

    const clearSearchHistory = async () => {
        try {
            await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
            setSearchHistory([]);
        } catch (error) {
            console.error('Error clearing search history:', error);
        }
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setSearchResults(null);
            return;
        }

        setLoading(true);
        try {
            // TODO: Replace with real API call
            // const response = await apiInstance.get(`/search?q=${query}`);
            // setSearchResults(response.data);
            // await saveSearchHistory(query);
            
            // Simulating API call with mock data
            setTimeout(() => {
                setSearchResults(mockSearchResults);
                saveSearchHistory(query);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Search error:', error);
            setLoading(false);
        }
    };

    const handleHistoryItemPress = (query) => {
        setSearchQuery(query);
        handleSearch(query);
        setIsInputFocused(false);
    };

    const renderHistoryItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.historyItem} 
            onPress={() => handleHistoryItemPress(item)}
        >
            <Ionicons name="time-outline" size={20} color="#666" style={styles.historyIcon} />
            <Text style={styles.historyText}>{item}</Text>
            <TouchableOpacity
                onPress={() => {
                    const newHistory = searchHistory.filter(h => h !== item);
                    setSearchHistory(newHistory);
                    AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
                }}
                style={styles.historyDeleteButton}
            >
                <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const dismissKeyboard = () => {
        Keyboard.dismiss();
        setIsInputFocused(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm bài hát, nghệ sĩ..."
                    placeholderTextColor="#666"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onFocus={() => setIsInputFocused(true)}
                    onSubmitEditing={() => {
                        handleSearch(searchQuery);
                        setIsInputFocused(false);
                    }}
                />
                {searchQuery !== '' && (
                    <TouchableOpacity 
                        onPress={() => {
                            setSearchQuery('');
                            setSearchResults(null);
                        }}
                        style={styles.clearButton}
                    >
                        <Ionicons name="close-circle" size={20} color="#666" />
                    </TouchableOpacity>
                )}
            </View>

            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.contentContainer}>
                    {isInputFocused && searchHistory.length > 0 ? (
                        <View style={styles.historyContainer}>
                            <View style={styles.historyHeader}>
                                <Text style={styles.historyTitle}>Lịch sử tìm kiếm</Text>
                                <TouchableOpacity onPress={clearSearchHistory}>
                                    <Text style={styles.clearHistoryText}>Xóa tất cả</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={searchHistory}
                                renderItem={renderHistoryItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    ) : loading ? (
                        <ActivityIndicator style={styles.loader} color={COLORS.primary} />
                    ) : searchResults ? (
                        <FlatList
                            data={[
                                { title: 'Bài hát', data: searchResults.songs },
                                { title: 'Nghệ sĩ', data: searchResults.artists }
                            ]}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>{item.title}</Text>
                                    <FlatList
                                        data={item.data}
                                        keyExtractor={(subItem) => subItem.id}
                                        renderItem={item.title === 'Bài hát' ? renderSongItem : renderArtistItem}
                                        scrollEnabled={false}
                                    />
                                </View>
                            )}
                        />
                    ) : !isInputFocused ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>
                                Tìm kiếm bài hát hoặc nghệ sĩ yêu thích của bạn
                            </Text>
                        </View>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
            <Bottom />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    clearButton: {
        padding: 4,
    },
    // New styles for search history
    historyContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    historyTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.text.primary,
    },
    clearHistoryText: {
        fontSize: 14,
        color: COLORS.primary,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    historyIcon: {
        marginRight: 12,
    },
    historyText: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text.primary,
    },
    historyDeleteButton: {
        padding: 4,
    },
    // Existing styles remain the same...
    loader: {
        marginTop: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        marginHorizontal: 16,
        marginBottom: 12,
    },
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    songArtwork: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    songInfo: {
        flex: 1,
        marginLeft: 12,
    },
    songTitle: {
        fontSize: 16,
        color: COLORS.text.primary,
        fontWeight: '500',
    },
    artistName: {
        fontSize: 14,
        color: COLORS.text.secondary,
        marginTop: 2,
    },
    duration: {
        fontSize: 14,
        color: COLORS.text.secondary,
        marginLeft: 8,
    },
    artistItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    artistImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    artistInfo: {
        flex: 1,
        marginLeft: 12,
    },
    followers: {
        fontSize: 14,
        color: COLORS.text.secondary,
        marginTop: 2,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    emptyStateText: {
        fontSize: 16,
        color: COLORS.text.secondary,
        textAlign: 'center',
    },
});

export default SearchingScreen;
