'use client'
import React, { useState, useEffect } from 'react';
import { FiAlertTriangle, FiPlus, FiEdit, FiTrash2, FiDownload } from 'react-icons/fi';

const InventoryView = ({ darkMode, inventoryItems = [],  setInventoryItems, searchQuery = ''}) => {
    const [items, setItems] = useState(inventoryItems || []);
    const [newInventoryItem, setNewInventoryItem] = useState({
        name: '',
        quantity: '',
        unit: 'kg',
        threshold: ''
    });
    const [itemToDelete, setItemToDelete] = useState(null);
    const [editingItemId, setEditingItemId] = useState(null);
    const [errors, setErrors] = useState({});

    // Sync with parent component's inventoryItems
    useEffect(() => {
        setItems(inventoryItems || []);
    }, [inventoryItems]);

    // Validate input fields
    useEffect(() => {
        const errs = {};
        if (!newInventoryItem.name.trim()) errs.name = 'Name is required.';
        if (newInventoryItem.quantity === '' || Number(newInventoryItem.quantity) <= 0)
            errs.quantity = 'Quantity must be greater than 0.';
        if (newInventoryItem.threshold === '' || Number(newInventoryItem.threshold) < 0)
            errs.threshold = 'Threshold cannot be negative.';
        setErrors(errs);
    }, [newInventoryItem]);

    const isValidInventoryItem = Object.keys(errors).length === 0;

    // Safe filtering
    const filteredInventory = items.filter(item =>
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Add or update inventory item
    const addInventoryItem = () => {
        if (!isValidInventoryItem) return;

        if (editingItemId !== null) {
            setInventoryItems(items.map(item =>
                item.id === editingItemId
                    ? {
                        ...item,
                        ...newInventoryItem,
                        quantity: Number(newInventoryItem.quantity),
                        threshold: Number(newInventoryItem.threshold),
                        status: Number(newInventoryItem.quantity) > Number(newInventoryItem.threshold)
                            ? 'good'
                            : 'low'
                    }
                    : item
            ));
        } else {
            const newItem = {
                id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
                ...newInventoryItem,
                quantity: Number(newInventoryItem.quantity),
                threshold: Number(newInventoryItem.threshold),
                status: Number(newInventoryItem.quantity) > Number(newInventoryItem.threshold)
                    ? 'good'
                    : 'low'
            };
            setInventoryItems([newItem, ...items]);
        }

        setNewInventoryItem({ name: '', quantity: '', unit: 'kg', threshold: '' });
        setEditingItemId(null);
        document.getElementById('addInventoryModal').close();
    };

    // Delete inventory item
    const deleteInventoryItem = (id) => {
        setInventoryItems(items.filter(item => item.id !== id));
        setItemToDelete(null);
    };

    // Export inventory
    const exportInventory = () => {
        const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'inventory.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Count items by status
    const goodItems = items.filter(item => item.status === 'good').length;
    const mediumItems = items.filter(item => item.status === 'medium').length;
    const lowItems = items.filter(item => item.status === 'low').length;

    // Open modal for editing item
    const openEditModal = (item) => {
        setNewInventoryItem({
            name: item.name,
            quantity: item.quantity,
            unit: item.unit,
            threshold: item.threshold
        });
        setEditingItemId(item.id);
        document.getElementById('addInventoryModal').showModal();
    };

    return (
        <div className="space-y-6">
            {/* Inventory Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h3 className="text-sm font-medium">Total Items</h3>
                    <p className="text-2xl font-bold">{items.length}</p>
                </div>
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h3 className="text-sm font-medium">In Stock</h3>
                    <p className="text-2xl font-bold text-green-500">{goodItems}</p>
                </div>
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h3 className="text-sm font-medium">Medium Stock</h3>
                    <p className="text-2xl font-bold text-amber-500">{mediumItems}</p>
                </div>
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <h3 className="text-sm font-medium">Low Stock</h3>
                    <p className="text-2xl font-bold text-red-500">{lowItems}</p>
                </div>
            </div>

            {/* Inventory Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-semibold">Inventory Items</h2>
                <div className="flex gap-2 w-full md:w-auto">
                    <button
                        className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center"
                        onClick={() => {
                            setNewInventoryItem({ name: '', quantity: '', unit: 'kg', threshold: '' });
                            setEditingItemId(null);
                            document.getElementById('addInventoryModal').showModal();
                        }}
                    >
                        <FiPlus className="mr-2" /> Add Item
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                        onClick={exportInventory}
                    >
                        <FiDownload className="mr-2" /> Export
                    </button>
                </div>
            </div>

            {/* Inventory Table */}
            <div className={`rounded-lg shadow overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <tr>
                                <th className="px-4 py-3 text-left">Item</th>
                                <th className="px-4 py-3 text-left">Quantity</th>
                                <th className="px-4 py-3 text-left">Threshold</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventory.map(item => (
                                <tr key={item.id} className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <td className="px-4 py-3">{item.name}</td>
                                    <td className="px-4 py-3">{item.quantity} {item.unit}</td>
                                    <td className="px-4 py-3">{item.threshold} {item.unit}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            item.status === 'low' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                            item.status === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' :
                                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        }`}>
                                            {item.status === 'low' ? 'Low' :
                                            item.status === 'medium' ? 'Medium' : 'Good'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                className="text-blue-500 hover:text-blue-700"
                                                onClick={() => openEditModal(item)}
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => setItemToDelete(item)}
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

            {/* Low Stock Alerts */}
            {lowItems > 0 && (
                <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-red-900' : 'bg-red-100'}`}>
                    <h2 className="text-xl font-semibold mb-4 flex items-center text-red-600 dark:text-red-200">
                        <FiAlertTriangle className="mr-2" />
                        Low Stock Alerts
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items
                            .filter(item => item.status === 'low')
                            .map(item => (
                                <div key={item.id} className={`p-3 rounded-lg ${darkMode ? 'bg-red-800' : 'bg-white'}`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm">
                                                Current: {item.quantity} {item.unit} | Threshold: {item.threshold} {item.unit}
                                            </p>
                                        </div>
                                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">
                                            Order More
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
            
            {/* Add Inventory Modal */}
            <dialog id="addInventoryModal" className="modal">
            <div className={`modal-box ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-2xl shadow-xl`}>
                <h3 className="font-bold text-xl text-center mb-4">
                {editingItemId !== null ? 'Edit Inventory Item' : 'Add New Inventory Item'}
                </h3>
                <div className="space-y-4 flex flex-col items-center">
                <div className="w-full flex flex-col items-center">
                    <label className="block mb-1 text-sm">Item Name</label>
                    <input
                    type="text"
                    className={`w-72 p-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        darkMode ? 'bg-gray-700 border-gray-600 focus:ring-amber-500' : 'bg-white border-gray-300 focus:ring-amber-400'
                    }`}
                    value={newInventoryItem.name}
                    onChange={(e) => setNewInventoryItem({ ...newInventoryItem, name: e.target.value })}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4 w-full justify-center">
                    <div className="flex flex-col items-center">
                    <label className="block mb-1 text-sm">Quantity</label>
                    <input
                        type="number"
                        className={`w-32 p-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        darkMode ? 'bg-gray-700 border-gray-600 focus:ring-amber-500' : 'bg-white border-gray-300 focus:ring-amber-400'
                        }`}
                        value={newInventoryItem.quantity}
                        onChange={(e) => setNewInventoryItem({ ...newInventoryItem, quantity: e.target.value })}
                    />
                    {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                    </div>
                    <div className="flex flex-col items-center">
                    <label className="block mb-1 text-sm">Unit</label>
                    <select
                        className={`w-32 p-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        darkMode ? 'bg-gray-700 border-gray-600 focus:ring-amber-500' : 'bg-white border-gray-300 focus:ring-amber-400'
                        }`}
                        value={newInventoryItem.unit}
                        onChange={(e) => setNewInventoryItem({ ...newInventoryItem, unit: e.target.value })}
                    >
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="pieces">pieces</option>
                        <option value="liters">liters</option>
                        <option value="ml">ml</option>
                        <option value="packets">packets</option>
                    </select>
                    </div>
                </div>

                <div className="w-full flex flex-col items-center">
                    <label className="block mb-1 text-sm">Low Stock Threshold</label>
                    <input
                    type="number"
                    className={`w-72 p-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        darkMode ? 'bg-gray-700 border-gray-600 focus:ring-amber-500' : 'bg-white border-gray-300 focus:ring-amber-400'
                    }`}
                    value={newInventoryItem.threshold}
                    onChange={(e) => setNewInventoryItem({ ...newInventoryItem, threshold: e.target.value })}
                    />
                    {errors.threshold && <p className="text-red-500 text-xs mt-1">{errors.threshold}</p>}
                </div>
                </div>

                <div className="modal-action flex justify-center mt-6">
                <form method="dialog" onSubmit={(e) => e.preventDefault()} className="flex space-x-4">
                    <button
                    type="button"
                    className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800 transition-all"
                    onClick={() => {
                        setNewInventoryItem({ name: '', quantity: '', unit: 'kg', threshold: '' });
                        setEditingItemId(null);
                        document.getElementById('addInventoryModal')?.close();
                    }}
                    >
                    Cancel
                    </button>
                    <button
                    type="button"
                    className="px-4 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white transition-all"
                    onClick={addInventoryItem}
                    disabled={!isValidInventoryItem}
                    style={{ opacity: isValidInventoryItem ? 1 : 0.5, cursor: isValidInventoryItem ? 'pointer' : 'not-allowed' }}
                    >
                    Save
                    </button>
                </form>
                </div>
            </div>
            </dialog>

            {/* Delete Confirmation Modal */}
            {itemToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`rounded-lg w-full max-w-md mx-auto p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} -translate-y-10`}>
                        <h3 className="font-bold text-lg">Confirm Deletion</h3>
                        <div className="py-4">
                            <p>
                                Are you sure you want to delete <strong>{itemToDelete.name}</strong> from inventory?
                            </p>
                            <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button className="btn bg-gray-500 rounded-md p-1 hover:bg-gray-400" onClick={() => setItemToDelete(null)}>Cancel</button>
                            <button
                                className="btn bg-red-600 text-white rounded-md p-1 hover:bg-red-500"
                                onClick={() => deleteInventoryItem(itemToDelete.id)}
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

InventoryView.defaultProps = {
    inventoryItems: [],
    searchQuery: ''
};

export default InventoryView;
