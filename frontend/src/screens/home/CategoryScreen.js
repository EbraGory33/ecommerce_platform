import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCards';
import { FetchProductsByCategory } from '../../server/endpoints/products/product_endpoints'
import './Category.css';

const CategoryScreen = () => {
  const { id, name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    FetchProductsByCategory(id)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  products.forEach(product => {
    console.log(product.name)
  });

  return (
    <div className="category-page">
      <h1>{name} Products</h1>
      <div className="category_product-list">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="category_product-item">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>No products found for this category</p>
        )}
      </div>
    </div>
  );
};

export default CategoryScreen;

