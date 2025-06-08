'use client'
import React from 'react';
import {
    FiPackage, FiShoppingCart, FiAlertTriangle
} from 'react-icons/fi';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const HomeView = ({ darkMode, inventoryItems, orders, searchQuery }) => {
    // Chart data
    const orderStatusData = [
        { name: 'Preparing', value: orders.filter(o => o.status === 'Preparing').length },
        { name: 'Ready', value: orders.filter(o => o.status === 'Ready').length },
        { name: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length }
    ];

    const inventoryStatusData = [
        { name: 'Good', value: inventoryItems.filter(i => i.status === 'good').length },
        { name: 'Medium', value: inventoryItems.filter(i => i.status === 'medium').length },
        { name: 'Low', value: inventoryItems.filter(i => i.status === 'low').length }
    ];

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-lg font-semibold mb-2">Total Orders Today</h2>
                    <p className="text-3xl font-bold">24</p>
                    <p className="text-sm text-gray-500">+5 from yesterday</p>
                </div>
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-lg font-semibold mb-2">Revenue</h2>
                    <p className="text-3xl font-bold">GHC 2,450</p>
                    <p className="text-sm text-gray-500">Today&apos;s earnings</p>
                </div>
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-lg font-semibold mb-2">Low Stock Items</h2>
                    <p className="text-3xl font-bold text-red-500">
                        {inventoryItems.filter(item => item.status === 'low').length}
                    </p>
                    <p className="text-sm text-gray-500">Need immediate attention</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Status Chart */}
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-4">Order Status</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={orderStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {orderStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Inventory Status Chart */}
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-4">Inventory Status</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={inventoryStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {inventoryStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3">
                            <FiPackage className="text-amber-600 dark:text-amber-300" />
                        </div>
                        <div>
                            <p className="font-medium">New inventory item added</p>
                            <p className="text-sm text-gray-500">Banku Flour - 25kg</p>
                            <p className="text-xs text-gray-400">10 minutes ago</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                            <FiShoppingCart className="text-green-600 dark:text-green-300" />
                        </div>
                        <div>
                            <p className="font-medium">New order received</p>
                            <p className="text-sm text-gray-500">Order #1004 - GHC 120.00</p>
                            <p className="text-xs text-gray-400">25 minutes ago</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full mr-3">
                            <FiAlertTriangle className="text-red-600 dark:text-red-300" />
                        </div>
                        <div>
                            <p className="font-medium">Low stock alert</p>
                            <p className="text-sm text-gray-500">Tomatoes - 3kg remaining</p>
                            <p className="text-xs text-gray-400">1 hour ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeView;