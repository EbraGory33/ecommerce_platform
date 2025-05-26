import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/ProductCards';
import '../../index.css';

const SearchScreen = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('k');

    return (
        <div>
        <div className='p-20'>
          <h1>Search Results for: {keyword}</h1>
          {/* Render search results here */}
        </div>

        <div className="category_product-list">
            <p>No products found for this category</p>
        </div>
        </div>
    );
}

export default SearchScreen;

