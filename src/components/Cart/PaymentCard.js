'use client'

import React, { useState } from 'react';
import { FcSimCardChip } from 'react-icons/fc';
import { FaMoneyBillWave, FaSimCard } from 'react-icons/fa';
import { MdOutlineSimCard } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

export default function PaymentOptions() {
    const [selectedPayment, setSelectedPayment] = useState('');
    const [selectedNetwork, setSelectedNetwork] = useState('');

    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.id);
    };

    const handleClose = () => {
        setSelectedPayment('');
        setSelectedNetwork('');
    };

    return (
        <React.Fragment> 
        <div className='relative mt-[4rem]'>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <input type="radio" name="payment" id="cash" className="w-4 h-4" onChange={handlePaymentChange} />
                    <label htmlFor="cash">Mobile Money Service</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="radio" name="payment" id="card" className="w-4 h-4" onChange={handlePaymentChange} />
                    <label htmlFor="card">Card</label>
                </div>
            </div>

            {/* Mobile Money Info Card */}
            {selectedPayment === 'cash' && (
                    <div className="fixed sm:absolute  right-0 bottom-10 sm:right-10 sm:bottom-10 mt-6 p-4 rounded-t-xl shadow-md bg-gray-50 w-full sm:max-w-md sm:w-[22rem] sm:rounded-xl z-50">
                        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            <IoMdClose size={20} />
                        </button>
                        <h3 className="font-semibold text-lg mb-4 text-amber-600">Select Mobile Network</h3>
                        <div className="flex flex-wrap gap-4 mb-4">
                            <button
                                onClick={() => setSelectedNetwork('mtn')}
                                className={`px-4 py-2 rounded-lg border text-amber-600 ${selectedNetwork === 'mtn' ? 'bg-yellow-500 text-white' : 'bg-white'}`}
                            >
                                MTN
                            </button>
                            <button
                                onClick={() => setSelectedNetwork('telecel')}
                                className={`px-4 py-2 rounded-lg border text-amber-600 ${selectedNetwork === 'telecel' ? 'bg-red-500 text-white' : 'bg-white'}`}
                            >
                                Telecel
                            </button>
                            <button
                                onClick={() => setSelectedNetwork('airteltigo')}
                                className={`px-4 py-2 rounded-lg border text-amber-600 ${selectedNetwork === 'airteltigo' ? 'bg-pink-500 text-white' : 'bg-white'}`}
                            >
                                AirtelTigo
                            </button>
                        </div>

                        {selectedNetwork && (
                            <div className={`border p-4 text-amber-800 rounded-xl shadow-md ${
                                selectedNetwork === 'mtn' ? 'bg-yellow-50' : 
                                selectedNetwork === 'telecel' ? 'bg-red-50' : 
                                'bg-pink-50'
                            }`}>
                                <div className="flex items-center gap-2 mb-2">
                                    {selectedNetwork === 'mtn' ? <FaMoneyBillWave className="text-yellow-500 text-2xl" /> : 
                                    selectedNetwork === 'telecel' ? <MdOutlineSimCard className="text-red-500 text-2xl" /> : 
                                    <FaSimCard className="text-pink-600 text-2xl" />}
                                    <h3 className="font-semibold text-lg">
                                        {selectedNetwork === 'mtn' ? 'MTN Mobile Money' : 
                                        selectedNetwork === 'telecel' ? 'Telecel Cash' : 
                                        'AirtelTigo Money'}
                                    </h3>
                                </div>
                                <p><span className="font-medium">USSD Code:</span> {selectedNetwork === 'mtn' ? '*170#' : selectedNetwork === 'telecel' ? '*110#' : '*500#'}</p>
                                <p><span className="font-medium">Merchant Number:</span> {selectedNetwork === 'mtn' ? '024 000 0000' : selectedNetwork === 'telecel' ? '020 000 0000' : '027 000 0000'}</p>
                            </div>
                        )}
                    </div>
                )}
                
                {/* Card Info Card */}
                {selectedPayment === 'card' && (
                    <div className="fixed sm:absolute  right-0 bottom-10 sm:right-10 sm:bottom-10 mt-6 p-4 rounded-t-xl shadow-md bg-gray-50 w-full sm:max-w-md sm:w-[22rem] sm:rounded-xl z-50">
                        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            <IoMdClose size={20} />
                        </button>
                        <div className="flex items-center gap-2 mb-2">
                            <FcSimCardChip className="text-2xl" />
                            <h3 className="font-semibold text-lg text-amber-700">Card Payment</h3>
                        </div>
                        <p className="text-sm text-gray-700">Card payment via Paystack will be available soon.</p>
                    </div>
                )}
        </div>
        </React.Fragment>
    );
}

