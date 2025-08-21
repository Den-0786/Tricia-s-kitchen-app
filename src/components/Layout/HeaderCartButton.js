'use client'
import React,{useState} from "react";
import {FiShoppingCart} from 'react-icons/fi'


export default function HeaderCartButton({onClick, cartCount, animate}) {


    return(
        <React.Fragment>
            <button 
                onClick={onClick}
                aria-label="Open cart"
                className="text-white normal-case py-1 px-4 rounded-2xl bg-amber-950 hover:bg-amber-700 flex items-center gap-2 cursor-pointer">
                <span className={animate ? "animate-cart-bounce" : ""}>
                    <FiShoppingCart className="text-lg"/>
                </span>
                <span className="text-sm">Your Order</span>
                <span className="text-sm py-1 px-3 h-5 w-5 rounded-2xl bg-amber-900 flex justify-center items-center">
                    {cartCount}
                </span>
            </button>
        </React.Fragment>
    )
}