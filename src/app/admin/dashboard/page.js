'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FiHome,
    FiSettings,
    FiUser,
    FiLock,
    FiLogOut,
    FiMoon,
    FiSun,
    FiChevronLeft,
    FiChevronRight
    } from 'react-icons/fi';
    import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
    } from 'recharts';
import { styled } from '@mui/material';

    const AdminDashboard = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false); 
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem('darkMode');
        if (storedTheme) {
        setDarkMode(JSON.parse(storedTheme));
        }
        
        
        const handleResize = () => {
        if (window.innerWidth >= 1024) {
            setSidebarOpen(true);
        } else {
            setSidebarOpen(false);
        }
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (mounted) {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        }
    }, [darkMode, mounted]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const navLinks = [
        { href: '/admin', icon: <FiHome size={20} />, label: 'Home' },
        { href: '/admin/users', icon: <FiUser size={20} />, label: 'Users' },
        { href: '/admin/settings', icon: <FiSettings size={20} />, label: 'Settings' },
        { href: '/admin/security', icon: <FiLock size={20} />, label: 'Security' },
        {href: '/', icon: <FiHome size={20} />, label: 'Main Page' },
        { href: '/admin/login', 
        icon: <FiLogOut size={20}/>, 
        label: 'Logout',
        className: 'flex rounded-full p-1 bg-red-500 text-white relative top-[10rem] '
        }
    ];

    const data = [
        { name: 'Jan', users: 90 },
        { name: 'Feb', users: 75 },
        { name: 'Mar', users: 80 },
        { name: 'Apr', users: 75 },
        { name: 'May', users: 90 },
        { name: 'Jun', users: 20 },
        { name: 'Jul', users: '' },
        { name: 'Aug', users: '' },
        { name: 'Sep', users: '' },
        { name: 'Oct', users: '' },
        { name: 'Nov', users: '' },
        { name: 'Dec', users: '' },
    ];

    if (!mounted) {
        return (
        <div className="min-h-screen bg-white text-black">
            <aside className="w-20 h-screen fixed bg-gray-800 text-white flex flex-col"></aside>
            <main className="ml-20 p-4"></main>
        </div>
        );
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <aside className={`
            ${sidebarOpen ? 'w-64' : 'w-20'} 
            h-screen fixed bg-amber-800 text-white flex flex-col 
            transition-all duration-300 z-40 gap-2 dark:bg-gray-800 dark:text-white
        `}>
            <div className="p-4 flex items-center justify-center">
            {sidebarOpen ? (
                <div className="font-bold text-2xl">Admin</div>
            ) : (
                <div className="text-xl font-bold">A</div>
            )}
            <button
                className="p-2 rounded-full hover:bg-amber-500 hidden lg:block ml-auto"
                onClick={toggleSidebar}
            >
                {sidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
            </button>
            </div>

            <nav className="flex-1 px-3 space-y-2 mt-4">
            {navLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                <div
                    className={`
                    ${link.className ??'flex items-center p-2 rounded-lg cursor-pointer'} 
                    ${pathname === link.href && !link.className ? 'bg-amber-500' : "hover:bg-amber-500"}
                    gap-6
                    transition-colors
                    `}
                    title={sidebarOpen ? '' : link.label}
                >
                    <span className="flex-shrink-0">{link.icon}</span>
                    {sidebarOpen && (
                    <span className="ml-3 whitespace-nowrap">{link.label}</span>
                    )}
                </div>
                </Link>
            ))}
            </nav>

            <div className="p-4">
            <button
                className="w-10 h-10 p-2 bg-amber-950 hover:bg-amber-600 rounded-full flex items-center justify-center"
                onClick={toggleDarkMode}
                title={sidebarOpen ? '' : darkMode ? 'Light Mode' : 'Dark Mode'}
            >
                {darkMode ? <FiMoon size={20} /> : <FiSun size={20} />}
                {/* {sidebarOpen && (
                <span>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>)
                } */}
            </button>
            </div>
        </aside>

        {/* Main content */}
        <main className={`
            ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} 
            ml-20 p-4 transition-all duration-300
        `}>
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-4">User Growth</h2>
                    <div className="w-full h-64 md:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                            data={data}
                            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                            >
                            <XAxis 
                                dataKey="name" 
                                stroke={darkMode ? '#fff' : '#000'} 
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis 
                                stroke={darkMode ? '#fff' : '#000'} 
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                backgroundColor: darkMode ? '#333' : '#fff',
                                fontSize: 14
                                }} 
                            />
                            <Bar 
                                dataKey="users" 
                                fill={darkMode ? '#38bdf8' : '#3b82f6'} 
                                radius={[4, 4, 0, 0]}
                            />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-4">Activity Logs</h2>
                    <ul className="space-y-2 text-sm md:text-base">
                    <li>Staff John added a new product.</li>
                    <li>Settings updated by Admin.</li>
                    <li>New Staff registered.</li>
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {/* Revenue */}
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-2">Revenue</h2>
                    <p className="text-3xl font-bold">GHC 14,450</p>
                    <p className="text-sm text-gray-400">This Month</p>
                </div>

                {/* Orders by Location */}
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-2">Orders by Location</h2>
                    <ul className="text-sm space-y-1">
                    <li>KNUST - 120 orders</li>
                    <li>Adum - 90 orders</li>
                    <li>Asokwa - 60 orders</li>
                    <li>Esreso - 40 orders</li>
                    <li>Tafo - 70 orders</li>
                    <li>Abuakwa - 68 orders</li>
                    <li>Santasi - 50 orders</li>
                    <li>Others - 50 orders</li>
                    </ul>
                </div>

                {/* Orders by Time */}
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-2">Orders by Time</h2>
                    <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={[
                        { time: 'Morning', orders: 80 },
                        { time: 'Lunch', orders: 120 },
                        { time: 'Dinner', orders: 180 }
                    ]}>
                        <XAxis dataKey="time" stroke={darkMode ? '#fff' : '#000'} />
                        <YAxis stroke={darkMode ? '#fff' : '#000'} />
                        <Bar dataKey="orders" fill={darkMode ? '#facc15' : '#f59e0b'} radius={[4, 4, 0, 0]} />
                    </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Top-Selling Items */}
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-2">Top-Selling Foods</h2>
                    <ul className="text-sm space-y-1">
                    <li> Banku with Tilapia - 150 sold</li>
                    <li> Vegetable Salad - 90 sold</li>
                    <li> Jollof Rice - 75 sold</li>
                    </ul>
                </div>

                {/* New vs Returning Customers */}
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-2">Customer Types</h2>
                    <p className="text-sm">New: 45%</p>
                    <p className="text-sm">Returning: 55%</p>
                </div>

                {/* Upcoming Reservations */}
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-2">Upcoming Reservations</h2>
                    <ul className="text-sm space-y-1">
                    <li>John Smith - 2:00 PM</li>
                    <li>Emma Johnson - 3:30 PM</li>
                    <li>Daniel Lee - 5:00 PM</li>
                    </ul>
                </div>

                {/* Recent Feedback */}
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-2">Recent Feedback</h2>
                    <ul className="text-sm space-y-1">
                    <li>⭐️⭐️⭐️⭐️ &quot;Great food!&quot; - Sarah</li>
                    <li>⭐️⭐️⭐️ &quot;Service was slow.&quot; - Mike</li>
                    <li>⭐️⭐️⭐️⭐️⭐️ &quot;Amazing! Will come again.&quot; - Lisa</li>
                    </ul>
                </div>
                {/*Low selling foods*/}
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-2">Low-Selling Foods</h2>
                    <ul className="text-sm space-y-1">
                        <li>Fried Rice - 20 sold</li>
                        <li>Plain Rice - 40 sold</li>
                        <li>Beef Sauce - 50 sold</li>
                    </ul>
                </div>
                {/* Inventory Alerts */}
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-2">Low Stock Items</h2>
                    <ul className="text-sm space-y-1 text-red-500">
                    <li>Tomatoes - Low</li>
                    <li>Cheese - Very Low</li>
                    <li>Onions - Low</li>
                    <li>Bush Meat - Low</li>
                    </ul>
                </div>
            </div>
        </main>
    </div>
    );
};

export default AdminDashboard;