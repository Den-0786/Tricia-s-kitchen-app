'use client'
import React, { useState, useEffect } from 'react'
import MealCard from '../UI/MealCard'

const mealsData = [
    { id: 1, name: 'Fried Rice', description: 'Assorted Fried Rice with Chicken', price: 70.99, image: '/images/assorted-fried-rice.jpg' },
    { id: 2, name: 'Banku & Tilapia', description: 'Locally made Banku with grilled tilapia', price: 90.99, image: '/images/banku-tilapia.jpg' },
    { id: 3, name: 'Jollof Rice', description: 'Jollof rice with chicken and vegetables', price: 80.99, image: '/images/jollof-rice.jpg' },
    { id: 4, name: 'Fufu with Light Soup', description: 'Delicious Fufu with light soup', price: 60.99, image: '/images/fufu.jpg' },
    { id: 5, name: 'Ampesi', description: 'All kinds of ampesi with soup or stew and salad', price: 50.99, image: '/images/ampesi.jpg' },
    { id: 6, name: 'G)b3', description: 'Assorted gob3 with egg, fish, sausage,avocado', price: 40.99, image: '/images/gob3.jpg' },
    { id: 7, name: 'Waakye', description: 'Our Friday special waakye with all ingredients', price: 30.99, image: '/images/waakye.jpg' },
    { id: 8, name: 'Kenkey & Fish', description: 'Enjoy our kenkey & fish with hot pepper and shito', price: 20.99, image: '/images/kenkey.jpg' },
    { id: 9, name: 'Tuozaafi', description: 'Delicious Tuozaafi with soup', price: 15.99, image: '/images/tuozaafi.jpg' },
    { id: 10, name: 'Breakfast', description: 'Our topnotch breakfast', price: 20.99, image: '/images/breakfast.jpg' },
    { id: 11, name: 'Vegetable Salad', description: 'All kinds of salad, fruits & vegetables', price: 50.99, image: '/images/salad.jpg' },
    { id: 12, name: 'Juice', description: 'Organic fruit and vegetable juice', price: 70.99, image: '/images/juice.jpg' }
]

const openingHours = [
    { day: 'Sunday', open: 'Closed', close: '', lastOrder: ''  },
    { day: 'Monday', open: '7:00 AM', close: '8:00 PM', lastOrder: '7:30 PM'  },
    { day: 'Tuesday', open: '7:00 AM', close: '8:00 PM', lastOrder: '7:30 PM'  },
    { day: 'Wednesday', open: '7:00 AM', close: '8:00 PM', lastOrder: '7:30 PM'  },
    { day: 'Thursday', open: '7:00 AM', close: '8:00 PM', lastOrder: '7:30 PM'  },
    { day: 'Friday', open: '7:00 AM', close: '8:00 PM', lastOrder: '7:30 PM'  },
    { day: 'Saturday', open: '9:00 AM', close: '6:00 PM', lastOrder: '5:30 PM'  },
]

function parseTime(timeStr) {
    if (timeStr === 'Closed') return [0, 0]
    const [time, period] = timeStr.split(' ')
    let [hour, minute] = time.split(':').map(Number)
    if (period === 'PM' && hour !== 12) hour += 12
    if (period === 'AM' && hour === 12) hour = 0
    return [hour, minute]
}
function checkOpenStatus() {
    const now = new Date()
    const dayIndex = now.getDay() 
    const today = openingHours[dayIndex]

    if (today.open === 'Closed') return false

    const [openHour, openMin] = parseTime(today.open)
    const [closeHour, closeMin] = parseTime(today.close)

    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    const openMinutes = openHour * 60 + openMin
    const closeMinutes = closeHour * 60 + closeMin

    return currentMinutes >= openMinutes && currentMinutes <= closeMinutes
}

