'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function BusinessInfoPage() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [info, setInfo] = useState({
        name: '',
        address: '',
        phone: '',
    });

    useEffect(() => {
        setIsMounted(true);
        const stored = localStorage.getItem('businessInfo');
        if (stored) setInfo(JSON.parse(stored));
    }, []);

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        localStorage.setItem('businessInfo', JSON.stringify(info));
        toast.success('Business info saved');
    };

    if (!isMounted) return null;

    return (
    <React.Fragment>
        <div className="p-6 max-w-md mx-auto bg-gray-600 relative top-[10rem]">
            <button onClick={() => router.back()} className="flex items-center text-blue-600 hover:underline mb-4">
                <FiArrowLeft className="mr-1" /> Back
            </button>
            <h1 className="text-xl font-bold mb-4">Business Info</h1>

            <input
                name="name"
                value={info.name}
                onChange={handleChange}
                placeholder="Restaurant Name"
                className="w-full mb-3 p-2 border rounded"
            />
            <input
                name="address"
                value={info.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full mb-3 p-2 border rounded"
            />
            <input
                name="phone"
                value={info.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full mb-3 p-2 border rounded"
            />
            <button onClick={handleSave} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save
            </button>
        </div>
    </React.Fragment>
    );
}
