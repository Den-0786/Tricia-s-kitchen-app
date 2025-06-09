'use client'
import React, { useState } from 'react'
import FinalConfirmModal from './FinalConfirmModal'
import { useRouter } from 'next/navigation';

const generateUniqueCode = () => {
    const randomPart = Math.random().toString(36).substr(2, 3).toUpperCase(); 
    const timePart = Date.now().toString(36).substr(-3).toUpperCase();       
    return `ORD-${randomPart}${timePart}`; 
};


export default function OrderForm({ cart, totalAmount, onBackToCart, onOrderComplete }) {
    const router = useRouter();
    const [customerInfo, setCustomerInfo] = useState({
        fullName: '',
        email: '',
        address: '',
        phone: ''
    })

    const handleConfirm = (updatedInfo) => {
        setCustomerInfo(updatedInfo);
        setShowFinalConfirm(false);
        onOrderComplete();

    }

    const [showFinalConfirm, setShowFinalConfirm] = useState(false);
    const [editing, setEditing] = useState(false); 
    const [uniqueCodeCustomer, setUniqueCodeCustomer] = useState('');
    const [uniqueCodeDelivery, setUniqueCodeDelivery] = useState('');

    const handleChange = (e) => {
        setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
    }

    const validateForm = () => {
        return (
            customerInfo.fullName.trim() !== '' &&
            customerInfo.email.trim() !== '' &&
            customerInfo.address.trim() !== '' &&
            customerInfo.phone.trim() !== ''
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert("Please fill all fields.");
            return;
        }

        const code = generateUniqueCode();
        setUniqueCodeCustomer(code);
        setUniqueCodeDelivery(code);

        setShowFinalConfirm(true);
        setEditing(false);
    }

    return (
        <div className="max-w-sm mx-auto p-6 bg-white rounded shadow mt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex justify-center">Order Form</h2>
            <button
                className="mb-6 text-sm text-blue-600 hover:underline"
                onClick={onBackToCart}
            >
                &larr; Back to Cart
            </button>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={customerInfo.fullName}
                        onChange={handleChange}
                        disabled={showFinalConfirm && !editing}
                        className="w-full text-gray-800 border rounded px-3 py-1"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleChange}
                        disabled={showFinalConfirm && !editing}
                        className="w-full text-gray-800 border rounded px-3 py-1"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Residential Address</label>
                    <input
                        name="address"
                        value={customerInfo.address}
                        onChange={handleChange}
                        disabled={showFinalConfirm && !editing}
                        className="w-full text-gray-800 border rounded px-3 py-1"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleChange}
                        disabled={showFinalConfirm && !editing}
                        className="w-full text-gray-800 border rounded px-3 py-1"
                        required
                    />
                </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Your Items</h3>
                <div className="border rounded p-2 max-h-64 overflow-auto">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between border-b py-1 text-gray-700">
                            <span>{item.name} - {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold mt-2 text-gray-900">
                        <span>Total</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            {!showFinalConfirm && (
                    <button
                        type="submit"
                        className="mt-4 bg-amber-900 text-white py-2 px-4 rounded hover:bg-amber-800 transition"
                    >
                        Submit
                    </button>
                )}
            </form>
            {showFinalConfirm && (
                <FinalConfirmModal
                    customerInfo={customerInfo}
                    cart={cart}
                    totalAmount={totalAmount}
                    editing={editing}
                    setEditing={setEditing}
                    onCancel={() => setShowFinalConfirm(false)}
                    
                    onConfirm={handleConfirm}

                    onEditSave={(updatedInfo) => {
                        setCustomerInfo(updatedInfo);
                        setEditing(false);
                    }}
                    uniqueCodeCustomer={uniqueCodeCustomer}
                    uniqueCodeDelivery={uniqueCodeDelivery}
                />
            )}
        </div>
    )
}
