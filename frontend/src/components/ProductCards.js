import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddToCart } from '../store/slice/cart/CartFunction';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const {serverUrl} = useSelector((state) => state.app);
    const {AuthInfo} = useSelector((state) => state.auth);
    const {CartInfo} = useSelector((state) => state.cart);

    function HandleAddToCart(){
        AddToCart( dispatch, AuthInfo, product.id );
        console.log(CartInfo)
    }

    return (
        <div className="product-card">
            {/* Product Image */}
            <img src={serverUrl+product.image} alt={product.name} className="product-Card-image" />

            {/* Product Details */}
            <div className="product-Card-info">
                <h3 className="product-Card-name">{product.name}</h3>
                <p className="product-Card-price">${product.price}</p>

                {/* Buttons: View Details or Add to Cart */}
                <div className="product-Card-actions">
                    <Link to={`/product/details/${product.id}`} className="Card-view-details-btn">
                        View Details
                    </Link>
                    <button className="Card-add-to-cart-btn" onClick={HandleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

