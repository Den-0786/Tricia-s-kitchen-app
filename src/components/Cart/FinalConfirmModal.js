'use client'
import React, { useState } from 'react'

export default function FinalConfirmModal({
    customerInfo,
    cart,
    totalAmount,
    editing,
    setEditing,
    onCancel,
    onConfirm,
    onEditSave,
    uniqueCodeCustomer,
    uniqueCodeDelivery
}) {
    const [updatedInfo, setUpdatedInfo] = useState(customerInfo);

    const handleChange = (e) => {
        setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
    }

    const handleSaveEdit = () => {
        onEditSave(updatedInfo);
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded shadow-lg w-96 max-h-[90vh] overflow-y-auto'>
                <h3 className='text-lg font-semibold mb-4 text-gray-800 flex justify-center'>Confirm Your Order</h3>
                <p className='text-sm text-gray-800'>Please revisit the site to complete your payment once the items is been delivered.</p>
                {/* Customer Info */}
                <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-gray-400">Customer Info</h4>
                    {editing ? (
                        <div className="space-y-3">
                            <input
                                className="w-full border rounded px-3 py-1"
                                name="fullName"
                                value={updatedInfo.fullName}
                                onChange={handleChange}
                                placeholder="Full Name"
                            />
                            <input
                                className="w-full border rounded px-3 py-1"
                                name="email"
                                type="email"
                                value={updatedInfo.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />
                            <textarea
                                className="w-full border rounded px-3 py-1"
                                name="address"
                                value={updatedInfo.address}
                                onChange={handleChange}
                                placeholder="Address"
                            />
                            <input
                                className="w-full border rounded px-3 py-1"
                                name="phone"
                                value={updatedInfo.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                            />
                            <button
                                className="bg-amber-900 text-white px-4 py-2 rounded mt-2 hover:bg-amber-800 transition"
                                onClick={handleSaveEdit}
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-1 text-gray-400">
                            <p><strong>Name:</strong> {updatedInfo.fullName}</p>
                            <p><strong>Email:</strong> {updatedInfo.email}</p>
                            <p><strong>Address:</strong> {updatedInfo.address}</p>
                            <p><strong>Phone:</strong> {updatedInfo.phone}</p>
                            <button
                                className="text-blue-600 underline mt-2"
                                onClick={() => setEditing(true)}
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>

                {/* Items */}
                <div className="mb-4 max-h-40 overflow-auto border p-2 rounded">
                    <h4 className="font-semibold mb-2 text-gray-400">Items</h4>
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-gray-900 mb-1">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold mt-2 text-gray-900">
                        <span>Total</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                {/* Unique codes */}
                <div className="mb-4 text-gray-400">
                    <p className='text-sm text-gray-900'>Please keep the code below safe — it will be required when receiving your package.</p>
                    <p><strong>Customer Code:</strong> {uniqueCodeCustomer}</p>
                    <p><strong>Delivery Code:</strong> {uniqueCodeDelivery}</p>
                </div>

                <div className="flex justify-between gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 border-2 border-amber-900 text-amber-900 py-2 rounded hover:bg-amber-900 hover:text-white transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(updatedInfo)}
                        className="flex-1 bg-amber-900 text-white py-2 rounded hover:bg-amber-800 transition"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}
