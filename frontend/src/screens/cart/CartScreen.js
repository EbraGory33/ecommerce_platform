import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RemoveFromCart, UpdateCartItemQuantity} from "../../store/slice/cart/CartFunction";
import './Cart.css';  // Import custom styles for the cart


const CartScreen = () => {
    const {AuthInfo} = useSelector((state) => state.auth)
    const {CartInfo} = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // Remove item from cart
    const handleRemoveFromCart = async ( productId) => {
        RemoveFromCart( dispatch, AuthInfo, productId )
    };

    // Handles the cart items quantity 
    const HandleItemQuantity = async (product_id, quantity) => {
        UpdateCartItemQuantity( dispatch, AuthInfo, product_id, quantity )
    };


    // Redirect to checkout
    const handleCheckout = () => {
        navigate('/shipping');
    };

    const getTotalPrice = () => {
        return CartInfo.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="cart-screen">
            <h1>Your Cart</h1>
            
            {CartInfo.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty.</p>
                    <button>
                        <a href="/">Go back shopping</a>
                    </button>
                </div>
            ) : (
                <div className="cart-container">
                    {/* Cart Items */}
                    <div className="cart-items">
                        {CartInfo.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={process.env.REACT_APP_API_BASE_URL+item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <Link to={`/product/details/${item.product_id}`} className="cart-item-name">
                                        {item.name}
                                    </Link>
                                    <p>${item.price}</p>
                                    <div className="cart-item-quantity">
                                        <label>Qty:</label>
                                        <input 
                                            type="number" 
                                            value={item.quantity} 
                                            min="1" 
                                            onChange={(e) => {
                                                
                                                const updatedQuantity = Number(e.target.value);
                                                HandleItemQuantity(item.product_id, updatedQuantity);

                                            }} 
                                        />
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleRemoveFromCart(item.product_id)
                                    } 
                                    className="remove-item-btn">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <p>Total Price: ${getTotalPrice()}</p>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;
