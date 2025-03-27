import {StyleSheet} from "react-native";

const OptionalStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    fixedHeader: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#000',
    },
    selectedCount: {
        paddingVertical: 8,
    },
    selectedCountText: {
        fontSize: 14,
        color: '#666',
    },
    scrollContainer: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        margin: 16,
    },
    selectedContainer: {
        flex: 1,
    },
    selectedArtistCard: {
        marginBottom: 20,
        alignItems: 'center',
    },
    selectedImage: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#007AFF',
    },
    selectedName: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    relatedContainer: {
        marginTop: 20,
    },
    artistGrid: {
        marginTop: 20,
    },
    artistCard: {
        margin: 8,
        alignItems: 'center',
    },
    artistImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: isSelected ? '#007AFF' : 'transparent',
    },
    checkMark: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#007AFF',
        borderColor: '#fff',
        borderWidth: 2,
    },
    artistName: {
        marginTop: 4,
        fontSize: 12,
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    doneButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    doneText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default OptionalStyle;
