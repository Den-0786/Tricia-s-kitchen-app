'use client'
import React from "react"
import MealSummary from "@components/Meals/MealSummary"

export default function Hero(props){
    return (
        <React.Fragment>
            <section 
                className="relative bg-contain bg-center h-[30rem] flex items-center justify-center"
                style={{ backgroundImage: "url('/images/hero.jpg')" }}
                >
                
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative z-20">
                    <MealSummary/>
                </div>
            </section>
        </React.Fragment>
    )
}