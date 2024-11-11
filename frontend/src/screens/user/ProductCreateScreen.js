import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { CreateProduct, UploadProductImage } from '../../server/endpoints/products/product_endpoints';
import { useNavigate } from 'react-router-dom';
import './ProductCreate.css'

const CreateProductScreen = () => {
  const { AuthInfo } = useSelector((state) => state.auth);
  const { categoryInfo } = useSelector((state) => state.category);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Drag and Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = '#e8f4ff'; // Change background on drag
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = ''; // Reset background on drag leave
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    setImage(file);
    e.target.style.backgroundColor = ''; // Reset background after drop
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
    const productResponse = await CreateProduct( AuthInfo.access, formData)

    if (productResponse.status === 200) {
        console.log('Product Created successfully');
        console.log({image})
  
        const data = productResponse.data
        
        if (image) {
            const imageFormData = new FormData();
            imageFormData.append('product_id', data.id);
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
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" name="stock" onChange={(e) => setStock(e.target.value)} />
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
        <div
          className="file-upload-container"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
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
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProductScreen;
