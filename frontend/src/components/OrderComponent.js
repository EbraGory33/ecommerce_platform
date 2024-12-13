import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { FetchOrder } from '../server/endpoints/orders/order_endpoints';
import './Order.css';

const OrderComponent = ({ id }) => {
    const { serverUrl } = useSelector((state) => state.app);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the order data when the component loads
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await FetchOrder(id)
                if (!response.status === 200) {
                    throw new Error(`Error fetching order: ${response.statusText}`);
                }
                const data = response.data;
                console.log(data)
                setOrder(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    // Render loading state
    if (loading) return <p>Loading order details...</p>;

    // Render error state
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="order-container">
            <h2>Order Summary</h2>
            <p><strong>Order ID:</strong> {id}</p>
            <p><strong>Total Price:</strong> ${order.total_price}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Ordered At:</strong> {new Date(order.ordered_at).toLocaleString()}</p>

            <h3>Items</h3>
            <ul className="order-items-list">
                {order.order_items.map((item, index) => (
                    <li key={index} className="order-item">
                        <img 
                            src={serverUrl+item.product.image} 
                            alt={item.product.name} 
                            className="order-image" 
                        />
                        <div className="order-details">
                            <h4>{item.product.name}</h4>
                            <p><strong>Price:</strong> ${item.item_price}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderComponent;
