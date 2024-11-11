import React from 'react';
import { useNavigate } from 'react-router-dom';
import './steps.css';

const CheckoutSteps = ({ step1, step2, step3 }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div>
      {/* Back Button */}
      <button className="back-button" onClick={handleBack}>
        Back to Home
      </button>
      <div className="checkout-steps-container">
        <div className={`checkout-step ${step1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <span className="step-text">Shipping</span>
        </div>

        <div className={`checkout-step ${step2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <span className="step-text ">Payment</span>
        </div>

        <div className={`checkout-step ${step3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <span className="step-text">Review Order</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
