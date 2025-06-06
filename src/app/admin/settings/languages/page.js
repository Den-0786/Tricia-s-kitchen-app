'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';

export default function LanguagePage() {
        const router = useRouter();
        const [selectedLanguage, setSelectedLanguage] = useState('English (US)');

        const languages = [
            { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
            { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
            { code: 'fr', name: 'Français', flag: '🇫🇷' },
            { code: 'es', name: 'Español', flag: '🇪🇸' },
            { code: 'it', name: 'Italiano', flag: '🇮🇹' },
            { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
            { code: 'zh', name: '中文', flag: '🇨🇳' },
            { code: 'ja', name: '日本語', flag: '🇯🇵' },
            { code: 'pt', name: 'Português', flag: '🇵🇹' },
            { code: 'ru', name: 'Русский', flag: '🇷🇺' },
            { code: 'ar', name: 'العربية', flag: '🇸🇦' },
            { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
        ];

        useEffect(() => {
            const savedLanguage = localStorage.getItem('selectedLanguage');
            if (savedLanguage) {
                setSelectedLanguage(savedLanguage);
                }
            }, []);
            
            const handleLanguageSelect = (language) => {
                setSelectedLanguage(language.name);
                localStorage.setItem('selectedLanguage', language.name);
            }

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
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Language Preferences</h1>
                    </div>

                    <div className="space-y-4">
                        {languages.map((language) => (
                        <div
                            key={language.code}
                            onClick={() => handleLanguageSelect(language)}
                            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all
                            ${selectedLanguage === language.name 
                                ? 'bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700'
                                : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                            }`}
                        >
                            <div className="flex items-center">
                            <span className="text-2xl mr-4">{language.flag}</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">{language.name}</span>
                            </div>
                            {selectedLanguage === language.name && (
                            <FiCheck className="text-blue-500 dark:text-blue-300" size={20} />
                            )}
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}