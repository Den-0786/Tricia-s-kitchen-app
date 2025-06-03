'use client'
import React from 'react'

export default function ConfirmModal({

    onConfirm,
    onCancel,
    message,
    conFirmText = 'Yes',
    cancelText = 'No'
}){

    return(
        <React.Fragment>
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'> 
                <div className='bg-white p-6 rounded shadow-lg w-80 text-center'>
                    <h3 className='text-lg font-semibold mb-4 text-gray-800'>{message}</h3>
                    <div className='flex justify-center gap-4'>
                        <button
                            onClick={onConfirm}
                            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
                        >
                        {conFirmText}
                        </button>
                        <button
                            onClick={onCancel}
                            className='bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-600'
                        >
                        {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}