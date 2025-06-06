'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ChangePasswordPage() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (form.newPassword !== form.confirmPassword) {
        toast.error("Passwords don't match");
        return;
        }
        toast.success('Password changed (simulated)');
    };

    if (!isMounted) return null;

    return (
    <React.Fragment>
        <div className="p-6 max-w-md mx-auto bg-gray-600 relative top-[10rem]">
            <button onClick={() => router.back()} className="flex items-center text-blue-600 hover:underline mb-4">
                <FiArrowLeft className="mr-1" /> Back
            </button>
            <h1 className="text-xl font-bold mb-4">Change Password</h1>

            <input
                name="currentPassword"
                type="password"
                placeholder="Current Password"
                value={form.currentPassword}
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
            />
            <input
                name="newPassword"
                type="password"
                placeholder="New Password"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
            />
            <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
            />
            <button onClick={handleSave} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save
            </button>
        </div>
    </React.Fragment>
    );
}
