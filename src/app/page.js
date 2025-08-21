'use client'
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Header from '@components/Layout/Header';
import HomePageMeals from '@components/Meals/HomePageMeals';
import CartSideBar from '@components/Cart/CartSideBar';
import ContactCard from '@components/UI/ContactCard';
import MenuList from '@components/Meals/AvailableMeals';
import ScrollToTopButton from '@components/UI/ScrollButton';
import About from '@components/UI/About';
import Footer from '@components/UI/Footer';
import OrderForm from '@components/Cart/OrderForm';
import { toast } from 'sonner';
import Confetti from 'react-confetti';

export default function App() {
    const router = useRouter();
    const [cartIsShow, setCartIsShow] = useState(false);
    const [cart, setCart] = useState([]);
    const [animateCart, setAnimateCart] = useState(false);

    const showCartHandler = () => setCartIsShow(true);
    const hideCartHandler = () => setCartIsShow(false);
    
    const addToCart = async (meal) => {
        try {
            // Simulate async
            await new Promise((res, rej) => setTimeout(() => Math.random() < 0.95 ? res() : rej(new Error('Failed to add item')), 400));
            setCart((prev) => {
                const exists = prev.find((item) => item.id === meal.id);
                if (exists) {
                    return prev.map((item) =>
                        item.id === meal.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                return [...prev, { ...meal, quantity: 1 }];
            });
            toast.success('Item added to cart!');
            setAnimateCart(true);
            setTimeout(() => setAnimateCart(false), 700);
        } catch (e) {
            toast.error('Failed to add item to cart. Please try again.');
        }
    };

    const increaseQty = (id) => 
        setCart((prev) => 
            prev.map((item) => 
                item.id === id 
                ? { ...item, quantity: item.quantity + 1}
                : item
            )
        );
    const decreaseQty = (id) => 
        setCart((prev) => 
            prev.map((item) => 
                item.id === id && item.quantity > 1 
                ? { ...item, quantity: item.quantity - 1} 
                : item
            )
        );
    const removeFromCart = (id) => {
        toast.success('Item removed from cart!');
        setCart((prev) => 
            prev.filter((item) => 
            item.id !== id
        )
    );
    };

    const clearCart = () => setCart([]);

    const totalAmount = cart.reduce(
        (acc, item) => acc + item.price * item.quantity, 
        0
    );

    const cartCount = cart.reduce(
        (total, item) => total + (item.quantity || 1), 
        0
    );

    const [showOrderForm, setShowOrderForm] = useState(false);
    const [orderCompleted, setOrderCompleted] = useState(false);

    
    const onProceedToOrderForm = () => {
        hideCartHandler();
        setShowOrderForm(true);
    };
    const onBackToCart = () => {
    setShowOrderForm(false);
    showCartHandler();
    };

    const onOrderComplete = () => {
        setShowOrderForm(false);
        clearCart();
        setOrderCompleted(true);
    };

    useEffect(() => {
        if(orderCompleted){
            const timer = setTimeout(() => {
                setOrderCompleted(false);
                router.push('/');
            }, 5000);

            return () => clearTimeout(timer);

        }
    }, [orderCompleted, router])

    return (
        <div className='bg-white relative'>
        {orderCompleted && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={300} />}
        <Header 
            onClick={showCartHandler}
            cartCount={cartCount}
            animateCart={animateCart}
        />
        
        {orderCompleted ? (
            <div className="flex items-center justify-center min-h-[300px] py-20">
                <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md text-center relative overflow-hidden">
                    <h2 className="text-2xl font-bold text-green-700 mb-2">Order Placed Successfully!</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                        Your order has been received and is being processed. A delivery agent will contact you soon. 
                        
                    </p>

                    {/* Animated loading bar */}
                    <div className="absolute bottom-0 left-0 h-1 bg-green-500 animate-loadbar w-full" />
                </div>
            </div>
        ) : !showOrderForm ? (
            <>
                <HomePageMeals addToCart={addToCart} />
                <MenuList addToCart={addToCart} />
                <About/>
                <ContactCard />
            </>
        ) : (
            <OrderForm 
                cart={cart}
                totalAmount={totalAmount}
                onBackToCart={onBackToCart}
                onOrderComplete={onOrderComplete}
            />
        )}

        <Footer/>
        {cartIsShow && (
            <>
            <div 
                className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40'
                onClick={hideCartHandler}
            />

            <CartSideBar 
                cart={cart}
                setCart={setCart}
                onClose={hideCartHandler}
                clearCart={clearCart}
                totalAmount={totalAmount}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeFromCart={removeFromCart}
                onProceedToOrderForm={onProceedToOrderForm}
            />
        </>
        )}
            <ScrollToTopButton/>
        </div>
    );
}
