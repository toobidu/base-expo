import React, { useState } from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const WelcomeScreen = () => {
    const [currentScreen, setCurrentScreen] = useState('welcome');

    const handleRegister = () => {
        setCurrentScreen('register');
    };

    const handleLogin = () => {
        setCurrentScreen('login');
    };

    if (currentScreen === 'register') {
        return <RegisterScreen goBack={() => setCurrentScreen('welcome')} />;
    }

    if (currentScreen === 'login') {
        return <LoginScreen goBack={() => setCurrentScreen('welcome')} />;
    }

    return (
        <div className="flex flex-col items-center justify-between h-screen bg-black text-white p-6">
            {/* Top right icon */}
            <div className="w-full flex justify-end">
                <div className="text-white p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                </div>
            </div>

            {/* Character and text */}
            <div className="flex flex-col items-center mt-16">
                {/* Anime character with headphones */}
                <div className="w-24 h-24 mb-8 relative">
                    <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                        <div className="absolute">
                            {/* Blue eyes */}
                            <div className="relative">
                                <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center">
                                    <div className="w-16 h-10 bg-white rounded-full relative overflow-hidden">
                                        <div className="absolute w-6 h-6 rounded-full bg-blue-600 top-2 left-2"></div>
                                        <div className="absolute w-6 h-6 rounded-full bg-blue-600 top-2 right-2"></div>
                                        <div className="absolute w-4 h-1 bg-black rotate-45 top-3 left-3"></div>
                                        <div className="absolute w-4 h-1 bg-black -rotate-45 top-3 right-3"></div>
                                    </div>
                                </div>
                                {/* Headphones */}
                                <div className="absolute top-0 w-full flex justify-between">
                                    <div className="w-3 h-8 bg-yellow-300 rounded-full -ml-1"></div>
                                    <div className="w-3 h-8 bg-blue-300 rounded-full -mr-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vietnamese text */}
                <h1 className="text-xl font-bold text-center mb-2">Trải nghiệm mọi nơi.</h1>
                <h2 className="text-lg text-center">Lắng nghe cùng SoundClone</h2>
            </div>

            {/* Buttons */}
            <div className="w-full space-y-4 mb-8">
                <button
                    onClick={handleRegister}
                    className="w-full bg-green-500 text-white py-3 rounded-full font-medium"
                >
                    Đăng ký miễn phí
                </button>
                <button
                    onClick={handleLogin}
                    className="w-full bg-transparent border border-gray-500 text-white py-3 rounded-full font-medium"
                >
                    Đăng nhập
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;