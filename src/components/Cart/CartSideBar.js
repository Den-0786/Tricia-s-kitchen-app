'use client'
import React, {useState} from "react"
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ConfirmModal from "@components/Layout/ConfirmationModal"

export default function CartSideBar({
    cart,
    setCart, 
    totalAmount, 
    onClose, 
    clearCart, 
    increaseQty, 
    decreaseQty, 
    removeFromCart, 
    onProceedToOrderForm
}) {
    
    const [showConfirmCheckout, setShowConfirmCheckout] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);

    const handleCheckout = () => {
        // clearCart();
        setShowConfirmCheckout(false);
        onClose();
        onProceedToOrderForm();
        
    }
    return(
            <div className="fixed top-24 right-8 rounded-lg w-80 h-70 bg-white shadow-xl p-6 z-50 ">
                <h2 className="text-lg font-bold mb-4 text-gray-700 flex justify-center">Your Order</h2>
                <button 
                    onClick={onClose}  
                    className="absolute top-4 right-4 text-lg text-white rounded bg-amber-900 hover:bg-amber-700"
                    ><CloseIcon/>
                </button>
                {cart.length === 0 ? (
                    <p className="text-gray-600">No item in your cart</p>
                ):(
                    <div className="space-y-4">
                        {[...cart].reverse().map((item) => (
                            <div key={item.id} className="border-b pb-3">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold text-gray-950">{item.name}</h3>
                                        <p className="text-sm text-gray-950">${item.price.toFixed(2)}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button className="px-2 bg-amber-900 rounded text-white" onClick={() => increaseQty(item.id)}><AddIcon/></button>
                                            <span className="text-gray-700">{item.quantity}</span>
                                            <button className="px-2 bg-amber-900 rounded text-white" onClick={() => decreaseQty(item.id)}><RemoveIcon/></button>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setItemToRemove(item)} 
                                        className="text-red-500 hover:underline"
                                        >Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="mt-6">
                            <div className="flex justify-between items-center text-semibold text-lg mb-4 text-gray-950">
                                <span>Total:</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={onClose}
                                    className="flex-1 border-2 border-amber-900 text-gray-700 py-1 text-sm rounded-2xl hover:bg-gray-500 hover:text-white transition"
                                >
                                    Close
                                </button>
                                <button 
                                onClick={()=> setShowConfirmCheckout(true)}
                                className=" flex-1 bg-amber-950 text-white py-1 rounded-2xl hover:bg-amber-800 transition"
                                >
                                    Order Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showConfirmCheckout && (
                    <ConfirmModal 
                        onConfirm={handleCheckout}
                        onCancel={() => setShowConfirmCheckout(false)}
                        message="Are you sure you want to place this order?"
                        conFirmText="Yes"
                        cancelText="Cancel"
                    />
                )}

                {itemToRemove && (
                    <ConfirmModal
                        onConfirm={() => {
                            removeFromCart(itemToRemove.id)
                            setItemToRemove(null)
                        }}
                    onCancel={() => setItemToRemove(null)}
                    message={`Remove ${itemToRemove?.name || 'This Item'} from your cart?`}
                    conFirmText="Remove"
                    cancelText="Cancel"
                    />
                )}
            </div>
        )
}