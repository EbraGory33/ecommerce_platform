import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { FetchProduct, EditProduct, UploadProductImage } from '../../server/endpoints/products/product_endpoints';

const ProductEditScreen = () => {
  const { id } = useParams();
  const { AuthInfo } = useSelector((state) => state.auth);
  const { categoryInfo } = useSelector((state) => state.category);
  const [product, setProduct] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch product details by ID
    const fetchProduct = async () => {
      const response = await FetchProduct(id)
      const data = response.data
      console.log(response)

      setProduct(data);
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setStock(data.stock);
      setCategory(data.category);
    };

    fetchProduct();
  }, [id, AuthInfo.access]);


  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    setImage(file);
    e.target.style.backgroundColor = ''; // Reset background after drop
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    console.log('name'+name)
    formData.append('description', description);
    console.log('description'+description)
    formData.append('price', price);
    console.log('price'+price)
    formData.append('stock', stock);
    console.log('stock'+stock)
    formData.append('category', category);
    console.log('category'+category)

    // Send updated data to the backend

    const productResponse = await EditProduct( AuthInfo.access, id, formData)

    if (productResponse.status === 200) {
        console.log('Product Updated successfully');
        console.log({image}) 
        if (image) {
            const imageFormData = new FormData();
            imageFormData.append('product_id', id);
            imageFormData.append('image', image);
            
            const imageResponse = await UploadProductImage( AuthInfo.access, imageFormData )
          
            if (imageResponse.status === 200) {
            console.log('Image uploaded successfully');
            navigate('/account');
            } else {
            console.error('Error uploading image');
            }
        }else{
            navigate('/account');
        };
    } else {
      console.error('Error updating product');
    }
  }

  return (
    <div className="edit-product-container">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name: </label>
          <input
            type="text"
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
                width: '100%', // Make the textarea full width
                minHeight: '25px', // Minimum height to ensure visibility
                maxHeight: '300px', // Optional: Limit max height
                resize: 'horizontal', // Allow vertical resizing
                overflowY: 'auto', // Enable scrolling if content exceeds
              }}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            name='description'
            onChange={(e) => setDescription(e.target.value)}
            style={{
                width: '100%', // Make the textarea full width
                minHeight: '100px', // Minimum height to ensure visibility
                maxHeight: '300px', // Optional: Limit max height
                resize: 'vertical', // Allow vertical resizing
                overflowY: 'auto', // Enable scrolling if content exceeds
              }}
          ></textarea>
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ resize: 'none', width: 'auto', height: 'auto' }}
          />
        </div>

        <div>
          <label>Stock:</label>
          <input
            type="number"
            name='stock'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            style={{ resize: 'none', width: 'auto', height: 'auto' }}
          />
        </div>

        <div>
          <label>Category:</label>
          <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categoryInfo && categoryInfo.length > 0 ? (
              categoryInfo.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>Loading categories...</option>
            )}
          </select>
        </div>

        <div>
          <label>Image:</label>
          {product.image && typeof product.image === 'string' ? (
            <img src={product.image} alt="Product" style={{ width: '150px', height: '150px' }} />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div
          className="file-upload-container"
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <span className="file-upload-placeholder">
            {image ? image.name : "Drag & Drop files here or Browse Files"}
          </span>
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default ProductEditScreen;
