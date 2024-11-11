import React, { useState, useEffect, useContext } from 'react';
import OrderComponent from '../../../components/OrderComponent';
import { useParams } from 'react-router-dom';

const OrderScreen = () => {
    const { id } = useParams();
     
    return(
        <>
            <OrderComponent id={id}/>
        </>
    );
}

export default OrderScreen