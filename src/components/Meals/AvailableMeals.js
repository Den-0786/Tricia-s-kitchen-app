'use client'
import React, {useState} from 'react'

const menuData = {
    "none": [],
    "rice": [
        {id: 1, name: "Jollof Rice", price: 70},
        {id: 2, name: "Jollof Rice", price: 50},
        {id: 3, name: "Jollof Rice", price: 30},
        {id: 4, name: "Fried Rice", price: 90},
        {id: 5, name: "Fried Rice", price: 70},
        {id: 6, name: "Fried Rice", price: 50},
        {id: 7, name: "Rice &  Stew", price: 60},
        {id: 8, name: "Rice &  Stew", price: 40},
        {id: 9, name: "Rice &  Stew", price: 20},
        {id: 10, name: "Rice &  Soup", price: 60},
        {id: 11, name: "Rice &  Soup", price: 40},
        {id: 12, name: "Rice &  Soup", price: 20},
    ],

    "fufu": [
        {id: 13, name: "fufu with light soup", price: 100},
        {id: 14, name: "fufu with light soup", price: 80},
        {id: 15, name: "fufu with light soup", price: 50},
        {id: 16, name: "fufu with Palm Nut soup", price: 70},
        {id: 17, name: "fufu with Palm Nut soup", price: 40},
        {id: 18, name: "fufu with Palm Nut soup", price: 30},
        {id: 19, name: "fufu with Grand Nut soup ", price: 70},
        {id: 20, name: "fufu with Grand Nut soup ", price: 50},
        {id: 21, name: "fufu with Grand Nut soup ", price: 30},
    ],
    "ampesi": [
        {id: 22, name:"Yam with Garden Eggs", price: 50},
        {id: 23, name: "Plantain with Kontomire", price: 50},
        {id: 24, name: "Yam with Kontomire", price: 40},
        {id: 25, name: "Yam with Tomatoes stew", price: 50},
        {id: 26, name: "Plantain with Palava source", price: 50},
    ],
    "maize foods": [
        {id: 27, name: 'Banku with soup', price: 50},
        {id: 28, name: 'Kenkey with Fish', price: 50},
        {id: 29, name: 'Tuozaafi', price: 50},
        {id: 30, name: 'Apkle', price: 50},
    ],
    "fruit salad": [
        {id: 31, name: "Fruit Mix", price: 20 },
        {id: 32, name: "Pineapple Bowl", price: 10},
    ],
    "vegetable salad": [
        {id:34, name: "Garden Salad", price: 15 },
        {id: 35, name: "Coleslaw", price: 10 },
    ],
    "juice": [
        {id: 36, name: "Fruit Juice", price: 20},
        {id: 37, name: "Vegetable Juice", price: 10},
    ],
    "breakfast": [
        {id: 38, name: "TomBrow", price: 20},
        {id: 39, name: "Pancake", price: 10},
        {id: 40, name: "Egg & Bread", price: 10},
        {id: 41, name: "Tea", price: 25},
        {id: 42, name: "Oat", price: 25},
        {id: 41, name: "Porridge", price: 20},
        
    ]
}

export default function MenuList({addToCart}){
    const [selectedCategory, setSelectedCategory] = useState("none");

    const categories = Object.keys(menuData);

    const handleAddToCart = (item, index) => {
        const itemWithId = { ...item, id: `${selectedCategory}-${index}` };
        addToCart(itemWithId);
    };
    
    return(
        <React.Fragment>
            <section id='menu' className=" bg-white text-black py-12 px-4 max-w-6xl mx-auto">
                <div className='bg-amber-100 p-6 rounded-lg shadow-lg'>
                    <h1 className="text-3xl font-bold mb-4">Our Menu List</h1>
                    <p className="text-gray-600 mb-8">Explore our delicious meals and order now! You can place an order for your preferred meal</p>
                    <div className='flex overflow-x-auto gap-4 mb-6 pb-2'>
                        {categories.map((category) => (
                            <button 
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full border-2 ${
                                selectedCategory === category ?
                                "bg-amber-800 text-white border-amber-800"
                                : "border-amber-500 text-amber-800 hover:bg-amber200"
                            }`}
                        >
                            {category.toUpperCase()}
                        </button>
                        ))}
                    </div>
                    {/*Food items for category*/}

                    <div className="flex justify-center">
                        <div className="flex flex-col gap-2 bg-white p-3 rounded-lg shadow-md border border-gray-200 w-full max-w-lg">
                            {menuData[selectedCategory].map((item, index) => (
                            <div
                                key={index}
                                className="border-b border-amber-400 last:border-none pb-2"
                            >
                                <div className="flex justify-between items-center text-amber-900 space-x-4">
                                <h2 className="text-sm font-semibold flex-1">{item.name}</h2>
                                <span className="text-sm font-medium whitespace-nowrap">
                                    ₵{item.price}
                                </span>
                                <button className="bg-amber-800 text-white px-3 py-1 text-sm rounded hover:bg-amber-700"
                                        onClick={() => handleAddToCart(item, index)}
                                >
                                    Order
                                </button>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}