'use client'
import React,{useState, useEffect} from "react"
import {Menu, X} from "lucide-react"
import Hero from '@components/Layout/Hero'
import HeaderCartButton from "./HeaderCartButton";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];


export default function Header({onClick, cartCount}){
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("#home");


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
            <header className="bg-amber-900 text-white p-4 fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Tricia&apos;s Kitchen</h1>
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
                        <HeaderCartButton onClick={onClick} cartCount={cartCount}/>
                    </nav>
                    <button 
                        className="md:hidden focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                    </button>
                </div>
                {isOpen && (
                    <div className="md:hidden mt-2 px-4 pb-4 space-y-2 bg-amber-800 text-white p-4">
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
                        <HeaderCartButton onClick={onClick} cartCount={cartCount} />
                    </div>
                )}
            </header>
            <Hero />
        </React.Fragment>
    )
}