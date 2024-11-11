import React, { useState, useEffect  } from 'react';
import { useSelector } from "react-redux";
import { AdminFetchProducts, DeleteProduct } from '../../server/endpoints/products/product_endpoints';
import { Table, Button, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Account.css';

const AccountScreen = () => {
  const { AuthInfo } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.user);
  let [SellerProducts, setSellerProducts] = useState(null);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      console.log(AuthInfo)
      await AdminFetchProducts(AuthInfo.access)
          .then((response) => {
              console.log(response.data)
              setSellerProducts(response.data); // Set seller products data
          })
          .catch((error) => {
              console.error("Error fetching seller products:", error);
          });
    }

    if (userInfo && userInfo.is_Admin){
      fetchSellerProducts();
    }
  }, [ AuthInfo]);

  const delete_Product = ( id ) => {
    setSellerProducts(SellerProducts.filter(item => item.id !== id));
    DeleteProduct( AuthInfo.access, id )
    console.log(id+"item: Removed");
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className="account-container">
      <h1>Account Details</h1>
      <div className="container">
        <div className="profile-section">
          <h2>Welcome, {userInfo.first_name}</h2>
              <p>Email: {userInfo.email}</p>
              <p>Member since: {new Date(userInfo.date_joined).toLocaleDateString()}</p>
              
              <div className="account-actions">
                <Button><Link to="/account/update" className="btn">Update Information</Link></Button>
                <Button><Link to="/order_history" className="btn">View Order History</Link></Button>
                <Button><Link to="/change_password" className="btn">Change Password</Link></Button>
              </div>
        </div>
          {userInfo.is_Admin &&( 
          <>
            <div className="product-section">
              <h3>Your Products</h3>
              <Button><Link to="/product/create" className="btn">Create Product </Link></Button>
            </div>
              {SellerProducts && SellerProducts.length > 0 ? (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>PRICE</th>
                      <th>CATEGORY</th>
                      <th>IMAGE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SellerProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}$</td>
                        <td>{product.category}</td>
                        <td>
                          <Image
                            rounded
                            fluid
                            src={product.image}
                            width="50px"
                            alt={product.name}
                          />
                        </td>
                        <td>
                          <div class="action-buttons">
                            <Link to={`/product/edit/${product.id}`}>
                              Edit
                              <i className="fa fa-edit" />
                            </Link>
                            <a onClick={() => delete_Product(product.id)}>
                              Delete
                              <i                              
                                className="fa fa-trash"
                              />                       
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
              ):(
              <p>You don't have any products listed yet.</p>
              )}
          </>)}
      </div>
    </div>
  );
};

export default AccountScreen;
