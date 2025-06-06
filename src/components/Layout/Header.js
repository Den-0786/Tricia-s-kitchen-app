'use client'
import React,{useState, useEffect} from "react"
import {Menu, X, Sun, Moon} from "lucide-react"
import { UserCog } from "lucide-react";
import Hero from '@components/Layout/Hero'
import HeaderCartButton from "./HeaderCartButton";
import { useTheme } from "@components/UI/ThemeContext";


const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];


export default function Header({onClick, cartCount}){
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("#home");
    const {theme, toggleTheme} = useTheme();

    useEffect(() => {
        const handleScroll = () => {
        const sections = navLinks.map(link => document.querySelector(link.href));
        const scrollPos = window.scrollY + 100;

        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            if (section?.offsetTop <= scrollPos && section?.offsetTop + section.offsetHeight > scrollPos) {
            setActiveSection(navLinks[i].href);
            }
        }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <React.Fragment>
            <header className="bg-amber-900 text-white p-4 fixed top-0 left-0 right-0 z-50 dark:bg-gray-900 dark:text-gray-100">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Tricia&apos;s Kitchen</h1>
                    <a
                        href="/admin/login"
                        title="To Admin Login page"
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                        >
                        <UserCog className="w-5 h-5 text-white dark:text-gray-100"/>
                    </a>
                    <nav className="hidden md:flex space-x-4 items-center"> 
                        {navLinks.map(link => (
                            <a 
                                key={link.href}
                                href={link.href}
                                className={`relative py-1 transition duration 300 hover:border-b-2 hover:border-white
                                    ${activeSection === link.href ? "border-b-2 border-white" : ""
                            }`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={toggleTheme}
                            className="text-white hover:text-yellow-300"
                            title="Toggle Theme">
                            {theme === "dark" ? <Moon className="w-5 h-5"/> : <Sun className="w-5 h-5"/>}
                        </button>
                        <HeaderCartButton onClick={onClick} cartCount={cartCount}/>
                    </nav>
                    <button 
                        className="md:hidden focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                    </button>
                </div>
                {isOpen && (
                    <div className="md:hidden mt-2 px-4 pb-4 space-y-2 bg-amber-800 text-white p-4 dark:bg-gray-800 dark:text-white">
                        {navLinks.map(link => (
                            <a 
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block py-2 hover:text-gray-300 ${
                                activeSection === link.href ? "border-b border-white" : ""
                            }`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={toggleTheme}
                            className="text-white hover:text-yellow-300"
                            title="Toggle Theme">
                            {theme === "dark" ? <Moon className="w-5 h-5"/> : <Sun className="w-5 h-5"/>}
                        </button>
                        <HeaderCartButton onClick={onClick} cartCount={cartCount} />
                    </div>
                )}
            </header>
            <Hero />
        </React.Fragment>
    )
}