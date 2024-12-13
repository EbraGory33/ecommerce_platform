import { useAxiosClient, useAxiosClientWithToken } from "../../api";

export function CreateOrder(data){
    return useAxiosClient().post('/order/createOrders/',data);
};

export function FetchOrder(Order_ID){
    return useAxiosClient().get(`/order/getOrders/${Order_ID}`)
}

export function FetchUserOrders(token){
//#    
    return useAxiosClientWithToken(token).get(`/order/getUserOrders/`)
}

export function CancelOrder(Order_ID){
//#
    return useAxiosClient().put(`/order/cancelOrder/${Order_ID}`)
}

export function DeleteOrder(token,Order_ID){
//#
return useAxiosClientWithToken(token).delete(`/order/deleteOrder/${Order_ID}`)
}