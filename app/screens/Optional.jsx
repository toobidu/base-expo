import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    TextInput
} from 'react-native';
import axios from 'axios';
import OptionalStyle from "@/styles/OptionalStyle";
import {router} from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const API_URL = '......'; //todo: Thay bằng end-point

const Optional = () => {
    // State
    const [artists, setArtists] = useState([]); // Danh sách nghệ sĩ ban đầu
    const [selectedArtist, setSelectedArtist] = useState(null); // Nghệ sĩ chính được chọn
    const [relatedArtists, setRelatedArtists] = useState([]); // Nghệ sĩ liên quan
    const [selectedIds, setSelectedIds] = useState([]); // ID các nghệ sĩ đã chọn
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [error, setError] = useState(''); // Thông báo lỗi
    const [showRelated, setShowRelated] = useState(false); // Hiển thị danh sách liên quan?
    const [searchQuery, setSearchQuery] = useState('');

    const filteredArtists = artists.filter(artist => 
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const styles = OptionalStyle;

    // Hàm lấy danh sách nghệ sĩ ban đầu
    const fetchArtists = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/artists`); // todo: Thay bằng end-point
            setArtists(response.data);
        } catch (err) {
            setError('Không thể tải danh sách nghệ sĩ!');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Hàm lấy nghệ sĩ cùng thể loại
    const fetchRelatedArtists = async (genre) => {
        try {
            const response = await axios.get(
                `${API_URL}/artists/related`, //todo: Thay bằng end-point
                { params: { genre, excludeId: selectedArtist?.id } } // Thêm excludeId
            );
            setRelatedArtists(response.data);
        } catch (err) {
            setError('Không thể tải nghệ sĩ liên quan!');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Xử lý khi chọn nghệ sĩ
    const handleSelectArtist = (artist) => {
        // Giới hạn 3 nghệ sĩ
        if (selectedIds.length >= 3) {
            Alert.alert('Thông báo', 'Bạn chỉ được chọn tối đa 3 nghệ sĩ!');
            return;
        }

        // Cập nhật state
        setSelectedArtist(artist);
        setSelectedIds([...selectedIds, artist.id]);
        setShowRelated(true);

        // Lấy nghệ sĩ cùng thể loại
        fetchRelatedArtists(artist.genre);
    };

    // Xử lý khi hủy chọn
    const handleUnselect = () => {
        setSelectedArtist(null);
        setSelectedIds([]);
        setShowRelated(false);
    };

    // Xử lý nút "Xong"
    const handleDone = async () => {
        if (selectedIds.length < 1) {
            Alert.alert('Thông báo', 'Vui lòng chọn ít nhất 1 nghệ sĩ!');
            return;
        }

        try {
            const response = await axios.post(
                `${API_URL}/selected-artists`, //todo: Thay bằng end-point
                { selectedIds },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.success) {
                Alert.alert('Thành công', 'Đã lưu lựa chọn của bạn!');
                // Reset state
                setSelectedIds([]);
                setSelectedArtist(null);
                setShowRelated(false);
                router.push('screens/MainScreen');
            } else {
                Alert.alert('Lỗi', 'Lưu dữ liệu thất bại!');
            }
        } catch (err) {
            console.error(err);
            Alert.alert('Lỗi', 'Có lỗi xảy ra!');
        }
    };

    // Xử lý khi chọn nghệ sĩ liên quan
    const handleSelectRelatedArtist = (artist) => {
        if (selectedIds.length >= 3) return;
        setSelectedIds([...selectedIds, artist.id]);
    };

    // Xử lý khi hủy chọn nghệ sĩ liên quan
    const handleUnselectRelated = (artistId) => {
        const newSelected = selectedIds.filter(id => id !== artistId);
        setSelectedIds(newSelected);
    };

    useEffect(() => {
        fetchArtists();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Fixed Header */}
            <View style={styles.fixedHeader}>
                <View style={styles.headerTop}>
                    <Text style={styles.title}>Chọn 3 nghệ sĩ bạn thích</Text>
                    <TouchableOpacity
                        style={[
                            styles.doneButton,
                            { opacity: selectedIds.length > 0 ? 1 : 0.5 },
                        ]}
                        onPress={handleDone}
                        disabled={selectedIds.length === 0}
                    >
                        <Text style={styles.doneText}>Xong</Text>
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm nghệ sĩ..."
                        placeholderTextColor="#666"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Selected Count */}
                <View style={styles.selectedCount}>
                    <Text style={styles.selectedCountText}>
                        Đã chọn {selectedIds.length}/3 nghệ sĩ
                    </Text>
                </View>
            </View>

            {/* Scrollable Content */}
            <ScrollView 
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {loading && (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}

                {error && (
                    <Text style={styles.error}>{error}</Text>
                )}

                {!loading && !error && (
                    <View style={styles.content}>
                        {showRelated ? (
                            // Hiển thị nghệ sĩ chính và liên quan
                            <View style={styles.selectedContainer}>
                                {/* Nghệ sĩ chính */}
                                <TouchableOpacity
                                    style={styles.selectedArtistCard}
                                    onPress={handleUnselect}
                                >
                                    <Image
                                        source={{ uri: selectedArtist?.image_url }}
                                        style={styles.selectedImage}
                                    />
                                    <Text style={styles.selectedName}>
                                        {selectedArtist?.name}
                                    </Text>
                                </TouchableOpacity>

                                {/* Danh sách nghệ sĩ liên quan */}
                                <FlatList
                                    data={relatedArtists}
                                    numColumns={3}
                                    scrollEnabled={false}
                                    contentContainerStyle={styles.relatedContainer}
                                    renderItem={({ item }) => (
                                        <ArtistCard
                                            artist={item}
                                            isSelected={selectedIds.includes(item.id)}
                                            onSelected={() => handleSelectRelatedArtist(item)}
                                            onUnselected={() => handleUnselectRelated(item.id)}
                                        />
                                    )}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                        ) : (
                            // Hiển thị danh sách nghệ sĩ ban đầu
                            <FlatList
                                data={filteredArtists}
                                numColumns={3}
                                scrollEnabled={false}
                                contentContainerStyle={styles.artistGrid}
                                renderItem={({ item }) => (
                                    <ArtistCard
                                        artist={item}
                                        isSelected={selectedIds.includes(item.id)}
                                        onSelected={() => handleSelectArtist(item)}
                                    />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                            />
                        )}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

// Component ArtistCard
const ArtistCard = ({
                        artist,
                        isSelected,
                        onSelected,
                        onUnselected,
                    }) => {
    return (
        <TouchableOpacity
            style={[
                styles.artistCard,
                { opacity: isSelected ? 0.6 : 1 },
            ]}
            onPress={() => {
                if (isSelected) {
                    onUnselected?.();
                } else {
                    onSelected();
                }
            }}
        >
            <Image
                source={{ uri: artist.image_url }}
                style={styles.artistImage}
            />
            {isSelected && <View style={styles.checkMark} />}
            <Text style={styles.artistName}>{artist.name}</Text>
        </TouchableOpacity>
    );
};


export default Optional;