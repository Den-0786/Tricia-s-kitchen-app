'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Frontend validation only for demo
        if (!username.trim() || !password.trim()) {
        setError('Please enter both username and password');
        setIsLoading(false);
        return;
        }

        // Simulate API call with timeout
        setTimeout(() => {
        // Mock authentication - in real app, replace with actual API call
        const mockUsers = [
            { username: 'dennisopokuamponsah86@gmail.com', password: 'Den0786op#' }
        ];
        
        const validUser = mockUsers.find(
            user => user.username === username && user.password === password
        );

        if (validUser) {
            // Store simple auth state in localStorage for frontend demo
            localStorage.setItem('adminAuth', 'true');
            // Redirect to admin dashboard
            router.push('/admin/dashboard');
        } else {
            setError('Invalid username or password');
            setIsLoading(false);
        }
        }, 1000);
    };

    return (
        <React.Fragment>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className='w-full max-w-md p-8 bg-white rounded-xl shadow-2xl'>
                    <h1 className='text-2xl text-gray-900 font-bold text-center mb-6'>Admin Login</h1>
                    
                    {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">
                        {error}
                    </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className='block text-sm font-medium text-gray-700 mb-1'>
                            Username
                            </label>
                            <input
                            id="username"
                            type="text"
                            placeholder='Enter your username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='w-full border text-gray-900 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-900'
                            autoComplete='username'
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-1'>
                            Password
                            </label>
                            <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full border text-gray-900 border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-900'
                                autoComplete='current-password'
                            />
                            {password && (
                                <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            )}
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-gray-900 text-white rounded-md p-2 hover:bg-gray-800 transition duration-200 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                            <>
                                <FaSpinner className="animate-spin mr-2" size={16} />
                                Logging in...
                            </>
                            ) : 'Login'}
                        </button>
                        
                        <div className='pt-2 text-center'>
                            <Link 
                            href="/admin/forgot-password" 
                            className='text-sm text-blue-600 hover:text-blue-800 hover:underline'
                            >
                            Forgot Password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}