import React, { useState } from 'react'

export function Dialog({ open: controlledOpen, onOpenChange, children }) {
    const [internalOpen, setInternalOpen] = useState(false)

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : internalOpen

    function handleClose() {
        if (isControlled) {
        onOpenChange(false)
        } else {
        setInternalOpen(false)
        }
    }

    function handleOpen() {
        if (isControlled) {
        onOpenChange(true)
        } else {
        setInternalOpen(true)
        }
    }

    return (
        <>
        <button onClick={handleOpen} className="btn-dialog-trigger">
            Open
        </button>
        {open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-sm p-4 relative">
                <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                aria-label="Close"
                >
                ✕
                </button>
                {children}
            </div>
            </div>
        )}
        </>
    )
}
