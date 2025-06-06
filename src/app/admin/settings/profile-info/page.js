'use client'

import React from  'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProfileInfoPage() {
    const router = useRouter();

    const [isMounted, setIsMounted] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        setIsMounted(true);
        const stored = localStorage.getItem('profileInfo');
        if (stored) setForm(JSON.parse(stored));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        localStorage.setItem('profileInfo', JSON.stringify(form));
        toast.success('Profile updated');
    };

    if (!isMounted) return null;

    return (
        <React.Fragment>
            <div className="p-6 max-w-md mx-auto bg-gray-600 relative top-[10rem]">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-blue-600 hover:underline mb-4"
                >
                    <FiArrowLeft className="mr-1" /> Back
                </button>
                <h1 className="text-xl font-bold mb-4">Profile Info</h1>

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full mb-3 p-2 border rounded"
                />
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full mb-3 p-2 border rounded"
                />
                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full mb-3 p-2 border rounded"
                />
                <button
                    onClick={handleSave}
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Save
                </button>
            </div>
        </React.Fragment>
    );
}
