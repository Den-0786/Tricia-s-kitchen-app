'use client'
import React from 'react'

export default function AboutCard(){

    return(
        <React.Fragment>
            <div id='about' className='mt-10 w-full px-4 lg:px-0 flex justify-center'>
                <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white rounded-lg shadow-sm p-6 border-2 border-amber-800">
                    {/*left Side of the about section*/}
                    <div className='flex-1 space-y-4 mb-4 lg:mb-0 cursor-pointer text-gray-800'>
                        <h1 className='text-2xl font-bold'>About Tricia&apos;s Kitchen</h1>
                        <p className='text-gray-500'>Welcome to Tricia&apos;s Kitchen, a cozy local kitchen where homemade flavors 
                            and warm hospitality come together! We take pride in serving delicious, freshly 
                            prepared meals that remind you of home. At Tricia&apos;s Kitchen, we offer a taste of authentic local cuisine, 
                            made with love and the finest ingredients sourced from our community. From hearty breakfasts and savory lunches to 
                            mouthwatering dinners, our menu is crafted to satisfy every craving. Whether you&apos;re stopping 
                            by for a quick bite or a relaxed meal with family and friends, we guarantee a dining experience 
                            filled with comfort and flavor.What sets us apart is our commitment to tradition and quality. 
                            Every dish tells a story, blending classic recipes with a touch of modern flair. Our friendly 
                            staff and welcoming atmosphere makes Tricia&apos;s Kitchen  more than just a place to eat—it&apos;s 
                            a gathering spot where good food and good memories are shared. Come visit us now!!! 
                            and taste the difference of a true local kitchen. We can&apos;t wait to serve you!
                            Tricia&apos;s Kitchen &quot;Where Every Meal Feels Like Home!&quot;.
                        </p>
                    </div>

                    {/*Divider*/}
                    <div className="hidden lg:block w-px bg-amber-800 mx-6"></div>
                    <div className="block lg:hidden h-px bg-amber-800 my-6"></div>
                    
                    {/*Right side of the about section*/}
                    <div className="flex-1 space-y-4 gap-4 flex flex-col items-center lg:items-center">
                        <div className='rounded-md border-2 border-amber-500 p-4'>
                            <h2 className='text-xl text-gray-700'>🌍 Our Vision:</h2>
                            <p className='text-gray-800'>At Tricia&apos;s Kitchen, Our vision is to:</p>
                            <ol className='text-gray-500 list-decimal pl-6  space-y-2"'>
                                <li>Celebrate Local Heritage - By honoring traditional recipes and supporting local farmers and producers.</li>
                                <li>To be the leading local food brand that connects people through taste, tradition, and innovation — offering meals that are not only delicious but also bring families and communities together.</li>
                                <li>Inspire Culinary Joy - By crafting fresh, flavorful, and comforting meals that keep our community coming back.</li>
                            </ol>
                        </div>
                        <div className='rounded-md border-2 border-amber-500 p-4'>
                            <h2 className='text-xl text-gray-700'>🌟 Our Mission:</h2>
                            <p className='text-gray-500'>At Tricia&apos;s Kitchen, our mission is to serve delicious, wholesome, and culturally-inspired meals that bring comfort and 
                                joy to every table. We are committed to using the freshest ingredients, preparing food with love and excellence, 
                                and delivering an exceptional culinary experience to our customers.We believe in food that not only satisfies hunger 
                                but nourishes the soul, promotes community, and celebrates the rich flavors of Ghanaian and continental cuisine.</p>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}