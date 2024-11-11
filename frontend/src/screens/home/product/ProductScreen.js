import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FetchProduct } from '../../../server/endpoints/products/product_endpoints'
import { AddToCart } from '../../../store/slice/cart/CartFunction';
import './Product.css';

const ProductScreen = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {serverUrl} = useSelector((state) => state.app); 
    const {AuthInfo} = useSelector((state) => state.auth);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        FetchProduct(id)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [id,]);

    function HandleAddToCart(id){
        AddToCart( dispatch, AuthInfo, id );
        navigate('/')
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div className="product-screen">
            <div className="product-container">
                {/* Product Image */}
                <div className="product-image-container">
                    <img src={serverUrl+product.image} alt={product.name} className="product-image" />
                </div>

                {/* Product Details */}
                <div className="product-details">
                    <h1 className="product-name">{product.name}</h1>
                    <p className="product-price">${product.price}</p>
                    <p className="product-description">{product.description}</p>
                    <p className="product-stock">{product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}</p>

                    {/* Add to Cart Button */}
                    <button className="add-to-cart-btn"  onClick={() => {HandleAddToCart(product.id)}}>
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Product Reviews */}
            <div className="product-reviews">
                <h2>Customer Reviews</h2>
                {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map(review => (
                        <div key={review.id} className="review">
                            <strong>{review.user.username}</strong>
                            <p>Rating: {review.rating} / 5</p>
                            <p>{review.review}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
}

export default ProductScreen;
