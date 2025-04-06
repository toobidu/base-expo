import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const MusicPlayerContext = createContext();

const mockPlaylist = [
    {
        id: '1',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Link trực tiếp thay vì Google Drive
        title: 'Hãy Trao Cho Anh',
        artist: 'Sơn Tùng M-TP',
        artwork: 'https://i.scdn.co/image/ab6761610000e5eb352d5672d70464e67c3ae963',
    },
    // Thêm bài hát khác nếu cần
];

export const MusicPlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [playlist, setPlaylist] = useState(mockPlaylist);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Khởi tạo âm thanh khi component mount
    useEffect(() => {
        const setupPlayer = async () => {
            try {
                await Audio.requestPermissionsAsync();
                await Audio.setAudioModeAsync({
                    staysActiveInBackground: true,
                    playsInSilentModeIOS: true,
                });
                loadTrack(playlist[0]); // Tải bài đầu tiên
            } catch (error) {
                console.error('Error setting up audio:', error);
            }
        };
        setupPlayer();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    // Tải và phát một track
    const loadTrack = async (track, shouldPlay = false) => {
        if (sound) {
            await sound.unloadAsync();
        }
        const newSound = new Audio.Sound();
        try {
            await newSound.loadAsync({ uri: track.url });
            setSound(newSound);
            setCurrentTrack(track);
            if (shouldPlay) {
                await newSound.playAsync();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error('Error loading track:', error);
        }
    };

    const playTrack = async (track) => {
        const index = playlist.findIndex(t => t.id === track.id);
        if (index !== -1) {
            setCurrentIndex(index);
            await loadTrack(playlist[index], true);
        }
    };

    const pauseTrack = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    const resumeTrack = async () => {
        if (sound) {
            await sound.playAsync();
            setIsPlaying(true);
        }
    };

    const skipToNext = async () => {
        const nextIndex = (currentIndex + 1) % playlist.length;
        setCurrentIndex(nextIndex);
        await loadTrack(playlist[nextIndex], true);
    };

    const skipToPrevious = async () => {
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        setCurrentIndex(prevIndex);
        await loadTrack(playlist[prevIndex], true);
    };

    return (
        <MusicPlayerContext.Provider
            value={{
                currentTrack,
                isPlaying,
                playTrack,
                pauseTrack,
                resumeTrack,
                skipToNext,
                skipToPrevious,
            }}
        >
            {children}
        </MusicPlayerContext.Provider>
    );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export default MusicPlayerProvider; // Thêm export default nếu cần