'use client'
import React, { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const OrdersView = ({ darkMode, orders = [], setOrders = () => {}, searchQuery = '', userRole }) => {
    const [orderToDelete, setOrderToDelete] = useState(null);

    // Safe order functions
    const updateOrderStatus = (id, status) => {
        setOrders((orders || []).map(order => 
            order.id === id ? { ...order, status } : order
        ));
    };

    const deleteOrder = (id) => {
        setOrders((orders || []).filter(order => order.id !== id));
        setOrderToDelete(null);
        toast.info('Order deleted. Undo coming soon!');
    };

    // Safe filtering with null checks
    const filteredOrders = (orders || []).filter(order => {
        const customer = order?.customer?.toLowerCase() || '';
        const items = order?.items?.toLowerCase() || '';
        const query = (searchQuery || '').toLowerCase();
        return customer.includes(query) || items.includes(query);
    });

    // Pre-computed counts for better performance
    const totalOrders = orders?.length || 0;
    const pendingOrders = (orders || []).filter(order => order.status === 'Preparing').length;
    const readyOrders = (orders || []).filter(order => order.status === 'Ready').length;
    const completedOrders = (orders || []).filter(order => order.status === 'Delivered').length;

    // Only show orders to admin and orders roles
    if (userRole !== 'admin' && userRole !== 'orders') {
        return <div className="p-8 text-center text-gray-500">You do not have permission to view orders.</div>;
    }

    return (
        <div className="space-y-6">
            {/* Orders Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h3 className="text-sm font-medium">Total Orders</h3>
                    <p className="text-2xl font-bold">{totalOrders}</p>
                </div>
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h3 className="text-sm font-medium">Pending</h3>
                    <p className="text-2xl font-bold text-amber-500">{pendingOrders}</p>
                </div>
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h3 className="text-sm font-medium">Ready</h3>
                    <p className="text-2xl font-bold text-blue-500">{readyOrders}</p>
                </div>
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h3 className="text-sm font-medium">Completed</h3>
                    <p className="text-2xl font-bold text-green-500">{completedOrders}</p>
                </div>
            </div>

            {/* Orders Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-semibold">Recent Orders</h2>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center">
                        <FiPlus className="mr-2" /> Add Order
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div className={`rounded-lg shadow overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <tr>
                                <th className="px-4 py-3 text-left">Order ID</th>
                                <th className="px-4 py-3 text-left">Customer</th>
                                <th className="px-4 py-3 text-left">Items</th>
                                <th className="px-4 py-3 text-left">Total</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order.id} className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <td className="px-4 py-3">#{order.id}</td>
                                    <td className="px-4 py-3">{order.customer || 'N/A'}</td>
                                    <td className="px-4 py-3">{order.items || 'N/A'}</td>
                                    <td className="px-4 py-3">{order.total || '0.00'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            order.status === 'Preparing' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' :
                                            order.status === 'Ready' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                        }`}>
                                            {order.status || 'Unknown'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{order.date || 'N/A'}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            {order.status === 'Preparing' && (
                                                <button 
                                                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                                    onClick={() => updateOrderStatus(order.id, 'Ready')}
                                                >
                                                    Mark Ready
                                                </button>
                                            )}
                                            {order.status === 'Ready' && (
                                                <button 
                                                    className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                                                    onClick={() => updateOrderStatus(order.id, 'Delivered')}
                                                >
                                                    Complete
                                                </button>
                                            )}
                                            {order.status === 'Delivered' && (
                                                <button
                                                    className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
                                                    disabled
                                                >
                                                    Completed
                                                </button>
                                            )}
                                            <button 
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => setOrderToDelete(order)}
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Orders Chart */}
            <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h2 className="text-xl font-semibold mb-4">Orders Trend</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={[
                                { day: 'Mon', orders: 12 },
                                { day: 'Tue', orders: 19 },
                                { day: 'Wed', orders: 15 },
                                { day: 'Thu', orders: 21 },
                                { day: 'Fri', orders: 18 },
                                { day: 'Sat', orders: 25 },
                                { day: 'Sun', orders: 22 }
                            ]}
                            margin={{ top: 5, right: 40, left: 20, bottom: 5 }}
                        >
                            <XAxis dataKey="day" stroke={darkMode ? '#fff' : '#000'} />
                            <YAxis stroke={darkMode ? '#fff' : '#000'} />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: darkMode ? '#333' : '#fff',
                                    borderColor: darkMode ? '#555' : '#ddd'
                                }} 
                            />
                            <Bar 
                                dataKey="orders" 
                                fill={darkMode ? '#f59e0b' : '#3b82f6'} 
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {orderToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`w-full max-w-md mx-auto p-6 rounded-lg -translate-y-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h3 className="font-bold text-lg">Confirm Deletion</h3>
                        <div className="py-4">
                            <p>
                                Are you sure you want to delete order <strong>#{orderToDelete.id}</strong>?
                            </p>
                            <p className="text-sm text-gray-500 mt-2">Customer: {orderToDelete.customer || 'N/A'}</p>
                            <p className="text-sm text-gray-500">This action cannot be undone.</p>
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button 
                                className="btn bg-gray-500 rounded-md p-1 hover:bg-gray-400"
                                onClick={() => setOrderToDelete(null)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn bg-red-600 text-white rounded-md p-1 hover:bg-red-500"
                                onClick={() => deleteOrder(orderToDelete.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersView;