/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'

export default function MealSummary(){

    return(
        <React.Fragment>

            <section className="relative w-full px-4 py-10 text-white">
                <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto py-12 space-y-10 lg:space-y-0 lg:space-x-10 relative z-20">

                    {/* Left Text Content */}
                    <div className="lg:w-1/2 text-left text-white space-y-4 lg:mb-0">
                        <h1 className="text-4xl font-bold">Welcome to Tricia&apos;s Kitchen</h1>
                        <p>
                            Discover delicious meals and order with ease. Choose your favorite meal
                            from our diverse menu and enjoy a delightful dining experience.
                        </p>
                        <p>
                            All meals are cooked with high-quality ingredients, 
                            prepared by experienced chefs, and delivered to your door.
                        </p>
                    </div>

                    {/* Right Image Layout */}
                    <div className="lg:w-1/2 mt-10 lg:mt-0 flex flex-col items-center lg:items-end">
                        {/* Big Image */}
                        <div className="w-74 h-64 rounded-lg overflow-hidden mt-4">
                            <img
                            src="/images/breakfast.jpg"
                            alt="Big meal"
                            className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Three Small Images */}
                        <div className="flex gap-4 relative justify-center md:right-12 lg:justify-center bottom-2">
                            {['banku-tilapia.jpg', 'fufu.jpg', 'waakye.jpg'].map((img, idx) => (
                            <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden">
                                <img
                                src={`/images/${img}`}
                                alt={`Meal ${idx + 1}`}
                                className="w-full h-full object-cover"
                                />
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}