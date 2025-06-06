import React from 'react'

export function Select({ className = '', children, ...props }) {
    return (
        <select
        className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props}
        >
        {children}
        </select>
    )
}
