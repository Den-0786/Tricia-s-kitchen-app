'use client';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 500);
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed bottom-6 right-6 z-50 group"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.3 }}
                >
                    <button
                        onClick={scrollToTop}
                        className="bg-amber-700 text-white p-3 rounded-full shadow-lg hover:bg-amber-800 transition-all duration-300 transform hover:scale-110 relative"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={20} />
                        <span className="absolute bottom-full mb-2 w-max left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-black text-white px-2 py-1 rounded transition-opacity duration-200">
                            Back to Top
                        </span>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
