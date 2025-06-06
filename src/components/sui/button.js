import React from 'react'

export function Button({ children, className = '', variant = 'primary', size = 'md', ...props }) {
    const baseClasses = 'rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2'
    const variants = {
        primary: 'bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 rounded-3xl text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    }
    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    }
    const classNames = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

    return (
        <button className={classNames} {...props}>
        {children}
        </button>
    )
}
