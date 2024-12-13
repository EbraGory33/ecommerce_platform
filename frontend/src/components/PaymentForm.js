import React, { useState, } from 'react';
import { useSelector } from 'react-redux';
import { CreateOrder } from '../server/endpoints/orders/order_endpoints';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ total }) => {
    const {CartInfo} = useSelector((state) => state.cart)
    const {userInfo} = useSelector((state) => state.user)
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    
    const [errorMessage, setErrorMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    
    
    const placeOrder = async (total) =>{
        try{
            console.log(userInfo)
            console.log(CartInfo)
            const orderData = {
                total_price: total,
                items: CartInfo.map(item => ({
                  product_id: item.product_id,
                  quantity: item.quantity,
                  items_price: item.price*item.quantity,
                })),
                ...(userInfo ? { user_id: userInfo.user_id } : { user_id: null }),
            };
            console.log('Order Data being sent:', JSON.stringify(orderData));
            const response = await CreateOrder(JSON.stringify(orderData))
            console.log(response);
            console.log(response.data)
            if (response.status === 200) {
                console.log('Order was Created:', response);
                return response.data;
            }
            else{
                const errorData = response
                console.log(errorData)
                throw new Error(`Order creation failed: ${errorData.message || response.statusText}`);
            }

        } catch (error) {
            console.error("Error Creating order:", error);
        }
    }
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsProcessing(true);
        setErrorMessage(null);
        console.log(userInfo)
        console.log(CartInfo)
        try {
            const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                },
                redirect: 'if_required',
            });

            if (stripeError) {
                setErrorMessage(stripeError.message);
            }else if (paymentIntent && paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded!', paymentIntent);
                const orderResponse = await placeOrder(total)
                navigate(`/Review_Order/${orderResponse.Order_ID}`);
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
            setErrorMessage('Payment confirmation failed. Please try again.');
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {errorMessage && <div role="alert" style={{ color: 'red' }}>{errorMessage}</div>}
            <button type="submit" disabled={!stripe || isProcessing}>
                {isProcessing ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

export default PaymentForm;

