'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    FiHome, FiSettings, FiUser, FiLock, FiLogOut,
    FiMoon, FiSun, FiChevronLeft, FiChevronRight,
    FiShoppingCart,FiPackage,FiFilter,FiSearch
} from 'react-icons/fi';
import HomeView from '../home/page';
import InventoryView from '../inventory/page';
import OrdersView from '../order/page';

const AdminDashboard = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [inventoryItems, setInventoryItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const pathname = usePathname();
    const router = useRouter();

    // Sample data initialization
    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem('darkMode');
        const storedUser = JSON.parse(localStorage.getItem('restaurantAuth'));
        
        if (!storedUser?.isAuthenticated) {
            router.push('/admin/login');
        } else {
            setUser(storedUser);
        }

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
        
        // Initialize with sample data
        setInventoryItems([
            { id: 1, name: 'Banku Flour', quantity: 25, unit: 'kg', threshold: 5, status: 'good' },
            { id: 2, name: 'Tilapia', quantity: 18, unit: 'pieces', threshold: 5, status: 'good' },
            { id: 3, name: 'Tomatoes', quantity: 3, unit: 'kg', threshold: 5, status: 'low' },
            { id: 4, name: 'Onions', quantity: 5, unit: 'kg', threshold: 3, status: 'low' },
            { id: 5, name: 'Rice', quantity: 40, unit: 'kg', threshold: 10, status: 'good' },
            { id: 6, name: 'Chicken', quantity: 15, unit: 'kg', threshold: 5, status: 'medium' }
        ]);

        setOrders([
            { id: 1001, customer: 'John Smith', items: 'Banku & Tilapia x2', total: 'GHC 180.00', status: 'Preparing', date: '2023-06-01' },
            { id: 1002, customer: 'Emma Johnson', items: 'Jollof Rice x1', total: 'GHC 80.99', status: 'Ready', date: '2023-06-01' },
            { id: 1003, customer: 'Daniel Lee', items: 'Waakye x3', total: 'GHC 92.97', status: 'Delivered', date: '2023-05-31' }
        ]);

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [router]);

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

    const handleLogout = () => {
        localStorage.removeItem('restaurantAuth');
        router.push('/admin/login');
    };

    // Navigation functions
    const navigateTo = (tab) => {
        setActiveTab(tab);
    };

    // Role-based navigation links
    const navLinks = [
        { 
            href: '#', 
            icon: <FiHome size={20} />, 
            label: 'Home',
            onClick: () => navigateTo('home')
        },
        ...(user?.role === 'admin' || user?.role === 'inventory' ? [
            { 
                href: '#', 
                icon: <FiPackage size={20} />, 
                label: 'Inventory',
                onClick: () => navigateTo('inventory')
            }
        ] : []),
        ...(user?.role === 'admin' || user?.role === 'orders' ? [
            { 
                href: '#', 
                icon: <FiShoppingCart size={20} />, 
                label: 'Orders',
                onClick: () => navigateTo('orders')
            }
        ] : []),
        ...(user?.role === 'admin' ? [
            { href: '/admin/users', icon: <FiUser size={20} />, label: 'Users' },
            { href: '/admin/settings', icon: <FiSettings size={20} />, label: 'Settings' },
            { href: '/admin/security', icon: <FiLock size={20} />, label: 'Security' }
        ] : []),
        { href: '/', icon: <FiHome size={20} />, label: 'Main Page' },
        { 
            href: '/admin/login',
            icon: <FiLogOut size={20}/>, 
            label: 'Logout',
            className: 'flex hover:bg-red-500 rounded-full p-2 bg-red-700 text-white relative top-[4rem] dark:bg-red-950 dark:hover:bg-red-800',
            onClick: handleLogout
        }
    ];

    if (!mounted || !user) {
        return (
            <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
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
                        <Link href={link.href} key={`${link.href}-${link.label}`}>
                            <div
                                className={`
                                ${link.className ?? 'flex items-center p-2 rounded-lg cursor-pointer'} 
                                ${activeTab === link.label.toLowerCase() && !link.className ? 'bg-amber-500' : "hover:bg-amber-500"}
                                gap-2
                                transition-colors
                                `}
                                title={sidebarOpen ? '' : link.label}
                                onClick={link.onClick}
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
                        className="w-10 h-10 p-2 dark:bg-white dark:text-gray-900 bg-amber-950 hover:bg-amber-600 rounded-full flex items-center justify-center"
                        onClick={toggleDarkMode}
                        title={sidebarOpen ? '' : darkMode ? 'Light Mode' : 'Dark Mode'}
                    >
                        {darkMode ? <FiMoon size={20} /> : <FiSun size={20} />}
                    </button>
                </div>
            </aside>

            <main className={`
                ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} 
                ml-20 p-4 transition-all duration-300
            `}>
                {/* Search bar and header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        {activeTab === 'home' && 'Dashboard Overview'}
                        {activeTab === 'inventory' && 'Inventory Management'}
                        {activeTab === 'orders' && 'Order Management'}
                        {activeTab === 'users' && 'User Management'}
                        {activeTab === 'settings' && 'Settings'}
                        {activeTab === 'security' && 'Security'}
                    </h1>
                    
                    <div className={`flex items-center w-full md:w-auto ${activeTab !== 'home' ? 'md:w-64' : ''}`}>
                        <FiSearch className="ml-3 absolute" />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}...`}
                            className={`pl-10 pr-4 py-2 rounded-lg w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {activeTab !== 'home' && (
                            <button className="ml-2 p-2 rounded-lg bg-amber-600 text-white">
                                <FiFilter size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Render the appropriate view based on activeTab */}
                {activeTab === 'home' && (
                    <HomeView 
                        darkMode={darkMode}
                        inventoryItems={inventoryItems}
                        orders={orders}
                        searchQuery={searchQuery}
                    />
                )}

                {activeTab === 'inventory' && (
                    <InventoryView 
                        darkMode={darkMode}
                        inventoryItems={inventoryItems}
                        setInventoryItems={setInventoryItems}
                        searchQuery={searchQuery}
                    />
                )}

                {activeTab === 'orders' && (
                    <OrdersView 
                        darkMode={darkMode}
                        orders={orders}
                        setOrders={setOrders}
                        searchQuery={searchQuery}
                    />
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
