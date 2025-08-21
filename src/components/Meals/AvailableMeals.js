'use client'
import React, {useState, useEffect, useRef, useMemo} from 'react'
import Image from 'next/image'

const menuData = {
    "none": [],
    "rice": [
        {id: 1, name: "Jollof Rice", price: 70, image: "/images/jollof-rice.jpg"},
        {id: 2, name: "Jollof Rice", price: 50, image: "/images/jollof-rice.jpg"},
        {id: 3, name: "Jollof Rice", price: 30, image: "/images/jollof-rice.jpg"},
        {id: 4, name: "Fried Rice", price: 90, image: "/images/assorted-fried-rice.jpg"},
        {id: 5, name: "Fried Rice", price: 70, image: "/images/assorted-fried-rice.jpg"},
        {id: 6, name: "Fried Rice", price: 50, image: "/images/assorted-fried-rice.jpg"},
        {id: 7, name: "Rice & Stew", price: 60, image: "/images/assorted-fried-rice.jpg"},
        {id: 8, name: "Rice & Stew", price: 40, image: "/images/assorted-fried-rice.jpg"},
        {id: 9, name: "Rice & Stew", price: 20, image: "/images/assorted-fried-rice.jpg"},
        {id: 10, name: "Rice & Soup", price: 60, image: "/images/assorted-fried-rice.jpg"},
        {id: 11, name: "Rice & Soup", price: 40, image: "/images/assorted-fried-rice.jpg"},
        {id: 12, name: "Rice & Soup", price: 20, image: "/images/assorted-fried-rice.jpg"},
    ],

    "fufu": [
        {id: 13, name: "Fufu with Light Soup", price: 100, image: "/images/fufu.jpg"},
        {id: 14, name: "Fufu with Light Soup", price: 80, image: "/images/fufu.jpg"},
        {id: 15, name: "Fufu with Light Soup", price: 50, image: "/images/fufu.jpg"},
        {id: 16, name: "Fufu with Palm Nut Soup", price: 70, image: "/images/fufu.jpg"},
        {id: 17, name: "Fufu with Palm Nut Soup", price: 40, image: "/images/fufu.jpg"},
        {id: 18, name: "Fufu with Palm Nut Soup", price: 30, image: "/images/fufu.jpg"},
        {id: 19, name: "Fufu with Grand Nut Soup", price: 70, image: "/images/fufu.jpg"},
        {id: 20, name: "Fufu with Grand Nut Soup", price: 50, image: "/images/fufu.jpg"},
        {id: 21, name: "Fufu with Grand Nut Soup", price: 30, image: "/images/fufu.jpg"},
    ],
    "ampesi": [
        {id: 22, name:"Yam with Garden Eggs", price: 50, image: "/images/ampesi.jpg"},
        {id: 23, name: "Plantain with Kontomire", price: 50, image: "/images/ampesi.jpg"},
        {id: 24, name: "Yam with Kontomire", price: 40, image: "/images/ampesi.jpg"},
        {id: 25, name: "Yam with Tomatoes Stew", price: 50, image: "/images/ampesi.jpg"},
        {id: 26, name: "Plantain with Palava Sauce", price: 50, image: "/images/ampesi.jpg"},
    ],
    "maize foods": [
        {id: 27, name: 'Banku with Soup', price: 50, image: "/images/banku-tilapia.jpg"},
        {id: 28, name: 'Kenkey with Fish', price: 50, image: "/images/kenkey.jpg"},
        {id: 29, name: 'Tuozaafi', price: 50, image: "/images/tuozaafi.jpg"},
        {id: 30, name: 'Apkle', price: 50, image: "/images/kenkey.jpg"},
    ],
    "fruit salad": [
        {id: 31, name: "Fruit Mix", price: 20, image: "/images/salad.jpg"},
        {id: 32, name: "Pineapple Bowl", price: 10, image: "/images/salad.jpg"},
    ],
    "vegetable salad": [
        {id:34, name: "Garden Salad", price: 15, image: "/images/salad.jpg"},
        {id: 35, name: "Coleslaw", price: 10, image: "/images/salad.jpg"},
    ],
    "juice": [
        {id: 36, name: "Fruit Juice", price: 20, image: "/images/juice.jpg"},
        {id: 37, name: "Vegetable Juice", price: 10, image: "/images/juice.jpg"},
    ],
    "breakfast": [
        {id: 38, name: "TomBrow", price: 20, image: "/images/breakfast.jpg"},
        {id: 39, name: "Pancake", price: 10, image: "/images/breakfast.jpg"},
        {id: 40, name: "Egg & Bread", price: 10, image: "/images/breakfast.jpg"},
        {id: 41, name: "Tea", price: 25, image: "/images/breakfast.jpg"},
        {id: 42, name: "Oat", price: 25, image: "/images/breakfast.jpg"},
        {id: 43, name: "Porridge", price: 20, image: "/images/breakfast.jpg"},
    ]
}

// Helper function to group foods by name and get price ranges
const groupFoodsByName = (foods) => {
    const grouped = {};
    foods.forEach(food => {
        if (!grouped[food.name]) {
            grouped[food.name] = {
                name: food.name,
                prices: [],
                image: food.image,
                items: []
            };
        }
        grouped[food.name].prices.push(food.price);
        grouped[food.name].items.push(food);
    });
    
    // Sort prices and remove duplicates
    Object.keys(grouped).forEach(key => {
        grouped[key].prices = [...new Set(grouped[key].prices)].sort((a, b) => a - b);
    });
    
    return Object.values(grouped);
};

