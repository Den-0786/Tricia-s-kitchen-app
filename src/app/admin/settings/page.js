'use client'

import React from 'react';
import {useRouter} from 'next/navigation';
import { FiUser, FiHome, FiLock,FiGlobe, FiSun, FiArrowLeft } from 'react-icons/fi';

export default function SettingsPage() {
    const router = useRouter();

    const settingsOptions = [
        {
            title: 'Appearance',
            description: 'Theme and brightness settings',
            path: '/admin/settings/appearance',
            icon: <FiSun className="text-yellow-500" />,
        },
        {
            title: 'Language',
            description: 'Change app language',
            path: '/admin/settings/languages',
            icon: <FiGlobe className="text-blue-500" />,
        },
        {
            title: 'Change Password',
            description: 'Update password',
            path: '/admin/settings/change-password',
            icon: <FiLock />,
        },
        {
            title: 'Profile Info',
            description: 'Update profile',
            path: '/admin/settings/profile-info',
            icon: <FiUser />,
        },
        {
            title: 'Business Info',
            description: 'Update business info',
            path: '/admin/settings/business-info',
            icon: <FiHome />,
        },
    ]

    return(
        <React.Fragment>
            <div className="flex items-center justify-center min-h-screen">
                <div className="p-6 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-xl w-[60rem] min-h-[30rem]">
                    <div className="flex items-center mb-8">
                        <button 
                            onClick={() => router.push('/admin')}
                            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-6"
                        >
                            <FiArrowLeft className="mr-2" size={20} />
                            Back to Dashboard
                        </button>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            Settings
                        </h1>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {settingsOptions.map((opt) => (
                            <div 
                                key={opt.path}
                                onClick={() => router.push(opt.path)}
                                className="group cursor-pointer p-6 rounded-xl bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-lg text-amber-500 bg-gray-100 dark:bg-gray-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                                        {opt.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{opt.title}</h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{opt.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}