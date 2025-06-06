'use client'

import React,{useState} from 'react'
import PoliciesFaqsModal from './PoliciesFaqs';
import {FaFacebook} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import { FaTiktok } from "react-icons/fa";
import { FaTwitter } from 'react-icons/fa';
import { FaSnapchat } from 'react-icons/fa';
import PaymentOptions from '@components/Cart/PaymentCard';

export default function Footer(){
    const [showModal, setShowModal] = useState(false);

    return(
        <React.Fragment>
            <footer className='bg-amber-900 mt-10 px-4 lg:px-0 flex justify-center dark:bg-gray-800 dark:text-white '>
                <div className='flex flex-col lg:flex-row w-full h-full max-w-6x shadow-sm p-4"'>
                    
                    {/*Left section*/}
                    <div className='flex-1 space-y-4 mb-6 lg:mb-0 cursor-pointer p-6'>
                        <h2 className='text text-gray-50 mt-6'>Follow us on:</h2>
                        <div className='flex flex-row items-center gap-4 transition'>
                            <a href="https://www.facebook.com/profile.php?id=100085692115198&mibextid=LQQj4d" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebook className='text-[2rem] rounded-lg bg-white text-blue-600 transform duration-200 hover:scale-105'/>
                            </a>
                            <a href="https://x.com/DennisOpok35210" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <FaTwitter className='bg-black text-[2rem] rounded-xl transform duration-200 hover:scale-105'/>
                            </a>
                            <a href="https://www.instagram.com/opoku2102/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram className='text-red-300 text-[2rem] rounded-xl transform duration-200 hover:scale-105'/>
                            </a>
                            <a href='https://www.tiktok.com/@dennisopokuamponsah12' target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                                <FaTiktok className="text-amber-950 bg-white text-[2rem] rounded-xl transform duration-200 hover:scale-105"/>
                            </a>
                            <a href='https://snapchat.com/den241984'target="_blank" rel="noopener noreferrer" aria-label="SnapChat">
                                <FaSnapchat className='text-amber-400 text-[2rem] rounded-xl transform duration-200 hover:scale-105'/>
                            </a>
                        </div>
                        <p className="text-md relative top-6">&copy; {new Date().getFullYear()} Tricia&apos;s Kitchen. All rights reserved.</p>
                    </div>
                    {/*Divider*/}
                    <div className="hidden lg:block w-px bg-gray-50 mx-6"></div>
                    <div className="block lg:hidden h-px bg-gray-50 my-6"></div>

                    {/*Right section*/}

                    <div className='flex-1 space-y-4 mb-6 flex flex-col lg:mb-0 cursor-pointer p-6 items-center'>
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-6 py-3 text-white rounded-md flex gap-4 border-2 border-white  transition"
                                >
                            FAQs || Policies ||  Legal
                        </button>
                    
                        <div className="block lg:hidden w-px bg-gray-50 mx-6"></div>
                        <div className="hidden lg:block h-px bg-gray-50 my-6"></div>
                        <PaymentOptions/>
                    </div>
                </div>
            </footer>
            <PoliciesFaqsModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </React.Fragment>
    )
}