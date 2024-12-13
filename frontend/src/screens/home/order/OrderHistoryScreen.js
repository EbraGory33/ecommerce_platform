import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { CancelOrder, FetchUserOrders } from '../../../server/endpoints/orders/order_endpoints';
import './OrderHistoryScreen.css';
import { useNavigate } from 'react-router-dom';

const OrderHistoryScreen = () => {
    const {AuthInfo} = useSelector((state) => state.auth);
    const {serverUrl} = useSelector((state) => state.app);
    const [userOrders, setUserOrders] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserOrder = async () => {
            if (AuthInfo && AuthInfo.access) {
                console.log("Running getUserOrder")
                setLoading(true);
                try {
                    const response = await FetchUserOrders(AuthInfo.access)
                    if (!response.status === 200) {
                        throw new Error(`Error fetching order: ${response.statusText}`);
                    }
                    const data = response.data;
                    console.log(data)
                    setUserOrders(data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };
        getUserOrder();
    },[AuthInfo])

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    const handleSearch = (event) => {
        event.preventDefault();
        const orderId = event.target.orderId.value;
        console.log('Search for Order ID:', orderId);
        navigate(`/Order/${orderId}`)
    };
    function handleCancelOrder(order_id){
        CancelOrder(order_id)
    }

    return(
        <div className='Order-History-Page-Container'>
            {!AuthInfo ? (
                <form onSubmit={handleSearch} style={{ textAlign: 'center' }}>
                    <input
                        type="text"
                        name="orderId"
                        placeholder="Enter Order ID"
                        style={{
                            padding: '10px',
                            width: '300px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            marginBottom: '10px',
                        }}
                        required
                    />
                    <br />
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Search
                    </button>
                </form>
            ) : (
                <div className="order-history-container">
                    <h1>Your Orders</h1>
                    {userOrders && userOrders.length > 0 ? (
                        userOrders.map((order, index) => (
                            <div className="order-card" key={index}>
                                <div className="order-header">
                                    <div>
                                        <strong>Order Placed:</strong> {new Date(order.ordered_at).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <strong>Total:</strong> ${order.total_price}
                                    </div>
                                    <div>
                                        <strong>Status:</strong> {order.status}
                                    </div>
                                </div>
                                <div className="order-items">
                                    {order.order_items.map((item) => (
                                        <div className="order-item" >
                                            <img
                                                className="order-item-image"
                                                src={serverUrl+item.product.image}
                                                alt={item.product.name}
                                            />
                                            <div className="order-item-details">
                                                <h4>{item.product.name}</h4>
                                                <p>Category: {item.product.category}</p>
                                                <p>Quantity: {item.quantity}</p>
                                                <p>Price: ${item.item_price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {order.status === 'pending' && (
                                    <button
                                        className="cancel-order-button"
                                        onClick={() => handleCancelOrder(order.id)}
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        ))
                    ):(
                        <p>No orders found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default OrderHistoryScreen