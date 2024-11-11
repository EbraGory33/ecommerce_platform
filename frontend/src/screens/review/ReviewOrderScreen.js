import React from 'react';
import CheckoutSteps from "../../components/CheckoutSteps";
import './Review.css';
import { useParams } from 'react-router-dom';
import OrderComponent from '../../components/OrderComponent';

const ReviewOrderScreen = () => {
    const { id } = useParams();
     
    return(
        <>
            <CheckoutSteps step3/>
            <OrderComponent id={id}/>
        </>
    );
}

export default ReviewOrderScreen  