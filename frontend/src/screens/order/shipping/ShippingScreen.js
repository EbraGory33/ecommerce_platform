import React, { useState} from 'react';
import CheckoutSteps from "../../../components/CheckoutSteps"
import { useNavigate } from 'react-router-dom';
import './Shipping.css';


const ShippingScreen = () => {
    const navigate = useNavigate();
    
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    
    
    const submitHandler = (e) => {
        e.preventDefault();
    
        navigate('/payment');
      };

    return (
        <>
            <CheckoutSteps step1 />
            <div className="shipping-page">
                <h1>Shipping</h1>
                
                <form className="shipping-form" onSubmit={submitHandler}>
                    <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        placeholder="Enter postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                    </div>

                    <button type="submit" className="btn btn-primary">
                    Continue to Payment
                    </button>
                </form>
            </div>
        </>
    );
};

export default ShippingScreen;
