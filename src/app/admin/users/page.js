'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@components/sui/button'
import { Input } from '@components/sui/input'
import { Select } from '@components/sui/select'
import { Dialog } from '@components/sui/dialog'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@components/sui/dropdown-menu'
import { Eye, Pencil,EyeOff, Trash2,MoreVertical } from 'lucide-react'
import { FiArrowLeft } from 'react-icons/fi';
import {useRouter} from 'next/navigation';

const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', registered: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', status: 'Inactive', registered: '2023-03-10' },
    { id: 3, name: 'Samuel Adu', email: 'samuel@example.com', role: 'Customer', status: 'Active', registered: '2023-05-22' },
]

export default function UserManagement() {
    const router =  useRouter();
    const [users, setUsers] = useState(mockUsers)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('All')
    const [showAddUser, setShowAddUser] = useState(false)
    const [showEditUser, setShowEditUser] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [userToDelete, setUserToDelete] = useState(null)
    const [userToEdit, setUserToEdit] = useState(null)
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'Customer' })
    const [showPassword, setShowPassword] = useState(false);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
        const matchesFilter = filter === 'All' || user.status === filter || user.role === filter
        return matchesSearch && matchesFilter
    })

    const handleAddUser = (e) => {
        e.preventDefault()
        if (!newUser.name || !newUser.email || !newUser.password) {
            toast.error('Please fill all fields')
            return
        }
        const newEntry = {
            id: Date.now(),
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            status: 'Active',
            registered: new Date().toISOString().split('T')[0],
        }
        setUsers([newEntry, ...users])
        toast.success('Staff added successfully')
        setNewUser({ name: '', email: '', password: '', role: 'Customer' })
        setShowAddUser(false)
    }

    const handleEditUser = (e) => {
        e.preventDefault()
        if (!userToEdit.name || !userToEdit.email) {
            toast.error('Please fill all fields')
            return
        }
        setUsers(users.map(user => user.id === userToEdit.id ? userToEdit : user))
        toast.success('User updated successfully')
        setShowEditUser(false)
    }

    const handleDelete = () => {
        setUsers(users.filter(user => user.id !== userToDelete))
        toast.success('User deleted')
        setShowDeleteConfirm(false)
    }

    const handleView = (user) => {
        toast.info(
            <div className="space-y-2">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {user.status}
                    </span>
                </p>
                <p><strong>Registered:</strong> {user.registered}</p>
            </div>,
            {
                duration: 10000, 
            }
        )
    }

    return (
        <React.Fragment>
            <section className="p-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                    <button 
                            onClick={() => router.push('/admin')}
                            className="flex items-center text-gray-200 dark:text-gray-100 hover:text-gray-50 dark:hover:text-white mr-16"
                        >
                            <FiArrowLeft className="mr-2" size={20} />
                            Back to Dashboard
                        </button>
                        <h2 className="text-2xl font-bold">Staff Management</h2>
                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                        <Input
                            type="text"
                            placeholder="Search by name or email"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="md:w-64 text-gray-800"
                        />
                        <Select value={filter} onChange={e => setFilter(e.target.value)} className="md:w-40 text-gray-800">
                            <option value="All">All</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Admin">Admin</option>
                            <option value="Customer">Customer</option>
                        </Select>
                        <Button onClick={() => setShowAddUser(true)} variant="primary">Add Staff</Button>
                    </div>
                </div>

                <div className="overflow-auto rounded border border-gray-300">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-amber-800">
                            <tr>
                                <th className="text-left px-4 py-2">Name</th>
                                <th className="text-left px-4 py-2">Email</th>
                                <th className="text-left px-4 py-2">Role</th>
                                <th className="text-left px-4 py-2">Status</th>
                                <th className="text-left px-4 py-2">Registered</th>
                                <th className="text-left px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center p-4 text-gray-500">No users found.</td>
                                </tr>
                            ) : (
                                filteredUsers.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-900">
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">{user.role}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded-full text-sm ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">{user.registered}</td>
                                        <td className="px-4 py-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                                                    <DropdownMenuItem 
                                                        onClick={() => handleView(user)}
                                                        className="cursor-pointer hover:bg-gray-700 flex items-center gap-2"
                                                    >
                                                    <Eye className="h-4 w-4" />
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        onClick={() => {
                                                            setUserToEdit(user)
                                                            setShowEditUser(true)
                                                        }}
                                                        className="cursor-pointer hover:bg-gray-700 flex items-center gap-2"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        onClick={() => {
                                                            setUserToDelete(user.id)
                                                            setShowDeleteConfirm(true)
                                                        }}
                                                        className="cursor-pointer text-red-400 hover:bg-gray-700 flex items-center gap-2"
                                                    >
                                                        <Trash2 className="h-4 w-4 text-white" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Add User Dialog */}
                {showAddUser && (
                    <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
                        <div className="p-6 ">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Staff</h3>
                            <form className="flex flex-col gap-4 text-gray-800 " onSubmit={handleAddUser}>
                                <Input
                                    placeholder="Name"
                                    value={newUser.name}
                                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                    required
                                />
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    value={newUser.email}
                                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                    required
                                />
                                
                                <div className="relative">
                                    <Input
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        value={newUser.password}
                                        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                        required
                                    />
                                    {newUser.password && (
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-500" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-500" />
                                            )}
                                        </button>
                                    )}
                                </div>

                                <Select
                                    value={newUser.role}
                                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                    required
                                >
                                    <option value="Admin">Admin Staff</option>
                                    <option value="Customer">Casual Staff</option>
                                </Select>
                                <div className="flex gap-2">
                                    <Button type="submit" variant="primary">Create Staff</Button>
                                    <Button type="button" variant="secondary" onClick={() => setShowAddUser(false)}>Cancel</Button>
                                </div>
                            </form>
                        </div>
                    </Dialog>
                )}

                {/* Edit User Dialog */}
                {showEditUser && (
                    <Dialog open={showEditUser} onOpenChange={setShowEditUser}>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit Staff</h3>
                            <form className="flex flex-col gap-4 text-gray-800" onSubmit={handleEditUser}>
                                <Input
                                    placeholder="Name"
                                    value={userToEdit?.name || ''}
                                    onChange={e => setUserToEdit({ ...userToEdit, name: e.target.value })}
                                    required
                                />
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    value={userToEdit?.email || ''}
                                    onChange={e => setUserToEdit({ ...userToEdit, email: e.target.value })}
                                    required
                                />
                                <Select
                                    value={userToEdit?.role || 'Customer'}
                                    onChange={e => setUserToEdit({ ...userToEdit, role: e.target.value })}
                                    required
                                >
                                    <option value="Admin">Admin Staff</option>
                                    <option value="Customer">Casual Staff</option>
                                </Select>
                                <Select
                                    value={userToEdit?.status || 'Active'}
                                    onChange={e => setUserToEdit({ ...userToEdit, status: e.target.value })}
                                    required
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Select>
                                <div className="flex gap-2">
                                    <Button type="submit" variant="primary">Update Staff</Button>
                                    <Button type="button" variant="secondary" onClick={() => setShowEditUser(false)}>Cancel</Button>
                                </div>
                            </form>
                        </div>
                    </Dialog>
                )}

                {/* Delete Confirmation Dialog */}
                {showDeleteConfirm && (
                    <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                        <div className="p-2 min-h-[2rem]">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Confirm Delete</h3>
                            <p className="mb-6 text-gray-800">Are you sure you want to delete this user? This action cannot be undone</p>
                            <div className="flex gap-2">
                                <Button variant="destructive" className='bg-red-600 hover:bg-red-400 text-white rounded-3xl' onClick={handleDelete}>Delete</Button>
                                <Button variant="secondary" className='bg-gray-600 p-2' onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
                            </div>
                        </div>
                    </Dialog>
                )}
            </section>
        </React.Fragment>
    )
}
