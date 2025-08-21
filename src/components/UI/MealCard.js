/* eslint-disable @next/next/no-img-element */
'use client'
import React from "react";

export default function MealCard({meal, addToCart}) {

    return(
        <React.Fragment>
            <div className="bg-white rounded-lg shadow-md overflow-hidden 
                transition transform duration-300 hover:scale-105 hover:shadow-xl px-2 m-2">
                <img 
                    src={meal.image} 
                    alt={meal.name} 
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover "></img>
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700">{meal.name}</h2>
                    <p className="text-gray-600 mb-2">{meal.description}</p>
                    <p className="text-gray-800 font-bold">GHC{meal.price.toFixed(2)}</p>
                    <button className="bg-amber-950 text-white py-2 px-4 rounded-md hover:bg-amber-700 mt-4" 
                    onClick={() => addToCart(meal)}>
                        Order
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}