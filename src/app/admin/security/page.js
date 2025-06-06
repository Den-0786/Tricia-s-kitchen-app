'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { FiArrowLeft } from 'react-icons/fi';

export default function Security() {
    const router = useRouter()
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
    const [loginAlerts, setLoginAlerts] = useState(true)
    const [sessions, setSessions] = useState([
        { id: 1, device: 'Chrome on Windows', location: 'Accra, GH', lastActive: '2025-06-05 09:10' },
        { id: 2, device: 'Safari on iPhone', location: 'Kumasi, GH', lastActive: '2025-06-04 19:32' },
        { id: 3, device: 'Firefox on Android', location: 'Kumasi, Ghana', lastActive: '2025-06-04 22:01' },
    ])

    const toggle2FA = () => {
        setTwoFactorEnabled(prev => {
        const next = !prev
        toast.success(`2-Factor Authentication ${next ? 'Enabled' : 'Disabled'}`)
        return next
        })
    }

    const toggleAlerts = () => {
        setLoginAlerts(prev => {
        const next = !prev
        toast.success(`Login alerts ${next ? 'enabled' : 'disabled'}`)
        return next
        })
    }

    const revokeSession = (id) => {
        setSessions(prev => prev.filter(s => s.id !== id))
        toast('Session revoked')
    }

    return (
        <React.Fragment>
            <section className="max-w-4xl mx-auto p-6 space-y-8">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <button 
                        onClick={() => router.push('/admin')}
                            className="flex items-center text-gray-200 dark:text-gray-100 hover:text-gray-50 dark:hover:text-white mr-16"
                        >
                            <FiArrowLeft className="mr-2" size={20} />
                        Back to Dashboard
                    </button>
                    <h1 className="text-2xl font-bold">Security Settings</h1>
                </div>
                {/* 2FA */}
                <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div>
                    <h2 className="font-semibold text-lg">Two-Factor Authentication</h2>
                    <p className="text-sm text-gray-500">Add extra security to your account by enabling 2FA.</p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={twoFactorEnabled} onChange={toggle2FA} />
                    <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-400 transition-all relative">
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-full"></div>
                    </div>
                    </label>
                </div>

                {/* Login Alerts */}
                <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div>
                    <h2 className="font-semibold text-lg">Login Alerts</h2>
                    <p className="text-sm text-gray-500">Receive alerts when a new login occurs from a different device.</p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={loginAlerts} onChange={toggleAlerts} />
                    <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-400 transition-all relative">
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-full"></div>
                    </div>
                    </label>
                </div>

                {/* Recent Sessions */}
                <div className="border rounded-lg p-4">
                    <h2 className="font-semibold text-lg mb-3">Recent Login Sessions</h2>
                    {sessions.length === 0 ? (
                    <p className="text-sm text-gray-500">No active sessions.</p>
                    ) : (
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="text-left border-b">
                            <th className="py-2">Device</th>
                            <th>Location</th>
                            <th>Last Active</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {sessions.map(session => (
                            <tr key={session.id} className="border-b hover:bg-gray-600">
                            <td className="py-2">{session.device}</td>
                            <td>{session.location}</td>
                            <td>{session.lastActive}</td>
                            <td>
                                <button
                                onClick={() => revokeSession(session.id)}
                                className="text-red-600 hover:underline text-sm"
                                >
                                Revoke
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    )}
                </div>
            </section>
    </React.Fragment>
    )
}
