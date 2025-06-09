'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip'

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Frontend validation
        if (!email.trim()) {
        setError('Please enter your email address');
        setIsLoading(false);
        return;
        }

        // Simulate API call
        setTimeout(() => {
        setMessage(`If an admin account exists with ${email}, you'll receive a password reset link shortly.`);
        setIsLoading(false);
        setEmail('');
        }, 1500);
    };

    return (
        <React.Fragment>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className='w-full max-w-md p-8 bg-white rounded-xl shadow-2xl relative'>
                    <Link
                        href="/"
                        className="absolute top-6 left-6 text-gray-600 hover:text-gray-900"
                        data-tooltip-id="back-tooltip"
                        data-tooltip-content="Back to homepage"
                        aria-label="Back to homepage"
                    >
                        <FaArrowLeft size={18} />
                    </Link>
                    <Tooltip 
                        id="back-tooltip" 
                        place="right"
                        className="z-[60] !text-xs !py-1 !px-2"
                    />
                    
                    <h1 className='text-2xl text-gray-900 font-bold text-center mb-6'>Reset Admin Password</h1>
                    
                    {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">
                        {error}
                    </div>
                    )}
                    
                    {message ? (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm text-center">
                        {message}
                    </div>
                    ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-1'>
                            Admin Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder='Enter admin email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full text-gray-800 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-900'
                            autoComplete='email'
                        />
                        </div>
                        
                        <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-gray-900 text-white rounded-md p-2 hover:bg-gray-800 transition duration-200 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                        {isLoading ? (
                            <>
                            <FaSpinner className="animate-spin mr-2" size={16} />
                            Sending reset link...
                            </>
                        ) : 'Send Reset Link'}
                        </button>
                    </form>
                    )}
                    
                    <div className='mt-4 text-center text-sm text-gray-600'>
                    Remember your password?{' '}
                    <Link href="/admin/login" className='text-blue-600 hover:underline'>
                        Back to Login
                    </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}