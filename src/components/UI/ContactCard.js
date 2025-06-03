'use client'

import React, {useState} from "react"
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PhoneIcon  from '@mui/icons-material/Phone'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PinDropIcon from '@mui/icons-material/PinDrop'

export default function ContactCard() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {name, email, message} = formData;
        if(!name || !email){
            toast.error("Please fill out all fields");
        } else if(message === ''){
            toast.info("Please you haven't written any message");
        } else {
            toast.success("Message sent successfully!");
            setFormData({name: '', email:'', message:''});
        }
    };

    return(
        <React.Fragment>
            <div id="contact" className="mt-10 w-full px-4 lg:px-0 flex justify-center">
                <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white rounded-lg shadow-sm p-6 border-2 border-amber-800">
                    <div className="flex-1 space-y-4 text-gray-800 mb-6 lg:mb-0 cursor-pointer">
                        <h2 className="text-2xl font-bold">Contact Us</h2>
                        <p>We&apos;d love to hear from you. Reach us via:</p>
                            <div className="flex flex-col gap-2">
                                <a href="tel: !233554316710" className="flex items-center gap-2 text-blue-400 hover:underline ">
                                    <PhoneIcon className="text-green-600" />
                                    <span>+233 55431 6710</span>
                                </a>
                                <a href="tel: !233202757400" className="flex items-center gap-2 text-blue-400 hover:underline ">
                                    <PhoneIcon className="text-green-600" />
                                    <span>+233 20275 7400</span>
                                </a>
                            </div>
                        <a 
                            href="https://wa.me/+233554316710"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-green-600 hover:underline">
                            <WhatsAppIcon className="text-green-600" />
                            <span>Chat on WhatsApp</span>
                        </a>
                        <a href="mailto:triciaskitchen25@gmail.com" className="flex items-center gap-2 hover:underline">
                            <EmailIcon className="text-blue-600" />
                            <span>patriciafrimpong25@gmail.com</span>
                        </a>
                        <div className="flex items-center gap-2 hover:underline">
                            <LocationOnIcon className="text-red-500"/>
                            <span>Ahinsan Ashanti Region</span>
                        </div>
                        <div className="flex items-center gap-2 hover:underline">
                            <PinDropIcon className="text-red-500"/>
                            <span>AK 1765-654</span>
                        </div>
                        <div className="max-w-2xl mx-auto mt-6 rounded-lg overflow-hidden shadow-md h-64 ">
                            <iframe
                                src="https://www.google.com/maps?q=AK+306-7282+Ahinsan+Ashanti+Region&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                        </div>
                    </div>

                    {/*Divider*/}
                    <div className="hidden lg:block w-px bg-amber-800 mx-6"></div>
                    <div className="block lg:hidden h-px bg-amber-800 my-6"></div>


                    <form onSubmit={handleSubmit} className="flex-1 space-y-4 gap-4 flex flex-col items-center lg:items-center">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-[18rem] text-black border-2 border-amber-800 rounded px-4 py-2 focus:outline-none focus:border-green-600"
                        />
                        
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-[18rem] text-black border-2 border-amber-800 rounded px-4 py-2 focus:outline-none focus:border-green-600"
                        />

                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-[18rem] text-black border-2 border-amber-800 rounded px-4 py-2 focus:outline-none focus:border-green-600"
                        />
                        <button
                            type="submit"
                            className="bg-amber-800 text-white px-3 py-2 relative left-[5rem] bottom-8 rounded hover:bg-amber-700 transition"
                        >
                            Send Message
                        </button>
                        <ToastContainer position="bottom-right" autoClose={3000}/>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}