export default function MenuList({addToCart}){
    const [selectedCategory, setSelectedCategory] = useState("none");
    const [selectedFood, setSelectedFood] = useState(null);
    const [viewMode, setViewMode] = useState("category"); // "category" or "food"
    const [addingId, setAddingId] = useState(null);

    const categories = Object.keys(menuData);

    const groupedFoods = useMemo(() => groupFoodsByName(menuData[selectedCategory]), [selectedCategory]);

    const handleAddToCart = async (item) => {
        setAddingId(item.id);
        try {
            // Simulate async
            await new Promise(res => setTimeout(res, 600));
            const itemWithId = { ...item, id: `${selectedCategory}-${item.id}` };
            addToCart(itemWithId);
        } catch (e) {
            // error toast will be handled globally
        } finally {
            setAddingId(null);
        }
    };

    const handleFoodClick = (food) => {
        setSelectedFood(food);
        setViewMode("food");
    };

    const handleBackToCategory = () => {
        setSelectedFood(null);
        setViewMode("category");
    };

    return(
        <React.Fragment>
            <section id='menu' className="bg-white text-black py-12 px-4 max-w-6xl mx-auto">
                <div className='bg-amber-100 p-6 rounded-lg shadow-lg'>
                    <h1 className="text-3xl font-bold mb-4">Our Menu List</h1>
                    <p className="text-gray-600 mb-8">Explore our delicious meals and order now! You can place an order for your preferred meal</p>
                    
                    {/* Category Selection */}
                    <div className='flex overflow-x-auto gap-4 mb-6 pb-2'>
                        {categories.map((category) => (
                            <button 
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setViewMode("category");
                                    setSelectedFood(null);
                                }}
                                className={`whitespace-nowrap px-4 py-2 rounded-full border-2 ${
                                    selectedCategory === category ?
                                    "bg-amber-800 text-white border-amber-800"
                                    : "border-amber-500 text-amber-800 hover:bg-amber-200"
                                }`}
                            >
                                {category.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Back Button when viewing individual food */}
                    {viewMode === "food" && (
                        <button 
                            onClick={handleBackToCategory}
                            className="mb-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                        >
                            ← Back to {selectedCategory}
                        </button>
                    )}

                    {/* Content Area */}
                    {viewMode === "category" && selectedCategory !== "none" && groupedFoods.length === 0 && (
                        <div className="text-center text-gray-500 py-8">No meals available in this category.</div>
                    )}
                    {viewMode === "category" && selectedCategory !== "none" && (
                        <div className="flex justify-center">
                            <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-md">
                                {groupedFoods.map((food, index) => (
                                    <div key={index}>
                                        <div
                                            onClick={() => handleFoodClick(food)}
                                            className="p-3 cursor-pointer hover:bg-amber-50 transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-amber-900 text-sm">{food.name}</h3>
                                                    <p className="text-xs text-gray-600">
                                                        GHS {food.prices.join(" / ")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {index < groupedFoods.length - 1 && (
                                            <div className="border-b border-gray-200 mx-3"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Individual Food View */}
                    {viewMode === "food" && selectedFood && (
                        <FoodBookCard selectedFood={selectedFood} handleAddToCart={handleAddToCart} />
                    )}

                    {/* Empty State */}
                    {selectedCategory === "none" && (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">Please select a category to view our menu</p>
                        </div>
                    )}
                </div>
            </section>
        </React.Fragment>
    );
}

// Animated card for the "opened book" effect
function FoodBookCard({ selectedFood, handleAddToCart }) {
    const imageRef = useRef(null);
    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.classList.add('animate-spin-in');
        }
    }, [selectedFood]);
    return (
        <div className="flex justify-center">
            <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 rounded-3xl shadow-lg border border-amber-100 w-full max-w-md flex items-stretch p-0 overflow-hidden relative">
                {/* Left: Slightly Larger Tall Animated Image */}
                <div className="w-2/5 min-w-[110px] max-w-[150px] flex items-center justify-center bg-amber-50 p-4">
                    <div ref={imageRef} className="w-24 h-40 relative rounded-2xl overflow-hidden border border-gray-200 shadow">
                        <Image
                            src={selectedFood.image}
                            alt={selectedFood.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                {/* Vertical Divider */}
                <div className="w-px bg-amber-200 mx-0 my-6"></div>
                {/* Right: Name and Price Options */}
                <div className="flex-1 flex flex-col justify-center p-6 bg-white">
                    <h2 className="text-xl font-extrabold text-amber-900 mb-3 tracking-wide drop-shadow-sm">{selectedFood.name}</h2>
                    <div className="space-y-2">
                        {selectedFood.items.map((item, index) => (
                            <div key={index} className="flex flex-row flex-nowrap items-center gap-x-4 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100 shadow-sm">
                                <span className="font-semibold text-amber-900 text-base truncate max-w-[7rem]">GHS {item.price}</span>
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="bg-amber-800 text-white px-4 py-1.5 rounded-lg hover:bg-amber-700 text-sm font-medium shadow whitespace-nowrap flex items-center justify-center min-w-[90px]"
                                    disabled={addingId === item.id}
                                    aria-busy={addingId === item.id}
                                >
                                    {addingId === item.id ? (
                                        <svg className="animate-spin h-4 w-4 mr-1 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                                    ) : null}
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Book crease effect */}
                <div className="absolute left-1/2 top-0 h-full w-2 bg-gradient-to-b from-amber-100/60 via-white/0 to-amber-100/60 pointer-events-none" style={{transform: 'translateX(-50%)'}}></div>
            </div>
        </div>
    );
}

// Add animation CSS to the global stylesheet (tailwind compatible)
// In your globals.css or a relevant CSS file, add:
// @keyframes spin-in { from { transform: rotate(-180deg) scale(0.7); opacity: 0; } to { transform: rotate(0deg) scale(1); opacity: 1; } }
// .animate-spin-in { animation: spin-in 0.7s cubic-bezier(0.4,0,0.2,1) both; }

