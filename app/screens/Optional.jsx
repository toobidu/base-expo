import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import OptionalStyle from "@/styles/OptionalStyle";
import Entypo from '@expo/vector-icons/Entypo';

// Mock data for artists
//todo: get data from api
const mockArtists =
    [
        {
            "id": 1,
            "name": "Taylor Swift",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_4.png"
        },
        {
            "id": 2,
            "name": "The Weeknd",
            "genre": "R&B",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a0/The_Weeknd_Portrait_by_Brian_Ziff.jpg"
        },
        {
            "id": 3,
            "name": "Billie Eilish",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/92/BillieEilishO2160622_%2819_of_45%29_%2852153214339%29_%28cropped_3%29.jpg"
        },
        {
            "id": 4,
            "name": "Drake",
            "genre": "Hip-hop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/28/Drake_July_2016.jpg"
        },
        {
            "id": 5,
            "name": "Ariana Grande",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Ariana_Grande_Grammys_Red_Carpet_2020.png"
        },
        {
            "id": 6,
            "name": "Ed Sheeran",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Ed_Sheeran-6886_%28cropped%29.jpg"
        },
        {
            "id": 7,
            "name": "Kendrick Lamar",
            "genre": "Hip-hop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/32/Kendrick_Lamar_2016.jpg"
        },
        {
            "id": 8,
            "name": "Dua Lipa",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Dua_Lipa_2020.png"
        },
        {
            "id": 9,
            "name": "Post Malone",
            "genre": "Hip-hop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/06/Post_Malone_at_the_2019_American_Music_Awards.png"
        },
        {
            "id": 10,
            "name": "Beyoncé",
            "genre": "R&B",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/17/Beyonc%C3%A9_at_The_Lion_King_European_Premiere_2019.png"
        },
        {
            "id": 11,
            "name": "Travis Scott",
            "genre": "Hip-hop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/14/Travis_Scott_-_Openair_Frauenfeld_2019_01_%28cropped%29.jpg"
        },
        {
            "id": 12,
            "name": "Shawn Mendes",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/01/Shawn_Mendes_-_Wonder_%28cropped%29.png"
        },
        {
            "id": 13,
            "name": "Harry Styles",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/85/Harry_Styles_Wembley_June_2023_-_230618_%28cropped%29.jpg"
        },
        {
            "id": 14,
            "name": "Rihanna",
            "genre": "R&B",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c6/Rihanna_at_the_Met_Gala_2017_%28cropped%29.jpg"
        },
        {
            "id": 15,
            "name": "J. Cole",
            "genre": "Hip-hop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/J._Cole_at_Radio_1%27s_Big_Weekend_2015_%28cropped%29.jpg"
        },
        {
            "id": 16,
            "name": "Doja Cat",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Doja_Cat_2019.png"
        },
        {
            "id": 17,
            "name": "Bruno Mars",
            "genre": "R&B",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Bruno_Mars_24K_Magic_World_Tour_Los_Angeles_3_%28cropped%29.jpg"
        },
        {
            "id": 18,
            "name": "SZA",
            "genre": "R&B",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/SZA_-_Ctrl_%28cropped%29.png"
        },
        {
            "id": 19,
            "name": "Olivia Rodrigo",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Olivia_Rodrigo_11-19-2021_%28cropped%29.jpg"
        },
        {
            "id": 20,
            "name": "Imagine Dragons",
            "genre": "Rock",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Imagine_Dragons_2017_%28cropped%29.jpg"
        },
        {
            "id": 21,
            "name": "Coldplay",
            "genre": "Rock",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Coldplay_-_Global_Citizen_Festival_Hamburg_07_%28cropped%29.jpg"
        },
        {
            "id": 22,
            "name": "Sam Smith",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Sam_Smith_2017_%28cropped%29.png"
        },
        {
            "id": 23,
            "name": "Lizzo",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Lizzo_2018_%28cropped%29.jpg"
        },
        {
            "id": 24,
            "name": "Halsey",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Halsey_2021_%28cropped%29.jpg"
        },
        {
            "id": 25,
            "name": "Lil Nas X",
            "genre": "Hip-hop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Lil_Nas_X_2021_%28cropped%29.jpg"
        },
        {
            "id": 26,
            "name": "Lady Gaga",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Lady_Gaga_2017_%28cropped%29.jpg"
        },
        {
            "id": 27,
            "name": "Kanye West",
            "genre": "Hip-hop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Kanye_West_2019_%28cropped%29.jpg"
        },
        {
            "id": 28,
            "name": "Adele",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Adele_2016_%28cropped%29.jpg"
        },
        {
            "id": 29,
            "name": "Eminem",
            "genre": "Hip-hop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Eminem_2018_%28cropped%29.jpg"
        },
        {
            "id": 30,
            "name": "Miley Cyrus",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Miley_Cyrus_2021_%28cropped%29.jpg"
        },
        {
            "id": 31,
            "name": "Chris Brown",
            "genre": "R&B",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Chris_Brown_2015_%28cropped%29.jpg"
        },
        {
            "id": 32,
            "name": "Katy Perry",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Katy_Perry_2019_%28cropped%29.jpg"
        },
        {
            "id": 33,
            "name": "Nicki Minaj",
            "genre": "Hip-hop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nicki_Minaj_2018_%28cropped%29.jpg"
        },
        {
            "id": 34,
            "name": "Justin Bieber",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Justin_Bieber_2020_%28cropped%29.jpg"
        },
        {
            "id": 35,
            "name": "Alicia Keys",
            "genre": "R&B",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Alicia_Keys_2019_%28cropped%29.jpg"
        },
        {
            "id": 36,
            "name": "Cardi B",
            "genre": "Hip-hop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Cardi_B_2018_%28cropped%29.jpg"
        },
        {
            "id": 37,
            "name": "Selena Gomez",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Selena_Gomez_2020_%28cropped%29.jpg"
        },
        {
            "id": 38,
            "name": "Frank Ocean",
            "genre": "R&B",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Frank_Ocean_2016_%28cropped%29.jpg"
        },
        {
            "id": 39,
            "name": "Demi Lovato",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Demi_Lovato_2017_%28cropped%29.jpg"
        },
        {
            "id": 40,
            "name": "Tyler, The Creator",
            "genre": "Hip-hop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tyler%2C_The_Creator_2019_%28cropped%29.jpg"
        },
        {
            "id": 41,
            "name": "Camila Cabello",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Camila_Cabello_2019_%28cropped%29.jpg"
        },
        {
            "id": 42,
            "name": "Usher",
            "genre": "R&B",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Usher_2016_%28cropped%29.jpg"
        },
        {
            "id": 43,
            "name": "Megan Thee Stallion",
            "genre": "Hip-hop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Megan_Thee_Stallion_2021_%28cropped%29.jpg"
        },
        {
            "id": 44,
            "name": "The Chainsmokers",
            "genre": "EDM",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/The_Chainsmokers_2016_%28cropped%29.jpg"
        },
        {
            "id": 45,
            "name": "Zayn Malik",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Zayn_Malik_2015_%28cropped%29.jpg"
        },
        {
            "id": 46,
            "name": "Tinashe",
            "genre": "R&B",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tinashe_2015_%28cropped%29.jpg"
        },
        {
            "id": 47,
            "name": "Calvin Harris",
            "genre": "EDM",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Calvin_Harris_2017_%28cropped%29.jpg"
        },
        {
            "id": 48,
            "name": "Sabrina Carpenter",
            "genre": "Pop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Sabrina_Carpenter_2021_%28cropped%29.jpg"
        },
        {
            "id": 49,
            "name": "21 Savage",
            "genre": "Hip-hop",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/21_Savage_2018_%28cropped%29.jpg"
        },
        {
            "id": 50,
            "name": "Linkin Park",
            "genre": "Rock",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Linkin_Park_2017_%28cropped%29.jpg"
        }
    ];

