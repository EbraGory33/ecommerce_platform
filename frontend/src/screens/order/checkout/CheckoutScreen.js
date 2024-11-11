// src/screens/CheckoutScreen.js
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutSteps from "../../../components/CheckoutSteps";
import PaymentForm from '../../../components/PaymentForm';
import './Checkout.css';


const stripePromise = loadStripe('pk_test_51QCPFGG1V6D44hOpRCZ9J68KsfRJyYOEJwj2b16aYvjxsr1U06NZrRunjmClIR46vwmidOLSc2rdJ88Vaip6t9QU00YfYKhxc4');

function CheckoutScreen() {
    const {serverUrl} = useSelector((state) => state.app);
    const {CartInfo} = useSelector((state) => state.cart)
    const [clientSecret, setClientSecret] = useState(null);

    const calculateTotal = () => {
        return CartInfo.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };
    useEffect(() => {
        const totalAmount = parseInt(calculateTotal()*100);

        fetch('http://127.0.0.1:8000/payment/create-payment-intent/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount:totalAmount}),
        })    
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
            .catch((error) => console.error('Error fetching clientSecret:', error));
            });

    if (!clientSecret) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <CheckoutSteps step2 />
            <div className="checkout-page">
                <div className="checkout-container">
                    {/* Left Side: Order Items */}
                    <div className="checkout-items">
                        <h2>Your Order</h2>
                        {CartInfo.length === 0 ? (
                            <div className="empty-cart">Your cart is empty</div>
                        ) : (
                            CartInfo.map(item => (
                                <div className="checkout-item" key={item.id}>
                                    <img src={serverUrl+item.image} alt={item.name} className="cart-item-image" />
                                    <div className="checkout-item-details">
                                        <p>{item.name}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.price*item.quantity}</p>
                                    </div>
                                </div>
                            ))
                        )}
                        <h3>Total: ${calculateTotal()}</h3>
                    </div>

                    {/* Right Side: Payment Form */}
                    <div className="checkout-payment">
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <PaymentForm total={calculateTotal()}/>
                        </Elements>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckoutScreen;
