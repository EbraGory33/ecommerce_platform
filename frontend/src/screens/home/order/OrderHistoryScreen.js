import React from 'react';
import { useSelector } from 'react-redux';

const OrderHistoryScreen = () => {
    const {AuthInfo} = useSelector((state) => state.auth);

    return(
        <div>
         {!AuthInfo}
         
        </div>
    );
}

export default OrderHistoryScreen