const Optional = () => {
    const [artists, setArtists] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleItems, setVisibleItems] = useState(20); // Số item hiển thị ban đầu
    const ITEMS_PER_LOAD = 5; // Số item load thêm mỗi lần
    const MAX_SELECTIONS = 3;

    const styles = OptionalStyle;

    const filteredArtists = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Chỉ hiển thị số lượng item theo visibleItems
    const displayedArtists = filteredArtists.slice(0, visibleItems);

    const handleLoadMore = () => {
        setVisibleItems(prev => Math.min(prev + ITEMS_PER_LOAD, filteredArtists.length));
    };

    const fetchArtists = async () => {
        try {
            setTimeout(() => {
                setArtists(mockArtists);
            }, 1000);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSelectArtist = (artist) => {
        const isSelected = selectedIds.includes(artist.id);
        
        if (isSelected) {
            // Luôn cho phép bỏ chọn
            setSelectedIds(selectedIds.filter(id => id !== artist.id));
        } else if (selectedIds.length < MAX_SELECTIONS) {
            // Chỉ cho phép chọn thêm khi chưa đạt tối đa
            setSelectedIds([...selectedIds, artist.id]);
        }
    };

    const handleDone = () => {
        if (selectedIds.length > 0) {
            router.push('screens/screen-bottom/HomeScreen');
        }
    };

    useEffect(() => {
        fetchArtists();
    }, []);

    const renderItem = ({ item, index }) => {
        if (item === 'load_more') {
            return (
                <View style={styles.artistContainer}>
                    <TouchableOpacity
                        style={styles.loadMoreButton}
                        onPress={handleLoadMore}
                    >
                        <View style={styles.imageContainer}>
                            <View style={styles.loadMoreContent}>
                                <Ionicons name="add" size={32} color="#666" />
                            </View>
                        </View>
                        <Text style={styles.artistName}>Xem thêm</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.artistContainer}>
                <TouchableOpacity
                    onPress={() => handleSelectArtist(item)}
                    style={[
                        styles.artistButton,
                        !selectedIds.includes(item.id) && 
                        selectedIds.length >= MAX_SELECTIONS && 
                        styles.disabledArtist
                    ]}
                    disabled={!selectedIds.includes(item.id) && selectedIds.length >= MAX_SELECTIONS}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.image_url }}
                            style={[
                                styles.artistImage,
                                selectedIds.includes(item.id) && styles.selectedImage  // Làm mờ ảnh khi được chọn
                            ]}
                        />
                        {selectedIds.includes(item.id) && (
                            <View style={styles.checkmark}>
                                <Entypo name="check" size={60} color="white" />
                            </View>
                        )}
                    </View>
                    <Text style={styles.artistName} numberOfLines={1}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    // Tạo data array với nút "Xem thêm"
    const getDisplayData = () => {
        const displayedArtists = filteredArtists.slice(0, visibleItems);
        if (visibleItems < filteredArtists.length) {
            return [...displayedArtists, 'load_more'];
        }
        return displayedArtists;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Chọn {MAX_SELECTIONS} nghệ sĩ bạn thích
                </Text>

                <View style={styles.searchContainer}>
                    <Ionicons
                        name="search"
                        size={20}
                        color="#666"
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm"
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <FlatList
                    data={getDisplayData()}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.gridContainer}
                    columnWrapperStyle={{ justifyContent: 'flex-start' }} // Thay đổi từ space-between sang flex-start
                    keyExtractor={(item) => item === 'load_more' ? 'load_more' : item.id.toString()}
                    renderItem={renderItem}
                />

                {selectedIds.length > 0 && (
                    <TouchableOpacity
                        style={styles.doneButton}
                        onPress={handleDone}
                    >
                        <Text style={styles.doneButtonText}>XONG</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Optional;