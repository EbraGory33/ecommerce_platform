import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCards';
import { FetchFeaturedProducts } from '../../server/endpoints/products/product_endpoints'
import { useSelector } from "react-redux";
import './Home.css';
import '../../../src/index.css';

const HomeScreen = () => {
    const { categoryInfo } = useSelector((state) => state.category);
    const [featuredProducts, setFeaturedProducts] = useState({}); 

    const fetchFeaturedProduct = (categoryId) => {
        console.log(categoryId)
        FetchFeaturedProducts(categoryId)
        .then(response => {
            setFeaturedProducts(prevState => ({
                ...prevState,
                [categoryId]: response.data
            }));
        })
        .catch(error => console.log(error));
    };
    

    useEffect(() => {
        if (categoryInfo != null) {
            categoryInfo.forEach(category => fetchFeaturedProduct(category.id));
        }
    }, [categoryInfo]);

    return (
        <div className="homepage">
            {/* Categories Section */}
            <aside className="sidebar">
                <h2 >Shop by Category</h2>
                <div className="category-list">
                    {categoryInfo ? (
                        categoryInfo.map(category => (
                        <Link to={`shop/category/${category.name}/${category.id}`} key={category.id} className="category-item">
                            {category.name}
                        </Link>
                    )) ) : (
                        <p>Loading Categories...</p>
                    )}
                </div>
            </aside>
            
            {/* Featured Products Section */}
            <section className="featured-products">
                {categoryInfo ? (
                    categoryInfo.map(category => (
                        <div key={category.id}>
                        <h2> {category.name} Featured Products</h2>
                        <div className="product-list">
                                {featuredProducts[category.id] ? (
                                    featuredProducts[category.id].map(product => (
                                        <div key={product.id} className="product-item">
                                            <ProductCard product={product} />
                                        </div>
                                    ))
                                ) : (
                                    <p>Loading products...</p>
                                )}
                        </div>
                        </div>
                    ))):(
                        <p>Loading Categories...</p>
                    )}
            </section>
        </div>
    );
};

export default HomeScreen;
