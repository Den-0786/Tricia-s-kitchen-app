'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

export default function AppearancePage() {
    const router = useRouter();
    const [theme, setTheme] = useState('system');
    const [brightness, setBrightness] = useState(100);

    useEffect(() => {
        // Load saved preferences
        const savedTheme = localStorage.getItem('theme') || 'system';
        const savedBrightness = parseInt(localStorage.getItem('brightness') || '100', 10);

        setTheme(savedTheme);
        setBrightness(savedBrightness);

        applyTheme(savedTheme);
        applyBrightness(savedBrightness);
    }, []);

    const applyTheme = (selectedTheme) => {
        const root = document.documentElement;

        if (selectedTheme === 'dark') {
        root.classList.add('dark');
        } else if (selectedTheme === 'light') {
        root.classList.remove('dark');
        } else {
        // System preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        }
    };

    const applyBrightness = (value) => {
        document.documentElement.style.setProperty('--brightness', `${value}%`);
    };

    const handleThemeChange = (selectedTheme) => {
        setTheme(selectedTheme);
        localStorage.setItem('theme', selectedTheme);
        applyTheme(selectedTheme);
    };

    const handleBrightnessChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setBrightness(value);
        localStorage.setItem('brightness', value);
        applyBrightness(value);
    };

    return (
        <React.Fragment>
            <div className="flex items-center justify-center min-h-screen">
                <div className="p-6 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-lg w-[30rem] min-h-[30rem]">
                    <div className="flex items-center mb-8">
                        <button 
                        onClick={() => router.back()}
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-6"
                        >
                        <FiArrowLeft className="mr-2" size={20} />
                        Back
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Appearance</h1>
                    </div>

                    <div className="space-y-8">
                        <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Theme</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                            { value: 'light', icon: <FiSun size={24} />, label: 'Light' },
                            { value: 'dark', icon: <FiMoon size={24} />, label: 'Dark' },
                            { value: 'system', icon: <FiMonitor size={24} />, label: 'System' }
                            ].map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleThemeChange(option.value)}
                                className={`flex flex-col items-center justify-center py-2 rounded-2xl border transition-all
                                ${theme === option.value
                                    ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700'
                                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                                }`}
                            >
                                <span className="mb-2 text-gray-700 dark:text-gray-300">{option.icon}</span>
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{option.label}</span>
                            </button>
                            ))}
                        </div>
                        </div>

                        <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Brightness</h2>
                        <div className="flex items-center space-x-4">
                            <FiSun className="text-gray-600 dark:text-gray-400" size={20} />
                            <input
                            type="range"
                            min="50"
                            max="100"
                            value={brightness}
                            onChange={handleBrightnessChange}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-gray-700 dark:text-gray-300 w-12 text-right">{brightness}%</span>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
