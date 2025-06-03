'use client'
import React, { useState, useEffect } from 'react'
import MealCard from '../UI/MealCard'




const mealsData = [
    {id: 1, name: 'Fried Rice', description: 'Assorted Fried Rice with Chicken', price: 70.99, image: '/images/assorted-fried-rice.jpg'},
    {id: 2, name: 'Banku & Tilapia', description: 'Locally made Banku with grilled tilapia', price: 90.99, image: '/images/banku-tilapia.jpg'},
    {id: 3, name: 'Jollof Rice', description: 'Jollof rice with chicken and vegetables', price: 80.99, image: '/images/jollof-rice.jpg'},
    {id: 4, name: 'Fufu with Light Soup', description: 'Delicious Fufu with light soup', price: 60.99, image: '/images/fufu.jpg'},
    {id: 5, name: 'Ampesi', description: 'All kinds of ampesi with soup or stew and salad', price: 50.99, image: '/images/ampesi.jpg'},
    {id: 6, name: 'G)b3', description: 'Assorted gob3 with egg, fish, sausage,avocado', price: 40.99, image: '/images/gob3.jpg'},
    {id: 7, name: 'Waakye', description: 'Our Friday special waakye with all ingredients', price: 30.99, image: '/images/waakye.jpg'},
    {id: 8, name: 'Kenkey & Fish', description: 'Enjoy our kenkey & fish with hot pepper and shito', price: 20.99, image: '/images/kenkey.jpg'},
    {id: 9, name: 'Tuozaafi', description: 'Delicious Tuozaafi with soup', price: 15.99, image: '/images/tuozaafi.jpg'},
    {id: 10, name: 'Breakfast', description: 'Our topnotch breakfast', price: 20.99, image: '/images/breakfast.jpg'},
    {id: 11, name: 'Vegetable Salad', description: 'All kinds of salad, fruits & vegetables', price: 50.99, image: '/images/salad.jpg'},
    {id: 12, name: 'Juice', description: 'Organic fruit and vegetable juice', price: 70.99, image: '/images/juice.jpg'}
    
]

export default function HomePageMeals({addToCart}) {

    return(
        <React.Fragment>
            <section id='home' className="flex flex-col items-center justify-center mt-16">
                <div className='border-2 px-2 py-2 mb-10 mt-10 border-amber-900 rounded-lg shadow-lg justify-center items-center'>
                    <h1 className="text-3xl text-center font-bold text-gray-700">Available Meals</h1>
                    <p className="text-gray-600 mb-8">Explore our delicious meals and order now!</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mealsData.map((meal) => (
                        <MealCard key={meal.id} meal={meal} addToCart={addToCart} />
                    ))}
                </div>
            </section>
        </React.Fragment>
    )
}