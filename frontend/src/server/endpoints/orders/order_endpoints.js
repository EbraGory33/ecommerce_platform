import { useAxiosClient, useAxiosClientWithToken } from "../../api";

export function CreateOrder(data){
    return useAxiosClient().post('/product/createOrders/',data);
};

export function FetchOrder(Order_ID){
    return useAxiosClient().get(`/product/getOrders/${Order_ID}`)
}

export function FetchUserOrders(token){
//#    
    return useAxiosClientWithToken(token).get(`/product/getAllUserOrders/`)
}

export function CancelOrder(Order_ID){
//#
    return useAxiosClient().delete(`/product/cancelOrder/${Order_ID}`)
}