function OpeningHoursTooltip() {
    return (
        <div className="absolute right-[1rem] bottom-full mb-2 w-[14rem] p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50 opacity-0 animate-fadeIn"
            style={{ animationFillMode: 'forwards' }}>
            <h4 className="font-semibold mb-2 underline">Opening Days & Hours</h4>
            <ul>
                {openingHours.map(({ day, open, close }) => (
                    <li key={day} className="text-sm whitespace-nowrap h-[2rem]">
                        <span className="font-normal mr-2">{day}:</span>
                        {open === 'Closed' ? (
                            <span className="italic text-red-500">Closed</span>
                        ) : (
                            <span>{`${open} - ${close}`}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function HomePageMeals({ addToCart }) {
    const [isOpen, setIsOpen] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)

    useEffect(() => {
        setIsOpen(checkOpenStatus())
        const interval = setInterval(() => setIsOpen(checkOpenStatus()), 60000)
        return () => clearInterval(interval)
    }, [])


    const now = new Date();
    const jsDayIndex = now.getDay();
    const todayData = openingHours[jsDayIndex];
    
    // Get next open day's data
    let nextOpenDayData = null;
    let nextOpenIsTomorrow = false;
    for (let i = 1; i <= 7; i++) {
        const nextIndex = (jsDayIndex + i) % 7;
        if (openingHours[nextIndex].open !== 'Closed') {
            nextOpenDayData = openingHours[nextIndex];
            nextOpenIsTomorrow = (i === 1);
            break;
        }
    }

    const openMessage = todayData.open === 'Closed' 
        ? 'Closed today' 
        : `We're Open! ${todayData.lastOrder ? `Last orders at ${todayData.lastOrder}` : ''}`;
    
    const closedMessage = todayData.open === 'Closed'
        ? `Closed today. ${nextOpenDayData ? `Opens at ${nextOpenDayData.open} on ${nextOpenDayData.day}` : ''}`
        : `Sorry, we're Closed now. ${nextOpenDayData ? `Opens at ${nextOpenDayData.open} ${nextOpenIsTomorrow ? 'tomorrow' : `on ${nextOpenDayData.day}`}` : ''}`;



    return (
        <React.Fragment>
            <section id="home" className="flex flex-col items-center justify-center relative px-4 md:px-8">
                <div className="border-2 rounded-lg shadow-lg w-full max-w-7xl p-6 bg-white dark:bg-gray-800 dark:text-gray-100 relative">
                    {/* Open Days and Time Button */}
                    <div className="flex justify-center mb-4">
                        <button
                            className="flex items-center gap-2 px-5 py-2 bg-amber-700 text-white rounded-full shadow hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors text-base font-semibold"
                            onClick={() => setShowCalendar((prev) => !prev)}
                            onMouseEnter={() => setShowCalendar(true)}
                            onMouseLeave={() => setShowCalendar(false)}
                            aria-label="Show open days and time"
                        >
                            <span role="img" aria-label="calendar">📅</span>
                            Open days and time
                        </button>
                        <div className="relative">
                            {showCalendar && (
                                <div
                                    onMouseEnter={() => setShowCalendar(true)}
                                    onMouseLeave={() => setShowCalendar(false)}
                                    className="absolute left-0 ml-4 z-50 mt-2"
                                >
                                    <OpeningHoursTooltip />
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Open/Closed Banner */}
                    <div
                        className={`
                            flex items-center justify-center mb-6 rounded-md p-3 text-center
                            transition-opacity duration-700
                            ${isOpen ? 'bg-green-100 border border-green-600 text-green-800' : 'bg-red-100 border border-red-600 text-red-800'}
                            relative
                        `}
                        aria-label="Restaurant open hours status"
                    >
                        <span className="mr-2 text-2xl animate-pulse" aria-hidden="true">
                            {isOpen ? '🟢' : '🔴'}
                        </span>
                        <span className="font-semibold text-lg">
                            {isOpen ? openMessage : closedMessage}
                        </span>
                    </div>

                    {/* Available Meals */}
                    <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-100 mb-3 text-center">
                        Available Meals
                    </h1>
                    <p className="text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                        Explore our delicious, freshly prepared meals made from the best local ingredients. Whether you want something light or a full meal, we have you covered. Order now and enjoy the authentic taste delivered to your doorstep.
                    </p>
                    </div>

                    {/* Meals Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                    {mealsData.map((meal) => (
                        <MealCard key={meal.id} meal={meal} addToCart={addToCart} />
                    ))}
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}